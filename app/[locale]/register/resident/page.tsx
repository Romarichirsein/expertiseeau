"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, MapPin, Briefcase, 
  GraduationCap, ArrowRight, ShieldCheck, CheckCircle, 
  UserPlus, ChevronLeft, Globe, Award, Heart
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 text-center max-w-xl border border-gray-100">
          <div className="w-24 h-24 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-500/20">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">{isFR ? 'Demande envoyée !' : 'Request sent!'}</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {isFR 
              ? 'Votre compte a été créé avec succès. Votre profil est désormais en attente de validation par l\'administration du réseau.' 
              : 'Your account has been successfully created. Your profile is now pending validation by the network administration.'}
          </p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-3 px-10 py-5 bg-[#0a5694] text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 hover:scale-105 transition-all">
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
        <UserPlus size={400} />
      </div>

      <div className="container relative z-10 max-w-[720px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-xs font-black uppercase tracking-widest mb-6">
            <Award size={14} />
            {isFR ? 'Expert Résident' : 'Resident Expert'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {isFR ? 'Rejoignez le Réseau' : 'Join the Network'}
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            {isFR ? 'Valorisez votre expertise locale au service du secteur de l\'eau.' : 'Promote your local expertise at the service of the water sector.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
        >
          {/* Stepper Header */}
          <div className="bg-gray-50 px-12 py-8 border-b border-gray-100 flex justify-between items-center">
            <div className="flex gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    s === step ? 'bg-[#0a5694] text-white' : s < step ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200 text-gray-400'
                  }`}>
                    {s < step ? <CheckCircle size={16} /> : s}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
            </div>
          </div>

          <div className="p-8 md:p-12">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold">
                <ShieldCheck size={20} />
                {error}
              </div>
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
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Prénom' : 'First Name'}</label>
                        <input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Jean" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Dupont" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Genre' : 'Gender'}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold appearance-none cursor-pointer">
                          <option value="M">{isFR ? 'Masculin' : 'Male'}</option>
                          <option value="F">{isFR ? 'Féminin' : 'Female'}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Tranche d\'âge' : 'Age range'}</label>
                        <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold appearance-none cursor-pointer">
                          <option value="20-30">20-30</option>
                          <option value="30-40">30-40</option>
                          <option value="40-50">40-50</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>
                    </div>

                    <button type="button" onClick={() => setStep(2)} className="w-full py-5 bg-[#0a5694] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-all group">
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
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Profession / Titre' : 'Profession / Title'}</label>
                      <div className="relative group">
                        <Briefcase size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Ex: Ingénieur des Eaux & Forêts" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Ville de résidence' : 'City of residence'}</label>
                      <div className="relative group">
                        <MapPin size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" />
                        <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="Yaoundé" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Domaines d\'expertise' : 'Expertise Areas'}</label>
                      <div className="flex flex-wrap gap-2">
                        {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Génie Civil', 'Environnement'].map(exp => (
                          <button 
                            key={exp}
                            type="button"
                            onClick={() => handleExpertiseChange(exp)}
                            className={`px-5 py-3 rounded-xl text-xs font-black transition-all ${
                              formData.expertise.includes(exp) 
                                ? 'bg-[#0a5694] text-white shadow-lg shadow-blue-900/10' 
                                : 'bg-[#f8fafc] text-gray-500 border border-gray-100 hover:border-[#0a5694]/30'
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="flex-[2] py-5 bg-[#0a5694] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-all group">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email</label>
                        <div className="relative group">
                          <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="votre@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Téléphone' : 'Phone'}</label>
                        <div className="relative group">
                          <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="+237 ..." />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                        <div className="relative group">
                          <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{isFR ? 'Confirmer' : 'Confirm'}</label>
                        <div className="relative group">
                          <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" placeholder="••••••••" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-5 bg-[#0a5694] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-all group disabled:opacity-50">
                        {loading ? (isFR ? 'Chargement...' : 'Loading...') : (isFR ? 'Finaliser l\'inscription' : 'Finish Registration')}
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
              {isFR ? 'Accéder à mon espace expert' : 'Access my expert space'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-40 grayscale">
          <img src="/images/partners/france.png" alt="France" className="h-8" onError={(e) => e.currentTarget.style.display='none'} />
          <img src="/images/partners/eu.jpg" alt="EU" className="h-8" onError={(e) => e.currentTarget.style.display='none'} />
          <img src="/images/partners/afd.png" alt="AFD" className="h-10" onError={(e) => e.currentTarget.style.display='none'} />
        </div>
      </div>
    </div>
  );
}
