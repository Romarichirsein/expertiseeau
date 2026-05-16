"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Globe, Search, 
  ExternalLink, ShieldCheck, School, 
  Users, Landmark, Filter 
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

interface Institution {
  id: number;
  sigle: string;
  nom: string;
  siege: string;
  mandat: string;
  site: string;
  category: string;
  noms?: string;
  ville?: string;
  region?: string;
  specialites?: string;
}

export const CATEGORIES = [
  { id: 'publiques', label: 'Institutions publiques', icon: Landmark, href: '/institutions' },
  { id: 'appui', label: 'Appui au développement', icon: ShieldCheck, href: '/education-et-recherche' },
  { id: 'bureaux', label: 'Bureaux d’études', icon: Building2, href: '/acteur-publics' },
  { id: 'enseignement', label: 'Enseignement', icon: School, href: '/entreprises' },
  { id: 'entreprises', label: 'Entreprises', icon: Building2, href: '/acteur-dappui-au-developpement' },
  { id: 'transfrontaliere', label: 'Transfrontalière', icon: Globe, href: '/institution-transfrontaliere' },
  { id: 'ongs', label: 'ONGs et OSCs', icon: Users, href: '/ongs-et-oscs-2' },
];

export function InstitutionCategoryView({ locale, categoryId, title, titleEn }: { locale: string, categoryId: string, title: string, titleEn: string }) {
  const isFR = locale === 'fr';

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch('/data/institutions.json');
        const data = await response.json();
        setInstitutions(data);
      } catch (error) {
        console.error("Error loading institutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const filteredInstitutions = useMemo(() => {
    return institutions.filter(inst => {
      const matchesCategory = inst.category === categoryId;
      const matchesSearch = 
        (inst.nom?.toLowerCase() || '').includes(search.toLowerCase()) || 
        (inst.sigle?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (inst.noms?.toLowerCase() || '').includes(search.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [institutions, search, categoryId]);

  const renderTableHeader = () => {
    switch (categoryId) {
      case 'publiques':
        return (
          <tr>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">N°</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Acteurs</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Sigle</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Siège</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Mandat</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Site</th>
          </tr>
        );
      case 'appui':
      case 'bureaux':
      case 'enseignement':
      case 'entreprises':
        return (
          <tr>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">N°</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Noms</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Ville Siège</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Région</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Spécialités</th>
          </tr>
        );
      case 'ongs':
        return (
          <tr>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">N°</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Noms</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Ville Siège</th>
            <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">Région</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderTableRow = (inst: any, index: number) => {
    switch (categoryId) {
      case 'publiques':
        return (
          <tr key={inst.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{inst.id}</td>
            <td className="px-6 py-4 text-sm text-gray-600 font-bold">{inst.nom}</td>
            <td className="px-6 py-4 text-sm font-black text-blue-600">{inst.sigle}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{inst.siege}</td>
            <td className="px-6 py-4 text-sm text-gray-500 italic leading-relaxed max-w-md">{inst.mandat}</td>
            <td className="px-6 py-4 text-sm">
              {inst.site && inst.site !== '-' ? (
                <a href={inst.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-bold">
                  Lien <ExternalLink size={14} />
                </a>
              ) : '-'}
            </td>
          </tr>
        );
      default:
        return (
          <tr key={inst.id || index} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{inst.id || index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-600 font-bold">{inst.nom || inst.noms}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{inst.ville || inst.siege}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{inst.region}</td>
            {categoryId !== 'ongs' && (
              <td className="px-6 py-4 text-sm text-gray-500">{inst.specialites}</td>
            )}
          </tr>
        );
    }
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? title : titleEn} 
        breadcrumbs={[
          { label: isFR ? 'Institutions' : 'Institutions', href: `/${locale}/institutions` },
          { label: isFR ? title : titleEn }
        ]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        {/* CATEGORY NAV (Tabs lookalike) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}${cat.href}`}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm uppercase tracking-tight transition-all shadow-sm ${
                categoryId === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <cat.icon size={16} />
              {cat.label}
            </Link>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher par nom ou sigle..." : "Search by name or acronym..."}
              className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-blue-900/5 focus:ring-2 focus:ring-blue-600 transition-all text-lg font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* CONTENT - TABLE */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-100">
                {renderTableHeader()}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [...Array(10)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredInstitutions.map((inst, index) => renderTableRow(inst, index))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {!loading && filteredInstitutions.length === 0 && (
          <div className="text-center py-24 mt-8 bg-white rounded-[50px] shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isFR ? 'Aucune institution trouvée' : 'No institution found'}
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {isFR ? "Les données pour cette catégorie sont en cours d'intégration ou ne correspondent pas à votre recherche." : "Data for this category is being integrated or does not match your search."}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <section className="mt-24 bg-[#292929] text-white p-12 md:p-20 rounded-[60px] text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
              {isFR ? 'Votre institution n’est pas encore listée ?' : 'Your institution is not listed yet?'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {isFR 
                ? 'Inscrivez votre organisation au répertoire national pour augmenter votre visibilité institutionnelle et faciliter les collaborations.' 
                : 'Register your organization in the national directory to increase your institutional visibility and facilitate collaborations.'}
            </p>
            <button className="bg-[#34b4e2] text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-500/20 group-hover:scale-105">
              {isFR ? 'Soumettre une Institution' : 'Submit an Institution'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
