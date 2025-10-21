import React from 'react';
import { BookOpen, Calculator, Target, Award } from 'lucide-react';

const Programme = () => {
  const sessions = [
    {
      icon: BookOpen,
      title: 'Jour 1 : Fondamentaux et méthodologie',
      objectives: [
        'Comprendre les enjeux climatiques et réglementaires',
        'Maîtriser la méthodologie Bilan Carbone®',
        'Identifier les différents scopes d\'émissions',
        'Organiser la collecte de données',
        'Utiliser les facteurs d\'émission'
      ],
      practicals: [
        'Analyse de cas concrets d\'entreprises',
        'Exercices de classification des émissions',
        'Atelier de collecte de données réelles',
        'Manipulation des outils de calcul',
        'Quiz interactif sur la réglementation'
      ],
      deliverables: [
        'Guide méthodologique Bilan Carbone®',
        'Modèles de tableaux de calcul',
        'Base de données facteurs d\'émission',
        'Checklist réglementaire'
      ],
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Jour 2 : Calcul, plan d\'action et reporting',
      objectives: [
        'Calculer les émissions par poste',
        'Analyser les résultats du bilan',
        'Identifier les leviers de réduction',
        'Construire un plan d\'action chiffré',
        'Rédiger le rapport Bilan Carbone®',
        'Communiquer efficacement les résultats'
      ],
      practicals: [
        'Exercices de conversion et calculs',
        'Atelier de priorisation des actions',
        'Simulation de scénarios de réduction',
        'Rédaction collaborative d\'un rapport',
        'Création de supports de communication',
        'Simulation de présentation aux parties prenantes'
      ],
      deliverables: [
        'Outils de calcul personnalisés',
        'Matrice de priorisation des actions',
        'Modèles de plans d\'action',
        'Template de rapport officiel',
        'Kit de communication',
        'Attestation de participation'
      ],
      color: 'secondary'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary/10 border-primary/20';
      case 'secondary': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'accent': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  return (
    <section id="programme" className="py-16 lg:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Programme de formation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            2 jours intensifs pour maîtriser tous les aspects du Bilan Carbone®, 
            de la théorie à la mise en pratique concrète.
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-text mb-3">📍 Formation présentielle</h3>
            <p className="text-gray-700 mb-2">
              <strong>Lieu :</strong> Startup Village Tunis
            </p>
            <p className="text-gray-700">
              <strong>Dates :</strong> 19 et 20 novembre 2025
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {sessions.map((session, index) => {
            const IconComponent = session.icon;
            const colorClasses = getColorClasses(session.color);
            
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg border ${colorClasses}`}>
                    <IconComponent className={`h-6 w-6 ${session.color === 'primary' ? 'text-primary' : 
                      session.color === 'secondary' ? 'text-secondary' : 
                      session.color === 'accent' ? 'text-accent' : 'text-green-600'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-text ml-4">
                    {session.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text mb-3 flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Objectifs pédagogiques
                    </h4>
                    <ul className="space-y-2">
                      {session.objectives.map((objective, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text mb-3 flex items-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                      Cas pratiques
                    </h4>
                    <ul className="space-y-2">
                      {session.practicals.map((practical, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-secondary mr-2 mt-1">•</span>
                          {practical}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text mb-3 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      Livrables
                    </h4>
                    <ul className="space-y-2">
                      {session.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="text-accent mr-2 mt-1">•</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <Award className="h-6 w-6 text-primary mr-3" />
            <span className="text-text font-semibold">
              Formation certifiante avec attestation de participation officielle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programme;