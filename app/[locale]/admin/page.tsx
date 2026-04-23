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
  AlertCircle
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
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-6 md:px-12">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-[0.2em] w-fit">
            <ShieldCheck size={14} />
            {isFR ? 'Espace Administration' : 'Administration Space'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            {isFR ? 'Modération des ' : 'Expert '} <span className="text-[#0a5694]">{isFR ? 'Experts' : 'Moderation'}</span>
          </h1>
          <p className="text-gray-500 font-bold text-lg max-w-2xl">
            {isFR 
              ? 'Gérez et validez les nouvelles inscriptions pour garantir l\'excellence du réseau national.'
              : 'Manage and validate new registrations to ensure the excellence of the national network.'}
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
            <Clock size={28} />
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 tracking-tight">{pendingExperts.length}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isFR ? 'En attente' : 'Pending'}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-50 rounded-full" />
            <Loader2 className="w-16 h-16 animate-spin text-[#0a5694] absolute top-0 left-0" />
          </div>
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">{isFR ? 'Chargement des dossiers...' : 'Loading folders...'}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {pendingExperts.map((expert) => (
              <motion.div
                key={expert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-100 p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all flex flex-col lg:flex-row items-center gap-10 group"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-gray-50 flex items-center justify-center text-[#0a5694] shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  {expert.expert_type === 'diaspora' ? <Globe size={40} /> : <UserCheck size={40} />}
                </div>

                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                      <h3 className="font-black text-2xl text-gray-900 tracking-tight">{expert.name}</h3>
                      <span className={`px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        expert.expert_type === 'diaspora' ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {expert.expert_type || 'Resident'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-500">{expert.profession}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><Mail size={14} /></div>
                      {expert.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><MapPin size={14} /></div>
                      {expert.city}, {expert.country || 'Cameroun'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto shrink-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                  <button 
                    onClick={() => handleAction(expert.id, 'rejected')}
                    disabled={!!actionLoading}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all group/btn"
                  >
                    <UserX size={18} className="group-hover/btn:scale-110 transition-transform" />
                    {isFR ? 'Rejeter' : 'Reject'}
                  </button>
                  <button 
                    onClick={() => handleAction(expert.id, 'approved')}
                    disabled={!!actionLoading}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-[#0a5694] text-white shadow-xl shadow-blue-900/10 hover:scale-105 active:scale-95 transition-all group/btn"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-dashed border-gray-200 rounded-[4rem] p-24 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] mx-auto flex items-center justify-center text-emerald-600 shadow-sm mb-4">
                <ShieldCheck size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-3xl text-gray-900 tracking-tight">{isFR ? 'Zéro demande en attente' : 'No pending requests'}</h3>
                <p className="text-gray-500 font-bold text-lg max-w-md mx-auto">
                  {isFR ? 'Félicitations, vous êtes à jour dans la modération des dossiers.' : 'Congratulations, you are up to date with folder moderation.'}
                </p>
              </div>
              <div className="pt-6">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                  <ShieldCheck size={14} />
                  {isFR ? 'Système au repos' : 'System idle'}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Admin Footer Tip */}
      {!loading && pendingExperts.length > 0 && (
        <div className="flex items-center justify-center gap-3 text-gray-400 font-black text-[10px] uppercase tracking-widest pt-8">
          <AlertCircle size={14} className="text-[#0a5694]" />
          <span>{isFR ? 'Vérifiez les antécédents avant approbation' : 'Verify backgrounds before approval'}</span>
        </div>
      )}
    </div>
  );
}
