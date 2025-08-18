import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function Checkout() {
  const navigate = useNavigate()
  const [country, setCountry] = useState<"TN" | "INTL" | "PENDING">("PENDING")

  useEffect(() => {
    let cancelled = false
    async function detect() {
      // a) Cache (évite de requêter l'API à chaque visite)
      const cached = localStorage.getItem("ab_country")
      if (cached && (cached === "TN" || cached === "INTL")) {
        if (!cancelled) {
          setCountry(cached as "TN" | "INTL")
          // Redirection immédiate si on a déjà détecté
          if (cached === "TN") {
            navigate('/checkout-tn', { replace: true })
          } else {
            navigate('/checkout-intl', { replace: true })
          }
        }
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
          navigate('/checkout-tn', { replace: true })
        }
        return
      }

      // c) Sinon, appel IP (asynchrone)
      const fromIP = await getCountryFromIP()
      if (!cancelled) {
        const finalCC = fromIP === "TN" ? "TN" : "INTL"
        setCountry(finalCC)
        localStorage.setItem("ab_country", finalCC)
        
        // Redirection selon la région détectée
        if (finalCC === "TN") {
          navigate('/checkout-tn', { replace: true })
        } else {
          navigate('/checkout-intl', { replace: true })
        }
      }
    }

    detect()
    return () => { cancelled = true }
  }, [navigate])

  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Détection de votre région...</p>
        <p className="text-sm text-gray-500 mt-2">Redirection automatique en cours</p>
      </div>
    </div>
  );
}