"use client";

import React from 'react';
import { Hero } from '@/components/Hero';
import { WelcomeSection } from '@/components/WelcomeSection';
import { ExpertSection } from '@/components/ExpertSection';
import { DomainsSection } from '@/components/DomainsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { GallerySection } from '@/components/GallerySection';
import { PartnersSection } from '@/components/PartnersSection';
import { motion } from 'framer-motion';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <Hero locale={locale} />

      {/* 2. Welcome Section */}
      <WelcomeSection locale={locale} />

      {/* 3. Expert Section (Resident & Diaspora) */}
      <ExpertSection locale={locale} />

      {/* 4. Quote / Call to Action */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            {isFR ? "L'eau est la vie. Nous avons le devoir d'en prendre soin." : "Water is life. We have a duty to take care of it."}
          </motion.h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {isFR 
              ? "Pour que les générations futures puissent en profiter au maximum." 
              : "So that future generations can enjoy it to the fullest."}
          </p>
        </div>
      </section>

      {/* 5. Domains of Expertise */}
      <DomainsSection locale={locale} />

      {/* 6. Avis des Experts (Testimonials) */}
      <TestimonialsSection locale={locale} />

      {/* 7. Notre Galerie (Gallery) */}
      <GallerySection locale={locale} />

      {/* 8. L'eau, source de vie? (Final message) */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">{isFR ? "L'eau, source de vie?" : "Water, source of life?"}</h2>
          <p className="text-lg text-[#595959] leading-relaxed">
            {isFR 
              ? "Prendre soin de l'eau est une priorité majeure sur tout le globe. Rejoignez-nous pour mutualiser nos compétences et assurer un avenir durable."
              : "Taking care of water is a major priority across the globe. Join us to pool our skills and ensure a sustainable future."}
          </p>
        </div>
      </section>

      {/* 9. Partenaires */}
      <PartnersSection locale={locale} />
    </main>
  );
}
