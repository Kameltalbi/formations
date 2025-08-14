import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Quels sont les prérequis pour suivre cette formation ?',
      answer: 'Aucun prérequis technique n\'est nécessaire. La formation s\'adresse à tous les professionnels souhaitant acquérir une expertise en Bilan Carbone®, quel que soit leur niveau de départ. Une connaissance de base d\'Excel est recommandée pour les exercices pratiques, mais nous accompagnons chaque participant selon ses besoins.'
    },
    {
      question: 'Quel est le niveau de difficulté de la formation ?',
      answer: 'La formation est conçue pour être accessible à tous les niveaux. Nous commençons par les fondamentaux de la méthodologie Bilan Carbone® puis progressons vers des aspects plus techniques. Les exercices pratiques sont adaptés au niveau de chaque participant grâce à un accompagnement personnalisé tout au long des 4 séances.'
    },
    {
      question: 'Quel support technique et pédagogique est fourni ?',
      answer: 'Vous recevez un accès complet à notre plateforme de formation avec tous les supports (guides méthodologiques, modèles Excel, vidéos explicatives), un support technique disponible pendant toute la durée de la formation, et un suivi post-formation pour répondre à vos questions pratiques lors de vos premiers bilans carbone.'
    },
    {
      question: 'Quelle est la politique d\'annulation et de remboursement ?',
      answer: 'Vous pouvez annuler votre inscription jusqu\'à 15 jours avant le début de la formation pour un remboursement complet. Entre 15 et 7 jours avant le début, 50% du montant est remboursé. Moins de 7 jours avant, aucun remboursement n\'est possible, mais vous pouvez reporter votre inscription sur une session ultérieure sans frais supplémentaires.'
    },
    {
      question: 'Y a-t-il des replays ou enregistrements des séances ?',
      answer: 'Oui, toutes les séances sont enregistrées et mises à disposition des participants pendant 6 mois après la formation. Vous pouvez ainsi revoir les concepts abordés, rattraper une séance manquée, ou approfondir certains points. Les supports de cours restent également accessibles via notre plateforme.'
    },
    {
      question: 'Comment obtenir une facture pour ma formation ?',
      answer: 'Une facture officielle est automatiquement générée après confirmation de votre paiement. Pour les entreprises tunisiennes, nous fournissons une facture conforme à la réglementation locale avec TVA si applicable. Pour les participants internationaux, nous émettons une facture en USD. Les factures sont envoyées par email sous 48h maximum.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Trouvez rapidement les réponses à vos questions sur la formation Bilan Carbone®
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-text pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-text mb-2">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-4">
              Notre équipe est là pour vous accompagner dans votre projet de formation
            </p>
            <Link 
              to="/checkout"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              S'inscrire maintenant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;