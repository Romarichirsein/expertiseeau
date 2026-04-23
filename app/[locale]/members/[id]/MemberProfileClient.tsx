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
  Globe
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
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        
        {/* Navigation / Actions */}
        <div className="flex justify-between items-center mb-4">
          <Link 
            href={`/${locale}/members`} 
            className="flex items-center gap-2 text-gray-500 hover:text-[#0a5694] transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} />
            {isFR ? "Retour à l'annuaire" : "Back to Directory"}
          </Link>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              isEditing 
                ? 'bg-red-50 text-red-600 border-red-100' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#0a5694] hover:text-[#0a5694]'
            }`}
          >
            {isEditing ? <X size={16} /> : <Edit size={16} />}
            {isEditing ? (isFR ? 'Annuler' : 'Cancel') : (isFR ? 'Modifier le profil' : 'Edit Profile')}
          </button>
        </div>

        {/* MAIN PROFILE CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="relative shrink-0 group">
              <div className="w-32 h-32 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt={formData.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-300" strokeWidth={1} />
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                >
                  {uploading ? <Loader2 className="animate-spin" /> : <Camera size={24} />}
                </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{formData.name}</h1>
              <p className="text-gray-600 font-medium flex items-center gap-2">
                <Briefcase size={16} className="text-gray-400" />
                {formData.profession || (isFR ? 'Expert en Eau' : 'Water Expert')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-4">
                 <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    {formData.city}, {formData.country}
                 </p>
                 <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    {formData.email}
                 </p>
                 <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {formData.phone}
                 </p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
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
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{field.label}</label>
                    <input
                      type="text"
                      value={(formData as any)[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#0a5694] transition-all text-gray-900 font-medium"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-50 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all"
                >
                  {isFR ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-3 bg-[#0a5694] text-white font-bold rounded-xl hover:bg-[#0a467a] shadow-lg shadow-blue-900/10 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {loading ? (isFR ? 'Enregistrement...' : 'Saving...') : (isFR ? 'Sauvegarder' : 'Save')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Expertise */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-[#0a5694]" />
                  <h2 className="text-xl font-bold text-gray-900">{isFR ? "Domaines d'Expertise" : 'Areas of Expertise'}</h2>
                </div>
                {initialExpertise.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {initialExpertise.map((item: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-100">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-sm">{isFR ? "Aucune expertise spécifiée" : "No expertise specified"}</p>
                )}
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-[#0a5694]" />
                  <h2 className="text-xl font-bold text-gray-900">{isFR ? 'Expérience Sectorielle' : 'Sectoral Experience'}</h2>
                </div>
                {Object.keys(initialExperience).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(initialExperience).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50/50 rounded-xl gap-2">
                        <span className="font-bold text-sm text-gray-700">{key}</span>
                        <span className="text-sm text-[#0a5694] font-bold">
                          {Array.isArray(value) ? value.join(', ') : (value as string)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-sm">{isFR ? "Aucune expérience renseignée" : "No experience reported"}</p>
                )}
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-[#0a5694]" />
                  <h2 className="text-xl font-bold text-gray-900">{isFR ? 'Formation' : 'Education'}</h2>
                </div>
                <div className="space-y-2">
                   <p className="font-bold text-sm text-gray-700">{formData.degree || '---'}</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">{formData.university || '---'}</p>
                </div>
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
