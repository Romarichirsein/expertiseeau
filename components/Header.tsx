"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, LogIn, Mail, Menu, Phone, UserPlus, X } from 'lucide-react';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'A propos', labelEn: 'About', href: '/about' },
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
    <header className="fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-300">
      <div
        className={`border-b border-white/10 bg-[#062040] text-white/80 transition-all duration-500 ${
          scrolled ? '-translate-y-full overflow-hidden opacity-0 h-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6">
          <div className="flex flex-col gap-3 py-3 md:min-h-[54px] md:flex-row md:items-center md:justify-between md:py-1">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold tracking-[0.12em]">
              <a
                href="tel:+237222234567"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[#61b6ff]">
                  <Phone size={13} />
                </span>
                <span>+237 222 23 45 67</span>
              </a>

              <a
                href="mailto:contact@expertiseaucameroun.org"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[#61b6ff]">
                  <Mail size={13} />
                </span>
                <span>contact@expertiseaucameroun.org</span>
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.28em] text-white/35 xl:block">
                {isFR ? 'Portail institutionnel' : 'Institutional portal'}
              </span>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-[10px] font-extrabold uppercase tracking-[0.24em]">
                <span className="pl-2 text-[#61b6ff]">
                  <Globe size={13} />
                </span>
                <Link
                  href={`/fr${basePath}`}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    locale === 'fr' ? 'bg-white text-[#062040]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  FR
                </Link>
                <span className="h-3 w-px bg-white/10" />
                <Link
                  href={`/en${basePath}`}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    locale === 'en' ? 'bg-white text-[#062040]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6">
          <div
            className={`relative flex items-center justify-between gap-4 rounded-[28px] border transition-all duration-500 ${
              scrolled
                ? 'border-slate-200 bg-white/95 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-md'
                : 'border-white/60 bg-white/88 px-5 py-5 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm'
            }`}
          >
            <Link href={`/${locale}`} className="flex min-w-0 items-center gap-4 xl:min-w-[300px]">
              <div className="flex shrink-0 items-center justify-center rounded-[22px] bg-white p-2.5 shadow-lg shadow-blue-950/10 ring-1 ring-slate-100">
                <img
                  src="/images/logo.png"
                  alt="Logo Expertise Au Cameroun"
                  className={`object-contain transition-all duration-500 ${scrolled ? 'h-10 w-10' : 'h-12 w-12'}`}
                />
              </div>

              <div className="min-w-0">
                <div className="text-[13px] font-extrabold uppercase leading-none tracking-tight text-[#062040] sm:text-[14px] xl:text-[16px]">
                  Expertise <span className="text-[#0a5694]">au Cameroun</span>
                </div>
                <div className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400 md:block">
                  Water &amp; Sanitation Network
                </div>
              </div>
            </Link>

            <div className="hidden flex-1 justify-center px-2 lg:flex xl:px-4">
              <nav className="flex items-center gap-2 rounded-full bg-slate-50/90 px-3 py-2 shadow-inner shadow-slate-200/60 ring-1 ring-slate-100 xl:gap-3 xl:px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className={`relative rounded-full px-3 py-2 text-[12px] font-bold tracking-[0.08em] transition-all duration-300 xl:px-4 xl:text-[13px] ${
                      isActive(item.href)
                        ? 'bg-white text-[#0a5694] shadow-sm shadow-slate-200'
                        : 'text-slate-600 hover:bg-white hover:text-[#0a5694]'
                    }`}
                  >
                    {isFR ? item.label : item.labelEn}
                    <span
                      className={`absolute left-1/2 top-[calc(100%+2px)] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#0a5694] transition-opacity ${
                        isActive(item.href) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden items-center justify-end gap-3 md:flex xl:min-w-[240px]">
              <Link
                href={withLocale('/login')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-[#0a5694]"
              >
                <LogIn size={17} />
                <span>{isFR ? 'Connexion' : 'Login'}</span>
              </Link>

              <Link
                href={withLocale('/register')}
                className="inline-flex items-center gap-2 rounded-full bg-[#0a5694] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-[#062040]"
              >
                <UserPlus size={17} />
                <span>{isFR ? "S'inscrire" : 'Register'}</span>
              </Link>
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition-colors hover:bg-slate-50 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-slate-950/25 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed right-0 top-0 z-[110] flex h-screen w-[88%] max-w-sm flex-col bg-white p-8 shadow-2xl"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-100">
                    <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold uppercase tracking-tight text-[#062040]">
                      Expertise <span className="text-[#0a5694]">au Cameroun</span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                      {isFR ? 'Reseau national' : 'National network'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-slate-100 p-2 text-slate-700"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8 rounded-[28px] bg-slate-50 px-5 py-4 ring-1 ring-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  {isFR ? 'Contact direct' : 'Direct contact'}
                </div>
                <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
                  <a href="tel:+237222234567" className="flex items-center gap-3">
                    <Phone size={16} className="text-[#0a5694]" />
                    <span>+237 222 23 45 67</span>
                  </a>
                  <a href="mailto:contact@expertiseaucameroun.org" className="flex items-center gap-3">
                    <Mail size={16} className="text-[#0a5694]" />
                    <span>contact@expertiseaucameroun.org</span>
                  </a>
                </div>
              </div>

              <nav className="mb-auto flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-base font-bold transition-all ${
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

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-8">
                <Link
                  href={withLocale('/login')}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-700 shadow-sm"
                >
                  <LogIn size={18} />
                  {isFR ? 'Se connecter' : 'Sign in'}
                </Link>
                <Link
                  href={withLocale('/register')}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a5694] px-4 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-900/20"
                >
                  <UserPlus size={18} />
                  {isFR ? 'Rejoindre le reseau' : 'Join the network'}
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-1 text-[10px] font-extrabold uppercase tracking-[0.24em]">
                <Link
                  href={`/fr${basePath}`}
                  className={`rounded-full px-4 py-2 ${
                    locale === 'fr' ? 'bg-white text-[#062040] shadow-sm' : 'text-slate-500'
                  }`}
                >
                  FR
                </Link>
                <Link
                  href={`/en${basePath}`}
                  className={`rounded-full px-4 py-2 ${
                    locale === 'en' ? 'bg-white text-[#062040] shadow-sm' : 'text-slate-500'
                  }`}
                >
                  EN
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
