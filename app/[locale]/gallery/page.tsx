"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Filter, Camera, Image as ImageIcon, ChevronRight } from 'lucide-react';

const galleryCategories = [
  'All', 'Drilling', 'Infrastructure', 'Technical', 'Field Operations'
];

const galleryImages = [
  { id: 1, title: 'Drilling Operation', category: 'Drilling', url: '/images/gallery/1-1.jpg' },
  { id: 2, title: 'Water Tower Construction', category: 'Infrastructure', url: '/images/gallery/2-1.jpg' },
  { id: 3, title: 'Maintenance Pump', category: 'Field Operations', url: '/images/gallery/3.jpg' },
  { id: 4, title: 'Reservoir System', category: 'Infrastructure', url: '/images/gallery/4.jpg' },
  { id: 5, title: 'Rig Setup', category: 'Drilling', url: '/images/gallery/5.jpg' },
  { id: 6, title: 'Modern Pump Station', category: 'Infrastructure', url: '/images/gallery/6.jpg' },
  { id: 7, title: 'Solar Energy Panel', category: 'Technical', url: '/images/gallery/7.jpg' },
];

export default function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const filteredImages = galleryImages.filter(img => 
    selectedCategory === 'All' || img.category === selectedCategory
  );

  return (
    <div className="pb-20 bg-[#f8fafc] min-h-screen">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a5694] via-[#0d7ac7] to-[#0d9488] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8fafc] to-transparent" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-md border border-white/30">
              <Camera size={16} />
              {isFR ? 'Ressources Visuelles' : 'Visual Resources'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {isFR ? 'Galerie Photo & Médias' : 'Photo & Media Gallery'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90">
              {isFR 
                ? 'Découvrez les infrastructures et les interventions techniques qui transforment le secteur de l\'eau au Cameroun.'
                : 'Discover the infrastructures and technical interventions transforming the water sector in Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container -mt-8 relative z-20">
        {/* Categories Filter */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 mb-12 flex-wrap">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0a5694] border border-gray-100">
            <Filter size={20} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#0a5694] text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-[#f8fafc] text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {isFR && cat === 'All' ? 'Toutes les photos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all border border-gray-100"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={img.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&u=${img.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-black text-[#7dd3fc] uppercase tracking-[0.2em] mb-2 block">{img.category}</span>
                    <h3 className="text-xl font-extrabold text-white leading-tight">{img.title}</h3>
                  </div>
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-gray-950/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-black">
                <img 
                  src={selectedImage.url} 
                  className="w-full h-full object-contain" 
                  alt={selectedImage.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200';
                  }}
                />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tight">{selectedImage.title}</h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-[#0a5694] text-white text-[10px] font-black uppercase tracking-widest">
                    {selectedImage.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-gray-500 font-bold text-sm">Expertise Au Cameroun</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
