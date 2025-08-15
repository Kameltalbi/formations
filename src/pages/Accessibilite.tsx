import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Accessibility, Eye, Ear, MousePointer, Keyboard, Smartphone } from 'lucide-react';

const Accessibilite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Accessibility className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Accessibilité
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Notre engagement pour un site accessible à tous
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Notre engagement</h2>
                  <p className="text-gray-700 mb-4">
                    KT Consulting & Co s'engage à rendre son site web accessible au plus grand nombre, 
                    conformément aux standards internationaux d'accessibilité web.
                  </p>
                  <p className="text-gray-700">
                    Nous nous efforçons de respecter les recommandations WCAG 2.1 (Web Content Accessibility Guidelines) 
                    niveau AA pour assurer une expérience utilisateur optimale pour tous.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Fonctionnalités d'accessibilité</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Eye className="h-8 w-8 text-primary mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Navigation visuelle</h3>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Contraste élevé pour une meilleure lisibilité</li>
                        <li>• Tailles de police ajustables</li>
                        <li>• Indicateurs visuels clairs pour les liens et boutons</li>
                        <li>• Structure de page cohérente</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Keyboard className="h-8 w-8 text-primary mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Navigation clavier</h3>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Navigation complète au clavier</li>
                        <li>• Ordre de tabulation logique</li>
                        <li>• Indicateurs de focus visibles</li>
                        <li>• Raccourcis clavier pour les actions principales</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Ear className="h-8 w-8 text-primary mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Technologies d'assistance</h3>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Compatible avec les lecteurs d'écran</li>
                        <li>• Textes alternatifs pour les images</li>
                        <li>• Structure sémantique appropriée</li>
                        <li>• Labels explicites pour les formulaires</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Smartphone className="h-8 w-8 text-primary mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Responsive design</h3>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Adaptation à tous les écrans</li>
                        <li>• Navigation tactile optimisée</li>
                        <li>• Boutons de taille appropriée</li>
                        <li>• Zoom jusqu'à 200% sans perte de fonctionnalité</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Raccourcis clavier</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      Voici les raccourcis clavier disponibles sur notre site :
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Navigation générale :</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Tab</kbd> - Naviguer entre les éléments</li>
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Entrée</kbd> - Activer un lien ou bouton</li>
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Échap</kbd> - Fermer les modales</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Navigation rapide :</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 1</kbd> - Aller à l'accueil</li>
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 2</kbd> - Aller aux formations</li>
                          <li><kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 3</kbd> - Aller au contact</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Améliorations continues</h2>
                  <p className="text-gray-700 mb-4">
                    Nous nous engageons à améliorer continuellement l'accessibilité de notre site :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Tests réguliers avec des utilisateurs en situation de handicap</li>
                    <li>Formation de notre équipe aux bonnes pratiques d'accessibilité</li>
                    <li>Veille technologique sur les nouvelles solutions d'accessibilité</li>
                    <li>Audits d'accessibilité périodiques</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Signaler un problème</h2>
                  <p className="text-gray-700 mb-4">
                    Si vous rencontrez des difficultés d'accessibilité sur notre site, 
                    n'hésitez pas à nous le signaler :
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Email :</strong> contact@ktconsulting.info
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Téléphone :</strong> +216 55 053 505
                    </p>
                    <p className="text-gray-700">
                      <strong>Formulaire :</strong> 
                      <Link to="/contact" className="text-primary hover:underline"> Page de contact</Link>
                    </p>
                  </div>
                  <p className="text-gray-700 mt-4">
                    Nous nous engageons à répondre dans les 48h et à corriger les problèmes 
                    signalés dans les plus brefs délais.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Conformité</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Standards respectés :</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>WCAG 2.1 niveau AA</li>
                    <li>Section 508 (États-Unis)</li>
                    <li>Directive européenne sur l'accessibilité</li>
                    <li>Législation tunisienne sur l'accessibilité numérique</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Outils recommandés</h2>
                  <p className="text-gray-700 mb-4">
                    Pour une meilleure expérience, nous recommandons l'utilisation de :
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Lecteurs d'écran :</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• NVDA (Windows, gratuit)</li>
                        <li>• JAWS (Windows)</li>
                        <li>• VoiceOver (macOS, intégré)</li>
                        <li>• TalkBack (Android, intégré)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Outils de navigation :</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Zoom navigateur (Ctrl/Cmd +)</li>
                        <li>• Contraste élevé</li>
                        <li>• Curseur personnalisé</li>
                        <li>• Extensions d'accessibilité</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500">
                    <strong>Dernière mise à jour :</strong> Août 2025<br/>
                    <strong>Version :</strong> 1.0<br/>
                    <strong>Prochaine évaluation :</strong> Décembre 2025
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
              Aidez-nous à améliorer l'accessibilité
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Votre retour est précieux pour nous
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibilite;
