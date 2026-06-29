"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Award, User, Filter, ChevronLeft, ChevronRight, Mail, Phone, Briefcase } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getApprovedExperts } from '@/lib/actions';

interface Member {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  profession: string;
  city: string;
  country: string;
  expertise: string[];
  status: string;
  phone: string;
}

const EXPERTISE_DOMAINS = [
  "Hydrobiologie",
  "Qualité de l'eau",
  "Hydrologie",
  "Hydrogéologie",
  "Ingénierie fluviale",
  "Sciences aquacoles",
  "Suivi des barrages",
  "Approvisionnement en eau",
  "Assainissement liquide",
  "Station de pompage",
  "Luttes contre les pollutions"
];

const ITEMS_PER_PAGE = 12;

export default function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getApprovedExperts();
        // Filter out members without names or those not approved if needed
        const validMembers = data.filter((m: Member) => m.name && m.status === 'approved');
        setMembers(validMembers);
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(search.toLowerCase()) || 
        m.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesExpertise = filterExpertise === '' || m.expertise.some(e => e.includes(filterExpertise));
      const matchesCity = filterCity === '' || m.city.toLowerCase().includes(filterCity.toLowerCase());

      return matchesSearch && matchesExpertise && matchesCity;
    });
  }, [members, search, filterExpertise, filterCity]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterExpertise, filterCity]);

  const breadcrumbs = [
    { label: isFR ? 'Experts' : 'Experts' }
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Répertoire des Experts' : 'Experts Directory'} 
        breadcrumbs={breadcrumbs}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-12">
        {/* SEARCH & FILTERSBAR */}
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-12 flex flex-col lg:flex-row gap-6 items-end relative overflow-hidden">
          {/* subtle decorative border line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#34b4e2] to-[#2794e8]" />
          
          <div className="flex-grow space-y-2 w-full">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">
              {isFR ? 'Rechercher un expert' : 'Search an expert'}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={isFR ? "Nom, spécialité ou email..." : "Name, specialty or email..."}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-[#34b4e2] transition-all font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full lg:w-72 space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">
              {isFR ? 'Domaine d\'expertise' : 'Expertise Domain'}
            </label>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-[#34b4e2] appearance-none cursor-pointer font-medium text-slate-700 dark:text-slate-200"
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
              >
                <option value="">{isFR ? "Tous les domaines" : "All domains"}</option>
                {EXPERTISE_DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-64 space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">
              {isFR ? 'Ville de résidence' : 'City of residence'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={isFR ? "Yaoundé, Douala..." : "City name..."}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-[#34b4e2] transition-all font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2">
            {loading ? (
              isFR ? "Chargement des experts..." : "Loading experts..."
            ) : (
              isFR 
                ? `${filteredMembers.length} expert(s) trouvé(s)` 
                : `${filteredMembers.length} expert(s) found`
            )}
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm animate-pulse space-y-6">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto" />
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mx-auto" />
                <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-850">
                  <div className="h-4 bg-slate-55 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-55 dark:bg-slate-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {currentMembers.map((member) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={member.id}
                    className="bg-white dark:bg-slate-900 group p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(52,180,226,0.08)] transition-all duration-500 border border-slate-100 dark:border-slate-850 hover:border-[#34b4e2]/30 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Background decorative glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#34b4e2]/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-6">
                      {/* Avatar & Status Row */}
                      <div className="flex justify-between items-start">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#34b4e2]/10 to-[#2794e8]/10 flex items-center justify-center text-[#34b4e2] font-black text-xl border border-[#34b4e2]/20 shadow-inner group-hover:scale-105 transition-transform duration-500">
                            {member.name ? member.name.charAt(0).toUpperCase() : 'E'}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Resident or Diaspora status */}
                        <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100 dark:border-slate-800">
                          {member.country?.toLowerCase() === 'cameroun' || member.country?.toLowerCase() === 'cameroon' 
                            ? (isFR ? 'Résident' : 'Resident') 
                            : (isFR ? 'Diaspora' : 'Diaspora')}
                        </span>
                      </div>
                      
                      {/* Member Info */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-[#34b4e2] transition-colors duration-300 line-clamp-1 font-outfit uppercase tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest line-clamp-1">
                          {member.profession || (isFR ? "Expert en Eau" : "Water Expert")}
                        </p>
                      </div>

                      {/* Details lists */}
                      <div className="pt-5 border-t border-slate-50 dark:border-slate-800/60 space-y-3 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                          <MapPin size={15} className="text-[#34b4e2] shrink-0" />
                          <span className="line-clamp-1 font-medium">{member.city || 'Yaoundé'}, {member.country || 'Cameroun'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail size={15} className="text-[#34b4e2] shrink-0" />
                          <span className="line-clamp-1 font-medium">{member.email || '---'}</span>
                        </div>
                      </div>

                      {/* Expertise domains tags */}
                      {member.expertise && member.expertise.length > 0 && (
                        <div className="pt-4 border-t border-slate-50 dark:border-slate-800/60 space-y-2">
                          <div className="flex flex-wrap gap-1.5">
                            {member.expertise.slice(0, 2).map((exp, i) => (
                              <span key={i} className="px-2.5 py-1 bg-[#34b4e2]/5 dark:bg-[#34b4e2]/10 text-[#34b4e2] text-[9px] font-black uppercase tracking-wider rounded-lg border border-[#34b4e2]/10 dark:border-[#34b4e2]/20">
                                {exp.split('/')[0].trim()}
                              </span>
                            ))}
                            {member.expertise.length > 2 && (
                              <span className="text-[10px] font-bold text-[#34b4e2] bg-[#34b4e2]/5 px-2 py-0.5 rounded-md">
                                +{member.expertise.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                      <Link 
                        href={`/${locale}/members/${member.id}`}
                        className="w-full text-center bg-[#292929] hover:bg-[#34b4e2] text-white py-3.5 px-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                      >
                        {isFR ? 'Consulter le Profil' : 'Consult Profile'}
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 bg-white rounded-xl shadow-sm hover:bg-[#34b4e2] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all shadow-sm ${
                          currentPage === pageNum 
                            ? 'bg-[#34b4e2] text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white rounded-xl shadow-sm hover:bg-[#34b4e2] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <User size={64} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isFR ? "Aucun expert trouvé" : "No experts found"}
            </h3>
            <p className="text-gray-500">
              {isFR 
                ? "Essayez de modifier vos critères de recherche ou de filtrage." 
                : "Try modifying your search or filter criteria."}
            </p>
            <button 
              onClick={() => {setSearch(''); setFilterExpertise(''); setFilterCity('');}}
              className="mt-8 text-[#34b4e2] font-bold hover:underline"
            >
              {isFR ? "Effacer tous les filtres" : "Clear all filters"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
