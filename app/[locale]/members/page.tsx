"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Filter,
  Users,
  ChevronRight,
  User,
  Loader2,
  Briefcase,
  Globe,
  ArrowRight,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { getApprovedExperts } from '@/lib/actions';

export default function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
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

  const allExpertise = useMemo(() => {
    const set = new Set<string>();
    experts.forEach(e => {
      if (Array.isArray(e.expertise)) {
        e.expertise.forEach((ex: string) => set.add(ex));
      } else if (typeof e.expertise === 'string') {
        try {
          const parsed = JSON.parse(e.expertise);
          if (Array.isArray(parsed)) {
            parsed.forEach((ex: string) => set.add(ex));
          } else {
            set.add(e.expertise);
          }
        } catch {
          set.add(e.expertise);
        }
      }
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
      
      let expArray: string[] = [];
      if (Array.isArray(m.expertise)) {
        expArray = m.expertise;
      } else if (typeof m.expertise === 'string') {
        try {
          const parsed = JSON.parse(m.expertise);
          expArray = Array.isArray(parsed) ? parsed : [m.expertise];
        } catch {
          expArray = [m.expertise];
        }
      }

      const matchesExpertise = 
        selectedExpertise === 'All' || 
        expArray.includes(selectedExpertise);

      return matchesSearch && matchesExpertise;
    }).slice(0, 100); 
  }, [search, selectedExpertise, experts]);

  return (
    <div className="pb-24 bg-[#f8fafc] min-h-screen relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* PREMIUM HERO SECTION */}
      <div className="relative pt-24 pb-40">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-xl shadow-blue-900/5 border border-gray-50 text-[#0a5694] text-xs font-black uppercase tracking-widest mb-8">
                <Users size={16} strokeWidth={2.5} />
                {isFR ? 'Annuaire National des Experts' : 'National Experts Directory'}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
                {isFR ? 'Trouvez l\' ' : 'Find the '} 
                <span className="text-[#0a5694]">{isFR ? 'Expertise' : 'Expertise'}</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                {isFR 
                  ? "Consultez le profil des professionnels certifiés du secteur de l'eau au Cameroun et facilitez vos collaborations stratégiques."
                  : "View profiles of certified water sector professionals in Cameroon and facilitate your strategic collaborations."}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="hidden lg:block shrink-0"
            >
              <div className="bg-white border border-gray-100 rounded-[3rem] p-10 flex items-center gap-10 shadow-2xl shadow-blue-900/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                  <Globe size={120} />
                </div>
                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center relative z-10">
                  <Users size={40} className="text-[#0a5694]" />
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-black text-gray-900 tracking-tighter">
                    {loading ? '...' : experts.length}
                  </div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">
                    {isFR ? 'Experts Validés' : 'Validated Experts'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container -mt-24 relative z-20">
        {/* MODERN SEARCH & FILTER BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50 flex flex-col lg:flex-row gap-6 mb-16"
        >
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher par nom ou profession..." : "Search by name or profession..."}
              className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0a5694]/20 transition-all font-bold text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="lg:w-80 relative group">
            <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" size={20} />
            <select 
              className="w-full pl-16 pr-10 py-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0a5694]/20 transition-all font-bold text-lg appearance-none cursor-pointer"
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
            >
              {allExpertise.map((ex, i) => (
                <option key={i} value={ex}>
                  {ex === 'All' ? (isFR ? 'Toutes expertises' : 'All expertises') : ex}
                </option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
               <ChevronRight size={20} className="rotate-90" />
            </div>
          </div>
        </motion.div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-8 bg-white/50 rounded-[4rem] border border-gray-100">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-50 rounded-full" />
              <Loader2 className="w-16 h-16 animate-spin text-[#0a5694] absolute top-0 left-0" />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
              {isFR ? "Initialisation de l'annuaire..." : "Initializing directory..."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, i) => {
                let expArray: string[] = [];
                if (Array.isArray(member.expertise)) {
                  expArray = member.expertise;
                } else if (typeof member.expertise === 'string') {
                  try {
                    const parsed = JSON.parse(member.expertise);
                    expArray = Array.isArray(parsed) ? parsed : [member.expertise];
                  } catch {
                    expArray = [member.expertise];
                  }
                }

                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link href={`/${locale}/members/${member.id}`} className="block h-full group">
                      <div className="bg-white h-full rounded-[3rem] border border-gray-100 p-8 flex flex-col shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                           <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm">
                              <Award size={18} />
                           </div>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-4 mb-8">
                          <div className="w-24 h-24 rounded-[2.5rem] bg-gray-50 p-1 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <div className="w-full h-full rounded-[2.2rem] bg-gradient-to-br from-white to-blue-50 flex items-center justify-center text-[#0a5694] overflow-hidden border border-gray-100">
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <User size={48} strokeWidth={1.5} />
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-[#0a5694] transition-colors line-clamp-1">
                              {member.name}
                            </h3>
                            <div className="text-[10px] font-black text-[#0a5694] uppercase tracking-widest flex items-center justify-center gap-2">
                              <Briefcase size={12} />
                              <span className="truncate">{member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                          {expArray.slice(0, 3).map((exp: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-400 text-[10px] font-black rounded-lg uppercase tracking-widest">
                              {exp}
                            </span>
                          ))}
                          {expArray.length > 3 && (
                            <span className="px-3 py-1 bg-blue-50 text-[#0a5694] text-[10px] font-black rounded-lg uppercase tracking-widest">
                              +{expArray.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <MapPin size={14} className="text-[#0a5694]" />
                            {member.city || member.country || 'Cameroun'}
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-300 group-hover:bg-[#0a5694] group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm">
                             <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white/50 rounded-[4rem] border border-dashed border-gray-200 mt-8"
          >
            <div className="w-24 h-24 rounded-[2.5rem] bg-gray-50 flex items-center justify-center mx-auto mb-8 text-gray-300">
              <Search size={48} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {isFR ? 'Aucun expert trouvé' : 'No experts found'}
            </h3>
            <p className="text-gray-500 font-bold text-lg max-w-md mx-auto mb-10">
              {isFR 
                ? 'Nous n\'avons trouvé aucun profil correspondant à vos critères de recherche.' 
                : 'We couldn\'t find any profiles matching your search criteria.'}
            </p>
            <button 
              onClick={() => { setSearch(''); setSelectedExpertise('All'); }}
              className="px-10 py-4 bg-white border border-gray-200 text-[#0a5694] font-black text-sm uppercase tracking-widest rounded-2xl shadow-sm hover:shadow-xl transition-all"
            >
              {isFR ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
