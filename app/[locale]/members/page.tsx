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
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-grow space-y-2 w-full">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {isFR ? 'Rechercher' : 'Search'}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={isFR ? "Nom, prénom ou email..." : "Name, first name or email..."}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#34b4e2] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full lg:w-64 space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {isFR ? 'Expertise' : 'Expertise'}
            </label>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#34b4e2] appearance-none cursor-pointer"
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
              >
                <option value="">{isFR ? "Tous les domaines" : "All domains"}</option>
                {EXPERTISE_DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full lg:w-64 space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {isFR ? 'Ville' : 'City'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={isFR ? "Yaoundé, Douala..." : "City name..."}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#34b4e2] transition-all"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-500">
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
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm animate-pulse space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={member.id}
                    className="bg-white group p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-[#34b4e2]/20 relative overflow-hidden"
                  >
                    {/* Decorative background circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#34b4e2]/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#34b4e2] to-[#2794e8] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-6 transform group-hover:rotate-6 transition-transform">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="text-center space-y-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#34b4e2] transition-colors line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-tighter line-clamp-1">
                          {member.profession || (isFR ? "Expert" : "Expert")}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <MapPin size={16} className="text-[#34b4e2]" />
                          <span className="line-clamp-1">{member.city}, {member.country}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Mail size={16} className="text-[#34b4e2]" />
                          <span className="line-clamp-1">{member.email}</span>
                        </div>
                        {member.expertise.length > 0 && (
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <Briefcase size={16} className="text-[#34b4e2] mt-1 shrink-0" />
                            <div className="flex flex-wrap gap-1">
                              {member.expertise.slice(0, 2).map((exp, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase">
                                  {exp.split('/')[0].trim()}
                                </span>
                              ))}
                              {member.expertise.length > 2 && (
                                <span className="text-[10px] font-bold text-[#34b4e2]">+{member.expertise.length - 2}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <Link 
                        href={`/${locale}/members/${member.id}`}
                        className="w-full block text-center mt-6 bg-[#292929] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#34b4e2] transform hover:-translate-y-1 transition-all shadow-md"
                      >
                        {isFR ? 'Voir le Profil' : 'View Profile'}
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
