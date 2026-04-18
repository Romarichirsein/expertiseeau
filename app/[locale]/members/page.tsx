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
  Tag
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
        set.add(e.expertise);
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
      
      const matchesExpertise = 
        selectedExpertise === 'All' || 
        (Array.isArray(m.expertise) ? m.expertise.includes(selectedExpertise) : m.expertise === selectedExpertise);

      return matchesSearch && matchesExpertise;
    }).slice(0, 100); 
  }, [search, selectedExpertise, experts]);

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="expert-badge mb-4">{isFR ? 'Annuaire National' : 'National Directory'}</span>
              <h1 className="page-title">{isFR ? 'Répertoire des Experts' : 'Experts Directory'}</h1>
              <p className="page-subtitle">
                {isFR 
                  ? 'Consultez la liste des professionnels certifiés du secteur de l\'eau au Cameroun.'
                  : 'Consult the list of certified water sector professionals in Cameroon.'}
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{
              backgroundColor: '#fff',
              padding: '16px 24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(10, 86, 148, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="#0a5694" />
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{loading ? '...' : experts.length}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Experts Inscrits' : 'Registered Experts'}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* FILTERS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 300px', 
          gap: '20px', 
          marginBottom: '40px',
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '20px',
          border: '1px solid #e8ecf0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }} className="search-bar-container">
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher par nom, profession ou ville..." : "Search by name, profession or city..."}
              style={{
                width: '100%',
                padding: '14px 14px 14px 50px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
            <select 
              style={{
                width: '100%',
                padding: '14px 14px 14px 46px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
            >
              {allExpertise.map((ex, i) => (
                <option key={i} value={ex}>{ex === 'All' ? (isFR ? 'Toutes les expertises' : 'All expertises') : ex}</option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '20px' }}>
            <Loader2 className="animate-spin text-primary" size={48} />
            <p style={{ color: '#64748b', fontWeight: 600 }}>{isFR ? 'Chargement de l\'annuaire...' : 'Loading directory...'}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link href={`/${locale}/members/${member.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className="premium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a5694' }}>
                          <User size={30} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'capitalize' }}>
                            {member.name}
                          </h3>
                          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'auto' }}>
                        {(Array.isArray(member.expertise) ? member.expertise : []).slice(0, 2).map((exp: string, idx: number) => (
                          <span key={idx} className="expert-badge" style={{ fontSize: '10px' }}>
                            {exp}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                          <MapPin size={14} color="#0a5694" />
                          {member.city || 'Cameroun'}
                        </div>
                        <div style={{ color: '#0a5694', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                          {isFR ? 'Voir profil' : 'View profile'} <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#64748b' }}>
              <Search size={36} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{isFR ? 'Aucun membre trouvé' : 'No members found'}</h3>
            <p style={{ color: '#64748b' }}>{isFR ? 'Essayez de modifier vos critères de recherche.' : 'Try adjusting your search criteria.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
