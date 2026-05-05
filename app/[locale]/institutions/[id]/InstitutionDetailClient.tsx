"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Users, 
  ChevronLeft,
  Briefcase,
  FileText,
  Mail as MailIcon,
  ShieldCheck,
  Zap,
  Download,
  Share2,
  ArrowRight,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function InstitutionDetailClient({ locale, institution }: { locale: string; institution: any }) {
  const isFR = locale === 'fr';

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 px-6 pt-32 lg:pt-40 space-y-16 max-w-7xl mx-auto">
        
        {/* ==================== BACK LINK ==================== */}
        <Link href={`/${locale}/institutions`} passHref>
          <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 text-muted-foreground hover:text-primary transition-all group font-black text-xs uppercase tracking-widest">
            <div className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} strokeWidth={3} />
            </div>
            {isFR ? 'Retour au Répertoire' : 'Back to Directory'}
          </Button>
        </Link>

        {/* ==================== HERO HEADER ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4rem] overflow-hidden bg-slate-900 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] p-12 md:p-24 text-white min-h-[500px] flex items-end transition-all border border-white/10"
        >
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl opacity-50" />
          
          <div className="relative z-10 space-y-10 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <Building2 size={20} strokeWidth={3} />
              { institution.type || (isFR ? 'Institution Stratégique' : 'Strategic Institution') }
            </div>
            <h1 className="text-6xl md:text-8xl font-black font-outfit leading-[0.95] tracking-tight uppercase">
              {institution.nom}
            </h1>
            <div className="flex flex-wrap gap-10 text-slate-400 font-bold">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-light border border-white/10 group-hover:bg-primary transition-all shadow-lg"><MapPin size={20} strokeWidth={2.5} /></div>
                <span className="text-lg group-hover:text-white transition-colors">{institution.siege || 'Yaoundé'}, Cameroon</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-light border border-white/10 group-hover:bg-primary transition-all shadow-lg"><Briefcase size={20} strokeWidth={2.5} /></div>
                <span className="text-lg group-hover:text-white transition-colors">{isFR ? 'Secteur Public & Gouvernance' : 'Public Sector & Governance'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* ==================== MAIN CONTENT ==================== */}
          <div className="lg:col-span-8 space-y-16">
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                <h2 className="text-4xl md:text-5xl font-black font-outfit text-foreground tracking-tight leading-tight uppercase">
                  {isFR ? 'À propos de l\' ' : 'About the '} 
                  <span className="text-primary italic">Institution</span>
                </h2>
              </div>
              <div className="space-y-10 text-xl leading-relaxed text-muted-foreground font-medium font-inter">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-4 first-letter:float-left">
                  {institution.description || (isFR 
                    ? "Cette institution joue un rôle déterminant dans la structuration et la gestion stratégique des ressources hydrauliques au Cameroun, collaborant étroitement avec le réseau national des experts certifiés pour garantir une gestion durable et efficiente de l'eau sur l'ensemble du territoire national."
                    : "This institution plays a determining role in the structuring and strategic management of hydraulic resources in Cameroon, collaborating closely with the national certified expert network to ensure sustainable and efficient water management throughout the national territory.")}
                </p>
                {institution.mandat && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative p-12 bg-white/40 dark:bg-white/5 rounded-[3.5rem] border-l-[8px] border-primary shadow-2xl backdrop-blur-md group hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500"
                  >
                    <p className="text-foreground font-black italic text-2xl leading-relaxed font-outfit tracking-tight">
                      "{institution.mandat}"
                    </p>
                    <div className="absolute -top-8 -left-8 w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 dark:border-white/5 group-hover:scale-110 transition-transform duration-500">
                      <FileText className="text-primary" size={32} strokeWidth={2.5} />
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Key Figures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="p-12 rounded-[3.5rem] space-y-10 border border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl shadow-2xl group hover:border-primary/40 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner border border-primary/20 group-hover:scale-110 transition-transform">
                  <Users size={36} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-6xl font-black font-outfit text-foreground tracking-tighter uppercase">45+</div>
                  <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-4">{isFR ? 'Experts Stratégiques Liés' : 'Linked Strategic Experts'}</div>
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-12 rounded-[3.5rem] space-y-10 border border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl shadow-2xl group hover:border-teal-500/40 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center text-teal-500 shadow-inner border border-teal-500/20 group-hover:scale-110 transition-transform">
                  <Zap size={36} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-6xl font-black font-outfit text-foreground tracking-tighter uppercase">12</div>
                  <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-4">{isFR ? 'Projets Nationaux Encadrés' : 'Supervised National Projects'}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ==================== SIDEBAR ==================== */}
          <div className="lg:col-span-4 space-y-12">
             <motion.aside 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="p-10 rounded-[3.5rem] border border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl space-y-10 shadow-2xl shadow-primary/5"
             >
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
                      <MailIcon size={16} strokeWidth={3} />
                      {isFR ? 'Communication Directe' : 'Direct Communication'}
                   </div>
                   <div className="space-y-8 pt-6">
                      <div className="flex items-start gap-6 group cursor-pointer">
                         <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all shadow-inner border border-white/20 dark:border-white/10"><MapPin size={24} strokeWidth={2.5} /></div>
                         <div className="text-base font-bold text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">B.P. 510, <br/>{institution.siege || 'Yaoundé'}, Cameroun</div>
                      </div>
                      {institution.site && (
                        <div className="flex items-start gap-6 group cursor-pointer">
                           <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all shadow-inner border border-white/20 dark:border-white/10"><Globe size={24} strokeWidth={2.5} /></div>
                           <div className="text-base font-black text-primary hover:underline flex items-center gap-2 break-all">
                              {institution.site.replace('https://', '').replace('http://', '')}
                              <ExternalLink size={16} strokeWidth={3} />
                           </div>
                        </div>
                      )}
                   </div>
                </div>

                <div className="pt-10 border-t border-white/20 dark:border-white/5">
                  <Button variant="premium" className="w-full h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 gap-3">
                    <MailIcon size={20} strokeWidth={3} />
                    {isFR ? 'Contacter l\'Institution' : 'Contact Institution'}
                  </Button>
                </div>
             </motion.aside>

             <motion.aside 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="bg-slate-900/80 p-10 rounded-[3.5rem] border border-white/10 space-y-8 text-white"
             >
                <div className="flex items-center gap-3 text-primary text-[11px] font-black uppercase tracking-[0.3em]">
                  <Download size={18} />
                  {isFR ? 'Documentation Officielle' : 'Official Documentation'}
                </div>
                <ul className="space-y-6">
                   {[
                     { label: isFR ? 'Organigramme & Structure' : 'Organization Chart', icon: FileText },
                     { label: isFR ? 'Plan Stratégique 2025' : 'Strategic Plan 2025', icon: Zap },
                     { label: isFR ? 'Rapports Techniques' : 'Technical Reports', icon: Info }
                   ].map((item, i) => (
                     <li key={i} className="flex items-center justify-between text-sm font-black text-slate-400 hover:text-white transition-all cursor-pointer group uppercase tracking-widest">
                        <div className="flex items-center gap-4">
                          <item.icon size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                          {item.label}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all border border-white/10 shadow-sm">
                          <ChevronLeft size={20} className="rotate-180" strokeWidth={3} />
                        </div>
                     </li>
                   ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <Link href="#" className="flex items-center justify-between group">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{isFR ? 'Voir tout le catalogue' : 'View full catalog'}</span>
                    <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
             </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}
