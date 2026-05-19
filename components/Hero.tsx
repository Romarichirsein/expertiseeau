"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
  locale: string;
}

const HERO_IMAGES = [
  '/images/hero/9af95fe4ad0e14c79cde86fedcdb4edc.jpg',
  '/images/hero/ea07a4f5b6758653e7196e1c8dd04b80.jpg',
  '/images/hero/1fd8ba2f8c8f5401d79b44a8cb0c3184.jpg',
  '/images/hero/9ee6dc8d38695f8a3da7738065e764ae.jpg',
  '/images/hero/10557dd0e7e95b9714902731c5adae11.jpg',
  '/images/hero/8f63f1e8b74488dff4037d3c8d52997b.jpg',
];

export const Hero = ({ locale }: HeroProps) => {
  const isFR = locale === 'fr';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-[#1b3b6f]">
      {/* Background Images Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: 1.02 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImageIndex]})` }}
          />
        </AnimatePresence>
      </div>

      {/* Blue Overlay (Subtle and opacity-adjusted) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#2794e8]/85 via-[#2794e8]/75 to-transparent mix-blend-multiply opacity-90" />
      <div className="absolute inset-0 z-10 bg-[#2794e8]/45" />

      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 z-20 opacity-15">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-repeat" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <div className="container relative z-30 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              {isFR ? "“Les experts de l'eau," : "“Water experts,"} <br />
              <span className="text-white drop-shadow-sm">
                {isFR ? "partageons et mutualisons nos compétences!”" : "let's share and pool our skills!”"}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto font-light drop-shadow-sm">
              {isFR 
                ? "Le Réseau National des Experts Eaux au Cameroun. Unissant les compétences pour un avenir durable."
                : "The National Network of Water Experts in Cameroon. Uniting skills for a sustainable future."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/${locale}/login`} 
                  className="px-8 py-4 bg-white text-[#2794e8] font-bold rounded-full shadow-xl hover:bg-[#84c340] hover:text-white transition-all inline-block"
                >
                  {isFR ? "Connexion" : "Login"}
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/${locale}/register`} 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all inline-block"
                >
                  {isFR ? "S'inscrire au réseau" : "Join the network"}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Blurs */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-white/5 rounded-full blur-3xl -mb-20 -mr-20 z-20" />
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-white/5 rounded-full blur-3xl -mt-20 -ml-20 z-20" />
    </section>
  );
};
