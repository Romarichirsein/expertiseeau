"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PartnersSectionProps {
  locale: string;
}

export const PartnersSection = ({ locale }: PartnersSectionProps) => {
  const isFR = locale === 'fr';

  const partners = [
    { name: "UNESCO", src: "/images/partners/unesco.png" },
    { name: "MINEE", src: "/images/partners/minee.png" },
    { name: "France", src: "/images/partners/france.png" },
    { name: "UN Water", src: "/images/partners/un-water.png" },
    { name: "GWP", src: "/images/partners/gwp.png" },
    { name: "EU", src: "/images/partners/eu.jpg" },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto">
        <h3 className="text-center text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-12">
          {isFR ? "Ils nous font confiance" : "They trust us"}
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 hover:opacity-100 transition-opacity">
          {partners.map((partner, index) => (
            <motion.img
              key={index}
              src={partner.src}
              alt={partner.name}
              className="h-12 md:h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
