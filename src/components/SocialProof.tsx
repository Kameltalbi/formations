import React from 'react';
import { Star, Quote, Building2, Users, Award } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Med Ali Chelli',
      role: 'Consultant ISO et Enseignant Universitaire',
      company: '',
      content: 'Merci bien pour la qualité de la formation et la richesse de la documentation.',
      rating: 5
    },
    {
      name: 'Anis Meddeb',
      role: 'Consultant',
      company: 'Ceforce TN',
      content: 'Vraiment une excellente formation avec un thème très spécifique, un formateur de qualité, participants expérimentés et organisation parfaite. Merci à vous tous.',
      rating: 5
    },
    {
      name: 'Nadia Mhirsi',
      role: 'Professionnelle',
      company: '',
      content: 'Merci beaucoup M. Talbi pour l\'excellente formation dispensée et un grand merci également à M. Kesraoui.',
      rating: 5
    }
  ];

  const partners = [
    { name: 'ADEME', icon: Award },
    { name: 'ABC Bilan Carbone', icon: Building2 },
    { name: 'Institut B&L Evolution', icon: Users },
    { name: 'Ministère Environnement', icon: Award },
    { name: 'UTICA', icon: Building2 },
    { name: 'GIZ Tunisie', icon: Users }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Témoignages */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Ce que disent nos participants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plus de 500 professionnels formés avec un taux de satisfaction de 98%. 
            Découvrez leurs retours d'expérience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-light p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-text">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2" />
                <p className="text-gray-600 italic pl-4">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Professionnels formés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">98%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">150+</div>
            <div className="text-gray-600">Entreprises accompagnées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
            <div className="text-gray-600">Années d'expérience</div>
          </div>
        </div>

        {/* Partenaires */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-text mb-4">
            Nos partenaires et références
          </h3>
          <p className="text-gray-600 mb-8">
            Nous travaillons avec les organismes de référence du secteur
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div 
                key={index} 
                className="bg-light p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center"
              >
                <IconComponent className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <div className="text-xs text-gray-600 font-medium">{partner.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;