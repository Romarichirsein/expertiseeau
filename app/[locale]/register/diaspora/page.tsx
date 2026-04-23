"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, MapPin, Globe, 
  ArrowRight, ShieldCheck, CheckCircle, UserPlus,
  ChevronLeft, Award, Heart, Briefcase, Zap
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 text-center max-w-xl border border-gray-100">
          <div className="w-24 h-24 rounded-full bg-[#0d9488] text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-500/20">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">{isFR ? 'Inscription Diaspora' : 'Diaspora Registered'}</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {isFR 
              ? 'Votre demande a été enregistrée. Le réseau des experts de la diaspora vous contactera après validation de votre profil.' 
              : 'Your request has been registered. The diaspora experts network will contact you after profile validation.'}
          </p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-3 px-10 py-5 bg-[#0d9488] text-white rounded-2xl font-black text-lg shadow-xl shadow-teal-900/10 hover:scale-105 transition-all">
            {isFR ? 'Se connecter' : 'Log In'}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] rotate-12">
        <Globe size={400} className="text-teal-900" />
      </div>

      <div className="container relative z-10 max-w-[720px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d9488] text-xs font-black uppercase tracking-widest mb-6">
            <Globe size={14} />
            {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {isFR ? 'Rayonnez à l\'International' : 'Global Impact'}
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            {isFR ? 'Contribuez au développement du Cameroun depuis n\'importe où dans le monde.' : 'Contribute to Cameroon\'s development from anywhere in the world.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-gray-100 overflow-hidden"
        >
          {/* Stepper Header */}
          <div className="bg-gray-50 px-12 py-8 border-b border-gray-100 flex justify-between items-center">
            <div className="flex gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    s === step ? 'bg-[#0d9488] text-white' : s < step ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-400'
                  }`}>
                    {s < step ? <CheckCircle size={16} /> : s}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
            </div>
          </div>

          <div className="p-8 md:p-12">
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
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Prénom' : 'First Name'}</label>
                        <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Jean" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Dupont" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Pays de résidence' : 'Country of residence'}</label>
                      <div className="relative group">
                        <Globe size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d9488] transition-colors" />
                        <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="France, USA, Canada..." />
                      </div>
                    </div>

                    <button type="button" onClick={() => setStep(2)} className="w-full py-5 bg-[#0d9488] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-teal-900/10 hover:scale-[1.02] transition-all group">
                      {isFR ? 'Continuer' : 'Continue'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email professionnel</label>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="email" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Spécialité / Domaine' : 'Specialization'}</label>
                      <div className="relative group">
                        <Award size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Ex: Gestion des eaux transfrontalières" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="flex-[2] py-5 bg-[#0d9488] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-teal-900/10 hover:scale-[1.02] transition-all group">
                        {isFR ? 'Suivant' : 'Next'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
                    <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0d9488] text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-900/20">
                          <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-lg font-black text-[#0d9488]">{isFR ? 'Contribution & Impact' : 'Contribution & Impact'}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isFR 
                          ? 'En rejoignant le réseau, vous acceptez de partager vos connaissances et expertises pour des projets stratégiques au Cameroun.' 
                          : 'By joining the network, you agree to share your knowledge and expertise for strategic projects in Cameroon.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="password" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-[#0d9488] focus:bg-white transition-all text-gray-900 font-bold" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-5 bg-[#0d9488] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-teal-900/10 hover:scale-[1.02] transition-all group disabled:opacity-50">
                        {loading ? '...' : (isFR ? 'Valider mon inscription' : 'Validate Registration')}
                        {!loading && <UserPlus size={20} className="group-hover:scale-110 transition-transform" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="bg-gray-900 p-8 text-center">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-4">
              {isFR ? 'Déjà membre du réseau ?' : 'Already part of the network?'}
            </span>
            <Link href={`/${locale}/login`} className="text-white font-black hover:text-[#7dd3fc] transition-colors flex items-center justify-center gap-2 group">
              {isFR ? 'Se connecter à l\'espace diaspora' : 'Connect to diaspora space'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
