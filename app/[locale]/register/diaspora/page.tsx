"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterDiasporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold">Inscription Expert Diaspora</h1>
          <p className="text-gray-600 font-medium italic">« Vous êtes camerounais et vous vivez hors du cameroun »</p>
        </div>

        <form className="bg-gray-50 border border-gray-100 p-10 rounded-lg shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Nom</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Prénom</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Profession</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Pays de Résidence</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Confirmer</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded font-bold hover:bg-blue-700 transition-colors uppercase tracking-widest">
            {isFR ? 'Enregistrez vous' : 'Register now'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Déjà un compte ? <Link href={`/${locale}/login`} className="text-blue-600 font-bold hover:underline">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
