import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Audience from './components/Audience';
import Programme from './components/Programme';
import DatesTarifsComponent from './components/DatesTarifs';
import FormateurComponent from './components/Formateur';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AboutKTPage from './pages/AboutKT';
import CheckoutPage from './pages/Checkout';
import CheckoutTN from './pages/CheckoutTN';
import CheckoutIntl from './pages/CheckoutIntl';
import PaymentTN from './pages/PaymentTN';
import PaymentIntl from './pages/PaymentIntl';


import AdminFormationsPage from './pages/AdminFormations';
import ContactPage from './pages/Contact';
import DatesTarifs from './pages/DatesTarifs';
import FormateurExpert from './pages/FormateurExpert';
import Certification from './pages/Certification';

import Conseil from './pages/Conseil';
import ConditionsGenerales from './pages/ConditionsGenerales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import MentionsLegales from './pages/MentionsLegales';
import Accessibilite from './pages/Accessibilite';
import KonnectRetour from './pages/checkout/KonnectRetour';
import Connexion from './pages/auth/Connexion';
import Inscription from './pages/auth/Inscription';
import MesFormations from './pages/auth/espaceAbonne/MesFormations';
import FormationContenus from './pages/auth/espaceAbonne/FormationContenus';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Audience />
        <Programme />
        <DatesTarifsComponent />
        <FormateurComponent />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-kt" element={<AboutKTPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout-tn" element={<CheckoutTN />} />
        <Route path="/checkout-intl" element={<CheckoutIntl />} />
        <Route path="/payment-tn" element={<PaymentTN />} />
        <Route path="/payment-intl" element={<PaymentIntl />} />

        <Route path="/admin" element={<AdminFormationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dates-tarifs" element={<DatesTarifs />} />
        <Route path="/formateur-expert" element={<FormateurExpert />} />
        <Route path="/certification" element={<Certification />} />

        <Route path="/conseil" element={<Conseil />} />
        <Route path="/conditions-generales" element={<ConditionsGenerales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="/checkout/konnect/retour" element={<KonnectRetour />} />
        <Route path="/auth/connexion" element={<Connexion />} />
        <Route path="/auth/inscription" element={<Inscription />} />
        <Route path="/espace" element={<MesFormations />} />
        <Route path="/espace/formation/:slug" element={<FormationContenus />} />
      </Routes>
    </div>
  );
}

export default App;