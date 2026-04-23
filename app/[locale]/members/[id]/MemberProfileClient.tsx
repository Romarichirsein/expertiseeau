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
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  Globe,
  Building,
  CheckCircle,
  ShieldCheck,
  Share2,
  Download,
  Upload,
  Camera,
  Trash2
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

  // Clean and parse incoming data
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
      const fileName = `${member.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profiles') // Assuming a 'profiles' bucket exists
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, photo: publicUrl }));
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Fallback for demo if bucket doesn't exist: use local preview
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
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* PREMIUM HEADER */}
      <div className="relative h-[400px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a5694] via-[#0d7ac7] to-[#0d9488] opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay opacity-20" />
        
        <div className="container relative z-10 h-full flex flex-col justify-between py-12">
          <Link 
            href={`/${locale}/members`} 
            className="w-fit flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-white/20 shadow-xl group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {isFR ? "Retour à l'annuaire" : "Back to Directory"}
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group">
                <div className="w-48 h-48 rounded-[3.5rem] bg-white p-2 shadow-2xl border border-white/20 overflow-hidden relative">
                  <div className="w-full h-full bg-gray-50 rounded-[3rem] flex items-center justify-center overflow-hidden">
                    {formData.photo ? (
                      <img src={formData.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={80} className="text-gray-300" strokeWidth={1} />
                    )}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-[3rem]"
                    >
                      {uploading ? <Loader2 className="animate-spin" /> : <Camera size={32} />}
                      <span className="text-[10px] font-black uppercase mt-2">{isFR ? 'Changer' : 'Change'}</span>
                    </button>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="text-center md:text-left pb-4">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 flex items-center gap-2">
                    <ShieldCheck size={14} />
                    {isFR ? 'Membre Certifié' : 'Certified Member'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 capitalize">
                  {formData.name}
                </h1>
                <p className="text-xl text-blue-100/80 font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
                  <Briefcase size={20} className="text-teal-400" />
                  {formData.profession || (isFR ? 'Expert Eau & Assainissement' : 'Water & Sanitation Expert')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl",
                  isEditing 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "bg-white text-gray-900 hover:bg-gray-50"
                )}
              >
                {isEditing ? (
                  <><X size={18} /> {isFR ? 'Annuler' : 'Cancel'}</>
                ) : (
                  <><Edit size={18} /> {isFR ? 'Modifier le Profil' : 'Edit Profile'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* SIDEBAR: CONTACT & INFO */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-gray-100"
            >
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-10 pb-4 border-b border-gray-50 flex items-center gap-3">
                <Globe size={16} />
                {isFR ? 'Coordonnées' : 'Contact Details'}
              </h3>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, label: 'Email', value: formData.email, key: 'email' },
                  { icon: Phone, label: isFR ? 'Téléphone' : 'Phone', value: formData.phone, key: 'phone' },
                  { icon: MapPin, label: 'Localisation', value: `${formData.city}, ${formData.country}`, key: 'city' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{item.label}</div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#0a5694] flex items-center justify-center group-hover:bg-[#0a5694] group-hover:text-white transition-all">
                        <item.icon size={18} />
                      </div>
                      <span className="font-bold text-gray-900 group-hover:text-[#0a5694] transition-colors">{item.value || '---'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 text-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <GraduationCap size={100} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-8 relative z-10">{isFR ? 'Formation' : 'Education'}</h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{isFR ? 'Diplôme Supérieur' : 'Highest Degree'}</div>
                  <div className="font-bold text-lg leading-tight">{formData.degree || '---'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Institution</div>
                  <div className="font-bold text-lg leading-tight">{formData.university || '---'}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-blue-50 text-[#0a5694] rounded-2xl flex items-center justify-center">
                       <Edit size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isFR ? 'Modifier mon profil' : 'Edit my profile'}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                      <div key={field.name} className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0a5694]/20 font-bold transition-all text-gray-900"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4 mt-16 pt-10 border-t border-gray-50">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-10 py-5 bg-gray-50 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all"
                    >
                      {isFR ? 'Annuler' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-12 py-5 bg-[#0a5694] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#0a467a] shadow-xl shadow-blue-900/20 transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                      {loading ? (isFR ? 'Enregistrement...' : 'Saving...') : (isFR ? 'Sauvegarder les modifications' : 'Save Changes')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* EXPERTISE CARDS */}
                  <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-gray-100">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-blue-50 text-[#0a5694] rounded-2xl flex items-center justify-center">
                         <Award size={24} />
                      </div>
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isFR ? "Domaines d'Expertise" : 'Areas of Expertise'}</h2>
                    </div>

                    {initialExpertise.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {initialExpertise.map((item: string, idx: number) => (
                          <div key={idx} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm text-emerald-500 flex items-center justify-center">
                               <CheckCircle size={16} />
                            </div>
                            <span className="font-black text-xs text-gray-700 uppercase tracking-widest">{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center">
                         <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">{isFR ? "Aucune expertise spécifiée" : "No expertise specified"}</p>
                      </div>
                    )}
                  </div>

                  {/* EXPERIENCE SECTION */}
                  <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-gray-100">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                         <Briefcase size={24} />
                      </div>
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isFR ? 'Expériences & Secteurs' : 'Experience & Sectors'}</h2>
                    </div>

                    {Object.keys(initialExperience).length > 0 ? (
                      <div className="space-y-6">
                        {Object.entries(initialExperience).map(([key, value]) => (
                          <div key={key} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-gray-50/50 rounded-2xl border border-gray-100 gap-4">
                            <div className="text-sm font-black text-gray-900 uppercase tracking-widest">{key}</div>
                            <div className="px-6 py-2 bg-white rounded-xl border border-gray-100 text-[#0a5694] font-black text-xs shadow-sm">
                              {Array.isArray(value) ? value.join(', ') : (value as string)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center">
                         <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">{isFR ? "Historique non renseigné" : "No history reported"}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
