import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentTN() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  // Récupérer les paramètres de l'URL
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const company = searchParams.get('company') || '';
  const role = searchParams.get('role') || '';
  const notes = searchParams.get('notes') || '';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setRedirecting(true);
              // Redirection automatique vers Konnect Tunisie
        const konnectUrl = "https://knct.me/AVqlWiEIC";
      window.location.href = konnectUrl;
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">Redirection vers le paiement</h1>
            <p className="text-gray-600">
              Vous allez être redirigé vers la page de paiement sécurisée de Konnect pour finaliser votre inscription.
            </p>
          </div>

          {/* Résumé de l'inscription */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-text mb-3">Résumé de votre inscription :</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div><span className="font-medium">Nom :</span> {lastName}</div>
              <div><span className="font-medium">Prénom :</span> {firstName}</div>
              <div><span className="font-medium">Email :</span> {email}</div>
              <div><span className="font-medium">Téléphone :</span> {phone}</div>
              {company && <div><span className="font-medium">Société :</span> {company}</div>}
              {role && <div><span className="font-medium">Fonction :</span> {role}</div>}
            </div>
            <div className="mt-3">
              <div className="font-medium text-text">Formation : Formation Bilan Carbone®</div>
              <div className="font-medium text-primary">Prix : 500 TND HT</div>
            </div>
          </div>

          {/* Compte à rebours */}
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Redirection automatique dans :</p>
            <div className="text-3xl font-bold text-primary">{countdown}</div>
          </div>

          {/* Bouton de redirection manuelle */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setRedirecting(true);
                const konnectUrl = "https://knct.me/AVqlWiEIC";
                window.location.href = konnectUrl;
              }}
              disabled={redirecting}
              className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {redirecting ? "Redirection..." : "Payer maintenant"}
            </button>
            
            <Link 
              to="/checkout-tn"
              className="block text-sm text-gray-500 hover:text-gray-700"
            >
              ← Retour au formulaire
            </Link>
          </div>

          {/* Informations de sécurité */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              🔒 Votre paiement est sécurisé par Konnect. Vos informations bancaires ne sont jamais stockées sur nos serveurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
