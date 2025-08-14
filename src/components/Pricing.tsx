import React from 'react';
import { Check, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '19',
      description: 'Parfait pour les petites équipes qui démarrent',
      features: [
        'Jusqu\'à 5 utilisateurs',
        '10 GB de stockage',
        'Support par email',
        'Intégrations de base',
        'Rapports standards',
        'Mobile apps'
      ],
      popular: false,
      buttonText: 'Commencer',
      buttonStyle: 'bg-gray-900 text-white hover:bg-gray-800'
    },
    {
      name: 'Professional',
      icon: Crown,
      price: '49',
      description: 'Pour les équipes qui veulent aller plus loin',
      features: [
        'Utilisateurs illimités',
        '100 GB de stockage',
        'Support prioritaire 24/7',
        'Toutes les intégrations',
        'Analytics avancées',
        'API complète',
        'Formations personnalisées',
        'Backup automatique'
      ],
      popular: true,
      buttonText: 'Choisir Pro',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
    }
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. 
            Pas de frais cachés, pas d'engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg border ${
                  plan.popular ? 'border-blue-200 ring-2 ring-blue-600' : 'border-gray-200'
                } p-8 transform hover:scale-105 transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Le plus populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                    <span className="text-gray-500 ml-1">/mois</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Tous les plans incluent un essai gratuit de 14 jours. 
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Comparer les fonctionnalités
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;