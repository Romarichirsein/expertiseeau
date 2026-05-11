"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';

  return (
    <footer className="bg-gray-100 py-16 text-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900">Renseignements généraux</h4>
            <div className="flex items-center gap-4">
              <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
              <p className="text-sm font-semibold">Les Experts en Eaux au Cameroun</p>
            </div>
            <p className="text-sm leading-relaxed">
              {isFR 
                ? "Partageons et mutualisons nos compétences pour un secteur de l'eau durable."
                : "Let's share and pool our skills for a sustainable water sector."}
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900">Adresse de l’atelier</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900">Heure d’ouverture</h4>
            <div className="text-sm space-y-2">
              <p>Lundi - Vendredi : 08h00 - 17h00</p>
              <p>Samedi - Dimanche : Fermé</p>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900">Get your free weekly tips!</h4>
            <div className="space-y-4">
              <p className="text-sm">Inscrivez-vous à notre newsletter.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-colors">OK</button>
              </div>
              <p className="text-xs text-gray-400">
                Propulsé par <a href="https://fydygroup.cm/" className="underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">fydytech</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
          © 2026 EXPERTISE AU CAMEROUN. TOUS DROITS RÉSERVÉS.
        </div>
      </div>
    </footer>
  );
}
