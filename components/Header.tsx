"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, LogIn, Mail, Menu, Phone, UserPlus, X, ChevronDown } from 'lucide-react';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'À propos', labelEn: 'About', href: '/about' },
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
  const basePath = pathname.replace(/^\/(fr|en)/, '') || '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-500 ${
      scrolled ? 'translate-y-0' : 'translate-y-0'
    }`}>
      
      {/* ================= TOP BAR (PREMIUM MINIMAL) ================= */}
      <div className="bg-[#062040] text-white/80 py-2 text-[11px] font-bold tracking-[0.1em] uppercase border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
              <Phone size={13} className="text-blue-400" />
              <span>+237 222 23 45 67</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
              <Mail size={13} className="text-blue-400" />
              <span>contact@expertiseaucameroun.org</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden lg:block text-white/40 font-black">Portal v2.0</span>
            <div className="h-3 w-px bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-4">
              <Globe size={13} className="text-blue-400" />
              <div className="flex items-center gap-2">
                <Link href={`/fr${basePath}`} className={`transition-all ${locale === 'fr' ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`}>FR</Link>
                <span className="text-white/10">|</span>
                <Link href={`/en${basePath}`} className={`transition-all ${locale === 'en' ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`}>EN</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV BAR (GLASSMORPHISM) ================= */}
      <div className={`transition-all duration-500 ${
        scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-3' 
        : 'bg-white py-5'
      }`}>
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden p-2">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[20px] font-black text-[#062040] leading-none tracking-tight uppercase font-outfit">
                Expertise <span className="text-blue-600">au</span> Cameroun
              </div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1.5 opacity-80">
                Water & Sanitation Network
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION (Modern centered) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={`relative px-5 py-2 text-[14px] font-extrabold tracking-tight transition-all duration-300 rounded-xl ${
                  isActive(item.href) 
                  ? 'text-blue-600 bg-blue-50/50' 
                  : 'text-slate-500 hover:text-[#062040] hover:bg-slate-50'
                }`}
              >
                {isFR ? item.label : item.labelEn}
                {isActive(item.href) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-1.5 left-5 right-5 h-0.5 bg-blue-600 rounded-full" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTIONS (Premium Buttons) */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={withLocale('/login')}
                className="btn-premium btn-secondary !px-6 !py-2.5 !text-[13px]"
              >
                <LogIn size={15} strokeWidth={2.5} className="opacity-70" />
                <span>{isFR ? 'Connexion' : 'Login'}</span>
              </Link>
              <Link
                href={withLocale('/register')}
                className="btn-premium btn-primary !px-7 !py-2.5 !text-[13px] shadow-blue-900/20"
              >
                <UserPlus size={15} strokeWidth={2.5} />
                <span>{isFR ? "S'inscrire" : 'Register'}</span>
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="xl:hidden w-12 h-12 flex items-center justify-center text-[#062040] bg-slate-50 rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 z-[100]"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={withLocale(item.href)}
                  className={`px-6 py-4 rounded-2xl text-[15px] font-bold transition-all ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {isFR ? item.label : item.labelEn}
                </Link>
              ))}
              <div className="mt-4 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <Link
                  href={withLocale('/login')}
                  className="btn-premium btn-secondary !w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {isFR ? 'Connexion' : 'Login'}
                </Link>
                <Link
                  href={withLocale('/register')}
                  className="btn-premium btn-primary !w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {isFR ? "S'inscrire" : 'Register'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
