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
    <div className="pb-32 bg-slate-50/50 min-h-screen font-inter">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-[#0a5694] pt-40 pb-40">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent" />
        
        <div className="container relative z-10 px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md border border-white/30">
                <BookOpen size={16} />
                {isFR ? 'Chroniques & Savoir' : 'Chronicles & Knowledge'}
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight font-outfit leading-[1.1]">
                {isFR ? 'Actualités & ' : 'News & '} 
                <span className="text-blue-200">{isFR ? 'Perspectives' : 'Insights'}</span>
              </h1>
              <p className="text-xl text-blue-100 font-medium max-w-2xl leading-relaxed opacity-90">
                {isFR 
                  ? 'Décryptez les enjeux stratégiques, les innovations technologiques et les évolutions réglementaires du secteur de l\'eau au Cameroun.'
                  : 'Decode the strategic challenges, technological innovations, and regulatory developments of the water sector in Cameroon.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="hidden lg:block shrink-0"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-10 flex items-center gap-10 shadow-2xl">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white/20 flex items-center justify-center">
                  <TrendingUp size={40} className="text-white" />
                </div>
                <div>
                  <div className="text-5xl font-extrabold text-white tracking-tighter font-outfit">
                    {loading ? '...' : posts.length}
                  </div>
                  <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-2">
                    {isFR ? 'Articles publiés' : 'Published Articles'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container px-6 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* SEARCH & FILTER SIDEBAR */}
          <div className="lg:w-80 shrink-0 space-y-8 sticky top-24">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-200 p-8 space-y-10">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest px-2">
                  {isFR ? "Rechercher" : "Search"}
                </h3>
                <div className="relative group">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a5694] transition-colors" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isFR ? "Sujet, auteur..." : "Topic, author..."}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0a5694] focus:ring-4 focus:ring-blue-600/5 transition-all font-semibold text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest px-2">
                  {isFR ? "Catégories" : "Categories"}
                </h3>
                <div className="flex flex-col gap-2">
                  {['Analyse Stratégique', 'Réglementation', 'Environnement', 'Technologie'].map((cat) => (
                    <button key={cat} className="group flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#0a5694] hover:text-white transition-all text-left border border-transparent hover:shadow-lg hover:shadow-blue-900/10">
                      {cat}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Mini Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden group shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Mail size={100} />
              </div>
              <h4 className="text-2xl font-extrabold tracking-tight relative z-10 font-outfit">{isFR ? 'Ne manquez rien' : 'Stay Tuned'}</h4>
              <p className="text-slate-400 text-xs font-medium leading-relaxed relative z-10">
                {isFR ? 'Recevez nos analyses stratégiques directement dans votre boîte email.' : 'Get our strategic analyses delivered directly to your inbox.'}
              </p>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all relative z-10 shadow-xl">
                {isFR ? "S'abonner maintenant" : 'Subscribe Now'}
              </button>
            </div>
          </div>

          {/* ARTICLES GRID */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-6 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                <Loader2 className="w-12 h-12 animate-spin text-[#0a5694]" strokeWidth={1.5} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  {isFR ? "Chargement des actualités..." : "Loading news feed..."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col overflow-hidden h-full"
                  >
                    <Link href={`/${locale}/blog/${post.id}`} className="block relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md shadow-xl rounded-xl text-[10px] font-extrabold uppercase text-[#0a5694] tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 pb-6 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-[#0a5694]">
                          <Calendar size={14} /> 
                          {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={14} /> 
                          {post.author}
                        </div>
                      </div>
                      
                      <Link href={`/${locale}/blog/${post.id}`} className="block mb-4 group/title">
                        <h3 className="text-2xl font-extrabold text-slate-900 leading-[1.2] tracking-tight group-hover/title:text-[#0a5694] transition-colors line-clamp-3 font-outfit">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-500 font-medium leading-relaxed text-sm line-clamp-3 mb-8 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <Link 
                          href={`/${locale}/blog/${post.id}`} 
                          className="inline-flex items-center gap-3 text-slate-900 font-extrabold text-[11px] uppercase tracking-widest group/link"
                        >
                          {isFR ? 'Lire l\'article' : 'Read Article'} 
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover/link:bg-[#0a5694] group-hover/link:text-white flex items-center justify-center transition-all duration-300 shadow-inner group-hover/link:shadow-xl group-hover/link:shadow-blue-900/10 group-hover/link:rotate-12">
                             <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                        <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-[#0a5694] hover:bg-blue-50 hover:border-blue-100 transition-all">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="col-span-full py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center flex flex-col items-center">
                    <SearchX size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      {isFR ? "Aucun article correspondant" : "No matching articles"}
                    </p>
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
