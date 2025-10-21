import { useEffect, useMemo, useState } from "react"
import { Link } from 'react-router-dom';

// --- 1) Déductions locales (sans API) ---
function getCountryFromTLD() {
  try {
    const host = window.location.hostname.toLowerCase()
    // Map TLD → code pays
    const map = {
      ".tn": "TN",
      // ajoute d'autres TLD si besoin (ex: ".fr": "FR")
    }
    for (const [tld, cc] of Object.entries(map)) {
      if (host.endsWith(tld)) return cc
    }
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
      if (m?.groups?.cc) return m.groups.cc
    }
  } catch (_) {}
  return null
}

// --- 2) Déduction IP (API publique) ---
// Choisis UNE des deux API suivantes (laisse l'autre en commentaire si tu veux) :
async function getCountryFromIP() {
  try {
    // Option A : ipapi.co (sans token)
    const r = await fetch("https://ipapi.co/json/")
    if (r.ok) {
      const j = await r.json()
      if (j && typeof j.country === "string" && j.country.length === 2) {
        return j.country.toUpperCase()
      }
    }
  } catch (_) {}
  try {
    // Option B : ipinfo.io (nécessite un token gratuit si quota public dépassé)
    // const r = await fetch("https://ipinfo.io/json?token=TON_TOKEN_ICI")
    // if (r.ok) {
    //   const j = await r.json()
    //   if (j && typeof j.country === "string" && j.country.length === 2) {
    //     return j.country.toUpperCase()
    //   }
    // }
  } catch (_) {}
  return null
}

// --- 3) Formats prix ---
const formatDT = (amount: number) =>
  new Intl.NumberFormat("fr-TN", { style: "currency", currency: "TND", maximumFractionDigits: 0 })
    .format(amount)

const formatUSD = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    .format(amount)

// --- 4) Composant principal ---
export default function PricingDynamic() {
  const [country, setCountry] = useState<"TN" | "INTL" | "PENDING">("PENDING")

  useEffect(() => {
    let cancelled = false

    async function detect() {
      // a) Cache (évite de requêter l'API à chaque visite)
      const cached = localStorage.getItem("ab_country")
      if (cached && (cached === "TN" || cached === "INTL")) {
        if (!cancelled) setCountry(cached as "TN" | "INTL")
        return
      }

      // b) Heuristiques locales (rapides)
      const fromTLD = getCountryFromTLD()
      const fromTZ = getCountryFromTimezone()
      const fromLang = getCountryFromLanguage()

      // Décision immédiate si l'un est clairement TN
      if (fromTLD === "TN" || fromTZ === "TN" || fromLang === "TN") {
        if (!cancelled) {
          setCountry("TN")
          localStorage.setItem("ab_country", "TN")
        }
        return
      }

      // c) Sinon, appel IP (asynchrone)
      const fromIP = await getCountryFromIP()
      if (!cancelled) {
        if (fromIP === "TN") {
          setCountry("TN")
          localStorage.setItem("ab_country", "TN")
        } else {
          setCountry("INTL")
          localStorage.setItem("ab_country", "INTL")
        }
      }
    }

    detect()
    return () => { cancelled = true }
  }, [])

  const isPending = country === "PENDING"
  const isTN = country === "TN"

  const price = useMemo(() => (isTN ? 500 : 300), [isTN])
  const priceLabel = isTN ? formatDT(price) : formatUSD(price)

  const scrollToContact = () => {
    // Removed - now using Link to checkout
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl border-2 border-primary/20">
      <h3 className="text-xl font-semibold mb-4 text-text">Tarifs</h3>

      {isPending ? (
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-56 bg-gray-100 rounded" />
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Prix par participant, attestation incluse :</p>
          <div className="mb-6">
            <div className="text-3xl font-bold text-primary">{priceLabel}</div>
            {isTN ? <p className="text-sm text-gray-500">HT (TVA en sus si applicable)</p> : null}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-text mb-2">Modes de paiement</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {isTN ? (
                <li className="flex items-center">
                  <span className="mr-3">🇹🇳</span>
                  <span>Tunisie : espèces, virement, chèque</span>
                </li>
              ) : (
                <li className="flex items-center">
                  <span className="mr-3">🌍</span>
                  <span>International : MoneyGram ou paiement en ligne (API Konnect)</span>
                </li>
              )}
            </ul>
          </div>

          <Link 
            to="/checkout"
            className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105"
          >
            S'inscrire maintenant
          </Link>
        </>
      )}
    </div>
  )
}