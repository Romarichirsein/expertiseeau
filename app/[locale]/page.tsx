"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="bg-blue-900 py-32 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            {isFR ? "“Les experts de l’eau, partageons et mutualisons nos compétences!" : "“Water experts, let's share and pool our skills!"}
          </h1>
          <Link href={`/${locale}/login`}>
            <button className="bg-white text-blue-900 px-10 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors">
              {isFR ? 'Connexion' : 'Login'}
            </button>
          </Link>
        </div>
      </section>

      {/* 2. SOLIDARITY SECTION */}
      <section className="py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            {isFR 
              ? "L’eau est une ressource finie, rare et dont la mobilisation nécessite des ressources et une solidarité de tout temps."
              : "Water is a finite, rare resource, the mobilization of which requires resources and constant solidarity."}
          </h2>
          <a href="https://fairmontvaltex.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">
            FAIRMONT VALTEX
          </a>
        </div>
      </section>

      {/* 3. EXPERTS SPLIT SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resident */}
          <div className="bg-white p-12 rounded-lg shadow-sm text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Experts Résident</h2>
            <p className="text-gray-600 font-medium italic">« Vous êtes camerounais et vous vivez au cameroun »</p>
            <Link href={`/${locale}/register`}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
          {/* Diaspora */}
          <div className="bg-white p-12 rounded-lg shadow-sm text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Experts Diaspora</h2>
            <p className="text-gray-600 font-medium italic">« Vous êtes camerounais et vous vivez hors du cameroun »</p>
            <Link href={`/${locale}/register`}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WATER IS LIFE SECTION */}
      <section className="py-20 text-center bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">L’eau est la vie. Nous avons le devoir de prendre soin</h2>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            Pour que les générations futurs puissent en profiter au maximum de cela.
          </p>
        </div>
      </section>

      {/* 5. DOMAINS SECTION */}
      <section className="py-20 text-center bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Domaines d’expertise…</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            {[
              'Hydrobiologie', 'Qualité de l’eau', 'Hydrologie',
              'Hydrogéologie', 'Ingénierie fluviale', 'Sciences aquacoles',
              'Suivi des barrages', 'Approvisionnement en eau', 'Assainissement liquide',
              'Station de pompage', 'Luttes contre les pollutions'
            ].map((domain) => (
              <div key={domain} className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                {domain}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href={`/${locale}/about`} className="text-blue-600 font-bold hover:underline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12">Vos experts vous parlent de leurs expériences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { name: 'Silvia Cruz', role: 'Practising for 4 months' },
               { name: 'Hector Aldo', role: 'Practising for 2 months' },
               { name: 'Calliope Grey', role: 'Practising for 6 months' }
             ].map((expert) => (
               <div key={expert.name} className="space-y-4">
                 <p className="text-gray-600 italic">"Fusce nec tellus sed augue semper porta mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh."</p>
                 <h4 className="font-bold text-lg">{expert.name}</h4>
                 <p className="text-xs text-blue-600 font-bold uppercase">{expert.role}</p>
               </div>
             ))}
          </div>
          <p className="mt-20 font-bold text-blue-900 uppercase tracking-widest italic">
            ” COMMENCEZ VOTRE JOURNEE AVEC LES CONSEILS DE NOS EXPERTS ”
          </p>
        </div>
      </section>

      {/* 7. WATER SOURCE SECTION */}
      <section className="py-20 text-center bg-blue-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">L’eau, source de vie?</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Prendre de l’eau, est une priorité majeur sur tout le globe car, un pourcentage élevé est remarqué.
          </p>
        </div>
      </section>

      {/* 8. PARTNERS SECTION */}
      <section className="py-20 text-center border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Partenaires</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {/* Partners images would go here */}
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
