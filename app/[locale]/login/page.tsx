"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, UserPlus, Eye, EyeOff, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-teal-50 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-[480px] w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href={`/${locale}`} className="inline-block mb-8">
            <img src="/images/logo.png" alt="Logo" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
            {isFR ? 'Accès Membres' : 'Member Access'}
          </h1>
          <p className="text-gray-500 font-medium">
            {isFR ? 'Connectez-vous pour gérer votre profil expert.' : 'Log in to manage your expert profile.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  required 
                  type="email" 
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" 
                  placeholder="votre@email.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{isFR ? 'Mot de passe' : 'Password'}</label>
                <Link href="#" className="text-[10px] font-black text-[#0a5694] hover:underline uppercase tracking-widest">{isFR ? 'Oublié ?' : 'Forgot?'}</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-14 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-bold" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0a5694] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all group">
              {isFR ? 'Se connecter' : 'Log In'}
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]"><span className="bg-white px-4 text-gray-400">{isFR ? 'Nouveau sur le réseau ?' : 'New to the network?'}</span></div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Link href={`/${locale}/register/resident`} className="flex items-center justify-between p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 hover:border-[#0a5694]/30 hover:bg-white transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a5694] flex items-center justify-center">
                    <UserPlus size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-gray-900">{isFR ? 'Expert Résident' : 'Resident Expert'}</div>
                    <div className="text-[10px] font-bold text-gray-400">{isFR ? 'Basé au Cameroun' : 'Based in Cameroon'}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0a5694] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link href={`/${locale}/register/diaspora`} className="flex items-center justify-between p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 hover:border-teal-500/30 hover:bg-white transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-gray-900">{isFR ? 'Expert Diaspora' : 'Diaspora Expert'}</div>
                    <div className="text-[10px] font-bold text-gray-400">{isFR ? 'Basé à l\'étranger' : 'Based abroad'}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-[#0a5694]" />
          <span>Accès sécurisé par l'État du Cameroun</span>
        </div>
      </div>
    </div>
  );
}
