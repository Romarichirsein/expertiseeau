"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  MapPin,
  ExternalLink,
  GraduationCap,
  Users,
  Briefcase,
  Loader2,
  Filter,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  X,
  SearchX,
  ShieldCheck
} from "lucide-react";

import { getInstitutions } from "@/lib/actions";

const categories = [
  { id: "all", label: "Toutes", labelEN: "All", icon: Building2, color: "blue" },
  { id: "public", label: "Secteur Public", labelEN: "Public Sector", icon: Building2, color: "sky" },
  { id: "ngo", label: "ONGs & OSCs", labelEN: "NGOs & CSOs", icon: Users, color: "emerald" },
  { id: "private", label: "Secteur Privé", labelEN: "Private Sector", icon: Briefcase, color: "amber" },
  { id: "edu", label: "Recherche & Éducation", labelEN: "Research & Education", icon: GraduationCap, color: "violet" },
];

type SortField = 'sigle' | 'nom' | 'siege';
type SortDir = 'asc' | 'desc';

export default function InstitutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>('nom');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === "fr";

  useEffect(() => {
    async function loadData() {
      const data = await getInstitutions();
      setInstitutions(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    let result = institutions.filter((inst) => {
      const matchesTab =
        activeTab === "all" ||
        inst.category === activeTab ||
        (activeTab === "public" && !inst.category);
      const q = search.toLowerCase();
      const matchesSearch =
        (inst.nom || "").toLowerCase().includes(q) ||
        (inst.sigle || "").toLowerCase().includes(q) ||
        (inst.siege || "").toLowerCase().includes(q) ||
        (inst.mandat || "").toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      const aVal = (a[sortField] || '').toLowerCase();
      const bVal = (b[sortField] || '').toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [institutions, activeTab, search, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-slate-300" />;
    return sortDir === 'asc' 
      ? <ChevronUp size={14} className="text-[#0a5694]" />
      : <ChevronDown size={14} className="text-[#0a5694]" />;
  };

  const getCategoryColorClass = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return 'bg-blue-50 text-blue-600 border-blue-100';
    
    switch(cat.color) {
      case 'sky': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'violet': return 'bg-violet-50 text-violet-600 border-violet-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-inter pb-32">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-[#0a5694] pt-16 pb-24">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent" />
        
        <div className="container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
              <Building2 size={14} />
              {isFR ? 'Acteurs du secteur' : 'Sector Actors'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-outfit">
              {isFR ? 'Répertoire des Institutions' : 'Institutional Directory'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90 font-medium">
              {isFR
                ? "Identifiez les acteurs clés du secteur de l'eau et de l'assainissement au Cameroun."
                : "Identify the key actors in the water and sanitation sector in Cameroon."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-6 -mt-16 relative z-20 pb-32">
        {/* TABS & SEARCH CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* TABS */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isActive 
                        ? 'bg-[#0a5694] text-white border-[#0a5694] shadow-lg shadow-blue-900/10' 
                        : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <CatIcon size={16} />
                    {isFR ? cat.label : cat.labelEN}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}
            <div className="relative group">
              <Search 
                size={18} 
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" 
              />
              <input
                type="text"
                placeholder={isFR ? "Rechercher une institution..." : "Search institution..."}
                className="w-full lg:w-[360px] pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#0a5694] focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* RESULTS BAR */}
        <div className="flex items-center justify-between mb-6 px-4">
           <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Building2 size={16} className="text-[#0a5694]" />
              <span>
                <strong className="text-slate-900">{filteredData.length}</strong>{' '}
                {isFR ? 'institutions trouvées' : 'institutions found'}
              </span>
           </div>
           {search && (
              <button 
                onClick={() => setSearch('')}
                className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-colors"
              >
                <X size={12} />
                {isFR ? 'Effacer la recherche' : 'Clear search'}
              </button>
           )}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 overflow-hidden">
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-4">
              <Loader2 size={48} className="text-[#0a5694] animate-spin" strokeWidth={1.5} />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {isFR ? "Chargement du répertoire..." : "Loading directory..."}
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                <SearchX size={40} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 font-outfit">
                {isFR ? 'Aucun résultat' : 'No results found'}
              </h3>
              <p className="text-slate-500 font-medium max-w-sm mb-8">
                {isFR
                  ? 'Aucune institution ne correspond à vos critères de recherche ou de filtrage.'
                  : 'No institutions match your search or filter criteria.'}
              </p>
              <button 
                onClick={() => { setSearch(''); setActiveTab('all'); }}
                className="btn-premium btn-primary !px-8 !py-3"
              >
                {isFR ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th onClick={() => handleSort('sigle')} className="px-8 py-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer select-none group border-b border-slate-100">
                      <div className="flex items-center gap-2 group-hover:text-[#0a5694] transition-colors">
                        {isFR ? 'Sigle' : 'Acronym'}
                        <SortIcon field="sigle" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('nom')} className="px-8 py-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer select-none group border-b border-slate-100">
                      <div className="flex items-center gap-2 group-hover:text-[#0a5694] transition-colors">
                        {isFR ? 'Institution' : 'Institution'}
                        <SortIcon field="nom" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('siege')} className="px-8 py-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer select-none group border-b border-slate-100">
                      <div className="flex items-center gap-2 group-hover:text-[#0a5694] transition-colors">
                        {isFR ? 'Siège' : 'HQ'}
                        <SortIcon field="siege" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      {isFR ? 'Mandat' : 'Mandate'}
                    </th>
                    <th className="px-8 py-6 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      Site
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {filteredData.map((inst, i) => (
                      <motion.tr
                        key={inst.id || i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.01 }}
                        className="hover:bg-blue-50/30 transition-all group"
                      >
                        <td className="px-8 py-6 align-top">
                          <span className={`inline-block px-3 py-1 rounded-lg font-bold text-xs border tracking-wide shadow-sm ${getCategoryColorClass(inst.category)}`}>
                            {inst.sigle}
                          </span>
                        </td>
                        <td className="px-8 py-6 align-top">
                          <div className="flex flex-col gap-1">
                             <span className="text-sm font-extrabold text-slate-900 leading-relaxed group-hover:text-[#0a5694] transition-colors">
                               {inst.nom}
                             </span>
                             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                               <ShieldCheck size={12} className="text-emerald-500" />
                               {isFR ? 'Inscrit' : 'Registered'}
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 align-top">
                          <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                            <MapPin size={14} className="text-[#0a5694]/40" />
                            {inst.siege || inst.city || '---'}
                          </div>
                        </td>
                        <td className="px-8 py-6 align-top max-w-md">
                          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                            {inst.mandat || inst.mission || '—'}
                          </p>
                        </td>
                        <td className="px-8 py-6 align-top text-center">
                          {inst.site ? (
                            <a
                              href={inst.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#0a5694] hover:text-white hover:shadow-lg hover:shadow-blue-900/10 transition-all border border-slate-100"
                              title={inst.site}
                            >
                              <ExternalLink size={16} />
                            </a>
                          ) : (
                            <span className="text-slate-200 text-xs">---</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* INFO FOOTER */}
        <div className="mt-12 p-10 bg-[#0a5694] rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Building2 size={160} />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                 <h3 className="text-2xl font-extrabold text-white mb-3 font-outfit tracking-tight">
                    {isFR ? 'Votre institution n\'est pas listée ?' : 'Is your institution missing?'}
                 </h3>
                 <p className="text-blue-100 font-medium opacity-90">
                    {isFR 
                      ? "Participez à la cartographie du secteur en soumettant votre institution au répertoire national." 
                      : "Participate in sector mapping by submitting your institution to the national directory."}
                 </p>
              </div>
              <button className="btn-premium btn-secondary !px-10 !py-4 whitespace-nowrap">
                 {isFR ? 'Soumettre une institution' : 'Submit Institution'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
