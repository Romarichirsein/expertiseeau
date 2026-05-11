"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-12 text-center">{isFR ? 'Contactez-nous' : 'Contact Us'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span>contact@expertiseaucameroun.org</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <span>+237 222 23 45 67</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <span>Yaoundé, Cameroun</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-bold mb-2">Horaires</h3>
              <p className="text-sm text-gray-600">Lundi - Vendredi : 08h00 - 17h00</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-100 p-10 rounded-lg shadow-sm space-y-6">
            <h2 className="text-2xl font-bold">Envoyez un message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors">
                {isFR ? 'Envoyer' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
