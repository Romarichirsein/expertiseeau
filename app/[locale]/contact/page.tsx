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
  ArrowRight
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
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@expertiseaucameroun.org', href: 'mailto:contact@expertiseaucameroun.org', color: '#0ea5e9' },
    { icon: Phone, label: isFR ? 'Téléphone' : 'Phone', value: '+237 222 23 45 67', href: 'tel:+237222234567', color: '#10b981' },
    { icon: MapPin, label: 'Adresse', value: 'Yaoundé, Cameroun', href: '#', color: '#f59e0b' },
  ];

  return (
    <div className="pb-20 bg-[#f8fafc] min-h-screen">
      {/* PREMIUM HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a5694] via-[#0d7ac7] to-[#0d9488] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.svg')] bg-cover mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8fafc] to-transparent" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-md border border-white/30">
              <MessageSquare size={16} />
              {isFR ? 'Une question ?' : 'Any questions?'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {isFR ? 'Contactez notre équipe' : 'Contact our team'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed opacity-90">
              {isFR 
                ? 'Nous sommes à votre écoute pour toute demande d\'assistance, de partenariat ou d\'information technique.'
                : 'We are here to listen to any request for assistance, partnership, or technical information.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: INFO (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner"
                    style={{ backgroundColor: `${info.color}15`, color: info.color }}
                  >
                    <info.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-sm font-extrabold text-gray-900 break-all">{info.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}

            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform">
                <Globe size={100} />
              </div>
              <h3 className="text-xl font-bold mb-6 relative z-10">{isFR ? 'Suivez notre actualité' : 'Follow our news'}</h3>
              <div className="flex gap-4 mb-8 relative z-10">
                {[Link2, ExternalLink, Share2].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic relative z-10">
                {isFR 
                  ? '"Ensemble, bâtissons l\'avenir du secteur de l\'eau au Cameroun."'
                  : '"Together, let\'s build the future of the water sector in Cameroon."'}
              </p>
            </div>
          </div>

          {/* RIGHT: FORM (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="p-8 md:p-12 space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{isFR ? 'Nom Complet' : 'Full Name'}</label>
                        <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="Jean Dupont" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <input required type="email" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder="email@exemple.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{isFR ? 'Sujet' : 'Subject'}</label>
                      <input required type="text" className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium" placeholder={isFR ? "Objet de votre message" : "Subject of your message"} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea required rows={5} className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0a5694] focus:bg-white transition-all text-gray-900 font-medium resize-none" placeholder={isFR ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#0a5694] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-all group">
                      {isFR ? 'Envoyer le message' : 'Send Message'}
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-20 text-center flex flex-col items-center justify-center space-y-8"
                  >
                    <div className="w-24 h-24 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-2xl shadow-teal-500/20">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-gray-900">{isFR ? 'Message Envoyé !' : 'Message Sent!'}</h3>
                      <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                        {isFR 
                          ? 'Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.'
                          : 'Thank you for contacting us. Our team will get back to you as soon as possible.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 text-[#0a5694] font-black hover:underline"
                    >
                      {isFR ? 'Envoyer un autre message' : 'Send another message'}
                      <ArrowRight size={18} />
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
