"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Filter,
  Users,
  ChevronRight,
  ChevronLeft,
  User,
  Loader2,
  Briefcase,
  ArrowRight,
  Award,
  ShieldCheck,
  X,
  ChevronDown,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { getApprovedExperts } from '@/lib/actions';

const ITEMS_PER_PAGE = 12;

export default function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  useEffect(() => {
    async function loadExperts() {
      const data = await getApprovedExperts();
      setExperts(data || []);
      setLoading(false);
    }
    loadExperts();
  }, []);

  const parseExpertise = (exp: any): string[] => {
    if (Array.isArray(exp)) return exp;
    if (typeof exp === 'string') {
      try {
        const parsed = JSON.parse(exp);
        return Array.isArray(parsed) ? parsed : [exp];
      } catch {
        return [exp];
      }
    }
    return [];
  };

  const allExpertise = useMemo(() => {
    const set = new Set<string>();
    experts.forEach(e => {
      parseExpertise(e.expertise).forEach((ex: string) => set.add(ex));
    });
    return ['All', ...Array.from(set).sort()];
  }, [experts]);

  const allCities = useMemo(() => {
    const set = new Set<string>();
    experts.forEach(e => {
      if (e.city) set.add(e.city);
    });
    return ['All', ...Array.from(set).sort()];
  }, [experts]);

  const filteredMembers = useMemo(() => {
    return experts.filter(m => {
      const name = m.name || '';
      const profession = m.profession || '';
      const matchesSearch = 
        name.toLowerCase().includes(search.toLowerCase()) ||
        profession.toLowerCase().includes(search.toLowerCase());
      
      const expArray = parseExpertise(m.expertise);
      const matchesExpertise = 
        selectedExpertise === 'All' || 
        expArray.includes(selectedExpertise);

      const matchesCity =
        selectedCity === 'All' ||
        (m.city || '') === selectedCity;

      return matchesSearch && matchesExpertise && matchesCity;
    });
  }, [search, selectedExpertise, selectedCity, experts]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedExpertise, selectedCity]);

  const activeFiltersCount = [
    selectedExpertise !== 'All',
    selectedCity !== 'All',
    search !== ''
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearch('');
    setSelectedExpertise('All');
    setSelectedCity('All');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-inter pb-32">
      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-[#062040] pt-64 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                <Users size={14} />
                {isFR ? 'Annuaire Officiel' : 'Official Directory'}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-outfit">
                {isFR ? 'Répertoire des Experts' : 'Experts Directory'}
              </h1>
              <p className="text-lg text-slate-400 font-medium">
                {isFR 
                  ? "Consultez les profils des professionnels certifiés du secteur de l'eau et de l'assainissement au Cameroun."
                  : "View profiles of certified water and sanitation professionals in Cameroon."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== SEARCH & FILTERS BAR ==================== */}
      <div className="sticky top-[72px] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search 
                size={18} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" 
              />
              <input 
                type="text" 
                placeholder={isFR ? "Rechercher par nom ou profession..." : "Search by name or profession..."}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                  showFilters 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Filter size={18} />
                {isFR ? 'Filtres' : 'Filters'}
                {activeFiltersCount > 0 && (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${showFilters ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-red-600 text-sm font-bold transition-colors"
                >
                  <X size={18} />
                  <span className="hidden sm:inline">{isFR ? 'Effacer' : 'Clear'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {isFR ? 'Domaine d\'expertise' : 'Area of Expertise'}
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 appearance-none cursor-pointer text-sm font-medium"
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                      >
                        {allExpertise.map((ex, i) => (
                          <option key={i} value={ex}>
                            {ex === 'All' ? (isFR ? 'Toutes les expertises' : 'All expertises') : ex}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {isFR ? 'Localisation (Ville)' : 'Location (City)'}
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 appearance-none cursor-pointer text-sm font-medium"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        {allCities.map((city, i) => (
                          <option key={i} value={city}>
                            {city === 'All' ? (isFR ? 'Toutes les villes' : 'All cities') : city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ==================== MEMBERS GRID ==================== */}
      <div className="container py-12 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={40} className="text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">
              {isFR ? "Initialisation de l'annuaire..." : "Loading directory..."}
            </p>
          </div>
        ) : paginatedMembers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm px-6"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={36} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {isFR ? 'Aucun membre trouvé' : 'No members found'}
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
              {isFR 
                ? 'Nous n\'avons trouvé aucun profil correspondant à vos critères actuels.' 
                : 'We couldn\'t find any profile matching your current criteria.'}
            </p>
            <button 
              onClick={clearAllFilters}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              {isFR ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Results Count Summary */}
            <div className="mb-8 flex items-center justify-between">
              <div className="text-sm text-slate-500 font-medium">
                {isFR ? 'Affichage de' : 'Showing'} <span className="text-slate-900 font-bold">{paginatedMembers.length}</span> {isFR ? 'sur' : 'of'} <span className="text-slate-900 font-bold">{filteredMembers.length}</span> {isFR ? 'experts' : 'experts'}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedMembers.map((member, i) => {
                  const expArray = parseExpertise(member.expertise);
                  return (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                    >
                      <Link href={`/${locale}/members/${member.id}`} className="group block bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
                        
                        {/* Verify Badge */}
                        <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-50 p-1.5 rounded-lg shadow-sm">
                          <ShieldCheck size={16} />
                        </div>

                        <div className="flex flex-col items-center text-center">
                          {/* Photo */}
                          <div className="w-24 h-24 rounded-full p-1 bg-slate-100 border border-slate-200 mb-6 group-hover:border-blue-400 transition-colors">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                              {member.photo ? (
                                <img 
                                  src={member.photo} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                              ) : (
                                <User size={40} className="text-slate-300" />
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="space-y-1 mb-4 w-full">
                            <h3 className="text-lg font-bold text-slate-900 truncate px-2 group-hover:text-blue-600 transition-colors">
                              {member.name}
                            </h3>
                            <div className="flex items-center justify-center gap-1.5 text-blue-600 font-bold text-[11px] uppercase tracking-wider">
                              <Briefcase size={12} />
                              <span className="truncate max-w-[180px]">
                                {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 text-slate-400 font-medium text-xs">
                              <MapPin size={12} />
                              <span className="truncate">{member.city || member.country || 'Cameroun'}</span>
                            </div>
                          </div>

                          {/* Expertise Tags */}
                          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                            {expArray.slice(0, 2).map((exp: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md border border-slate-100 truncate max-w-[100px]">
                                {exp}
                              </span>
                            ))}
                            {expArray.length > 2 && (
                              <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-md border border-slate-100">
                                +{expArray.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Action */}
                          <div className="w-full pt-4 border-t border-slate-50 flex items-center justify-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                            {isFR ? 'Profil Complet' : 'Full Profile'}
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ==================== PAGINATION ==================== */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">{isFR ? 'Précédent' : 'Prev'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 text-slate-300 font-bold">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                            currentPage === page 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))
                  }
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                >
                  <span className="hidden sm:inline">{isFR ? 'Suivant' : 'Next'}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
