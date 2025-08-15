import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, Calendar, CreditCard, Users, Shield } from 'lucide-react';

const ConditionsGenerales = () => {
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
              <FileText className="h-20 w-20 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Conditions Générales
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Conditions générales de vente et d'utilisation de nos services
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Présentation de l'entreprise</h2>
                  <p className="text-gray-700 mb-4">
                    KT Consulting & Co est une société de conseil spécialisée dans la formation et l'accompagnement 
                    en Bilan Carbone® et développement durable.
                  </p>
                  <p className="text-gray-700">
                    <strong>Adresse :</strong> 3 rue Einstein, 2036 La Soukra, Tunis, Tunisie<br/>
                    <strong>Téléphone :</strong> +216 55 053 505<br/>
                    <strong>Email :</strong> contact@ktconsulting.info
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services proposés</h2>
                  <p className="text-gray-700 mb-4">
                    Nous proposons les services suivants :
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Formations Bilan Carbone® (Niveaux 1, 2 et 3)</li>
                    <li>Services de conseil en développement durable</li>
                    <li>Accompagnement à la transition écologique</li>
                    <li>Formation interne d'équipes</li>
                    <li>Reporting RSE</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tarifs et modalités de paiement</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Formations :</strong> Les prix sont exprimés en Dinars Tunisiens (DT) et en Dollars US (USD). 
                    Les tarifs incluent la formation, les supports pédagogiques et l'attestation de participation.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Conseil :</strong> Les tarifs sont établis sur devis personnalisé selon la complexité 
                    du projet et la durée d'intervention.
                  </p>
                  <p className="text-gray-700">
                    <strong>Paiement :</strong> 50% à la commande, 50% avant le début de la prestation. 
                    Paiement par virement bancaire ou via notre plateforme de paiement sécurisée.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Réservation et annulation</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Réservation :</strong> Les réservations sont confirmées à réception du paiement initial 
                    et de la confirmation écrite de notre part.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Annulation :</strong> Aucune annulation n'est possible après confirmation de la réservation. 
                    Les formations et services sont non remboursables.
                  </p>
                  <p className="text-gray-700">
                    <strong>Report :</strong> En cas de force majeure, nous nous réservons le droit de reporter 
                    une session de formation. Les participants seront informés au plus tard 48h à l'avance.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Déroulement des formations</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Horaires :</strong> 9h00 - 17h00 avec pauses café et déjeuner incluses.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Lieu :</strong> Centre de formation à Tunis ou en ligne selon le format choisi.
                  </p>
                  <p className="text-gray-700">
                    <strong>Matériel :</strong> Ordinateur personnel recommandé. Supports pédagogiques fournis.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Certification et attestation</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Attestation :</strong> Une attestation de participation est délivrée à la fin de chaque formation.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Certification ADEME :</strong> Nos formations préparent à la certification officielle ADEME 
                    mais ne constituent pas la certification elle-même.
                  </p>
                  <p className="text-gray-700">
                    <strong>Validation :</strong> La validation des compétences est continue tout au long de la formation.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentialité et propriété intellectuelle</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Confidentialité :</strong> Toutes les informations échangées lors des formations et consultations 
                    sont strictement confidentielles.
                  </p>
                  <p className="text-gray-700">
                    <strong>Propriété intellectuelle :</strong> Les supports de formation et la méthodologie 
                    restent la propriété de KT Consulting & Co.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Responsabilité</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Limitation :</strong> Notre responsabilité est limitée au montant des sommes versées 
                    pour la prestation concernée.
                  </p>
                  <p className="text-gray-700">
                    <strong>Exclusion :</strong> Nous ne pouvons être tenus responsables des dommages indirects 
                    ou des pertes d'exploitation.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Droit applicable et juridiction</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>Droit applicable :</strong> Les présentes conditions sont soumises au droit tunisien.
                  </p>
                  <p className="text-gray-700">
                    <strong>Juridiction :</strong> En cas de litige, les tribunaux de Tunis sont seuls compétents.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modification des conditions</h2>
                  <p className="text-gray-700">
                    Nous nous réservons le droit de modifier ces conditions générales. 
                    Les nouvelles conditions seront applicables aux commandes suivantes.
                  </p>
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
              Des questions sur nos conditions ?
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

export default ConditionsGenerales;
