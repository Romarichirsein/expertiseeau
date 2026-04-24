"use client";

import React from 'react';
import { 
  Settings, 
  Eye, 
  LogOut, 
  ShieldCheck,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  MapPin,
  ChevronRight,
  FileEdit,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [expert, setExpert] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }
      setUser(user);

      const { data: expertData } = await supabase
        .from('experts')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setExpert(expertData);
      setLoading(false);
    }
    getProfile();
  }, [locale, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-[#0a5694] rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = expert?.name || user?.user_metadata?.full_name || user?.email;
  const status = expert?.status || 'pending';
  const profession = expert?.profession || (isFR ? 'Expert en Ressources en Eau' : 'Water Resources Expert');

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${locale}/login`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32 font-inter">
      <div className="max-w-7xl mx-auto px-6 pt-48 space-y-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#0a5694] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100">
              <ShieldCheck size={14} />
              {isFR ? 'Espace Sécurisé' : 'Secure Space'}
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
              {isFR ? 'Bonjour, ' : 'Hello, '} <span className="text-[#0a5694]">{displayName?.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 font-medium">
              {isFR ? 'Gérez votre visibilité et vos certifications au sein du réseau national.' : 'Manage your visibility and certifications within the national network.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {expert?.id && (
              <Link href={`/${locale}/members/${expert.id}`} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-extrabold text-slate-700 flex items-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                <Eye size={18} className="text-[#0a5694]" />
                {isFR ? 'Voir mon profil public' : 'View public profile'}
              </Link>
            )}
            <button 
              onClick={handleSignOut}
              className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm font-extrabold flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-sm shadow-red-900/5"
            >
              <LogOut size={18} />
              {isFR ? 'Déconnexion' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 group hover:border-[#0a5694]/20 transition-all">
             <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-blue-50 text-[#0a5694] rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                   <TrendingUp size={24} />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{isFR ? 'Visites' : 'Visits'}</span>
             </div>
             <div className="text-4xl font-extrabold text-slate-900 font-outfit">12</div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 group hover:border-[#0a5694]/20 transition-all">
             <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                   {status === 'approved' ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Statut</span>
             </div>
             <div className={`text-xl font-extrabold font-outfit ${status === 'approved' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {status === 'approved' ? (isFR ? 'Profil Approuvé' : 'Profile Approved') : (isFR ? 'Vérification en cours' : 'Verification Pending')}
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-blue-900/5 group hover:border-[#0a5694]/20 transition-all">
             <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                   <Award size={24} />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{isFR ? 'Niveau' : 'Level'}</span>
             </div>
             <div className="text-xl font-extrabold text-slate-900 font-outfit">Expert Certifié</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 overflow-hidden">
              <div className="px-10 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-slate-400" />
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">{isFR ? 'Informations de Compte' : 'Account Information'}</h3>
                </div>
                <Link href={`/${locale}/members/${user?.id}`} className="text-xs font-extrabold text-[#0a5694] hover:underline bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  {isFR ? 'Modifier' : 'Edit'}
                </Link>
              </div>
              
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{isFR ? 'Profession / Spécialité' : 'Profession / Specialty'}</span>
                    <p className="text-lg font-extrabold text-slate-800">{profession}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Email</span>
                    <p className="text-lg font-extrabold text-slate-800">{user?.email}</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-6">{isFR ? 'Actions Stratégiques' : 'Strategic Actions'}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link href={`/${locale}/members/${user?.id}`} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-white hover:border-[#0a5694] transition-all group hover:shadow-xl hover:shadow-blue-900/5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0a5694] shadow-sm">
                           <FileEdit size={20} />
                         </div>
                         <span className="text-sm font-extrabold text-slate-700">{isFR ? 'Mettre à jour le CV' : 'Update CV'}</span>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#0a5694] transition-all group-hover:translate-x-1" />
                    </Link>
                    <Link href={`/${locale}/members/${user?.id}`} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-white hover:border-[#0a5694] transition-all group hover:shadow-xl hover:shadow-blue-900/5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0a5694] shadow-sm">
                           <MapPin size={20} />
                         </div>
                         <span className="text-sm font-extrabold text-slate-700">{isFR ? 'Contact & Localisation' : 'Contact & Location'}</span>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#0a5694] transition-all group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <AlertCircle size={20} />
                </div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">{isFR ? 'Notifications' : 'Notifications'}</h3>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                  {isFR ? 'Votre profil est actuellement en attente de certification. Complétez tous les champs pour accélérer le processus.' : 'Your profile is currently pending certification. Complete all fields to speed up the process.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <ShieldCheck size={120} />
              </div>
              <h3 className="text-2xl font-extrabold mb-4 relative z-10 font-outfit">{isFR ? 'Besoin d\'assistance ?' : 'Need assistance?'}</h3>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed relative z-10">
                {isFR ? 'Notre équipe d\'experts est à votre disposition pour vous accompagner dans la gestion de votre profil.' : 'Our team of experts is at your disposal to support you in managing your profile.'}
              </p>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all relative z-10 shadow-xl">
                {isFR ? 'Contacter le support technique' : 'Contact Technical Support'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
