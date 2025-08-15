import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, type Inscription } from '../lib/supabase';
import { KonnectService } from '../lib/konnectService';

// --- Détection pays : TLD, fuseau, langue, IP (fallback) ---
function getCountryFromTLD() {
  try {
    const host = window.location.hostname.toLowerCase()
    if (host.endsWith(".tn")) return "TN"
  } catch (_) {}
  return null
}

function getCountryFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    if (tz === "Africa/Tunis") return "TN"
  } catch (_) {}
  return null
}

function getCountryFromLanguage() {
  try {
    const langs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language].filter(Boolean)
    for (const l of langs) {
      const m = /[-_](?<cc>[A-Z]{2})$/.exec(l)
      if (m?.groups?.cc === "TN") return "TN"
    }
  } catch (_) {}
  return null
}

async function getCountryFromIP() {
  try {
    const r = await fetch("https://ipapi.co/json/")
    if (r.ok) {
      const j = await r.json()
      if (j && typeof j.country === "string" && j.country.length === 2) {
        return j.country.toUpperCase()
      }
    }
  } catch (_) {}
  return null
}

const formatDT = (amount: number) =>
  new Intl.NumberFormat("fr-TN", { style: "currency", currency: "TND", maximumFractionDigits: 0 })
    .format(amount)

const formatUSD = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    .format(amount)

export default function Checkout() {
  const { trainingId } = useParams<{ trainingId: string }>()
  const navigate = useNavigate()
  const [country, setCountry] = useState<"TN" | "INTL" | "PENDING">("PENDING")
  const isTN = country === "TN"
  const [training, setTraining] = useState<any>(null)
  const [loadingTraining, setLoadingTraining] = useState(true)

  // Charger les détails de la formation
  useEffect(() => {
    async function loadTraining() {
      if (!trainingId) {
        setError("ID de formation manquant")
        setLoadingTraining(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('plan_formations')
          .select('*')
          .eq('id', trainingId)
          .single()

        if (error) throw error
        setTraining(data)
      } catch (err) {
        console.error('Erreur chargement formation:', err)
        setError("Formation non trouvée")
      } finally {
        setLoadingTraining(false)
      }
    }

    loadTraining()
  }, [trainingId])

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

  // Prix basé sur la formation et la région
  const unitPrice = useMemo(() => {
    if (!training) return 0
    return isTN ? (training.prix_dt || 600) : (training.prix_usd || 300)
  }, [training, isTN])
  
  const unitLabel = isTN ? formatDT(unitPrice) : formatUSD(unitPrice)

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    country: "",
    notes: "",
    paymentMethod: "", // "cash" | "wire" | "cheque" | "moneygram" | "online"
    acceptTerms: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
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
    setError("")
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    setSubmitting(true)

    try {
      // Si paiement en ligne (Konnect), rediriger directement
      if (form.paymentMethod === "online") {
        if (!trainingId) {
          throw new Error("ID de formation manquant")
        }

        // Initialiser le paiement Konnect
        const { paymentUrl, paymentRef } = await KonnectService.initPayment(parseInt(trainingId))
        
        // Stocker les données du formulaire temporairement
        localStorage.setItem('checkout_form_data', JSON.stringify({
          ...form,
          trainingId: parseInt(trainingId),
          price: unitPrice,
          currency: isTN ? 'TND' : 'USD',
          detected_region: country
        }))
        
        // Rediriger vers Konnect
        KonnectService.redirectToPayment(paymentUrl)
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
        country: form.country || null,
        notes: form.notes || null,
        payment_method: form.paymentMethod,
        detected_region: country,
        price: unitPrice,
        currency: isTN ? 'TND' : 'USD',
        status: 'pending',
        formation_id: trainingId ? parseInt(trainingId) : null
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
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.")
    } finally {
      setSubmitting(false)
    }
  }

  const PaymentOptions = () => {
    if (country === "PENDING") {
      return <div className="text-sm text-gray-500">Détection de la région…</div>
    }
    return isTN ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="card" onChange={handleChange} checked={form.paymentMethod === "card"} />
          <div className="flex items-center gap-1">
            <span>Carte</span>
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
    ) : (
      <div className="grid sm:grid-cols-3 gap-2">
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="card" onChange={handleChange} checked={form.paymentMethod === "card"} />
          <div className="flex items-center gap-1">
            <span>Carte</span>
            <div className="flex gap-1 ml-1">
              <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">CB</div>
              <div className="w-6 h-4 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
            </div>
          </div>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="moneygram" onChange={handleChange} checked={form.paymentMethod === "moneygram"} />
          <span>MoneyGram</span>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="online" onChange={handleChange} checked={form.paymentMethod === "online"} />
          <div className="flex items-center gap-1">
            <span>Konnect</span>
            <div className="w-8 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">K</div>
          </div>
        </label>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vérification de chargement et d'erreur */}
          {loadingTraining && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la formation...</p>
            </div>
          )}

          {!loadingTraining && !training && (
            <div className="text-center py-20">
              <div className="text-red-600 text-xl mb-4">❌ Formation non trouvée</div>
              <p className="text-gray-600 mb-6">La formation demandée n'existe pas ou a été supprimée.</p>
              <button 
                onClick={() => navigate('/formations')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Retour aux formations
              </button>
            </div>
          )}

          {!loadingTraining && training && (
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Colonne formulaire */}
            <div className="lg:col-span-2 bg-light p-8 rounded-xl border border-gray-100">
              <form className="grid gap-4" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-text">Inscription — {training?.titre || 'Bilan Carbone®'}</h1>
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
                <label className="block text-sm text-gray-600 mb-1">Pays (optionnel)</label>
                <input 
                  className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent" 
                  name="country" 
                  value={form.country} 
                  onChange={handleChange} 
                  placeholder={isTN ? "Tunisie (détecté)" : "International (détecté)"} 
                />
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

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
              {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">Inscription enregistrée. Un email de confirmation va vous être envoyé.</div>}

              <div className="mt-2">
                <button 
                  type="submit" 
                  disabled={submitting || country === "PENDING"} 
                  className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Traitement..." : "Valider l'inscription"}
                </button>
              </div>
              </form>
            </div>

            {/* Colonne récapitulatif */}
            <aside className="bg-white p-6 rounded-xl border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-text mb-4">Récapitulatif</h2>
              
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>Formation : <strong>{training?.titre || 'Bilan Carbone®'}</strong></li>
                <li>Format : {training?.format || 'en ligne (Zoom)'}</li>
                <li>Horaires : {training?.horaires || 'sam./dim. 9h–12h (2 week-ends)'}</li>
                <li>Durée totale : {training?.duree || '12 h (4 × 3 h)'}</li>
              </ul>

              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span>Prix</span>
                  <strong className="text-primary">
                    {country === "PENDING" ? "…" : unitLabel}
                  </strong>
                </div>
                {isTN ? <div className="text-xs text-gray-500 mt-1">TVA en sus si applicable</div> : null}
              </div>
            </aside>
          </div>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}