"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Share2, Tag, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const mockBlogPosts = [
  {
    id: 'mock-1',
    title: "Le Cameroun face aux défis du stress hydrique en 2025",
    excerpt: "Analyse des récentes données pluviométriques et des stratégies de résilience pour les zones urbaines.",
    created_at: "2025-04-14T10:00:00Z",
    author: "Dr. Fonkoua",
    category: "Analyse",
    image_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'mock-2',
    title: "Nouveau cadre réglementaire pour le forage privé",
    excerpt: "Ce qu'il faut retenir de la nouvelle circulaire ministérielle sur l'exploitation des nappes phréatiques.",
    created_at: "2025-04-10T10:00:00Z",
    author: "Ing. Ekotto",
    category: "Réglementation",
    image_url: "https://images.unsplash.com/photo-1582719202047-76d3432ee323?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'mock-3',
    title: "Gestion Durable des eaux souterraines au Cameroun",
    excerpt: "Les enjeux de la préservation des ressources aquifères dans le bassin du Logone.",
    created_at: "2025-04-05T10:00:00Z",
    author: "M. Tagne",
    category: "Environnement",
    image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error || !data || data.length === 0) {
          setPosts(mockBlogPosts);
        } else {
          setPosts(data);
        }
      } catch (e) {
        setPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="expert-badge mb-4">{isFR ? 'Chroniques & Actualités' : 'Chronicles & News'}</span>
            <h1 className="page-title">{isFR ? 'Actualités du Secteur' : 'Sector News'}</h1>
            <p className="page-subtitle">
              {isFR 
                ? 'Retrouvez les dernières publications, analyses techniques et régulations du secteur de l\'eau au Cameroun.'
                : 'Find the latest publications, technical analyses and regulations of the water sector in Cameroon.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '20px' }}>
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card group"
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={post.image_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-110" alt={post.title} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '6px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#0a5694', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {post.author}</div>
                  </div>
                  
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', lineHeight: 1.4 }} className="group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                    {post.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href={`/${locale}/blog/${post.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0a5694', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                      {isFR ? 'Lire la suite' : 'Read more'} <ArrowRight size={16} />
                    </Link>
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <div style={{ 
          marginTop: '100px', 
          backgroundColor: '#0a5694', 
          borderRadius: '32px', 
          padding: '60px', 
          color: '#fff', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
              {isFR ? 'Restez informé' : 'Stay informed'}
            </h2>
            <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: 1.6 }}>
              {isFR 
                ? 'Recevez chaque mois les actualités majeures du secteur de l\'eau directement par e-mail.' 
                : 'Receive major water sector news via e-mail every month.'}
            </p>
            <form style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                style={{ flex: 1, padding: '16px 24px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 500 }}
              />
              <button style={{ padding: '16px 32px', backgroundColor: '#fff', color: '#0a5694', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                {isFR ? "S'abonner" : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
