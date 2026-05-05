"use client";

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Globe, 
  MessageSquare, Sparkles, Zap, Loader2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1500);
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@expertiseaucameroun.org',
      href: 'mailto:contact@expertiseaucameroun.org',
      note: isFR ? 'Réponse sous 24h' : 'Reply within 24h',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      icon: Phone,
      label: isFR ? 'Téléphone' : 'Phone',
      value: '+237 222 23 45 67',
      href: 'tel:+237222234567',
      note: isFR ? 'Lun–Ven, 8h–17h' : 'Mon–Fri, 8am–5pm',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: MapPin,
      label: isFR ? 'Adresse' : 'Address',
      value: 'Yaoundé, Cameroun',
      href: '#',
      note: isFR ? 'Siège institutionnel' : 'Institutional HQ',
      color: 'text-violet-500',
      bg: 'bg-violet-500/10'
    },
  ];

  return (
    <div className="min-h-screen bg-background font-inter pb-32 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <div className="bg-slate-900 pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <MessageSquare size={18} />
              {isFR ? 'Ligne Directe Institutionnelle' : 'Institutional Direct Line'}
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight font-outfit leading-[0.9] uppercase">
              {isFR ? 'Parlons de ' : 'Let’s talk about '} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 italic">{isFR ? 'votre projet' : 'your project'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-2xl font-inter leading-relaxed">
              {isFR
                ? "Notre équipe institutionnelle est à votre écoute pour toute demande d'assistance ou de partenariat stratégique."
                : 'Our institutional team is ready to listen to any request for assistance or strategic partnership.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT (CONTAINED) ── */}
      <div className="container relative z-20 -mt-16 md:-mt-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: FORM (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="rounded-[4rem] border-white/20 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-12 md:p-16 shadow-2xl overflow-hidden">
              <CardContent className="p-0 space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-foreground font-outfit uppercase tracking-tight">
                    {isFR ? 'Envoyer un message' : 'Send a message'}
                  </h2>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                    {isFR 
                      ? 'Complétez le formulaire ci-dessous et un expert institutionnel vous répondra sous 24h.' 
                      : 'Complete the form below and an institutional expert will get back to you within 24h.'}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      onSubmit={handleSubmit}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <Label className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">
                            {isFR ? 'Identité Complète' : 'Full Identity'}
                          </Label>
                          <Input required type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="Jean Dupont" />
                        </div>
                        <div className="space-y-3">
                          <Label className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">
                            Email Institutionnel
                          </Label>
                          <Input required type="email" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder="expert@exemple.cm" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">
                          {isFR ? 'Sujet du Message' : 'Subject'}
                        </Label>
                        <Input required type="text" className="h-14 rounded-2xl bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold" placeholder={isFR ? "Objet de votre demande stratégique" : "Subject of your strategic request"} />
                      </div>

                      <div className="space-y-3">
                        <Label className="ml-2 uppercase tracking-widest text-[11px] font-black text-muted-foreground">
                          Message
                        </Label>
                        <textarea required rows={6} className="w-full flex min-h-[160px] rounded-2xl border border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/20 px-6 py-4 text-base font-bold ring-offset-background placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-inner resize-none leading-relaxed transition-all" placeholder={isFR ? "Décrivez votre besoin en détail..." : "Describe your need in detail..."}></textarea>
                      </div>

                      <Button type="submit" disabled={loading} variant="premium" className="w-full h-20 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 gap-4 group">
                        {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        {loading ? (isFR ? 'Transmission en cours...' : 'Transmitting...') : (isFR ? 'Transmettre la demande' : 'Transmit Request')}
                      </Button>

                      <div className="flex items-center justify-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] bg-white/40 dark:bg-white/5 py-3 rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-md">
                        <ShieldCheck size={18} className="text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                        {isFR ? 'Chiffrement de bout en bout AES-256' : 'End-to-End AES-256 Encryption'}
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center space-y-10"
                    >
                      <div className="w-28 h-28 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                        <CheckCircle2 size={56} className="text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-4xl font-black text-foreground font-outfit uppercase tracking-tight">
                          {isFR ? 'Message Envoyé !' : 'Message Sent!'}
                        </h3>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed font-medium">
                          {isFR 
                            ? 'Merci de nous avoir contactés. Notre équipe d\'administration centrale vous répondra dans les plus brefs délais.'
                            : 'Thank you for contacting us. Our central administration team will reply as soon as possible.'}
                        </p>
                      </div>
                      <Button 
                        variant="ghost"
                        onClick={() => setIsSubmitted(false)}
                        className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 text-primary hover:bg-primary/5"
                      >
                        {isFR ? 'Envoyer un autre message' : 'Send another message'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: INFO (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group block p-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-[3rem] shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="flex items-center gap-10">
                  <div className={`w-20 h-20 rounded-[2rem] ${card.bg} flex items-center justify-center ${card.color} group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner`}>
                    <card.icon size={36} strokeWidth={2} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{card.label}</div>
                    <div className="text-xl font-black text-foreground font-outfit group-hover:text-primary transition-colors tracking-tight uppercase">{card.value}</div>
                    <div className="text-[12px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} className="text-primary/60" />
                      {card.note}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            <Card className="rounded-[3.5rem] bg-slate-900 shadow-2xl p-12 text-white relative overflow-hidden border border-white/10 group">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                <Globe size={180} />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all">
                    <Clock size={28} className="text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">
                    {isFR ? 'Service Institutionnel' : 'Institutional Service'}
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-400 font-medium">
                  {isFR 
                    ? "Notre équipe d'administration centrale assure une veille constante pour traiter vos demandes stratégiques avec la plus grande célérité."
                    : "Our central administration team ensures constant monitoring to process your strategic requests with the utmost speed."}
                </p>
                <div className="flex items-center gap-4 bg-white/5 py-4 px-6 rounded-2xl border border-white/5 w-fit">
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">{isFR ? 'Disponible Lun-Ven' : 'Available Mon-Fri'}</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
