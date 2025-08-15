import React from 'react';
import { Award, Users, BookOpen, Building2 } from 'lucide-react';

const Formateur = () => {
  return (
    <section id="formateur" className="py-16 lg:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Votre formateur expert
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une formation dispensée par un expert reconnu de la méthodologie Bilan Carbone® 
            avec plus de 10 ans d'expérience dans l'accompagnement d'entreprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-6">
              <img
                src="/kt photo.jpeg"
                alt="Kamel Talbi - Formateur Bilan Carbone®"
                className="w-64 h-64 rounded-full object-cover mx-auto lg:mx-0 shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-3 rounded-full">
                <Award className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-text mb-2">Kamel Talbi</h3>
            <p className="text-lg text-primary font-semibold mb-4">
              Expert Bilan Carbone® Certifié
            </p>
            
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed mb-4">
                Consultant et formateur spécialisé en comptabilité carbone et en stratégies de réduction des émissions. 
                Fort d'une expérience significative auprès de TPE, PME et grandes organisations, il accompagne les entreprises 
                dans la mise en place d'outils fiables, l'analyse de leurs émissions et la définition de plans d'actions 
                réalistes et mesurables.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Certifié sur la méthode Bilan Carbone®, il a conduit des formations et des missions en Tunisie et à l'international, 
                en tenant compte des spécificités locales et sectorielles. Sa pédagogie repose sur des exemples concrets, 
                des exercices pratiques et une approche orientée résultats.
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                Son objectif : vous transmettre les compétences nécessaires pour réaliser votre premier Bilan Carbone® 
                et engager votre structure dans une trajectoire bas carbone crédible et efficace.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-secondary mb-1">200+</div>
                <div className="text-sm text-gray-600">Entreprises accompagnées</div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-semibold text-text mb-6">Expertise & Parcours</h4>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-text mb-2">Certifications</h5>
                    <p className="text-gray-600 text-sm">
                      Praticien certifié Bilan Carbone® par l'ADEME, Expert en transition énergétique, 
                      Formateur agréé ISO 14064 et GHG Protocol.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-6 w-6 text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-text mb-2">Expérience terrain</h5>
                    <p className="text-gray-600 text-sm">
                      Plus de 200 bilans carbone réalisés pour des TPE, PME et grandes entreprises 
                      dans tous les secteurs d'activité (industrie, services, BTP, agriculture).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <BookOpen className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-text mb-2">Pédagogie</h5>
                    <p className="text-gray-600 text-sm">
                      Approche pratique basée sur des cas réels, méthodes interactives, 
                      accompagnement personnalisé et suivi post-formation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Building2 className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-text mb-2">Secteurs d'expertise</h5>
                    <p className="text-gray-600 text-sm">
                      BTP & Architecture, Industrie manufacturière, Services & Conseil, 
                      Agriculture & Agroalimentaire, Transport & Logistique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-text mb-4">Partenaires & Références</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs text-gray-600">ADEME</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="text-xs text-gray-600">ABC Bilan Carbone</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-xs text-gray-600">Institut B&L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formateur;