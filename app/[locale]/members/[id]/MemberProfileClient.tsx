"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Edit,
  Save,
  X,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { updateExpert } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function MemberProfileClient({ locale, member: initialMember }: { locale: string, member: any }) {
  const isFR = locale === 'fr';
  const router = useRouter();
  
  // Helper to parse stringified JSON from Supabase if necessary
  const safeParse = (data: any) => {
    if (!data) return data;
    if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
    return data;
  };

  // Parse initial data
  const getParsedData = (m: any) => ({
    ...m,
    name: m.name?.replace(/^\/\s*/, '') || '',
    expertise: safeParse(m.expertise),
    experience_years: safeParse(m.experience_years)
  });

  const [member, setMember] = useState(getParsedData(initialMember));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: member.name || '',
    profession: member.profession || '',
    email: member.email || '',
    phone: member.phone || '',
    city: member.city || '',
    country: member.country || 'Cameroun',
    degree: member.degree || '',
    university: member.university || '',
  });

  // Format expertise array
  const expertiseList = Array.isArray(member.expertise) ? member.expertise : [];
  
  // Format experience data
  const exp = (typeof member.experience_years === 'object' && member.experience_years !== null) 
    ? member.experience_years 
    : {};

  const handleSave = async () => {
    setLoading(true);
    const result = await updateExpert(member.id, formData);
    if (result.success) {
      setMember({ ...member, ...formData });
      setIsEditing(false);
      router.refresh();
    } else {
      alert(isFR ? "Erreur lors de la mise à jour" : "Error during update");
    }
    setLoading(false);
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link & Edit Toggle */}
        <div className="flex justify-between items-center px-4">
          <Link 
            href={`/${locale}/members`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
          >
            <ChevronLeft size={16} />
            {isFR ? 'Retour à l\'annuaire' : 'Back to directory'}
          </Link>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${isEditing ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
          >
            {isEditing ? (
              <><X size={16} /> {isFR ? 'Annuler' : 'Cancel'}</>
            ) : (
              <><Edit size={16} /> {isFR ? 'Modifier ce profil' : 'Edit profile'}</>
            )}
          </button>
        </div>

        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card overflow-hidden p-0 border-none shadow-xl"
          style={{ backgroundColor: '#fff' }}
        >
          <div className="h-40 bg-gradient-to-r from-[#0a5694] to-[#0d9488] relative">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover"></div>
          </div>

          <div className="px-6 md:px-10 pb-10 relative">
            {/* Profile Photo Placeholder */}
            <div className="absolute -top-16 left-6 md:left-10">
              <div className="w-32 h-32 rounded-3xl bg-[#f4f6f9] border-[6px] border-white flex items-center justify-center text-[#0a5694] shadow-xl overflow-hidden">
                <User size={64} strokeWidth={1.5} />
              </div>
            </div>

            <div className="pt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4 flex-1">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">{isFR ? 'Nom Complet' : 'Full Name'}</label>
                      <input 
                        className="w-full p-3 rounded-xl border border-border bg-muted/50 focus:bg-white transition-all outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">{isFR ? 'Profession' : 'Profession'}</label>
                      <input 
                        className="w-full p-3 rounded-xl border border-border bg-muted/50 focus:bg-white transition-all outline-none"
                        value={formData.profession}
                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-outfit font-bold capitalize text-[#0f172a]">{member.name}</h1>
                    <p className="text-[#0a5694] font-bold text-lg flex items-center gap-2">
                      <Briefcase size={18} />
                      {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4 text-[#64748b] text-sm">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase">{isFR ? 'Ville' : 'City'}</label>
                        <input className="w-full p-2 text-sm rounded-lg border border-border" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase">Email</label>
                        <input className="w-full p-2 text-sm rounded-lg border border-border" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase">{isFR ? 'Téléphone' : 'Phone'}</label>
                        <input className="w-full p-2 text-sm rounded-lg border border-border" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5"><MapPin size={16} className="text-[#0a5694]" /> {member.city || 'Cameroun'}, {member.country || 'Cameroun'}</div>
                      <div className="flex items-center gap-1.5"><Mail size={16} className="text-[#0a5694]" /> {member.email}</div>
                      {member.phone && <div className="flex items-center gap-1.5"><Phone size={16} className="text-[#0a5694]" /> {member.phone}</div>}
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-4 bg-[#0a5694] text-white rounded-2xl font-bold shadow-xl shadow-[#0a5694]/20 hover:bg-[#062040] transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {isFR ? 'Enregistrer les modifications' : 'Save Changes'}
                </button>
              ) : (
                <button className="px-8 py-4 bg-[#0a5694] text-white rounded-2xl font-bold shadow-xl shadow-[#0a5694]/20 hover:bg-[#062040] transition-all flex items-center gap-3">
                  <Mail size={20} />
                  {isFR ? 'Contactez l\'expert' : 'Contact expert'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expertise Section */}
            <section className="premium-card space-y-6">
              <div className="flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
                <Award className="text-[#0a5694]" size={24} />
                <h2 className="text-xl font-bold font-outfit text-[#0f172a]">{isFR ? 'Domaines d\'Expertise' : 'Areas of Expertise'}</h2>
              </div>
              {expertiseList.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {expertiseList.map((item: string, i: number) => (
                    <span key={i} className="expert-badge" style={{ padding: '8px 16px', fontSize: '12px' }}>
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748b] italic">{isFR ? 'Aucun domaine d\'expertise spécifié.' : 'No areas of expertise specified.'}</p>
              )}
            </section>

            {/* Experience Grid */}
            <section className="premium-card space-y-6">
              <div className="flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
                <Briefcase className="text-[#0a5694]" size={24} />
                <h2 className="text-xl font-bold font-outfit text-[#0f172a]">{isFR ? 'Expérience Sectorielle' : 'Sector Experience'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(exp).map(([key, value], i) => {
                  if (!value || (Array.isArray(value) && value.length === 0)) return null;
                  const labels: { [k: string]: string } = isFR ? 
                    { research: 'Recherche', management: 'Gestion', teaching: 'Enseignement', works: 'Ouvrages', supply: 'Eau Potable', sanitation: 'Assainissement' } :
                    { research: 'Research', management: 'Management', teaching: 'Teaching', works: 'Works', supply: 'Water Supply', sanitation: 'Sanitation' };
                  
                  return (
                    <div key={i} className="p-4 bg-[#f4f6f9]/50 rounded-2xl border border-[#e2e8f0] flex justify-between items-center transition-all hover:bg-white hover:border-[#0a5694]/20">
                      <span className="text-sm font-semibold text-[#1e293b]">{labels[key] || key}</span>
                      <span className="px-3 py-1 bg-[#0a5694]/10 text-[#0a5694] text-[11px] font-bold rounded-lg uppercase">
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
            <section className="premium-card space-y-6">
              <div className="flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
                <GraduationCap className="text-[#0a5694]" size={24} />
                <h2 className="text-xl font-bold font-outfit text-[#0f172a]">{isFR ? 'Formation' : 'Education'}</h2>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground">{isFR ? 'Diplôme' : 'Degree'}</label>
                    <input className="w-full p-3 rounded-xl border border-border text-sm" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-muted-foreground">{isFR ? 'Université' : 'University'}</label>
                    <input className="w-full p-3 rounded-xl border border-border text-sm" value={formData.university} onChange={(e) => setFormData({...formData, university: e.target.value})} />
                  </div>
                </div>
              ) : (
                member.degree ? (
                  <div className="space-y-4">
                    <div className="relative pl-6 border-l-2 border-[#0a5694]/20 space-y-1">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#0a5694]"></div>
                      <h4 className="font-bold text-sm leading-tight text-[#0f172a]">{member.degree}</h4>
                      <p className="text-xs text-[#64748b]">{member.university}</p>
                      <div className="flex items-center gap-1 text-[10px] text-[#0a5694] font-bold uppercase mt-2">
                        <Calendar size={10} />
                        {member.experience_years?.graduation_year || 'N/A'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#64748b] italic">{isFR ? 'Détails non communiqués.' : 'Details not provided.'}</p>
                )
              )}
            </section>

            {/* Migration Source Note */}
            <section className="p-6 bg-[#062040] rounded-[2rem] text-white space-y-3 shadow-xl">
               <h4 className="font-bold text-[10px] uppercase tracking-[2px] opacity-60">{isFR ? 'Source des données' : 'Data Source'}</h4>
               <p className="text-xs leading-relaxed opacity-90 italic">
                 {isFR 
                   ? "Ce compte a été importé avec succès depuis l'ancienne plateforme WordPress du projet Expertise Au Cameroun."
                   : "This account was successfully imported from the original Expertise Au Cameroun WordPress platform."}
               </p>
               <div className="pt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400">{isFR ? 'Vérifié' : 'Verified'}</span>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
