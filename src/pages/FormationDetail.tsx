import React from 'react';
import { TrainingDetail } from './PlanFormations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FormationDetailPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TrainingDetail />
        </div>
      </main>
      <Footer />
    </>
  );
}
