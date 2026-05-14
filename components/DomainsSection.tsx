"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Droplets, 
  FlaskConical, 
  Waves, 
  Mountain, 
  Fish, 
  Activity, 
  Building2, 
  Zap, 
  ShieldAlert, 
  Search,
  HardHat,
  ArrowRight
} from 'lucide-react';

interface DomainsSectionProps {
  locale: string;
}

export const DomainsSection = ({ locale }: DomainsSectionProps) => {
  const isFR = locale === 'fr';

  const domains = [
    { name: "Hydrobiologie", icon: <Fish className="w-6 h-6" /> },
    { name: "Qualité de l'eau", icon: <FlaskConical className="w-6 h-6" /> },
    { name: "Hydrologie", icon: <Waves className="w-6 h-6" /> },
    { name: "Hydrogéologie", icon: <Mountain className="w-6 h-6" /> },
    { name: "Ingénierie fluviale", icon: <HardHat className="w-6 h-6" /> },
    { name: "Sciences aquacoles", icon: <Droplets className="w-6 h-6" /> },
    { name: "Suivi des barrages", icon: <Building2 className="w-6 h-6" /> },
    { name: "Approvisionnement en eau", icon: <Droplets className="w-6 h-6" /> },
    { name: "Assainissement liquide", icon: <Activity className="w-6 h-6" /> },
    { name: "Station de pompage", icon: <Zap className="w-6 h-6" /> },
    { name: "Luttes contre les pollutions", icon: <ShieldAlert className="w-6 h-6" /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#84c340] font-bold uppercase tracking-widest text-sm">
              {isFR ? "Notre Expertise" : "Our Expertise"}
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              {isFR ? "Domaines d'expertise..." : "Areas of expertise..."}
            </h2>
            <p className="text-[#595959] text-lg">
              {isFR 
                ? "Un spectre complet de compétences pour couvrir tous les aspects de la gestion de l'eau au Cameroun."
                : "A full spectrum of skills to cover all aspects of water management in Cameroon."}
            </p>
          </div>
          <Link 
            href={`/${locale}/about`}
            className="flex items-center gap-2 text-[#34b4e2] font-bold hover:gap-4 transition-all group"
          >
            {isFR ? "En savoir plus" : "Learn More"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-[#34b4e2] hover:text-white transition-all duration-300 group cursor-default shadow-sm hover:shadow-lg"
            >
              <div className="mb-4 p-3 bg-white text-[#34b4e2] rounded-xl w-fit group-hover:scale-110 transition-transform">
                {domain.icon}
              </div>
              <h3 className="text-lg font-bold leading-snug">
                {domain.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
