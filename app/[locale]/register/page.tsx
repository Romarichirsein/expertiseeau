"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, CheckCircle, UserPlus, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RegisterEntryPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isFR = locale === 'fr';

  const types = [
    {
      id: 'resident',
      title: isFR ? 'Expert Résident' : 'Resident Expert',
      subtitle: isFR ? 'Basé au Cameroun' : 'Based in Cameroon',
      description: isFR 
        ? 'Pour les professionnels locaux souhaitant valoriser leurs compétences au niveau national.' 
        : 'For local professionals wishing to promote their skills at the national level.',
      icon: MapPin,
      color: 'from-blue-600 to-[#0a5694]',
      accent: 'text-blue-600',
      features: isFR 
        ? ['Répertoire national certifié', 'Appels à expertise locaux', 'Mise en relation directe']
        : ['Certified national directory', 'Local calls for expertise', 'Direct matching']
    },
    {
      id: 'diaspora',
      title: isFR ? 'Expert Diaspora' : 'Diaspora Expert',
      subtitle: isFR ? 'International' : 'International',
      description: isFR 
        ? 'Pour les talents camerounais à l\'étranger désirant contribuer au développement du pays.' 
        : 'For Cameroonian talents abroad wishing to contribute to the country\'s development.',
      icon: Globe,
      color: 'from-teal-500 to-[#0d9488]',
      accent: 'text-teal-600',
      features: isFR 
        ? ['Visibilité institutionnelle', 'Missions de transfert de tech', 'Réseautage global']
        : ['Institutional visibility', 'Tech transfer missions', 'Global networking']
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-48 md:pt-60 pb-32 md:pb-40 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl space-y-12"
          >
            <div className="section-label bg-white/5 border-white/10 text-primary-light">
              <UserPlus size={16} strokeWidth={2.5} />
              {isFR ? 'Rejoindre le Réseau' : 'Join the Network'}
            </div>
            <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
              {isFR ? "Rejoignez l'Élite de " : 'Join the Elite '}
              <span className="text-gradient italic">{isFR ? "l'Expertise" : 'Network'}</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
              {isFR 
                ? 'Choisissez le profil institutionnel qui correspond à votre situation pour commencer votre parcours dans le réseau national certifié.'
                : 'Choose the institutional profile that matches your situation to start your journey in the certified national network.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-20 -mt-20 md:-mt-28 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {types.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (i * 0.15) }}
            >
              <Card className="group relative border-none glass-card premium-shadow !p-12 md:!p-16 overflow-hidden !rounded-[4rem] transition-all duration-1000 hover:-translate-y-4">
                <div className="relative z-10 space-y-12">
                  <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${type.color} text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000`}>
                    <type.icon size={44} strokeWidth={2} />
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60 uppercase tracking-[0.4em]">{type.subtitle}</div>
                      <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight font-outfit uppercase leading-[0.95]">{type.title}</h2>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed font-inter text-balance">{type.description}</p>
                  </div>

                  <ul className="space-y-8 py-12 border-y border-white/10">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-6 text-foreground text-lg font-bold font-inter">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 text-primary shadow-inner border border-primary/20`}>
                          <CheckCircle size={20} strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={`/${locale}/register/${type.id}`}
                    className="flex items-center justify-between w-full p-10 bg-white/40 dark:bg-white/5 group-hover:bg-primary group-hover:text-white transition-all duration-1000 font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] border border-white/10 shadow-inner group/btn"
                  >
                    {isFR ? 'Commencer l\'inscription' : 'Start registration'}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 bg-white dark:bg-secondary shadow-2xl group-hover/btn:translate-x-1 group-hover/btn:scale-110 text-primary`}>
                      <ArrowRight size={28} strokeWidth={3} />
                    </div>
                  </Link>
                </div>
                
                {/* Subtle Decorative Icon */}
                <div className="absolute -bottom-20 -right-20 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-1000 pointer-events-none">
                   <type.icon size={340} strokeWidth={1} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-24 text-center p-14 border-none glass-card premium-shadow !rounded-[4rem] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-5 text-muted-foreground font-black uppercase tracking-[0.3em] text-[11px] opacity-60">
            <Award size={24} className="text-primary" strokeWidth={2.5} />
            <span>Plateforme Officielle AES-256 certifiée</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10" />
          <p className="font-bold text-muted-foreground text-xl font-inter">
            {isFR 
              ? 'Déjà membre du réseau ? ' 
              : 'Already part of the network? '}
            <Link href={`/${locale}/login`} className="text-primary hover:text-primary-light font-black ml-4 transition-all uppercase tracking-widest text-base border-b-2 border-primary/20 hover:border-primary">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
