import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lightbulb, Target, Users, TrendingDown, CheckCircle, ArrowRight, BarChart3, Globe } from 'lucide-react';

const Conseil = () => {
  const services = [
    {
      titre: "Audit Bilan Carbone®",
      description: "Réalisation complète de votre bilan carbone selon la méthodologie officielle ADEME",
      icone: BarChart3,
      details: [
        "Collecte et analyse des données",
        "Calcul des émissions Scope 1, 2 et 3",
        "Rapport détaillé avec recommandations",
        "Présentation des résultats à votre équipe"
      ],
      duree: "4-6 semaines",
      tarif: "Sur devis"
    },
    {
      titre: "Accompagnement Transition",
      description: "Stratégie et plan d'action pour réduire votre empreinte carbone",
      icone: Target,
      details: [
        "Définition d'objectifs de réduction",
        "Plan d'action priorisé",
        "Suivi des progrès",
        "Formation de vos équipes"
      ],
      duree: "3-6 mois",
      tarif: "Sur devis"
    },
    {
      titre: "Formation Interne",
      description: "Formation de vos équipes à la méthodologie Bilan Carbone®",
      icone: Users,
      details: [
        "Formation sur mesure",
        "Programme adapté à votre secteur",
        "Support pédagogique complet",
        "Suivi post-formation"
      ],
      duree: "1-3 jours",
      tarif: "Sur devis"
    },
    {
      titre: "Reporting RSE",
      description: "Aide à la rédaction de vos rapports de responsabilité sociétale",
      icone: Globe,
      details: [
        "Structuration des données",
        "Rédaction des sections environnementales",
        "Mise en forme professionnelle",
        "Conformité aux standards internationaux"
      ],
      duree: "2-4 semaines",
      tarif: "Sur devis"
    }
  ];

  const secteurs = [
    {
      nom: "Industrie",
      description: "Manufacture, production, logistique",
      exemples: ["Textile", "Agroalimentaire", "Métallurgie"]
    },
    {
      nom: "Services",
      description: "Bureaux, centres de données, transport",
      exemples: ["Banque", "Assurance", "Logistique"]
    },
    {
      nom: "BTP",
      description: "Construction, rénovation, immobilier",
      exemples: ["Promoteurs", "Constructeurs", "Bureaux d'études"]
    },
    {
      nom: "Public",
      description: "Administrations, collectivités, établissements",
      exemples: ["Mairies", "Hôpitaux", "Écoles"]
    }
  ];

  const avantages = [
    {
      titre: "Expertise reconnue",
      description: "Plus de 10 ans d'expérience en Bilan Carbone®"
    },
    {
      titre: "Méthodologie officielle",
      description: "Respect strict de la méthodologie ADEME"
    },
    {
      titre: "Accompagnement personnalisé",
      description: "Solutions adaptées à votre contexte"
    },
    {
      titre: "Résultats mesurables",
      description: "Suivi des progrès et ROI démontré"
    }
  ];

  const temoignages = [
    {
      entreprise: "EcoTech Solutions",
      secteur: "Technologie",
      texte: "KT Consulting nous a accompagnés dans notre transition écologique. Résultat : -25% d'émissions en 18 mois !",
      nom: "Sarah Ben Ali",
      poste: "Directrice RSE"
    },
    {
      entreprise: "Green Industries",
      secteur: "Manufacture",
      texte: "Un accompagnement professionnel qui nous a permis de structurer notre démarche environnementale.",
      nom: "Ahmed Mansouri",
      poste: "Directeur Général"
    },
    {
      entreprise: "Sustainable Corp",
      secteur: "Services",
      texte: "Formation excellente de nos équipes et accompagnement continu. Très satisfait !",
      nom: "Leila Trabelsi",
      poste: "Responsable Formation"
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
              <Lightbulb className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Conseil en Bilan Carbone®
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Accompagnement expert pour réduire votre empreinte carbone 
              et développer votre stratégie environnementale
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services de Conseil
              </h2>
              <p className="text-xl text-gray-600">
                Des solutions complètes pour votre transition écologique
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="mb-6">
                    <service.icone className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.titre}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>Durée : {service.duree}</span>
                      <span className="font-semibold">{service.tarif}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secteurs d'activité */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Secteurs d'Activité
              </h2>
              <p className="text-xl text-gray-600">
                Une expertise dans tous les domaines
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {secteurs.map((secteur, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {secteur.nom}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {secteur.description}
                  </p>
                  <div className="space-y-1">
                    {secteur.exemples.map((exemple, exIndex) => (
                      <div key={exIndex} className="text-sm text-gray-500">
                        {exemple}
                      </div>
                    ))}
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
                Pourquoi nous choisir ?
              </h2>
              <p className="text-xl text-gray-600">
                Des avantages concrets pour votre organisation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantages.map((avantage, index) => (
                <div key={index} className="text-center p-6">
                  <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
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

        {/* Témoignages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ce que disent nos clients
              </h2>
              <p className="text-xl text-gray-600">
                Des retours d'expérience authentiques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {temoignages.map((temoignage, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="mb-4">
                    <div className="text-sm text-primary font-semibold mb-2">
                      {temoignage.secteur}
                    </div>
                    <h4 className="font-bold text-gray-900">
                      {temoignage.entreprise}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{temoignage.texte}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{temoignage.nom}</p>
                    <p className="text-sm text-gray-500">{temoignage.poste}</p>
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
              Prêt à réduire votre empreinte carbone ?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Contactez-nous pour un accompagnement personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Demander un devis
              </Link>
              <Link
                to="/formations"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Voir nos formations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Conseil;

