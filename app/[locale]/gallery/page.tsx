"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Filter, Camera } from 'lucide-react';

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
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="expert-badge mb-4">{isFR ? 'Ressources Visuelles' : 'Visual Resources'}</span>
            <h1 className="page-title">{isFR ? 'Galerie Photo' : 'Photo Gallery'}</h1>
            <p className="page-subtitle">
              {isFR 
                ? 'Découvrez en images les infrastructures hydrauliques et les interventions techniques sur le terrain à travers le Cameroun.'
                : 'Discover through images the hydraulic infrastructures and technical field interventions across Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Categories Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '10px', color: '#0a5694' }}>
            <Filter size={20} />
          </div>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#0a5694' : '#e8ecf0',
                backgroundColor: selectedCategory === cat ? '#0a5694' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#64748b',
                fontWeight: 700,
                fontSize: '14px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                boxShadow: selectedCategory === cat ? '0 4px 12px rgba(10, 86, 148, 0.2)' : 'none'
              }}
            >
              {isFR && cat === 'All' ? 'Toutes' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0'
                }}
                className="group gallery-item"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="group-hover:scale-110"
                  alt={img.title}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  padding: '24px',
                }} className="group-hover:opacity-100">
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{img.category}</span>
                  <span style={{ fontSize: '16px', color: '#fff', fontWeight: 700 }}>{img.title}</span>
                  <div style={{ position: 'absolute', top: '24px', right: '24px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Maximize2 size={20} />
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
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              backgroundColor: 'rgba(6, 32, 64, 0.95)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button style={{ position: 'absolute', top: '40px', right: '40px', background: 'none', border: 'none', color: '#fff', opacity: 0.6, cursor: 'pointer' }}>
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: 'relative',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '100%',
                aspectRatio: '16/9',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                backgroundColor: '#000'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={selectedImage.title} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 800 }}>{selectedImage.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
