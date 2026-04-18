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
  Mail as MailIcon
} from 'lucide-react';
import Link from 'next/link';

export default function InstitutionDetailClient({ locale, institution }: { locale: string; institution: any }) {
  const isFR = locale === 'fr';

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Back Link */}
      <Link 
        href={`/${locale}/institutions`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        <ChevronLeft size={16} />
        {isFR ? 'Retour aux institutions' : 'Back to institutions'}
      </Link>

      {/* Hero Header */}
      <div className="relative rounded-[3rem] overflow-hidden bg-primary-950 p-10 md:p-20 text-white min-h-[400px] flex items-end">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest text-primary-400">
            <Building2 size={16} />
            { institution.type || 'Institution' }
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-bold leading-tight">{institution.nom}</h1>
          <div className="flex flex-wrap gap-6 text-white/70">
            <div className="flex items-center gap-2"><MapPin size={18} /> {institution.siege || 'Yaoundé'}, Cameroon</div>
            <div className="flex items-center gap-2"><Briefcase size={18} /> {isFR ? 'Secteur Public' : 'Public Sector'}</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6 text-lg leading-relaxed text-muted-foreground font-light">
            <h2 className="text-3xl font-bold font-outfit text-foreground">{isFR ? 'À propos de l\'institution' : 'About the institution'}</h2>
            <p>
              {institution.description || (isFR 
                ? "Cette institution joue un rôle clé dans la structuration et la gestion des ressources hydrauliques au Cameroun, collaborant étroitement avec le réseau des experts nationaux."
                : "This institution plays a key role in the structuring and management of hydraulic resources in Cameroon, collaborating closely with the national expert network.")}
            </p>
            <p>
              {institution.mandat && (
                <span className="italic block mt-4 border-l-4 border-primary pl-4">
                   "{institution.mandat}"
                </span>
              )}
            </p>
          </section>

          {/* Key Figures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-[2rem] border border-white/20 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold font-outfit">45+</div>
                <div className="text-sm text-muted-foreground">{isFR ? 'Experts liés' : 'Linked experts'}</div>
              </div>
            </div>
            <div className="glass p-8 rounded-[2rem] border border-white/20 space-y-4">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-2xl flex items-center justify-center text-accent-teal">
                <FileText size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold font-outfit">12</div>
                <div className="text-sm text-muted-foreground">{isFR ? 'Projets encadrés' : 'Supervised projects'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-8">
              <div className="space-y-2">
                 <h4 className="font-bold text-xs uppercase tracking-widest text-primary">{isFR ? 'Coordonnées' : 'Contact Details'}</h4>
                 <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-muted-foreground shrink-0 mt-1" size={18} />
                       <div className="text-sm font-medium">B.P. 510, {institution.siege || 'Yaoundé'}</div>
                    </div>
                    {institution.site && (
                      <div className="flex items-start gap-4">
                         <Globe className="text-muted-foreground shrink-0 mt-1" size={18} />
                         <div className="text-sm font-medium text-primary hover:underline cursor-pointer flex items-center gap-1">
                            {institution.site}
                            <ExternalLink size={12} />
                         </div>
                      </div>
                    )}
                 </div>
              </div>

              <div className="pt-8 border-t border-border">
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
                  <MailIcon className="size-4" />
                  {isFR ? 'Écrire à l\'institution' : 'Contact institution'}
                </button>
              </div>
           </section>

           <section className="bg-secondary/30 p-8 rounded-[2.5rem] border border-border space-y-6">
              <h4 className="font-bold text-sm">{isFR ? 'Ressources utiles' : 'Useful resources'}</h4>
              <ul className="space-y-3">
                 {['Organigramme', 'Plan d\'action 2025', 'Rapports annuels'].map((item, i) => (
                   <li key={i} className="flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-primary cursor-pointer group">
                      {item}
                      <ChevronLeft size={14} className="group-hover:translate-x-1 transition-transform rotate-180" />
                   </li>
                 ))}
              </ul>
           </section>
        </div>
      </div>
    </div>
  );
}
