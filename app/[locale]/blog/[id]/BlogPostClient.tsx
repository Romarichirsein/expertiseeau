"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen, Quote, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostClient({ locale, post }: { locale: string; post: any }) {
  const isFR = locale === 'fr';

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Article Progress Bar (Simple) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#0a5694]/10 z-50">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="h-full bg-[#0a5694] origin-left"
        />
      </div>

      {/* TOP NAVIGATION OVERLAY */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-10">
        <div className="container px-6 md:px-12">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-white/20 shadow-xl group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {isFR ? 'Retour aux Chroniques' : 'Back to Chronicles'}
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[70vh] md:h-[80vh] min-h-[500px] overflow-hidden bg-gray-900">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src={post.image_url} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={post.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20">
          <div className="container px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl space-y-8"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <div className="px-4 py-2 rounded-xl bg-[#0a5694] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20">
                  {post.category}
                </div>
                <div className="flex items-center gap-4 text-white/80 font-black text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#0a5694]" /> 
                    {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 pt-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0a5694] flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
                  <User size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isFR ? 'Par l\'Expert' : 'By the Expert'}</div>
                  <div className="text-lg font-black text-gray-900 tracking-tight">{post.author}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="container px-6 md:px-12 relative z-10 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-900/5 border border-gray-50">
              <div className="prose prose-xl max-w-none prose-p:text-gray-500 prose-p:font-medium prose-p:leading-[1.8] prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight prose-strong:text-gray-900 prose-strong:font-black prose-img:rounded-[2.5rem] prose-blockquote:border-l-4 prose-blockquote:border-[#0a5694] prose-blockquote:bg-blue-50/50 prose-blockquote:p-8 prose-blockquote:rounded-r-[2rem] prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-gray-900">
                <div className="text-2xl font-bold text-gray-900 mb-12 leading-relaxed italic border-l-8 border-[#0a5694] pl-10 py-2">
                  {post.excerpt}
                </div>
                
                <div className="space-y-10 whitespace-pre-line text-gray-500">
                  {post.content ? (
                     <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>') }} />
                  ) : (
                    <div className="py-20 text-center space-y-6">
                      <BookOpen size={48} className="mx-auto text-gray-100" />
                      <p className="text-gray-300 font-black uppercase tracking-widest text-xs">{isFR ? "Contenu en cours de rédaction..." : "Content being written..."}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Share & Tags Footer */}
              <div className="mt-20 pt-12 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">{isFR ? 'Mots-clés :' : 'Tags:'}</div>
                  {['Expertise', 'Hydrologie', 'Cameroun'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0a5694] transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">{isFR ? 'Partager :' : 'Share:'}</div>
                  <button className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0a5694] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0d9488] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                    <Globe size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0a5694] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* AUTHOR CARD */}
            <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">
                <Quote size={120} />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden shrink-0 shadow-2xl">
                   <User size={64} className="text-white/20" />
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black tracking-tight">{post.author}</h4>
                    <p className="text-[#0d9488] font-black uppercase tracking-[0.2em] text-[10px]">{isFR ? 'Expert Consultant National' : 'National Consultant Expert'}</p>
                  </div>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    {isFR 
                      ? 'Spécialiste des questions hydrologiques et de la gestion urbaine des ressources aquifères, contribuant activement à l\'expertise nationale.'
                      : 'Specialist in hydrological issues and urban management of aquifer resources, actively contributing to national expertise.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-12">
            {/* CTA: Join the network */}
            <div className="bg-[#0a5694] rounded-[3rem] p-10 text-white space-y-8 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.1] group-hover:scale-110 transition-transform duration-700">
                <Globe size={100} />
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-3xl font-black leading-tight tracking-tight">{isFR ? 'Rejoignez le Réseau' : 'Join the Network'}</h3>
                <p className="text-blue-100 font-medium leading-relaxed">
                  {isFR 
                    ? 'Partagez votre expertise et contribuez au développement du secteur de l\'eau au Cameroun.' 
                    : 'Share your expertise and contribute to the development of the water sector in Cameroon.'}
                </p>
              </div>
              <Link href={`/${locale}/register`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a5694] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all relative z-10">
                {isFR ? "S'inscrire" : 'Register Now'}
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 space-y-8">
              <div className="space-y-3">
                <div className="text-[10px] font-black text-[#0a5694] uppercase tracking-widest">{isFR ? 'Newsletter' : 'Newsletter'}</div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{isFR ? 'Abonnez-vous' : 'Subscribe'}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                   {isFR ? 'Recevez nos prochains articles directement par email.' : 'Get our upcoming articles directly by email.'}
                </p>
              </div>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email..."
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#0a5694] outline-none font-bold text-sm bg-white shadow-sm transition-all"
                />
                <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                   {isFR ? "S'abonner" : 'Subscribe'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
