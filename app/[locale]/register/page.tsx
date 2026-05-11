"use client";

import React from 'react';
import Link from 'next/link';

export default function RegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h1 className="text-4xl font-bold mb-12">{isFR ? 'Inscription' : 'Registration'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resident */}
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-100 space-y-6">
            <h2 className="text-3xl font-bold">Experts Résident</h2>
            <p className="text-gray-600 font-medium italic">« Vous êtes camerounais et vous vivez au cameroun »</p>
            <Link href={`/${locale}/register/resident`}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors w-full">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
          
          {/* Diaspora */}
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-100 space-y-6">
            <h2 className="text-3xl font-bold">Experts Diaspora</h2>
            <p className="text-gray-600 font-medium italic">« Vous êtes camerounais et vous vivez hors du cameroun »</p>
            <Link href={`/${locale}/register/diaspora`}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors w-full">
                {isFR ? 'Enregistrez vous' : 'Register now'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
