import React from 'react';
import { Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-teal-500 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Sécurité de niveau entreprise
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Vos données sont protégées par les plus hauts standards de sécurité. 
              Chiffrement end-to-end, authentification multi-facteurs et conformité 
              aux normes internationales garantissent la confidentialité de vos informations.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Chiffrement AES-256 pour toutes les données
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Conformité RGPD et ISO 27001
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Sauvegarde automatique et redondante
              </li>
            </ul>
          </div>
          <div className="lg:order-2">
            <img
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Sécurité des données"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-1">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Performance et rapidité"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="lg:order-2">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Performance ultra-rapide
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Notre infrastructure cloud optimisée garantit des temps de réponse 
              exceptionnels. Profitez d'une expérience utilisateur fluide et 
              instantanée, même avec des volumes de données importants.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Disponibilité</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">&lt;100ms</div>
                <div className="text-sm text-gray-600">Temps de réponse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;