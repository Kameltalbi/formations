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
    if (req.method !== 'POST') {
      throw new Error('Méthode non autorisée. Utilisez POST.')
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

    // Récupérer les données de la requête
    const { trainingId } = await req.json()
    if (!trainingId) {
      throw new Error('ID de formation manquant')
    }

    // Récupérer les détails de la formation
    const { data: training, error: trainingError } = await supabase
      .from('plan_formations')
      .select('id, titre, prix_dt, prix_usd, slug')
      .eq('id', trainingId)
      .single()

    if (trainingError || !training) {
      throw new Error('Formation non trouvée')
    }

    // Déterminer le prix et la devise
    let amount: number
    let currency: string
    
    if (training.prix_dt) {
      amount = training.prix_dt
      currency = 'TND'
    } else if (training.prix_usd) {
      amount = training.prix_usd
      currency = 'USD'
    } else {
      throw new Error('Aucun prix défini pour cette formation')
    }

    // Configuration Konnect
    const konnectApiUrl = Deno.env.get('KONNECT_API_BASE_URL') || 'https://api.sandbox.konnect.network/api/v2/'
    const konnectApiKey = Deno.env.get('KONNECT_API_KEY')
    const appBaseUrl = Deno.env.get('APP_BASE_URL') || 'http://localhost:5173'
    const projectRef = Deno.env.get('SUPABASE_PROJECT_REF')

    if (!konnectApiKey) {
      throw new Error('Clé API Konnect manquante')
    }

    if (!projectRef) {
      throw new Error('Référence du projet Supabase manquante')
    }

    // Générer un ID de paiement unique
    const paymentId = `kt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Préparer la requête Konnect
    const konnectPayload = {
      amount: amount,
      currency: currency,
      description: `Formation: ${training.titre}`,
      payment_ref: paymentId,
      success_url: `${appBaseUrl}/checkout/konnect/retour?status=success&payment_ref=${paymentId}`,
      fail_url: `${appBaseUrl}/checkout/konnect/retour?status=fail&payment_ref=${paymentId}`,
      webhook_url: `https://${projectRef}.functions.supabase.co/konnect-webhook`,
      customer: {
        email: user.email
      }
    }

    // Appeler l'API Konnect
    const konnectResponse = await fetch(`${konnectApiUrl}payments/initiate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': konnectApiKey
      },
      body: JSON.stringify(konnectPayload)
    })

    if (!konnectResponse.ok) {
      const errorText = await konnectResponse.text()
      throw new Error(`Erreur Konnect: ${konnectResponse.status} - ${errorText}`)
    }

    const konnectData = await konnectResponse.json()

    // Enregistrer le paiement dans la base
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        training_id: trainingId,
        provider: 'konnect',
        provider_payment_id: paymentId,
        status: 'pending',
        amount: amount,
        currency: currency,
        raw: konnectData
      })

    if (insertError) {
      throw new Error(`Erreur lors de l'enregistrement: ${insertError.message}`)
    }

    // Retourner l'URL de paiement
    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: konnectData.payment_url || konnectData.redirect_url,
        paymentRef: paymentId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Erreur konnect-init:', error)
    
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
