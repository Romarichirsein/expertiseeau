"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle,
  Heart,
  History,
  ShieldCheck,
  Star,
  Target,
  Users,
  Zap,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const values = [
    {
      title: isFR ? 'Intégrité' : 'Integrity',
      description: isFR
        ? "Une éthique professionnelle exigeante au service du secteur de l'eau."
        : 'Rigorous professional ethics in service of the water sector.',
      icon: ShieldCheck,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      title: isFR ? 'Excellence' : 'Excellence',
      description: isFR
        ? 'Mettre en avant des compétences de haut niveau pour des solutions durables.'
        : 'Showcasing high-level expertise for sustainable solutions.',
      icon: Target,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: isFR ? 'Impact' : 'Impact',
      description: isFR
        ? "Contribuer à un meilleur accès à l'eau et à l'assainissement au Cameroun."
        : 'Contributing to better access to water and sanitation in Cameroon.',
      icon: Star,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
  ];

  const pillars = [
    { icon: CheckCircle, text: isFR ? "Centralisation de l'expertise" : 'Expertise centralization' },
    { icon: CheckCircle, text: isFR ? 'Valorisation des talents' : 'Talent promotion' },
    { icon: CheckCircle, text: isFR ? 'Mise en réseau nationale' : 'National networking' },
    { icon: CheckCircle, text: isFR ? 'Certification des profils' : 'Profile certification' },
  ];

  const stats = [
    { icon: Users, count: '960+', label: isFR ? 'Experts' : 'Experts', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Building2, count: '25+', label: isFR ? 'Institutions' : 'Institutions', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Award, count: '14+', label: isFR ? 'Domaines' : 'Fields', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { icon: BookOpen, count: '150+', label: isFR ? 'Publications' : 'Publications', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* PREMIUM HERO SECTION */}
      <div className="bg-slate-900 pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <History size={18} />
              {isFR ? 'Notre Vision Stratégique' : 'Our Strategic Vision'}
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight font-outfit leading-[0.9] uppercase">
              {isFR ? 'À propos du ' : 'About the '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'Réseau' : 'Network'}</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-3xl font-inter leading-relaxed">
              {isFR
                ? "Une plateforme institutionnelle dédiée à la structuration, à la mise en valeur et à la connexion des compétences camerounaises du secteur de l'eau."
                : 'An institutional platform dedicated to structuring, elevating, and connecting Cameroonian expertise in the water sector.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-20 -mt-16 md:-mt-24 px-6 max-w-7xl mx-auto">
        {/* INITIATIVE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="rounded-[4rem] border-white/20 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-12 md:p-24 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2 relative z-10">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                  <Building2 size={18} strokeWidth={2.5} />
                  EXPERTISAUCAMEROUN.ORG
                </div>

                <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1] uppercase">
                  {isFR ? 'Une initiative stratégique ' : 'A national '}
                  <span className="text-primary italic">{isFR ? 'nationale' : 'strategic initiative'}</span>
                </h2>

                <div className="space-y-8">
                  <p className="text-xl font-medium leading-relaxed text-muted-foreground font-inter">
                    {isFR
                      ? "Ce projet est une initiative stratégique soutenue par le Fonds de Solidarité pour les Projets Innovants (FSPI), l'Ambassade de France et la Délégation de l'Union européenne au Cameroun."
                      : 'This project is a strategic initiative supported by the Solidarity Fund for Innovative Projects (FSPI), the French Embassy, and the European Union Delegation in Cameroon.'}
                  </p>

                  <p className="text-lg font-medium leading-relaxed text-slate-500 font-inter">
                    {isFR
                      ? "Mis en oeuvre avec l'appui de l'AFD, il vise à structurer l'expertise nationale afin de soutenir une gestion durable, fiable et performante des ressources hydrauliques du pays."
                      : 'Implemented with AFD support, it aims to structure national expertise in order to strengthen sustainable, reliable, and high-performing management of the country\'s water resources.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-6">
                  {pillars.map((item) => (
                    <div key={item.text} className="flex items-center gap-4 text-[12px] font-black uppercase tracking-tight text-foreground transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner border border-emerald-500/20 group-hover:scale-110 transition-transform">
                        <item.icon size={24} strokeWidth={3} />
                      </div>
                      <span className="font-outfit group-hover:text-primary transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col items-center rounded-[3rem] border border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/20 p-10 text-center transition-all duration-700 hover:border-primary/40 hover:bg-white dark:hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${stat.bg} ${stat.color}`}>
                      <stat.icon size={36} strokeWidth={2.5} />
                    </div>
                    <div className="font-outfit text-5xl font-black text-foreground tracking-tighter transition-colors uppercase">{stat.count}</div>
                    <div className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* VALUES SECTION */}
        <div className="py-32">
          <div className="mx-auto mb-24 max-w-4xl text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.3em]">
              <Heart size={20} strokeWidth={3} />
              {isFR ? 'Nos Valeurs Fondamentales' : 'Our Core Values'}
            </div>

            <h2 className="font-outfit text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1] uppercase">
              {isFR ? 'Ce qui guide chaque ' : 'What guides every '}
              <span className="text-primary italic">{isFR ? 'décision' : 'decision'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
              >
                <Card className="group !rounded-[4rem] !p-14 overflow-hidden border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl shadow-2xl transition-all duration-700 hover:border-primary/40 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className={`mb-12 flex h-24 w-24 items-center justify-center rounded-[2rem] shadow-inner transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-6 ${value.bg} ${value.color}`}>
                      <value.icon size={48} strokeWidth={2} />
                    </div>

                    <h3 className="mb-6 font-outfit text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase">{value.title}</h3>
                    <p className="text-lg font-medium leading-relaxed text-muted-foreground font-inter">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative overflow-hidden rounded-[5rem] bg-slate-900 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] p-16 md:p-32 text-center border border-white/10">
            <div className="absolute right-0 top-0 rotate-12 p-16 opacity-10 pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
              <Zap size={400} className="text-primary" />
            </div>
            <div className="absolute left-0 bottom-0 -rotate-12 p-16 opacity-5 pointer-events-none">
              <Globe size={300} className="text-white" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl space-y-12">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em]">
                <Sparkles size={18} />
                {isFR ? 'Expansion du réseau' : 'Network Expansion'}
              </div>
              
              <h2 className="font-outfit text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.95] uppercase">
                {isFR ? "Une vision partagée pour " : 'A shared vision for '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? "l'avenir" : 'the future'}</span>
              </h2>

              <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-400 max-w-3xl mx-auto font-inter">
                {isFR
                  ? "Rejoignez une communauté d'experts engagés et contribuez à faire émerger des solutions hydrauliques innovantes au Cameroun."
                  : 'Join a community of committed experts and help shape innovative water solutions in Cameroon.'}
              </p>

              <div className="flex flex-col justify-center items-center gap-8 sm:flex-row pt-10">
                <Link href={`/${locale}/register`} passHref>
                  <Button variant="premium" className="h-20 px-16 rounded-3xl text-xl font-black shadow-2xl shadow-primary/30 uppercase tracking-widest gap-4">
                    {isFR ? 'Rejoindre le réseau' : 'Join the network'}
                    <ArrowRight size={24} strokeWidth={3} />
                  </Button>
                </Link>

                <Link href={`/${locale}/contact`} passHref>
                  <Button variant="outline" className="h-20 px-16 rounded-3xl text-xl font-black bg-white/5 border-white/10 text-white backdrop-blur-xl hover:bg-white/10 uppercase tracking-widest">
                    {isFR ? 'Nous contacter' : 'Contact us'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
