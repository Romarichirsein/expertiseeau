"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, ChevronRight, CheckCircle2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterEntryPage({ params: { locale } }: { params: { locale: string } }) {
  const isFR = locale === 'fr';

  const types = [
    {
      id: 'resident',
      title: isFR ? 'Expert Résident' : 'Resident Expert',
      description: isFR 
        ? 'Pour les experts basés au Cameroun travaillant dans le secteur de l\'eau.' 
        : 'For experts based in Cameroon working in the water sector.',
      icon: MapPin,
      color: 'bg-primary',
      features: isFR 
        ? ['Inclusion dans le répertoire national', 'Accès aux opportunités locales', 'Mise en réseau directe']
        : ['Inclusion in the national directory', 'Access to local opportunities', 'Direct networking']
    },
    {
      id: 'diaspora',
      title: isFR ? 'Expert Diaspora' : 'Diaspora Expert',
      description: isFR 
        ? 'Pour les experts de la diaspora camerounaise souhaitant contribuer au secteur.' 
        : 'For Cameroonian diaspora experts wishing to contribute to the sector.',
      icon: Globe,
      color: 'bg-accent-teal',
      features: isFR 
        ? ['Visibilité internationale', 'Partenariats stratégiques', 'Appui technique à distance']
        : ['International visibility', 'Strategic partnerships', 'Remote technical support']
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <UserPlus size={32} />
        </div>
        <h1 className="text-4xl font-bold font-outfit">
          {isFR ? 'Rejoignez le Réseau' : 'Join the Network'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isFR 
            ? 'Choisissez votre profil pour commencer votre inscription et bénéficier de la visibilité auprès des institutions.'
            : 'Choose your profile to start your registration and benefit from visibility with institutions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {types.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-card border border-border rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer overflow-hidden"
          >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${type.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity`}></div>
            
            <div className="relative z-10 space-y-6">
              <div className={`w-14 h-14 rounded-2xl ${type.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                <type.icon size={28} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-outfit group-hover:text-primary transition-colors">{type.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </div>

              <ul className="space-y-3">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-accent-teal" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={`/${locale}/register/${type.id}`}
                className="flex items-center justify-between w-full p-4 bg-secondary group-hover:bg-primary group-hover:text-white rounded-2xl transition-all font-bold group/btn"
              >
                {isFR ? 'Commencer l\'inscription' : 'Start registration'}
                <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center p-8 bg-secondary/50 rounded-3xl border border-dashed border-border">
        <p className="text-sm text-muted-foreground">
          {isFR 
            ? 'Déjà membre ? ' 
            : 'Already a member? '}
          <Link href={`/${locale}/login`} className="text-primary font-bold hover:underline">
            {isFR ? 'Connectez-vous ici' : 'Login here'}
          </Link>
        </p>
      </div>
    </div>
  );
}
