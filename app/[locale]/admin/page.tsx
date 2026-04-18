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
  Globe
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
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
            <ShieldCheck size={18} />
            {isFR ? 'Administration' : 'Administration'}
          </div>
          <h1 className="text-3xl font-bold font-outfit">
            {isFR ? 'Modération des Experts' : 'Expert Moderation'}
          </h1>
          <p className="text-muted-foreground">
            {isFR 
              ? 'Validez les nouvelles inscriptions pour maintenir la qualité du répertoire.'
              : 'Validate new registrations to maintain the quality of the directory.'}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-orange-500/5 px-6 py-4 rounded-3xl border border-orange-500/10">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-xl font-bold font-outfit">{pendingExperts.length}</div>
            <div className="text-xs text-muted-foreground uppercase">{isFR ? 'En attente' : 'Pending'}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground">{isFR ? 'Chargement des demandes...' : 'Loading requests...'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {pendingExperts.map((expert) => (
              <motion.div
                key={expert.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  {expert.expert_type === 'diaspora' ? <Globe size={32} /> : <UserCheck size={32} />}
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h3 className="font-bold text-xl font-outfit">{expert.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      expert.expert_type === 'diaspora' ? 'bg-accent-teal/10 text-accent-teal' : 'bg-primary/10 text-primary'
                    }`}>
                      {expert.expert_type || 'Resident'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 line-clamp-1">
                      <Mail size={14} className="text-primary" />
                      {expert.email}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {expert.city}, {expert.country || 'Cameroun'}
                    </div>
                  </div>
                  <p className="text-sm font-medium">{expert.profession}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleAction(expert.id, 'rejected')}
                    disabled={!!actionLoading}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-secondary text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <UserX size={20} />
                    {isFR ? 'Rejeter' : 'Reject'}
                  </button>
                  <button 
                    onClick={() => handleAction(expert.id, 'approved')}
                    disabled={!!actionLoading}
                    className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-600 transition-all"
                  >
                    {actionLoading === expert.id ? <Loader2 className="animate-spin" size={20} /> : <UserCheck size={20} />}
                    {isFR ? 'Approuver' : 'Approve'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {pendingExperts.length === 0 && (
            <div className="bg-secondary/30 border border-dashed border-border rounded-[2.5rem] p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-emerald-500 shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">{isFR ? 'Toutes les demandes ont été traitées' : 'All requests processed'}</h3>
                <p className="text-muted-foreground">{isFR ? 'Il n\'y a actuellement aucun expert en attente de modération.' : 'There are currently no experts waiting for moderation.'}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
