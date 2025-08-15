import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Clock, Users, MapPin, CheckCircle, ArrowRight, Star } from 'lucide-react';

const Formations = () => {
  const formations = [
    {
      id: 1,
      titre: "Formation Bilan Carbone® - Niveau 1",
      description: "Initiation à la méthodologie Bilan Carbone® pour comprendre les bases et commencer à identifier les sources d'émissions de gaz à effet de serre dans votre organisation.",
      duree: "2 jours",
      format: "Présentiel",
      lieu: "Tunis, Centre de formation",
      prix_dt: 1200,
      prix_usd: 400,
      niveau: "Débutant",
      prochaine_session: "15-16 Septembre 2025",
      places_disponibles: 15,
      highlights: [
        "Comprendre les concepts fondamentaux",
        "Identifier les sources d'émissions",
        "Utiliser les outils de base",
        "Cas pratiques concrets"
      ]
    },
    {
      id: 2,
      titre: "Formation Bilan Carbone® - Niveau 2",
      description: "Approfondissement de la méthodologie avec mise en pratique sur des cas d'études réels. Apprenez à réaliser un bilan carbone complet et à analyser les résultats.",
      duree: "3 jours",
      format: "Hybride",
      lieu: "Tunis + Visioconférence",
      prix_dt: 1800,
      prix_usd: 600,
      niveau: "Intermédiaire",
      prochaine_session: "20-22 Octobre 2025",
      places_disponibles: 12,
      highlights: [
        "Réaliser un bilan carbone complet",
        "Analyser et interpréter les résultats",
        "Proposer des actions de réduction",
        "Gérer les incertitudes"
      ]
    },
    {
      id: 3,
      titre: "Formation Bilan Carbone® - Niveau 3",
      description: "Devenez expert en Bilan Carbone® et apprenez à accompagner des organisations dans leur transition écologique. Formation avancée pour consultants et experts.",
      duree: "3 jours",
      format: "Présentiel",
      lieu: "Tunis, Centre de formation",
      prix_dt: 2400,
      prix_usd: 800,
      niveau: "Avancé",
      prochaine_session: "25-27 Novembre 2025",
      places_disponibles: 10,
      highlights: [
        "Accompagner des organisations",
        "Former des équipes internes",
        "Gérer des projets complexes",
        "Évoluer vers la certification ADEME"
      ]
    }
  ];

  const methodologie = [
    {
      titre: "Méthodologie officielle",
      description: "Formation basée sur la méthodologie officielle Bilan Carbone® de l'ADEME",
      icone: CheckCircle
    },
    {
      titre: "Approche pratique",
      description: "70% de pratique et 30% de théorie pour une application immédiate",
      icone: BookOpen
    },
    {
      titre: "Cas d'études réels",
      description: "Travail sur des exemples concrets d'entreprises tunisiennes",
      icone: Users
    },
    {
      titre: "Support post-formation",
      description: "Accompagnement pendant 3 mois après la formation",
      icone: Clock
    }
  ];

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-blue-100 text-blue-800';
      case 'Avancé': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <BookOpen className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Formations Bilan Carbone®
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Un parcours complet et progressif pour maîtriser la méthodologie 
              officielle et devenir expert en comptabilité carbone
            </p>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre Approche
              </h2>
              <p className="text-xl text-gray-600">
                Une méthodologie éprouvée et des formateurs experts
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologie.map((item, index) => (
                <div key={index} className="text-center p-6">
                  <item.icone className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.titre}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formations */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Catalogue des Formations
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez le niveau qui correspond à vos besoins
              </p>
            </div>

            <div className="space-y-8">
              {formations.map((formation) => (
                <div key={formation.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getNiveauColor(formation.niveau)}`}>
                            {formation.niveau}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formation.prochaine_session}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {formation.titre}
                        </h3>
                        
                        <p className="text-gray-600 mb-6">
                          {formation.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              Durée : {formation.duree}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              Format : {formation.format}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              Lieu : {formation.lieu}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 mr-2 text-primary" />
                              Places disponibles : {formation.places_disponibles}
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-semibold">Prix :</span>
                              <div className="text-lg font-bold text-primary">
                                {formation.prix_dt} DT
                              </div>
                              <div className="text-sm text-gray-500">
                                ou {formation.prix_usd} USD
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Points clés :</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {formation.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={`/formations/${formation.id}`}
                          className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center flex items-center justify-center"
                        >
                          Voir les détails
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                        <Link
                          to={`/formations/${formation.id}`}
                          className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                        >
                          S'inscrire
                        </Link>
                      </div>
                    </div>
                  </div>
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
                to="/dates-tarifs"
                className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Voir les dates
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

export default Formations;
