"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Droplets, MapPin, ArrowRight, ShieldCheck, Building2, Globe,
  ChevronRight, Award, BookOpen, Search, CheckCircle, Star, TrendingUp, Zap, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const stats = [
    { value: '960+', label: isFR ? 'Experts Inscrits' : 'Registered Experts', icon: Users, color: 'blue' },
    { value: '10', label: isFR ? 'Régions Couvertes' : 'Regions Covered', icon: MapPin, color: 'emerald' },
    { value: '25+', label: isFR ? 'Institutions' : 'Institutions', icon: Building2, color: 'amber' },
    { value: '15+', label: isFR ? "Ans d'Expertise" : 'Years', icon: Award, color: 'violet' },
  ];

  const services = [
    {
      icon: Users,
      title: isFR ? 'Répertoire des Experts' : 'Experts Directory',
      desc: isFR ? 'Accédez au répertoire complet des professionnels du secteur de l\'eau au Cameroun, certifiés et vérifiés.' : 'Access the complete directory of water sector professionals in Cameroon, certified and verified.',
      href: `/${locale}/members`,
      color: 'blue',
    },
    {
      icon: Building2,
      title: isFR ? 'Institutions & Acteurs' : 'Institutions & Stakeholders',
      desc: isFR ? 'Retrouvez les ministères, ONG, bureaux d\'études et organismes internationaux acteurs du secteur.' : 'Find ministries, NGOs, consulting firms and international organizations in the sector.',
      href: `/${locale}/institutions`,
      color: 'emerald',
    },
    {
      icon: BookOpen,
      title: isFR ? 'Centre de Ressources' : 'Resource Center',
      desc: isFR ? 'Accédez aux publications, études et rapports techniques pour des ressources de haute qualité.' : 'Access publications, studies and technical reports for high quality resources.',
      href: `/${locale}/blog`,
      color: 'indigo',
    },
    {
      icon: ShieldCheck,
      title: isFR ? 'Certification & Qualité' : 'Certification & Quality',
      desc: isFR ? 'Notre processus de validation garantit que chaque profil est authentifié par nos équipes d\'experts.' : 'Our validation process ensures each profile is authenticated by our expert teams.',
      href: `/${locale}/about`,
      color: 'violet',
    },
  ];

  return (
    <div className="bg-white overflow-hidden font-inter">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[85vh] flex items-center py-20">
        <div className="absolute inset-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50/20" />
           <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-xl shadow-blue-900/5 border border-slate-100 text-[#0a5694] text-[10px] font-extrabold uppercase tracking-widest"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  {isFR ? 'Portail National de l\'Expertise' : 'National Expertise Portal'}
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight font-outfit">
                  {isFR ? (
                    <>L'Excellence de l'<span className="text-[#0a5694] italic">Expertise</span> au Cameroun</>
                  ) : (
                    <>Excellence in Cameroonian <span className="text-[#0a5694] italic">Expertise</span></>
                  )}
                </h1>
                
                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  {isFR
                    ? 'Le premier réseau institutionnel structuré dédié à la promotion, la certification et la mise en relation des professionnels stratégiques du secteur de l\'eau.'
                    : 'The first structured institutional network dedicated to the promotion, certification, and connection of strategic water sector professionals.'
                  }
                </p>
              </div>
              
              {/* CTA Buttons — Stripe/Linear Style */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`/${locale}/members`} className="btn-premium btn-primary group">
                  {isFR ? 'Explorer l\'Annuaire' : 'Explore Directory'}
                  <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href={`/${locale}/register`} className="btn-premium btn-secondary">
                  {isFR ? 'Rejoindre le Réseau' : 'Join the Network'}
                </Link>
              </div>

              {/* Partners Mini Strip */}
              <div className="pt-8 flex flex-wrap items-center gap-10 grayscale opacity-40">
                 <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{isFR ? 'Partenaires :' : 'Partners :'}</div>
                 <div className="font-extrabold text-slate-900 text-sm tracking-widest">MINEE</div>
                 <div className="font-extrabold text-slate-900 text-sm tracking-widest">UNESCO</div>
                 <div className="font-extrabold text-slate-900 text-sm tracking-widest">AFD</div>
                 <div className="font-extrabold text-slate-900 text-sm tracking-widest">UE</div>
              </div>
            </motion.div>
            
            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                <div className="relative z-10 bg-white rounded-[3rem] p-14 shadow-2xl border border-slate-100 shadow-blue-900/5">
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent rounded-[3rem]" />
                   <img src="/images/logo.png" alt="Logo" className="relative z-10 w-full h-auto object-contain" />
                </div>

                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-slate-50"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                         <Users size={22} />
                      </div>
                      <div>
                         <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-outfit">960+</div>
                         <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{isFR ? 'Experts Actifs' : 'Active Experts'}</div>
                      </div>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 15, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-8 -left-8 z-20 bg-slate-900 p-6 rounded-2xl shadow-2xl text-white"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
                         <ShieldCheck size={24} />
                      </div>
                      <div>
                         <div className="text-sm font-extrabold font-outfit">{isFR ? 'Experts Certifiés' : 'Certified Experts'}</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plateforme de Référence</div>
                      </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS STRIP ==================== */}
      <section className="py-16 container px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 p-10 md:p-14"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className={`w-14 h-14 rounded-2xl mb-5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                    stat.color === 'blue' ? 'bg-blue-50 text-[#0a5694]' :
                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    'bg-violet-50 text-violet-600'
                  }`}>
                    <Icon size={26} />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1 tracking-tight font-outfit">{stat.value}</div>
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest border border-blue-100">
                 <Zap size={14} />
                 {isFR ? 'Nos Services Stratégiques' : 'Strategic Services'}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-outfit">
                {isFR ? 'Un écosystème au service de la ' : 'An ecosystem serving '} 
                <span className="text-[#0a5694]">{isFR ? 'Gestion de l\'Eau' : 'Water Management'}</span>
              </h2>
            </div>
            <Link href={`/${locale}/about`} className="btn-premium btn-outline group shrink-0">
               {isFR ? 'En savoir plus' : 'Learn more'}
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Link key={i} href={svc.href} className="group flex flex-col bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg shadow-blue-900/[0.03] hover:shadow-xl hover:shadow-blue-900/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 shadow-inner ${
                    svc.color === 'blue' ? 'bg-blue-50 text-[#0a5694]' :
                    svc.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    svc.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    'bg-violet-50 text-violet-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-[#0a5694] transition-colors font-outfit leading-tight">{svc.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1 text-sm">{svc.desc}</p>
                  <div className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest ${
                    svc.color === 'blue' ? 'text-[#0a5694]' :
                    svc.color === 'emerald' ? 'text-emerald-600' :
                    svc.color === 'indigo' ? 'text-indigo-600' :
                    'text-violet-600'
                  }`}>
                    {isFR ? 'Découvrir' : 'Discover'} <ChevronRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DIASPORA SECTION ==================== */}
      <section className="py-24 bg-[#003366] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px]" />
         <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#0a5694]/20 blur-[150px]" />
         <div className="container relative z-10 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-8"
               >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-400 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                     <Globe size={16} />
                     {isFR ? 'Portée Internationale' : 'International Reach'}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-outfit">
                     {isFR ? 'Mobiliser les talents de la ' : 'Mobilizing talents of the '} 
                     <span className="text-teal-400">{isFR ? 'Diaspora' : 'Diaspora'}</span>
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-xl">
                     {isFR 
                       ? 'Experts camerounais résidant à l\'étranger, rejoignez le réseau national pour partager vos compétences et contribuer au développement durable du pays.'
                       : 'Cameroonian experts living abroad, join the national network to share your skills and contribute to the sustainable development of the country.'}
                  </p>
                  <Link href={`/${locale}/register/diaspora`} className="btn-premium group inline-flex bg-teal-500 text-white border-teal-400/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(20,184,166,0.2)] hover:bg-teal-600">
                     {isFR ? 'Rejoindre en tant qu\'Expert Diaspora' : 'Join as Diaspora Expert'}
                     <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </motion.div>
               <div className="relative">
                  <div className="grid grid-cols-2 gap-5">
                     <div className="space-y-5 pt-12">
                        <motion.div 
                           whileHover={{ scale: 1.02 }}
                           className="h-40 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm"
                        >
                           <div className="text-3xl font-extrabold text-white mb-1 font-outfit">120+</div>
                           <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Experts Diaspora</div>
                        </motion.div>
                        <div className="h-56 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                           <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500" alt="Work" className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <div className="space-y-5">
                        <div className="h-56 rounded-2xl overflow-hidden shadow-xl">
                           <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=500" alt="Team" className="w-full h-full object-cover" />
                        </div>
                        <motion.div 
                           whileHover={{ scale: 1.02 }}
                           className="h-40 bg-[#0a5694]/20 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md"
                        >
                           <Globe size={36} className="text-blue-400 mb-2" />
                           <div className="text-[11px] font-extrabold text-white uppercase tracking-widest">Réseau Mondial</div>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ==================== PARTNERS SECTION ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.3em]">
               <Heart size={14} className="text-red-400" />
               {isFR ? 'Partenariats Stratégiques' : 'Strategic Partnerships'}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
              {isFR ? 'Ils soutiennent notre vision commune' : 'They support our shared vision'}
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-all duration-700">
            <img src="/images/partners/minee.png" alt="MINEE" className="h-16 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/unesco.png" alt="UNESCO" className="h-14 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/france.png" alt="Ambassade de France" className="h-16 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/gwp.png" alt="GWP" className="h-12 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/eu.jpg" alt="UE" className="h-14 object-contain rounded-full hover:scale-110 transition-transform shadow-lg" />
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24">
         <div className="container px-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-[#0a5694] rounded-[3rem] px-8 py-16 md:p-24 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/30"
            >
               <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05]" />
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/20 blur-[120px] rounded-full" />
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/20 blur-[120px] rounded-full" />
               
               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] font-outfit">
                     {isFR ? 'Propulsez votre expertise au sommet' : 'Launch your expertise to the top'}
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
                     {isFR 
                       ? 'Valorisez vos compétences stratégiques et accédez aux meilleures opportunités institutionnelles au Cameroun.'
                       : 'Showcase your strategic skills and access the best institutional opportunities in Cameroon.'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Link href={`/${locale}/register/resident`} className="btn-premium bg-white text-[#0a5694] border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.08)] hover:bg-slate-50 font-bold">
                        {isFR ? 'S\'inscrire maintenant' : 'Register Now'}
                     </Link>
                     <Link href={`/${locale}/register/diaspora`} className="btn-premium bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#0a5694] backdrop-blur-md">
                        {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
                     </Link>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
