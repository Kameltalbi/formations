import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Building2, MapPin, Phone, Mail, FileText } from 'lucide-react';

const MentionsLegales = () => {
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
              <Building2 className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Informations légales obligatoires sur notre entreprise et nos services
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Raison sociale :</strong> KT Consulting & Co
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Forme juridique :</strong> Société de conseil
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Adresse :</strong> 3 rue Einstein, 2036 La Soukra, Tunis, Tunisie
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Téléphone :</strong> +216 55 053 505
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Email :</strong> contact@ktconsulting.info
                    </p>
                    <p className="text-gray-700">
                      <strong>Activité :</strong> Formation et conseil en Bilan Carbone® et développement durable
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Hébergeur :</strong> Vercel Inc.
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                    </p>
                    <p className="text-gray-700">
                      <strong>Site web :</strong> <a href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Base de données</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Fournisseur :</strong> Supabase
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Adresse :</strong> 2018 156th Ave NE, Bellevue, WA 98007, États-Unis
                    </p>
                    <p className="text-gray-700">
                      <strong>Site web :</strong> <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a>
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Marques déposées :</strong> Bilan Carbone® est une marque déposée de l'ADEME 
                    (Agence de l'Environnement et de la Maîtrise de l'Énergie).
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Contenu du site :</strong> L'ensemble du contenu de ce site (textes, images, 
                    vidéos, logos) est protégé par le droit d'auteur et appartient à KT Consulting & Co.
                  </p>
                  <p className="text-gray-700">
                    <strong>Utilisation :</strong> Toute reproduction, représentation, modification, 
                    publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, 
                    par quelque procédé que ce soit, et sur quelque support que ce soit est interdite.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Responsabilité</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Contenu :</strong> Les informations contenues sur ce site sont aussi précises 
                    que possible et le site est périodiquement remis à jour, mais peut toutefois contenir 
                    des inexactitudes, des omissions ou des lacunes.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Liens externes :</strong> Ce site peut contenir des liens vers des sites externes. 
                    KT Consulting & Co n'est pas responsable du contenu de ces sites.
                  </p>
                  <p className="text-gray-700">
                    <strong>Limitation :</strong> En aucun cas, KT Consulting & Co ne pourra être tenue 
                    responsable de tout dommage direct ou indirect résultant de l'utilisation de ce site.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Droit applicable</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Législation :</strong> Les présentes mentions légales sont soumises au droit tunisien.
                  </p>
                  <p className="text-gray-700">
                    <strong>Juridiction :</strong> En cas de litige, les tribunaux de Tunis sont seuls compétents.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Protection des données</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Réglementation :</strong> Le traitement des données personnelles est conforme 
                    à la législation tunisienne et européenne sur la protection des données.
                  </p>
                  <p className="text-gray-700">
                    <strong>Détails :</strong> Pour plus d'informations, consultez notre 
                    <Link to="/politique-confidentialite" className="text-primary hover:underline"> politique de confidentialité</Link>.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Utilisation :</strong> Ce site utilise des cookies pour améliorer l'expérience 
                    utilisateur et analyser le trafic.
                  </p>
                  <p className="text-gray-700">
                    <strong>Gestion :</strong> Vous pouvez gérer vos préférences cookies dans les paramètres 
                    de votre navigateur.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Accessibilité</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Engagement :</strong> KT Consulting & Co s'engage à rendre son site accessible 
                    au plus grand nombre.
                  </p>
                  <p className="text-gray-700">
                    <strong>Détails :</strong> Consultez notre 
                    <Link to="/accessibilite" className="text-primary hover:underline"> page d'accessibilité</Link> 
                    pour plus d'informations.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      Pour toute question concernant ces mentions légales :
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Email :</strong> contact@ktconsulting.info
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Téléphone :</strong> +216 55 053 505
                    </p>
                    <p className="text-gray-700">
                      <strong>Adresse :</strong> 3 rue Einstein, 2036 La Soukra, Tunis, Tunisie
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500">
                    <strong>Dernière mise à jour :</strong> Août 2025<br/>
                    <strong>Version :</strong> 1.0
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
              Des questions légales ?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Notre équipe est là pour vous éclairer
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

export default MentionsLegales;
