"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Globe } from 'lucide-react';

const navItems = [
  { label: 'Accueil', labelEn: 'Home', href: '/' },
  { label: 'À Propos', labelEn: 'About', href: '/about' },
  { label: 'Membres', labelEn: 'Members', href: '/members' },
  { label: 'Institutions', labelEn: 'Institutions', href: '/institutions' },
  { label: 'Galerie', labelEn: 'Gallery', href: '/gallery' },
  { label: 'Blog', labelEn: 'Blog', href: '/blog' },
  { label: 'Contact', labelEn: 'Contact', href: '/contact' },
];

export default function Header({ locale = 'fr' }: { locale?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isFR = locale === 'fr';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || (href === '/' && pathname === `/${locale}`);

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* === TOP BAR === */}
      <div style={{
        backgroundColor: '#0a5694',
        color: '#fff',
        fontSize: '13px',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="tel:+237222234567" style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <Phone size={12} /> +237 222 23 45 67
            </a>
            <a href="mailto:contact@expertiseaucameroun.org" style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <Mail size={12} /> contact@expertiseaucameroun.org
            </a>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href={`/fr${pathname.replace(/^\/(fr|en)/, '') || '/'}`} style={{ color: locale === 'fr' ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: locale === 'fr' ? 700 : 400, textDecoration: 'none', fontSize: '12px' }}>FR</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <Link href={`/en${pathname.replace(/^\/(fr|en)/, '') || '/'}`} style={{ color: locale === 'en' ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: locale === 'en' ? 700 : 400, textDecoration: 'none', fontSize: '12px' }}>EN</Link>
          </div>
        </div>
      </div>

      {/* === MAIN HEADER === */}
      <div style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          
          {/* LOGO */}
          <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/images/logo.png"
              alt="Expertise au Cameroun"
              style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: isActive(item.href) ? 700 : 500,
                  color: isActive(item.href) ? '#0a5694' : '#333',
                  textDecoration: 'none',
                  backgroundColor: isActive(item.href) ? 'rgba(10,86,148,0.08)' : 'transparent',
                  borderBottom: isActive(item.href) ? '2px solid #0a5694' : '2px solid transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {isFR ? item.label : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTON + MOBILE TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href={`/${locale}/register/resident`}
              className="cta-btn desktop-nav"
              style={{
                backgroundColor: '#0a5694',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(10,86,148,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {isFR ? "S'inscrire" : 'Register'}
            </Link>
            <button
              className="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: '1px solid #ddd', borderRadius: '6px', padding: '8px', cursor: 'pointer', color: '#333' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="mobile-nav" style={{ backgroundColor: '#fff', borderTop: '1px solid #eee', padding: '16px 24px' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: isActive(item.href) ? 700 : 500,
                  color: isActive(item.href) ? '#0a5694' : '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {isFR ? item.label : item.labelEn}
              </Link>
            ))}
            <Link
              href={`/${locale}/register/resident`}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', marginTop: '12px', backgroundColor: '#0a5694', color: '#fff', padding: '12px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}
            >
              {isFR ? "S'inscrire" : 'Register'}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
