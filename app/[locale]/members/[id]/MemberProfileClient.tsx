"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen, 
  ChevronLeft,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function MemberProfileClient({ locale, member }: { locale: string, member: any }) {
  const isFR = locale === 'fr';
  
  // Format expertise array
  const expertiseList = Array.isArray(member.expertise) ? member.expertise : [];
  
  // Format experience data
  const exp = member.experience_years || {};

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Back Link */}
      <Link 
        href={`/${locale}/members`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        <ChevronLeft size={16} />
        {isFR ? 'Retour à l\'annuaire' : 'Back to directory'}
      </Link>

      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="h-48 bg-gradient-to-r from-primary-900 via-primary-700 to-primary-900 relative">
          <div className="absolute inset-0 bg-mesh opacity-30"></div>
          {/* Status Badge */}
          <div className="absolute top-6 right-8 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              {isFR ? 'Expert Certifié' : 'Certified Expert'}
            </span>
          </div>
        </div>

        <div className="px-8 md:px-12 pb-12 relative">
          {/* Profile Photo Placeholder */}
          <div className="absolute -top-16 left-8 md:left-12">
            <div className="w-32 h-32 rounded-3xl bg-secondary border-[6px] border-background flex items-center justify-center text-primary shadow-2xl overflow-hidden shadow-primary/10">
              <User size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="pt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-outfit font-bold capitalize">{member.name}</h1>
                <p className="text-primary font-bold text-lg flex items-center gap-2">
                  <Briefcase size={18} />
                  {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> {member.city || 'Cameroun'}, {member.country || 'Cameroun'}</div>
                <div className="flex items-center gap-1.5"><Mail size={16} className="text-primary" /> {member.email}</div>
                {member.phone && <div className="flex items-center gap-1.5"><Phone size={16} className="text-primary" /> {member.phone}</div>}
              </div>
            </div>

            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-600 transition-all flex items-center gap-3">
              <Mail size={20} />
              {isFR ? 'Contactez l\'expert' : 'Contact expert'}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Expertise Section */}
          <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Award className="text-primary" size={24} />
              <h2 className="text-xl font-bold font-outfit">{isFR ? 'Domaines d\'Expertise' : 'Areas of Expertise'}</h2>
            </div>
            {expertiseList.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {expertiseList.map((item: string, i: number) => (
                  <span key={i} className="px-5 py-2.5 bg-secondary/50 rounded-xl text-primary font-bold text-sm border border-primary/10">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">{isFR ? 'Aucun domaine d\'expertise spécifié.' : 'No areas of expertise specified.'}</p>
            )}
          </section>

          {/* Experience Grid */}
          <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Briefcase className="text-primary" size={24} />
              <h2 className="text-xl font-bold font-outfit">{isFR ? 'Expérienceectorielle' : 'Sector Experience'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(exp).map(([key, value], i) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                const labels: { [k: string]: string } = isFR ? 
                  { research: 'Recherche', management: 'Gestion', teaching: 'Enseignement', works: 'Ouvrages', supply: 'Eau Potable', sanitation: 'Assainissement' } :
                  { research: 'Research', management: 'Management', teaching: 'Teaching', works: 'Works', supply: 'Water Supply', sanitation: 'Sanitation' };
                
                return (
                  <div key={i} className="p-4 bg-secondary/30 rounded-2xl border border-border flex justify-between items-center">
                    <span className="text-sm font-medium">{labels[key] || key}</span>
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary font-bold rounded-lg uppercase">
                      {Array.isArray(value) ? value[0] : value}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-8">
          {/* Education */}
          <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <GraduationCap className="text-primary" size={24} />
              <h2 className="text-xl font-bold font-outfit">{isFR ? 'Formation' : 'Education'}</h2>
            </div>
            {member.degree ? (
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-primary/20 space-y-1">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-sm leading-tight">{member.degree}</h4>
                  <p className="text-xs text-muted-foreground">{member.university}</p>
                  <div className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase mt-2">
                    <Calendar size={10} />
                    {member.experience_years?.graduation_year || 'N/A'}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">{isFR ? 'Détails non communiqués.' : 'Details not provided.'}</p>
            )}
          </section>

          {/* Social / Sharing */}
          <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-4">
             <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{isFR ? 'Partager ce profil' : 'Share this profile'}</h4>
             <div className="flex gap-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <BookOpen size={18} />
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
