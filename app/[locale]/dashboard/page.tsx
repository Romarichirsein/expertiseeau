import React from 'react';
import { 
  User as UserIcon, 
  Settings, 
  Eye, 
  FileEdit, 
  Bell, 
  LogOut, 
  ShieldCheck,
  Briefcase,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  MapPin,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '@/lib/actions/auth';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/login`);
  }

  // Fetch expert profile from the 'experts' table linked by auth ID
  const { data: expert, error: expertError } = await supabase
    .from('experts')
    .select('*')
    .eq('id', user.id)
    .single();

  const displayName = expert?.name || user.user_metadata.full_name || user.email;
  const status = expert?.status || 'pending';
  const profession = expert?.profession || (isFR ? 'Expert en Ressources en Eau' : 'Water Resources Expert');

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-6 md:px-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a5694]/10 text-[#0a5694] font-black text-[10px] uppercase tracking-[0.2em] w-fit">
            <ShieldCheck size={14} />
            {isFR ? 'Tableau de Bord Sécurisé' : 'Secure Dashboard'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            {isFR ? 'Bonjour, ' : 'Hello, '} <span className="text-[#0a5694]">{displayName.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-500 font-bold text-lg">
            {isFR ? 'Gérez votre visibilité au sein du réseau national.' : 'Manage your visibility within the national network.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {expert?.id && (
            <Link href={`/${locale}/members/${expert.id}`} className="px-6 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black text-sm flex items-center gap-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <Eye size={20} className="text-[#0a5694]" />
              {isFR ? 'Voir mon profil' : 'View my profile'}
            </Link>
          )}
          <form action={async () => {
            'use server';
            await signOut();
            redirect(`/${locale}/login`);
          }}>
            <button className="px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all group">
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              {isFR ? 'Quitter' : 'Logout'}
            </button>
          </form>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 group hover:border-[#0a5694]/20 transition-all">
           <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0a5694] mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
           </div>
           <div>
              <div className="text-4xl font-black text-gray-900 tracking-tighter">04</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{isFR ? 'Consultations du profil' : 'Profile views'}</div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 group hover:border-emerald-500/20 transition-all">
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
             status === 'approved' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
           }`}>
              {status === 'approved' ? <CheckCircle size={28} /> : <Clock size={28} />}
           </div>
           <div>
              <div className={`text-xl font-black tracking-tight ${
                 status === 'approved' ? "text-emerald-600" : "text-orange-600"
              }`}>
                {status === 'approved' 
                  ? (isFR ? 'Statut Approuvé' : 'Status Approved') 
                  : (isFR ? 'En Attente' : 'Pending Verification')}
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
                {status === 'approved' 
                  ? (isFR ? 'Profil visible par les institutions' : 'Profile visible to institutions')
                  : (isFR ? 'Validation administrative en cours' : 'Administrative validation in progress')}
              </div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 group hover:border-purple-500/20 transition-all">
           <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Award size={28} />
           </div>
           <div>
              <div className="text-xl font-black text-gray-900 tracking-tight">Expert Certifié</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{isFR ? 'Niveau d\'accréditation' : 'Accreditation level'}</div>
           </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
            <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0a5694]">
                  <Settings size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{isFR ? 'Informations Professionnelles' : 'Professional Information'}</h3>
              </div>
              <button className="px-4 py-2 bg-[#0a5694] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">{isFR ? 'Modifier' : 'Edit'}</button>
            </div>
            
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{isFR ? 'Profession actuelle' : 'Current Profession'}</div>
                  <div className="text-lg font-black text-gray-900">{profession}</div>
                </div>
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email de contact</div>
                  <div className="text-lg font-black text-gray-900">{user.email}</div>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{isFR ? 'Domaines d\'Expertise' : 'Areas of Expertise'}</div>
                  <div className="flex flex-wrap gap-2">
                    {expert?.expertise?.map((exp: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[#0a5694] text-xs font-black rounded-xl uppercase tracking-wider">
                        {exp}
                      </span>
                    )) || <span className="text-gray-400 font-bold italic">{isFR ? 'Non spécifié' : 'Not specified'}</span>}
                  </div>
                </div>
              </div>
              
              <div className="pt-10 border-t border-gray-100">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">{isFR ? 'Documents & Ressources' : 'Documents & Resources'}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="p-6 bg-[#f8fafc] rounded-[2rem] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:border-[#0a5694]/20 border border-transparent transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a5694] shadow-sm">
                         <FileEdit size={24} />
                       </div>
                       <span className="text-sm font-black text-gray-900">{isFR ? 'Mettre à jour mon CV' : 'Update my CV'}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-[#0a5694] group-hover:translate-x-1 transition-all" />
                  </button>
                  <button className="p-6 bg-[#f8fafc] rounded-[2rem] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:border-[#0a5694]/20 border border-transparent transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a5694] shadow-sm">
                         <MapPin size={24} />
                       </div>
                       <span className="text-sm font-black text-gray-900">{isFR ? 'Localisation & Contact' : 'Location & Contact'}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-[#0a5694] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-900/5 space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">{isFR ? 'Alertes' : 'Notifications'}</h3>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100/50">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-orange-600 mt-1" />
                  <div className="space-y-1">
                    <span className="font-black text-xs text-orange-600 uppercase tracking-widest block">{isFR ? 'Action Requise' : 'Action Required'}</span>
                    <p className="text-gray-600 text-sm font-bold leading-relaxed">
                      {isFR ? 'Complétez votre biographie pour augmenter votre score de visibilité.' : 'Complete your biography to increase your visibility score.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-700">
               <ShieldCheck size={100} />
            </div>
            <h3 className="text-2xl font-black tracking-tight leading-tight mb-4 relative z-10">{isFR ? 'Besoin d\'assistance ?' : 'Need help?'}</h3>
            <p className="text-gray-400 text-sm font-bold mb-8 relative z-10 leading-relaxed">
              {isFR ? 'Notre équipe support est disponible pour vous accompagner dans l\'utilisation de la plateforme.' : 'Our support team is available to assist you in using the platform.'}
            </p>
            <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 hover:scale-105 transition-all relative z-10">
              {isFR ? 'Contacter le support' : 'Contact Support'}
              <ExternalLink size={18} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
