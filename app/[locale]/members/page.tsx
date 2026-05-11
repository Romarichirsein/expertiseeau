"use client";

import React, { useState } from 'react';
import { Search, MapPin, Award } from 'lucide-react';

const mockExperts = [
  { id: 1, name: 'Jean-Paul Akono', expertise: 'Hydrogéologie', city: 'Yaoundé', experience: '12 ans' },
  { id: 2, name: 'Marie Ngo Ngue', expertise: 'Qualité de l’eau', city: 'Douala', experience: '8 ans' },
  { id: 3, name: 'Samuel Eto’o', expertise: 'Hydrologie', city: 'Bafoussam', experience: '15 ans' },
];

export default function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const [search, setSearch] = useState('');

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold">{isFR ? 'Répertoire des Experts' : 'Experts Directory'}</h1>
          <p className="text-gray-600">Trouvez les professionnels du secteur de l'eau au Cameroun.</p>
        </div>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher un expert..." : "Search for an expert..."}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockExperts.map((expert) => (
            <div key={expert.id} className="bg-white border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                {expert.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                <p className="text-blue-600 font-bold text-sm uppercase">{expert.expertise}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                {expert.city}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Award size={16} />
                {expert.experience}
              </div>
              <button className="w-full bg-gray-900 text-white py-2 rounded font-bold text-sm hover:bg-gray-800 transition-colors">
                {isFR ? 'Voir le Profil' : 'View Profile'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
