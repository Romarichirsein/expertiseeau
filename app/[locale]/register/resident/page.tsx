"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Briefcase, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { signUpExpert } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';

export default function RegisterResidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profession: '',
    city: '',
    gender: 'M',
    age_range: '30-40',
    expertise: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (val: string) => {
    setFormData(prev => {
      const current = prev.expertise;
      if (current.includes(val)) {
        return { ...prev, expertise: current.filter(i => i !== val) };
      } else {
        return { ...prev, expertise: [...current, val] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(isFR ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await signUpExpert({
      ...formData,
      expert_type: 'resident'
    });

    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="premium-card" style={{ textAlign: 'center', padding: '60px', maxWidth: '500px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>{isFR ? 'Inscription réussie !' : 'Registration successful!'}</h2>
          <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px' }}>
            {isFR 
              ? 'Votre compte a été créé avec succès. Votre profil est actuellement en attente de validation par nos administrateurs.' 
              : 'Your account has been successfully created. Your profile is currently pending validation by our administrators.'}
          </p>
          <Link href={`/${locale}/login`} style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', fontWeight: 700, textDecoration: 'none' }}>
            {isFR ? 'Se connecter' : 'Log In'}
          </Link>
        </motion.div>
      </div>
    );
  }

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
          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 600, border: '1px solid #fee2e2' }}>
              {error}
            </div>
          )}

          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: s <= step ? '#0a5694' : '#e2e8f0', transition: 'all 0.3s' }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Nom' : 'First Name'}</label>
                    <input required name="first_name" value={formData.first_name} onChange={handleChange} type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Jean" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Prénom' : 'Last Name'}</label>
                    <input required name="last_name" value={formData.last_name} onChange={handleChange} type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Dupont" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Genre' : 'Gender'}</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', backgroundColor: '#fff' }}>
                      <option value="M">{isFR ? 'Masculin' : 'Male'}</option>
                      <option value="F">{isFR ? 'Féminin' : 'Female'}</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Tranche d\'âge' : 'Age range'}</label>
                    <select name="age_range" value={formData.age_range} onChange={handleChange} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', backgroundColor: '#fff' }}>
                      <option value="20-30">20-30</option>
                      <option value="30-40">30-40</option>
                      <option value="40-50">40-50</option>
                      <option value="50+">50+</option>
                    </select>
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
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Profession / Titre' : 'Profession / Title'}</label>
                  <input required name="profession" value={formData.profession} onChange={handleChange} type="text" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Ex: Ingénieur en Hydraulique" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Ville de résidence' : 'City of residence'}</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input required name="city" value={formData.city} onChange={handleChange} type="text" style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="Yaoundé" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Domaines d\'expertise' : 'Expertise Areas'}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Eau Potable', 'Assainissement', 'Hydrogéologie', 'Génie Civil', 'Environnement'].map(exp => (
                      <button 
                        key={exp}
                        type="button"
                        onClick={() => handleExpertiseChange(exp)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: formData.expertise.includes(exp) ? '#0a5694' : '#e2e8f0',
                          backgroundColor: formData.expertise.includes(exp) ? '#0a5694' : '#fff',
                          color: formData.expertise.includes(exp) ? '#fff' : '#64748b',
                          transition: 'all 0.2s'
                        }}
                      >
                        {exp}
                      </button>
                    ))}
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
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="votre@email.com" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Téléphone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="+237 ..." />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Mot de passe' : 'Password'}</label>
                    <input required name="password" value={formData.password} onChange={handleChange} type="password" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="••••••••" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{isFR ? 'Confirmer' : 'Confirm'}</label>
                    <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} placeholder="••••••••" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ flex: 1, padding: '16px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                    {isFR ? 'Retour' : 'Back'}
                  </button>
                  <button type="submit" disabled={loading} style={{ flex: 2, padding: '16px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? (isFR ? 'Chargement...' : 'Loading...') : (isFR ? 'Confirmer l\'inscription' : 'Confirm Registration')}
                    {!loading && <UserPlus size={18} />}
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
