"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Globe, ArrowRight } from 'lucide-react';

interface ExpertSectionProps {
  locale: string;
}

export const ExpertSection = ({ locale }: ExpertSectionProps) => {
  const isFR = locale === 'fr';

  const experts = [
    {
      title: isFR ? "Experts Résident" : "Resident Experts",
      description: isFR ? "« Vous êtes camerounais et vous vivez au cameroun »" : "« You are Cameroonian and you live in Cameroon »",
      icon: <MapPin className="w-8 h-8 text-[#34b4e2]" />,
      image: "/images/expert-resident.jpg",
      link: `/${locale}/register`,
      accent: "border-[#34b4e2]"
    },
    {
      title: isFR ? "Experts Diaspora" : "Diaspora Experts",
      description: isFR ? "« Vous êtes camerounais et vous vivez hors du cameroun »" : "« You are Cameroonian and you live outside Cameroon »",
      icon: <Globe className="w-8 h-8 text-[#84c340]" />,
      image: "/images/expert-diaspora.jpg",
      link: `/${locale}/register`,
      accent: "border-[#84c340]"
    }
  ];

  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">{isFR ? "Rejoignez le Réseau" : "Join the Network"}</h2>
          <p className="text-[#595959] text-lg">
            {isFR 
              ? "Que vous soyez sur le territoire national ou à l'étranger, votre expertise est précieuse pour le développement du secteur de l'eau au Cameroun."
              : "Whether you are on national territory or abroad, your expertise is valuable for the development of the water sector in Cameroon."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {experts.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl border-t-4 ${expert.accent}`}
            >
              <div className="flex flex-col h-full">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={expert.image} 
                    alt={expert.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex-grow space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl">
                      {expert.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#292929]">{expert.title}</h3>
                  </div>
                  <p className="text-[#595959] text-lg italic leading-relaxed">
                    {expert.description}
                  </p>
                  <div className="pt-4">
                    <Link 
                      href={expert.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#292929] text-white rounded-xl font-bold hover:bg-[#34b4e2] transition-colors group/btn"
                    >
                      {isFR ? "Enregistrez vous" : "Register now"}
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
