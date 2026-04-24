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
    <div className="min-h-screen bg-slate-50/50 py-32 relative overflow-hidden font-inter">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-teal-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-6xl">
        <div className="text-center space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 rounded-2xl bg-white shadow-xl shadow-blue-900/5 text-[#0a5694] mb-4 border border-slate-100"
          >
            <UserPlus size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-outfit"
          >
            {isFR ? 'Rejoignez l\'Expertise' : 'Join the Network'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {isFR 
              ? 'Choisissez le profil qui correspond à votre situation pour commencer votre parcours dans le réseau national certifié.'
              : 'Choose the profile that matches your situation to start your journey in the certified national network.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative z-10 space-y-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <type.icon size={32} />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${type.accent}`}>{type.subtitle}</span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">{type.title}</h2>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">{type.description}</p>
                </div>

                <ul className="space-y-3 py-2 border-y border-slate-50">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm font-semibold">
                      <CheckCircle size={18} className={type.accent} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/${locale}/register/${type.id}`}
                  className="flex items-center justify-between w-full p-5 bg-slate-50 group-hover:bg-[#0a5694] group-hover:text-white rounded-2xl transition-all duration-300 font-bold text-base group/btn shadow-sm"
                >
                  {isFR ? 'Commencer l\'inscription' : 'Start registration'}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-white shadow-sm group-hover/btn:translate-x-1 ${type.accent}`}>
                    <ArrowRight size={20} />
                  </div>
                </Link>
              </div>
              
              {/* Subtle Decorative Icon */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                 <type.icon size={200} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center py-8 px-8 bg-white rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <Award size={14} className="text-blue-600" />
            <span>Plateforme Officielle certifiée par l&apos;État</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-200" />
          <p className="font-semibold text-slate-500 text-sm">
            {isFR 
              ? 'Déjà membre ? ' 
              : 'Already a member? '}
            <Link href={`/${locale}/login`} className="text-[#0a5694] hover:text-blue-700 font-bold ml-1 transition-colors">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

