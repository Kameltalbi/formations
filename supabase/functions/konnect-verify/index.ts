import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier la méthode HTTP
    if (req.method !== 'GET') {
      throw new Error('Méthode non autorisée. Utilisez GET.')
    }

    // Créer le client Supabase avec le service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Variables d\'environnement Supabase manquantes')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Récupérer le token d'authentification
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Token d\'authentification manquant')
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Vérifier l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    if (userError || !user) {
      throw new Error('Utilisateur non authentifié')
    }

    // Récupérer les paramètres de requête
    const url = new URL(req.url)
    const paymentRef = url.searchParams.get('payment_ref')
    const trainingId = url.searchParams.get('trainingId')

    if (!paymentRef && !trainingId) {
      throw new Error('payment_ref ou trainingId requis')
    }

    let paymentData = null
    let inscriptionData = null

    // Si on a un payment_ref, chercher le paiement
    if (paymentRef) {
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .eq('provider_payment_id', paymentRef)
        .eq('user_id', user.id)
        .single()

      if (paymentError) {
        throw new Error('Paiement non trouvé')
      }

      paymentData = payment

      // Vérifier l'inscription correspondante
      const { data: inscription, error: inscriptionError } = await supabase
        .from('inscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('formation_id', payment.training_id)
        .single()

      if (!inscriptionError && inscription) {
        inscriptionData = inscription
      }
    }

    // Si on a un trainingId, chercher l'inscription
    if (trainingId && !inscriptionData) {
      const { data: inscription, error: inscriptionError } = await supabase
        .from('inscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('formation_id', trainingId)
        .single()

      if (!inscriptionError && inscription) {
        inscriptionData = inscription
      }

      // Chercher aussi le paiement correspondant
      if (!paymentData) {
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .eq('training_id', trainingId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (!paymentError && payment) {
          paymentData = payment
        }
      }
    }

    // Si le paiement est en attente, vérifier le statut via Konnect
    if (paymentData && paymentData.status === 'pending') {
      try {
        const konnectApiUrl = Deno.env.get('KONNECT_API_BASE_URL') || 'https://api.sandbox.konnect.network/api/v2/'
        const konnectApiKey = Deno.env.get('KONNECT_API_KEY')

        if (konnectApiKey) {
          const konnectResponse = await fetch(`${konnectApiUrl}payments/${paymentData.provider_payment_id}`, {
            method: 'GET',
            headers: {
              'x-api-key': konnectApiKey
            }
          })

          if (konnectResponse.ok) {
            const konnectData = await konnectResponse.json()
            const newStatus = konnectData.status

            // Mettre à jour le statut si différent
            if (newStatus !== paymentData.status) {
              await supabase
                .from('payments')
                .update({ 
                  status: newStatus,
                  raw: konnectData,
                  updated_at: new Date().toISOString()
                })
                .eq('id', paymentData.id)

              paymentData.status = newStatus
            }
          }
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification Konnect:', error)
        // Continuer sans faire échouer la requête
      }
    }

    // Préparer la réponse
    const response = {
      success: true,
      payment: paymentData ? {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount,
        currency: paymentData.currency,
        provider: paymentData.provider,
        created_at: paymentData.created_at
      } : null,
      inscription: inscriptionData ? {
        id: inscriptionData.id,
        status: inscriptionData.status,
        formation_id: inscriptionData.formation_id,
        created_at: inscriptionData.created_at
      } : null,
      enrolled: !!inscriptionData && inscriptionData.status === 'paid'
    }

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Erreur konnect-verify:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})
