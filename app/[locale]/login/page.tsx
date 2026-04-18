"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, UserPlus, Eye, EyeOff, Globe } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 400px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0fdfa 100%)',
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <img src="/images/logo.png" alt="Logo" style={{ height: '80px', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>
            {isFR ? 'Accès Membres' : 'Member Access'}
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px' }}>
            {isFR ? 'Connectez-vous pour gérer votre profil expert.' : 'Log in to manage your expert profile.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card"
          style={{ backgroundColor: '#ffffff', padding: '40px' }}
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                <input 
                  required 
                  type="email" 
                  style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none' }} 
                  placeholder="votre@email.com" 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', paddingLeft: '4px' }}>{isFR ? 'Mot de passe' : 'Password'}</label>
                <Link href="#" style={{ fontSize: '12px', color: '#0a5694', fontWeight: 700, textDecoration: 'none' }}>{isFR ? 'Oublié ?' : 'Forgot?'}</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  style={{ width: '100%', padding: '14px 44px 14px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '15px', outline: 'none' }} 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ marginTop: '10px', padding: '16px', backgroundColor: '#0a5694', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(10, 86, 148, 0.2)', transition: 'all 0.2s' }}>
              {isFR ? 'Se connecter' : 'Log In'}
              <LogIn size={18} />
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {isFR ? 'Pas encore membre ?' : 'Not a member yet?'}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Link href={`/${locale}/register/resident`} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: '#1e293b', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
                <UserPlus size={16} color="#0a5694" /> {isFR ? 'Résident' : 'Resident'}
              </Link>
              <Link href={`/${locale}/register/diaspora`} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: '#1e293b', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
                <Globe size={16} color="#0d9488" /> {isFR ? 'Diaspora' : 'Diaspora'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
