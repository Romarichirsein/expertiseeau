"use client";

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Link2, 
  ExternalLink, 
  Share2,
  CheckCircle2,
  MessageSquare,
  Globe,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 8000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@expertiseaucameroun.org', href: 'mailto:contact@expertiseaucameroun.org', color: 'blue' },
    { icon: Phone, label: isFR ? 'Téléphone' : 'Phone', value: '+237 222 23 45 67', href: 'tel:+237222234567', color: 'emerald' },
    { icon: MapPin, label: 'Adresse', value: 'Yaoundé, Cameroun', href: '#', color: 'amber' },
  ];

  return (
    <div className="pb-32 bg-slate-50/50 min-h-screen font-inter">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-[#0a5694] pt-40 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent" />
        
        <div className="container relative z-10 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
              <MessageSquare size={14} />
              {isFR ? 'Une question ?' : 'Any questions?'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-outfit">
              {isFR ? 'Contactez notre équipe' : 'Contact our team'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90 font-medium">
              {isFR 
                ? 'Nous sommes à votre écoute pour toute demande d\'assistance, de partenariat ou d\'information technique.'
                : 'We are here to listen to any request for assistance, partnership, or technical information.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: INFO (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-200 hover:border-[#0a5694] hover:shadow-2xl transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner ${
                    info.color === 'blue' ? 'bg-blue-50 text-[#0a5694]' :
                    info.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <info.icon size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-sm font-extrabold text-slate-900 break-all leading-tight">{info.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform">
                <Globe size={120} />
              </div>
              <h3 className="text-2xl font-extrabold mb-8 relative z-10 font-outfit tracking-tight">{isFR ? 'Suivez notre actualité' : 'Follow our news'}</h3>
              <div className="flex gap-4 mb-10 relative z-10">
                {[Link2, ExternalLink, Share2].map((Icon, i) => (
                  <button key={i} className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5 group-hover:border-white/20">
                    <Icon size={22} />
                  </button>
                ))}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic relative z-10 font-medium">
                {isFR 
                  ? '"Ensemble, bâtissons l\'avenir du secteur de l\'eau au Cameroun."'
                  : '"Together, let\'s build the future of the water sector in Cameroon."'}
              </p>
            </div>
          </div>

          {/* RIGHT: FORM (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-200 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="p-10 md:p-14 space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Nom Complet' : 'Full Name'}</label>
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="Ex: Jean Dupont" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder="expert@exemple.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{isFR ? 'Sujet' : 'Subject'}</label>
                      <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm" placeholder={isFR ? "Objet de votre message" : "Subject of your message"} />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea required rows={6} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-semibold text-sm resize-none leading-relaxed" placeholder={isFR ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#0a5694] text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-4 shadow-xl shadow-blue-900/10 hover:bg-[#062040] hover:-translate-y-1 transition-all group">
                      {isFR ? 'Envoyer le message' : 'Send Message'}
                      <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       {isFR ? 'Traitement sécurisé de vos données' : 'Secure data processing'}
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-20 text-center flex flex-col items-center justify-center space-y-10"
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/10 border border-emerald-100">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">{isFR ? 'Message Envoyé !' : 'Message Sent!'}</h3>
                      <p className="text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
                        {isFR 
                          ? 'Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais sur votre adresse email.'
                          : 'Thank you for contacting us. Our team will get back to you as soon as possible via your email address.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-3 text-[#0a5694] font-bold hover:text-blue-800 transition-colors px-8 py-3 bg-blue-50 rounded-xl"
                    >
                      {isFR ? 'Envoyer un autre message' : 'Send another message'}
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
