"use client";

import React from 'react';
import { Building2, Globe, ShieldCheck } from 'lucide-react';

export default function InstitutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const categories = [
    { title: 'Institutions publiques', icon: ShieldCheck },
    { title: 'Bureaux d’études', icon: Building2 },
    { title: 'Entreprises', icon: Building2 },
    { title: 'ONGs et OSCs', icon: Globe },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold">{isFR ? 'Institutions du Secteur' : 'Sector Institutions'}</h1>
          <p className="text-gray-600">Explorez les acteurs majeurs du secteur de l'eau au Cameroun.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-gray-50 border border-gray-100 p-8 rounded-lg text-center hover:bg-white hover:shadow-md transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <cat.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
              <button className="mt-6 text-blue-600 font-bold text-sm hover:underline">
                {isFR ? 'Voir les membres' : 'View members'}
              </button>
            </div>
          ))}
        </div>

        <section className="mt-20 bg-blue-900 text-white p-12 rounded-lg text-center space-y-8">
           <h2 className="text-3xl font-bold">Votre institution n’est pas encore listée ?</h2>
           <p className="text-blue-100 max-w-2xl mx-auto">Inscrivez votre organisation au répertoire national pour augmenter votre visibilité institutionnelle.</p>
           <button className="bg-white text-blue-900 px-10 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
              Soumettre l'Institution
           </button>
        </section>
      </div>
    </div>
  );
}
