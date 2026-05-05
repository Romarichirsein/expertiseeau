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
  Globe,
  Zap,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { getApprovedExperts } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
                <Users size={18} />
                {isFR ? 'Annuaire National Certifié' : 'Certified National Directory'}
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight font-outfit leading-[0.9]">
                {isFR ? 'Les Experts de la ' : 'Experts of the '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'Nation' : 'Nation'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-2xl font-inter leading-relaxed">
                {isFR 
                  ? "Accédez au premier réseau structuré des professionnels de l'eau au Cameroun. Une expertise vérifiée pour des projets d'envergure."
                  : "Access the first structured network of water professionals in Cameroon. Verified expertise for large-scale projects."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== SEARCH & FILTERS BAR ==================== */}
      <div className="sticky top-16 md:top-20 lg:top-[102px] z-50 bg-background/80 backdrop-blur-2xl border-b border-white/10 transition-colors duration-500">
        <div className="container py-8 px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-[500px] group">
              <Search 
                size={20} 
                className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" 
              />
              <Input 
                type="text" 
                placeholder={isFR ? "Rechercher par nom ou spécialité..." : "Search by name or specialty..."}
                className="w-full h-16 pl-16 pr-8 bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/5 rounded-2xl outline-none focus-visible:ring-primary/20 transition-all text-base font-bold shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "premium" : "outline"}
                className={`flex-1 md:flex-none h-16 px-10 rounded-2xl border-white/20 dark:border-white/10 font-black text-[12px] uppercase tracking-widest transition-all duration-500 gap-3 ${
                  showFilters ? "shadow-2xl shadow-primary/20" : "bg-white/50 dark:bg-white/5 backdrop-blur-md"
                }`}
              >
                <Filter size={20} />
                {isFR ? 'Filtres Avancés' : 'Advanced Filters'}
                {activeFiltersCount > 0 && (
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${showFilters ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="h-16 px-6 text-muted-foreground hover:text-red-500 font-black text-[11px] uppercase tracking-widest gap-2"
                >
                  <X size={20} />
                  <span className="hidden sm:inline">{isFR ? 'Réinitialiser' : 'Reset'}</span>
                </Button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-6 border-t border-white/10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
                      {isFR ? 'Domaine d\'expertise' : 'Area of Expertise'}
                    </label>
                    <div className="relative group">
                      <select 
                        className="w-full flex h-14 w-full rounded-2xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 px-6 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 appearance-none cursor-pointer text-foreground font-bold transition-all shadow-inner"
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                      >
                        {allExpertise.map((ex, i) => (
                          <option key={i} value={ex} className="text-secondary">
                            {ex === 'All' ? (isFR ? 'Toutes les expertises' : 'All expertises') : ex}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
                      {isFR ? 'Zonage Géographique' : 'Geographic Zoning'}
                    </label>
                    <div className="relative group">
                      <select 
                        className="w-full flex h-14 w-full rounded-2xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 px-6 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 appearance-none cursor-pointer text-foreground font-bold transition-all shadow-inner"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        {allCities.map((city, i) => (
                          <option key={i} value={city} className="text-secondary">
                            {city === 'All' ? (isFR ? 'Toutes les villes' : 'All cities') : city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ==================== MEMBERS GRID ==================== */}
      <div className="container py-16 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="text-muted-foreground font-black text-xs uppercase tracking-[0.4em] animate-pulse">
              {isFR ? "Initialisation de l'annuaire..." : "Loading directory..."}
            </p>
          </div>
        ) : paginatedMembers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/20 dark:border-white/5 shadow-2xl px-10"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Search size={40} className="text-primary" />
            </div>
            <h3 className="text-3xl font-black text-foreground mb-4 font-outfit uppercase tracking-tight">
              {isFR ? 'Aucun membre trouvé' : 'No members found'}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-12 text-lg">
              {isFR 
                ? 'Nous n\'avons trouvé aucun profil correspondant à vos critères actuels.' 
                : 'We couldn\'t find any profile matching your current criteria.'}
            </p>
            <Button 
              variant="premium"
              onClick={clearAllFilters}
              className="h-16 px-12 rounded-2xl font-black text-xs uppercase tracking-widest"
            >
              {isFR ? 'Réinitialiser les filtres' : 'Reset filters'}
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Results Count Summary */}
            <div className="mb-12 flex items-center justify-between">
              <div className="text-sm text-muted-foreground font-bold bg-white/40 dark:bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 dark:border-white/10">
                {isFR ? 'Affichage de' : 'Showing'} <span className="text-primary font-black px-1">{paginatedMembers.length}</span> {isFR ? 'sur' : 'of'} <span className="text-foreground font-black px-1">{filteredMembers.length}</span> {isFR ? 'experts' : 'experts'}
              </div>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <Sparkles size={14} className="text-primary" />
                {isFR ? 'Résultats optimisés' : 'Optimized results'}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedMembers.map((member, i) => {
                  const expArray = parseExpertise(member.expertise);
                  return (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                    >
                      <Link href={`/${locale}/members/${member.id}`} className="group block h-full">
                        <Card className="h-full border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[3rem] p-0 overflow-hidden group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2 transition-all duration-700 h-full flex flex-col">
                          <CardContent className="p-10 flex-grow">
                            {/* Photo & Badge */}
                            <div className="flex justify-between items-start mb-10">
                              <div className="w-24 h-24 rounded-[2rem] p-1 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:border-primary/30 transition-all duration-700 overflow-hidden shadow-inner">
                                <div className="w-full h-full rounded-[1.75rem] overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center">
                                  {member.photo ? (
                                    <img 
                                      src={member.photo} 
                                      alt={member.name} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                  ) : (
                                    <User size={40} className="text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </div>
                              <div className="text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 flex items-center gap-2 shadow-sm backdrop-blur-md">
                                <ShieldCheck size={16} strokeWidth={2.5} />
                                <span className="text-[10px] font-black uppercase tracking-[0.15em]">{isFR ? 'Vérifié' : 'Verified'}</span>
                              </div>
                            </div>
    
                            {/* Info */}
                            <div className="space-y-4 mb-10">
                              <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors font-outfit leading-tight line-clamp-2 uppercase tracking-tight">
                                {member.name}
                              </h3>
                              <div className="flex items-center gap-2.5 text-primary font-black text-[11px] uppercase tracking-[0.2em]">
                                <Briefcase size={16} strokeWidth={2.5} />
                                <span className="truncate">
                                  {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2.5 text-muted-foreground font-bold text-xs uppercase tracking-wide">
                                <MapPin size={16} />
                                <span className="truncate">{member.city || member.country || 'Cameroun'}</span>
                              </div>
                            </div>
    
                            {/* Expertise Tags */}
                            <div className="flex flex-wrap gap-2.5">
                              {expArray.slice(0, 3).map((exp: string, idx: number) => (
                                <span key={idx} className="px-4 py-2 bg-white/40 dark:bg-white/5 text-muted-foreground text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/20 dark:border-white/5 transition-all duration-700 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:text-primary">
                                  {exp}
                                </span>
                              ))}
                              {expArray.length > 3 && (
                                <span className="px-4 py-2 bg-white/40 dark:bg-white/5 text-muted-foreground text-[10px] font-black rounded-xl border border-white/20 dark:border-white/5">
                                  +{expArray.length - 3}
                                </span>
                              )}
                            </div>
                          </CardContent>
   
                          {/* Action Footer */}
                          <div className="px-10 py-8 bg-white/40 dark:bg-black/20 border-t border-white/20 dark:border-white/5 flex items-center justify-between text-[11px] font-black text-primary uppercase tracking-[0.3em] group-hover:bg-primary group-hover:text-white transition-all duration-700">
                            {isFR ? 'Profil Institutionnel' : 'Institutional Profile'}
                            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-all duration-700 shadow-sm">
                              <ChevronRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ==================== PAGINATION ==================== */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 flex justify-center items-center gap-3"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-14 px-8 rounded-2xl border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md font-bold uppercase tracking-widest text-[10px] gap-2 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                  <span className="hidden sm:inline">{isFR ? 'Précédent' : 'Prev'}</span>
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground font-black">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "premium" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-xl font-black text-sm transition-all p-0 ${
                            currentPage === page 
                              ? 'shadow-xl shadow-primary/20' 
                              : 'bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10'
                          }`}
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    ))
                  }
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-14 px-8 rounded-2xl border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md font-bold uppercase tracking-widest text-[10px] gap-2 disabled:opacity-30"
                >
                  <span className="hidden sm:inline">{isFR ? 'Suivant' : 'Next'}</span>
                  <ChevronRight size={20} />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
