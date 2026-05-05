"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, X, Filter, Camera, Image as ImageIcon, 
  ChevronRight, SearchX, Sparkles, Zap, Globe, Share2, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* PREMIUM HERO SECTION */}
      <div className="bg-slate-900 pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <Camera size={18} strokeWidth={2.5} />
              {isFR ? 'Archive Visuelle du Secteur' : 'Visual Sector Archive'}
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight font-outfit leading-[0.9] uppercase">
              {isFR ? 'Galerie ' : 'Media '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'Médias' : 'Gallery'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-2xl mx-auto font-inter leading-relaxed">
              {isFR 
                ? 'Une immersion visuelle dans les infrastructures et les interventions techniques qui transforment l\'accès à l\'eau.'
                : 'A visual immersion into the infrastructures and technical interventions transforming water access.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-6 -mt-16 md:-mt-24 relative z-20 max-w-7xl mx-auto">
        {/* Categories Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="rounded-[3.5rem] border-white/20 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner border border-primary/20 shrink-0">
              <Filter size={32} strokeWidth={2.5} />
            </div>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {galleryCategories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "premium" : "outline"}
                  className={`h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl ${
                    selectedCategory === cat ? "shadow-primary/20 scale-105" : "bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 text-muted-foreground"
                  }`}
                >
                  {isFR && cat === 'All' ? 'Archives Complètes' : cat}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredImages.length > 0 ? filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <Card 
                  className="group relative aspect-[4/5] rounded-[4rem] overflow-hidden cursor-pointer border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-700 p-0 border-none"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.url} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0"
                    alt={img.title}
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&u=${img.id}`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12">
                    <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700 space-y-3">
                      <span className="text-[11px] font-black text-primary-light uppercase tracking-[0.4em] mb-2 block">{img.category}</span>
                      <h3 className="text-4xl font-black text-white leading-tight font-outfit uppercase tracking-tight">{img.title}</h3>
                    </div>
                    
                    <div className="absolute top-12 right-12 w-16 h-16 rounded-[1.8rem] bg-white/20 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-700 shadow-2xl">
                      <Maximize2 size={32} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-primary/40 rounded-[4rem] transition-all duration-700 pointer-events-none" />
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-full py-60 bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-dashed border-white/20 dark:border-white/10 text-center flex flex-col items-center justify-center space-y-10 shadow-2xl transition-colors duration-500 px-10">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-white/50 dark:bg-white/5 flex items-center justify-center text-muted-foreground/20 shadow-inner border border-white/20">
                   <SearchX size={64} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-4">
                   <h3 className="text-3xl font-black text-foreground font-outfit uppercase tracking-tight">
                     {isFR ? "Aucune Archive Disponible" : "No Archives Available"}
                   </h3>
                   <p className="text-xl text-muted-foreground font-medium max-w-md mx-auto">
                     {isFR ? "Nous n'avons pas trouvé de médias pour cette catégorie stratégique." : "We couldn't find any media for this strategic category."}
                   </p>
                 </div>
                 <Button variant="premium" onClick={() => setSelectedCategory('All')} className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs">
                    {isFR ? 'Retour aux archives complètes' : 'Back to full archives'}
                 </Button>
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
            className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <Button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-12 right-12 w-16 h-16 rounded-2xl bg-white/5 text-white hover:bg-primary transition-all border border-white/10 shadow-2xl group z-50 p-0"
            >
              <X size={36} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
            </Button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center gap-14"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[75vh] rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 shadow-slate-950/50 group">
                <img 
                  src={selectedImage.url} 
                  className="w-full h-full object-contain" 
                  alt={selectedImage.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200';
                  }}
                />
                
                {/* Image Actions Overlay */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <Button variant="premium" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest gap-3 shadow-2xl">
                    <Download size={20} />
                    {isFR ? 'Télécharger' : 'Download'}
                  </Button>
                  <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-white/10 text-white border-white/20 gap-3 backdrop-blur-xl">
                    <Share2 size={20} />
                    {isFR ? 'Partager' : 'Share'}
                  </Button>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight font-outfit uppercase leading-tight">{selectedImage.title}</h3>
                <div className="flex items-center justify-center gap-8">
                  <div className="px-6 py-2.5 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30">
                    {selectedImage.category}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 font-black text-[11px] uppercase tracking-[0.4em]">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    {isFR ? 'ARCHIVE CERTIFIÉE' : 'CERTIFIED ARCHIVE'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShieldCheck({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
