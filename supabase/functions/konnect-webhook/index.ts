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

    // Vérifier le token webhook si configuré
    const webhookToken = Deno.env.get('KONNECT_WEBHOOK_TOKEN')
    if (webhookToken) {
      const url = new URL(req.url)
      const token = url.searchParams.get('token')
      if (token !== webhookToken) {
        throw new Error('Token webhook invalide')
      }
    }

    // Récupérer le payment_ref depuis les paramètres de requête
    const url = new URL(req.url)
    const paymentRef = url.searchParams.get('payment_ref')
    
    if (!paymentRef) {
      throw new Error('payment_ref manquant dans les paramètres')
    }

    // Créer le client Supabase avec le service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Variables d\'environnement Supabase manquantes')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Configuration Konnect
    const konnectApiUrl = Deno.env.get('KONNECT_API_BASE_URL') || 'https://api.sandbox.konnect.network/api/v2/'
    const konnectApiKey = Deno.env.get('KONNECT_API_KEY')

    if (!konnectApiKey) {
      throw new Error('Clé API Konnect manquante')
    }

    // Récupérer le statut réel du paiement depuis Konnect
    const konnectResponse = await fetch(`${konnectApiUrl}payments/${paymentRef}`, {
      method: 'GET',
      headers: {
        'x-api-key': konnectApiKey
      }
    })

    if (!konnectResponse.ok) {
      throw new Error(`Erreur lors de la récupération du statut Konnect: ${konnectResponse.status}`)
    }

    const konnectData = await konnectResponse.json()
    const paymentStatus = konnectData.status

    // Mettre à jour le statut dans la table payments
    const { error: updateError } = await supabase
      .from('payments')
      .update({ 
        status: paymentStatus,
        raw: konnectData,
        updated_at: new Date().toISOString()
      })
      .eq('provider_payment_id', paymentRef)

    if (updateError) {
      throw new Error(`Erreur lors de la mise à jour du paiement: ${updateError.message}`)
    }

    // Si le paiement a réussi, créer/mettre à jour l'inscription
    if (paymentStatus === 'succeeded') {
      // Récupérer les détails du paiement
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .select('user_id, training_id, amount, currency')
        .eq('provider_payment_id', paymentRef)
        .single()

      if (paymentError || !payment) {
        throw new Error('Paiement non trouvé dans la base')
      }

      // UPSERT dans la table inscriptions
      const { error: inscriptionError } = await supabase
        .from('inscriptions')
        .upsert({
          user_id: payment.user_id,
          formation_id: payment.training_id,
          status: 'paid',
          price: payment.amount,
          currency: payment.currency,
          payment_method: 'konnect',
          source: 'konnect_webhook',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,formation_id'
        })

      if (inscriptionError) {
        console.error('Erreur lors de la création de l\'inscription:', inscriptionError)
        // Ne pas faire échouer le webhook pour cette erreur
      }
    }

    // Retourner une réponse de succès
    return new Response(
      JSON.stringify({
        success: true,
        message: `Webhook traité avec succès. Statut: ${paymentStatus}`,
        paymentRef: paymentRef
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Erreur konnect-webhook:', error)
    
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
