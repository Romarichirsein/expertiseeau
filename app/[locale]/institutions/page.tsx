"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  MapPin,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Users,
  Briefcase,
  Loader2,
  Filter,
  ArrowRight,
  Globe,
  Building
} from "lucide-react";
import Link from 'next/link';

import { getInstitutions } from "@/lib/actions";

const categories = [
  { id: "public", label: "Secteur Public", icon: Building2, color: "#0ea5e9", desc: "Ministères, administrations et organismes d'État" },
  { id: "ngo", label: "ONGs & OSCs", icon: Users, color: "#10b981", desc: "Organisations non-gouvernementales et société civile" },
  { id: "private", label: "Secteur Privé", icon: Briefcase, color: "#f59e0b", desc: "Bureaux d'études, entreprises et consultants" },
  { id: "edu", label: "Recherche & Éduc.", icon: GraduationCap, color: "#8b5cf6", desc: "Universités, centres de recherche et formation" },
];

function getCategoryColor(tabId: string): string {
  const cat = categories.find((c) => c.id === tabId);
  return cat ? cat.color : "#0ea5e9";
}

export default function InstitutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("public");
  const [search, setSearch] = useState("");
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
    return institutions.filter((inst) => {
      const matchesTab =
        inst.category === activeTab ||
        (activeTab === "public" && !inst.category);
      const q = search.toLowerCase();
      const matchesSearch =
        (inst.nom || "").toLowerCase().includes(q) ||
        (inst.sigle || "").toLowerCase().includes(q) ||
        (inst.siege || "").toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [institutions, activeTab, search]);

  const activeCategory = categories.find(c => c.id === activeTab);
  const catColor = getCategoryColor(activeTab);

  return (
    <div className="pb-24 bg-[#f8fafc] min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
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
                <Building size={16} strokeWidth={2.5} />
                {isFR ? 'Acteurs du Changement' : 'Change Actors'}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
                {isFR ? 'Répertoire des ' : 'Institutional '} 
                <span className="text-[#0a5694]">{isFR ? 'Institutions' : 'Directory'}</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                {isFR
                  ? "Explorez l'écosystème institutionnel qui structure, régule et dynamise le secteur de l'eau et de l'assainissement au Cameroun."
                  : "Explore the institutional ecosystem that structures, regulates and boosts the water and sanitation sector in Cameroon."}
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
                  <Building2 size={40} className="text-[#0a5694]" />
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-black text-gray-900 tracking-tighter">
                    {loading ? '...' : institutions.length}
                  </div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">
                    {isFR ? 'Organisations' : 'Organizations'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR TABS */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50 p-6 sticky top-24">
              <div className="flex items-center gap-3 px-4 mb-6">
                <Filter size={16} className="text-gray-400" />
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em]">
                  {isFR ? "Catégories" : "Categories"}
                </h3>
              </div>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const isActive = activeTab === cat.id;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`group flex flex-col gap-1 p-5 rounded-[2rem] transition-all duration-300 w-full text-left relative overflow-hidden ${
                        isActive 
                          ? 'bg-[#0a5694] text-white shadow-xl shadow-blue-900/20' 
                          : 'bg-transparent text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#0a5694]'
                        }`}>
                          <CatIcon size={20} />
                        </div>
                        <span className="font-black text-sm tracking-tight">{cat.label}</span>
                      </div>
                      <div className={`text-[10px] font-bold mt-2 ml-14 leading-tight relative z-10 ${
                        isActive ? 'text-blue-100/70' : 'text-gray-400'
                      }`}>
                        {cat.desc}
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeCat" className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-transparent pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 space-y-10">
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-4 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-gray-100 flex items-center group focus-within:ring-4 ring-blue-50 transition-all duration-500"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder={
                    isFR
                      ? "Trouver une institution (Ministère, SIGLE, Ville)..."
                      : "Find an institution (Ministry, ACRONYM, City)..."
                  }
                  className="block w-full pl-16 pr-8 py-5 bg-transparent border-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-lg font-bold"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="hidden md:flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">
                <Search size={14} />
                {filteredData.length} {isFR ? 'Résultats' : 'Results'}
              </div>
            </motion.div>

            {/* Results Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-8 bg-white/50 rounded-[3rem] border border-gray-100">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-50 rounded-full" />
                  <Loader2 className="w-16 h-16 animate-spin text-[#0a5694] absolute top-0 left-0" />
                </div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                  {isFR ? "Chargement du répertoire..." : "Loading directory..."}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {filteredData.map((inst, i) => (
                    <motion.div
                      key={inst.id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 10 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/${locale}/institutions/${inst.id}`} className="block group">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row md:items-center gap-10">
                          
                          <div 
                            className="w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundColor: `${catColor}10`, color: catColor }}
                          >
                            <Building2 size={36} strokeWidth={2.5} />
                          </div>

                          <div className="flex-1 min-w-0 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <h3 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#0a5694] transition-colors leading-tight">
                                {inst.nom}
                              </h3>
                              {inst.sigle && (
                                <span className="inline-flex px-3 py-1 bg-gray-50 border border-gray-100 text-gray-400 text-[10px] font-black rounded-lg uppercase tracking-widest w-fit">
                                  {inst.sigle}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
                              <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#0a5694]" />
                                {inst.siege || inst.city || "Cameroun"}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users size={16} className="text-[#0a5694]" />
                                {activeCategory?.label}
                              </div>
                            </div>

                            <p className="text-gray-500 font-medium leading-relaxed line-clamp-2 max-w-2xl">
                              {inst.mandat || inst.mission || (isFR ? 'Institution clé œuvrant pour le rayonnement et la gestion durable du secteur de l\'eau au Cameroun.' : 'Key institution working for the promotion and sustainable management of the water sector in Cameroon.')}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center gap-4 self-end md:self-center">
                            {inst.site && (
                              <a
                                href={inst.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-14 h-14 rounded-2xl bg-gray-50 hover:bg-[#0a5694] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm"
                              >
                                <Globe size={24} />
                              </a>
                            )}
                            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 text-[#0a5694] group-hover:bg-[#0a5694] group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm">
                              <ArrowRight size={24} />
                            </div>
                          </div>

                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {filteredData.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-24 bg-white/50 rounded-[4rem] border border-dashed border-gray-200"
                    >
                      <div className="w-24 h-24 rounded-[2.5rem] bg-gray-50 flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Building2 size={48} />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                        {isFR ? "Aucun résultat trouvé" : "No results found"}
                      </h3>
                      <p className="text-gray-500 font-bold text-lg max-w-md mx-auto mb-8">
                        {isFR
                          ? "Nous n'avons trouvé aucune institution correspondant à vos critères de recherche dans cette catégorie."
                          : "We couldn't find any institutions matching your search criteria in this category."}
                      </p>
                      <button 
                        onClick={() => setSearch('')}
                        className="px-10 py-4 bg-white border border-gray-200 text-[#0a5694] font-black text-sm uppercase tracking-widest rounded-2xl shadow-sm hover:shadow-xl transition-all"
                      >
                        {isFR ? 'Réinitialiser la recherche' : 'Reset search'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
