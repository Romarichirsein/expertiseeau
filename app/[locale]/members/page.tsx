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
  X,
  ChevronDown
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

  // Parse expertise arrays consistently
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

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
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
    <div className="min-h-screen bg-white">
      {/* PAGE HEADER - like WordPress Ultimate Member Directory */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0a5694 0%, #0d7ac7 50%, #0d9488 100%)',
        padding: '60px 0 40px'
      }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ 
              color: 'white', 
              fontSize: '36px', 
              fontWeight: 300, 
              letterSpacing: '1px',
              fontFamily: '"Outfit", sans-serif',
              marginBottom: '12px'
            }}>
              {isFR ? 'Répertoire des Membres' : 'Members Directory'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: 400 }}>
              {isFR 
                ? "Consultez les profils des professionnels certifiés du secteur de l'eau au Cameroun"
                : "View profiles of certified water sector professionals in Cameroon"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* COUNTER + SEARCH BAR - WordPress UM Style */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb', 
        background: '#f9fafb' 
      }}>
        <div className="container" style={{ padding: '20px 24px' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '16px' 
          }}>
            {/* Counter */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: 500
            }}>
              <Users size={18} style={{ color: '#0a5694' }} />
              <span>
                {loading ? '...' : (
                  <><strong style={{ color: '#0a5694' }}>{filteredMembers.length}</strong> {isFR ? 'membre(s)' : 'member(s)'}</>
                )}
              </span>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearAllFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 10px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={12} />
                  {isFR ? 'Réinitialiser' : 'Reset'}
                </button>
              )}
            </div>

            {/* Search + Filter Toggle */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={16} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#9ca3af' 
                  }} 
                />
                <input 
                  type="text" 
                  placeholder={isFR ? "Rechercher un membre..." : "Search a member..."}
                  style={{
                    paddingLeft: '36px',
                    paddingRight: '16px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '14px',
                    width: '280px',
                    background: 'white',
                    transition: 'border-color 0.2s'
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#0a5694'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: showFilters ? '#0a5694' : 'white',
                  color: showFilters ? 'white' : '#374151',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Filter size={16} />
                {isFR ? 'Filtres' : 'Filters'}
                {activeFiltersCount > 0 && (
                  <span style={{
                    background: showFilters ? 'white' : '#0a5694',
                    color: showFilters ? '#0a5694' : 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '16px',
                  marginTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#6b7280',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {isFR ? 'Domaine d\'expertise' : 'Area of Expertise'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        style={{
                          width: '100%',
                          padding: '10px 36px 10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '14px',
                          background: 'white',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                      >
                        {allExpertise.map((ex, i) => (
                          <option key={i} value={ex}>
                            {ex === 'All' ? (isFR ? 'Toutes les expertises' : 'All expertises') : ex}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} style={{ 
                        position: 'absolute', 
                        right: '12px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#9ca3af',
                        pointerEvents: 'none' 
                      }} />
                    </div>
                  </div>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#6b7280',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {isFR ? 'Ville' : 'City'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        style={{
                          width: '100%',
                          padding: '10px 36px 10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '14px',
                          background: 'white',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        {allCities.map((city, i) => (
                          <option key={i} value={city}>
                            {city === 'All' ? (isFR ? 'Toutes les villes' : 'All cities') : city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} style={{ 
                        position: 'absolute', 
                        right: '12px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#9ca3af',
                        pointerEvents: 'none' 
                      }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MEMBERS GRID - WordPress UM Directory Style */}
      <div className="container" style={{ padding: '40px 24px 60px' }}>
        {loading ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '80px 0',
            gap: '16px'
          }}>
            <Loader2 
              size={40} 
              style={{ color: '#0a5694', animation: 'spin 1s linear infinite' }} 
            />
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {isFR ? "Chargement de l'annuaire..." : "Loading directory..."}
            </p>
          </div>
        ) : paginatedMembers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: '80px 0',
              color: '#6b7280' 
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Search size={36} style={{ color: '#d1d5db' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              {isFR ? 'Aucun membre trouvé' : 'No members found'}
            </h3>
            <p style={{ maxWidth: '400px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isFR 
                ? 'Aucun profil ne correspond à vos critères de recherche.' 
                : 'No profiles match your search criteria.'}
            </p>
            <button 
              onClick={clearAllFilters}
              style={{
                padding: '10px 24px',
                background: '#0a5694',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {isFR ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}>
              <AnimatePresence mode="popLayout">
                {paginatedMembers.map((member, i) => {
                  const expArray = parseExpertise(member.expertise);
                  return (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <Link href={`/${locale}/members/${member.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div style={{
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '28px 20px',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        className="member-card"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(10,86,148,0.12)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.borderColor = '#0a5694';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                        >
                          {/* Status indicator */}
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px'
                          }}>
                            <Award size={16} style={{ color: '#10b981' }} />
                          </div>

                          {/* Profile Photo - WordPress UM Style (Circular) */}
                          <div style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            margin: '0 auto 16px',
                            overflow: 'hidden',
                            border: '3px solid #e5e7eb',
                            background: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'border-color 0.3s'
                          }}>
                            {member.photo ? (
                              <img 
                                src={member.photo} 
                                alt={member.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                            ) : (
                              <User size={40} style={{ color: '#9ca3af' }} />
                            )}
                          </div>

                          {/* Name */}
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#111827',
                            marginBottom: '4px',
                            lineHeight: 1.3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {member.name}
                          </h3>

                          {/* Profession */}
                          <div style={{
                            fontSize: '13px',
                            color: '#0a5694',
                            fontWeight: 500,
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}>
                            <Briefcase size={13} />
                            <span style={{ 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap',
                              maxWidth: '180px'
                            }}>
                              {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                            </span>
                          </div>

                          {/* Location */}
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            marginBottom: '14px'
                          }}>
                            <MapPin size={12} />
                            {member.city || member.country || 'Cameroun'}
                          </div>

                          {/* Expertise Tags */}
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '4px'
                          }}>
                            {expArray.slice(0, 2).map((exp: string, idx: number) => (
                              <span key={idx} style={{
                                padding: '3px 8px',
                                background: '#f0f7ff',
                                color: '#0a5694',
                                fontSize: '10px',
                                fontWeight: 600,
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px'
                              }}>
                                {exp.length > 20 ? exp.substring(0, 20) + '...' : exp}
                              </span>
                            ))}
                            {expArray.length > 2 && (
                              <span style={{
                                padding: '3px 8px',
                                background: '#e8ecf0',
                                color: '#6b7280',
                                fontSize: '10px',
                                fontWeight: 600,
                                borderRadius: '4px'
                              }}>
                                +{expArray.length - 2}
                              </span>
                            )}
                          </div>

                          {/* View Profile Arrow */}
                          <div style={{
                            marginTop: '16px',
                            paddingTop: '14px',
                            borderTop: '1px solid #f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#0a5694',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {isFR ? 'Voir le profil' : 'View profile'}
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* PAGINATION - WordPress Style */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: currentPage === 1 ? '#d1d5db' : '#374151',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                  {isFR ? 'Préc.' : 'Prev'}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && (
                        <span style={{ color: '#9ca3af', fontSize: '14px' }}>...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        style={{
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: currentPage === page ? 'none' : '1px solid #d1d5db',
                          borderRadius: '8px',
                          background: currentPage === page ? '#0a5694' : 'white',
                          color: currentPage === page ? 'white' : '#374151',
                          fontSize: '13px',
                          fontWeight: currentPage === page ? 700 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))
                }

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: currentPage === totalPages ? '#d1d5db' : '#374151',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isFR ? 'Suiv.' : 'Next'}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
