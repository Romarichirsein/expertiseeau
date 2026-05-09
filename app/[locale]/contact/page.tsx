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

      {/* ==================== PAGE HEADER ==================== */}
      <div className="bg-slate-900 pt-48 md:pt-60 pb-32 md:pb-40 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="container relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl space-y-12"
          >
            <div className="section-label bg-white/5 border-white/10 text-primary-light">
              <MessageSquare size={16} />
              {isFR ? 'Ligne Directe Institutionnelle' : 'Institutional Direct Line'}
            </div>
            <h1 className="text-fluid-h1 font-black text-white tracking-tight font-outfit leading-[0.95] uppercase text-balance">
              {isFR ? 'Parlons de ' : 'Let’s talk about '} 
              <span className="text-gradient italic">{isFR ? 'votre projet' : 'your project'}</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl font-inter leading-relaxed text-balance">
              {isFR
                ? "Notre équipe institutionnelle est à votre écoute pour toute demande d'assistance ou de partenariat stratégique."
                : 'Our institutional team is ready to listen to any request for assistance or strategic partnership.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT (CONTAINED) ── */}
      <div className="container relative z-20 -mt-20 md:-mt-28 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: FORM (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="rounded-[4rem] border-none glass-card premium-shadow p-12 md:p-20 overflow-hidden">
              <CardContent className="p-0 space-y-14">
                <div className="space-y-6">
                  <h2 className="text-5xl font-black text-foreground font-outfit uppercase tracking-tight leading-[1]">
                    {isFR ? 'Envoyer un message' : 'Send a message'}
                  </h2>
                  <p className="text-xl font-medium text-muted-foreground leading-relaxed text-balance">
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
                      className="space-y-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">
                            {isFR ? 'Identité Complète' : 'Full Identity'}
                          </Label>
                          <Input required type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="Jean Dupont" />
                        </div>
                        <div className="space-y-4">
                          <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">
                            Email Institutionnel
                          </Label>
                          <Input required type="email" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder="expert@exemple.cm" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">
                          {isFR ? 'Sujet du Message' : 'Subject'}
                        </Label>
                        <Input required type="text" className="h-18 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/10 dark:border-white/5 focus-visible:ring-primary/20 shadow-inner font-bold text-base px-8" placeholder={isFR ? "Objet de votre demande stratégique" : "Subject of your strategic request"} />
                      </div>

                      <div className="space-y-4">
                        <Label className="ml-4 uppercase tracking-[0.3em] text-[10px] font-black text-muted-foreground opacity-60">
                          Message
                        </Label>
                        <textarea required rows={6} className="w-full flex min-h-[180px] rounded-[1.75rem] border border-white/10 dark:border-white/5 bg-white/40 dark:bg-white/5 px-8 py-6 text-base font-bold ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-inner resize-none leading-relaxed transition-all" placeholder={isFR ? "Décrivez votre besoin en détail..." : "Describe your need in detail..."}></textarea>
                      </div>

                      <Button type="submit" disabled={loading} variant="premium" className="w-full h-24 rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-2xl shadow-primary/30 gap-6 group">
                        {loading ? <Loader2 className="animate-spin w-8 h-8" /> : <Send size={32} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        {loading ? (isFR ? 'Transmission...' : 'Transmitting...') : (isFR ? 'Transmettre' : 'Transmit')}
                      </Button>

                      <div className="flex items-center justify-center gap-4 bg-white/40 dark:bg-white/5 py-5 rounded-[1.5rem] border border-white/10 dark:border-white/5 backdrop-blur-3xl shadow-inner">
                        <ShieldCheck size={20} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-60">{isFR ? 'Chiffrement AES-256' : 'AES-256 Encryption'}</span>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center space-y-12"
                    >
                      <div className="w-32 h-32 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                        <CheckCircle2 size={64} className="text-emerald-500" />
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-5xl font-black text-foreground font-outfit uppercase tracking-tight">
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
                        className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-xs gap-4 text-primary hover:bg-primary/5 transition-all"
                      >
                        {isFR ? 'Envoyer un autre message' : 'Send another message'}
                        <ArrowRight size={24} strokeWidth={2.5} />
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
            className="lg:col-span-5 space-y-10"
          >
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group block p-12 border-none glass-card rounded-[3.5rem] premium-shadow transition-all duration-700"
              >
                <div className="flex items-center gap-12">
                  <div className={`w-24 h-24 rounded-3xl ${card.bg} flex items-center justify-center ${card.color} group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner`}>
                    <card.icon size={44} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-3">
                    <div className="section-label bg-transparent border-none px-0 text-muted-foreground opacity-60">{card.label}</div>
                    <div className="text-2xl font-black text-foreground font-outfit group-hover:text-primary transition-colors tracking-tight uppercase leading-none">{card.value}</div>
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                      <Clock size={16} strokeWidth={2.5} className="text-primary/60" />
                      {card.note}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            <Card className="rounded-[4rem] bg-slate-900 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] p-16 text-white relative overflow-hidden border border-white/10 group">
              <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-[2s] pointer-events-none">
                <Globe size={240} />
              </div>
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-18 h-18 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all duration-700">
                    <Clock size={32} strokeWidth={2.5} className="text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-3xl font-black font-outfit uppercase tracking-tight leading-none">
                    {isFR ? 'Service Institutionnel' : 'Institutional Service'}
                  </h3>
                </div>
                <p className="text-xl leading-relaxed text-slate-400 font-medium text-balance">
                  {isFR 
                    ? "Notre équipe d'administration centrale assure une veille constante pour traiter vos demandes stratégiques avec la plus grande célérité."
                    : "Our central administration team ensures constant monitoring to process your strategic requests with the utmost speed."}
                </p>
                <div className="flex items-center gap-5 bg-white/5 py-5 px-8 rounded-2xl border border-white/5 w-fit shadow-inner">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(var(--primary),1)]" />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em] text-primary">{isFR ? 'Opérationnel Lun-Ven' : 'Operational Mon-Fri'}</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
