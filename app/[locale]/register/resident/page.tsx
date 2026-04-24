"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, MapPin, Briefcase, 
  ArrowRight, ShieldCheck, CheckCircle, 
  UserPlus, ChevronLeft, Award
} from 'lucide-react';
import Link from 'next/link';
import { signUpExpert } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';

export default function RegisterResidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profession: '',
    city: '',
    gender: 'M',
    age_range: '30-40',
    expertise: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (val: string) => {
    setFormData(prev => {
      const current = prev.expertise;
      if (current.includes(val)) {
        return { ...prev, expertise: current.filter(i => i !== val) };
      } else {
        return { ...prev, expertise: [...current, val] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(isFR ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await signUpExpert({
      ...formData,
      expert_type: 'resident'
    });

    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50 font-inter">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight font-outfit">{isFR ? 'Demande envoyée !' : 'Request sent!'}</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            {isFR 
              ? 'Votre compte a été créé avec succès. Votre profil est désormais en attente de validation par nos services.' 
              : 'Your account has been successfully created. Your profile is now pending validation by our services.'}
          </p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-2 px-10 py-4 bg-[#0a5694] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#062040] transition-all">
            {isFR ? 'Accéder à la connexion' : 'Access Login'}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-32 font-inter">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <Award size={14} />
            {isFR ? 'Expert Résident' : 'Resident Expert'}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight font-outfit">
            {isFR ? 'Formulaire d\'Adhésion' : 'Membership Form'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isFR ? 'Rejoignez l\'élite des professionnels du secteur de l\'eau au Cameroun.' : 'Join the elite water sector professionals in Cameroon.'}
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
                   {step === 1 && (isFR ? 'Informations Personnelles' : 'Personal Info')}
                   {step === 2 && (isFR ? 'Parcours & Expertise' : 'Career & Expertise')}
                   {step === 3 && (isFR ? 'Sécurité du Compte' : 'Account Security')}
                </span>
             </div>
             <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                   <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? 'w-12 bg-[#0a5694]' : s < step ? 'w-4 bg-blue-200' : 'w-4 bg-slate-200'}`} />
                ))}
             </div>
          </div>

          <div className="p-10 md:p-12">
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-10 flex items-center gap-3 text-xs font-bold">
                <ShieldCheck size={18} />
                {error}
              </motion.div>
            )}

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
                        <input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Jean" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Dupont" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Genre' : 'Gender'}</label>
                        <div className="relative">
                           <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-slate-900 font-semibold text-sm appearance-none cursor-pointer">
                              <option value="M">{isFR ? 'Masculin' : 'Male'}</option>
                              <option value="F">{isFR ? 'Féminin' : 'Female'}</option>
                           </select>
                           <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Tranche d\'âge' : 'Age range'}</label>
                        <div className="relative">
                           <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-slate-900 font-semibold text-sm appearance-none cursor-pointer">
                              <option value="20-30">20-30 ans</option>
                              <option value="30-40">30-40 ans</option>
                              <option value="40-50">40-50 ans</option>
                              <option value="50+">50 ans et plus</option>
                           </select>
                           <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-slate-400 pointer-events-none" />
                        </div>
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Profession / Titre' : 'Profession / Title'}</label>
                      <div className="relative group">
                        <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Ingénieur des Eaux et Forêts" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Ville de résidence' : 'City of residence'}</label>
                      <div className="relative group">
                        <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Douala" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Domaines d\'expertise principaux' : 'Key Expertise Areas'}</label>
                      <div className="flex flex-wrap gap-2">
                        {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Génie Rural', 'Irrigation', 'Environnement'].map(exp => (
                          <button 
                            key={exp}
                            type="button"
                            onClick={() => handleExpertiseChange(exp)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              formData.expertise.includes(exp) 
                                ? 'bg-[#0a5694] text-white shadow-lg shadow-blue-900/20 ring-2 ring-blue-600/10' 
                                : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="relative group">
                          <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                          <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="expert@exemple.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Téléphone' : 'Phone'}</label>
                        <div className="relative group">
                          <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                          <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="+237 ..." />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                        <div className="relative group">
                          <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                          <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Confirmation' : 'Confirm'}</label>
                        <div className="relative group">
                          <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                          <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="••••••••" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-4 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:bg-[#062040] transition-all disabled:opacity-50 group">
                        {loading ? (isFR ? 'Finalisation...' : 'Completing...') : (isFR ? 'Finaliser l\'inscription' : 'Finish Registration')}
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
               {isFR ? 'Déjà un compte expert ?' : 'Already have an expert account?'}
             </p>
             <Link href={`/${locale}/login`} className="text-[#0a5694] font-bold text-sm hover:text-blue-800 transition-colors">
               {isFR ? 'Connectez-vous à votre espace' : 'Log in to your space'}
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
    </motion.div>
      </div>
    </div>
  );
}
  );
}
