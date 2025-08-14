import React from 'react';
import { ExternalLink } from 'lucide-react';
import Header from '../components/Header';

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
                className="block bg-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                aria-label="Visiter CarboTrack.io"
              >
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/10 to-white rounded-xl grid place-items-center">
                  <div className="text-center">
                    <div className="mb-4 text-sm text-primary font-medium">Plateforme développée par KT Consulting</div>
                    <div className="text-2xl font-bold text-text mb-2">CarboTrack.io</div>
                    <div className="text-gray-600">Calculateur express • Suivi des émissions • Rapports</div>
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
    </div>
  );
};

export default AboutKTPage;