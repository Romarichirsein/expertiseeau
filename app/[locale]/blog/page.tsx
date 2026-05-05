"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, ArrowRight, Share2, Loader2, BookOpen, 
  Newspaper, Search, Filter, TrendingUp, Mail, ChevronRight,
  SearchX
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const mockBlogPosts = [
  {
    id: 'mock-1',
    title: "Le Cameroun face aux défis du stress hydrique en 2025",
    excerpt: "Analyse des récentes données pluviométriques et des stratégies de résilience pour les zones urbaines.",
    created_at: "2025-04-14T10:00:00Z",
    author: "Dr. Fonkoua",
    category: "Analyse Stratégique",
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
  const [search, setSearch] = useState("");

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

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-32 bg-white dark:bg-secondary min-h-screen font-inter transition-colors duration-500">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-secondary dark:bg-slate-950 pt-32 pb-44 transition-colors duration-500">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/hero-pattern.svg')] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        
        <div className="container relative z-10 px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.25em] backdrop-blur-xl">
                <BookOpen size={20} />
                {isFR ? 'Intelligence Collective & Veille Stratégique' : 'Collective Intelligence & Strategic Watch'}
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tight font-outfit leading-[0.85]">
                {isFR ? 'ACTUALITÉS & ' : 'NEWS & '} 
                <span className="text-primary-light italic">{isFR ? 'PERSPECTIVES' : 'INSIGHTS'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-3xl font-inter leading-relaxed opacity-90">
                {isFR 
                  ? 'Décryptez les enjeux stratégiques, les innovations technologiques et les évolutions réglementaires majeures.'
                  : 'Decode major strategic challenges, technological innovations, and regulatory developments.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden lg:block shrink-0"
            >
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-12 flex items-center gap-12 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)]">
                <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center text-primary-light border border-white/5">
                  <TrendingUp size={44} />
                </div>
                <div>
                  <div className="text-6xl font-black text-white tracking-tighter font-outfit leading-none">
                    {loading ? '...' : posts.length}
                  </div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-4">
                    {isFR ? 'Publications Stratégiques' : 'Strategic Publications'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container px-6 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* SEARCH & FILTER SIDEBAR */}
          <div className="lg:w-96 shrink-0 space-y-12 sticky top-28 transition-all duration-500">
            <div className="bg-white dark:bg-secondary rounded-[3.5rem] shadow-2xl shadow-slate-900/5 border border-slate-100 dark:border-white/5 p-10 space-y-12 transition-colors duration-500">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.3em] px-4 transition-colors">
                  {isFR ? "Recherche de Savoir" : "Knowledge Search"}
                </h3>
                <div className="relative group">
                  <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isFR ? "Sujet, auteur..." : "Topic, author..."}
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 dark:bg-white/5 border border-slate-50 dark:border-white/5 rounded-[1.5rem] outline-none focus:bg-white dark:focus:bg-white/10 focus:border-primary/30 focus:ring-8 focus:ring-primary/5 transition-all font-bold text-sm text-secondary dark:text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.3em] px-4 transition-colors">
                  {isFR ? "Axes Thématiques" : "Thematic Axes"}
                </h3>
                <div className="flex flex-col gap-3">
                  {['Analyse Stratégique', 'Réglementation', 'Environnement', 'Technologie'].map((cat) => (
                    <button key={cat} className="group flex items-center justify-between px-6 py-5 rounded-2xl text-[13px] font-bold text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all duration-500 text-left border border-transparent hover:shadow-2xl hover:shadow-primary/20">
                      {cat}
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Mini Card */}
            <div className="bg-secondary dark:bg-slate-950 rounded-[3.5rem] p-14 text-white space-y-10 relative overflow-hidden group shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] transition-colors duration-500">
              <div className="absolute top-0 right-0 p-14 opacity-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-1000 pointer-events-none">
                <Mail size={160} />
              </div>
              <h4 className="text-4xl font-black tracking-tight relative z-10 font-outfit leading-[1]">{isFR ? 'Décryptage Exclusif' : 'Exclusive Insights'}</h4>
              <p className="text-slate-400 text-base font-normal leading-relaxed relative z-10 font-inter opacity-90">
                {isFR ? 'Recevez nos analyses stratégiques directement dans votre boîte email.' : 'Get our strategic analyses delivered directly to your inbox.'}
              </p>
              <button className="btn-premium bg-primary text-white w-full !py-6 !text-[11px] !font-black !tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-primary-dark rounded-2xl">
                {isFR ? "S'ABONNER MAINTENANT" : 'SUBSCRIBE NOW'}
              </button>
            </div>
          </div>

          {/* ARTICLES GRID */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-48 space-y-10 bg-white dark:bg-secondary rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-900/5 transition-colors duration-500">
                <Loader2 className="w-20 h-20 animate-spin text-primary" strokeWidth={1} />
                <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] text-sm">
                  {isFR ? "Chargement des actualités..." : "Loading news feed..."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                    className="premium-card group flex flex-col p-0 overflow-hidden h-full border-slate-100 dark:border-white/5 !rounded-[3.5rem] transition-all duration-700 hover:border-primary/20 hover:shadow-[0_40px_80px_-15px_rgba(15,23,42,0.1)]"
                  >
                    <Link href={`/${locale}/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] grayscale-[0.3] group-hover:grayscale-0" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute top-8 left-8">
                        <span className="px-5 py-2.5 bg-white/95 dark:bg-secondary/95 backdrop-blur-xl shadow-2xl rounded-[1.2rem] text-[10px] font-black uppercase text-primary dark:text-primary-light tracking-[0.25em] border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-12 flex flex-col flex-1">
                      <div className="flex items-center gap-8 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-10 pb-10 border-b border-slate-100 dark:border-white/5 transition-colors duration-500">
                        <div className="flex items-center gap-2.5 text-primary dark:text-primary-light">
                          <Calendar size={18} strokeWidth={2.5} /> 
                          {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2.5">
                          <User size={18} /> 
                          {post.author}
                        </div>
                      </div>
                      
                      <Link href={`/${locale}/blog/${post.id}`} className="block mb-8">
                        <h3 className="text-3xl font-black text-secondary dark:text-white leading-[1.1] tracking-tight group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-500 line-clamp-2 font-outfit">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-500 dark:text-slate-400 font-normal leading-relaxed text-base line-clamp-3 mb-12 flex-1 font-inter transition-colors">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-10 border-t border-slate-100 dark:border-white/5 transition-colors duration-500">
                        <Link 
                          href={`/${locale}/blog/${post.id}`} 
                          className="inline-flex items-center gap-6 text-primary dark:text-primary-light font-black text-xs uppercase tracking-[0.25em] group/link"
                        >
                          {isFR ? 'Lire l\'article' : 'Read Article'} 
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover/link:bg-primary group-hover/link:text-white flex items-center justify-center transition-all duration-700 shadow-inner group-hover/link:shadow-2xl group-hover/link:shadow-primary/30 border border-transparent dark:border-white/5">
                             <ArrowRight size={26} strokeWidth={2.5} className="group-hover/link:translate-x-1 transition-transform duration-500" />
                          </div>
                        </Link>
                        <button className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all duration-700">
                          <Share2 size={22} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="col-span-full py-60 bg-white dark:bg-secondary rounded-[5rem] border border-dashed border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center space-y-10 shadow-2xl shadow-slate-900/5 transition-colors duration-500">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-200 dark:text-slate-800 shadow-inner transition-colors">
                      <SearchX size={64} strokeWidth={1} />
                    </div>
                    <div className="space-y-4">
                      <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] text-sm">
                        {isFR ? "Aucune Publication Correspondante" : "No Matching Publications"}
                      </p>
                      <button onClick={() => setSearch('')} className="btn-premium bg-slate-50 dark:bg-white/5 text-secondary dark:text-white border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 px-10 rounded-[1.5rem] transition-all">
                         {isFR ? 'Effacer la recherche' : 'Clear search'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
