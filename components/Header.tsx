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
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href={`/${locale}`} className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              className="text-gray-700 hover:text-blue-600 font-semibold text-sm"
            >
              {isFR ? item.label : item.labelEn}
            </Link>
          ))}

          {/* DROPDOWN */}
          <div className="relative group" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-semibold text-sm">
              {isFR ? 'Institutions publiques' : 'Public Institutions'}
              <ChevronDown size={16} />
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 py-2">
                {institutionsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocale(item.href)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={withLocale('/contact')} className="text-gray-700 hover:text-blue-600 font-semibold text-sm">
            {isFR ? 'Contactez-nous' : 'Contact us'}
          </Link>
          <Link href={withLocale('/login')} className="text-gray-700 hover:text-blue-600 font-semibold text-sm">
            {isFR ? 'Connexion' : 'Login'}
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              className="block text-gray-700 font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {isFR ? item.label : item.labelEn}
            </Link>
          ))}
          {/* Mobile dropdown simplified */}
          <Link href={withLocale('/institutions')} className="block text-gray-700 font-semibold" onClick={() => setMobileOpen(false)}>
            Institutions publiques
          </Link>
          <Link href={withLocale('/contact')} className="block text-gray-700 font-semibold" onClick={() => setMobileOpen(false)}>
            Contactez-nous
          </Link>
          <Link href={withLocale('/login')} className="block text-gray-700 font-semibold" onClick={() => setMobileOpen(false)}>
            Connexion
          </Link>
        </div>
      )}
    </header>
  );
}
