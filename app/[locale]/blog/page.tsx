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
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-48 md:pt-60 pb-32 md:pb-40 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl space-y-12"
            >
              <div className="section-label bg-white/5 border-white/10 text-primary-light">
                <BookOpen size={16} />
                {isFR ? 'Intelligence Collective & Veille Stratégique' : 'Collective Intelligence & Strategic Watch'}
              </div>
              <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
                {isFR ? 'ACTUALITÉS & ' : 'NEWS & '} 
                <span className="text-gradient italic">{isFR ? 'PERSPECTIVES' : 'INSIGHTS'}</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
                {isFR 
                  ? 'Décryptez les enjeux stratégiques, les innovations technologiques et les évolutions réglementaires majeures.'
                  : 'Decode major strategic challenges, technological innovations, and regulatory developments.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden xl:block shrink-0"
            >
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 flex items-center gap-14 shadow-2xl premium-shadow">
                <div className="w-28 h-28 rounded-[2.25rem] bg-primary/10 flex items-center justify-center text-primary-light border border-primary/20 shadow-inner">
                  <TrendingUp size={48} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-7xl font-black text-white tracking-tighter font-outfit leading-none">
                    {loading ? '...' : posts.length}
                  </div>
                  <div className="section-label bg-transparent border-none px-0 mt-4 text-slate-400 opacity-60">
                    {isFR ? 'Publications' : 'Publications'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container px-6 -mt-20 md:-mt-28 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* SEARCH & FILTER SIDEBAR */}
          <div className="lg:w-96 shrink-0 space-y-12 sticky top-28 transition-all duration-500">
            <Card className="rounded-[3.5rem] border-none glass-card premium-shadow p-12 space-y-12">
              <div className="space-y-6">
                <div className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60">
                  {isFR ? "Recherche" : "Search"}
                </div>
                <div className="relative group">
                  <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isFR ? "Sujet, auteur..." : "Topic, author..."}
                    className="w-full h-18 pl-20 pr-8 py-5 bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 rounded-[1.75rem] outline-none focus:bg-white dark:focus:bg-white/10 focus:ring-8 focus:ring-primary/5 transition-all font-bold text-base text-foreground shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60">
                  {isFR ? "Thématiques" : "Thematics"}
                </div>
                <div className="flex flex-col gap-3">
                  {['Analyse Stratégique', 'Réglementation', 'Environnement', 'Technologie'].map((cat) => (
                    <button key={cat} className="group flex items-center justify-between px-8 py-6 rounded-2xl text-sm font-black text-muted-foreground uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-700 text-left border border-transparent hover:shadow-2xl hover:shadow-primary/20">
                      {cat}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:bg-white/20 flex items-center justify-center transition-all duration-700">
                        <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Newsletter Mini Card */}
            <Card className="rounded-[3.5rem] bg-slate-900 p-16 text-white space-y-12 relative overflow-hidden group premium-shadow border border-white/10">
              <div className="absolute top-0 right-0 p-14 opacity-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-[2s] pointer-events-none">
                <Mail size={180} />
              </div>
              <h4 className="text-4xl font-black tracking-tight relative z-10 font-outfit leading-[1.1] uppercase">{isFR ? 'Décryptage Exclusif' : 'Exclusive Insights'}</h4>
              <p className="text-slate-400 text-lg font-medium leading-relaxed relative z-10 font-inter opacity-90">
                {isFR ? 'Recevez nos analyses stratégiques directement dans votre boîte email.' : 'Get our strategic analyses delivered directly to your inbox.'}
              </p>
              <button className="h-18 w-full bg-primary text-white text-xs font-black tracking-[0.3em] uppercase shadow-2xl shadow-primary/30 hover:bg-primary-dark rounded-2xl transition-all duration-500">
                {isFR ? "S'ABONNER" : 'SUBSCRIBE'}
              </button>
            </Card>
          </div>

          {/* ARTICLES GRID */}
          <div className="flex-1 section-padding-large !pt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-60 space-y-12 glass-card rounded-[5rem] premium-shadow">
                <Loader2 size={64} className="animate-spin text-primary" strokeWidth={1} />
                <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-xs">
                  {isFR ? "Chargement des actualités..." : "Loading news feed..."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                    className="group flex flex-col p-0 overflow-hidden h-full glass-card !rounded-[4rem] transition-all duration-700 hover:-translate-y-4 premium-shadow"
                  >
                    <Link href={`/${locale}/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="absolute top-10 left-10">
                        <span className="px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-2xl rounded-2xl text-[10px] font-black uppercase text-primary tracking-widest border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-12 flex flex-col flex-1">
                      <div className="flex items-center gap-10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-12 pb-10 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-3 text-primary">
                          <Calendar size={18} strokeWidth={2.5} /> 
                          {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-3">
                          <User size={18} /> 
                          {post.author}
                        </div>
                      </div>
                      
                      <Link href={`/${locale}/blog/${post.id}`} className="block mb-8">
                        <h3 className="text-3xl font-black text-foreground leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-500 line-clamp-2 font-outfit uppercase">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-muted-foreground font-medium leading-relaxed text-lg line-clamp-3 mb-14 flex-1 font-inter">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-10 border-t border-slate-100 dark:border-white/5">
                        <Link 
                          href={`/${locale}/blog/${post.id}`} 
                          className="inline-flex items-center gap-8 text-primary font-black text-xs uppercase tracking-[0.3em] group/link"
                        >
                          {isFR ? 'Consulter' : 'Consult'} 
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover/link:bg-primary group-hover/link:text-white flex items-center justify-center transition-all duration-700 shadow-inner group-hover/link:shadow-2xl group-hover/link:shadow-primary/30">
                             <ArrowRight size={28} strokeWidth={3} className="group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                        <button className="w-16 h-16 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-700">
                          <Share2 size={24} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="col-span-full py-60 glass-card rounded-[5rem] text-center flex flex-col items-center justify-center space-y-12 premium-shadow">
                    <div className="w-40 h-40 rounded-[3rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                      <SearchX size={80} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-6">
                      <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-sm">
                        {isFR ? "Aucun Décryptage Trouvé" : "No Decryption Found"}
                      </p>
                      <Button onClick={() => setSearch('')} variant="premium" className="h-18 px-12 rounded-[1.5rem]">
                         {isFR ? 'Réinitialiser' : 'Reset Search'}
                      </Button>
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
