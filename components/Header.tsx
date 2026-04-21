"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Globe, User, LogIn, UserPlus } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-[100] w-full">
      {/* === TOP BAR === */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0a5694] text-white py-3 overflow-hidden hidden lg:block"
          >
            <div className="container flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="flex gap-8">
                <a href="tel:+237222234567" className="flex items-center gap-2 hover:text-blue-200 transition-all">
                  <Phone size={12} className="text-blue-300" /> +237 222 23 45 67
                </a>
                <a href="mailto:contact@expertiseaucameroun.org" className="flex items-center gap-2 hover:text-blue-200 transition-all">
                  <Mail size={12} className="text-blue-300" /> contact@expertiseaucameroun.org
                </a>
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-3 items-center bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  <Link href={`/fr${pathname.replace(/^\/(fr|en)/, '') || '/'}`} className={`${locale === 'fr' ? 'text-white' : 'text-white/40'} hover:text-white transition-colors`}>FR</Link>
                  <div className="w-px h-2 bg-white/20" />
                  <Link href={`/en${pathname.replace(/^\/(fr|en)/, '') || '/'}`} className={`${locale === 'en' ? 'text-white' : 'text-white/40'} hover:text-white transition-colors`}>EN</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MAIN HEADER === */}
      <div className="container mt-4">
        <div className={`transition-all duration-700 px-8 py-4 rounded-[2.5rem] border flex items-center justify-between ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-2xl shadow-blue-900/10 border-gray-100' 
            : 'bg-white/80 backdrop-blur-xl border-white/50 shadow-xl'
        }`}>
          
          {/* LOGO */}
          <Link href={`/${locale}`} className="relative group shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo"
              className={`transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'}`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative group ${
                  isActive(item.href) 
                    ? 'text-[#0a5694] bg-blue-50/50' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {isFR ? item.label : item.labelEn}
                {isActive(item.href) && (
                  <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0a5694]" />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/login`}
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all"
            >
              <LogIn size={16} className="text-[#0a5694]" />
              <span className="hidden xl:inline">{isFR ? 'Connexion' : 'Login'}</span>
            </Link>
            
            <Link
              href={`/${locale}/register`}
              className="hidden sm:flex items-center gap-2 px-8 py-3 bg-[#0a5694] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
            >
              <UserPlus size={16} />
              <span>{isFR ? "S'inscrire" : 'Register'}</span>
            </Link>

            <button
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden container mt-4"
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[3rem] p-10 shadow-2xl space-y-8 overflow-hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-5 rounded-[2rem] text-xl font-black tracking-tight transition-all ${
                      isActive(item.href) 
                        ? 'bg-[#0a5694]/5 text-[#0a5694]' 
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {isFR ? item.label : item.labelEn}
                    <ChevronDown size={20} className="-rotate-90 opacity-20" />
                  </Link>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-gray-500"
                >
                  <LogIn size={24} />
                  {isFR ? 'Connexion' : 'Login'}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-2 p-6 bg-[#0a5694] rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-white shadow-2xl shadow-blue-900/20"
                >
                  <UserPlus size={24} />
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
