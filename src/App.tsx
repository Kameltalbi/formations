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
      </Routes>
    </div>
  );
}

export default App;