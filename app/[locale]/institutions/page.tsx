"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  MapPin, 
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Users,
  Briefcase
} from 'lucide-react';

const categories = [
  { id: 'public', label: 'Public', icon: Building2, color: '#0ea5e9' },
  { id: 'ngo', label: 'ONGs & OSCs', icon: Users, color: '#10b981' },
  { id: 'private', label: 'Bureaux d’études', icon: Briefcase, color: '#f59e0b' },
  { id: 'edu', label: 'Enseignement', icon: GraduationCap, color: '#8b5cf6' },
];

const institutionsData = {
  public: [
    { name: 'Ministère de l\'Eau et de l\'Énergie (MINEE)', city: 'Yaoundé', mission: 'Gestion des ressources en eau et de l\'énergie.' },
    { name: 'CAMWATER', city: 'Douala', mission: 'Production et distribution de l\'eau potable.' },
    { name: 'Camerounaise des Eaux', city: 'Douala', mission: 'Exploitation du service public de l\'eau.' },
  ],
  ngo: [
    { name: 'Global Water Partnership (GWP)', city: 'Yaoundé', mission: 'Gestion intégrée des ressources en eau.' },
    { name: 'WaterAid Cameroun', city: 'Yaoundé', mission: 'Accès à l\'eau potable et à l\'assainissement.' },
  ],
  private: [
    { name: 'Hydra-Conseil', city: 'Douala', mission: 'Études et maîtrise d\'œuvre hydraulique.' },
    { name: 'Metriz Ingénierie', city: 'Yaoundé', mission: 'Forages, captages, puits aménagés.' },
    { name: 'Leauclean', city: 'Yaoundé', mission: 'Analyse de la qualité des eaux.' },
  ],
  edu: [
    { name: 'École Polytechnique Yaoundé', city: 'Yaoundé', mission: 'Formation des ingénieurs hydrauliciens.' },
    { name: 'Université de Dschang', city: 'Dschang', mission: 'Faculté d\'agronomie et de sciences de l\'eau.' },
  ]
};

export default function InstitutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [activeTab, setActiveTab] = useState('public');
  const [search, setSearch] = useState('');
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const filteredData = institutionsData[activeTab as keyof typeof institutionsData].filter(inst => 
    inst.name.toLowerCase().includes(search.toLowerCase()) || 
    inst.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="expert-badge mb-4">{isFR ? 'Acteurs du Secteur' : 'Sector Actors'}</span>
            <h1 className="page-title">{isFR ? 'Répertoire des Institutions' : 'Institutional Directory'}</h1>
            <p className="page-subtitle">
              {isFR 
                ? 'Retrouvez les ministères, ONG, bureaux d\'études et organismes internationaux qui façonnent le secteur de l\'eau au Cameroun.'
                : 'Find the ministries, NGOs, consulting firms and international organizations shaping the water sector in Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }} className="institutions-layout">
          
          {/* SIDEBAR TABS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '8px' }}>
              {isFR ? 'Catégories' : 'Categories'}
            </h3>
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isActive ? '#0a5694' : '#e8ecf0',
                    backgroundColor: isActive ? '#0a5694' : '#fff',
                    color: isActive ? '#fff' : '#1e293b',
                    fontWeight: 700,
                    fontSize: '14px',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  <cat.icon size={18} />
                  {cat.label}
                  {isActive && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                </button>
              );
            })}
          </div>

          {/* CONTENT AREA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
              <input 
                type="text" 
                placeholder={isFR ? "Rechercher une institution..." : "Search for an institution..."}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}
              >
                {filteredData.map((inst, i) => (
                  <div 
                    key={i}
                    className="premium-card"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '24px', 
                      padding: '24px 32px',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '16px', 
                      backgroundColor: categories.find(c => c.id === activeTab)?.color + '10', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: categories.find(c => c.id === activeTab)?.color
                    }}>
                      <Building2 size={26} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{inst.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                        <MapPin size={14} color="#0a5694" />
                        {inst.city}
                      </div>
                      <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '12px', lineHeight: 1.6 }}>{inst.mission}</p>
                    </div>
                    <a href="#" style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '12px', 
                      backgroundColor: '#f1f5f9', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#0a5694',
                      transition: 'all 0.2s'
                    }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0a5694' + '15'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
                      <ExternalLink size={20} />
                    </a>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ color: '#64748b', fontSize: '15px' }}>{isFR ? 'Aucune institution trouvée dans cette catégorie.' : 'No institutions found in this category.'}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
