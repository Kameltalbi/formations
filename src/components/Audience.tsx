import React from 'react';
import { Crown, Shield, Users, GraduationCap } from 'lucide-react';

const Audience = () => {
  const audiences = [
    {
      icon: Crown,
      title: 'Dirigeants TPE/PME',
      description: 'Chefs d\'entreprise souhaitant intégrer la démarche carbone dans leur stratégie et répondre aux obligations réglementaires.',
      color: 'text-accent'
    },
    {
      icon: Shield,
      title: 'Responsables RSE',
      description: 'Professionnels en charge de la responsabilité sociétale qui veulent maîtriser les outils de mesure carbone.',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Consultants',
      description: 'Consultants souhaitant développer leur expertise en accompagnement Bilan Carbone® pour leurs clients.',
      color: 'text-secondary'
    },
    {
      icon: GraduationCap,
      title: 'Étudiants & Professionnels',
      description: 'Étudiants et professionnels en reconversion vers les métiers de la transition écologique.',
      color: 'text-green-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            À qui s'adresse cette formation ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une formation adaptée aux besoins spécifiques de chaque profil, 
            du dirigeant au consultant, pour maîtriser la méthodologie Bilan Carbone®.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <div 
                key={index} 
                className="bg-light p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <IconComponent className={`h-8 w-8 ${audience.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3 text-center">
                  {audience.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">
              ✓ Aucun prérequis technique nécessaire
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audience;