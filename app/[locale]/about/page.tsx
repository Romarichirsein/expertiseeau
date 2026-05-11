"use client";

import React from 'react';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center">{isFR ? 'À Propos' : 'About Us'}</h1>
        
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900 border-l-4 border-blue-600 pl-4">Notre Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {isFR 
                ? "L’eau est une ressource finie, rare et dont la mobilisation nécessite des ressources et une solidarité de tout temps. Notre mission est de mutualiser les compétences des experts pour relever les défis du secteur au Cameroun."
                : "Water is a finite, rare resource, the mobilization of which requires resources and constant solidarity. Our mission is to pool the skills of experts to meet the challenges of the sector in Cameroon."}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pourquoi nous ?</h3>
              <p className="text-gray-600">Nous réunissons les meilleurs talents du secteur de l'eau, qu'ils soient au Cameroun ou dans la diaspora.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Notre Vision</h3>
              <p className="text-gray-600">Devenir la plateforme de référence pour toute expertise technique certifiée en Afrique Centrale.</p>
            </div>
          </section>

          <section className="bg-gray-50 p-12 rounded-lg text-center space-y-6">
            <h2 className="text-2xl font-bold">Rejoignez-nous aujourd'hui</h2>
            <p className="text-gray-600">Contribuez au développement durable du Cameroun.</p>
            <button className="bg-blue-600 text-white px-10 py-3 rounded font-bold hover:bg-blue-700 transition-colors">
              {isFR ? "S'inscrire" : 'Register now'}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
