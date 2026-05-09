"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Building2, Globe, Clock, ArrowRight, ShieldCheck, BookOpen, Zap, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const stats = [
    { value: '960+', label: isFR ? 'Experts Inscrits' : 'Registered Experts', icon: Users },
    { value: '10', label: isFR ? 'Régions Couvertes' : 'Regions Covered', icon: Globe },
    { value: '25+', label: isFR ? 'Institutions' : 'Institutions', icon: Building2 },
    { value: '15+', label: isFR ? "Ans d'Expertise" : 'Years of Expertise', icon: Clock },
  ];

  const services = [
    {
      icon: Users,
      title: isFR ? 'Répertoire des Experts' : 'Experts Directory',
      desc: isFR ? 'Accédez au répertoire complet des professionnels du secteur de l\'eau au Cameroun.' : 'Access the complete directory of water sector professionals in Cameroon.',
      href: `/${locale}/members`,
      colSpan: 'md:col-span-2 lg:col-span-2',
    },
    {
      icon: Building2,
      title: isFR ? 'Institutions' : 'Institutions',
      desc: isFR ? 'Retrouvez les ministères, ONG, bureaux d\'études et organismes acteurs.' : 'Find ministries, NGOs, consulting firms and organizations.',
      href: `/${locale}/institutions`,
      colSpan: 'md:col-span-1 lg:col-span-1',
    },
    {
      icon: BookOpen,
      title: isFR ? 'Centre de Ressources' : 'Resource Center',
      desc: isFR ? 'Accédez aux publications, études et rapports techniques.' : 'Access publications, studies and technical reports.',
      href: `/${locale}/blog`,
      colSpan: 'md:col-span-1 lg:col-span-1',
    },
    {
      icon: ShieldCheck,
      title: isFR ? 'Certification' : 'Certification',
      desc: isFR ? 'Notre processus de validation garantit l\'authenticité de chaque profil expert.' : 'Our validation process ensures the authenticity of each expert profile.',
      href: `/${locale}/about`,
      colSpan: 'md:col-span-2 lg:col-span-2',
    },
  ];
  return (
    <div className="bg-background text-foreground overflow-hidden font-inter transition-colors duration-500 relative">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/10 blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-teal-500/5 blur-[180px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-48 pb-32">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
              className="w-full h-full object-cover grayscale mix-blend-overlay" 
              alt="Institutional Background"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-14">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="section-label bg-white/5 border-white/10 text-primary-light"
            >
              <Zap size={16} className="text-primary fill-primary" />
              {isFR ? "L'Expertise Certifiée du Cameroun" : "Cameroon's Certified Expertise"}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-fluid-h1 font-black leading-[0.95] tracking-tight font-outfit text-balance max-w-5xl mx-auto uppercase"
            >
              {isFR ? (
                <>L'Excellence de <span className="text-gradient italic">l'Expertise</span> au Service de la Nation</>
              ) : (
                <>Excellence in <span className="text-gradient italic">Expertise</span> Serving the Nation</>
              )}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-3xl leading-relaxed text-muted-foreground max-w-4xl mx-auto font-medium text-balance"
            >
              {isFR
                ? "Le portail institutionnel de référence fédérant les professionnels certifiés du secteur de l'eau et de l'assainissement au Cameroun."
                : "The institutional reference portal uniting certified professionals in the water and sanitation sector in Cameroon."
              }
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-8 w-full pt-8"
            >
              <Link href={`/${locale}/members`} passHref>
                <Button variant="premium" className="h-24 px-16 text-xl rounded-3xl min-w-[280px] shadow-2xl shadow-primary/20 gap-4 group">
                  {isFR ? "Consulter l'Annuaire" : "View Directory"}
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/register`} passHref>
                <Button variant="outline" className="h-24 px-16 text-xl rounded-3xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 min-w-[280px] font-black uppercase tracking-widest bg-transparent backdrop-blur-md">
                  {isFR ? "Devenir Membre" : "Become a Member"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="section-padding relative z-10 -mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group hover:-translate-y-4 transition-all duration-1000 border-none glass-card shadow-2xl premium-shadow rounded-[3.5rem] overflow-hidden">
                  <CardContent className="p-14 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-20 h-20 rounded-[1.75rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                      <stat.icon size={36} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-6xl font-black text-foreground mb-3 font-outfit tracking-tighter uppercase">
                        {stat.value}
                      </div>
                      <div className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES GRID ==================== */}
      <section className="section-padding-large relative">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-32 max-w-4xl mx-auto space-y-8">
            <div className="section-label bg-white/5 border-white/10 text-primary-light">
              <Building2 size={16} />
              {isFR ? 'Services & Ressources' : 'Services & Resources'}
            </div>
            <h2 className="text-fluid-h2 font-black text-foreground leading-[1] font-outfit uppercase tracking-tight text-balance">
              {isFR ? 'Une Vision ' : 'A National '}
              <span className="text-gradient italic">{isFR ? 'Nationale' : 'Vision'}</span>
            </h2>
            <p className="text-xl md:text-3xl leading-relaxed text-muted-foreground font-medium text-balance">
              {isFR 
                ? 'Un écosystème structuré au service de l\'excellence, facilitant la certification et la connexion des acteurs majeurs.'
                : 'A structured ecosystem serving excellence, facilitating certification and connection of major stakeholders.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((svc, i) => (
              <motion.div 
                key={i} 
                className={svc.colSpan}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={svc.href} className="block h-full group">
                  <Card className="h-full border-none glass-card rounded-[3.5rem] overflow-hidden relative premium-shadow hover:-translate-y-3 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <CardContent className="p-14 h-full flex flex-col">
                      <div className="w-18 h-18 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                        <svc.icon size={32} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-3xl font-black text-foreground mb-6 font-outfit uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{svc.title}</h3>
                      <p className="text-lg leading-relaxed text-muted-foreground flex-1 font-medium text-balance">{svc.desc}</p>
                      
                      <div className="mt-12 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-primary group-hover:gap-6 transition-all duration-700">
                        {isFR ? 'Consulter' : 'Consult'}
                        <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DIASPORA SECTION ==================== */}
      <section className="section-padding-large bg-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/hero-pattern.svg')] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[200px] mix-blend-screen translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[180px] mix-blend-screen -translate-x-1/2 translate-y-1/2" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="flex flex-col items-start space-y-12">
              <div className="section-label bg-white/5 border-white/10 text-primary-light">
                <Globe size={16} />
                {isFR ? 'Mobilisation Diaspora' : 'Diaspora Mobilization'}
              </div>
              <h2 className="text-fluid-h2 font-black text-white font-outfit uppercase tracking-tight leading-[1] text-balance">
                {isFR ? 'Le Rayonnement ' : 'Global '}
                <span className="text-gradient italic">{isFR ? 'International' : 'Reach'}</span>
              </h2>
              <p className="text-xl md:text-3xl leading-relaxed text-slate-400 font-medium text-balance">
                {isFR 
                  ? 'Experts résidant à l\'étranger, rejoignez le réseau national pour contribuer au développement stratégique du secteur de l\'eau au Cameroun.'
                  : 'Experts living abroad, join the national network to contribute to the strategic development of the water sector in Cameroon.'}
              </p>
              <Link href={`/${locale}/register/diaspora`} passHref>
                <Button variant="premium" className="h-24 px-16 rounded-[2rem] text-xl font-black uppercase tracking-widest gap-6 shadow-2xl shadow-primary/20 group">
                  {isFR ? 'S\'inscrire comme Expert' : 'Register as Expert'}
                  <ArrowRight size={28} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative rounded-[5rem] overflow-hidden min-h-[600px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] border border-white/10 group premium-shadow"
            >
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                alt="Diaspora Collaboration" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-16 left-16 right-16 glass-card p-12 rounded-[3rem] border-white/10 premium-shadow">
                <div className="text-7xl font-black text-white font-outfit leading-none mb-4 tracking-tighter uppercase">120+</div>
                <div className="section-label bg-transparent border-none px-0 text-primary-light opacity-80 uppercase tracking-widest">
                  {isFR ? 'Experts Diaspora Actifs' : 'Active Diaspora Experts'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CALL TO ACTION ==================== */}
      <section className="section-padding-large bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-slate-900 rounded-[6rem] p-24 md:p-40 text-white relative overflow-hidden shadow-[0_80px_160px_-20px_rgba(0,0,0,0.6)] border border-white/10"
          >
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/20 blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 blur-[180px] rounded-full -translate-x-1/2 translate-y-1/2 opacity-30" />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-16">
              <div className="section-label bg-white/5 border-white/10 text-primary-light">
                <Sparkles size={20} />
                {isFR ? 'Engagement National' : 'National Engagement'}
              </div>
              <h2 className="text-fluid-h1 font-black font-outfit leading-[0.95] tracking-tight uppercase text-balance">
                {isFR ? 'Propulsez votre ' : 'Propel your '}
                <span className="text-gradient italic">{isFR ? 'expertise' : 'expertise'}</span>
                {isFR ? ' au sommet' : ' to the top'}
              </h2>
              <p className="text-xl md:text-3xl leading-relaxed text-slate-400 font-medium max-w-4xl text-balance">
                {isFR 
                  ? 'Rejoignez la plateforme institutionnelle de référence et accédez aux meilleures opportunités stratégiques du secteur.'
                  : 'Join the institutional reference portal and access the best strategic opportunities in the sector.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 w-full">
                <Link href={`/${locale}/register`} className="w-full sm:w-auto" passHref>
                  <Button variant="premium" className="w-full sm:w-auto h-24 px-20 text-2xl rounded-3xl shadow-2xl">
                    {isFR ? 'S\'inscrire maintenant' : 'Register Now'}
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto" passHref>
                  <Button variant="outline" className="w-full sm:w-auto h-24 px-20 text-2xl text-white border-white/20 hover:bg-white/10 rounded-3xl bg-transparent backdrop-blur-3xl font-black uppercase tracking-widest">
                    {isFR ? 'Nous contacter' : 'Contact us'}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
