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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
      <div className="max-w-[440px] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href={`/${locale}`} className="inline-block mb-6">
            <img src="/images/logo.png" alt="Logo" className="h-14 mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            {isFR ? 'Accès Membres' : 'Member Access'}
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {isFR ? 'Connectez-vous pour gérer votre profil expert.' : 'Log in to manage your expert profile.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  required 
                  type="email" 
                  name="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3.5 outline-none focus:bg-white focus:border-[#0a5694] transition-all text-gray-900 font-medium" 
                  placeholder="votre@email.com" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isFR ? 'Mot de passe' : 'Password'}</label>
                <Link href="#" className="text-[10px] font-bold text-[#0a5694] hover:underline uppercase tracking-wider">{isFR ? 'Oublié ?' : 'Forgot?'}</Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-3.5 outline-none focus:bg-white focus:border-[#0a5694] transition-all text-gray-900 font-medium" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0a5694] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 hover:bg-[#0a467a] transition-all disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  {isFR ? 'Se connecter' : 'Log In'}
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-100">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
               {isFR ? 'Nouveau sur le réseau ?' : 'New to the network?'}
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <Link href={`/${locale}/register/resident`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#0a5694] hover:bg-white transition-all group">
                <div className="flex items-center gap-3">
                  <UserPlus size={18} className="text-[#0a5694]" />
                  <span className="text-sm font-bold text-gray-700">{isFR ? 'Expert Résident' : 'Resident Expert'}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a5694] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link href={`/${locale}/register/diaspora`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#0a5694] hover:bg-white transition-all group">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[#0a5694]" />
                  <span className="text-sm font-bold text-gray-700">{isFR ? 'Expert Diaspora' : 'Diaspora Expert'}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a5694] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-[#0a5694]" />
          <span>Accès sécurisé par l'État du Cameroun</span>
        </div>
      </div>
    </div>
  );
}
  );
}
