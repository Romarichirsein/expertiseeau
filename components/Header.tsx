"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Globe, User, LogIn, UserPlus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'À Propos', labelEn: 'About', href: '/about' },
  { label: 'Membres', labelEn: 'Members', href: '/members' },
  { label: 'Institutions', labelEn: 'Institutions', href: '/institutions' },
  { label: 'Blog', labelEn: 'Blog', href: '/blog' },
  { label: 'Galerie', labelEn: 'Gallery', href: '/gallery' },
  { label: 'Contact', labelEn: 'Contact', href: '/contact' },
];

export default function Header({ locale = 'fr' }: { locale?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isFR = locale === 'fr';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300">
      {/* === TOP BAR (Institutional) === */}
      <div className={`bg-[#062040] text-white/80 py-2 border-b border-white/5 transition-all duration-500 ${scrolled ? '-translate-y-full opacity-0 h-0 overflow-hidden' : 'translate-y-0 opacity-100'}`}>
        <div className="container flex justify-between items-center text-[11px] font-medium tracking-wide">
          <div className="flex gap-8 items-center">
            <a href="tel:+237222234567" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={13} className="text-[#3b82f6]" /> +237 222 23 45 67
            </a>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <a href="mailto:contact@expertiseaucameroun.org" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={13} className="text-[#3b82f6]" /> contact@expertiseaucameroun.org
            </a>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-4 items-center uppercase tracking-widest font-bold">
              <Link href={`/fr${pathname.replace(/^\/(fr|en)/, '') || '/'}`} className={`${locale === 'fr' ? 'text-[#3b82f6]' : 'hover:text-white'} transition-colors`}>FR</Link>
              <Link href={`/en${pathname.replace(/^\/(fr|en)/, '') || '/'}`} className={`${locale === 'en' ? 'text-[#3b82f6]' : 'hover:text-white'} transition-colors`}>EN</Link>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN NAVBAR === */}
      <div className={`w-full transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="container">
          <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100' 
              : 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm'
          }`}>
            
            {/* LOGO AREA */}
            <div className="flex items-center gap-4">
              <Link href={`/${locale}`} className="relative group shrink-0 flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className={`transition-all duration-500 object-contain ${scrolled ? 'h-9' : 'h-11'}`}
                />
                <div className={`hidden xl:block transition-all duration-500 ${scrolled ? 'opacity-0 scale-95 w-0' : 'opacity-100'}`}>
                  <div className="text-[14px] font-extrabold text-[#062040] leading-none tracking-tighter uppercase">
                    Expertise <span className="text-[#0a5694]">au Cameroun</span>
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Réseau National Eau & Assainissement
                  </div>
                </div>
              </Link>
            </div>

            {/* DESKTOP NAVIGATION (Fixed "coller" issue with gap-8) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`relative py-2 text-[13px] font-semibold tracking-tight transition-all duration-300 group ${
                    isActive(item.href) 
                      ? 'text-[#0a5694]' 
                      : 'text-slate-600 hover:text-[#0a5694]'
                  }`}
                >
                  {isFR ? item.label : item.labelEn}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#0a5694] transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/login`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-[#0a5694] transition-all"
              >
                <LogIn size={18} />
                <span>{isFR ? 'Connexion' : 'Login'}</span>
              </Link>
              
              <Link
                href={`/${locale}/register`}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0a5694] text-white rounded-xl text-[13px] font-bold shadow-lg shadow-blue-900/20 hover:bg-[#062040] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <UserPlus size={18} />
                <span>{isFR ? "S'inscrire" : 'Register'}</span>
              </Link>

              {/* MOBILE TOGGLE */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Redesigned) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[-1]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="absolute top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl p-8 z-[101] flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <img src="/images/logo.png" alt="Logo" className="h-10" />
                <button onClick={() => setMobileOpen(false)} className="p-2 bg-slate-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mb-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl text-base font-bold transition-all ${
                      isActive(item.href) 
                        ? 'bg-blue-50 text-[#0a5694]' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isFR ? item.label : item.labelEn}
                    <ChevronDown size={16} className="-rotate-90 opacity-30" />
                  </Link>
                ))}
              </nav>
              
              <div className="flex flex-col gap-3 pt-8 border-t border-slate-100">
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 p-4 bg-slate-100 rounded-xl text-sm font-bold text-slate-700"
                >
                  <LogIn size={20} />
                  {isFR ? 'Se connecter' : 'Sign In'}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 p-4 bg-[#0a5694] rounded-xl text-sm font-bold text-white shadow-xl shadow-blue-900/20"
                >
                  <UserPlus size={20} />
                  {isFR ? "Rejoindre le réseau" : 'Join Network'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

