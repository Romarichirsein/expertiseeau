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
    <div className="min-h-screen bg-background pt-44 pb-32 font-inter transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/hero-pattern.svg')] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.25em] border border-primary/20 backdrop-blur-md shadow-sm">
            <Award size={18} />
            {isFR ? 'Expert Résident' : 'Resident Expert'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight font-outfit leading-tight">
            {isFR ? "Formulaire d'" : 'Membership '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 italic">{isFR ? 'Adhésion' : 'Form'}</span>
          </h1>
          <p className="text-xl text-muted-foreground font-normal max-w-2xl mx-auto">
            {isFR ? 'Rejoignez le réseau institutionnel certifié des professionnels de l\'eau au Cameroun.' : 'Join the certified institutional network of water professionals in Cameroon.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Card className="rounded-[3rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl overflow-hidden">
            <div className="bg-white/40 dark:bg-black/20 px-10 py-8 border-b border-white/20 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex flex-col gap-1.5 text-center md:text-left">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                    {isFR ? `Étape ${step} sur 3` : `Step ${step} of 3`}
                  </span>
                  <span className="text-xl font-black text-foreground font-outfit uppercase tracking-tight">
                     {step === 1 && (isFR ? 'Informations Personnelles' : 'Personal Info')}
                     {step === 2 && (isFR ? 'Parcours & Expertise' : 'Career & Expertise')}
                     {step === 3 && (isFR ? 'Sécurité du Compte' : 'Account Security')}
                  </span>
               </div>
               <div className="flex gap-2.5">
                  {[1, 2, 3].map(s => (
                     <div key={s} className={`h-2 rounded-full transition-all duration-700 ease-out ${s === step ? 'w-16 bg-primary shadow-lg shadow-primary/20' : s < step ? 'w-4 bg-primary/40' : 'w-4 bg-slate-200 dark:bg-white/10'}`} />
                  ))}
               </div>
            </div>

            <CardContent className="p-10 md:p-14">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="mb-10 p-5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] border border-red-500/20 flex items-center gap-4"
                >
                  <ShieldCheck size={20} strokeWidth={2.5} />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Prénom' : 'First Name'}</Label>
                          <Input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="Ex: Jean" />
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Nom de Famille' : 'Last Name'}</Label>
                          <Input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="Ex: Dupont" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Genre' : 'Gender'}</Label>
                          <div className="relative group">
                             <select name="gender" value={formData.gender} onChange={handleChange} className="w-full flex h-14 w-full rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/20 px-6 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none cursor-pointer shadow-inner font-bold text-foreground">
                                <option value="M" className="text-secondary">{isFR ? 'Masculin' : 'Male'}</option>
                                <option value="F" className="text-secondary">{isFR ? 'Féminin' : 'Female'}</option>
                             </select>
                             <ChevronLeft size={20} strokeWidth={2.5} className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Tranche d\'âge' : 'Age range'}</Label>
                          <div className="relative group">
                             <select name="age_range" value={formData.age_range} onChange={handleChange} className="w-full flex h-14 w-full rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/20 px-6 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none cursor-pointer shadow-inner font-bold text-foreground">
                                <option value="20-30" className="text-secondary">20-30 ans</option>
                                <option value="30-40" className="text-secondary">30-40 ans</option>
                                <option value="40-50" className="text-secondary">40-50 ans</option>
                                <option value="50+" className="text-secondary">50 ans et plus</option>
                             </select>
                             <ChevronLeft size={20} strokeWidth={2.5} className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>

                      <Button type="button" variant="premium" onClick={() => setStep(2)} className="w-full h-16 text-lg rounded-2xl mt-4">
                        {isFR ? 'Étape Suivante' : 'Next Step'}
                        <ArrowRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="space-y-3">
                        <Label className="ml-2">{isFR ? 'Profession / Titre Institutionnel' : 'Profession / Institutional Title'}</Label>
                        <div className="relative group">
                          <Briefcase size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="Ex: Ingénieur des Eaux et Forêts" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="ml-2">{isFR ? 'Ville de Résidence' : 'City of Residence'}</Label>
                        <div className="relative group">
                          <MapPin size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required name="city" value={formData.city} onChange={handleChange} type="text" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="Ex: Douala" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Label className="ml-2">{isFR ? 'Expertise Stratégique' : 'Strategic Expertise'}</Label>
                        <div className="flex flex-wrap gap-3">
                          {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Génie Rural', 'Irrigation', 'Environnement'].map(exp => (
                            <button 
                              key={exp}
                              type="button"
                              onClick={() => handleExpertiseChange(exp)}
                              className={`px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 font-outfit border ${
                                formData.expertise.includes(exp) 
                                  ? 'bg-primary text-white shadow-xl shadow-primary/20 border-transparent scale-105' 
                                  : 'bg-white/50 dark:bg-white/5 text-muted-foreground border-white/20 dark:border-white/5 hover:border-primary/30 hover:bg-white dark:hover:bg-white/10'
                              }`}
                            >
                              {exp}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-16 rounded-2xl border-white/20 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold uppercase tracking-widest text-[12px]">
                          <ChevronLeft size={20} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="button" variant="premium" onClick={() => setStep(3)} className="flex-[2] h-16 rounded-2xl font-bold uppercase tracking-widest text-[12px]">
                          {isFR ? 'Suivant' : 'Next'}
                          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="ml-2">Email Institutional</Label>
                          <div className="relative group">
                            <Mail size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="email" value={formData.email} onChange={handleChange} type="email" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="expert@exemple.com" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Téléphone' : 'Phone'}</Label>
                          <div className="relative group">
                            <Phone size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="+237 ..." />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Mot de passe' : 'Password'}</Label>
                          <div className="relative group">
                            <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="password" value={formData.password} onChange={handleChange} type="password" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="••••••••" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Confirmation' : 'Confirm'}</Label>
                          <div className="relative group">
                            <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                            <Input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner" placeholder="••••••••" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-16 rounded-2xl border-white/20 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold uppercase tracking-widest text-[12px]">
                          <ChevronLeft size={20} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="submit" variant="premium" disabled={loading} className="flex-[2] h-16 rounded-2xl font-bold uppercase tracking-widest text-[12px] group">
                          {loading ? (isFR ? 'Finalisation...' : 'Completing...') : (isFR ? 'Finaliser l\'Adhésion' : 'Finish Membership')}
                          {!loading && <UserPlus size={20} className="ml-2 group-hover:rotate-12 transition-transform" />}
                          {loading && <Loader2 size={20} className="ml-2 animate-spin" />}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>

            <div className="bg-white/40 dark:bg-black/20 p-10 text-center border-t border-white/20 dark:border-white/5">
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-4">
                 {isFR ? 'Déjà un compte institutionnel ?' : 'Already have an institutional account?'}
               </p>
               <Link href={`/${locale}/login`} className="text-primary font-black text-base hover:text-teal-600 transition-colors font-outfit uppercase tracking-widest">
                 {isFR ? 'Connectez-vous à votre espace' : 'Log in to your space'}
               </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
