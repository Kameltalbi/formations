import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, BarChart3 } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-light to-green-50 pt-24 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
              Bilan Carbone® :{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                La méthode
              </span>{' '}
              pour réduire vos émissions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Formation professionnelle certifiante pour maîtriser la méthodologie Bilan Carbone® 
              et accompagner votre organisation vers la neutralité carbone. 
              Co-organisée par Archibat et KT Consulting & Co.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to="/checkout"
                className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
              >
                S'inscrire maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-gray-600">Séances intensives</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-1">100%</div>
                <div className="text-sm text-gray-600">Pratique</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">Certifiée</div>
                <div className="text-sm text-gray-600">Attestation officielle</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section Vidéo */}
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <video 
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src="/video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Découvrez la méthodologie Bilan Carbone®</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Vidéo de présentation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Statistiques */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Scope 1 (Direct)</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Scope 2 (Énergie)</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Scope 3 (Indirect)</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-text mb-1">2.5 tCO₂e</div>
                <div className="text-xs text-gray-600">Réduction moyenne par employé</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;