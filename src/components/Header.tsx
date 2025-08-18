import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Building2, Users } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logos */}
          <div className="flex items-center">
            <Link to="/" className="hover:opacity-80 transition-opacity duration-200">
              <img 
                src="/public/logo-KT-Consulting-2025.png" 
                alt="KT Consulting & Co" 
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/about-kt"
              className="text-text hover:text-primary transition-colors duration-200"
            >
              À propos
            </Link>
            <Link 
              to="/checkout"
              className="text-text hover:text-primary transition-colors duration-200"
            >
              S'inscrire
            </Link>
            <Link 
              to="/contact"
              className="text-text hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/auth/connexion"
              className="text-accent hover:text-emerald-700 transition-colors duration-200 font-semibold"
            >
              Se connecter
            </Link>
            <Link 
              to="/checkout"
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              Acheter
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link 
                to="/about-kt"
                className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/checkout"
                className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                S'inscrire
              </Link>
              <Link 
                to="/contact"
                className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 pt-4 space-y-3">
                <Link 
                  to="/auth/connexion"
                  className="block w-full text-center text-accent hover:text-emerald-700 transition-colors duration-200 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link 
                  to="/checkout"
                  className="w-full bg-accent text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-semibold block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acheter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;