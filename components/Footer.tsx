"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, Link2, ExternalLink, ArrowUpRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';

  const footerLinks = [
    {
      title: isFR ? 'Exploration' : 'Exploration',
      links: [
        { label: isFR ? 'Accueil' : 'Home', href: '/' },
        { label: isFR ? 'À Propos' : 'About', href: '/about' },
        { label: isFR ? 'Annuaire Experts' : 'Experts Directory', href: '/members' },
        { label: isFR ? 'Annuaire Institutions' : 'Institutions', href: '/institutions' },
        { label: isFR ? 'Galerie Photos' : 'Gallery', href: '/gallery' },
      ]
    },
    {
      title: isFR ? 'Ressources' : 'Resources',
      links: [
        { label: isFR ? 'Actualités & Blog' : 'News & Blog', href: '/blog' },
        { label: isFR ? 'Certification' : 'Certification', href: '/about' },
        { label: isFR ? 'Partenariats' : 'Partnerships', href: '/contact' },
        { label: isFR ? 'Centre d\'aide' : 'Help Center', href: '/contact' },
      ]
    },
    {
      title: isFR ? 'Légal' : 'Legal',
      links: [
        { label: isFR ? 'Mentions Légales' : 'Legal Notice', href: '#' },
        { label: isFR ? 'Confidentialité' : 'Privacy Policy', href: '#' },
        { label: isFR ? 'Conditions d\'utilisation' : 'Terms of Use', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a5694] via-[#0d9488] to-[#0a5694]" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center shadow-2xl">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tighter leading-none">
                  EXPERTISE <span className="text-[#7dd3fc]">AU CAMEROUN</span>
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">
                  Water & Sanitation Network
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              {isFR 
                ? 'La plateforme nationale de référence pour la structuration de l\'expertise camerounaise dans le secteur de l\'eau et de l\'assainissement.'
                : 'The national reference platform for the structuring of Cameroonian expertise in the water and sanitation sector.'}
            </p>
            
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0a5694] hover:border-[#0a5694] transition-all group">
                  <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Links (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#7dd3fc]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-all inline-flex items-center gap-1 group text-sm font-medium">
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/5 mb-10">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#7dd3fc] group-hover:bg-[#7dd3fc] group-hover:text-gray-900 transition-all">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isFR ? 'Bureau Central' : 'Main Office'}</div>
              <div className="text-sm font-bold">Yaoundé, Cameroun</div>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#7dd3fc] group-hover:bg-[#7dd3fc] group-hover:text-gray-900 transition-all">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isFR ? 'Téléphone' : 'Phone'}</div>
              <div className="text-sm font-bold">+237 222 23 45 67</div>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#7dd3fc] group-hover:bg-[#7dd3fc] group-hover:text-gray-900 transition-all">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email</div>
              <div className="text-sm font-bold">info@expertiseaucameroun.org</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <div>
            © 2025 Expertise Au Cameroun. {isFR ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#0d9488]" />
              <span>Cameroun - France - UE</span>
            </div>
            <div className="hidden sm:block">
              Propulsé par <span className="text-white">FSPI & AFD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
