import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Audience from './components/Audience';
import Programme from './components/Programme';
import DatesTarifs from './components/DatesTarifs';
import Formateur from './components/Formateur';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AboutKTPage from './pages/AboutKT';
import CheckoutPage from './pages/Checkout';
import PlanFormationsPage from './pages/PlanFormations';
import FormationDetailPage from './pages/FormationDetail';
import AdminFormationsPage from './pages/AdminFormations';
import ContactPage from './pages/Contact';
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
        <DatesTarifs />
        <Formateur />
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
        <Route path="/formations" element={<PlanFormationsPage />} />
        <Route path="/formations/:slug" element={<FormationDetailPage />} />
        <Route path="/admin" element={<AdminFormationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/connexion" element={<Connexion />} />
        <Route path="/auth/inscription" element={<Inscription />} />
        <Route path="/espace" element={<MesFormations />} />
        <Route path="/espace/formation/:slug" element={<FormationContenus />} />
      </Routes>
    </div>
  );
}

export default App;