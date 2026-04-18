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
  CheckCircle2
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
    { icon: Mail, label: 'Email', value: 'contact@expertiseaucameroun.org', href: 'mailto:contact@expertiseaucameroun.org' },
    { icon: Phone, label: 'Téléphone', value: '+237 222 23 45 67', href: 'tel:+237222234567' },
    { icon: MapPin, label: 'Adresse', value: 'Yaoundé, Cameroun', href: '#' },
  ];

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="expert-badge mb-4">{isFR ? 'Besoin d\'aide ?' : 'Need help?'}</span>
            <h1 className="page-title">{isFR ? 'Contactez-nous' : 'Contact Us'}</h1>
            <p className="page-subtitle">
              {isFR 
                ? 'Une question sur le réseau ou une demande technique ? Notre équipe est prête à vous accompagner.'
                : 'A question about the network or a technical request? Our team is ready to support you.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }} className="contact-layout">
          {/* LEFT: INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="premium-card"
                style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(10, 86, 148, 0.1)', color: '#0a5694', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <info.icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px' }}>{info.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{info.value}</div>
                </div>
              </motion.a>
            ))}

            <div style={{ 
              backgroundColor: '#062040', 
              color: '#fff', 
              borderRadius: '24px', 
              padding: '40px',
              marginTop: '10px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>{isFR ? 'Suivez-nous' : 'Follow us'}</h3>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  {[Link2, ExternalLink, Share2].map((Icon, i) => (
                    <button key={i} style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: 1.6, fontStyle: 'italic' }}>
                  {isFR 
                    ? '"Contribuez à la valorisation de l\'expertise camerounaise dans le monde entier."'
                    : '"Contribute to the promotion of Cameroonian expertise worldwide."'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  onSubmit={handleSubmit}
                  className="premium-card"
                  style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>{isFR ? 'Nom Complet' : 'Full Name'}</label>
                      <input required type="text" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none' }} placeholder="Ex: Jean Dupont" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>Email</label>
                      <input required type="email" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none' }} placeholder="email@exemple.com" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>Sujet</label>
                    <input required type="text" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none' }} placeholder={isFR ? "Objet de votre message" : "Subject of your message"} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>Message</label>
                    <textarea required rows={5} style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none', resize: 'none', fontFamily: 'inherit' }} placeholder={isFR ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}></textarea>
                  </div>
                  <button type="submit" style={{ marginTop: '10px', padding: '18px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(10, 86, 148, 0.2)', transition: 'all 0.2s' }}>
                    {isFR ? 'Envoyer le message' : 'Send Message'}
                    <Send size={18} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="premium-card"
                  style={{ padding: '80px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}
                >
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(16, 185, 129, 0.3)' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>{isFR ? 'Message Envoyé !' : 'Message Sent!'}</h3>
                    <p style={{ color: '#64748b', maxWidth: '320px', margin: '0 auto', lineHeight: 1.6 }}>
                      {isFR 
                        ? 'Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.'
                        : 'Thank you for contacting us. Our team will get back to you as soon as possible.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    style={{ background: 'none', border: 'none', color: '#0a5694', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}
                  >
                    {isFR ? 'Envoyer un autre message' : 'Send another message'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
