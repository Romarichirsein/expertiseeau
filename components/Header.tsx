"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'Experts', labelEn: 'Experts', href: '/members' },
  { label: 'Inscription', labelEn: 'Registration', href: '/register' },
];

const institutionsItems = [
  { label: 'institutions d’appui au développement', href: '/education-et-recherche' },
  { label: 'Bureaux d’études actifs', href: '/acteur-publics' },
  { label: 'Institutions d’enseignement', href: '/entreprises' },
  { label: 'Entreprises du secteur de l’eau', href: '/acteur-dappui-au-developpement' },
  { label: 'institution transfrontalière', href: '/institution-transfrontaliere' },
  { label: 'ONGs et OSCs', href: '/ongs-et-oscs-2' },
  { label: 'Institutions publiques', href: '/institutions' },
];

export default function Header({ locale = 'fr' }: { locale?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const isFR = locale === 'fr';
  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#4579ec] text-white py-2 text-xs font-medium fixed top-0 left-0 right-0 z-[60]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>waterforlife.partner@gmail.com</span>
            <span>(+237) 675 35 87 95</span>
          </div>
          <div className="flex gap-4">
            <Link href="/en" className={!isFR ? 'font-bold' : ''}>EN</Link>
            <Link href="/fr" className={isFR ? 'font-bold' : ''}>FR</Link>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-gray-100 fixed top-8 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 h-[121px] flex items-center justify-between">
          {/* LOGO */}
          <Link href={`/${locale}`} className="flex items-center">
            <img 
              src="/assets/logo.png" 
              alt="Les Experts en Eaux au Cameroun" 
              className="max-w-[99px] max-h-[98px] w-auto h-auto" 
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = pathname === withLocale(item.href);
              return (
                <Link
                  key={item.href}
                  href={withLocale(item.href)}
                  className={`text-[#595959] hover:text-[#34b4e2] font-bold text-[12px] uppercase tracking-[0.6px] transition-colors ${active ? 'text-[#34b4e2]' : ''}`}
                >
                  {isFR ? item.label : item.labelEn}
                </Link>
              );
            })}

            {/* DROPDOWN */}
            <div className="relative group" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <button className="flex items-center gap-1 text-[#595959] hover:text-[#34b4e2] font-bold text-[12px] uppercase tracking-[0.6px] transition-colors">
                {isFR ? 'Institutions publiques' : 'Public Institutions'}
                <ChevronDown size={14} />
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white shadow-xl border-t-2 border-[#34b4e2] py-2 z-[60]">
                  {institutionsItems.map((item) => (
                    <Link
                      key={item.href}
                      href={withLocale(item.href)}
                      className="block px-4 py-2 text-[12px] text-[#595959] hover:bg-gray-50 hover:text-[#34b4e2] font-bold uppercase tracking-[0.6px]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={withLocale('/contact')} className="text-[#595959] hover:text-[#34b4e2] font-bold text-[12px] uppercase tracking-[0.6px] transition-colors">
              {isFR ? 'Contactez-nous' : 'Contact us'}
            </Link>
            <Link href={withLocale('/login')} className="text-[#595959] hover:text-[#34b4e2] font-bold text-[12px] uppercase tracking-[0.6px] transition-colors">
              {isFR ? 'Connexion' : 'Login'}
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden p-2 text-[#595959]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className="block text-[#595959] font-bold text-sm uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {isFR ? item.label : item.labelEn}
              </Link>
            ))}
            <Link href={withLocale('/institutions')} className="block text-[#595959] font-bold text-sm uppercase" onClick={() => setMobileOpen(false)}>
              Institutions publiques
            </Link>
            <Link href={withLocale('/contact')} className="block text-[#595959] font-bold text-sm uppercase" onClick={() => setMobileOpen(false)}>
              Contactez-nous
            </Link>
            <Link href={withLocale('/login')} className="block text-[#595959] font-bold text-sm uppercase" onClick={() => setMobileOpen(false)}>
              Connexion
            </Link>
          </div>
        )}
      </header>
      <div className="h-[153px]"></div> {/* Spacer for fixed header (121px + 32px topbar) */}
    </>
  );
}

