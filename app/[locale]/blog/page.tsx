"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Share2, Loader2, BookOpen, Newspaper, Search, Filter, TrendingUp, Mail, ChevronRight } from 'lucide-react';
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
    <div className="pb-24 bg-[#f8fafc] min-h-screen relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/4 pointer-events-none" />

      {/* PREMIUM HERO SECTION */}
      <div className="relative pt-24 pb-40">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-xl shadow-blue-900/5 border border-gray-50 text-[#0a5694] text-xs font-black uppercase tracking-widest mb-8">
                <BookOpen size={16} strokeWidth={2.5} />
                {isFR ? 'Chroniques & Savoir' : 'Chronicles & Knowledge'}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
                {isFR ? 'Actualités & ' : 'News & '} 
                <span className="text-[#0a5694]">{isFR ? 'Perspectives' : 'Insights'}</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
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
              <div className="bg-white border border-gray-100 rounded-[3rem] p-10 flex items-center gap-10 shadow-2xl shadow-blue-900/5">
                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center">
                  <TrendingUp size={40} className="text-[#0a5694]" />
                </div>
                <div>
                  <div className="text-5xl font-black text-gray-900 tracking-tighter">
                    {loading ? '...' : posts.length}
                  </div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">
                    {isFR ? 'Articles publiés' : 'Published Articles'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SEARCH & FILTER SIDEBAR */}
          <div className="lg:w-80 shrink-0 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50 p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] px-2">
                  {isFR ? "Rechercher" : "Search"}
                </h3>
                <div className="relative group">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a5694] transition-colors" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isFR ? "Sujet, auteur..." : "Topic, author..."}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0a5694]/20 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] px-2">
                  {isFR ? "Catégories" : "Categories"}
                </h3>
                <div className="flex flex-col gap-2">
                  {['Analyse Stratégique', 'Réglementation', 'Environnement', 'Technologie'].map((cat) => (
                    <button key={cat} className="group flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0a5694] transition-all text-left">
                      {cat}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Mini Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">
                <Mail size={80} />
              </div>
              <h4 className="text-xl font-black tracking-tight relative z-10">{isFR ? 'Ne manquez rien' : 'Stay Tuned'}</h4>
              <p className="text-gray-400 text-xs font-bold leading-relaxed relative z-10">
                {isFR ? 'Recevez nos analyses directement par email.' : 'Get our analyses delivered to your inbox.'}
              </p>
              <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all relative z-10 shadow-xl">
                {isFR ? "M'abonner" : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* ARTICLES GRID */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-8 bg-white/50 rounded-[4rem] border border-gray-100">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-50 rounded-full" />
                  <Loader2 className="w-16 h-16 animate-spin text-[#0a5694] absolute top-0 left-0" />
                </div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                  {isFR ? "Lecture des actualités..." : "Reading the news..."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col overflow-hidden h-full"
                  >
                    <Link href={`/${locale}/blog/${post.id}`} className="block relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white shadow-xl rounded-xl text-[10px] font-black text-transform uppercase text-[#0a5694] tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-8 md:p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 pb-6 border-b border-gray-50">
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
                        <h3 className="text-2xl font-black text-gray-900 leading-[1.2] tracking-tight group-hover/title:text-[#0a5694] transition-colors line-clamp-3">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-500 font-bold leading-relaxed text-sm line-clamp-3 mb-8 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <Link 
                          href={`/${locale}/blog/${post.id}`} 
                          className="inline-flex items-center gap-3 text-gray-900 font-black text-sm uppercase tracking-widest group/link"
                        >
                          {isFR ? 'Lire plus' : 'Read more'} 
                          <div className="w-10 h-10 rounded-full bg-gray-50 group-hover/link:bg-[#0a5694] group-hover/link:text-white flex items-center justify-center transition-all duration-300">
                             <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:text-[#0a5694] hover:border-[#0a5694] transition-all">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 text-center">
                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                      {isFR ? "Aucun article trouvé" : "No articles found"}
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
