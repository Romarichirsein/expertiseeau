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
  FileEdit
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

  const { data: expert } = await supabase
    .from('experts')
    .select('*')
    .eq('id', user.id)
    .single();

  const displayName = expert?.name || user.user_metadata.full_name || user.email;
  const status = expert?.status || 'pending';
  const profession = expert?.profession || (isFR ? 'Expert en Ressources en Eau' : 'Water Resources Expert');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#0a5694] uppercase tracking-widest">
            <ShieldCheck size={14} />
            {isFR ? 'Espace Sécurisé' : 'Secure Space'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isFR ? 'Bonjour, ' : 'Hello, '} <span className="text-[#0a5694]">{displayName.split(' ')[0]}</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {isFR ? 'Gérez votre visibilité au sein du réseau national.' : 'Manage your visibility within the national network.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {expert?.id && (
            <Link href={`/${locale}/members/${expert.id}`} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-all">
              <Eye size={18} className="text-[#0a5694]" />
              {isFR ? 'Voir mon profil' : 'View my profile'}
            </Link>
          )}
          <form action={async () => {
            'use server';
            await signOut();
            redirect(`/${locale}/login`);
          }}>
            <button className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all">
              <LogOut size={18} />
              {isFR ? 'Déconnexion' : 'Logout'}
            </button>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 text-[#0a5694] rounded-lg flex items-center justify-center">
                 <TrendingUp size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isFR ? 'Vues' : 'Views'}</span>
           </div>
           <div className="text-3xl font-bold text-gray-900">04</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                 {status === 'approved' ? <CheckCircle size={20} /> : <Clock size={20} />}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Statut</span>
           </div>
           <div className={`text-lg font-bold ${status === 'approved' ? 'text-emerald-600' : 'text-orange-600'}`}>
              {status === 'approved' ? (isFR ? 'Approuvé' : 'Approved') : (isFR ? 'En attente' : 'Pending')}
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                 <Award size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Niveau</span>
           </div>
           <div className="text-lg font-bold text-gray-900">Expert Certifié</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-gray-400" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{isFR ? 'Informations' : 'Information'}</h3>
              </div>
              <Link href={`/${locale}/members/${user.id}`} className="text-xs font-bold text-[#0a5694] hover:underline">
                {isFR ? 'Modifier' : 'Edit'}
              </Link>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isFR ? 'Profession' : 'Profession'}</span>
                  <p className="text-base font-bold text-gray-800">{profession}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                  <p className="text-base font-bold text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">{isFR ? 'Actions rapides' : 'Quick Actions'}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href={`/${locale}/members/${user.id}`} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-white hover:border-[#0a5694] transition-all group">
                    <div className="flex items-center gap-3">
                       <FileEdit size={18} className="text-[#0a5694]" />
                       <span className="text-sm font-bold text-gray-700">{isFR ? 'Mettre à jour le CV' : 'Update CV'}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a5694]" />
                  </Link>
                  <Link href={`/${locale}/members/${user.id}`} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-white hover:border-[#0a5694] transition-all group">
                    <div className="flex items-center gap-3">
                       <MapPin size={18} className="text-[#0a5694]" />
                       <span className="text-sm font-bold text-gray-700">{isFR ? 'Contact & Localisation' : 'Contact & Location'}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a5694]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{isFR ? 'Notifications' : 'Notifications'}</h3>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-800 leading-relaxed">
                {isFR ? 'Complétez votre profil pour être visible par les institutions.' : 'Complete your profile to be visible to institutions.'}
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-3">{isFR ? 'Besoin d\'aide ?' : 'Need help?'}</h3>
            <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">
              {isFR ? 'Contactez notre support technique pour toute question relative à votre compte.' : 'Contact our technical support for any questions regarding your account.'}
            </p>
            <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all">
              {isFR ? 'Contacter le support' : 'Contact Support'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
v>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
