import React from 'react';
import { ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutKTPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Contenu principal */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Texte */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                À propos
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text">
                À propos de <span className="text-primary">KT Consulting & Co</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                KT Consulting & Co est un cabinet tunisien spécialisé dans le{" "}
                <strong>développement de solutions digitales</strong> et l'
                <strong>accompagnement stratégique</strong> des organisations en
                <strong> comptabilité carbone</strong> et transition climatique.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Nous avons conçu <strong>CarboTrack.io</strong>, une plateforme
                innovante qui permet aux TPE/PME et grandes organisations de{" "}
                <strong>mesurer et suivre leurs émissions</strong> de GES de façon
                simple, rapide et fiable—preuve de notre exigence technique et de notre
                excellence opérationnelle.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div className="bg-light p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-text mb-4">Pourquoi nous ?</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      Interface intuitive & UX soignée
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      Calculs conformes à la méthode Bilan Carbone®
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      Résultats actionnables & plans de réduction
                    </li>
                  </ul>
                </div>
                <div className="bg-light p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-text mb-4">Deux chemins possibles</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      Tester le <strong>calculateur gratuit</strong> CarboTrack
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      Commander un <strong>Bilan Carbone® professionnel</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.carbotrack.io"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center"
                >
                  Tester CarboTrack (gratuit)
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
                <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold border border-primary hover:bg-primary/5 transition-colors duration-200">
                  Demander un Bilan professionnel
                </button>
              </div>
            </div>

            {/* Visuel / lien CarboTrack */}
            <div className="space-y-6">
              <a
                href="https://www.carbotrack.io"
                target="_blank"
                rel="noreferrer"
                className="block bg-light rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                aria-label="Visiter CarboTrack.io"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src="/carbotrackHome.png" 
                    alt="CarboTrack.io - Plateforme de calcul et suivi des émissions carbone" 
                    className="w-full h-auto hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="text-primary font-semibold">Cliquez pour visiter</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-center">
                    <div className="text-sm text-primary font-medium">Plateforme développée par KT Consulting</div>
                    <div className="text-xl font-bold text-text mt-1">CarboTrack.io</div>
                    <div className="text-gray-600 text-sm flex items-center justify-center gap-2">
                      <span>Visiter le site</span>
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Informations supplémentaires */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-text mb-4">Nos services</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    Développement de solutions digitales sur mesure
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    Accompagnement stratégique en transition climatique
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    Formation et certification Bilan Carbone®
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    Conseil en comptabilité carbone
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutKTPage;