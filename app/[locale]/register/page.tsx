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
    <div className="min-h-screen bg-white dark:bg-secondary pt-44 pb-32 relative overflow-hidden font-inter transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px] opacity-20" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-primary-light/10 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="container relative z-10 max-w-6xl px-6">
        <div className="text-center space-y-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex p-6 rounded-[2.5rem] bg-white dark:bg-white/10 shadow-2xl shadow-slate-900/5 text-primary dark:text-primary-light mb-8 border border-slate-100 dark:border-white/10 backdrop-blur-xl"
          >
            <UserPlus size={56} strokeWidth={1} />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black text-secondary dark:text-white tracking-tight font-outfit leading-[0.95] transition-colors duration-500"
          >
            {isFR ? "Rejoignez l'Élite de " : 'Join the Elite '}
            <span className="text-primary dark:text-primary-light italic">{isFR ? "l'Expertise" : 'Network'}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-normal max-w-4xl mx-auto leading-relaxed font-inter transition-colors duration-500"
          >
            {isFR 
              ? 'Choisissez le profil institutionnel qui correspond à votre situation pour commencer votre parcours dans le réseau national certifié.'
              : 'Choose the institutional profile that matches your situation to start your journey in the certified national network.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {types.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (i * 0.15) }}
              className="premium-card group relative bg-white dark:bg-secondary border border-slate-100 dark:border-white/5 !p-12 md:!p-16 overflow-hidden !rounded-[4rem] transition-all duration-700 hover:border-primary/20 hover:shadow-[0_60px_100px_-20px_rgba(15,23,42,0.1)]"
            >
              <div className="relative z-10 space-y-10">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000`}>
                  <type.icon size={40} strokeWidth={1.5} />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${type.accent} dark:text-primary-light transition-colors`}>{type.subtitle}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-secondary dark:text-white tracking-tight font-outfit transition-colors">{type.title}</h2>
                  </div>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed font-inter transition-colors">{type.description}</p>
                </div>

                <ul className="space-y-6 py-10 border-y border-slate-100 dark:border-white/5 transition-colors">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-5 text-slate-600 dark:text-slate-400 text-base font-bold font-inter">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-white/5 ${type.accent} dark:text-primary-light transition-colors`}>
                        <CheckCircle size={18} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/${locale}/register/${type.id}`}
                  className="btn-premium flex items-center justify-between w-full p-8 bg-slate-50 dark:bg-white/5 group-hover:bg-primary group-hover:text-white transition-all duration-700 font-black uppercase tracking-[0.2em] text-xs group/btn rounded-[1.5rem] border border-transparent dark:border-white/5"
                >
                  {isFR ? 'Commencer l\'inscription' : 'Start registration'}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 bg-white dark:bg-secondary shadow-sm group-hover/btn:translate-x-1 group-hover/btn:scale-110 ${type.accent} dark:text-primary-light`}>
                    <ArrowRight size={24} strokeWidth={3} />
                  </div>
                </Link>
              </div>
              
              {/* Subtle Decorative Icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none">
                 <type.icon size={260} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 text-center py-12 px-12 bg-white dark:bg-secondary rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-900/5 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 transition-colors duration-500"
        >
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[11px]">
            <Award size={22} className="text-primary dark:text-primary-light" strokeWidth={2.5} />
            <span>Plateforme Officielle AES-256 certifiée</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-100 dark:bg-white/10" />
          <p className="font-bold text-slate-500 dark:text-slate-400 text-lg font-inter transition-colors">
            {isFR 
              ? 'Déjà membre du réseau ? ' 
              : 'Already part of the network? '}
            <Link href={`/${locale}/login`} className="text-primary dark:text-primary-light hover:text-primary-dark font-black ml-2 transition-colors uppercase tracking-[0.1em]">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
