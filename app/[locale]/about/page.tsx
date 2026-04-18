"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Globe, Users, Droplets, MapPin, Building2, CheckCircle2, Award, BookOpen } from 'lucide-react';

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const values = [
    { title: isFR ? 'Intégrité' : 'Integrity', description: isFR ? 'Une éthique professionnelle rigoureuse au service du secteur de l\'eau.' : 'Rigorous professional ethics at the service of the water sector.', icon: ShieldCheck, color: '#0ea5e9' },
    { title: isFR ? 'Excellence' : 'Excellence', description: isFR ? 'Valoriser l\'expertise de pointe pour des solutions durables.' : 'Valuing cutting-edge expertise for sustainable solutions.', icon: Target, color: '#10b981' },
    { title: isFR ? 'Impact' : 'Impact', description: isFR ? 'Améliorer l\'accès à l\'eau pour toutes les populations camerounaises.' : 'Improving access to water for all Cameroonian populations.', icon: Globe, color: '#6366f1' },
  ];

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="expert-badge mb-4">
              {isFR ? 'À propos de nous' : 'About Us'}
            </span>
            <h1 className="page-title">
              {isFR ? 'Les membres' : 'The members'}
            </h1>
            <p className="page-subtitle">
              {isFR 
                ? 'Le Réseau des Experts en Eaux est une plateforme institutionnelle dédiée à la valorisation des compétences camerounaises dans le secteur de l\'eau et de l\'assainissement.'
                : 'The Water Experts Network is an institutional platform dedicated to the valorization of Cameroonian skills in the water and sanitation sector.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '24px', color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>
              {isFR ? 'Expertiseaucameroun.org' : 'Expertiseaucameroun.org'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: '#4b5563', lineHeight: 1.8 }}>
                {isFR 
                  ? 'Ce projet est financé par le Fonds de Solidarité pour les Projets Innovants (FSPI) de l\'Ambassade de France au Cameroun, et la Délégation de l\'Union Européenne au Cameroun. Il est exécuté par le bureau AFD (Agence Française de Développement) au Cameroun.'
                  : 'This project is funded by the Solidarity Fund for Innovative Projects (FSPI) of the French Embassy in Cameroon, and the EU Delegation in Cameroon. It is implemented by the AFD office in Cameroon.'}
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.8 }}>
                {isFR 
                  ? 'L\'objectif principal est de créer un répertoire des expertises dans le secteur de l\'eau au Cameroun, afin de valoriser les compétences disponibles localement et dans la diaspora.'
                  : 'The main objective is to create a directory of expertise in the water sector in Cameroon, to promote skills available locally and in the diaspora.'}
              </p>
            </div>
            
            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: CheckCircle2, text: isFR ? 'Centralisation de l\'expertise' : 'Expertise centralization' },
                { icon: CheckCircle2, text: isFR ? 'Valorisation des talents' : 'Talent promotion' },
                { icon: CheckCircle2, text: isFR ? 'Mise en réseau nationale' : 'National networking' },
                { icon: CheckCircle2, text: isFR ? 'Certification des profils' : 'Profile certification' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                  <item.icon size={18} className="text-emerald-500" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
          >
            {[
              { icon: Users, count: '960+', label: isFR ? 'Experts' : 'Experts', color: 'rgba(14, 165, 233, 0.1)', iconColor: '#0ea5e9' },
              { icon: Building2, count: '25+', label: isFR ? 'Institutions' : 'Institutions', color: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
              { icon: Award, count: '14+', label: isFR ? 'Domaines' : 'Fields', color: 'rgba(99, 102, 241, 0.1)', iconColor: '#6366f1' },
              { icon: BookOpen, count: '150+', label: isFR ? 'Publications' : 'Publications', color: 'rgba(245, 158, 11, 0.1)', iconColor: '#f59e0b' },
            ].map((stat, i) => (
              <div key={i} className="premium-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon size={26} color={stat.iconColor} />
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{stat.count}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* VALEURS */}
        <div style={{ marginTop: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="expert-badge mb-3">{isFR ? 'Nos Valeurs' : 'Our Values'}</span>
            <h2 className="page-title">{isFR ? 'Ce qui nous anime' : 'What drives us'}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card"
                style={{ textAlign: 'center' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: v.color }}>
                  <v.icon size={30} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#0f172a' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
