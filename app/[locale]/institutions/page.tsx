"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Globe, Search, 
  ExternalLink, ShieldCheck, School, 
  Users, Landmark, Filter 
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

interface Institution {
  id: number;
  sigle: string;
  nom: string;
  siege: string;
  mandat: string;
  site: string;
}

const CATEGORIES = [
  { id: 'publiques', label: 'Institutions publiques', icon: Landmark },
  { id: 'appui', label: 'Appui au développement', icon: ShieldCheck },
  { id: 'enseignement', label: 'Enseignement', icon: School },
  { id: 'entreprises', label: 'Entreprises', icon: Building2 },
  { id: 'ongs', label: 'ONGs et OSCs', icon: Users },
];

export default function InstitutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('publiques');

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
      const matchesSearch = 
        inst.nom.toLowerCase().includes(search.toLowerCase()) || 
        inst.sigle.toLowerCase().includes(search.toLowerCase());
      
      // Currently all data in JSON is 'publiques', so we filter by search only if category is 'publiques'
      if (selectedCategory !== 'publiques') return false; 
      
      return matchesSearch;
    });
  }, [institutions, search, selectedCategory]);

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Institutions du Secteur' : 'Sector Institutions'} 
        breadcrumbs={[{ label: isFR ? 'Institutions' : 'Institutions' }]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        {/* CATEGORY SELECTOR */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all shadow-sm ${
                selectedCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <cat.icon size={20} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher par nom ou sigle..." : "Search by name or acronym..."}
              className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[30px] shadow-xl shadow-blue-900/5 focus:ring-2 focus:ring-blue-600 transition-all text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-20 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredInstitutions.map((inst) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={inst.id}
                  className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 group relative overflow-hidden"
                >
                  {/* Sigle Watermark */}
                  <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    {inst.sigle}
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg mb-2">
                          {isFR ? 'Institution Publique' : 'Public Institution'}
                        </span>
                        <h3 className="text-3xl font-black text-gray-900 leading-tight">
                          {inst.sigle}
                        </h3>
                        <p className="text-gray-500 font-medium">{inst.nom}</p>
                      </div>
                      <div className="w-14 h-14 bg-gray-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Landmark size={28} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-50">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                          "{inst.mandat}"
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <MapPin size={16} className="text-blue-600" />
                          {inst.siege}
                        </div>
                        {inst.site && (
                          <a 
                            href={inst.site} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline"
                          >
                            <Globe size={16} />
                            Site web
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredInstitutions.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[50px] shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isFR ? 'Aucune institution trouvée' : 'No institution found'}
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {selectedCategory !== 'publiques' 
                ? (isFR ? `Les données pour cette catégorie sont en cours d'intégration.` : `Data for this category is being integrated.`)
                : (isFR ? "Essayez de modifier vos critères de recherche." : "Try modifying your search criteria.")}
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
