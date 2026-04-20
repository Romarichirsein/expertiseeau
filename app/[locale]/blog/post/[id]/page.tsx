"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Tag, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = React.use(params);
  const { locale, id } = resolvedParams;
  
  const isFR = locale === 'fr';
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
          // If it's a mock ID, or not found, try to find in mock data
          const mockPosts = [
            {
              id: 'mock-1',
              title: "Le Cameroun face aux défis du stress hydrique en 2025",
              excerpt: "Analyse des récentes données pluviométriques et des stratégies de résilience pour les zones urbaines.",
              content: "Le stress hydrique devient une réalité préoccupante pour de nombreuses villes camerounaises. Avec le changement climatique, la périodicité des pluies a été perturbée, affectant la recharge des nappes phréatiques. Cet article explore les solutions d'ingénierie verte et la gestion intégrée des ressources en eau (GIRE) comme moyens de mitigation...",
              created_at: "2025-04-14T10:00:00Z",
              author: "Dr. Fonkoua",
              category: "Analyse",
              image_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
            }
          ];
          const foundMock = mockPosts.find(p => p.id === id);
          if (foundMock) setPost(foundMock);
        } else {
          setPost(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Navigation */}
      <Link 
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        <ArrowLeft size={16} />
        {isFR ? 'Retour au blog' : 'Back to blog'}
      </Link>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <Tag size={12} />
          {post.category}
        </div>
        <h1 className="text-4xl md:text-6xl font-outfit font-bold leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium pb-4 border-b border-border">
          <div className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US')}</div>
          <div className="flex items-center gap-2"><User size={18} className="text-primary" /> {post.author}</div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative">
        <img 
          src={post.image_url} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={post.title} 
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-outfit prose-headings:font-bold prose-p:leading-relaxed text-muted-foreground">
        <p className="text-xl font-medium text-foreground mb-10 leading-relaxed italic border-l-4 border-primary pl-6">
          {post.excerpt}
        </p>
        <div className="space-y-6">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
          ) : (
            <p>{isFR ? "Contenu en cours de rédaction..." : "Content being written..."}</p>
          )}
        </div>
      </div>

      {/* Footer / Share */}
      <div className="pt-10 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-2xl font-bold text-sm hover:bg-primary/10 hover:text-primary transition-all">
            <Share2 size={18} />
            {isFR ? 'Partager' : 'Share'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{isFR ? 'Mots clés :' : 'Keywords:'}</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-[10px] font-bold">Hydrologie</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-[10px] font-bold">Cameroun</span>
        </div>
      </div>
    </div>
  );
}
