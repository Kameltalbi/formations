import React, { useState, useEffect } from 'react';
import { Globe, Leaf, ArrowRight, X } from 'lucide-react';

interface ExitIntentPopupProps {
  isVisible: boolean;
  onClose: () => void;
  showCount?: number;
  maxShows?: number;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isVisible, onClose, showCount = 0, maxShows = 2 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-hide after 15 seconds (plus de temps pour lire le message)
      const timer = setTimeout(() => {
        onClose();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleDiscoverClick = () => {
    window.open('https://carbotrack.io', '_blank');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Popup Container */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ease-out ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group z-10"
        >
          <X className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            🌍 Avant de partir, découvrez CarboTrack.io
          </h2>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed text-sm">
            La plateforme qui démocratise le Bilan Carbone® pour les PME et exportateurs. 
            <span className="font-semibold text-green-600"> Anticipez le MACF européen 2026</span> et réduisez vos émissions dès aujourd'hui.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleDiscoverClick}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
          >
            <span>Découvrir CarboTrack</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-4">
            🌱 Votre partenaire pour la transition énergétique
          </p>
        </div>

        {/* Decorative Elements - Ajustés pour ne pas cacher le bouton */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-300 rounded-full opacity-20 z-0"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-300 rounded-full opacity-20 z-0"></div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
