// MemberProfileClient.tsx
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
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { updateExpert } from '@/lib/actions';
import { supabase } from '@/lib/supabase';

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
    <div className="min-h-screen bg-slate-50/50 pb-32 pt-64 font-inter">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Navigation / Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link 
            href={`/${locale}/members`} 
            className="flex items-center gap-2 text-slate-500 hover:text-[#0a5694] transition-all text-sm font-bold group"
          >
            <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-[#0a5694] group-hover:bg-blue-50 transition-all">
               <ChevronLeft size={16} />
            </div>
            {isFR ? "Retour à l'annuaire" : "Back to Directory"}
          </Link>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border shadow-sm ${
              isEditing 
                ? 'bg-white text-red-600 border-red-100 hover:bg-red-50' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#0a5694] hover:text-[#0a5694] hover:shadow-md'
            }`}
          >
            {isEditing ? <X size={18} /> : <Edit size={18} />}
            {isEditing ? (isFR ? 'Annuler' : 'Cancel') : (isFR ? 'Modifier le profil' : 'Edit Profile')}
          </button>
        </div>

        {/* MAIN PROFILE CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
            {/* Avatar Section */}
            <div className="relative shrink-0 group">
              <div className="w-40 h-40 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-inner">
                {formData.photo ? (
                  <img src={formData.photo} alt={formData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[#0a5694]/20">
                     <User size={80} strokeWidth={1} />
                  </div>
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-[#0a5694]/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all rounded-[2rem]"
                >
                  {uploading ? <Loader2 className="animate-spin" /> : <Camera size={32} />}
                </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest w-fit border border-emerald-100">
                    <ShieldCheck size={12} />
                    {isFR ? 'Profil Certifié' : 'Certified Profile'}
                 </div>
                 <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 capitalize font-outfit tracking-tight">{formData.name}</h1>
                 <p className="text-lg text-[#0a5694] font-bold flex items-center gap-2">
                    <Briefcase size={20} className="text-[#0a5694]/50" />
                    {formData.profession || (isFR ? 'Expert en Eau' : 'Water Expert')}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 pt-6 border-t border-slate-50">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                       <MapPin size={16} />
                    </div>
                    {formData.city}, {formData.country}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                       <Mail size={16} />
                    </div>
                    {formData.email}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                       <Phone size={16} />
                    </div>
                    {formData.phone}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                       <Globe size={16} />
                    </div>
                    {isFR ? 'Membre National' : 'National Member'}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-12 space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  { name: 'name', label: isFR ? 'Nom complet' : 'Full Name' },
                  { name: 'profession', label: isFR ? 'Profession' : 'Profession' },
                  { name: 'email', label: 'Email' },
                  { name: 'phone', label: isFR ? 'Téléphone' : 'Phone' },
                  { name: 'city', label: isFR ? 'Ville' : 'City' },
                  { name: 'country', label: isFR ? 'Pays' : 'Country' },
                  { name: 'degree', label: isFR ? 'Dernier Diplôme' : 'Latest Degree' },
                  { name: 'university', label: 'Université / Institution' },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <input
                      type="text"
                      value={(formData as any)[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#0a5694] focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                  {isFR ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-10 py-3 bg-[#0a5694] text-white font-bold rounded-xl hover:bg-[#062040] shadow-lg shadow-blue-900/10 transition-all disabled:opacity-50 flex items-center gap-3 text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {loading ? (isFR ? 'Enregistrement...' : 'Saving...') : (isFR ? 'Sauvegarder les modifications' : 'Save Changes')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-8"
            >
              {/* Grid for sub-sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Expertise */}
                 <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 space-y-8">
                   <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a5694]">
                        <Award size={24} />
                     </div>
                     <h2 className="text-xl font-extrabold text-slate-900 font-outfit">{isFR ? "Champs d'Expertise" : 'Expertise Fields'}</h2>
                   </div>
                   {initialExpertise.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                       {initialExpertise.map((item: string, idx: number) => (
                         <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 shadow-sm">
                           {item}
                         </span>
                       ))}
                     </div>
                   ) : (
                     <p className="text-slate-400 italic text-sm">{isFR ? "Aucune expertise spécifiée" : "No expertise specified"}</p>
                   )}
                 </div>

                 {/* Education */}
                 <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 space-y-8">
                   <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a5694]">
                        <GraduationCap size={24} />
                     </div>
                     <h2 className="text-xl font-extrabold text-slate-900 font-outfit">{isFR ? 'Cursus Académique' : 'Education'}</h2>
                   </div>
                   <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="font-extrabold text-slate-900 text-sm mb-1">{formData.degree || '---'}</p>
                         <p className="text-xs text-[#0a5694] font-bold uppercase tracking-wider">{formData.university || '---'}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest pl-2">
                         <ShieldCheck size={12} />
                         {isFR ? 'Vérifié par ExpertiseAuCameroun' : 'Verified by ExpertiseAuCameroun'}
                      </div>
                   </div>
                 </div>
              </div>

              {/* Experience - Full Width */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-12 space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a5694]">
                     <Briefcase size={24} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">{isFR ? 'Expérience Sectorielle' : 'Sectoral Experience'}</h2>
                </div>
                {Object.keys(initialExperience).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(initialExperience).map(([key, value]) => (
                      <div key={key} className="flex flex-col p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{key}</span>
                        <span className="text-base text-slate-900 font-bold">
                          {Array.isArray(value) ? value.join(', ') : (value as string)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-sm">{isFR ? "Aucune expérience renseignée" : "No experience reported"}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
