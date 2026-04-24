"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Target, Globe, Users, Droplets, MapPin, 
  Building2, CheckCircle, Award, BookOpen, ChevronRight, 
  History, Heart, Zap, Star
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const values = [
    { title: isFR ? 'Intégrité' : 'Integrity', description: isFR ? 'Une éthique professionnelle rigoureuse au service du secteur de l\'eau.' : 'Rigorous professional ethics at the service of the water sector.', icon: ShieldCheck, color: 'blue' },
    { title: isFR ? 'Excellence' : 'Excellence', description: isFR ? 'Valoriser l\'expertise de pointe pour des solutions durables.' : 'Valuing cutting-edge expertise for sustainable solutions.', icon: Target, color: 'emerald' },
    { title: isFR ? 'Impact' : 'Impact', description: isFR ? 'Améliorer l\'accès à l\'eau pour toutes les populations camerounaises.' : 'Improving access to water for all Cameroonian populations.', icon: Star, color: 'indigo' },
  ];

  return (
    <div className="pb-32 bg-slate-50/50 min-h-screen font-inter">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-[#0a5694] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent" />
        
        <div className="container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
              <History size={14} />
              {isFR ? 'Notre Mission & Vision' : 'Our Mission & Vision'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-outfit">
              {isFR ? 'À propos du Réseau des Experts' : 'About the Experts Network'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90 font-medium">
              {isFR 
                ? 'Une plateforme institutionnelle dédiée à la valorisation des compétences camerounaises pour relever les défis stratégiques du secteur de l\'eau.'
                : 'An institutional platform dedicated to promoting Cameroonian skills to meet the strategic challenges of the water sector.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-6 -mt-16 relative z-20">
        {/* MAIN CONTENT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200 p-8 md:p-16 mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 text-[#0a5694] font-bold text-xs uppercase tracking-widest mb-4">
                 <Building2 size={16} />
                 Expertiseaucameroun.org
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight font-outfit">
                {isFR ? 'Une Initiative Stratégique Nationale' : 'A National Strategic Initiative'}
              </h2>
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {isFR 
                    ? 'Ce projet est une initiative stratégique financée par le Fonds de Solidarité pour les Projets Innovants (FSPI) de l\'Ambassade de France et la Délégation de l\'Union Européenne au Cameroun.'
                    : 'This project is a strategic initiative funded by the Solidarity Fund for Innovative Projects (FSPI) of the French Embassy and the EU Delegation in Cameroon.'}
                </p>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {isFR 
                    ? 'Exécuté par l\'AFD (Agence Française de Développement), il vise à structurer l\'expertise nationale pour garantir une gestion durable et performante des ressources hydrauliques du pays.'
                    : 'Executed by the AFD (French Development Agency), it aims to structure national expertise to ensure sustainable and high-performance management of the country\'s hydraulic resources.'}
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle, text: isFR ? 'Centralisation de l\'expertise' : 'Expertise centralization' },
                  { icon: CheckCircle, text: isFR ? 'Valorisation des talents' : 'Talent promotion' },
                  { icon: CheckCircle, text: 'Mise en réseau nationale', text: isFR ? 'Mise en réseau nationale' : 'National networking' },
                  { icon: CheckCircle, text: 'Certification des profils', text: isFR ? 'Certification des profils' : 'Profile certification' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="text-emerald-500">
                       <item.icon size={20} />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Users, count: '960+', label: isFR ? 'Experts' : 'Experts', color: 'blue' },
                { icon: Building2, count: '25+', label: isFR ? 'Institutions' : 'Institutions', color: 'emerald' },
                { icon: Award, count: '14+', label: isFR ? 'Domaines' : 'Fields', color: 'violet' },
                { icon: BookOpen, count: '150+', label: isFR ? 'Publications' : 'Publications', color: 'amber' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col items-center text-center group hover:border-[#0a5694]/20 hover:bg-white hover:shadow-xl transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform ${
                    stat.color === 'blue' ? 'bg-blue-100 text-[#0a5694]' :
                    stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    stat.color === 'violet' ? 'bg-violet-100 text-violet-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <stat.icon size={28} />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1 font-outfit">{stat.count}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* VALEURS SECTION */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
              <Heart size={14} />
              {isFR ? 'Nos Valeurs' : 'Our Values'}
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
              {isFR ? 'Ce qui anime notre action' : 'What drives our action'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform ${
                  v.color === 'blue' ? 'bg-blue-50 text-[#0a5694]' :
                  v.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-indigo-50 text-indigo-600'
                }`}>
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4 font-outfit">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VISION CTA */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-center shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12">
            <Zap size={240} className="text-white" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-outfit">
              {isFR ? 'Une vision partagée pour l\'avenir' : 'A shared vision for the future'}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
              {isFR 
                ? 'Rejoignez une communauté d\'élite et contribuez activement au développement de solutions hydrauliques innovantes au Cameroun.'
                : 'Join an elite community and actively contribute to developing innovative hydraulic solutions in Cameroon.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href={`/${locale}/register/resident`} className="px-10 py-5 bg-[#0a5694] text-white rounded-2xl font-extrabold hover:bg-blue-700 transition-all shadow-xl shadow-blue-950/20 text-lg">
                {isFR ? 'Rejoindre le Réseau' : 'Join the Network'}
              </Link>
              <Link href={`/${locale}/contact`} className="px-10 py-5 bg-white/10 text-white rounded-2xl font-extrabold border border-white/10 hover:bg-white/20 transition-all text-lg backdrop-blur-sm">
                {isFR ? 'Nous contacter' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
