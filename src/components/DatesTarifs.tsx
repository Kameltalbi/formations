import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Award, Clock, CreditCard, Banknote } from 'lucide-react';
import PricingDynamic from './PricingDynamic';

const DatesTarifs = () => {
  return (
    <section id="dates" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Dates & Tarifs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formation présentielle intensive sur 2 jours au Startup Village Tunis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Bloc organisation & dates */}
          <div className="bg-light p-8 rounded-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <Calendar className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-text">Organisation</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3">📅</span>
                <span><strong>Formation présentielle</strong> sur 2 jours consécutifs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">🕘</span>
                <span><strong>Horaires :</strong> 9h00–17h00 avec pauses déjeuner</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                <span><strong>Lieu :</strong> Startup Village Tunis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">⏳</span>
                <span>Durée totale : 16 heures (2 × 8h)</span>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mt-6 mb-3 text-text">Prochaines dates</h4>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Jour 1 :</strong> Mardi <strong>19 novembre 2025</strong></li>
              <li>✅ <strong>Jour 2 :</strong> Mercredi <strong>20 novembre 2025</strong></li>
            </ul>
          </div>

          {/* Bloc tarifs */}
          <PricingDynamic />
        </div>

        {/* Infos complémentaires */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>📨 Confirmation par email avec facture et informations pratiques.</p>
          <p>📝 Documents fournis : supports PDF, tableurs, pack de ressources, attestation de participation.</p>
          <p>🍽️ Pauses café et déjeuner inclus dans la formation.</p>
        </div>
      </div>
    </section>
  );
};

export default DatesTarifs;