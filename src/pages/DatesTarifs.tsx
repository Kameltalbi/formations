import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

const DatesTarifs = () => {
  const formations = [
    {
      id: 1,
      titre: "Formation Bilan Carbone® - Niveau 1",
      description: "Initiation à la méthodologie Bilan Carbone®",
      dates: "15-16 Septembre 2025",
      horaires: "9h00 - 17h00",
      format: "Présentiel",
      lieu: "Tunis, Centre de formation",
      prix_dt: 1200,
      prix_usd: 400,
      places: 15,
      niveau: "Débutant"
    },
    {
      id: 2,
      titre: "Formation Bilan Carbone® - Niveau 2",
      description: "Approfondissement et mise en pratique",
      dates: "20-22 Octobre 2025",
      horaires: "9h00 - 17h00",
      format: "Hybride",
      lieu: "Tunis + Visioconférence",
      prix_dt: 1800,
      prix_usd: 600,
      places: 12,
      niveau: "Intermédiaire"
    },
    {
      id: 3,
      titre: "Formation Bilan Carbone® - Niveau 3",
      description: "Expertise et accompagnement projet",
      dates: "25-27 Novembre 2025",
      horaires: "9h00 - 17h00",
      format: "Présentiel",
      lieu: "Tunis, Centre de formation",
      prix_dt: 2400,
      prix_usd: 800,
      places: 10,
      niveau: "Avancé"
    }
  ];

  const avantages = [
    "Support de formation complet",
    "Exercices pratiques et cas d'études",
    "Attestation de participation",
    "Support post-formation (3 mois)",
    "Accès à la communauté des praticiens",
    "Mise à jour des outils et méthodes"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dates & Tarifs
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Découvrez nos prochaines sessions de formation Bilan Carbone® 
              et choisissez le programme qui correspond à vos besoins
            </p>
          </div>
        </section>

        {/* Formations */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Formations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des formations progressives pour maîtriser la méthodologie Bilan Carbone®
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((formation) => (
                <div key={formation.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        formation.niveau === 'Débutant' ? 'bg-green-100 text-green-800' :
                        formation.niveau === 'Intermédiaire' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {formation.niveau}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {formation.titre}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {formation.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {formation.dates}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {formation.horaires}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {formation.lieu}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        {formation.format} - {formation.places} places
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-primary">
                          {formation.prix_dt} DT
                        </div>
                        <div className="text-sm text-gray-500">
                          ou {formation.prix_usd} USD
                        </div>
                      </div>
                      
                      <Link
                        to={`/formations/${formation.id}`}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block text-center"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ce qui est inclus
              </h2>
              <p className="text-xl text-gray-600">
                Tous nos programmes incluent ces avantages
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {avantages.map((avantage, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{avantage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer votre formation ?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Rejoignez nos prochaines sessions et devenez expert en Bilan Carbone®
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/formations"
                className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Voir toutes les formations
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DatesTarifs;

