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
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{isFR ? 'Demande envoyée !' : 'Request sent!'}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {isFR 
              ? 'Votre compte a été créé avec succès. Votre profil est désormais en attente de validation.' 
              : 'Your account has been successfully created. Your profile is now pending validation.'}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-[10px] font-bold uppercase tracking-wider mb-4">
            <Award size={14} />
            {isFR ? 'Expert Résident' : 'Resident Expert'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            {isFR ? 'Rejoignez le Réseau' : 'Join the Network'}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {isFR ? 'Valorisez votre expertise locale au service du secteur de l\'eau.' : 'Promote your local expertise at the service of the water sector.'}
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
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-8 flex items-center gap-3 text-xs font-bold">
                <ShieldCheck size={18} />
                {error}
              </div>
            )}

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
                        <input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Jean" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Nom' : 'Last Name'}</label>
                        <input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Dupont" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Genre' : 'Gender'}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium appearance-none cursor-pointer">
                          <option value="M">{isFR ? 'Masculin' : 'Male'}</option>
                          <option value="F">{isFR ? 'Féminin' : 'Female'}</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Tranche d\'âge' : 'Age range'}</label>
                        <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium appearance-none cursor-pointer">
                          <option value="20-30">20-30</option>
                          <option value="30-40">30-40</option>
                          <option value="40-50">40-50</option>
                          <option value="50+">50+</option>
                        </select>
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
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Profession / Titre' : 'Profession / Title'}</label>
                      <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Ex: Ingénieur des Eaux" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Ville de résidence' : 'City of residence'}</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Yaoundé" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Domaines d\'expertise' : 'Expertise Areas'}</label>
                      <div className="flex flex-wrap gap-2">
                        {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Environnement'].map(exp => (
                          <button 
                            key={exp}
                            type="button"
                            onClick={() => handleExpertiseChange(exp)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              formData.expertise.includes(exp) 
                                ? 'bg-[#0a5694] text-white shadow-md' 
                                : 'bg-gray-50 text-gray-500 border border-gray-100 hover:border-gray-300'
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="votre@email.com" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Téléphone' : 'Phone'}</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="+237 ..." />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Mot de passe' : 'Password'}</label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{isFR ? 'Confirmer' : 'Confirm'}</label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="••••••••" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                        <ChevronLeft size={18} />
                        {isFR ? 'Retour' : 'Back'}
                      </button>
                      <button type="submit" disabled={loading} className="flex-[2] py-3.5 bg-[#0a5694] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all disabled:opacity-50">
                        {loading ? (isFR ? 'Chargement...' : 'Loading...') : (isFR ? 'Finaliser l\'inscription' : 'Finish Registration')}
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
