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
    { value: '960+', label: isFR ? 'Experts Inscrits' : 'Registered Experts', icon: Users, color: '#0ea5e9' },
    { value: '10', label: isFR ? 'Régions Couvertes' : 'Regions Covered', icon: MapPin, color: '#10b981' },
    { value: '25+', label: isFR ? 'Institutions' : 'Institutions', icon: Building2, color: '#f59e0b' },
    { value: '15+', label: isFR ? "Années d'Expertise" : 'Years', icon: Award, color: '#8b5cf6' },
  ];

  const services = [
    {
      icon: Users,
      title: isFR ? 'Répertoire des Experts' : 'Experts Directory',
      desc: isFR ? 'Accédez au répertoire complet des professionnels du secteur de l\'eau au Cameroun, certifiés et vérifiés.' : 'Access the complete directory of water sector professionals in Cameroon, certified and verified.',
      href: `/${locale}/members`,
      color: '#0a5694',
    },
    {
      icon: Building2,
      title: isFR ? 'Institutions' : 'Institutions',
      desc: isFR ? 'Retrouvez les ministères, ONG, bureaux d\'études et organismes internationaux acteurs du secteur de l\'eau.' : 'Find ministries, NGOs, consulting firms and international organizations in the water sector.',
      href: `/${locale}/institutions`,
      color: '#0d9488',
    },
    {
      icon: BookOpen,
      title: isFR ? 'Documentation' : 'Documentation',
      desc: isFR ? 'Accédez aux publications, études et rapports techniques pour des ressources de haute qualité.' : 'Access publications, studies and technical reports for high quality resources.',
      href: `/${locale}/blog`,
      color: '#7c3aed',
    },
    {
      icon: ShieldCheck,
      title: isFR ? 'Certification' : 'Certification',
      desc: isFR ? 'Notre processus de validation garantit que chaque profil est authentifié par nos équipes d\'experts.' : 'Our validation process ensures each profile is authenticated by our expert teams.',
      href: `/${locale}/about`,
      color: '#dc2626',
    },
  ];

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 bg-white">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50" />
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               x: [0, 50, 0],
               y: [0, 30, 0]
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" 
           />
           <motion.div 
             animate={{ 
               scale: [1.2, 1, 1.2],
               x: [0, -50, 0],
               y: [0, -30, 0]
             }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-teal-100/30 rounded-full blur-[120px]" 
           />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-xl shadow-blue-900/5 border border-gray-50 text-[#0a5694] text-xs font-black uppercase tracking-[0.2em]">
                  <Droplets size={18} strokeWidth={2.5} />
                  {isFR ? 'Portail National de l\'Expertise' : 'National Expertise Portal'}
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  {isFR ? (
                    <>L'Excellence de l'<span className="text-[#0a5694]">Expertise</span> au Cameroun</>
                  ) : (
                    <>Excellence in Cameroonian <span className="text-[#0a5694]">Expertise</span></>
                  )}
                </h1>
                
                <p className="text-xl text-gray-500 leading-relaxed max-w-2xl font-medium">
                  {isFR
                    ? 'Le premier réseau structuré dédié à la promotion et à la certification des professionnels camerounais du secteur de l\'eau.'
                    : 'The first structured network dedicated to the promotion and certification of Cameroonian professionals in the water sector.'
                  }
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <Link href={`/${locale}/members`} className="group relative px-10 py-5 bg-[#0a5694] text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isFR ? 'Explorer l\'Annuaire' : 'Explore Directory'}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href={`/${locale}/register`} className="px-10 py-5 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black text-lg shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all">
                  {isFR ? 'Rejoindre le Réseau' : 'Join the Network'}
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-10 flex flex-wrap items-center gap-10 opacity-60">
                 <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{isFR ? 'Approuvé par' : 'Approved by'}</div>
                    <div className="font-black text-gray-900 text-lg tracking-tighter">MINEE</div>
                 </div>
                 <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                 <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{isFR ? 'Soutenu par' : 'Supported by'}</div>
                    <div className="font-black text-gray-900 text-lg tracking-tighter">UNESCO</div>
                 </div>
                 <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                 <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{isFR ? 'Partenaire' : 'Partner'}</div>
                    <div className="font-black text-gray-900 text-lg tracking-tighter text-transform uppercase">UE & AFD</div>
                 </div>
              </div>
            </motion.div>
            
            {/* Right Column: Visual Elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                {/* Main Abstract Shape */}
                <div className="relative z-10 bg-white rounded-[5rem] p-20 shadow-2xl shadow-blue-900/10 border border-gray-50 transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                   <img src="/images/logo.png" alt="Logo" className="w-full drop-shadow-2xl" />
                </div>

                {/* Floating Stats Card */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 z-20 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-50 space-y-4"
                >
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                      <TrendingUp size={24} />
                   </div>
                   <div>
                      <div className="text-4xl font-black text-gray-900 tracking-tighter">960+</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{isFR ? 'Experts Validés' : 'Validated Experts'}</div>
                   </div>
                </motion.div>

                {/* Second Floating Card */}
                <motion.div 
                   animate={{ y: [0, 20, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-10 -left-10 z-20 bg-[#0a5694] p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 text-white space-y-4"
                >
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <div className="text-xl font-black tracking-tight">{isFR ? 'Certification Officielle' : 'Official Certification'}</div>
                      <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-1">{isFR ? 'Plateforme de l\'État' : 'State Platform'}</div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="relative z-20 -mt-20 container">
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-gray-50 p-12 md:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div 
                    className="w-20 h-20 rounded-[2rem] mb-8 flex items-center justify-center transition-all group-hover:scale-110 group-hover:-rotate-12 shadow-inner"
                    style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                  >
                    <Icon size={32} strokeWidth={2.5} />
                  </div>
                  <div className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ECOSYSTEM ==================== */}
      <section className="py-40">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
            <div className="max-w-2xl space-y-6">
              <div className="text-[11px] font-black text-[#0a5694] uppercase tracking-[0.3em]">{isFR ? 'Écosystème' : 'Ecosystem'}</div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
                {isFR ? 'Une Expertise au service du ' : 'Expertise at the service of '} 
                <span className="text-[#0a5694]">{isFR ? 'Développement' : 'Development'}</span>
              </h2>
            </div>
            <Link href={`/${locale}/about`} className="px-10 py-5 bg-gray-50 hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-600 transition-all flex items-center gap-3">
               {isFR ? 'Notre Mission' : 'Our Mission'}
               <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={svc.href} className="flex flex-col bg-white rounded-[3.5rem] p-12 h-full border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                       <Icon size={120} />
                    </div>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform relative z-10"
                      style={{ backgroundColor: `${svc.color}15`, color: svc.color }}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-[#0a5694] transition-colors relative z-10 leading-tight">{svc.title}</h3>
                    <p className="text-gray-500 font-bold leading-relaxed mb-10 text-sm relative z-10">{svc.desc}</p>
                    <div 
                      className="mt-auto flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all relative z-10"
                      style={{ color: svc.color }}
                    >
                      {isFR ? 'Découvrir' : 'Discover'} <ChevronRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DIASPORA SECTION ==================== */}
      <section className="py-40 bg-gray-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-[#0a5694]/20" />
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-pattern.svg')] opacity-[0.03]" />
         
         <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#0d9488] text-[10px] font-black uppercase tracking-[0.3em]">
                  <Globe size={18} strokeWidth={2.5} />
                  {isFR ? 'Connexion Internationale' : 'International Connection'}
               </div>
               
               <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1.1]">
                  {isFR ? 'Talents de la ' : 'Talents of the '} 
                  <span className="text-[#0d9488]">{isFR ? 'Diaspora' : 'Diaspora'}</span>
               </h2>
               
               <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                  {isFR 
                    ? 'Le réseau national vous permet de contribuer activement au développement de votre pays d\'origine à travers vos expertises acquises à l\'international.'
                    : 'The national network allows you to actively contribute to the development of your country of origin through your expertise acquired internationally.'}
               </p>

               <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                  <Link href={`/${locale}/register/diaspora`} className="px-12 py-6 bg-[#0d9488] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-teal-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                     {isFR ? 'Rejoindre depuis l\'Étranger' : 'Join from Abroad'}
                     <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center justify-center -space-x-4">
                     {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="w-14 h-14 rounded-full border-4 border-gray-900 bg-gray-800 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=diaspora${i}`} alt="user" className="w-full h-full object-cover" />
                       </div>
                     ))}
                     <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-black text-white">+120</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ==================== PARTNERS SECTION ==================== */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a5694] text-xs font-black uppercase tracking-widest mb-4">
              Partenaires
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              {isFR ? 'Ils soutiennent notre mission' : 'They support our mission'}
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/images/partners/gwp.png" alt="GWP" className="h-16 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/minee.png" alt="MINEE" className="h-20 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/unesco.png" alt="UNESCO" className="h-16 object-contain hover:scale-110 transition-transform" />
            <img src="/images/partners/eu.jpg" alt="Union Européenne" className="h-16 object-contain hover:scale-110 transition-transform rounded-full mix-blend-multiply" />
            <img src="/images/partners/france.png" alt="Ambassade de France" className="h-24 object-contain hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      {/* ==================== CALL TO ACTION ==================== */}
      <section className="py-40 relative">
         <div className="container relative z-10">
            <div className="bg-[#0a5694] rounded-[5rem] p-16 md:p-32 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/30">
               <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="max-w-3xl mx-auto space-y-12 relative z-10"
               >
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                     {isFR ? 'Prêt à bâtir l\'avenir de l\'Eau ?' : 'Ready to build the future of Water?'}
                  </h2>
                  <p className="text-xl text-blue-100 font-medium leading-relaxed">
                     {isFR 
                       ? 'Inscrivez-vous dès aujourd\'hui et valorisez votre parcours au sein du premier réseau certifié des experts nationaux.'
                       : 'Sign up today and showcase your journey within the first certified national expert network.'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                     <Link href={`/${locale}/register/resident`} className="px-12 py-6 bg-white text-[#0a5694] rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        {isFR ? 'Cameroun Résident' : 'Cameroon Resident'}
                     </Link>
                     <Link href={`/${locale}/register/diaspora`} className="px-12 py-6 bg-transparent border-2 border-white/30 text-white rounded-[2rem] font-black text-xl hover:bg-white/10 hover:border-white transition-all">
                        {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
                     </Link>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
}
