"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserCheck, Globe, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function RegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const benefits = [
    {
      title: isFR ? 'Visibilité Nationale' : 'National Visibility',
      desc: isFR ? 'Rejoignez le répertoire officiel des experts du secteur de l\'eau.' : 'Join the official directory of water sector experts.',
      icon: UserCheck
    },
    {
      title: isFR ? 'Réseautage' : 'Networking',
      desc: isFR ? 'Connectez-vous avec d\'autres professionnels et institutions.' : 'Connect with other professionals and institutions.',
      icon: Zap
    },
    {
      title: isFR ? 'Opportunités' : 'Opportunities',
      desc: isFR ? 'Accédez à des appels d\'offres et des projets gouvernementaux.' : 'Access tenders and government projects.',
      icon: CheckCircle2
    }
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Devenir un Expert' : 'Become an Expert'} 
        breadcrumbs={[{ label: isFR ? 'Inscription' : 'Registration' }]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header text */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              {isFR ? 'Choisissez votre catégorie d\'expertise' : 'Choose your expertise category'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isFR 
                ? 'Sélectionnez le type d\'inscription qui correspond à votre situation géographique actuelle pour commencer.' 
                : 'Select the registration type that matches your current geographical situation to begin.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Resident Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-[#34b4e2]/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-[#34b4e2]/10 transition-colors" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ShieldCheck size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-gray-900">Experts Résidents</h3>
                  <p className="text-[#34b4e2] font-semibold italic">« Vous êtes camerounais et vous vivez au Cameroun »</p>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  Inscrivez-vous en tant qu'expert exerçant sur le territoire national. Bénéficiez d'une visibilité directe auprès des institutions locales.
                </p>
                <Link href={`/${locale}/register/resident`} className="block">
                  <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md group-hover:shadow-lg flex items-center justify-center gap-2">
                    {isFR ? 'Enregistrez-vous' : 'Register now'}
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <Zap size={18} />
                    </motion.span>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Diaspora Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-[#34b4e2]/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#292929]/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-[#292929]/10 transition-colors" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-[#292929] text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-gray-900">Experts Diaspora</h3>
                  <p className="text-gray-400 font-semibold italic">« Vous êtes camerounais et vous vivez hors du Cameroun »</p>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  Mettez vos compétences internationales au service du développement du Cameroun. Rejoignez le réseau de la diaspora active.
                </p>
                <Link href={`/${locale}/register/diaspora`} className="block">
                  <button className="w-full bg-[#292929] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-md group-hover:shadow-lg flex items-center justify-center gap-2">
                    {isFR ? 'Enregistrez-vous' : 'Register now'}
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <Zap size={18} />
                    </motion.span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-center mb-12">
              {isFR ? 'Pourquoi rejoindre la plateforme ?' : 'Why join the platform?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center space-y-4 group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <benefit.icon size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
