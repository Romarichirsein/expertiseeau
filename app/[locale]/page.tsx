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
      <section className="relative h-[600px] flex items-center justify-center text-white text-center overflow-hidden">
        {/* Background Overlay to match WP style */}
        <div className="absolute inset-0 bg-[#0a5694] opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {isFR ? (
              <>
                “Les experts de l’eau,<br />
                partageons et mutualisons nos compétences!
              </>
            ) : (
              <>
                “Water experts,<br />
                let's share and pool our skills!
              </>
            )}
          </h1>
          <Link href={`/${locale}/login`}>
            <button className="bg-white text-[#0a5694] px-12 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              {isFR ? 'Connexion' : 'Login'}
            </button>
          </Link>
        </div>
      </section>

      {/* 2. SOLIDARITY SECTION */}
      <section className="py-24 text-center border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Bienvenue!</h2>
          <p className="text-2xl font-bold mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {isFR 
              ? "L’eau est une ressource finie, rare et dont la mobilisation nécessite des ressources et une solidarité de tout temps."
              : "Water is a finite, rare resource, the mobilization of which requires resources and constant solidarity."}
          </p>
          <a href="https://fairmontvaltex.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xl font-bold hover:underline decoration-2 underline-offset-4">
            FAIRMONT VALTEX
          </a>
        </div>
      </section>

      {/* 3. EXPERTS SPLIT SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resident */}
          <div className="bg-white p-16 rounded-lg shadow-sm text-center space-y-8 border border-gray-100">
            <h2 className="text-5xl font-bold text-gray-900">Experts Résident</h2>
            <p className="text-gray-600 font-medium italic text-lg">« Vous êtes camerounais et vous vivez au cameroun »</p>
            <Link href={`/${locale}/register/resident`}>
              <button className="bg-[#0a5694] text-white px-10 py-4 rounded font-bold text-lg hover:bg-blue-800 transition-colors shadow-md">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
          {/* Diaspora */}
          <div className="bg-white p-16 rounded-lg shadow-sm text-center space-y-8 border border-gray-100">
            <h2 className="text-5xl font-bold text-gray-900">Experts Diaspora</h2>
            <p className="text-gray-600 font-medium italic text-lg">« Vous êtes camerounais et vous vivez hors du cameroun »</p>
            <Link href={`/${locale}/register/diaspora`}>
              <button className="bg-[#0a5694] text-white px-10 py-4 rounded font-bold text-lg hover:bg-blue-800 transition-colors shadow-md">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WATER IS LIFE SECTION */}
      <section className="py-24 text-center bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">L’eau est la vie. Nous avons le devoir de prendre soin</h2>
          <p className="text-2xl text-gray-600 font-medium leading-relaxed italic">
            Pour que les générations futurs puissent en profiter au maximum de cela.
          </p>
        </div>
      </section>

      {/* 5. DOMAINS SECTION */}
      <section className="py-24 text-center bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">Domaines d’expertise…</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            {[
              'Hydrobiologie', 'Qualité de l’eau', 'Hydrologie',
              'Hydrogéologie', 'Ingénierie fluviale', 'Sciences aquacoles',
              'Suivi des barrages', 'Approvisionnement en eau', 'Assainissement liquide',
              'Station de pompage', 'Luttes contre les pollutions'
            ].map((domain) => (
              <div key={domain} className="flex items-center gap-4 font-bold text-gray-700 text-lg">
                <span className="w-3 h-3 bg-[#0a5694] rounded-full flex-shrink-0"></span>
                {domain}
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link href={`/${locale}/about`} className="text-blue-600 text-xl font-bold hover:underline decoration-2 underline-offset-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">Vos experts vous parlent de leurs expériences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[
               { name: 'Silvia Cruz', role: 'Practising for 4 months' },
               { name: 'Hector Aldo', role: 'Practising for 2 months' },
               { name: 'Calliope Grey', role: 'Practising for 6 months' }
             ].map((expert) => (
               <div key={expert.name} className="space-y-6">
                 <p className="text-gray-600 italic text-lg leading-relaxed">"Fusce nec tellus sed augue semper porta mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh."</p>
                 <div className="pt-4">
                    <h4 className="font-bold text-xl text-gray-900">{expert.name}</h4>
                    <p className="text-sm text-blue-600 font-bold uppercase tracking-widest mt-1">{expert.role}</p>
                 </div>
               </div>
             ))}
          </div>
          <p className="mt-24 font-black text-[#0a5694] text-xl uppercase tracking-[0.2em] italic max-w-3xl mx-auto leading-relaxed">
            ” COMMENCEZ VOTRE JOURNEE AVEC LES CONSEILS DE NOS EXPERTS ”
          </p>
        </div>
      </section>

      {/* 7. WATER SOURCE SECTION */}
      <section className="py-24 text-center bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">L’eau, source de vie?</h2>
          <p className="text-2xl text-gray-700 font-medium leading-relaxed italic">
            Prendre de l’eau, est une priorité majeur sur tout le globe car, un pourcentage élevé est remarqué.
          </p>
        </div>
      </section>

      {/* 8. PARTNERS SECTION */}
      <section className="py-24 text-center border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">Partenaires</h2>
          <div className="flex flex-wrap justify-center items-center gap-16 grayscale hover:grayscale-0 transition-all opacity-70">
            {['minee.png', 'eu.jpg', 'unesco.png', 'gwp.png', 'un-water.png', 'france.png'].map((img) => (
              <img key={img} src={`/images/partners/${img}`} alt="Partner" className="h-16 w-auto object-contain" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
