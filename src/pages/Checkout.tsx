import { useEffect, useMemo, useState } from "react"
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  const [country, setCountry] = useState<"TN" | "INTL" | "PENDING">("PENDING")
  const isTN = country === "TN"

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

  // Prix
  const unitPrice = useMemo(() => (isTN ? 600 : 300), [isTN])
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
      // 1) Ici : envoyer vers votre backend / Google Form / Zapier / Supabase, etc.
      // Exemple placeholder :
      // await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, detectedRegion: country, price: unitPrice }) })

      // 2) Option : rediriger directement selon le paiement
      // if (!isTN && form.paymentMethod === "online") window.location.href = "https://votre-lien-konnect/checkout..."
      // if (!isTN && form.paymentMethod === "moneygram") afficher instructions

      // Simulation
      await new Promise((res) => setTimeout(res, 800))
      setSuccess(true)
    } catch (err) {
      setError("Une erreur est survenue. Réessayez.")
    } finally {
      setSubmitting(false)
    }
  }

  const PaymentOptions = () => {
    if (country === "PENDING") {
      return <div className="text-sm text-gray-500">Détection de la région…</div>
    }
    return isTN ? (
      <div className="grid sm:grid-cols-3 gap-2">
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
      <div className="grid sm:grid-cols-2 gap-2">
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="moneygram" onChange={handleChange} checked={form.paymentMethod === "moneygram"} />
          <span>MoneyGram</span>
        </label>
        <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="paymentMethod" value="online" onChange={handleChange} checked={form.paymentMethod === "online"} />
          <span>Paiement en ligne (Konnect)</span>
        </label>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Colonne formulaire */}
            <form className="lg:col-span-2 bg-light p-8 rounded-xl border border-gray-100 grid gap-4" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-text">Inscription — Bilan Carbone®</h1>
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

              <div>
                <label className="block text-sm text-gray-600 mb-2">Mode de paiement</label>
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

            {/* Colonne récap */}
            <aside className="bg-white p-6 rounded-xl border border-gray-100 h-fit">
              <h2 className="text-xl font-semibold text-text">Récapitulatif</h2>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>Formation : <strong>Bilan Carbone®</strong></li>
                <li>Format : en ligne (Zoom)</li>
                <li>Horaires : sam./dim. 9h–12h (2 week-ends)</li>
                <li>Durée totale : 12 h (4 × 3 h)</li>
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

              {!isTN ? (
                <div className="mt-4 text-xs text-gray-600">
                  <p>Pour <strong>MoneyGram</strong>, des instructions vous seront envoyées après validation.</p>
                  <p>Pour le <strong>paiement en ligne</strong>, vous serez redirigé vers une page sécurisée (Konnect).</p>
                </div>
              ) : (
                <div className="mt-4 text-xs text-gray-600">
                  <p>Pour <strong>virement/chèque</strong>, les coordonnées bancaires seront transmises par email.</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}