"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, MapPin, Briefcase, 
  ArrowRight, ShieldCheck, CheckCircle, 
  UserPlus, ChevronLeft, Award, Globe, Zap, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { signUpExpert } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="min-h-screen flex items-center justify-center p-6 pt-32 bg-background font-inter transition-colors duration-500 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/hero-pattern.svg')] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 animate-float" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl w-full"
        >
          <Card className="rounded-[3rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-12 md:p-20 text-center">
            <CardContent className="p-0">
              <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-10 shadow-inner">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight font-outfit">{isFR ? 'Demande envoyée !' : 'Request sent!'}</h2>
              <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-12">
                {isFR 
                  ? 'Votre compte a été créé avec succès. Votre profil est désormais en attente de validation institutionnelle par nos services de certification.' 
                  : 'Your account has been successfully created. Your profile is now pending institutional validation by our certification services.'}
              </p>
              <Link href={`/${locale}/login`} passHref>
                <Button variant="premium" size="lg" className="h-16 px-12 text-base rounded-2xl">
                  {isFR ? 'Accéder à la connexion' : 'Access Login'}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-48 md:pt-60 pb-32 md:pb-40 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl space-y-12"
          >
            <div className="section-label bg-white/5 border-white/10 text-primary-light">
              <Award size={16} strokeWidth={2.5} />
              {isFR ? 'Expert Résident' : 'Resident Expert'}
            </div>
            <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
              {isFR ? "Formulaire d'" : 'Membership '}
              <span className="text-gradient italic">{isFR ? 'Adhésion' : 'Form'}</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
              {isFR 
                ? 'Rejoignez le réseau institutionnel certifié des professionnels de l\'eau au Cameroun.' 
                : 'Join the certified institutional network of water professionals in Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-20 -mt-20 md:-mt-28 px-6 max-w-[900px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Card className="rounded-[4rem] border-none glass-card premium-shadow overflow-hidden">
            <div className="bg-white/40 dark:bg-white/5 px-12 py-10 border-b border-white/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="flex flex-col gap-3 text-center md:text-left">
                  <span className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60">
                    {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
                  </span>
                  <span className="text-2xl font-black text-foreground font-outfit uppercase tracking-tight leading-none">
                     {step === 1 && (isFR ? 'Informations Personnelles' : 'Personal Info')}
                     {step === 2 && (isFR ? 'Parcours & Expertise' : 'Career & Expertise')}
                     {step === 3 && (isFR ? 'Sécurité du Compte' : 'Account Security')}
                  </span>
               </div>
               <div className="flex gap-4">
                  {[1, 2, 3].map(s => (
                     <div key={s} className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${s === step ? 'w-24 bg-primary shadow-2xl shadow-primary/40' : s < step ? 'w-6 bg-primary/40' : 'w-6 bg-white/20'}`} />
                  ))}
               </div>
            </div>

            <CardContent className="p-12 md:p-20">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="mb-12 p-6 bg-red-500/10 text-red-600 dark:text-red-400 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] border border-red-500/20 flex items-center gap-5 shadow-inner"
                >
                  <ShieldCheck size={24} strokeWidth={2.5} />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Prénom' : 'First Name'}</Label>
                          <Input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Jean" />
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Nom de Famille' : 'Last Name'}</Label>
                          <Input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Dupont" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Genre' : 'Gender'}</Label>
                          <div className="relative group">
                             <select name="gender" value={formData.gender} onChange={handleChange} className="w-full flex h-18 rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-white/40 dark:bg-white/5 px-8 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all appearance-none cursor-pointer shadow-inner font-bold text-foreground">
                                <option value="M" className="text-slate-900">{isFR ? 'Masculin' : 'Male'}</option>
                                <option value="F" className="text-slate-900">{isFR ? 'Féminin' : 'Female'}</option>
                             </select>
                             <ChevronLeft size={24} strokeWidth={3} className="absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Tranche d\'âge' : 'Age range'}</Label>
                          <div className="relative group">
                             <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full flex h-18 rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-white/40 dark:bg-white/5 px-8 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all appearance-none cursor-pointer shadow-inner font-bold text-foreground">
                                <option value="20-30" className="text-slate-900">20-30 ans</option>
                                <option value="30-40" className="text-slate-900">30-40 ans</option>
                                <option value="40-50" className="text-slate-900">40-50 ans</option>
                                <option value="50+" className="text-slate-900">50 ans et plus</option>
                             </select>
                             <ChevronLeft size={24} strokeWidth={3} className="absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <Button type="button" variant="premium" onClick={() => setStep(2)} className="w-full h-24 text-2xl rounded-[2rem] mt-6 gap-6 group">
                        {isFR ? 'Étape Suivante' : 'Next Step'}
                        <ArrowRight size={32} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-10"
                    >
                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Profession / Titre Institutionnel' : 'Profession / Institutional Title'}</Label>
                        <div className="relative group">
                          <Briefcase size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Ingénieur des Eaux et Forêts" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Ville de Résidence' : 'City of Residence'}</Label>
                        <div className="relative group">
                          <MapPin size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required name="city" value={formData.city} onChange={handleChange} type="text" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Douala" />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Expertise Stratégique' : 'Strategic Expertise'}</Label>
                        <div className="flex flex-wrap gap-4">
                          {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Génie Rural', 'Irrigation', 'Environnement'].map(exp => (
                            <button 
                              key={exp}
                              type="button"
                              onClick={() => handleExpertiseChange(exp)}
                              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-700 font-outfit border ${
                                formData.expertise.includes(exp) 
                                  ? 'bg-primary text-white shadow-2xl shadow-primary/30 border-transparent scale-105' 
                                  : 'bg-white/40 dark:bg-white/5 text-muted-foreground border-white/10 dark:border-white/5 hover:border-primary/40'
                              }`}
                            >
                              {exp}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-8 pt-8">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-20 rounded-[1.5rem] border-white/10 dark:border-white/5 hover:bg-white/10 font-black uppercase tracking-widest text-xs gap-4 transition-all">
                          <ChevronLeft size={24} strokeWidth={3} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="button" variant="premium" onClick={() => setStep(3)} className="flex-[2] h-20 rounded-[1.5rem] font-black uppercase tracking-widest text-xs gap-4 group">
                          {isFR ? 'Suivant' : 'Next'}
                          <ArrowRight size={24} strokeWidth={3} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">Email Institutional</Label>
                          <div className="relative group">
                            <Mail size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="email" value={formData.email} onChange={handleChange} type="email" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="expert@exemple.com" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Téléphone' : 'Phone'}</Label>
                          <div className="relative group">
                            <Phone size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="+237 ..." />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Mot de passe' : 'Password'}</Label>
                          <div className="relative group">
                            <Lock size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="password" value={formData.password} onChange={handleChange} type="password" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="••••••••" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Confirmation' : 'Confirm'}</Label>
                          <div className="relative group">
                            <Lock size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="••••••••" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-8 pt-8">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-20 rounded-[1.5rem] border-white/10 dark:border-white/5 hover:bg-white/10 font-black uppercase tracking-widest text-xs gap-4 transition-all">
                          <ChevronLeft size={24} strokeWidth={3} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="submit" variant="premium" disabled={loading} className="flex-[2] h-20 rounded-[1.5rem] font-black uppercase tracking-widest text-xs gap-6 group shadow-2xl shadow-primary/30">
                          {loading ? (isFR ? 'Finalisation...' : 'Completing...') : (isFR ? 'Finaliser l\'Adhésion' : 'Finish Membership')}
                          {!loading && <UserPlus size={28} strokeWidth={2.5} className="ml-2 group-hover:rotate-12 transition-transform" />}
                          {loading && <Loader2 size={28} strokeWidth={2.5} className="ml-2 animate-spin" />}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>

            <div className="bg-white/40 dark:bg-white/5 p-12 text-center border-t border-white/10 dark:border-white/5">
               <p className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60 uppercase tracking-[0.4em] mb-6">
                 {isFR ? 'Déjà un compte institutionnel ?' : 'Already have an institutional account?'}
               </p>
               <Link href={`/${locale}/login`} className="text-primary font-black text-xl hover:text-primary-light transition-all font-outfit uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary">
                 {isFR ? 'Connectez-vous à votre espace' : 'Log in to your space'}
               </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
