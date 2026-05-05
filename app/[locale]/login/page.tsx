"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, LogIn, UserPlus, Eye, EyeOff, Globe, 
  ShieldCheck, ChevronRight, Loader2, Sparkles, Zap, 
  ArrowRight, Fingerprint, Building2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await signInWithEmail(formData);
    
    if (result.success) {
      router.push(`/${locale}/dashboard`);
    } else {
      setError(result.error || (isFR ? 'Échec de la connexion' : 'Login failed'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background font-inter transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-[520px] w-full relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <Link href={`/${locale}`} className="inline-block mb-12 group">
            <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white/20 dark:border-white/10 group-hover:scale-105 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <img src="/images/logo.png" alt="Logo" className="h-14 md:h-16 mx-auto dark:invert dark:brightness-200 relative z-10" />
            </div>
          </Link>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.3em]">
              <Fingerprint size={18} />
              {isFR ? 'Authentification Sécurisée' : 'Secure Authentication'}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight font-outfit uppercase leading-[0.9]">
              {isFR ? 'Espace ' : 'Expert '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 italic">{isFR ? 'Expertise' : 'Portal'}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
              {isFR ? 'Accédez à votre compte pour gérer vos missions et certifications.' : 'Log in to manage your missions, certifications, and expert profile.'}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Card className="rounded-[4rem] border-white/20 dark:border-white/5 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-10 md:p-14 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-all duration-1000" />
            
            <CardContent className="p-0 space-y-10 relative z-10">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-red-500/20 flex items-center gap-4 shadow-inner"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                      <ShieldCheck size={20} strokeWidth={3} />
                    </div>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Label htmlFor="email" className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">{isFR ? 'Email Institutionnel' : 'Institutional Email'}</Label>
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-focus-within/input:bg-primary group-focus-within/input:text-white transition-all duration-500">
                      <Mail size={20} strokeWidth={2.5} />
                    </div>
                    <Input 
                      id="email"
                      required 
                      type="email" 
                      name="email"
                      className="pl-20 h-16 rounded-[1.5rem] bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 text-base font-bold shadow-inner" 
                      placeholder="expert@exemple.cm" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center ml-2">
                    <Label htmlFor="password" className="uppercase tracking-widest text-[11px] font-black text-muted-foreground">{isFR ? 'Mot de passe' : 'Password'}</Label>
                    <Link href="#" className="text-[10px] font-black text-primary hover:text-teal-500 transition-colors uppercase tracking-[0.2em]">{isFR ? 'Oublié ?' : 'Forgot?'}</Link>
                  </div>
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-focus-within/input:bg-primary group-focus-within/input:text-white transition-all duration-500">
                      <Lock size={20} strokeWidth={2.5} />
                    </div>
                    <Input 
                      id="password"
                      required 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      className="pl-20 pr-16 h-16 rounded-[1.5rem] bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 text-base font-bold shadow-inner" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-500"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="premium" disabled={loading} className="w-full h-20 text-lg font-black mt-10 rounded-[2rem] group shadow-2xl shadow-primary/30 uppercase tracking-widest gap-4">
                  {loading ? <Loader2 className="animate-spin w-8 h-8" /> : (
                    <>
                      {isFR ? 'Accéder à l\'Espace' : 'Access Portal'}
                      <LogIn size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="pt-14 border-t border-white/20 dark:border-white/5">
                <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-10">
                   {isFR ? 'Nouveau sur la plateforme ?' : 'New to the platform?'}
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <Link href={`/${locale}/register`} className="flex items-center justify-between p-8 bg-primary/5 hover:bg-primary/10 rounded-[2.5rem] border border-primary/10 hover:border-primary/30 transition-all duration-700 group shadow-inner">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-xl shadow-primary/20">
                        <UserPlus size={32} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{isFR ? 'Compte National' : 'National Account'}</div>
                        <div className="text-xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Devenir Expert' : 'Become Expert'}</div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-[1.2rem] bg-white dark:bg-slate-800 border border-white/20 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all duration-700 shadow-lg group-hover:translate-x-1">
                      <ChevronRight size={24} strokeWidth={3} />
                    </div>
                  </Link>

                  <Link href={`/${locale}/register`} className="flex items-center justify-between p-8 bg-teal-500/5 hover:bg-teal-500/10 rounded-[2.5rem] border border-teal-500/10 hover:border-teal-500/30 transition-all duration-700 group shadow-inner">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-teal-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-xl shadow-teal-500/20">
                        <Building2 size={32} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em]">{isFR ? 'Compte Institutionnel' : 'Institutional Account'}</div>
                        <div className="text-xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Enregistrer Institution' : 'Register Institution'}</div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-[1.2rem] bg-white dark:bg-slate-800 border border-white/20 flex items-center justify-center text-muted-foreground group-hover:text-teal-500 transition-all duration-700 shadow-lg group-hover:translate-x-1">
                      <ChevronRight size={24} strokeWidth={3} />
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
          <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 py-3 px-6 rounded-full border border-white/20 backdrop-blur-md">
            <ShieldCheck size={18} className="text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" strokeWidth={3} />
            <span>{isFR ? "Accès sécurisé AES-256 certifié" : "Secure AES-256 Certified Access"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
