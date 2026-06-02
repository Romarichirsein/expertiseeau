"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Edit2, ChevronLeft, 
  ChevronRight, Loader2, Users, MapPin, 
  BookOpen, Star, RefreshCw 
} from 'lucide-react';
import { getFilteredExperts, getFilterOptions, exportAllExperts } from '@/lib/actions/admin';
import MemberEditModal from './MemberEditModal';

interface MemberDirectoryProps {
  isFR: boolean;
}

export default function MemberDirectory({ isFR }: MemberDirectoryProps) {
  const [experts, setExperts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  
  // Filtres et pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [city, setCity] = useState('all');
  const [expertise, setExpertise] = useState('all');

  // Options de filtres dynamiques
  const [cities, setCities] = useState<string[]>([]);
  const [expertises, setExpertises] = useState<string[]>([]);

  // Expert sélectionné pour l'édition
  const [selectedExpert, setSelectedExpert] = useState<any | null>(null);

  const limit = 15;

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadExperts();
  }, [page, search, status, city, expertise]);

  async function loadFilterOptions() {
    const options = await getFilterOptions();
    setCities(options.cities);
    setExpertises(options.expertises);
  }

  async function loadExperts() {
    setLoading(true);
    const result = await getFilteredExperts(
      search || undefined,
      status || undefined,
      expertise || undefined,
      city || undefined,
      page,
      limit
    );
    setExperts(result.experts);
    setTotalCount(result.totalCount);
    setLoading(false);
  }

  // Réinitialiser les filtres
  function handleReset() {
    setSearch('');
    setStatus('all');
    setCity('all');
    setExpertise('all');
    setPage(1);
  }

  // Export CSV
  async function handleExport() {
    setExporting(true);
    try {
      const allExperts = await exportAllExperts();
      
      const headers = isFR 
        ? ["ID", "Nom complet", "Prénom", "Nom", "Email", "Téléphone", "Sexe", "Tranche d'âge", "Ville", "Pays", "Profession", "Expertises", "Statut", "Type", "Créé le"]
        : ["ID", "Full Name", "First Name", "Last Name", "Email", "Phone", "Gender", "Age Range", "City", "Country", "Profession", "Expertise Domains", "Status", "Type", "Created At"];

      const rows = allExperts.map(exp => [
        exp.id || '',
        exp.name || '',
        exp.first_name || '',
        exp.last_name || '',
        exp.email || '',
        exp.phone || '',
        exp.gender || '',
        exp.age_range || '',
        exp.city || '',
        exp.country || (exp.expert_type === 'diaspora' ? '' : 'Cameroun'),
        exp.profession || '',
        Array.isArray(exp.expertise) ? exp.expertise.join(', ') : (exp.expertise || ''),
        exp.status || '',
        exp.expert_type || '',
        exp.created_at ? new Date(exp.created_at).toLocaleString() : ''
      ]);

      const csvContent = "\uFEFF" + [
        headers.join(";"),
        ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(";"))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `eac_members_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Export error:", e);
      alert(isFR ? "Erreur lors de l'exportation CSV" : "Error during CSV export");
    } finally {
      setExporting(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <div className="space-y-10">
      {/* Barre de contrôle des Filtres */}
      <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-2xl p-8 rounded-[3rem] backdrop-blur-2xl grid grid-cols-1 xl:grid-cols-5 gap-6 items-center">
        {/* Recherche */}
        <div className="relative xl:col-span-2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder={isFR ? "Rechercher un membre (nom, email, phone, métier)..." : "Search a member (name, email, phone, profession)..."}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none font-medium text-sm"
          />
        </div>

        {/* Filtre Ville */}
        <div>
          <select 
            value={city}
            onChange={(e) => { setCity(e.target.value); setPage(1); }}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none font-medium text-sm"
          >
            <option value="all">{isFR ? "Toutes les villes" : "All Cities"}</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Filtre Spécialité */}
        <div>
          <select 
            value={expertise}
            onChange={(e) => { setExpertise(e.target.value); setPage(1); }}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none font-medium text-sm"
          >
            <option value="all">{isFR ? "Toutes les spécialités" : "All Specialties"}</option>
            {expertises.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        {/* Filtre Statut */}
        <div>
          <select 
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary text-secondary dark:text-white transition-all outline-none font-medium text-sm"
          >
            <option value="all">{isFR ? "Tous les statuts" : "All Statuses"}</option>
            <option value="approved">{isFR ? "Approuvé" : "Approved"}</option>
            <option value="pending">{isFR ? "En attente" : "Pending"}</option>
            <option value="rejected">{isFR ? "Rejeté" : "Rejected"}</option>
          </select>
        </div>
      </div>

      {/* Barre d'actions supplémentaires */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 dark:text-slate-400 font-bold text-sm">
          {isFR ? `${totalCount} membre(s) trouvé(s)` : `${totalCount} member(s) found`}
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          >
            <RefreshCw size={14} />
            {isFR ? "Réinitialiser" : "Reset"}
          </button>
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="btn-premium w-full sm:w-auto !px-8 !py-4 bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark flex items-center justify-center gap-2"
          >
            {exporting ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
            {isFR ? "Exporter en CSV" : "Export CSV"}
          </button>
        </div>
      </div>

      {/* Tableau des Membres */}
      <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-2xl rounded-[3rem] overflow-hidden backdrop-blur-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-100 dark:border-white/5 rounded-full" />
              <Loader2 className="w-16 h-16 animate-spin text-primary absolute top-0 left-0" strokeWidth={2} />
            </div>
            <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              {isFR ? "Chargement de l'annuaire..." : "Loading directory..."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-inter">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{isFR ? "Expert" : "Expert"}</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{isFR ? "Contact" : "Contact"}</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{isFR ? "Géographie" : "Geography"}</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{isFR ? "Spécialités" : "Specialties"}</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{isFR ? "Statut" : "Status"}</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">{isFR ? "Actions" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {experts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-slate-50/20 dark:hover:bg-white/2 transition-colors">
                    {/* Nom et Métier */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-primary font-bold">
                          {expert.name ? expert.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <div className="font-bold text-secondary dark:text-white text-base">
                            {expert.name}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <BookOpen size={12} />
                            {expert.profession || (isFR ? 'Non spécifié' : 'Not specified')}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact info */}
                    <td className="px-8 py-6">
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {expert.email}
                      </div>
                      {expert.phone && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                          {expert.phone}
                        </div>
                      )}
                    </td>

                    {/* Geography */}
                    <td className="px-8 py-6">
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        {expert.city}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5 ml-5">
                        {expert.country || (expert.expert_type === 'diaspora' ? '' : 'Cameroun')}
                      </div>
                    </td>

                    {/* Specialties */}
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                        {Array.isArray(expert.expertise) && expert.expertise.length > 0 ? (
                          expert.expertise.slice(0, 3).map((exp: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400"
                            >
                              {exp}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 italic">-</span>
                        )}
                        {Array.isArray(expert.expertise) && expert.expertise.length > 3 && (
                          <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-primary/10 text-primary">
                            +{expert.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                        expert.status === 'approved'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
                          : expert.status === 'rejected'
                          ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20'
                          : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20'
                      }`}>
                        {expert.status === 'approved' 
                          ? (isFR ? 'Approuvé' : 'Approved') 
                          : expert.status === 'rejected' 
                          ? (isFR ? 'Rejeté' : 'Rejected') 
                          : (isFR ? 'En attente' : 'Pending')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedExpert(expert)}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-inner ml-auto group/edit"
                      >
                        <Edit2 size={14} className="group-hover/edit:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}

                {experts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-32 text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto mb-4">
                        <Users size={24} />
                      </div>
                      <h3 className="font-bold text-lg text-secondary dark:text-white">
                        {isFR ? "Aucun membre trouvé" : "No members found"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        {isFR ? "Essayez de modifier vos critères de recherche ou de filtrage." : "Try changing your search query or filter settings."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 px-8 py-6">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft size={16} />
              {isFR ? "Précédent" : "Previous"}
            </button>
            
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isFR ? `Page ${page} sur ${totalPages}` : `Page ${page} of ${totalPages}`}
            </div>

            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {isFR ? "Suivant" : "Next"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Modal d'édition */}
      <AnimatePresence>
        {selectedExpert && (
          <MemberEditModal 
            expert={selectedExpert}
            isFR={isFR}
            onClose={() => setSelectedExpert(null)}
            onSaveSuccess={loadExperts}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
