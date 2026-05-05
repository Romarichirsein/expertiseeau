"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Search, MapPin, ExternalLink, GraduationCap, Users,
  Briefcase, Loader2, X, SearchX, ShieldCheck, ChevronRight, Zap, Globe, Sparkles
} from "lucide-react";
import Link from "next/link";
import { getInstitutions } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "all", label: "Toutes", labelEN: "All", icon: Building2 },
  { id: "public", label: "Public", labelEN: "Public", icon: Building2 },
  { id: "ngo", label: "ONGs", labelEN: "NGOs", icon: Users },
  { id: "private", label: "Privé", labelEN: "Private", icon: Briefcase },
  { id: "edu", label: "Éducation", labelEN: "Education", icon: GraduationCap },
];

export default function InstitutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === "fr";

  useEffect(() => {
    async function loadData() {
      const data = await getInstitutions();
      setInstitutions(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return institutions.filter((inst) => {
      const matchesTab =
        activeTab === "all" ||
        inst.category === activeTab ||
        (activeTab === "public" && !inst.category);
      const q = search.toLowerCase();
      const matchesSearch =
        (inst.nom || "").toLowerCase().includes(q) ||
        (inst.sigle || "").toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [institutions, activeTab, search]);

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* PAGE HEADER */}
      <div className="bg-slate-900 pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <Building2 size={18} />
              {isFR ? 'Acteurs du secteur' : 'Sector Actors'}
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight font-outfit leading-[0.9]">
              {isFR ? 'Les ' : 'Institutional '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'Institutions' : 'Directory'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-2xl font-inter leading-relaxed">
              {isFR
                ? "Identifiez les acteurs clés du secteur de l'eau et de l'assainissement au Cameroun. Une base de données institutionnelle certifiée."
                : "Identify key actors in the water and sanitation sector in Cameroon. A certified institutional database."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container -mt-16 md:-mt-24 relative z-20 px-6">
        {/* FILTERS CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 rounded-[3.5rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl overflow-hidden">
            <CardContent className="p-0 flex flex-col lg:flex-row justify-between items-center gap-10">
              {/* TABS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    variant={activeTab === cat.id ? "premium" : "outline"}
                    className={`h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all gap-2.5 ${
                      activeTab === cat.id 
                        ? 'shadow-xl shadow-primary/20' 
                        : 'bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 text-muted-foreground'
                    }`}
                  >
                    <cat.icon size={18} />
                    {isFR ? cat.label : cat.labelEN}
                  </Button>
                ))}
              </div>

              {/* SEARCH */}
              <div className="relative group w-full lg:max-w-md">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder={isFR ? "Rechercher une institution..." : "Search institution..."}
                  className="w-full h-16 pl-16 pr-8 bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/5 rounded-2xl outline-none focus-visible:ring-primary/20 text-base font-bold shadow-inner"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RESULTS */}
        <div className="mt-16">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center gap-6">
              <Loader2 size={48} className="text-primary animate-spin" />
              <p className="text-muted-foreground font-black text-xs uppercase tracking-[0.4em] animate-pulse">
                {isFR ? "Chargement des institutions..." : "Loading institutions..."}
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-40 text-center space-y-8 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/20 dark:border-white/5 shadow-2xl px-10"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <SearchX size={48} className="text-primary" />
              </div>
              <h3 className="text-3xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Aucun résultat trouvé' : 'No results found'}</h3>
              <Button 
                variant="premium"
                onClick={() => { setSearch(''); setActiveTab('all'); }} 
                className="h-14 px-10 rounded-2xl font-black uppercase text-[11px] tracking-widest"
              >
                {isFR ? 'Réinitialiser' : 'Reset Filters'}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredData.map((inst, i) => (
                  <motion.div
                    key={inst.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  >
                    <Link 
                      href={`/${locale}/institutions/${inst.id}`}
                      className="group block h-full"
                    >
                      <Card className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[3rem] border border-white/20 dark:border-white/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 group-hover:-translate-y-2 transition-all duration-700 flex flex-col justify-between p-0 overflow-hidden">
                        <CardContent className="p-10 space-y-8">
                          <div className="flex justify-between items-start">
                            <span className="px-5 py-2 bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest rounded-2xl border border-primary/20 backdrop-blur-md">
                              {inst.sigle || 'INST'}
                            </span>
                            <div className="text-emerald-500 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 shadow-sm backdrop-blur-md">
                              <ShieldCheck size={24} strokeWidth={2.5} />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-2xl font-black text-foreground font-outfit leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                              {inst.nom}
                            </h3>
                            <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                              {inst.mandat || (isFR ? 'Mandat institutionnel certifié au service de la nation.' : 'Certified institutional mandate at the service of the nation.')}
                            </p>
                          </div>
                        </CardContent>
                        
                        <div className="px-10 py-8 bg-white/40 dark:bg-black/20 border-t border-white/20 dark:border-white/5 flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-700">
                          <div className="flex items-center gap-3 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                            <MapPin size={18} strokeWidth={2.5} className="text-primary group-hover:text-white" />
                            {inst.siege || 'Yaoundé'}
                          </div>
                          <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-all duration-700 shadow-sm">
                            <ChevronRight size={24} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* FINAL CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-14 md:p-24 bg-slate-900 dark:bg-black/40 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border border-white/10"
        >
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
           
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left">
              <div className="max-w-2xl space-y-8">
                 <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em]">
                    <Sparkles size={18} />
                    {isFR ? 'Expansion du réseau' : 'Network Expansion'}
                 </div>
                 <h3 className="text-4xl md:text-6xl font-black font-outfit leading-[1.1] tracking-tight">
                    {isFR ? 'Votre institution n\'est pas encore ' : 'Your institution is not yet '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'listée' : 'listed'}</span> ?
                 </h3>
                 <p className="text-xl text-slate-400 font-medium leading-relaxed">
                    {isFR 
                      ? "Inscrivez votre organisation au répertoire national certifié pour augmenter votre visibilité institutionnelle." 
                      : "Register your organization to the certified national directory to increase your institutional visibility."}
                 </p>
              </div>
              <Button variant="premium" className="h-20 px-14 rounded-[1.75rem] shadow-2xl text-xl font-black uppercase tracking-widest gap-4 group">
                 {isFR ? 'Soumettre l\'Institution' : 'Submit Institution'}
                 <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
