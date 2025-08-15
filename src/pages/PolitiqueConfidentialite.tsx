import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

const PolitiqueConfidentialite = () => {
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
              <Shield className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Protection de vodonnéess  personnelles et respect de votre vie privée
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    KT Consulting & Co s'engage à protéger la confidentialité et la sécurité de vos données personnelles. 
                    Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.
                  </p>
                  <p className="text-gray-700">
                    <strong>Dernière mise à jour :</strong> Août 2025<br/>
                    <strong>Contact :</strong> contact@ktconsulting.info
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Informations d'identification :</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse postale</li>
                    <li>Nom de l'entreprise</li>
                    <li>Fonction ou poste</li>
                  </ul>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Données de formation :</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Historique des formations suivies</li>
                    <li>Résultats et évaluations</li>
                    <li>Attestations délivrées</li>
                    <li>Préférences de formation</li>
                  </ul>

                  <p className="text-gray-700 mb-4">
                    <strong>Données techniques :</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Horaires de connexion</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalités de la collecte</h2>
                  <p className="text-gray-700 mb-4">
                    Nous utilisons vos données pour :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Gérer vos inscriptions aux formations</li>
                    <li>Personnaliser votre expérience de formation</li>
                    <li>Communiquer sur nos services</li>
                    <li>Améliorer nos formations</li>
                    <li>Répondre à vos demandes</li>
                    <li>Respecter nos obligations légales</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base légale du traitement</h2>
                  <p className="text-gray-700 mb-4">
                    Le traitement de vos données est basé sur :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>L'exécution du contrat :</strong> Pour fournir nos services de formation</li>
                    <li><strong>L'intérêt légitime :</strong> Pour améliorer nos services</li>
                    <li><strong>Le consentement :</strong> Pour les communications marketing</li>
                    <li><strong>L'obligation légale :</strong> Pour la facturation et la comptabilité</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conservation des données</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Données de formation :</strong> Conservées pendant 5 ans pour les obligations légales
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Données de contact :</strong> Conservées tant que vous êtes client actif
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Données techniques :</strong> Conservées pendant 1 an maximum
                  </p>
                  <p className="text-gray-700">
                    <strong>Suppression :</strong> Vos données sont supprimées automatiquement à l'expiration 
                    des délais de conservation.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partage des données</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Pas de vente :</strong> Nous ne vendons jamais vos données personnelles.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Prestataires autorisés :</strong> Nous pouvons partager vos données avec :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Notre plateforme de paiement (Konnect)</li>
                    <li>Nos outils de formation en ligne</li>
                    <li>Nos services de comptabilité</li>
                    <li>Les autorités compétentes (si requis par la loi)</li>
                  </ul>
                  <p className="text-gray-700">
                    <strong>Garanties :</strong> Tous nos prestataires s'engagent à protéger vos données 
                    selon nos standards de sécurité.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sécurité des données</h2>
                  <p className="text-gray-700 mb-4">
                    Nous mettons en place des mesures de sécurité appropriées :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Chiffrement des données en transit et au repos</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance continue de nos systèmes</li>
                    <li>Formation de nos équipes à la sécurité</li>
                    <li>Sauvegardes sécurisées</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Vos droits</h2>
                  <p className="text-gray-700 mb-4">
                    Conformément à la législation tunisienne et européenne, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Droit d'accès :</strong> Connaître les données que nous détenons sur vous</li>
                    <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                    <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                    <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                    <li><strong>Droit de limitation :</strong> Limiter le traitement de vos données</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies et technologies similaires</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Cookies analytiques :</strong> Pour analyser l'utilisation du site
                  </p>
                  <p className="text-gray-700">
                    <strong>Gestion :</strong> Vous pouvez gérer vos préférences cookies dans les paramètres 
                    de votre navigateur.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact et réclamations</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Délégué à la protection des données :</strong> contact@ktconsulting.info
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Réclamations :</strong> Si vous n'êtes pas satisfait de notre réponse, 
                    vous pouvez déposer une réclamation auprès de l'Instance Nationale de Protection 
                    des Données Personnelles (INPDP).
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications de cette politique</h2>
                  <p className="text-gray-700">
                    Nous pouvons mettre à jour cette politique de confidentialité. 
                    Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
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
              Des questions sur la confidentialité ?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Notre équipe est là pour vous rassurer
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

export default PolitiqueConfidentialite;
