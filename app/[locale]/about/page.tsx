"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Globe, Users, Droplets, MapPin, Building2, CheckCircle2, Award, BookOpen, ChevronRight, History, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const values = [
    { title: isFR ? 'Intégrité' : 'Integrity', description: isFR ? 'Une éthique professionnelle rigoureuse au service du secteur de l\'eau.' : 'Rigorous professional ethics at the service of the water sector.', icon: ShieldCheck, color: '#0ea5e9' },
    { title: isFR ? 'Excellence' : 'Excellence', description: isFR ? 'Valoriser l\'expertise de pointe pour des solutions durables.' : 'Valuing cutting-edge expertise for sustainable solutions.', icon: Target, color: '#10b981' },
    { title: isFR ? 'Impact' : 'Impact', description: isFR ? 'Améliorer l\'accès à l\'eau pour toutes les populations camerounaises.' : 'Improving access to water for all Cameroonian populations.', icon: Globe, color: '#6366f1' },
  ];

  return (
    <div className="pb-20 bg-[#f8fafc] min-h-screen">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a5694] via-[#0d7ac7] to-[#0d9488] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8fafc] to-transparent" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-md border border-white/30">
              <History size={16} />
              {isFR ? 'Notre Histoire & Vision' : 'Our History & Vision'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {isFR ? 'À propos du Réseau des Experts' : 'About the Experts Network'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90">
              {isFR 
                ? 'Une plateforme institutionnelle dédiée à la valorisation des compétences camerounaises pour relever les défis du secteur de l\'eau.'
                : 'An institutional platform dedicated to the promotion of Cameroonian skills to meet the challenges of the water sector.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container -mt-12 relative z-20">
        {/* MAIN CONTENT CARD */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
                {isFR ? 'Expertiseaucameroun.org' : 'Expertiseaucameroun.org'}
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isFR 
                    ? 'Ce projet est une initiative stratégique financée par le Fonds de Solidarité pour les Projets Innovants (FSPI) de l\'Ambassade de France et la Délégation de l\'Union Européenne au Cameroun.'
                    : 'This project is a strategic initiative funded by the Solidarity Fund for Innovative Projects (FSPI) of the French Embassy and the EU Delegation in Cameroon.'}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isFR 
                    ? 'Exécuté par l\'AFD (Agence Française de Développement), il vise à structurer l\'expertise nationale pour garantir une gestion durable et performante des ressources hydrauliques du pays.'
                    : 'Executed by the AFD (French Development Agency), it aims to structure national expertise to ensure sustainable and high-performance management of the country\'s hydraulic resources.'}
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle2, text: isFR ? 'Centralisation de l\'expertise' : 'Expertise centralization' },
                  { icon: CheckCircle2, text: isFR ? 'Valorisation des talents' : 'Talent promotion' },
                  { icon: CheckCircle2, text: isFR ? 'Mise en réseau nationale' : 'National networking' },
                  { icon: CheckCircle2, text: isFR ? 'Certification des profils' : 'Profile certification' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-800">
                    <item.icon size={20} className="text-teal-500" />
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
                { icon: Users, count: '960+', label: isFR ? 'Experts' : 'Experts', color: '#0ea5e9' },
                { icon: Building2, count: '25+', label: isFR ? 'Institutions' : 'Institutions', color: '#10b981' },
                { icon: Award, count: '14+', label: isFR ? 'Domaines' : 'Fields', color: '#6366f1' },
                { icon: BookOpen, count: '150+', label: isFR ? 'Publications' : 'Publications', color: '#f59e0b' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center group hover:border-[#0a5694]/20 transition-all shadow-sm">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                  >
                    <stat.icon size={28} />
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.count}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* VALEURS SECTION */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-xs font-black uppercase tracking-widest mb-4">
              <Heart size={14} />
              {isFR ? 'Nos Valeurs' : 'Our Values'}
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
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
                className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${v.color}15`, color: v.color }}
                >
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-4">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VISION CTA */}
        <div className="mt-24 bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Zap size={200} className="text-white" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
              {isFR ? 'Une vision partagée pour l\'avenir' : 'A shared vision for the future'}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {isFR 
                ? 'Rejoignez une communauté dynamique et contribuez activement au développement de solutions hydrauliques innovantes au Cameroun.'
                : 'Join a dynamic community and actively contribute to the development of innovative hydraulic solutions in Cameroon.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/${locale}/register/resident`} className="px-8 py-4 bg-[#0a5694] text-white rounded-xl font-extrabold hover:scale-105 transition-all">
                {isFR ? 'Devenir membre' : 'Become a member'}
              </Link>
              <Link href={`/${locale}/contact`} className="px-8 py-4 bg-white/10 text-white rounded-xl font-extrabold border border-white/10 hover:bg-white/20 transition-all">
                {isFR ? 'Nous contacter' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
