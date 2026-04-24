"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, LogIn, Mail, Menu, Phone, UserPlus, X } from 'lucide-react';

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

  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] w-full bg-white shadow-md font-inter">
      {/* Top Bar */}
      <div className="bg-[#003366] text-white py-2 text-[12px] font-medium tracking-wide">
        <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+237222234567" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone size={14} className="text-blue-300" />
              <span>+237 222 23 45 67</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="mailto:contact@expertiseaucameroun.org" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail size={14} className="text-blue-300" />
              <span>contact@expertiseaucameroun.org</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/70 hidden sm:block">Institutional Portal</span>
            <span className="text-white/30 hidden sm:block">|</span>
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-blue-300" />
              <div className="flex items-center gap-2">
                <Link href={`/fr${basePath}`} className={`${locale === 'fr' ? 'font-bold text-white' : 'text-white/60 hover:text-white'}`}>FR</Link>
                <span className="text-white/30">|</span>
                <Link href={`/en${basePath}`} className={`${locale === 'en' ? 'font-bold text-white' : 'text-white/60 hover:text-white'}`}>EN</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Text */}
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-50 group-hover:scale-105 transition-transform">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="text-[17px] font-black text-[#003366] leading-tight tracking-tight uppercase font-outfit">
                Expertise Au Cameroun
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">
                Water & Sanitation Network
              </div>
            </div>
          </Link>

          {/* Centered Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={`relative px-4 py-2 text-[14px] font-bold tracking-tight transition-all ${
                  isActive(item.href) ? 'text-[#003366]' : 'text-gray-600 hover:text-[#003366]'
                }`}
              >
                {isFR ? item.label : item.labelEn}
                {isActive(item.href) && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#003366]" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-10 w-px bg-gray-100 mx-2 hidden lg:block" />
            <Link
              href={withLocale('/login')}
              className="flex items-center gap-2 px-6 py-2.5 border border-blue-100 rounded-xl text-[14px] font-bold text-[#003366] hover:bg-blue-50 transition-all"
            >
              <LogIn size={18} />
              <span>{isFR ? 'Se connecter' : 'Log in'}</span>
            </Link>
            <Link
              href={withLocale('/register')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#003366] text-white rounded-xl text-[14px] font-bold hover:bg-[#002244] shadow-lg shadow-blue-900/10 transition-all"
            >
              <UserPlus size={18} />
              <span>{isFR ? "S'inscrire" : 'Register'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#003366] hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[112px] bg-black/50 backdrop-blur-sm z-[90]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[112px] bottom-0 w-[300px] bg-white z-[100] shadow-2xl p-6 flex flex-col"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className={`px-4 py-4 rounded-xl text-base font-bold transition-all ${
                      isActive(item.href) ? 'bg-blue-50 text-[#003366]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isFR ? item.label : item.labelEn}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-100">
                <Link
                  href={withLocale('/login')}
                  className="flex items-center justify-center gap-2 w-full py-4 border border-blue-100 rounded-xl font-bold text-[#003366]"
                >
                  <LogIn size={18} />
                  {isFR ? 'Se connecter' : 'Log in'}
                </Link>
                <Link
                  href={withLocale('/register')}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#003366] text-white rounded-xl font-bold"
                >
                  <UserPlus size={18} />
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
