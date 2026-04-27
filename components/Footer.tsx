"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, Building2, Globe2, Phone, Mail, MapPin, 
  ChevronRight, ArrowRight, ShieldCheck, FileText, Share2, Award, BookOpen, Globe
} from 'lucide-react';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';

  const withLocale = (path: string) => (locale === 'fr' ? path : `/${locale}${path}`);

  const sections = [
    {
      title: isFR ? 'Navigation' : 'Navigation',
      icon: ArrowRight,
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
        { label: isFR ? 'Actualités & blog' : 'News & Blog', href: '/blog' },
        { label: isFR ? 'Contact' : 'Contact', href: '/contact' },
        { label: isFR ? 'Annuaire des experts' : 'Experts directory', href: '/members' },
        { label: isFR ? 'Inscription' : 'Registration', href: '/register' },
      ],
    },
    {
      title: isFR ? 'Accès' : 'Access',
      icon: ShieldCheck,
      links: [
        { label: isFR ? 'Connexion' : 'Login', href: '/login' },
        { label: isFR ? 'Expert résident' : 'Resident expert', href: '/register/resident' },
        { label: isFR ? 'Expert diaspora' : 'Diaspora expert', href: '/register/diaspora' },
        { label: isFR ? 'Nous contacter' : 'Contact us', href: '/contact' },
      ],
    },
  ];

  const stats = [
    {
      icon: Users,
      value: '960+',
      label: isFR ? 'Experts vérifiés' : 'Verified experts',
    },
    {
      icon: Building2,
      value: '25+',
      label: isFR ? 'Institutions listées' : 'Institutions listed',
    },
    {
      icon: Globe,
      value: 'FR / EN',
      label: isFR ? 'Plateforme bilingue' : 'Bilingual platform',
    },
  ];

  const quickActions = [
    {
      icon: Mail,
      label: isFR ? 'Nous contacter' : 'Contact us',
      href: withLocale('/contact'),
    },
    {
      icon: Phone,
      label: isFR ? 'Appeler' : 'Call',
      href: 'tel:+237222234567',
    },
    {
      icon: Share2,
      label: isFR ? 'Rejoindre le réseau' : 'Join the network',
      href: withLocale('/register'),
    },
  ];

  const contactItems = [
    {
      title: isFR ? 'Siège Social' : 'Head Office',
      value: 'Yaoundé, Cameroun',
      icon: MapPin,
      href: '#',
    },
    {
      title: isFR ? 'Téléphone' : 'Phone',
      value: '+237 222 23 45 67',
      icon: Phone,
      href: 'tel:+237222234567',
    },
    {
      title: isFR ? 'Email' : 'Email',
      value: 'contact@expertiseaucameroun.org',
      icon: Mail,
      href: 'mailto:contact@expertiseaucameroun.org',
    },
  ];

  const bottomItems = [
    {
      label: isFR ? '© 2025 Expertise au Cameroun. Tous droits réservés.' : '© 2025 Expertise Au Cameroun. All rights reserved.',
      icon: null,
    },
    {
      label: 'Cameroun - France - UE',
      icon: Globe,
    },
    {
      label: isFR ? 'Propulsé par FSPI & AFD' : 'Powered by FSPI & AFD',
      icon: FileText,
    },
    {
      label: isFR ? 'Réseau professionnel vérifié' : 'Verified professional network',
      icon: Award,
    },
  ];

  return (
    <footer className="px-4 md:px-8 pb-8 pt-10">
      <div className="mx-auto max-w-[1550px] bg-[#061126] text-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
        <div className="px-8 pb-12 pt-20 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-20">
            <div className="space-y-20 lg:border-r lg:border-white/10 lg:pr-14">
              <div className="flex items-start gap-5">
                <div className="flex shrink-0 items-center justify-center rounded-[34px] bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                  <img
                    src="/images/logo.png"
                    alt="Logo Expertise Au Cameroun"
                    className="h-[92px] w-[92px] object-contain"
                  />
                </div>

                <div className="pt-1">
                  <h3 className="font-outfit text-[34px] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-[40px]">
                    Expertise <span className="text-[#3d8bff]">au</span>
                    <br />
                    <span className="text-[#3d8bff]">Cameroun</span>
                  </h3>
                  <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.36em] text-slate-500 sm:text-[12px]">
                    Water &amp; Sanitation Network
                  </p>
                </div>
              </div>

              <p className="max-w-[560px] text-[20px] leading-[1.8] text-slate-300/95">
                {isFR
                  ? "La plateforme nationale de référence conçue pour structurer, valoriser et connecter l'expertise camerounaise dans les secteurs de l'eau et de l'assainissement."
                  : 'The national reference platform designed to structure, elevate, and connect Cameroonian expertise in the water and sanitation sectors.'}
              </p>

              <div className="grid gap-8 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#112142] text-[#3d8bff]">
                      <item.icon size={24} />
                    </div>
                    <div className="font-outfit text-[26px] font-extrabold tracking-tight text-white">{item.value}</div>
                    <div className="mt-2 text-[11px] font-bold uppercase leading-6 tracking-[0.28em] text-slate-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {quickActions.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="btn-premium btn-secondary !bg-white/5 !border-white/10 !text-white hover:!bg-white/10 !px-6 !py-3 !text-[14px]"
                  >
                    <item.icon size={20} className="text-[#3d8bff]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              {sections.map((section) => (
                <div key={section.title} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <section.icon size={28} className="text-[#3d8bff]" />
                    <h4 className="text-[16px] font-extrabold uppercase tracking-[0.06em] text-[#3d8bff]">
                      {section.title}
                    </h4>
                  </div>

                  <ul className="space-y-8">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={withLocale(link.href)}
                          className="group inline-flex items-center gap-4 text-[18px] text-slate-200 transition-colors hover:text-white"
                        >
                          <ChevronRight
                            size={20}
                            className="text-[#6f96ff] transition-transform group-hover:translate-x-0.5"
                          />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.03]">
            <div className="grid md:grid-cols-3">
              {contactItems.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-5 px-6 py-7 transition-colors hover:bg-white/[0.03] sm:px-8 lg:px-10 ${
                    index > 0 ? 'md:border-l md:border-white/10' : ''
                  }`}
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#112142] text-[#3d8bff]">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#3d8bff]">
                      {item.title}
                    </p>
                    <p className="mt-2 font-outfit text-[22px] font-extrabold leading-tight text-white">
                      {item.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-7">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {bottomItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-4 px-1 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500 xl:px-6 ${
                    index > 0 ? 'xl:border-l xl:border-white/10' : ''
                  }`}
                >
                  {item.icon ? <item.icon size={24} className="mt-0.5 shrink-0 text-[#3d8bff]" /> : null}
                  <span className="leading-8">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
