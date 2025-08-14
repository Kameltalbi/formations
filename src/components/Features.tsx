import React from 'react';
import { 
  Users, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  Lock, 
  Headphones 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Collaboration en temps réel',
      description: 'Travaillez simultanément avec votre équipe sur les mêmes projets.',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics avancées',
      description: 'Tableaux de bord interactifs et rapports détaillés pour suivre vos performances.',
      color: 'text-teal-500'
    },
    {
      icon: Cloud,
      title: 'Stockage cloud illimité',
      description: 'Sauvegardez et synchronisez vos données sur tous vos appareils.',
      color: 'text-purple-600'
    },
    {
      icon: Smartphone,
      title: 'Applications mobiles',
      description: 'Accédez à vos projets depuis n\'importe où avec nos apps natives.',
      color: 'text-green-600'
    },
    {
      icon: Lock,
      title: 'Sécurité renforcée',
      description: 'Chiffrement de bout en bout et authentification à deux facteurs.',
      color: 'text-red-600'
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Notre équipe d\'experts est disponible pour vous aider à tout moment.',
      color: 'text-orange-600'
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités qui font la différence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les outils dont vous avez besoin pour optimiser 
            votre productivité et celle de votre équipe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;