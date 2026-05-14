"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GallerySectionProps {
  locale: string;
}

export const GallerySection = ({ locale }: GallerySectionProps) => {
  const isFR = locale === 'fr';

  const galleryItems = [
    { src: "/images/gallery/1-1.jpg", title: isFR ? "Forage" : "Drilling" },
    { src: "/images/gallery/2-1.jpg", title: isFR ? "Château d'eau" : "Water tower" },
    { src: "/images/gallery/3.jpg", title: isFR ? "Pompe à eau" : "Water pump" },
    { src: "/images/gallery/4.jpg", title: isFR ? "Château d'eau" : "Water tower" },
    { src: "/images/gallery/5.jpg", title: isFR ? "Forage" : "Drilling" },
    { src: "/images/gallery/6.jpg", title: isFR ? "Château d'eau" : "Water tower" },
    { src: "/images/gallery/7.jpg", title: isFR ? "Panneau solaire" : "Solar panel" },
    { src: "/images/treatment.jpg", title: isFR ? "Traitement des eaux" : "Water treatment" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#34b4e2] font-bold uppercase tracking-widest text-sm">
            {isFR ? "Notre Galerie" : "Our Gallery"}
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            {isFR ? "Nos réalisations" : "Our realizations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
