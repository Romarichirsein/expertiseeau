"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Filter, Camera, Image as ImageIcon, ChevronRight, SearchX } from 'lucide-react';

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
    <div className="pb-32 bg-slate-50/50 min-h-screen font-inter">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-[#0a5694] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent" />
        
        <div className="container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
              <Camera size={14} />
              {isFR ? 'Ressources Visuelles' : 'Visual Resources'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-outfit">
              {isFR ? 'Galerie Photo & Médias' : 'Photo & Media Gallery'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90 font-medium">
              {isFR 
                ? 'Découvrez les infrastructures et les interventions techniques qui transforment le secteur de l\'eau au Cameroun.'
                : 'Discover the infrastructures and technical interventions transforming the water sector in Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-6 -mt-12 relative z-20">
        {/* Categories Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] p-4 shadow-xl shadow-blue-900/5 border border-slate-200 flex items-center gap-4 mb-16 flex-wrap"
        >
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a5694] border border-slate-100 shrink-0">
            <Filter size={20} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-[#0a5694] text-white border-[#0a5694] shadow-lg shadow-blue-900/10' 
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-slate-300'
                }`}
              >
                {isFR && cat === 'All' ? 'Toutes les photos' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredImages.length > 0 ? filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden cursor-pointer bg-white shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={img.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&u=${img.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2 block">{img.category}</span>
                    <h3 className="text-xl font-extrabold text-white leading-tight font-outfit">{img.title}</h3>
                  </div>
                  <div className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-40 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center flex flex-col items-center">
                 <SearchX size={48} className="text-slate-200 mb-4" />
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                   {isFR ? "Aucune image trouvée" : "No images found"}
                 </p>
              </div>
            )}
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
            className="fixed inset-0 z-[2000] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 shadow-2xl">
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-6xl w-full flex flex-col items-center justify-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 shadow-blue-900/20">
                <img 
                  src={selectedImage.url} 
                  className="w-full h-full object-contain" 
                  alt={selectedImage.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200';
                  }}
                />
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-outfit">{selectedImage.title}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="px-5 py-2 rounded-xl bg-[#0a5694] text-white text-[10px] font-extrabold uppercase tracking-widest border border-blue-400/20">
                    {selectedImage.category}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span className="text-slate-400 font-bold text-sm tracking-wide">Expertise Au Cameroun</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
