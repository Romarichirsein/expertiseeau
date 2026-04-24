"use client";

import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Share2,
  Users,
} from 'lucide-react';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';
  const withLocale = (href: string) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  const linkGroups = [
    {
      title: isFR ? 'Exploration' : 'Exploration',
      icon: Building2,
      links: [
        { label: isFR ? 'Accueil' : 'Home', href: '/' },
        { label: isFR ? 'A propos' : 'About', href: '/about' },
        { label: isFR ? 'Membres' : 'Members', href: '/members' },
        { label: isFR ? 'Institutions' : 'Institutions', href: '/institutions' },
        { label: isFR ? 'Galerie' : 'Gallery', href: '/gallery' },
      ],
    },
    {
      title: isFR ? 'Ressources' : 'Resources',
      icon: BookOpen,
      links: [
        { label: isFR ? 'Blog & actualites' : 'News & Blog', href: '/blog' },
        { label: isFR ? 'Contact' : 'Contact', href: '/contact' },
        { label: isFR ? 'Annuaire des experts' : 'Experts directory', href: '/members' },
        { label: isFR ? 'Inscription' : 'Registration', href: '/register' },
      ],
    },
    {
      title: isFR ? 'Acces' : 'Access',
      icon: ShieldCheck,
      links: [
        { label: isFR ? 'Connexion' : 'Login', href: '/login' },
        { label: isFR ? 'Expert resident' : 'Resident expert', href: '/register/resident' },
        { label: isFR ? 'Expert diaspora' : 'Diaspora expert', href: '/register/diaspora' },
        { label: isFR ? 'Nous ecrire' : 'Contact us', href: '/contact' },
      ],
    },
  ];

  const highlights = [
    { value: '960+', label: isFR ? 'Experts references' : 'Verified experts' },
    { value: '25+', label: isFR ? 'Institutions repertoriees' : 'Institutions listed' },
    { value: 'FR / EN', label: isFR ? 'Plateforme bilingue' : 'Bilingual platform' },
  ];

  const contactItems = [
    {
      icon: MapPin,
      label: isFR ? 'Siege' : 'Head office',
      value: 'Yaounde, Cameroun',
      href: withLocale('/contact'),
    },
    {
      icon: Phone,
      label: isFR ? 'Telephone' : 'Phone',
      value: '+237 222 23 45 67',
      href: 'tel:+237222234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@expertiseaucameroun.org',
      href: 'mailto:contact@expertiseaucameroun.org',
    },
  ];

  const actionItems = [
    {
      href: withLocale('/contact'),
      icon: Mail,
      label: isFR ? 'Nous contacter' : 'Contact us',
    },
    {
      href: 'tel:+237222234567',
      icon: Phone,
      label: isFR ? 'Appeler' : 'Call',
    },
    {
      href: withLocale('/register'),
      icon: Share2,
      label: isFR ? 'Rejoindre le reseau' : 'Join the network',
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-slate-950 text-white">
      <div className="mx-auto max-w-[1380px] px-4 pb-10 pt-24 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.85fr_0.85fr_0.85fr]">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex shrink-0 items-center justify-center rounded-[26px] bg-white p-3 shadow-lg shadow-blue-950/20 ring-1 ring-white/10">
                <img src="/images/logo.png" alt="Logo Expertise Au Cameroun" className="h-16 w-16 object-contain" />
              </div>

              <div>
                <h3 className="font-outfit text-[32px] font-extrabold uppercase leading-none tracking-tight text-white">
                  Expertise <span className="text-blue-400">au Cameroun</span>
                </h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.34em] text-slate-500">
                  Water &amp; Sanitation Network
                </p>
              </div>
            </div>

            <p className="max-w-xl text-[17px] leading-8 text-slate-300/90">
              {isFR
                ? "La plateforme nationale de reference pour structurer, valoriser et connecter l'expertise camerounaise dans les secteurs de l'eau et de l'assainissement."
                : 'The national reference platform designed to structure, elevate, and connect Cameroonian expertise in the water and sanitation sectors.'}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/8 bg-white/5 px-5 py-5 shadow-inner shadow-slate-900/30"
                >
                  <div className="font-outfit text-2xl font-extrabold tracking-tight text-white">{item.value}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {actionItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                >
                  <item.icon size={16} className="text-blue-400" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {linkGroups.map((section) => (
            <div key={section.title} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/5 p-2 text-blue-400 ring-1 ring-white/5">
                  <section.icon size={16} />
                </div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  {section.title}
                </h4>
              </div>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={withLocale(link.href)}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-14 h-px bg-white/6" />

        <div className="grid gap-4 md:grid-cols-3">
          {contactItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-4 rounded-[24px] border border-white/8 bg-white/5 px-6 py-6 transition-all hover:border-blue-500/30 hover:bg-white/7"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white/6 text-blue-400 transition-all group-hover:bg-blue-500/15 group-hover:text-[#7ec8ff]">
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-slate-500">{item.label}</p>
                <p className="mt-2 font-outfit text-lg font-extrabold text-white">{item.value}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
            {isFR
              ? '© 2025 Expertise au Cameroun. Tous droits reserves.'
              : '© 2025 Expertise Au Cameroun. All rights reserved.'}
          </div>

          <div className="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-400" />
              <span>Cameroun - France - UE</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-blue-400" />
              <span>Propulse par FSPI &amp; AFD</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-blue-400" />
              <span>{isFR ? 'Reseau professionnel verifie' : 'Verified professional network'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
