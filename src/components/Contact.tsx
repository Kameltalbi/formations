import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    societe: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Données du formulaire:', formData);
    setIsSubmitted(true);
    
    // Reset après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        societe: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Inscrivez-vous dès maintenant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prêt à développer votre expertise en Bilan Carbone® ? Contactez-nous pour réserver 
            votre place ou obtenir plus d'informations sur la formation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div className="bg-light p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-text mb-6">
              Formulaire d'inscription
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-text mb-2">
                  Demande envoyée avec succès !
                </h4>
                <p className="text-gray-600">
                  Nous vous recontacterons dans les 24h pour finaliser votre inscription.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-text mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="votre.email@entreprise.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-text mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="societe" className="block text-sm font-semibold text-text mb-2">
                      Société / Organisation
                    </label>
                    <input
                      type="text"
                      id="societe"
                      name="societe"
                      value={formData.societe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text mb-2">
                    Message / Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Parlez-nous de votre projet, vos objectifs, ou posez vos questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer ma demande d'inscription
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
                </p>
              </form>
            )}
          </div>

          {/* Informations de contact */}
          <div>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl border border-primary/20 mb-8">
              <h3 className="text-2xl font-bold text-text mb-6">
                Informations de contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text mb-1">Email</h4>
                    <p className="text-gray-600">formation@archibat-kt.com</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text mb-1">Téléphone</h4>
                    <p className="text-gray-600">+216 71 XXX XXX</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h (GMT+1)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text mb-1">Adresse</h4>
                    <p className="text-gray-600">
                      Centre d'affaires Archibat<br />
                      Tunis, Tunisie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h4 className="text-lg font-semibold text-text mb-4">
                Pourquoi choisir notre formation ?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Formation certifiante reconnue</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Approche 100% pratique</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Formateur expert avec 10+ ans d'expérience</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Suivi post-formation inclus</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Outils et modèles prêts à l'emploi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;