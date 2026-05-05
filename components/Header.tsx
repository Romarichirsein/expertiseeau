"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Menu, X, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { buttonVariants } from '@/components/ui/button';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'À propos', labelEn: 'About', href: '/about' },
  { label: 'Membres', labelEn: 'Members', href: '/members' },
  { label: 'Institutions', labelEn: 'Institutions', href: '/institutions' },
  { label: 'Blog', labelEn: 'Blog', href: '/blog' },
  { label: 'Contact', labelEn: 'Contact', href: '/contact' },
];

export default function Header({ locale = 'fr' }: { locale?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const isFR = locale === 'fr';
  const basePath = pathname.replace(/^\/(fr|en)/, '') || '/';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled 
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] border-b border-slate-200/50 dark:border-white/5' 
      : 'bg-white dark:bg-secondary border-b border-transparent'
    }`}>
      
      {/* TOP BAR - Hidden on mobile */}
      <div className="hidden md:block bg-gradient-to-r from-secondary to-slate-900 dark:from-slate-950 dark:to-slate-900 text-white/70 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase border-b border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="container lg:px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors">+237 222 23 45 67</span>
            <span className="hidden lg:block hover:text-white transition-colors">contact@expertiseaucameroun.org</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link href={`/fr${basePath}`} className={`hover:text-white transition-colors ${locale === 'fr' ? 'text-primary font-bold' : ''}`}>FR</Link>
              <span className="opacity-20">|</span>
              <Link href={`/en${basePath}`} className={`hover:text-white transition-colors ${locale === 'en' ? 'text-primary font-bold' : ''}`}>EN</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[80px] lg:min-h-[90px] flex items-center w-full overflow-hidden">
        <div className="container px-8 lg:px-12 flex items-center justify-between gap-4 w-full">
          
          {/* LOGO */}
          <Link href={`/${locale}`} className="shrink-0">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-sm border border-slate-100 dark:border-white/5 transition-transform hover:scale-105">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-7 overflow-hidden px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={`relative py-2 text-[12px] font-medium uppercase tracking-widest whitespace-nowrap transition-all ${
                  isActive(item.href) 
                  ? 'text-primary' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-secondary dark:hover:text-white'
                }`}
              >
                {isFR ? item.label : item.labelEn}
                {isActive(item.href) && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden lg:flex w-12 h-12 items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors shrink-0"
            >
              {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
            </button>

            <div className="hidden xl:flex items-center gap-4">
              <Link
                href={withLocale('/login')}
                className={buttonVariants({ variant: 'outline', className: "min-w-[160px] min-h-[48px] uppercase tracking-wider text-primary border-2 border-primary hover:bg-primary/5 rounded-lg leading-none shrink-0" })}
              >
                {isFR ? 'Connexion' : 'Login'}
              </Link>
              <Link
                href={withLocale('/register')}
                className={buttonVariants({ variant: 'premium', className: "min-w-[160px] min-h-[48px] shadow-primary/20 rounded-lg leading-none shrink-0" })}
              >
                {isFR ? "S'inscrire" : 'Register'}
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex items-center gap-3 xl:hidden shrink-0">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 flex lg:hidden items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors shrink-0"
              >
                {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center text-secondary dark:text-white bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shrink-0"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white dark:bg-secondary shadow-2xl z-[120] flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg p-1 border dark:border-white/10">
                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-outfit font-black text-sm uppercase tracking-tight dark:text-white">Expertise</span>
                </div>
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-white/5 rounded-xl"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className={`block px-6 py-4 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${
                      isActive(item.href) 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isFR ? item.label : item.labelEn}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isFR ? 'Mode Sombre' : 'Dark Mode'}</span>
                   <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-white/5"
                   >
                      {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
                   </button>
                </div>
                
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Langue</span>
                   <div className="flex items-center gap-4 text-[11px] font-black">
                      <Link href={`/fr${basePath}`} className={locale === 'fr' ? 'text-primary' : 'text-slate-400'}>FR</Link>
                      <span className="opacity-10">/</span>
                      <Link href={`/en${basePath}`} className={locale === 'en' ? 'text-primary' : 'text-slate-400'}>EN</Link>
                   </div>
                </div>

                <Link
                  href={withLocale('/login')}
                  className={buttonVariants({ variant: 'outline', className: "w-full py-6 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 dark:bg-white/5 rounded-xl border dark:border-white/10" })}
                  onClick={() => setMobileOpen(false)}
                >
                  {isFR ? 'Connexion' : 'Login'}
                </Link>
                <Link
                  href={withLocale('/register')}
                  className={buttonVariants({ variant: 'premium', className: "w-full py-6 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20" })}
                  onClick={() => setMobileOpen(false)}
                >
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
