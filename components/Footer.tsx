"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, Building2, Phone, Mail, MapPin, 
  ArrowRight, Globe, Award, BookOpen, Facebook, Twitter, Linkedin, Instagram,
  ShieldCheck, Zap, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';
  const withLocale = (path: string) => (locale === 'fr' ? path : `/${locale}${path}`);

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden transition-colors duration-500 pt-24 pb-12">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-24">
          
          {/* BRANDING - Span 4 */}
          <div className="lg:col-span-4 space-y-10">
            <Link href={`/${locale}`} className="group flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-2.5 border border-white/20 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="font-outfit font-black text-2xl uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform">
                Expertise <span className="text-primary italic">au</span> Cameroun
              </div>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              {isFR 
                ? "La plateforme institutionnelle de référence pour l'expertise nationale certifiée dans le secteur de l'eau et de l'assainissement."
                : "The institutional reference platform for certified national expertise in the water and sanitation sector."}
            </p>
            <div className="flex items-center gap-4">
               {[
                 { icon: Mail, href: "mailto:contact@expertiseaucameroun.org" },
                 { icon: Phone, href: "tel:+237222234567" },
                 { icon: Linkedin, href: "#" },
                 { icon: Facebook, href: "#" }
               ].map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 hover:-translate-y-1"
                 >
                    <social.icon size={20} strokeWidth={2} />
                 </a>
               ))}
            </div>
          </div>

          {/* QUICK LINKS - Span 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">{isFR ? 'Explorer' : 'Explore'}</h4>
            <ul className="space-y-5">
              {[
                { label: isFR ? 'Accueil' : 'Home', href: '/' },
                { label: isFR ? 'À propos' : 'About', href: '/about' },
                { label: isFR ? 'Les Experts' : 'Experts', href: '/members' },
                { label: isFR ? 'Institutions' : 'Institutions', href: '/institutions' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={withLocale(link.href)} className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300 font-bold text-sm uppercase tracking-widest group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES - Span 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">{isFR ? 'Ressources' : 'Resources'}</h4>
            <ul className="space-y-5">
              {[
                { label: isFR ? 'Actualités' : 'News', href: '/blog' },
                { label: isFR ? 'Galerie' : 'Gallery', href: '/gallery' },
                { label: isFR ? 'Contact' : 'Contact', href: '/contact' },
                { label: isFR ? 'FAQ' : 'FAQ', href: '#' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={withLocale(link.href)} className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300 font-bold text-sm uppercase tracking-widest group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PORTAL ACCESS - Span 4 */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">{isFR ? 'Accès Expert' : 'Expert Portal'}</h4>
            <div className="grid grid-cols-1 gap-6">
              <Link href={withLocale('/login')} className="group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-primary/30 transition-all duration-500 flex items-center justify-between shadow-xl">
                <div className="space-y-1">
                  <div className="text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary" />
                    {isFR ? 'CONNEXION' : 'LOGIN'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{isFR ? 'Accédez à votre espace sécurisé' : 'Access your secure space'}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link href={withLocale('/register')} className="group p-6 bg-gradient-to-br from-primary/10 to-teal-500/10 border border-primary/20 rounded-3xl hover:from-primary/20 hover:to-teal-500/20 hover:border-primary/40 transition-all duration-500 flex items-center justify-between shadow-xl">
                <div className="space-y-1">
                  <div className="text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Users size={16} className="text-primary" />
                    {isFR ? 'REJOINDRE LE RÉSEAU' : 'JOIN THE NETWORK'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{isFR ? 'Inscrivez-vous au répertoire' : 'Register to the directory'}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 space-y-12">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <Globe size={14} className="text-primary" />
                {isFR ? 'BILINGUE FR / EN' : 'BILINGUAL FR / EN'}
              </div>
              <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <Award size={14} className="text-primary" />
                {isFR ? 'RÉSEAU VÉRIFIÉ' : 'VERIFIED NETWORK'}
              </div>
              <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <Zap size={14} className="text-primary" />
                {isFR ? 'VALEUR NATIONALE' : 'NATIONAL VALUE'}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              <span>YAOUNDÉ, RÉPUBLIQUE DU CAMEROUN</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
              © 2026 EXPERTISE AU CAMEROUN. <span className="hidden md:inline mx-2 opacity-20">|</span> TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-colors">{isFR ? 'Mentions Légales' : 'Legal Mentions'}</Link>
              <Link href="#" className="text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-colors">{isFR ? 'Confidentialité' : 'Privacy Policy'}</Link>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] italic">
                Powered by <span className="text-white not-italic">Wellborne</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
