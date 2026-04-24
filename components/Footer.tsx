"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

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
        { label: isFR ? 'Blog & Actualités' : 'Blog & News', href: '/blog' },
      ]
    },
    {
      title: isFR ? 'Ressources' : 'Resources',
      links: [
        { label: isFR ? 'Annuaire des Experts' : 'Experts Directory', href: '/members' },
        { label: isFR ? 'Documents Techniques' : 'Technical Docs', href: '/blog' },
        { label: isFR ? 'Partenariats' : 'Partnerships', href: '/contact' },
        { label: isFR ? 'Galerie' : 'Gallery', href: '/gallery' },
      ]
    },
    {
      title: isFR ? 'Informations' : 'Information',
      links: [
        { label: isFR ? 'Contactez-nous' : 'Contact Us', href: '/contact' },
        { label: isFR ? 'Mentions Légales' : 'Legal Notice', href: '/legal' },
        { label: isFR ? 'Confidentialité' : 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tighter uppercase leading-none">
                  Expertise <span className="text-blue-400">au Cameroun</span>
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  National Water & Sanitation Network
                </p>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-sm max-w-md">
              {isFR 
                ? 'La plateforme d\'excellence dédiée à la structuration et à la promotion de l\'expertise camerounaise dans les secteurs vitaux de l\'eau et de l\'assainissement.'
                : 'The platform of excellence dedicated to the structuring and promotion of Cameroonian expertise in the vital water and sanitation sectors.'}
            </p>
            
            <div className="flex gap-4">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                  <Icon size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group">
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-white/5 mb-10">
          {[
            { icon: MapPin, label: isFR ? 'Adresse' : 'Address', val: 'Yaoundé, Cameroun' },
            { icon: Phone, label: isFR ? 'Contact' : 'Contact', val: '+237 222 23 45 67' },
            { icon: Mail, label: 'Email', val: 'contact@expertiseaucameroun.org' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-semibold">{item.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="text-center md:text-left">
            © 2025 Expertise Au Cameroun. {isFR ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-500" />
              <span>Cameroun - France - UE</span>
            </div>
            <div className="hidden sm:block text-slate-600">
              Partenaires : <span className="text-slate-400">FSPI & AFD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

