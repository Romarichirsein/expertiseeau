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
      <div className="min-h-screen flex items-center justify-center p-6 pt-32 bg-slate-50/50 font-inter">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight font-outfit">{isFR ? 'Inscription Réussie' : 'Registration Successful'}</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            {isFR 
              ? 'Votre demande a été enregistrée avec succès. Notre réseau d\'experts vous contactera après validation de votre profil international.' 
              : 'Your request has been successfully registered. Our expert network will contact you after validation of your international profile.'}
          </p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-2 px-10 py-4 bg-[#0a5694] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#062040] transition-all">
            {isFR ? 'Se connecter' : 'Log In'}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pt-44 pb-32 font-inter">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d9488] text-[10px] font-bold uppercase tracking-widest mb-4 border border-teal-100">
            <Globe size={14} />
            {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight font-outfit">
            {isFR ? 'Rayonnez à l\'International' : 'Global Impact'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isFR ? 'Contribuez au développement du Cameroun depuis n\'importe où dans le monde.' : 'Contribute to Cameroon\'s development from anywhere in the world.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 overflow-hidden"
        >
          {/* Enhanced Progress Header */}
          <div className="bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex justify-between items-center">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
                </span>
                <span className="text-sm font-bold text-slate-900">
                   {step === 1 && (isFR ? 'Localisation & Identité' : 'Location & Identity')}
                   {step === 2 && (isFR ? 'Expertise & Contact' : 'Expertise & Contact')}
                   {step === 3 && (isFR ? 'Engagement & Sécurité' : 'Commitment & Security')}
                </span>
             </div>
             <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                   <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? 'w-12 bg-[#0a5694]' : s < step ? 'w-4 bg-teal-500' : 'w-4 bg-slate-200'}`} />
                ))}
             </div>
          </div>

          <div className="p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Prénom' : 'First Name'}</label>
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Jean" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Dupont" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Pays de résidence' : 'Country of residence'}</label>
                      <div className="relative group">
                        <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: France, USA, Canada..." />
                      </div>
                    </div>

                    <button type="button" onClick={() => setStep(2)} className="w-full py-4 bg-[#0a5694] text-white rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:bg-[#062040] hover:-translate-y-1 transition-all">
                      {isFR ? 'Continuer' : 'Continue'}
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email professionnel</label>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="expert@exemple.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Spécialité / Domaine' : 'Specialization'}</label>
                      <div className="relative group">
                        <Award size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Gestion des ressources hydriques" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="flex-[2] py-4 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 hover:bg-[#062040] hover:-translate-y-1 transition-all">
                        {isFR ? 'Suivant' : 'Next'}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                           <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{isFR ? 'Charte d\'Engagement' : 'Commitment Charter'}</h3>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        {isFR 
                          ? 'En rejoignant ce réseau d\'élite, vous vous engagez à mettre votre expertise internationale au profit du développement stratégique du Cameroun.' 
                          : 'By joining this elite network, you commit to putting your international expertise at the service of Cameroon\'s strategic development.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-4 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:bg-[#062040] transition-all disabled:opacity-50 group">
                        {loading ? '...' : (isFR ? 'Valider l\'inscription' : 'Validate Registration')}
                        {!loading && <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="bg-slate-50/50 p-8 text-center border-t border-slate-100">
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
               {isFR ? 'Déjà membre du réseau ?' : 'Already a network member?'}
             </p>
             <Link href={`/${locale}/login`} className="text-[#0a5694] font-bold text-sm hover:text-blue-800 transition-colors">
               {isFR ? 'Accéder à mon espace expert' : 'Access my expert space'}
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
