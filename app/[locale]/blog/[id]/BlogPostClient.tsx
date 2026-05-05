"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, User, ArrowLeft, Share2, Tag, BookOpen, 
  Quote, ChevronRight, Globe, Download, Clock, MessageSquare, 
  Sparkles, Zap, Facebook, Twitter, Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPostClient({ locale, post }: { locale: string; post: any }) {
  const isFR = locale === 'fr';
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[100] shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        style={{ scaleX }}
      />

      {/* TOP NAVIGATION OVERLAY */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-12">
        <div className="container px-6 max-w-7xl mx-auto">
          <Link href={`/${locale}/blog`} passHref>
            <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 text-white/80 hover:text-white transition-all group font-black text-xs uppercase tracking-widest bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all shadow-sm">
                <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              {isFR ? 'Retour aux Chroniques' : 'Back to Chronicles'}
            </Button>
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-slate-900 border-b border-white/10">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={post.image_url} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={post.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl opacity-30" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-40">
          <div className="container px-6 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="max-w-5xl space-y-10"
            >
              <div className="flex flex-wrap gap-6 items-center">
                <div className="px-6 py-2.5 rounded-full bg-primary/20 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl border border-primary/30 shadow-2xl">
                  {post.category}
                </div>
                <div className="flex items-center gap-6 text-white/60 font-black text-[11px] uppercase tracking-[0.3em] backdrop-blur-md px-6 py-2.5 rounded-full bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={18} className="text-primary" /> 
                    {new Date(post.created_at).toLocaleDateString(isFR ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={18} className="text-primary" /> 
                    {isFR ? '8 min de lecture' : '8 min read'}
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.9] tracking-tight font-outfit uppercase">
                {post.title}
              </h1>

              <div className="flex items-center gap-8 pt-6">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center text-primary shadow-2xl border border-primary/30 backdrop-blur-md group hover:scale-110 transition-transform">
                  <User size={40} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-1">{isFR ? 'Publié par l\'Expert' : 'Published by Expert'}</div>
                  <div className="text-2xl font-black text-foreground tracking-tight font-outfit uppercase">{post.author}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="container px-6 max-w-7xl mx-auto relative z-10 -mt-20 md:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            <Card className="rounded-[4rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl shadow-2xl overflow-hidden p-12 md:p-20 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
              
              <CardContent className="p-0 space-y-16">
                <div className="text-2xl md:text-3xl font-black text-foreground leading-relaxed italic border-l-[10px] border-primary pl-10 py-4 bg-primary/5 rounded-r-[3rem] font-outfit tracking-tight">
                  {post.excerpt}
                </div>
                
                <div className="prose prose-xl max-w-none dark:prose-invert prose-p:text-muted-foreground prose-p:font-medium prose-p:leading-[1.8] prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tight prose-strong:text-foreground prose-strong:font-black prose-img:rounded-[3rem] prose-blockquote:border-l-[10px] prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-12 prose-blockquote:rounded-r-[3rem] prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:text-foreground prose-blockquote:text-3xl prose-blockquote:font-outfit prose-blockquote:tracking-tight">
                  <div className="space-y-12 whitespace-pre-line text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
                    {post.content ? (
                       <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>') }} />
                    ) : (
                      <div className="py-32 text-center space-y-10">
                        <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center mx-auto shadow-inner">
                          <BookOpen size={64} className="text-muted-foreground/20" />
                        </div>
                        <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-xs">{isFR ? "Contenu stratégique en cours de finalisation..." : "Strategic content being finalized..."}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Share & Tags Footer */}
                <div className="pt-16 border-t border-white/20 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-12">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mr-4">{isFR ? 'Tags Stratégiques' : 'Strategic Tags'}</div>
                    {['Expertise', 'Hydrologie', 'Gouvernance'].map(tag => (
                      <span key={tag} className="px-5 py-2.5 bg-white/40 dark:bg-white/5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default border border-white/20 dark:border-white/10">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mr-4">{isFR ? 'Diffuser' : 'Spread'}</div>
                    {[Linkedin, Twitter, Facebook, Share2].map((Icon, i) => (
                      <Button key={i} variant="outline" className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl group">
                        <Icon size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AUTHOR CARD */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden group border border-white/10 shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:rotate-12 transition-transform duration-[2s] pointer-events-none">
                <Quote size={200} />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-[3rem] p-1.5 bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl group-hover:border-primary/50 transition-all duration-700">
                    <div className="w-full h-full rounded-[2.7rem] overflow-hidden bg-slate-800 flex items-center justify-center">
                       <User size={80} className="text-white/10" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl border-4 border-slate-900">
                    {isFR ? 'CERTIFIÉ' : 'CERTIFIED'}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-4xl font-black tracking-tight font-outfit uppercase">{post.author}</h4>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 text-primary-light font-black uppercase tracking-[0.25em] text-[10px] rounded-full border border-primary/20">
                      <ShieldCheck size={14} strokeWidth={3} />
                      {isFR ? 'Expert Consultant National' : 'National Consultant Expert'}
                    </div>
                  </div>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl font-inter">
                    {isFR 
                      ? 'Spécialiste de haut niveau des questions hydrologiques et de la gestion urbaine des ressources aquifères, contribuant activement à la structuration du savoir stratégique national.'
                      : 'High-level specialist in hydrological issues and urban management of aquifer resources, actively contributing to the structuring of national strategic knowledge.'}
                  </p>
                  <Button variant="ghost" className="h-12 px-6 rounded-xl text-primary-light hover:bg-white/5 font-black text-[11px] uppercase tracking-widest gap-2 p-0">
                    {isFR ? 'Voir le profil complet' : 'View full profile'}
                    <ChevronRight size={16} strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-12">
            {/* CTA: Join the network */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Card className="bg-primary rounded-[4rem] p-12 text-white space-y-10 shadow-2xl shadow-primary/20 relative overflow-hidden group border-none">
                <div className="absolute top-0 right-0 p-8 opacity-[0.2] group-hover:scale-125 transition-transform duration-[2s] pointer-events-none">
                  <Globe size={180} />
                </div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-4xl font-black leading-tight tracking-tight font-outfit uppercase">{isFR ? 'Rejoignez le Réseau' : 'Join the Network'}</h3>
                  <p className="text-sky-100 font-medium leading-relaxed text-lg">
                    {isFR 
                      ? 'Partagez votre expertise et contribuez au développement du secteur de l\'eau au Cameroun.' 
                      : 'Share your expertise and contribute to the development of the water sector in Cameroon.'}
                  </p>
                </div>
                <Link href={`/${locale}/register`} passHref>
                  <Button className="w-full h-18 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-slate-50 transition-all relative z-10 py-8">
                    {isFR ? "S'INSCRIRE MAINTENANT" : 'REGISTER NOW'}
                    <ChevronRight size={20} strokeWidth={3} className="ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Related Posts Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Card className="rounded-[4rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 space-y-10 shadow-2xl shadow-primary/5">
                <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] px-4">{isFR ? 'Articles Similaires' : 'Related Articles'}</h3>
                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <Link key={i} href="#" className="flex gap-6 group">
                      <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-black/20 shrink-0 overflow-hidden border border-white/10">
                        <div className="w-full h-full bg-primary/10 group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-[9px] font-black text-primary uppercase tracking-widest">{isFR ? 'ANALYSE' : 'ANALYSIS'}</div>
                        <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight uppercase font-outfit">
                          {isFR ? 'Prospective sur les nappes phréatiques' : 'Future perspectives on groundwater'}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="rounded-[4rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 space-y-10 shadow-2xl">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                    <Mail size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-black text-foreground tracking-tight font-outfit uppercase">{isFR ? 'Abonnez-vous' : 'Subscribe'}</h3>
                  <p className="text-muted-foreground font-medium text-base leading-relaxed">
                     {isFR ? 'Recevez nos prochains articles directement dans votre boîte stratégique.' : 'Get our upcoming articles directly in your strategic inbox.'}
                  </p>
                </div>
                <div className="space-y-5">
                  <input 
                    type="email" 
                    placeholder="Email institutionnel..."
                    className="w-full h-16 px-8 rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/20 focus:border-primary/50 outline-none font-bold text-sm shadow-inner transition-all"
                  />
                  <Button variant="premium" className="w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20">
                     {isFR ? "S'ABONNER" : 'SUBSCRIBE'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
