"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Save, User, Mail, Phone, 
  MapPin, Briefcase, Award, Loader2 
} from 'lucide-react';
import { updateExpert } from '@/lib/actions';

interface MemberEditModalProps {
  expert: any;
  onClose: () => void;
  onSaveSuccess: () => void;
  isFR: boolean;
}

export default function MemberEditModal({ expert, onClose, onSaveSuccess, isFR }: MemberEditModalProps) {
  const [formData, setFormData] = useState({
    first_name: expert.first_name || '',
    last_name: expert.last_name || '',
    name: expert.name || '',
    email: expert.email || '',
    phone: expert.phone || '',
    profession: expert.profession || '',
    city: expert.city || '',
    country: expert.country || '',
    gender: expert.gender || 'male',
    age_range: expert.age_range || '',
    status: expert.status || 'pending',
    expertiseRaw: Array.isArray(expert.expertise) ? expert.expertise.join(', ') : (expert.expertise || '')
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Sync full name if first_name or last_name changes
      if (name === 'first_name' || name === 'last_name') {
        updated.name = `${updated.first_name} ${updated.last_name}`.trim();
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert expertise string to array
    const expertise = formData.expertiseRaw
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      city: formData.city,
      country: formData.country,
      gender: formData.gender,
      age_range: formData.age_range,
      status: formData.status,
      expertise: expertise
    };

    const result = await updateExpert(expert.id, updateData);

    setLoading(false);
    if (result.success) {
      onSaveSuccess();
      onClose();
    } else {
      setError(result.error || (isFR ? 'Une erreur est survenue lors de la mise à jour' : 'An error occurred during update'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1A1F2C] border border-slate-100 dark:border-white/10 rounded-[3rem] shadow-2xl p-8 md:p-10 font-inter"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-secondary dark:text-white tracking-tight font-outfit">
              {isFR ? 'Modifier le Membre' : 'Edit Member'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              ID: {expert.id}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-secondary dark:hover:text-white transition-all shadow-inner border border-slate-100 dark:border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Identité */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <User size={18} className="text-primary" />
              {isFR ? 'Identité' : 'Identity'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Prénom' : 'First Name'}</label>
                <input 
                  type="text" 
                  name="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Nom' : 'Last Name'}</label>
                <input 
                  type="text" 
                  name="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Sexe' : 'Gender'}</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none"
                >
                  <option value="male">{isFR ? 'Homme' : 'Male'}</option>
                  <option value="female">{isFR ? 'Femme' : 'Female'}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Tranche d\'âge' : 'Age Range'}</label>
                <input 
                  type="text" 
                  name="age_range" 
                  value={formData.age_range} 
                  onChange={handleChange}
                  placeholder="e.g. 25-35"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Géographie */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <Mail size={18} className="text-primary" />
              {isFR ? 'Contact & Localisation' : 'Contact & Location'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Téléphone' : 'Phone'}</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Ville' : 'City'}</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Pays' : 'Country'}</label>
                <input 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Profil Professionnel */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <Briefcase size={18} className="text-primary" />
              {isFR ? 'Profil Professionnel' : 'Professional Profile'}
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Profession actuelle' : 'Current Profession'}</label>
              <input 
                type="text" 
                name="profession" 
                value={formData.profession} 
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? "Domaines d'expertise (séparés par des virgules)" : "Expertise Domains (comma separated)"}</label>
              <textarea 
                name="expertiseRaw" 
                value={formData.expertiseRaw} 
                onChange={handleChange}
                rows={3}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none resize-none" 
              />
            </div>
          </div>

          {/* Section 4: Statut Administratif */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <Award size={18} className="text-primary" />
              {isFR ? 'Statut du Compte' : 'Account Status'}
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isFR ? 'Statut de validation' : 'Validation Status'}</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none"
              >
                <option value="pending">{isFR ? 'En attente' : 'Pending'}</option>
                <option value="approved">{isFR ? 'Approuvé' : 'Approved'}</option>
                <option value="rejected">{isFR ? 'Rejeté' : 'Rejected'}</option>
              </select>
            </div>
          </div>

          {/* Actions Formulaire */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
            <button 
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {isFR ? 'Annuler' : 'Cancel'}
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="btn-premium w-full sm:w-auto !px-12 !py-5 bg-primary text-white shadow-2xl shadow-primary/30 hover:bg-primary-dark flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              {isFR ? 'Enregistrer les modifications' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
