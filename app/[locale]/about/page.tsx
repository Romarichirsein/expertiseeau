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
} from 'lucide-react';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const values = [
    {
      title: isFR ? 'Integrite' : 'Integrity',
      description: isFR
        ? "Une ethique professionnelle exigeante au service du secteur de l'eau."
        : 'Rigorous professional ethics in service of the water sector.',
      icon: ShieldCheck,
      color: 'blue',
    },
    {
      title: isFR ? 'Excellence' : 'Excellence',
      description: isFR
        ? 'Mettre en avant des competences de haut niveau pour des solutions durables.'
        : 'Showcasing high-level expertise for sustainable solutions.',
      icon: Target,
      color: 'emerald',
    },
    {
      title: isFR ? 'Impact' : 'Impact',
      description: isFR
        ? "Contribuer a un meilleur acces a l'eau et a l'assainissement au Cameroun."
        : 'Contributing to better access to water and sanitation in Cameroon.',
      icon: Star,
      color: 'indigo',
    },
  ];

  const pillars = [
    { icon: CheckCircle, text: isFR ? "Centralisation de l'expertise" : 'Expertise centralization' },
    { icon: CheckCircle, text: isFR ? 'Valorisation des talents' : 'Talent promotion' },
    { icon: CheckCircle, text: isFR ? 'Mise en reseau nationale' : 'National networking' },
    { icon: CheckCircle, text: isFR ? 'Certification des profils' : 'Profile certification' },
  ];

  const stats = [
    { icon: Users, count: '960+', label: isFR ? 'Experts' : 'Experts', color: 'blue' },
    { icon: Building2, count: '25+', label: isFR ? 'Institutions' : 'Institutions', color: 'emerald' },
    { icon: Award, count: '14+', label: isFR ? 'Domaines' : 'Fields', color: 'violet' },
    { icon: BookOpen, count: '150+', label: isFR ? 'Publications' : 'Publications', color: 'amber' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-32 font-inter">
      <div className="h-[140px] w-full" />
      <div className="relative overflow-hidden bg-[#0a5694] pb-32 pt-20">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-cover opacity-10 mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/60 to-transparent" />

        <div className="container relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <History size={14} />
              {isFR ? 'Notre mission et notre vision' : 'Our mission and vision'}
            </span>

            <h1 className="mb-6 font-outfit text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {isFR ? 'A propos du reseau des experts' : 'About the experts network'}
            </h1>

            <p className="text-xl font-medium leading-relaxed text-blue-100/95">
              {isFR
                ? "Une plateforme institutionnelle dediee a la structuration, a la mise en valeur et a la connexion des competences camerounaises du secteur de l'eau."
                : 'An institutional platform dedicated to structuring, elevating, and connecting Cameroonian expertise in the water sector.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-20 -mt-16 px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-32 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-blue-900/5 md:p-16"
        >
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a5694]">
                <Building2 size={16} />
                Expertiseaucameroun.org
              </div>

              <h2 className="mb-8 font-outfit text-3xl font-extrabold tracking-tight text-slate-900">
                {isFR ? 'Une initiative strategique nationale' : 'A national strategic initiative'}
              </h2>

              <div className="space-y-6">
                <p className="text-lg font-medium leading-relaxed text-slate-600">
                  {isFR
                    ? "Ce projet est une initiative strategique soutenue par le Fonds de Solidarite pour les Projets Innovants (FSPI), l'Ambassade de France et la Delegation de l'Union europeenne au Cameroun."
                    : 'This project is a strategic initiative supported by the Solidarity Fund for Innovative Projects (FSPI), the French Embassy, and the European Union Delegation in Cameroon.'}
                </p>

                <p className="font-medium leading-relaxed text-slate-500">
                  {isFR
                    ? "Mis en oeuvre avec l'appui de l'AFD, il vise a structurer l'expertise nationale afin de soutenir une gestion durable, fiable et performante des ressources hydrauliques du pays."
                    : 'Implemented with AFD support, it aims to structure national expertise in order to strengthen sustainable, reliable, and high-performing management of the country\'s water resources.'}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {pillars.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="text-emerald-500">
                      <item.icon size={20} />
                    </div>
                    <span>{item.text}</span>
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
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-[2rem] border border-slate-100 bg-slate-50 p-8 text-center transition-all hover:border-[#0a5694]/20 hover:bg-white hover:shadow-xl"
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 ${
                      stat.color === 'blue'
                        ? 'bg-blue-100 text-[#0a5694]'
                        : stat.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-600'
                          : stat.color === 'violet'
                            ? 'bg-violet-100 text-violet-600'
                            : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    <stat.icon size={28} />
                  </div>
                  <div className="font-outfit text-3xl font-extrabold text-slate-900">{stat.count}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="mb-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0a5694]">
              <Heart size={14} />
              {isFR ? 'Nos valeurs' : 'Our values'}
            </span>

            <h2 className="font-outfit text-4xl font-extrabold tracking-tight text-slate-900">
              {isFR ? 'Ce qui guide notre action' : 'What guides our action'}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl shadow-blue-900/5 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 ${
                    value.color === 'blue'
                      ? 'bg-blue-50 text-[#0a5694]'
                      : value.color === 'emerald'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-indigo-50 text-indigo-600'
                  }`}
                >
                  <value.icon size={32} />
                </div>

                <h3 className="mb-4 font-outfit text-xl font-extrabold text-slate-900">{value.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-10 text-center shadow-2xl shadow-blue-900/20 md:p-20">
          <div className="absolute right-0 top-0 rotate-12 p-16 opacity-10">
            <Zap size={240} className="text-white" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 font-outfit text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {isFR ? "Une vision partagee pour l'avenir" : 'A shared vision for the future'}
            </h2>

            <p className="mb-12 text-lg font-medium leading-relaxed text-slate-400">
              {isFR
                ? "Rejoignez une communaute d'experts engages et contribuez a faire emerger des solutions hydrauliques innovantes au Cameroun."
                : 'Join a community of committed experts and help shape innovative water solutions in Cameroon.'}
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link
                href={`/${locale}/register/resident`}
                className="rounded-2xl bg-[#0a5694] px-10 py-5 text-lg font-extrabold text-white shadow-xl shadow-blue-950/20 transition-all hover:bg-blue-700"
              >
                {isFR ? 'Rejoindre le reseau' : 'Join the network'}
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="rounded-2xl border border-white/10 bg-white/10 px-10 py-5 text-lg font-extrabold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {isFR ? 'Nous contacter' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
