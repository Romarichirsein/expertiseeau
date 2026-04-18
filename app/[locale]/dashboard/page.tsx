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
  Clock
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

  // If no profile found in table but auth exists, we might need a fallback or redirect
  const displayName = expert?.name || user.user_metadata.full_name || user.email;
  const status = expert?.status || 'pending';
  const profession = expert?.profession || (isFR ? 'Expert Eau' : 'Water Expert');

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <ShieldCheck size={14} />
            {isFR ? 'Tableau de Bord Expert' : 'Expert Dashboard'}
          </div>
          <h1 className="text-4xl font-bold font-outfit">
            {isFR ? 'Bienvenue, ' : 'Welcome, '} {displayName.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isFR ? 'Heureux de vous revoir sur la plateforme nationale.' : 'Good to see you back on the national platform.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {expert?.id && (
            <Link href={`/${locale}/members/${expert.id}`} className="px-5 py-3 bg-secondary text-primary rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-primary/10 transition-all">
              <Eye size={18} />
              {isFR ? 'Voir mon profil public' : 'View public profile'}
            </Link>
          )}
          <form action={async () => {
            'use server';
            await signOut();
            redirect(`/${locale}/login`);
          }}>
            <button className="px-5 py-3 bg-red-500/10 text-red-500 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all w-full">
              <LogOut size={18} />
              {isFR ? 'Déconnexion' : 'Logout'}
            </button>
          </form>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-4">
           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <TrendingUp size={24} />
           </div>
           <div>
              <div className="text-3xl font-bold font-outfit">--</div>
              <div className="text-sm text-muted-foreground">{isFR ? 'Vues du profil' : 'Profile views'}</div>
           </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-4">
           <div className={cn(
             "w-12 h-12 rounded-2xl flex items-center justify-center",
             status === 'approved' ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
           )}>
              <ShieldCheck size={24} />
           </div>
           <div className="space-y-1">
              <div className={cn(
                "text-xl font-bold",
                status === 'approved' ? "text-emerald-500" : "text-orange-500"
              )}>
                {status === 'approved' 
                  ? (isFR ? 'Profil Approuvé' : 'Profile Approved') 
                  : (isFR ? 'En attente' : 'Pending Verification')}
              </div>
              <div className="text-sm text-muted-foreground">
                {status === 'approved' 
                  ? (isFR ? 'Visible par les institutions' : 'Visible to institutions')
                  : (isFR ? 'En cours de validation par admin' : 'Being validated by admin')}
              </div>
           </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-4">
           <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <Clock size={24} />
           </div>
           <div className="space-y-1">
              <div className="text-sm font-bold flex justify-between">
                <span>{isFR ? 'Dernière mise à jour' : 'Last update'}</span>
              </div>
              <div className="text-lg font-bold">
                {expert?.updated_at ? new Date(expert.updated_at).toLocaleDateString(locale) : '--'}
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="glass rounded-[2.5rem] border border-white/20 overflow-hidden">
            <div className="p-8 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="text-primary" size={24} />
                <h3 className="text-xl font-bold font-outfit">{isFR ? 'Informations de Profil' : 'Profile Information'}</h3>
              </div>
              <button className="text-primary font-bold text-sm hover:underline">{isFR ? 'Modifier' : 'Edit'}</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{isFR ? 'Profession' : 'Profession'}</div>
                  <div className="font-bold">{profession}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="font-bold">{user.email}</div>
                </div>
                <div className="space-y-1 lg:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{isFR ? 'Domaines d\'Expertise' : 'Areas of Expertise'}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {expert?.expertise?.map((exp: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg uppercase">
                        {exp}
                      </span>
                    )) || (isFR ? 'Non spécifié' : 'Not specified')}
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">{isFR ? 'Actions Rapides' : 'Quick Actions'}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="p-4 bg-secondary/50 rounded-2xl flex items-center justify-between group hover:bg-primary/5 transition-all">
                    <span className="text-sm font-bold">{isFR ? 'Mettre à jour le CV' : 'Update CV'}</span>
                    <ChevronRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="p-4 bg-secondary/50 rounded-2xl flex items-center justify-between group hover:bg-primary/5 transition-all">
                    <span className="text-sm font-bold">{isFR ? 'Localisation & Contact' : 'Location & Contact'}</span>
                    <ChevronRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass p-8 rounded-[2.5rem] border border-white/20 space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Bell className="text-primary" size={24} />
              <h3 className="text-xl font-bold font-outfit">{isFR ? 'Notifications' : 'Notifications'}</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-2xl text-[11px] leading-relaxed">
                <span className="font-bold text-primary block mb-1">Système</span>
                Bienvenue sur la nouvelle plateforme ! Complétez votre profil pour être plus visible.
              </div>
            </div>
          </section>

          <section className="bg-primary p-8 rounded-[2.5rem] shadow-xl shadow-primary/20 text-white space-y-6">
            <h3 className="text-xl font-bold leading-tight">Besoin d&apos;aide ?</h3>
            <p className="text-white/70 text-sm">Notre équipe est là pour vous accompagner dans la gestion de votre profil expert.</p>
            <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
              Contacter le support
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
