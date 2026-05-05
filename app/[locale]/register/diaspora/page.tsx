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
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[11px] font-bold uppercase tracking-[0.25em] border border-teal-500/20 backdrop-blur-md shadow-sm">
            <Globe size={18} />
            {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight font-outfit leading-tight">
            {isFR ? "Rayonnez à l'" : 'Global '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 italic">{isFR ? 'International' : 'Impact'}</span>
          </h1>
          <p className="text-xl text-muted-foreground font-normal max-w-2xl mx-auto">
            {isFR ? 'Contribuez au développement stratégique du Cameroun depuis n\'importe où dans le monde.' : 'Contribute to Cameroon\'s strategic development from anywhere in the world.'}
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
                     {step === 1 && (isFR ? 'Localisation & Identité' : 'Location & Identity')}
                     {step === 2 && (isFR ? 'Expertise & Contact' : 'Expertise & Contact')}
                     {step === 3 && (isFR ? 'Engagement & Sécurité' : 'Commitment & Security')}
                  </span>
               </div>
               <div className="flex gap-2.5">
                  {[1, 2, 3].map(s => (
                     <div key={s} className={`h-2 rounded-full transition-all duration-700 ease-out ${s === step ? 'w-16 bg-primary shadow-lg shadow-primary/20' : s < step ? 'w-4 bg-teal-500/40' : 'w-4 bg-slate-200 dark:bg-white/10'}`} />
                  ))}
               </div>
            </div>

            <CardContent className="p-10 md:p-14">
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
                          <Input required type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="Ex: Jean" />
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2">{isFR ? 'Nom' : 'Last Name'}</Label>
                          <Input required type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="Ex: Dupont" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="ml-2">{isFR ? 'Pays de Résidence' : 'Country of Residence'}</Label>
                        <div className="relative group">
                          <Globe size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="text" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="Ex: France, USA, Canada..." />
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
                        <Label className="ml-2">Email Professionnel Institutional</Label>
                        <div className="relative group">
                          <Mail size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="email" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="expert@exemple.com" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="ml-2">{isFR ? 'Spécialité / Domaine d\'Expertise' : 'Specialization / Field'}</Label>
                        <div className="relative group">
                          <Award size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="text" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="Ex: Gestion des ressources hydriques" />
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
                      <Card className="bg-primary/5 dark:bg-primary/10 rounded-[2rem] p-8 md:p-10 border border-primary/10 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                             <ShieldCheck size={24} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-lg font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Charte d\'Engagement Stratégique' : 'Strategic Commitment Charter'}</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed font-normal">
                          {isFR 
                            ? 'En rejoignant ce réseau d\'élite, vous vous engagez à mettre votre expertise internationale au profit du développement stratégique et technologique du Cameroun.' 
                            : 'By joining this elite network, you commit to putting your international expertise at the service of Cameroon\'s strategic and technological development.'}
                        </p>
                      </Card>

                      <div className="space-y-3">
                        <Label className="ml-2">{isFR ? 'Mot de passe sécurisé' : 'Secure Password'}</Label>
                        <div className="relative group">
                          <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                          <Input required type="password" className="pl-14 h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="••••••••" />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-16 rounded-2xl border-white/20 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold uppercase tracking-widest text-[12px]">
                          <ChevronLeft size={20} className="mr-2" />
                          {isFR ? 'Retour' : 'Back'}
                        </Button>
                        <Button type="submit" variant="premium" disabled={loading} className="flex-[2] h-16 rounded-2xl font-bold uppercase tracking-widest text-[12px] group">
                          {loading ? (isFR ? 'Traitement...' : 'Processing...') : (isFR ? 'Valider l\'Adhésion' : 'Validate Membership')}
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
                 {isFR ? 'Déjà membre du réseau international ?' : 'Already an international network member?'}
               </p>
               <Link href={`/${locale}/login`} className="text-primary font-black text-base hover:text-teal-600 transition-colors font-outfit uppercase tracking-widest">
                 {isFR ? 'Accéder à mon espace expert' : 'Access my expert space'}
               </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
