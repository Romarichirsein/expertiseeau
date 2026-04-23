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
  X
} from "lucide-react";

import { getInstitutions } from "@/lib/actions";

const categories = [
  { id: "all", label: "Toutes", labelEN: "All", icon: Building2, color: "#0a5694" },
  { id: "public", label: "Secteur Public", labelEN: "Public Sector", icon: Building2, color: "#0ea5e9" },
  { id: "ngo", label: "ONGs & OSCs", labelEN: "NGOs & CSOs", icon: Users, color: "#10b981" },
  { id: "private", label: "Secteur Privé", labelEN: "Private Sector", icon: Briefcase, color: "#f59e0b" },
  { id: "edu", label: "Recherche & Éducation", labelEN: "Research & Education", icon: GraduationCap, color: "#8b5cf6" },
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
    if (sortField !== field) return <ArrowUpDown size={14} style={{ color: '#9ca3af' }} />;
    return sortDir === 'asc' 
      ? <ChevronUp size={14} style={{ color: '#0a5694' }} />
      : <ChevronDown size={14} style={{ color: '#0a5694' }} />;
  };

  const getCategoryLabel = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return '';
    return isFR ? cat.label : cat.labelEN;
  };

  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.color : '#0a5694';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PAGE HEADER - WordPress Style */}
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
              {isFR ? 'Répertoire des Institutions' : 'Institutional Directory'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: 400 }}>
              {isFR
                ? "Les acteurs du secteur de l'eau et de l'assainissement au Cameroun"
                : "Actors of the water and sanitation sector in Cameroon"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 24px' }}>
        {/* CATEGORY TABS - Horizontal like WordPress */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0',
          borderBottom: '2px solid #e5e7eb',
          marginTop: '0'
        }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 20px',
                  border: 'none',
                  borderBottom: isActive ? `3px solid ${cat.color}` : '3px solid transparent',
                  background: 'transparent',
                  color: isActive ? cat.color : '#6b7280',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '-2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <CatIcon size={16} />
                {isFR ? cat.label : cat.labelEN}
                {isActive && (
                  <span style={{
                    background: cat.color,
                    color: 'white',
                    borderRadius: '10px',
                    padding: '1px 8px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {filteredData.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* SEARCH + COUNT BAR */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <Building2 size={18} style={{ color: '#0a5694' }} />
            <span>
              <strong style={{ color: '#111827' }}>{filteredData.length}</strong>{' '}
              {isFR ? 'institution(s)' : 'institution(s)'}
            </span>
            {search && (
              <button 
                onClick={() => setSearch('')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={10} />
                {isFR ? 'Réinitialiser' : 'Reset'}
              </button>
            )}
          </div>
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
              placeholder={isFR ? "Rechercher (nom, sigle, ville)..." : "Search (name, acronym, city)..."}
              style={{
                paddingLeft: '36px',
                paddingRight: '16px',
                paddingTop: '10px',
                paddingBottom: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '14px',
                width: '320px',
                background: 'white',
                transition: 'border-color 0.2s'
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#0a5694'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        {/* TABLE - WordPress TablePress Style */}
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
              {isFR ? "Chargement du répertoire..." : "Loading directory..."}
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 0',
            color: '#6b7280' 
          }}>
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
              <Building2 size={36} style={{ color: '#d1d5db' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              {isFR ? 'Aucune institution trouvée' : 'No institutions found'}
            </h3>
            <p style={{ maxWidth: '400px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {isFR
                ? 'Aucune institution ne correspond à vos critères de recherche.'
                : 'No institutions match your search criteria.'}
            </p>
            <button 
              onClick={() => { setSearch(''); setActiveTab('all'); }}
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
              {isFR ? 'Réinitialiser' : 'Reset'}
            </button>
          </div>
        ) : (
          <div style={{ 
            overflowX: 'auto', 
            marginTop: '8px',
            marginBottom: '60px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  <th 
                    onClick={() => handleSort('sigle')}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid #e5e7eb',
                      cursor: 'pointer',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      width: '120px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isFR ? 'Sigle' : 'Acronym'}
                      <SortIcon field="sigle" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('nom')}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid #e5e7eb',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isFR ? 'Nom de l\'institution' : 'Institution Name'}
                      <SortIcon field="nom" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('siege')}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid #e5e7eb',
                      cursor: 'pointer',
                      userSelect: 'none',
                      width: '120px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isFR ? 'Siège' : 'Headquarters'}
                      <SortIcon field="siege" />
                    </div>
                  </th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    {isFR ? 'Mandat / Mission' : 'Mandate / Mission'}
                  </th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e5e7eb',
                    width: '80px'
                  }}>
                    {isFR ? 'Site' : 'Website'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredData.map((inst, i) => (
                    <motion.tr
                      key={inst.id || i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.2s',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#f0f7ff';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      {/* Sigle */}
                      <td style={{ 
                        padding: '14px 16px', 
                        verticalAlign: 'top' 
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          background: `${getCategoryColor(inst.category || 'public')}10`,
                          color: getCategoryColor(inst.category || 'public'),
                          fontWeight: 700,
                          fontSize: '12px',
                          borderRadius: '6px',
                          letterSpacing: '0.3px'
                        }}>
                          {inst.sigle}
                        </span>
                      </td>

                      {/* Nom */}
                      <td style={{ 
                        padding: '14px 16px', 
                        fontWeight: 600, 
                        color: '#111827',
                        verticalAlign: 'top',
                        lineHeight: 1.5
                      }}>
                        {inst.nom}
                      </td>

                      {/* Siège */}
                      <td style={{ 
                        padding: '14px 16px', 
                        color: '#6b7280', 
                        verticalAlign: 'top' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} style={{ color: '#0a5694', flexShrink: 0 }} />
                          {inst.siege || inst.city || 'Cameroun'}
                        </div>
                      </td>

                      {/* Mandat */}
                      <td style={{ 
                        padding: '14px 16px', 
                        color: '#6b7280',
                        lineHeight: 1.6,
                        verticalAlign: 'top',
                        fontSize: '13px'
                      }}>
                        {inst.mandat || inst.mission || '—'}
                      </td>

                      {/* Site */}
                      <td style={{ 
                        padding: '14px 16px', 
                        textAlign: 'center', 
                        verticalAlign: 'top' 
                      }}>
                        {inst.site ? (
                          <a
                            href={inst.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              background: '#f0f7ff',
                              color: '#0a5694',
                              transition: 'all 0.2s',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#0a5694';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#f0f7ff';
                              e.currentTarget.style.color = '#0a5694';
                            }}
                            title={inst.site}
                          >
                            <Globe size={16} />
                          </a>
                        ) : (
                          <span style={{ color: '#d1d5db', fontSize: '13px' }}>—</span>
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
    </div>
  );
}
