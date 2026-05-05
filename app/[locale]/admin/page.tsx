"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Search, 
  Clock,
  Loader2,
  Mail,
  MapPin,
  Globe,
  Award,
  ChevronRight,
  Briefcase,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { getPendingExperts, updateExpertStatus } from '@/lib/actions/admin';

export default function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const [pendingExperts, setPendingExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    setLoading(true);
    const data = await getPendingExperts();
    setPendingExperts(data || []);
    setLoading(false);
  }

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    setActionLoading(id);
    const result = await updateExpertStatus(id, status);
    if (result.success) {
      setPendingExperts(prev => prev.filter(e => e.id !== id));
    } else {
      alert(result.error);
    }
    setActionLoading(null);
  }

  return (
    <div className="bg-white dark:bg-secondary min-h-screen font-inter pb-32 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 space-y-20 pt-16">
        
        {/* ==================== ADMIN HEADER ==================== */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          <div className="space-y-8 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-black text-[11px] uppercase tracking-[0.3em] w-fit border border-red-100 dark:border-red-500/20 backdrop-blur-xl"
            >
              <ShieldCheck size={18} strokeWidth={2.5} />
              {isFR ? 'Haute Administration Institutionnelle' : 'Institutional High Administration'}
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-secondary dark:text-white tracking-tight font-outfit leading-[0.95]">
              {isFR ? 'Contrôle & ' : 'Expert '} <span className="text-primary italic">{isFR ? 'Modération' : 'Moderation'}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-normal leading-relaxed font-inter">
              {isFR 
                ? 'Garantissez l\'intégrité du réseau national en validant les compétences et l\'authenticité des nouveaux membres.'
                : 'Guarantee the integrity of the national network by validating the skills and authenticity of new members.'}
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-8 bg-white dark:bg-white/5 p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl"
          >
            <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Clock size={36} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-6xl font-black text-secondary dark:text-white tracking-tighter font-outfit leading-none">{pendingExperts.length}</div>
              <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-3">{isFR ? 'Dossiers en Attente' : 'Pending Dossiers'}</div>
            </div>
          </motion.div>
        </div>

        <div className="section-divider" />

        {/* ==================== CONTENT AREA ==================== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-10 bg-slate-50/50 dark:bg-white/5 rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-inner">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-200 dark:border-white/5 rounded-full" />
              <Loader2 className="w-24 h-24 animate-spin text-primary absolute top-0 left-0" strokeWidth={1.5} />
            </div>
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] text-[11px]">{isFR ? 'Synchronisation du répertoire...' : 'Synchronizing directory...'}</p>
          </div>
        ) : (
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {pendingExperts.map((expert, i) => (
                <motion.div
                  key={expert.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="premium-card group relative !p-10 !rounded-[3.5rem] border-slate-100 dark:border-white/5 hover:border-primary/30 flex flex-col lg:flex-row items-center gap-12"
                >
                  {/* Expert Visual */}
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary dark:text-primary-light group-hover:scale-105 transition-transform duration-700 shadow-inner border border-slate-100 dark:border-white/10">
                      {expert.expert_type === 'diaspora' ? <Globe size={48} strokeWidth={1.5} /> : <UserCheck size={48} strokeWidth={1.5} />}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white dark:bg-secondary border-4 border-slate-50 dark:border-white/10 flex items-center justify-center text-slate-400 shadow-xl">
                      <Inbox size={16} />
                    </div>
                  </div>

                  {/* Expert Details */}
                  <div className="flex-1 space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                        <h3 className="font-black text-3xl text-secondary dark:text-white tracking-tight font-outfit leading-tight">{expert.name}</h3>
                        <span className={`px-5 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                          expert.expert_type === 'diaspora' 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' 
                            : 'bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light border-primary/10'
                        }`}>
                          {expert.expert_type === 'diaspora' ? (isFR ? 'Diaspora' : 'Diaspora') : (isFR ? 'Résident' : 'Resident')}
                        </span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-3 text-primary dark:text-primary-light font-black text-[13px] uppercase tracking-[0.2em]">
                         <Briefcase size={18} strokeWidth={3} />
                         {expert.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm pt-8 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center justify-center lg:justify-start gap-4 group/info cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/info:text-primary transition-all shadow-inner border border-slate-100 dark:border-white/5"><Mail size={18} strokeWidth={2.5} /></div>
                        <span className="text-slate-600 dark:text-slate-400 font-bold group-hover/info:text-secondary dark:group-hover/info:text-white transition-colors">{expert.email}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-4 group/info cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/info:text-primary transition-all shadow-inner border border-slate-100 dark:border-white/5"><MapPin size={18} strokeWidth={2.5} /></div>
                        <span className="text-slate-600 dark:text-slate-400 font-bold group-hover/info:text-secondary dark:group-hover/info:text-white transition-colors">{expert.city}, {expert.country || 'Cameroun'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full lg:w-auto shrink-0 pt-10 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/5 transition-colors">
                    <button 
                      onClick={() => handleAction(expert.id, 'rejected')}
                      disabled={!!actionLoading}
                      className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 border border-slate-100 dark:border-white/5 hover:border-red-100 transition-all group/btn"
                    >
                      <UserX size={20} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                      {isFR ? 'Rejeter' : 'Reject'}
                    </button>
                    <button 
                      onClick={() => handleAction(expert.id, 'approved')}
                      disabled={!!actionLoading}
                      className="btn-premium w-full sm:w-auto !px-12 !py-5 bg-primary text-white shadow-2xl shadow-primary/30 hover:bg-primary-dark group/btn"
                    >
                      {actionLoading === expert.id ? <Loader2 className="animate-spin" size={20} /> : <UserCheck size={20} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />}
                      {isFR ? 'Approuver' : 'Approve'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {pendingExperts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[4rem] py-40 text-center space-y-12 transition-colors"
              >
                <div className="w-32 h-32 bg-emerald-50 dark:bg-emerald-500/10 rounded-[3rem] mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner mb-6 border border-emerald-100 dark:border-emerald-500/20">
                  <Inbox size={64} strokeWidth={1.5} />
                </div>
                <div className="space-y-6">
                  <h3 className="font-black text-4xl md:text-5xl text-secondary dark:text-white tracking-tight font-outfit">{isFR ? 'File de Modération Purifiée' : 'Moderation Queue Purified'}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-normal text-xl max-w-xl mx-auto leading-relaxed font-inter">
                    {isFR ? 'Toutes les candidatures stratégiques ont été traitées avec succès. Le réseau est intègre.' : 'All strategic applications have been successfully processed. The network is integrated.'}
                  </p>
                </div>
                <div className="pt-8">
                  <div className="section-label">
                    <ShieldCheck size={18} strokeWidth={3} />
                    {isFR ? 'Intégrité du Système Certifiée' : 'Certified System Integrity'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ==================== ADMIN FOOTER TIPS ==================== */}
        {!loading && pendingExperts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] pt-12 transition-colors"
          >
            <AlertCircle size={18} className="text-primary" strokeWidth={3} />
            <span>{isFR ? 'Veuillez vérifier rigoureusement l\'authenticité des documents' : 'Please rigorously verify the authenticity of documents'}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
