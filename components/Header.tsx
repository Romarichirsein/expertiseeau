"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, LogIn, Mail, Menu, Phone, UserPlus, X } from 'lucide-react';

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
  const isFR = locale === 'fr';
  const basePath = pathname.replace(/^\/(fr|en)/, '') || '/';

  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] w-full font-inter">
      {/* ================= TOP BAR ================= */}
      <div className="bg-[#003366] text-white py-2.5 text-[12px] font-medium border-b border-white/5">
        <div className="max-w-[1550px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-white/80" />
              <span className="font-semibold">+237 222 23 45 67</span>
            </div>
            <span className="text-white/20 font-light">|</span>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-white/80" />
              <span className="font-semibold">contact@expertiseaucameroun.org</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-white/70 uppercase tracking-widest text-[10px] font-bold hidden sm:block">Institutional Portal</span>
            <span className="text-white/20 font-light hidden sm:block">|</span>
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-white/80" />
              <div className="flex items-center gap-2 font-bold">
                <Link href={`/fr${basePath}`} className={`transition-colors ${locale === 'fr' ? 'text-white' : 'text-white/40 hover:text-white'}`}>FR</Link>
                <span className="text-white/20 font-light">|</span>
                <Link href={`/en${basePath}`} className={`transition-colors ${locale === 'en' ? 'text-white' : 'text-white/40 hover:text-white'}`}>EN</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV BAR ================= */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1550px] mx-auto px-8 h-24 flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href={`/${locale}`} className="flex items-center gap-5 shrink-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 overflow-hidden">
              <img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <div className="text-[19px] font-black text-[#003366] leading-none tracking-tight uppercase font-outfit">
                Expertise Au Cameroun
              </div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1.5">
                Water & Sanitation Network
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={`relative px-4 py-2 text-[15px] font-bold tracking-tight transition-colors ${
                  isActive(item.href) ? 'text-[#003366]' : 'text-gray-500 hover:text-[#003366]'
                }`}
              >
                {isFR ? item.label : item.labelEn}
                {isActive(item.href) && (
                  <motion.div 
                    layoutId="header-active"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#003366]" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTION BUTTONS & SEPARATOR */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:block w-px h-10 bg-gray-200" />
            
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={withLocale('/login')}
                className="flex items-center gap-2.5 px-6 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-[#003366] bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <LogIn size={18} className="text-[#003366]" />
                <span>{isFR ? 'Se connecter' : 'Log in'}</span>
              </Link>
              <Link
                href={withLocale('/register')}
                className="flex items-center gap-2.5 px-7 py-3 bg-[#1e40af] text-white rounded-xl text-[14px] font-extrabold hover:bg-[#1a368e] shadow-lg shadow-blue-900/20 transition-all active:scale-95"
              >
                <UserPlus size={18} />
                <span>{isFR ? "S'inscrire" : 'Register'}</span>
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="xl:hidden p-3 text-[#003366] bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[140px] bg-black/40 backdrop-blur-sm z-[90]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[140px] bottom-0 w-[85%] max-w-[340px] bg-white z-[100] shadow-2xl p-8 flex flex-col"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className={`px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                      isActive(item.href) ? 'bg-blue-50 text-[#003366]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isFR ? item.label : item.labelEn}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8 border-t border-gray-100">
                <Link
                  href={withLocale('/login')}
                  className="flex items-center justify-center gap-3 w-full py-4 border border-gray-200 rounded-2xl font-bold text-[#003366]"
                >
                  <LogIn size={20} />
                  {isFR ? 'Se connecter' : 'Log in'}
                </Link>
                <Link
                  href={withLocale('/register')}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#1e40af] text-white rounded-2xl font-black shadow-xl shadow-blue-900/10"
                >
                  <UserPlus size={20} />
                  {isFR ? "S'inscrire" : 'Register'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
