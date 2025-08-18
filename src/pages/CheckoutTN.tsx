import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Inscription } from '../lib/supabase';

// Fonctions de détection de pays
const getCountryFromTLD = () => {
  if (window.location.hostname.endsWith('.tn')) return "TN"
  return null
}

const getCountryFromTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz.includes('Africa/Tunis')) return "TN"
    return null
  } catch {
    return null
  }
}

const getCountryFromLanguage = () => {
  const lang = navigator.language || navigator.languages?.[0] || ""
  if (lang.startsWith('ar') || lang.startsWith('fr')) return "TN"
  return null
}

const getCountryFromIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code === 'TN' ? 'TN' : 'INTL'
  } catch {
    return 'INTL'
  }
}

const formatDT = (amount: number) =>
  new Intl.NumberFormat("ar-TN", { style: "currency", currency: "TND", maximumFractionDigits: 0 })
    .format(amount)

export default function CheckoutTN() {
  const navigate = useNavigate()
  const [country, setCountry] = useState<"TN" | "INTL" | "PENDING">("PENDING")
  const isTN = country === "TN"
  
  // Formation statique - Bilan Carbone®
  const training = {
    title: "Formation Bilan Carbone®",
    description: "Formation professionnelle certifiante pour maîtriser la méthodologie Bilan Carbone® et accompagner votre organisation vers la neutralité carbone.",
    price_tn: 600,
    format: "en ligne (Zoom)",
    horaires: "sam./dim. 9h–12h (2 week-ends)",
    dates: "25-26 janvier 2025 et 22-23 février 2025"
  }

  useEffect(() => {
    let cancelled = false
    async function detect() {
      const cached = localStorage.getItem("ab_country")
      if (cached && (cached === "TN" || cached === "INTL")) {
        if (!cancelled) setCountry(cached as "TN" | "INTL")
        return
      }
      const tld = getCountryFromTLD()
      const tz = getCountryFromTimezone()
      const lang = getCountryFromLanguage()
      if (tld === "TN" || tz === "TN" || lang === "TN") {
        if (!cancelled) {
          setCountry("TN")
          localStorage.setItem("ab_country", "TN")
        }
        return
      }
      const ip = await getCountryFromIP()
      if (!cancelled) {
        const finalCC = ip === "TN" ? "TN" : "INTL"
        setCountry(finalCC)
        localStorage.setItem("ab_country", finalCC)
      }
    }
    detect()
    return () => { cancelled = true }
  }, [])

  // Prix fixe pour la Tunisie
  const unitPrice = 600
  const unitLabel = formatDT(unitPrice)

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    notes: "",
    paymentMethod: "", // "cash" | "wire" | "cheque" | "card"
    acceptTerms: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const validate = () => {
    if (!form.firstName || !form.lastName) return "Nom et prénom requis."
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email invalide."
    if (!form.phone) return "Téléphone requis."
    if (!form.paymentMethod) return "Choisissez un mode de paiement."
    if (!form.acceptTerms) return "Veuillez accepter les conditions."
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) {
      alert(v)
      return
    }
    setSubmitting(true)

    try {
      // Pour les paiements en ligne, rediriger vers la page de paiement
      if (form.paymentMethod === "card") {
        // Construire l'URL avec les paramètres du formulaire
        const params = new URLSearchParams({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          company: form.company || '',
          role: form.role || '',
          notes: form.notes || ''
        });
        navigate(`/payment-tn?${params.toString()}`);
        return
      }

      // Pour les autres modes de paiement, enregistrer directement
      const inscriptionData: Omit<Inscription, 'id' | 'created_at' | 'updated_at'> = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        company: form.company || null,
        role: form.role || null,
        country: "Tunisie",
        notes: form.notes || null,
        payment_method: form.paymentMethod,
        detected_region: "TN",
        price: unitPrice,
        currency: 'TND',
        status: 'pending'
      }

      // Insérer dans Supabase
      const { data, error: supabaseError } = await supabase
        .from('inscriptions')
        .insert([inscriptionData])
        .select()

      if (supabaseError) {
        console.error('Erreur Supabase:', supabaseError)
        throw new Error('Erreur lors de l\'enregistrement de l\'inscription')
      }

      console.log('Inscription enregistrée:', data)
      setSuccess(true)

    } catch (err) {
      console.error('Erreur:', err)
      alert(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.")
    } finally {
      setSubmitting(false)
    }
  }

  const PaymentOptions = () => {
    if (country === "PENDING") {
      return <div className="text-sm text-gray-500">Détection de la région…</div>
    }
    
    if (!isTN) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Vous semblez être à l'étranger.</p>
          <Link 
            to="/checkout-intl"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Aller à la page internationale
          </Link>
        </div>
      )
    }

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="card" onChange={handleChange} checked={form.paymentMethod === "card"} />
          <div className="flex items-center gap-1">
            <span>Carte bancaire</span>
            <div className="flex gap-1 ml-1">
              <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">CB</div>
              <div className="w-6 h-4 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
            </div>
          </div>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="cash" onChange={handleChange} checked={form.paymentMethod === "cash"} />
          <span>Espèces</span>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="wire" onChange={handleChange} checked={form.paymentMethod === "wire"} />
          <span>Virement</span>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="cheque" onChange={handleChange} checked={form.paymentMethod === "cheque"} />
          <span>Chèque</span>
        </label>
      </div>
    )
  }

  if (country === "PENDING") {
    return (
      <div className="min-h-screen bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Détection de votre région...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isTN) {
    return (
      <div className="min-h-screen bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">🌍 Page réservée à la Tunisie</div>
            <p className="text-gray-600 mb-6">Cette page est destinée aux résidents de Tunisie.</p>
            <Link 
              to="/checkout-intl"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Aller à la page internationale
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {training && (
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Colonne formulaire */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-text">Inscription — {training.title}</h1>
                <p className="text-gray-600">
                  Merci de compléter les informations ci-dessous. Nous vous enverrons la confirmation, la facture et le lien de connexion.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Prénom</label>
                    <input 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="firstName" 
                      value={form.firstName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nom</label>
                    <input 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="lastName" 
                      value={form.lastName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Téléphone</label>
                    <input 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Société (optionnel)</label>
                    <input 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="company" 
                      value={form.company} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Fonction (optionnel)</label>
                    <input 
                      className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                      name="role" 
                      value={form.role} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Notes (optionnel)</label>
                  <textarea 
                    className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent resize-none" 
                    name="notes" 
                    rows={3} 
                    value={form.notes} 
                    onChange={handleChange} 
                    placeholder="Besoins spécifiques, facturation, etc." 
                  />
                </div>

                {/* Section Moyens de paiement dans le formulaire */}
                <div className="mt-6">
                  <label className="block text-sm text-gray-600 mb-3">Mode de paiement</label>
                  <PaymentOptions />
                </div>

                <label className="flex items-start gap-3 text-sm mt-2">
                  <input 
                    type="checkbox" 
                    name="acceptTerms" 
                    checked={form.acceptTerms} 
                    onChange={handleChange} 
                    className="mt-1"
                  />
                  <span>J'accepte les conditions de participation et la politique de confidentialité.</span>
                </label>

                {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">Inscription enregistrée. Un email de confirmation va vous être envoyé.</div>}

                <div className="mt-2">
                  <button 
                    type="submit" 
                    disabled={submitting || country === "PENDING"} 
                    className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Traitement..." : "Valider l'inscription"}
                  </button>
                </div>
              </form>
            </div>

            {/* Colonne résumé */}
            <div className="space-y-6">
              {/* Résumé de la formation */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-text mb-4">Résumé de la formation</h3>
                <ul className="mt-3 text-sm text-gray-700 space-y-2">
                  <li>Formation : <strong>{training.title}</strong></li>
                  <li>Format : {training.format}</li>
                  <li>Horaires : {training.horaires}</li>
                  <li>Dates : {training.dates}</li>
                </ul>
              </div>

              {/* Résumé du prix */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-text mb-4">Résumé du prix</h3>
                <div className="text-3xl font-bold text-primary mb-2">{unitLabel}</div>
                <p className="text-sm text-gray-500">TVA en sus si applicable</p>
                <p className="text-sm text-gray-600 mt-2">Attestation de formation incluse</p>
              </div>

              {/* Informations de contact */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-text mb-4">Besoin d'aide ?</h3>
                <p className="text-sm text-gray-600 mb-3">Notre équipe est là pour vous accompagner</p>
                <Link 
                  to="/contact"
                  className="text-primary hover:text-green-700 text-sm font-medium"
                >
                  Nous contacter →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
