import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, CheckCircle, BookOpen, Users, Clock, Shield } from 'lucide-react';

const Certification = () => {
  const niveaux = [
    {
      niveau: "Niveau 1 - Initiation",
      description: "Comprendre les bases de la méthodologie Bilan Carbone®",
      duree: "2 jours",
      objectifs: [
        "Maîtriser les concepts fondamentaux",
        "Comprendre le cadre réglementaire",
        "Identifier les sources d'émissions",
        "Utiliser les outils de base"
      ],
      certification: "Attestation de participation"
    },
    {
      niveau: "Niveau 2 - Approfondissement",
      description: "Mettre en pratique la méthodologie sur des cas concrets",
      duree: "3 jours",
      objectifs: [
        "Réaliser un bilan carbone complet",
        "Analyser les résultats",
        "Proposer des actions de réduction",
        "Gérer les incertitudes"
      ],
      certification: "Attestation de compétence"
    },
    {
      niveau: "Niveau 3 - Expertise",
      description: "Devenir expert et accompagner des projets",
      duree: "3 jours",
      objectifs: [
        "Accompagner des organisations",
        "Former des équipes internes",
        "Gérer des projets complexes",
        "Évoluer vers la certification ADEME"
      ],
      certification: "Attestation d'expertise"
    }
  ];

  const avantages = [
    {
      icone: Shield,
      titre: "Reconnaissance officielle",
      description: "Formation reconnue par l'ADEME et les autorités compétentes"
    },
    {
      icone: Users,
      titre: "Réseau professionnel",
      description: "Accès à la communauté des praticiens Bilan Carbone®"
    },
    {
      icone: BookOpen,
      titre: "Support continu",
      description: "Accès aux outils et mises à jour pendant 3 mois"
    },
    {
      icone: Award,
      titre: "Évolutif",
      description: "Parcours progressif vers la certification ADEME"
    }
  ];

  const processus = [
    {
      etape: "1",
      titre: "Formation théorique",
      description: "Apprentissage des concepts et méthodologies"
    },
    {
      etape: "2",
      titre: "Exercices pratiques",
      description: "Mise en application sur des cas d'études réels"
    },
    {
      etape: "3",
      titre: "Évaluation continue",
      description: "Validation des compétences tout au long du parcours"
    },
    {
      etape: "4",
      titre: "Attestation",
      description: "Délivrance de l'attestation de compétence"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Award className="h-20 w-20 mx-auto text-yellow-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Certification Bilan Carbone®
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Un parcours de formation progressif pour maîtriser la méthodologie 
              officielle et évoluer vers la certification ADEME
            </p>
          </div>
        </section>

        {/* Niveaux de formation */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Parcours de Formation
              </h2>
              <p className="text-xl text-gray-600">
                Trois niveaux progressifs pour devenir expert en Bilan Carbone®
              </p>
            </div>

            <div className="space-y-8">
              {niveaux.map((niveau, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {niveau.niveau}
                        </h3>
                        <p className="text-gray-600 text-lg">
                          {niveau.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {niveau.duree}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Objectifs d'apprentissage
                        </h4>
                        <ul className="space-y-2">
                          {niveau.objectifs.map((objectif, objIndex) => (
                            <li key={objIndex} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{objectif}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Certification
                        </h4>
                        <div className="flex items-center">
                          <Award className="h-8 w-8 text-primary mr-3" />
                          <span className="text-gray-700 font-medium">
                            {niveau.certification}
                          </span>
                        </div>
                      </div>
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
                Pourquoi choisir notre certification ?
              </h2>
              <p className="text-xl text-gray-600">
                Des avantages concrets pour votre développement professionnel
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantages.map((avantage, index) => (
                <div key={index} className="text-center p-6">
                  <avantage.icone className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {avantage.titre}
                  </h3>
                  <p className="text-gray-600">
                    {avantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comment se déroule la formation ?
              </h2>
              <p className="text-xl text-gray-600">
                Un processus structuré et progressif
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processus.map((etape, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {etape.etape}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {etape.titre}
                  </h3>
                  <p className="text-gray-600">
                    {etape.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Évolution vers ADEME */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Évolution vers la Certification ADEME
              </h2>
              <p className="text-xl text-gray-600">
                Notre formation vous prépare à la certification officielle
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Certification ADEME
                  </h3>
                  <p className="text-gray-100 mb-6">
                    Après nos formations, vous pouvez postuler à la certification 
                    officielle de l'ADEME pour devenir praticien certifié Bilan Carbone®.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                      <span>Reconnaissance nationale</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                      <span>Accréditation officielle</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                      <span>Accès aux marchés publics</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Award className="h-32 w-32 mx-auto text-yellow-400 mb-4" />
                  <p className="text-sm text-gray-200">
                    Certification officielle ADEME
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer votre certification ?
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

export default Certification;

