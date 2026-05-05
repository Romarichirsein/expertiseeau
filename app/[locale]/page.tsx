"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Building2, Globe, Clock, ArrowRight, ShieldCheck, BookOpen, Zap
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
    <div className="bg-background text-foreground overflow-hidden font-inter transition-colors duration-500">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-[200px] pb-[120px] min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
              className="w-full h-full object-cover grayscale opacity-20 dark:opacity-30 mix-blend-overlay" 
              alt="Institutional Background"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 dark:to-primary/10" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-float" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto space-y-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-[12px] font-bold uppercase tracking-[0.25em] border border-primary/20 backdrop-blur-md shadow-sm"
            >
              <Zap size={16} className="text-primary" />
              {isFR ? 'Portail National de l\'Expertise' : 'National Expertise Portal'}
            </motion.div>
            
            <h1 className="text-[50px] md:text-[80px] lg:text-[100px] font-black leading-[1.05] tracking-tight font-outfit text-balance">
              {isFR ? (
                <><span className="text-foreground">L'Excellence de l'</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 italic">Expertise</span></>
              ) : (
                <><span className="text-foreground">Excellence in </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 italic">Expertise</span></>
              )}
            </h1>
            
            <p className="text-[20px] md:text-[24px] leading-[1.8] text-muted-foreground max-w-3xl mx-auto font-medium text-balance">
              {isFR
                ? 'Le premier réseau institutionnel structuré dédié à la promotion et la certification des professionnels du secteur de l\'eau au Cameroun.'
                : 'The first structured institutional network dedicated to the promotion and certification of water professionals in Cameroon.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
              <Link href={`/${locale}/members`} passHref>
                <Button variant="premium" size="lg" className="w-full sm:w-auto h-16 px-10 text-[15px] rounded-2xl">
                  {isFR ? 'Consulter l\'Annuaire' : 'View Directory'}
                </Button>
              </Link>
              <Link href={`/${locale}/register`} passHref>
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-[15px] rounded-2xl border-2 hover:bg-primary/5">
                  {isFR ? 'Devenir Membre' : 'Become a Member'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-32 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Card key={i} className="group hover:-translate-y-2 transition-all duration-500 border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-primary/5">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <stat.icon size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-5xl font-black text-foreground mb-2 font-outfit tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BENTO GRID SERVICES ==================== */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/20">
        <div className="container">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight font-outfit mb-6">
              {isFR ? 'Vision Nationale' : 'National Vision'}
            </h2>
            <p className="text-xl leading-relaxed text-muted-foreground">
              {isFR 
                ? 'Un écosystème au service de l\'excellence et de la certification des acteurs majeurs du secteur.'
                : 'An ecosystem serving the excellence and certification of major players in the sector.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <Link key={i} href={svc.href} className={`block ${svc.colSpan}`}>
                <Card className="h-full group hover:border-primary/50 transition-colors bg-white dark:bg-secondary overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-10 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                      <svc.icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 font-outfit group-hover:text-primary transition-colors">{svc.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground flex-1">{svc.desc}</p>
                    
                    <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-primary">
                      {isFR ? 'Explorer' : 'Explore'}
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DIASPORA ==================== */}
      <section className="py-32 bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] mix-blend-screen" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-teal-400 uppercase">
                <Globe size={18} />
                {isFR ? 'MOBILISATION DIASPORA' : 'DIASPORA MOBILIZATION'}
              </div>
              <h2 className="text-4xl md:text-6xl leading-[1.1] font-black text-white font-outfit text-balance">
                {isFR ? 'Le rayonnement international de l\'expertise' : 'The international reach of expertise'}
              </h2>
              <p className="text-xl leading-relaxed text-slate-300 max-w-xl">
                {isFR 
                  ? 'Experts résidant à l\'étranger, rejoignez le réseau national pour contribuer au développement stratégique du secteur de l\'eau.'
                  : 'Experts living abroad, join the national network to contribute to the strategic development of the water sector.'}
              </p>
              <Link href={`/${locale}/register/diaspora`} passHref>
                <Button variant="premium" size="lg" className="h-14 px-8 text-sm rounded-xl">
                  {isFR ? 'S\'inscrire comme Expert' : 'Register as Expert'}
                </Button>
              </Link>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden min-h-[450px] shadow-2xl border border-white/10 group"
            >
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Diaspora" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 glass-premium p-6 rounded-2xl">
                <div className="text-5xl font-black text-white font-outfit leading-none mb-2">120+</div>
                <div className="text-sm font-bold tracking-[0.15em] uppercase text-teal-400">
                  {isFR ? 'EXPERTS DIASPORA ACTIFS' : 'ACTIVE DIASPORA EXPERTS'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-32 bg-background">
        <div className="container">
          <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-teal-600 rounded-[2.5rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-black mb-4 font-outfit leading-tight text-balance">
                {isFR ? 'Propulsez votre expertise au sommet' : 'Launch your expertise to the top'}
              </h2>
              <p className="text-xl leading-relaxed text-white/90">
                {isFR 
                  ? 'Rejoignez la plateforme institutionnelle de référence et accédez aux meilleures opportunités du secteur.'
                  : 'Join the institutional reference platform and access the best opportunities in the sector.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4 w-full sm:w-auto">
                <Link href={`/${locale}/register`} className="w-full sm:w-auto" passHref>
                  <Button size="lg" className="w-full h-14 px-10 text-primary bg-white hover:bg-slate-50 text-[15px] font-bold rounded-xl">
                    {isFR ? 'S\'inscrire maintenant' : 'Register Now'}
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto" passHref>
                  <Button variant="outline" size="lg" className="w-full h-14 px-10 text-white border-white/30 hover:bg-white/10 text-[15px] font-bold rounded-xl bg-transparent">
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
