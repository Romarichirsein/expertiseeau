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
    <div className="bg-slate-50/50 min-h-screen font-inter pb-32">
      <div className="max-w-7xl mx-auto px-6 space-y-12 pt-10">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 font-extrabold text-[10px] uppercase tracking-widest w-fit border border-red-100">
              <ShieldCheck size={14} />
              {isFR ? 'Espace Haute Administration' : 'High Administration Space'}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-outfit">
              {isFR ? 'Modération des ' : 'Expert '} <span className="text-[#0a5694]">{isFR ? 'Dossiers' : 'Moderation'}</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
              {isFR 
                ? 'Gérez et validez les nouvelles inscriptions pour garantir l\'excellence et l\'intégrité du réseau national.'
                : 'Manage and validate new registrations to ensure the excellence and integrity of the national network.'}
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
              <Clock size={32} />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">{pendingExperts.length}</div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{isFR ? 'Demandes en attente' : 'Pending Requests'}</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-100 rounded-full" />
              <Loader2 className="w-20 h-20 animate-spin text-[#0a5694] absolute top-0 left-0" />
            </div>
            <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px]">{isFR ? 'Synchronisation des dossiers...' : 'Synchronizing folders...'}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {pendingExperts.map((expert) => (
                <motion.div
                  key={expert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all flex flex-col lg:flex-row items-center gap-12 group"
                >
                  <div className="w-28 h-28 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-[#0a5694] shrink-0 group-hover:scale-105 transition-transform shadow-inner border border-slate-100">
                    {expert.expert_type === 'diaspora' ? <Globe size={48} /> : <UserCheck size={48} />}
                  </div>

                  <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <h3 className="font-extrabold text-3xl text-slate-900 tracking-tight font-outfit">{expert.name}</h3>
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border ${
                          expert.expert_type === 'diaspora' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {expert.expert_type || 'Resident'}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-500 font-outfit">{expert.profession}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-bold text-slate-400">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Mail size={18} /></div>
                        <span className="text-slate-600">{expert.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><MapPin size={18} /></div>
                        <span className="text-slate-600">{expert.city}, {expert.country || 'Cameroun'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto shrink-0 pt-10 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button 
                      onClick={() => handleAction(expert.id, 'rejected')}
                      disabled={!!actionLoading}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-xs uppercase tracking-widest bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-100 hover:border-red-100 transition-all group/btn"
                    >
                      <UserX size={18} className="group-hover/btn:scale-110 transition-transform" />
                      {isFR ? 'Rejeter' : 'Reject'}
                    </button>
                    <button 
                      onClick={() => handleAction(expert.id, 'approved')}
                      disabled={!!actionLoading}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-extrabold text-xs uppercase tracking-widest bg-[#0a5694] text-white shadow-xl shadow-blue-900/20 hover:bg-[#062040] hover:-translate-y-1 transition-all group/btn"
                    >
                      {actionLoading === expert.id ? <Loader2 className="animate-spin" size={18} /> : <UserCheck size={18} className="group-hover/btn:scale-110 transition-transform" />}
                      {isFR ? 'Approuver' : 'Approve'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {pendingExperts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-dashed border-slate-200 rounded-[4rem] py-32 text-center space-y-8 shadow-xl shadow-blue-900/5"
              >
                <div className="w-28 h-28 bg-emerald-50 rounded-[3rem] mx-auto flex items-center justify-center text-emerald-600 shadow-inner mb-4 border border-emerald-100">
                  <Inbox size={56} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-extrabold text-4xl text-slate-900 tracking-tight font-outfit">{isFR ? 'File de modération vide' : 'Moderation queue empty'}</h3>
                  <p className="text-slate-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
                    {isFR ? 'Toutes les demandes ont été traitées. Le réseau est parfaitement à jour.' : 'All requests have been processed. The network is perfectly up to date.'}
                  </p>
                </div>
                <div className="pt-6">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-600 font-extrabold text-[10px] uppercase tracking-widest border border-emerald-100">
                    <ShieldCheck size={16} />
                    {isFR ? 'Intégrité du Système OK' : 'System Integrity OK'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Admin Footer Tip */}
        {!loading && pendingExperts.length > 0 && (
          <div className="flex items-center justify-center gap-4 text-slate-400 font-extrabold text-[10px] uppercase tracking-widest pt-12">
            <AlertCircle size={16} className="text-[#0a5694]" />
            <span>{isFR ? 'Veuillez vérifier les antécédents professionnels avant toute approbation' : 'Please verify professional backgrounds before any approval'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
