"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostClient({ locale, post }: { locale: string; post: any }) {
  const isFR = locale === 'fr';

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
