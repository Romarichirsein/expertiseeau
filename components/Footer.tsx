"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, Link2, ExternalLink } from 'lucide-react';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';

  const footerLinks = [
    {
      title: isFR ? 'Navigation' : 'Navigation',
      links: [
        { label: isFR ? 'Accueil' : 'Home', href: '/' },
        { label: isFR ? 'À Propos' : 'About', href: '/about' },
        { label: isFR ? 'Membres' : 'Members', href: '/members' },
        { label: isFR ? 'Institutions' : 'Institutions', href: '/institutions' },
        { label: isFR ? 'Galerie' : 'Gallery', href: '/gallery' },
      ]
    },
    {
      title: isFR ? 'Expertise' : 'Expertise',
      links: [
        { label: isFR ? 'Répertoire National' : 'National Directory', href: '/members' },
        { label: isFR ? 'Certification Experts' : 'Expert Certification', href: '/about' },
        { label: isFR ? 'Partenariats' : 'Partnerships', href: '/contact' },
        { label: isFR ? 'Documentation' : 'Documentation', href: '/blog' },
      ]
    },
    {
      title: isFR ? 'Légal' : 'Legal',
      links: [
        { label: isFR ? 'Mentions Légales' : 'Legal Notice', href: '#' },
        { label: isFR ? 'Confidentialité' : 'Privacy Policy', href: '#' },
        { label: isFR ? 'Conditions' : 'Terms of Use', href: '#' },
      ]
    }
  ];

  return (
    <footer style={{ backgroundColor: '#062040', color: '#fff', paddingTop: '80px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#fff', borderRadius: '10px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/images/logo.png" alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#7dd3fc' }}>
                Expertise<br />Cameroun
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.7 }}>
              {isFR 
                ? 'Le réseau national de référence pour la valorisation et la structuration de l\'expertise camerounaise dans le secteur de l\'eau.'
                : 'The national reference network for the valorization and structuring of Cameroonian expertise in the water sector.'}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Link2, ExternalLink, Share2].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#7dd3fc' }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} style={{ fontSize: '14px', color: '#fff', opacity: 0.6, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Row */}
        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} color="#7dd3fc" />
            <span style={{ fontSize: '13px', opacity: 0.7 }}>Yaoundé, Cameroun</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={18} color="#7dd3fc" />
            <span style={{ fontSize: '13px', opacity: 0.7 }}>+237 222 23 45 67</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={18} color="#7dd3fc" />
            <span style={{ fontSize: '13px', opacity: 0.7 }}>info@expertiseaucameroun.org</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', opacity: 0.4 }}>
          <div>© 2025 Expertise Au Cameroun. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Plateforme propulsée par l'Ambassade de France & UE <ExternalLink size={10} />
          </div>
        </div>
      </div>
    </footer>
  );
}
