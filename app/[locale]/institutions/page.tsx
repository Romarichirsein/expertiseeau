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

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-48 md:pt-60 pb-32 md:pb-40 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl space-y-12"
          >
            <div className="section-label bg-white/5 border-white/10 text-primary-light">
              <Building2 size={16} />
              {isFR ? 'Acteurs du secteur' : 'Sector Actors'}
            </div>
            <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
              {isFR ? 'Les ' : 'Institutional '}
              <span className="text-gradient italic">{isFR ? 'Institutions' : 'Directory'}</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
              {isFR
                ? "Identifiez les acteurs clés du secteur de l'eau et de l'assainissement au Cameroun. Une base de données institutionnelle certifiée."
                : "Identify key actors in the water and sanitation sector in Cameroon. A certified institutional database."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container -mt-20 md:-mt-28 relative z-20 px-6">
        {/* FILTERS CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-10 md:p-14 rounded-[4rem] border-none glass-card shadow-2xl premium-shadow overflow-hidden">
            <CardContent className="p-0 flex flex-col lg:flex-row justify-between items-center gap-12">
              {/* TABS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    variant={activeTab === cat.id ? "premium" : "outline"}
                    className={`h-16 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all gap-3 ${
                      activeTab === cat.id 
                        ? 'shadow-xl shadow-primary/20' 
                        : 'bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 text-muted-foreground'
                    }`}
                  >
                    <cat.icon size={20} />
                    {isFR ? cat.label : cat.labelEN}
                  </Button>
                ))}
              </div>

              {/* SEARCH */}
              <div className="relative group w-full lg:max-w-md">
                <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder={isFR ? "Rechercher une institution..." : "Search institution..."}
                  className="w-full h-20 pl-20 pr-10 bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/5 rounded-3xl outline-none focus-visible:ring-primary/20 text-lg font-bold shadow-inner"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RESULTS */}
        <div className="section-padding">
          {loading ? (
            <div className="py-60 flex flex-col items-center justify-center gap-8">
              <Loader2 size={64} className="text-primary animate-spin" />
              <p className="text-muted-foreground font-black text-xs uppercase tracking-[0.4em] animate-pulse">
                {isFR ? "Chargement des institutions..." : "Loading institutions..."}
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-40 text-center space-y-10 bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-white/20 dark:border-white/5 premium-shadow px-10"
            >
              <div className="w-32 h-32 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                <SearchX size={56} className="text-primary" />
              </div>
              <h3 className="text-4xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Aucun résultat trouvé' : 'No results found'}</h3>
              <Button 
                variant="premium"
                onClick={() => { setSearch(''); setActiveTab('all'); }} 
                className="h-16 px-14 rounded-2xl font-black uppercase text-xs tracking-widest"
              >
                {isFR ? 'Réinitialiser' : 'Reset Filters'}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                      <Card className="h-full border-none glass-card rounded-[3.5rem] hover:shadow-2xl hover:shadow-primary/10 group-hover:-translate-y-3 transition-all duration-700 flex flex-col justify-between p-0 overflow-hidden premium-shadow">
                        <CardContent className="p-12 space-y-10">
                          <div className="flex justify-between items-start">
                            <span className="px-6 py-2.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-2xl border border-primary/20 backdrop-blur-md">
                              {inst.sigle || 'INST'}
                            </span>
                            <div className="text-emerald-500 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 shadow-sm backdrop-blur-md">
                              <ShieldCheck size={28} strokeWidth={2.5} />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <h3 className="text-3xl font-black text-foreground font-outfit leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                              {inst.nom}
                            </h3>
                            <p className="text-lg text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                              {inst.mandat || (isFR ? 'Mandat institutionnel certifié au service de la nation.' : 'Certified institutional mandate at the service of the nation.')}
                            </p>
                          </div>
                        </CardContent>
                        
                        <div className="px-12 py-10 bg-slate-50/50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between group-hover:bg-primary group-hover:text-white transition-all duration-700">
                          <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] group-hover:text-white transition-colors">
                            <MapPin size={20} strokeWidth={2.5} className="text-primary group-hover:text-white" />
                            {inst.siege || 'Yaoundé'}
                          </div>
                          <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-all duration-700 shadow-sm">
                            <ChevronRight size={28} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
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
          className="section-padding-large"
        >
          <Card className="relative overflow-hidden rounded-[5rem] bg-slate-900 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] p-20 md:p-32 text-center border border-white/10">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 flex flex-col items-center gap-14 max-w-4xl mx-auto">
               <div className="section-label bg-white/5 border-white/10 text-primary-light">
                  <Sparkles size={20} />
                  {isFR ? 'Expansion du réseau' : 'Network Expansion'}
               </div>
               <h3 className="text-5xl md:text-8xl font-black font-outfit leading-[1] tracking-tight text-white uppercase text-balance">
                  {isFR ? 'Votre institution n\'est pas encore ' : 'Your institution is not yet '}
                  <span className="text-gradient italic">{isFR ? 'listée' : 'listed'}</span> ?
               </h3>
               <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed text-balance">
                  {isFR 
                    ? "Inscrivez votre organisation au répertoire national certifié pour augmenter votre visibilité institutionnelle." 
                    : "Register your organization to the certified national directory to increase your institutional visibility."}
               </p>
               <Button variant="premium" className="h-24 px-16 rounded-3xl shadow-2xl text-2xl font-black uppercase tracking-widest gap-6 group">
                  {isFR ? 'Soumettre l\'Institution' : 'Submit Institution'}
                  <ChevronRight size={32} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
               </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
