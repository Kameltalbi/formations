import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, BookOpen, Users, Globe, CheckCircle, Star } from 'lucide-react';

const FormateurExpert = () => {
  const certifications = [
    "Praticien certifié Bilan Carbone® - ADEME",
    "Formateur agréé en développement durable",
    "Expert en comptabilité carbone",
    "Consultant en transition écologique"
  ];

  const experiences = [
    {
      annee: "2015-2025",
      titre: "Consultant Senior",
      entreprise: "KT Consulting & Co",
      description: "Accompagnement de plus de 50 entreprises dans leur transition écologique"
    },
    {
      annee: "2012-2015",
      titre: "Chef de projet environnemental",
      entreprise: "Ministère de l'Environnement",
      description: "Gestion de projets nationaux de réduction des émissions de CO2"
    },
    {
      annee: "2010-2012",
      titre: "Ingénieur environnement",
      entreprise: "Bureau d'études international",
      description: "Réalisation de bilans carbone pour des entreprises multinationales"
    }
  ];

  const formations = [
    {
      titre: "Formation Bilan Carbone® - Niveau 1",
      description: "Initiation à la méthodologie pour débutants",
      duree: "2 jours",
      participants: "200+"
    },
    {
      titre: "Formation Bilan Carbone® - Niveau 2",
      description: "Approfondissement et mise en pratique",
      duree: "3 jours",
      participants: "150+"
    },
    {
      titre: "Formation Bilan Carbone® - Niveau 3",
      description: "Expertise et accompagnement projet",
      duree: "3 jours",
      participants: "100+"
    }
  ];

  const temoignages = [
    {
      nom: "Sarah Ben Ali",
      entreprise: "EcoTech Solutions",
      texte: "Formation excellente ! Le formateur maîtrise parfaitement son sujet et rend les concepts complexes accessibles.",
      note: 5
    },
    {
      nom: "Ahmed Mansouri",
      entreprise: "Green Industries",
      texte: "Approche pratique et professionnelle. J'ai pu immédiatement appliquer les méthodes dans mon entreprise.",
      note: 5
    },
    {
      nom: "Leila Trabelsi",
      entreprise: "Sustainable Corp",
      texte: "Un formateur passionné qui transmet son expertise avec clarté. Formation de très haute qualité.",
      note: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Votre Formateur Expert
                </h1>
                <p className="text-xl text-gray-100 mb-8">
                  Une formation dispensée par un expert reconnu de la méthodologie Bilan Carbone® 
                  avec plus de 10 ans d'expérience dans l'accompagnement d'entreprises.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400 mr-2" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    <span className="font-semibold">450+ participants</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="/kt photo.jpeg" 
                  alt="Formateur Expert Bilan Carbone®" 
                  className="w-80 h-80 rounded-full mx-auto object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Certifications & Accréditations
              </h2>
              <p className="text-xl text-gray-600">
                Un formateur qualifié et reconnu par les autorités compétentes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((certification, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{certification}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expérience */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Parcours Professionnel
              </h2>
              <p className="text-xl text-gray-600">
                Plus de 10 ans d'expérience dans le domaine environnemental
              </p>
            </div>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mr-6">
                      {experience.annee}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {experience.titre}
                      </h3>
                      <p className="text-lg text-primary font-semibold mb-3">
                        {experience.entreprise}
                      </p>
                      <p className="text-gray-600">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formations dispensées */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Formations Dispensées
              </h2>
              <p className="text-xl text-gray-600">
                Un expert qui forme depuis plus de 5 ans
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {formations.map((formation, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {formation.titre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {formation.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div>Durée : {formation.duree}</div>
                    <div>Participants : {formation.participants}</div>
                  </div>
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
                Ce que disent nos participants
              </h2>
              <p className="text-xl text-gray-600">
                Des retours d'expérience authentiques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {temoignages.map((temoignage, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(temoignage.note)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{temoignage.texte}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{temoignage.nom}</p>
                    <p className="text-sm text-gray-500">{temoignage.entreprise}</p>
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
              Prêt à apprendre avec un expert ?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Rejoignez nos prochaines sessions et bénéficiez de l'expertise 
              d'un formateur reconnu en Bilan Carbone®
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

export default FormateurExpert;






