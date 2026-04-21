"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, ChevronRight, CheckCircle2, UserPlus, ArrowRight, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f8fafc] py-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="container relative z-10 max-w-6xl">
        <div className="text-center space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 rounded-[2rem] bg-white shadow-xl shadow-blue-900/5 text-[#0a5694] mb-4 border border-gray-50"
          >
            <UserPlus size={40} strokeWidth={2.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight"
          >
            {isFR ? 'Rejoignez l\'Expertise' : 'Join the Network'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {isFR 
              ? 'Choisissez le profil qui correspond à votre situation actuelle pour commencer votre parcours dans le réseau national.'
              : 'Choose the profile that matches your current situation to start your journey in the national network.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {types.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
              className="group relative bg-white border border-gray-100 rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 space-y-8">
                <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${type.color} text-white flex items-center justify-center shadow-2xl shadow-current/30 group-hover:scale-110 transition-transform duration-500`}>
                  <type.icon size={40} strokeWidth={2.5} />
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${type.accent}`}>{type.subtitle}</span>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{type.title}</h2>
                  </div>
                  <p className="text-gray-500 font-bold text-lg leading-relaxed">{type.description}</p>
                </div>

                <ul className="space-y-4 py-4">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${type.id === 'resident' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                        <CheckCircle2 size={16} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/${locale}/register/${type.id}`}
                  className={`flex items-center justify-between w-full p-6 bg-gray-50 group-hover:bg-gray-900 group-hover:text-white rounded-[2rem] transition-all duration-500 font-black text-lg group/btn shadow-sm`}
                >
                  {isFR ? 'Commencer l\'inscription' : 'Start registration'}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${type.id === 'resident' ? 'bg-blue-600 text-white' : 'bg-teal-500 text-white'} group-hover/btn:translate-x-2 group-hover/btn:bg-white group-hover/btn:text-black`}>
                    <ArrowRight size={24} />
                  </div>
                </Link>
              </div>
              
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                 <type.icon size={250} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center py-10 px-8 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <Award size={16} />
            <span>Plateforme Officielle certifiée par l&apos;État</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-200" />
          <p className="font-bold text-gray-500">
            {isFR 
              ? 'Déjà membre ? ' 
              : 'Already a member? '}
            <Link href={`/${locale}/login`} className="text-[#0a5694] hover:underline underline-offset-4 ml-1">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
