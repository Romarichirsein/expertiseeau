"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, Globe, 
  ArrowRight, ShieldCheck, CheckCircle, UserPlus,
  ChevronLeft, Award, Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterDiasporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{isFR ? 'Inscription Diaspora' : 'Diaspora Registered'}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {isFR 
              ? 'Votre demande a été enregistrée. Le réseau des experts vous contactera après validation.' 
              : 'Your request has been registered. The network will contact you after validation.'}
          </p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0a5694] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all">
            {isFR ? 'Se connecter' : 'Log In'}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-20">
      <div className="max-w-[640px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d9488] text-[10px] font-bold uppercase tracking-wider mb-4">
            <Globe size={14} />
            {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            {isFR ? 'Rayonnez à l\'International' : 'Global Impact'}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {isFR ? 'Contribuez au développement du Cameroun depuis n\'importe où dans le monde.' : 'Contribute to Cameroon\'s development from anywhere in the world.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Progress Header */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
             </span>
             <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                   <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${s <= step ? 'bg-[#0a5694]' : 'bg-gray-200'}`} />
                ))}
             </div>
          </div>

          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Prénom' : 'First Name'}</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Jean" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Dupont" />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Pays de résidence' : 'Country of residence'}</label>
                      <div className="relative">
                        <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="France, USA, Canada..." />
                      </div>
                    </div>

                    <button type="button" onClick={() => setStep(2)} className="w-full py-4 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all">
                      {isFR ? 'Continuer' : 'Continue'}
                      <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email professionnel</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Spécialité / Domaine' : 'Specialization'}</label>
                      <div className="relative">
                        <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Ex: Gestion des eaux" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="flex-[2] py-3.5 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all">
                        {isFR ? 'Suivant' : 'Next'}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 space-y-3">
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-[#0a5694]" />
                        <h3 className="text-sm font-bold text-[#0a5694]">{isFR ? 'Engagement' : 'Commitment'}</h3>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed font-medium">
                        {isFR 
                          ? 'En rejoignant le réseau, vous acceptez de partager vos connaissances pour des projets stratégiques au Cameroun.' 
                          : 'By joining the network, you agree to share your knowledge for strategic projects in Cameroon.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-3.5 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all disabled:opacity-50">
                        {loading ? '...' : (isFR ? 'Valider' : 'Validate')}
                        {!loading && <UserPlus size={18} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
               {isFR ? 'Déjà membre ?' : 'Already a member?'}
             </p>
             <Link href={`/${locale}/login`} className="text-[#0a5694] font-bold text-sm hover:underline">
               {isFR ? 'Accéder à mon espace' : 'Access my space'}
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
  );
}
