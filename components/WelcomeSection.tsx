"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeSectionProps {
  locale: string;
}

export const WelcomeSection = ({ locale }: WelcomeSectionProps) => {
  const isFR = locale === 'fr';

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6"
          >
            <span className="text-[#34b4e2] font-bold uppercase tracking-widest text-sm">
              {isFR ? "Plateforme Nationale" : "National Platform"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#292929]">
              {isFR ? "Bienvenue!" : "Welcome!"}
            </h2>
            <p className="text-xl text-[#595959] leading-relaxed italic">
              {isFR 
                ? "“L’eau est une ressource finie, rare et dont la mobilisation nécessite des ressources et une solidarité de tout temps.”"
                : "“Water is a finite, rare resource, the mobilization of which requires resources and constant solidarity.”"}
            </p>
            <div className="h-1 w-20 bg-[#84c340] rounded-full" />
            <p className="text-[#595959] text-lg">
              {isFR
                ? "Expertise au Cameroun est le carrefour de l'excellence hydrique. Nous rassemblons les cerveaux les plus brillants pour relever les défis de demain."
                : "Expertise in Cameroon is the crossroads of water excellence. We bring together the brightest minds to meet tomorrow's challenges."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/treatment.jpg" 
                alt="Water Resource" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-[#34b4e2]/10 rounded-2xl -z-0" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#84c340] rounded-lg -z-0 blur-2xl opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
