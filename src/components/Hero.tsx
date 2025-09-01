import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const formationImages = [
    '/formation bilan carbone .jpg',
    '/formation bilan carbone 1.jpg',
    '/formation bilan carbone 2.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % formationImages.length
      );
    }, 3000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

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
              <div className="mb-2">Bilan Carbone® :</div>
              <div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  La méthode
                </span>{' '}
                pour réduire vos émissions
              </div>
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
            {/* Section Carrousel d'images */}
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative">
                <img 
                  src={formationImages[currentImageIndex]}
                  alt={`Formation Bilan Carbone - Image ${currentImageIndex + 1}`}
                  className="w-full aspect-video object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-text mb-2 text-center">
                  Images de la dernière session de fin Mai - début Juin
                </h3>
                <div className="flex justify-center space-x-2 mb-3">
                  {formationImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Défilement automatique des photos de formation
                  </span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;