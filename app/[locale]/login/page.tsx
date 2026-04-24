"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, Globe, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/lib/actions/auth';

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
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50 font-inter">
      <div className="max-w-[460px] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href={`/${locale}`} className="inline-block mb-8 group transition-transform hover:scale-105">
            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100">
               <img src="/images/logo.png" alt="Logo" className="h-12 mx-auto" />
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 font-outfit">
            {isFR ? 'Espace Expertise' : 'Expert Space'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {isFR ? 'Accédez à votre compte pour gérer vos missions.' : 'Log in to manage your missions and profile.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-blue-900/5 p-10 md:p-12"
        >
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-3">
              <ShieldCheck size={18} />
              {error}
            </motion.div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                <input 
                  required 
                  type="email" 
                  name="email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 outline-none focus:bg-white focus:border-[#0a5694] focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" 
                  placeholder="expert@exemple.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{isFR ? 'Mot de passe' : 'Password'}</label>
                <Link href="#" className="text-[10px] font-bold text-[#0a5694] hover:text-blue-800 transition-colors uppercase tracking-widest">{isFR ? 'Oublié ?' : 'Forgot?'}</Link>
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 outline-none focus:bg-white focus:border-[#0a5694] focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0a5694] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:bg-[#062040] hover:-translate-y-1 transition-all disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  {isFR ? 'Se connecter' : 'Log In'}
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-100">
            <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">
               {isFR ? 'Nouveau sur la plateforme ?' : 'New to the platform?'}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <Link href={`/${locale}/register/resident`} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-600 hover:bg-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserPlus size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{isFR ? 'Expert Résident' : 'Resident Expert'}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link href={`/${locale}/register/diaspora`} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-600 hover:bg-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{isFR ? 'Expert Diaspora' : 'Diaspora Expert'}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-[#0a5694]" />
          <span>Accès sécurisé certifié par l&apos;État</span>
        </div>
      </div>
    </div>
  );
}

