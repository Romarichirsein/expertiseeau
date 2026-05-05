"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
  Edit,
  Save,
  X,
  Loader2,
  Camera,
  Globe,
  ShieldCheck,
  Zap,
  Star,
  Download,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { updateExpert } from '@/lib/actions';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Utility: remove leading slashes and trim whitespace
const normalizeMember = (data: any) => {
  const clean = { ...data };
  if (typeof clean.name === 'string') clean.name = clean.name.replace(/^\//, '').trim();
  if (typeof clean.first_name === 'string') clean.first_name = clean.first_name.replace(/^\//, '').trim();
  [
    'profession',
    'email',
    'phone',
    'city',
    'country',
    'degree',
    'university',
  ].forEach((key) => {
    if (typeof clean[key] === 'string') clean[key] = clean[key].trim();
  });
  return clean;
};

// Helper to safely parse JSON‑stringified fields
const safeParse = (data: any) => {
  if (!data) return data;
  if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return data;
};

export default function MemberProfileClient({
  locale,
  member: initialMember,
}: {
  locale: string;
  member: any;
}) {
  const isFR = locale === 'fr';
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const member = normalizeMember(initialMember);
  const initialExpertise = Array.isArray(safeParse(member.expertise)) ? safeParse(member.expertise) : (member.expertise ? [member.expertise] : []);
  const initialExperience = safeParse(member.experience_years) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: member.name || '',
    profession: member.profession || '',
    email: member.email || '',
    phone: member.phone || '',
    city: member.city || '',
    country: member.country || 'Cameroun',
    degree: member.degree || '',
    university: member.university || '',
    photo: member.photo || '',
  });

  const handleSave = async () => {
    setLoading(true);
    const res = await updateExpert(member.id, formData);
    if (res.success) {
      router.refresh();
      setIsEditing(false);
    } else {
      console.error('Update failed:', res.error);
    }
    setLoading(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${member.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, photo: publicUrl }));
    } catch (error) {
      console.error('Error uploading photo:', error);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 font-inter transition-colors duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container relative z-10 max-w-5xl mx-auto px-6 pt-32 lg:pt-40 space-y-12">
        
        {/* Navigation / Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <Link href={`/${locale}/members`} passHref>
            <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 text-muted-foreground hover:text-primary transition-all group font-black text-xs uppercase tracking-widest">
              <div className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ChevronLeft size={20} strokeWidth={3} />
              </div>
              {isFR ? "Retour à l'annuaire" : "Back to Directory"}
            </Button>
          </Link>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "premium"}
            className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest gap-3 shadow-xl ${
              isEditing ? "border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white" : ""
            }`}
          >
            {isEditing ? <X size={20} strokeWidth={3} /> : <Edit size={20} strokeWidth={3} />}
            {isEditing ? (isFR ? 'Annuler' : 'Cancel') : (isFR ? 'Éditer mon profil' : 'Edit My Profile')}
          </Button>
        </div>

        {/* MAIN PROFILE HEADER CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="rounded-[4rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl overflow-hidden p-12 md:p-16 relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
            
            <CardContent className="p-0 flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10 text-center lg:text-left">
              {/* Avatar Section */}
              <div className="relative shrink-0 group">
                <div className="w-56 h-56 rounded-[3.5rem] p-1.5 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-primary/50 transition-all duration-700">
                  <div className="w-full h-full rounded-[3.2rem] overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center">
                    {formData.photo ? (
                      <img src={formData.photo} alt={formData.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    ) : (
                      <div className="text-slate-200 dark:text-slate-700">
                         <User size={100} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-primary/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all rounded-[3.5rem] shadow-2xl"
                  >
                    {uploading ? <Loader2 className="animate-spin w-10 h-10" /> : <Camera size={48} strokeWidth={2.5} />}
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                
                {/* Status Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[-10px] lg:translate-x-0 bg-emerald-500 text-white px-6 py-3 rounded-2xl border-8 border-background dark:border-slate-900/60 flex items-center gap-2.5 shadow-2xl whitespace-nowrap">
                  <ShieldCheck size={20} strokeWidth={3} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{isFR ? 'Certifié' : 'Certified'}</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-8 pt-4">
                <div className="space-y-6">
                   <h1 className="text-5xl md:text-7xl font-black text-foreground capitalize font-outfit tracking-tight leading-none uppercase">
                     {formData.name}
                   </h1>
                   <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
                      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 text-primary font-black text-[11px] uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-md shadow-sm">
                        <Briefcase size={18} strokeWidth={2.5} />
                        {formData.profession || (isFR ? 'Expert en Eau' : 'Water Expert')}
                      </div>
                      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/40 dark:bg-white/5 text-muted-foreground font-black text-[11px] uppercase tracking-[0.2em] border border-white/20 dark:border-white/10 backdrop-blur-md shadow-sm">
                        <MapPin size={18} strokeWidth={2.5} />
                        {formData.city}, {formData.country}
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/20 dark:border-white/5">
                   <div className="flex items-center justify-center lg:justify-start gap-5 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all shadow-inner border border-white/20 dark:border-white/10">
                         <Mail size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                         <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1.5">Email Institutional</div>
                         <div className="text-base font-bold text-foreground break-all">{formData.email}</div>
                      </div>
                   </div>
                   <div className="flex items-center justify-center lg:justify-start gap-5 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all shadow-inner border border-white/20 dark:border-white/10">
                         <Phone size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                         <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1.5">{isFR ? 'Ligne Directe' : 'Direct Line'}</div>
                         <div className="text-base font-bold text-foreground">{formData.phone}</div>
                      </div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              <Card className="rounded-[4rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 md:p-16">
                <CardContent className="p-0 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {[
                      { name: 'name', label: isFR ? 'Identité Nominale' : 'Nominal Identity' },
                      { name: 'profession', label: isFR ? 'Spécialité Principale' : 'Main Specialization' },
                      { name: 'email', label: 'Email Institutionnel' },
                      { name: 'phone', label: isFR ? 'Numéro Stratégique' : 'Strategic Number' },
                      { name: 'city', label: isFR ? 'Ville de Résidence' : 'City of Residence' },
                      { name: 'country', label: isFR ? 'Pays d\'Opération' : 'Country of Operation' },
                      { name: 'degree', label: isFR ? 'Plus Haut Diplôme' : 'Highest Degree' },
                      { name: 'university', label: 'Institution / Université' },
                    ].map((field) => (
                      <div key={field.name} className="space-y-3">
                        <Label className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">{field.label}</Label>
                        <Input
                          type="text"
                          value={(formData as any)[field.name]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-6 pt-12 border-t border-white/20 dark:border-white/5">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-white/20 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                      {isFR ? 'Abandonner' : 'Discard'}
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      variant="premium"
                      className="h-14 px-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30"
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5 mr-3" /> : <Save size={20} strokeWidth={3} className="mr-3" />}
                      {loading ? (isFR ? 'Transmission...' : 'Transmitting...') : (isFR ? 'Valider les modifications' : 'Validate Changes')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 gap-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Expertise */}
                 <Card className="rounded-[4rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 md:p-14 transition-all duration-700 hover:border-primary/20">
                   <CardContent className="p-0 space-y-10">
                     <div className="flex items-center gap-5 border-b border-white/20 dark:border-white/5 pb-8">
                       <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                          <Award size={32} strokeWidth={2.5} />
                       </div>
                       <h2 className="text-3xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? "Domaines d'Expertise" : 'Expertise Fields'}</h2>
                     </div>
                     {initialExpertise.length > 0 ? (
                       <div className="flex flex-wrap gap-3">
                         {initialExpertise.map((item: string, idx: number) => (
                           <span key={idx} className="px-6 py-3.5 bg-white/40 dark:bg-white/5 text-muted-foreground text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border border-white/20 dark:border-white/5 shadow-sm transition-all hover:border-primary/50 hover:bg-white dark:hover:bg-white/10 hover:text-primary hover:scale-105">
                             {item}
                           </span>
                         ))}
                       </div>
                     ) : (
                       <div className="py-10 text-center bg-white/20 dark:bg-black/20 rounded-[2rem] border border-dashed border-white/20 dark:border-white/10">
                         <p className="text-muted-foreground italic text-sm font-medium">{isFR ? "Aucune expertise stratégique spécifiée" : "No strategic expertise specified"}</p>
                       </div>
                     )}
                   </CardContent>
                 </Card>

                 {/* Education */}
                 <Card className="rounded-[4rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 md:p-14 transition-all duration-700 hover:border-primary/20">
                   <CardContent className="p-0 space-y-10">
                     <div className="flex items-center gap-5 border-b border-white/20 dark:border-white/5 pb-8">
                       <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                          <GraduationCap size={32} strokeWidth={2.5} />
                       </div>
                       <h2 className="text-3xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Parcours Académique' : 'Academic Path'}</h2>
                     </div>
                     <div className="space-y-6">
                        <div className="p-10 bg-white/40 dark:bg-black/20 rounded-[2.5rem] border border-white/20 dark:border-white/10 group hover:border-primary/40 transition-all duration-500 shadow-xl">
                           <p className="font-black text-foreground text-2xl mb-3 leading-tight group-hover:text-primary transition-colors font-outfit uppercase tracking-tight">{formData.degree || '---'}</p>
                           <p className="text-[12px] text-primary font-black uppercase tracking-[0.4em] opacity-80">{formData.university || '---'}</p>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] pl-6">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                           {isFR ? 'Authentifié par le Réseau Institutionnel' : 'Authenticated by Institutional Network'}
                        </div>
                     </div>
                   </CardContent>
                 </Card>
              </div>

              {/* Experience - Full Width */}
              <Card className="rounded-[4.5rem] border-white/20 dark:border-white/5 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-12 md:p-20 transition-all duration-700 hover:border-primary/20">
                <CardContent className="p-0 space-y-16">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/20 dark:border-white/5 pb-12">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                         <Briefcase size={40} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-4xl font-black text-foreground font-outfit uppercase tracking-tight">{isFR ? 'Missions & Réalisations' : 'Missions & Achievements'}</h2>
                        <p className="text-muted-foreground font-medium">{isFR ? 'Historique des interventions stratégiques certifiées.' : 'History of certified strategic interventions.'}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] gap-3 border-white/20 dark:border-white/10">
                      <Download size={18} />
                      {isFR ? 'Télécharger le Portfolio' : 'Download Portfolio'}
                    </Button>
                  </div>
                  {Object.keys(initialExperience).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                      {Object.entries(initialExperience).map(([key, value]) => (
                        <div key={key} className="flex flex-col p-10 bg-white/40 dark:bg-black/20 rounded-[3rem] border border-white/20 dark:border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] group-hover:text-primary transition-colors">{key}</span>
                            <Zap size={18} className="text-primary/40 group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-xl text-foreground font-black font-outfit leading-tight uppercase tracking-tight transition-colors">
                            {Array.isArray(value) ? value.join(', ') : (value as string)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-32 text-center bg-white/20 dark:bg-black/20 rounded-[4rem] border-4 border-dashed border-white/10">
                      <Zap size={64} className="mx-auto text-primary/20 mb-8" />
                      <p className="text-muted-foreground italic text-lg font-medium">{isFR ? "Aucun historique de mission disponible" : "No mission history available"}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
