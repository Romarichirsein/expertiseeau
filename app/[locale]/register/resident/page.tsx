"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Briefcase, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterResidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const [step, setStep] = useState(1);

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 400px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0fdfa 100%)',
    }}>
      <div style={{ maxWidth: '640px', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <span className="expert-badge mb-3">{isFR ? 'Inscription Expert' : 'Expert Registration'}</span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>
            {isFR ? 'Expert Résident au Cameroun' : 'Resident Expert in Cameroon'}
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px' }}>
            {isFR ? 'Rejoignez le réseau national de référence.' : 'Join the national reference network.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card"
          style={{ backgroundColor: '#ffffff', padding: '40px' }}
        >
          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: s <= step ? '#0a5694' : '#e2e8f0', transition: 'all 0.3s' }} />
            ))}
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Nom' : 'First Name'}</label>
                    <input required type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Jean" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Prénom' : 'Last Name'}</label>
                    <input required type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Dupont" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Profession / Titre' : 'Profession / Title'}</label>
                  <input required type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Ex: Ingénieur en Hydraulique" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Ville de résidence' : 'City of residence'}</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input required type="text" style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Yaoundé" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} style={{ marginTop: '10px', padding: '16px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {isFR ? 'Suivant' : 'Next'} <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Email</label>
                  <input required type="email" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="votre@email.com" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Téléphone</label>
                  <input required type="tel" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="+237 ..." />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Mot de passe' : 'Password'}</label>
                    <input required type="password" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="••••••••" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Confirmer' : 'Confirm'}</label>
                    <input required type="password" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="••••••••" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '16px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                    {isFR ? 'Retour' : 'Back'}
                  </button>
                  <button type="button" onClick={() => setStep(3)} style={{ flex: 2, padding: '16px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {isFR ? 'Suivant' : 'Next'} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <ShieldCheck size={32} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{isFR ? 'Dernière étape !' : 'Last step!'}</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  {isFR 
                    ? 'En vous inscrivant, vous acceptez nos conditions d\'utilisation et notre politique de confidentialité.' 
                    : 'By registering, you agree to our terms of use and privacy policy.'}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ flex: 1, padding: '16px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                    {isFR ? 'Retour' : 'Back'}
                  </button>
                  <button type="submit" style={{ flex: 2, padding: '16px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {isFR ? 'Confirmer l\'inscription' : 'Confirm Registration'} <UserPlus size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>{isFR ? 'Déjà membre ?' : 'Already a member?'} </span>
            <Link href={`/${locale}/login`} style={{ color: '#0a5694', fontWeight: 700, textDecoration: 'none' }}>
              {isFR ? 'Se connecter' : 'Log In'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
