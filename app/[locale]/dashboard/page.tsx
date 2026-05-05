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
  User as UserIcon,
  Zap,
  Globe,
  Bell,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">
          {isFR ? 'Chargement de votre espace...' : 'Loading your space...'}
        </p>
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
    <div className="min-h-screen bg-background pb-32 font-inter relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 space-y-10 relative z-10">
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/20 dark:border-white/5 shadow-2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[10px] font-black text-primary uppercase tracking-[0.25em] bg-primary/10 px-4 py-1.5 rounded-full w-fit border border-primary/20 backdrop-blur-md">
              <ShieldCheck size={16} />
              {isFR ? 'Espace Sécurisé' : 'Secure Space'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground font-outfit tracking-tight">
              {isFR ? 'Bonjour, ' : 'Hello, '} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">{displayName?.split(' ')[0]}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium leading-relaxed">
              {isFR ? 'Gérez votre visibilité et vos certifications au sein du réseau national.' : 'Manage your visibility and certifications within the national network.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {expert?.id && (
              <Link href={`/${locale}/members/${expert.id}`} passHref>
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md font-bold text-sm uppercase tracking-widest gap-3 hover:scale-105 transition-all">
                  <Eye size={20} className="text-primary" />
                  {isFR ? 'Profil Public' : 'Public Profile'}
                </Button>
              </Link>
            )}
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="h-14 px-8 rounded-2xl border-red-500/20 bg-red-500/5 text-red-500 font-bold text-sm uppercase tracking-widest gap-3 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
            >
              <LogOut size={20} />
              {isFR ? 'Déconnexion' : 'Logout'}
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { 
              label: isFR ? 'Visites' : 'Visits', 
              value: '12', 
              icon: TrendingUp, 
              color: 'text-primary', 
              bg: 'bg-primary/10' 
            },
            { 
              label: isFR ? 'Statut' : 'Status', 
              value: status === 'approved' ? (isFR ? 'Profil Approuvé' : 'Profile Approved') : (isFR ? 'Vérification' : 'Verification'), 
              icon: status === 'approved' ? CheckCircle : Clock, 
              color: status === 'approved' ? 'text-emerald-500' : 'text-amber-500', 
              bg: status === 'approved' ? 'bg-emerald-500/10' : 'bg-amber-500/10' 
            },
            { 
              label: isFR ? 'Niveau' : 'Level', 
              value: isFR ? 'Expert Certifié' : 'Certified Expert', 
              icon: Award, 
              color: 'text-indigo-500', 
              bg: 'bg-indigo-500/10' 
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <Card className="p-8 rounded-[2.5rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl group hover:border-primary/20 transition-all duration-500 shadow-xl">
                 <CardContent className="p-0">
                   <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                         <stat.icon size={28} />
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">{stat.label}</span>
                   </div>
                   <div className={`text-3xl font-black font-outfit tracking-tight ${stat.color}`}>{stat.value}</div>
                 </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <Card className="rounded-[3rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="px-12 py-8 bg-white/40 dark:bg-black/20 border-b border-white/20 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-primary" />
                  <h3 className="text-[11px] font-black text-foreground uppercase tracking-[0.3em]">{isFR ? 'Informations de Compte' : 'Account Information'}</h3>
                </div>
                <Link href={`/${locale}/members/${user?.id}`} passHref>
                  <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border-white/20 dark:border-white/10 bg-white dark:bg-white/5 font-bold text-[10px] uppercase tracking-widest shadow-sm">
                    {isFR ? 'Modifier' : 'Edit'}
                  </Button>
                </Link>
              </div>
              
              <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">{isFR ? 'Profession / Spécialité' : 'Profession / Specialty'}</span>
                    <p className="text-xl font-black text-foreground font-outfit">{profession}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Email</span>
                    <p className="text-xl font-black text-foreground font-outfit">{user?.email}</p>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/20 dark:border-white/5">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-8 ml-1">{isFR ? 'Actions Stratégiques' : 'Strategic Actions'}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: FileEdit, label: isFR ? 'Mettre à jour le CV' : 'Update CV', href: `/${locale}/members/${user?.id}` },
                      { icon: MapPin, label: isFR ? 'Contact & Localisation' : 'Contact & Location', href: `/${locale}/members/${user?.id}` }
                    ].map((action, i) => (
                      <Link key={i} href={action.href} className="p-8 bg-white/40 dark:bg-white/5 rounded-3xl border border-white/20 dark:border-white/5 flex items-center justify-between hover:bg-white dark:hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-primary/5">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/10 transition-transform group-hover:scale-110">
                             <action.icon size={24} />
                           </div>
                           <span className="text-[12px] font-black text-foreground uppercase tracking-widest">{action.label}</span>
                        </div>
                        <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            <Card className="p-10 rounded-[3rem] border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner">
                    <Bell size={24} />
                  </div>
                  <h3 className="text-[11px] font-black text-foreground uppercase tracking-[0.3em]">{isFR ? 'Notifications' : 'Notifications'}</h3>
                </div>
                <div className="p-8 bg-amber-500/5 rounded-3xl border border-amber-500/10 space-y-4">
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-400 leading-relaxed">
                    {isFR ? 'Votre profil est actuellement en attente de certification. Complétez tous les champs pour accélérer le processus.' : 'Your profile is currently pending certification. Complete all fields to speed up the process.'}
                  </p>
                  <Link href="#" className="flex items-center gap-2 text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest hover:underline">
                    {isFR ? 'En savoir plus' : 'Learn more'}
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 dark:bg-black/40 p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20 border border-white/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Zap size={140} className="text-primary" />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-black font-outfit tracking-tight">{isFR ? 'Besoin d\'assistance ?' : 'Need assistance?'}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {isFR ? 'Notre équipe d\'experts est à votre disposition pour vous accompagner dans la gestion de votre profil.' : 'Our team of experts is at your disposal to support you in managing your profile.'}
                </p>
                <Button variant="premium" className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">
                  {isFR ? 'Contacter le support technique' : 'Contact Technical Support'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
