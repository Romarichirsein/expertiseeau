// MemberProfileClient.tsx
"use client";
import React, { useState } from 'react';
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
  CheckCircle2,
  ShieldCheck,
  Share2,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { updateExpert } from '@/lib/actions';

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

  // Clean and parse incoming data
  const member = normalizeMember(initialMember);
  const expertiseList = Array.isArray(safeParse(member.expertise)) ? safeParse(member.expertise) : (member.expertise ? [member.expertise] : []);
  const experience = safeParse(member.experience_years) || {};

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

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-[#0a5694] via-[#0d7ac7] to-[#0d9488]" />
      <div className="absolute top-0 left-0 w-full h-[50vh] opacity-20 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
      
      <div className="container relative z-10 pt-10">
        {/* TOP NAVIGATION */}
        <div className="flex justify-between items-center mb-12">
          <Link 
            href={`/${locale}/members`} 
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-white/20 shadow-xl group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {isFR ? "Annuaire" : "Directory"}
          </Link>

          <div className="flex gap-3">
             <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all flex items-center justify-center border border-white/20 shadow-xl">
                <Share2 size={20} />
             </button>
             <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all flex items-center justify-center border border-white/20 shadow-xl">
                <Download size={20} />
             </button>
          </div>
        </div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[4rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gray-50 border-b border-gray-100 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-teal-50/50" />
             <div className="absolute bottom-0 left-12 translate-y-1/2">
                <div className="w-40 h-40 rounded-[3rem] bg-white p-2 shadow-2xl border border-gray-100">
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-teal-50 rounded-[2.5rem] flex items-center justify-center overflow-hidden text-[#0a5694]">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={80} strokeWidth={1.5} />
                    )}
                  </div>
                </div>
             </div>
             
             <div className="absolute top-8 right-12">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
                    isEditing 
                      ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" 
                      : "bg-[#0a5694] text-white hover:bg-[#0a467a] shadow-xl shadow-blue-900/20"
                  )}
                >
                  {isEditing ? (
                    <><X size={18} /> {isFR ? 'Annuler' : 'Cancel'}</>
                  ) : (
                    <><Edit size={18} /> {isFR ? 'Éditer Profil' : 'Edit Profile'}</>
                  )}
                </button>
             </div>
          </div>

          <div className="pt-24 px-12 pb-16">
            <div className="flex flex-col lg:flex-row gap-20">
              
              {/* Left Column: Identity & Contact */}
              <div className="lg:w-80 shrink-0 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        {isFR ? 'Expert Certifié' : 'Certified Expert'}
                     </div>
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight capitalize leading-tight">
                    {member.name}
                  </h1>
                  <p className="text-lg font-bold text-[#0a5694] uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={20} />
                    {member.profession || (isFR ? 'Expert Eau' : 'Water Expert')}
                  </p>
                </div>

                <div className="space-y-8 bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">{isFR ? 'Informations Directes' : 'Direct Information'}</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0a5694] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isFR ? 'Localisation' : 'Location'}</div>
                        <div className="font-bold text-gray-900">{member.city || 'Cameroun'}</div>
                        <div className="text-xs text-gray-400 font-bold">{member.country || 'Cameroun'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0a5694] shrink-0">
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</div>
                        <div className="font-bold text-gray-900 truncate">{member.email || '---'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0a5694] shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isFR ? 'Téléphone' : 'Phone'}</div>
                        <div className="font-bold text-gray-900">{member.phone || '---'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {(member.degree || member.university) && (
                  <div className="bg-[#0a5694] text-white rounded-[2.5rem] p-10 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                       <GraduationCap size={80} />
                    </div>
                    <h3 className="text-xl font-black tracking-tight relative z-10">{isFR ? 'Formation' : 'Education'}</h3>
                    <div className="space-y-4 relative z-10">
                      <div>
                        <div className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">{isFR ? 'Diplôme' : 'Degree'}</div>
                        <div className="font-black text-sm">{member.degree}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">{isFR ? 'Institution' : 'Institution'}</div>
                        <div className="font-black text-sm">{member.university}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Main Content / Form */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries({
                          name: isFR ? 'Nom complet' : 'Full Name',
                          profession: isFR ? 'Profession' : 'Profession',
                          email: 'Email professionnel',
                          phone: isFR ? 'Téléphone' : 'Phone Number',
                          city: isFR ? 'Ville' : 'City',
                          country: isFR ? 'Pays' : 'Country',
                          degree: isFR ? 'Dernier Diplôme' : 'Latest Degree',
                          university: isFR ? 'Université / Institution' : 'University'
                        }).map(([key, label]) => (
                          <div key={key} className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
                            <input
                              type="text"
                              value={(formData as any)[key]}
                              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0a5694]/20 font-bold transition-all"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-8 py-4 bg-white border border-gray-200 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all"
                        >
                          {isFR ? 'Annuler' : 'Cancel'}
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="px-10 py-4 bg-[#0a5694] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#0a467a] transition-all disabled:opacity-70 flex items-center gap-3 shadow-xl shadow-blue-900/20"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                          {loading ? (isFR ? 'Enregistrement...' : 'Saving...') : (isFR ? 'Sauvegarder' : 'Save')}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="view"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-16"
                    >
                      {/* Expertise Section */}
                      <section>
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                           <div className="w-12 h-12 bg-blue-50 text-[#0a5694] rounded-2xl flex items-center justify-center">
                              <Award size={24} />
                           </div>
                           <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isFR ? "Domaines d'Expertise" : 'Areas of Expertise'}</h2>
                        </div>
                        
                        {expertiseList.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {expertiseList.map((item: string, idx: number) => (
                              <div key={idx} className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-blue-900/5 flex items-center gap-4 group hover:-translate-y-1 transition-all">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0a5694] flex items-center justify-center">
                                   <CheckCircle2 size={16} />
                                </div>
                                <span className="font-black text-sm text-gray-900 uppercase tracking-widest">{item}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 text-center">
                             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">{isFR ? "Aucune expertise spécifiée" : "No expertise specified"}</p>
                          </div>
                        )}
                      </section>

                      {/* Experience Section */}
                      <section>
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                           <div className="w-12 h-12 bg-teal-50 text-[#0d9488] rounded-2xl flex items-center justify-center">
                              <Globe size={24} />
                           </div>
                           <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isFR ? 'Expériences & Missions' : 'Experience & Missions'}</h2>
                        </div>

                        {Object.keys(experience).length > 0 ? (
                          <div className="space-y-6">
                            {Object.entries(experience).map(([key, value]) => (
                              <div key={key} className="bg-gray-50/50 rounded-[2.5rem] p-10 border border-gray-100 space-y-4 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                                <div className="text-[10px] font-black text-[#0d9488] uppercase tracking-[0.2em]">{key}</div>
                                <p className="text-gray-600 font-bold leading-[1.8]">
                                  {Array.isArray(value) ? value.join(', ') : (value as React.ReactNode) || '---'}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 text-center">
                             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">{isFR ? "Aucune expérience renseignée" : "No experience reported"}</p>
                          </div>
                        )}
                      </section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
