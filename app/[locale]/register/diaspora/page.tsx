"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, Globe, 
  ArrowRight, ShieldCheck, CheckCircle, UserPlus,
  ChevronLeft, Award, Briefcase, Zap, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
              <div className="w-24 h-24 rounded-3xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-10 shadow-inner">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight font-outfit">{isFR ? 'Inscription Réussie !' : 'Registration Successful!'}</h2>
              <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-12">
                {isFR 
                  ? 'Votre demande a été enregistrée avec succès. Notre réseau d\'experts vous contactera après validation institutionnelle de votre profil international de haut niveau.' 
                  : 'Your request has been successfully registered. Our expert network will contact you after institutional validation of your high-level international profile.'}
              </p>
              <Link href={`/${locale}/login`} passHref>
                <Button variant="premium" size="lg" className="h-16 px-12 text-base rounded-2xl">
                  {isFR ? 'Se connecter à l\'Espace' : 'Log in to Space'}
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
              <Globe size={16} strokeWidth={2.5} />
              {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
            </div>
            <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
              {isFR ? "Rayonnez à l'" : 'Global '}
              <span className="text-gradient italic">{isFR ? 'International' : 'Impact'}</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
              {isFR 
                ? 'Contribuez au développement stratégique du Cameroun depuis n\'importe où dans le monde.' 
                : 'Contribute to Cameroon\'s strategic development from anywhere in the world.'}
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
                     {step === 1 && (isFR ? 'Localisation & Identité' : 'Location & Identity')}
                     {step === 2 && (isFR ? 'Expertise & Contact' : 'Expertise & Contact')}
                     {step === 3 && (isFR ? 'Engagement & Sécurité' : 'Commitment & Security')}
                  </span>
               </div>
               <div className="flex gap-4">
                  {[1, 2, 3].map(s => (
                     <div key={s} className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${s === step ? 'w-24 bg-primary shadow-2xl shadow-primary/40' : s < step ? 'w-6 bg-teal-500/40' : 'w-6 bg-white/20'}`} />
                  ))}
               </div>
            </div>

            <CardContent className="p-12 md:p-20">
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
                          <Input required type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Jean" />
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Nom' : 'Last Name'}</Label>
                          <Input required type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Dupont" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Pays de Résidence' : 'Country of Residence'}</Label>
                        <div className="relative group">
                          <Globe size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="text" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: France, USA, Canada..." />
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
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">Email Professionnel Institutional</Label>
                        <div className="relative group">
                          <Mail size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="email" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="expert@exemple.com" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Spécialité / Domaine d\'Expertise' : 'Specialization / Field'}</Label>
                        <div className="relative group">
                          <Award size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="text" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Ex: Gestion des ressources hydriques" />
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
                      <Card className="bg-primary/10 dark:bg-primary/20 rounded-[3rem] p-10 md:p-14 border-none premium-shadow space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-2xl shadow-primary/20">
                             <ShieldCheck size={32} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-2xl font-black text-foreground font-outfit uppercase tracking-tight leading-none">{isFR ? 'Charte d\'Engagement Stratégique' : 'Strategic Commitment Charter'}</h3>
                        </div>
                        <p className="relative z-10 text-muted-foreground text-xl leading-relaxed font-medium text-balance">
                          {isFR 
                            ? 'En rejoignant ce réseau d\'élite, vous vous engagez à mettre votre expertise internationale au profit du développement stratégique et technologique du Cameroun.' 
                            : 'By joining this elite network, you commit to putting your international expertise at the service of Cameroon\'s strategic and technological development.'}
                        </p>
                      </Card>

                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">{isFR ? 'Mot de passe sécurisé' : 'Secure Password'}</Label>
                        <div className="relative group">
                          <Lock size={24} strokeWidth={2.5} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="password" className="pl-20 h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="••••••••" />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-8 pt-8">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-20 rounded-[1.5rem] border-white/10 dark:border-white/5 hover:bg-white/10 font-black uppercase tracking-widest text-xs gap-4 transition-all">
                          <ChevronLeft size={24} strokeWidth={3} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="submit" variant="premium" disabled={loading} className="flex-[2] h-20 rounded-[1.5rem] font-black uppercase tracking-widest text-xs gap-6 group shadow-2xl shadow-primary/30">
                          {loading ? (isFR ? 'Traitement...' : 'Processing...') : (isFR ? 'Valider l\'Adhésion' : 'Validate Membership')}
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
                 {isFR ? 'Déjà membre du réseau international ?' : 'Already an international network member?'}
               </p>
               <Link href={`/${locale}/login`} className="text-primary font-black text-xl hover:text-primary-light transition-all font-outfit uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary">
                 {isFR ? 'Accéder à mon espace expert' : 'Access my expert space'}
               </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
