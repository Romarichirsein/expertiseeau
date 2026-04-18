"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Droplets, MapPin, ArrowRight, ShieldCheck, Building2, Globe,
  ChevronRight, Award, BookOpen, Phone
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const stats = [
    { value: '960+', label: isFR ? 'Experts Inscrits' : 'Registered Experts', icon: Users },
    { value: '10', label: isFR ? 'Régions Couvertes' : 'Regions Covered', icon: MapPin },
    { value: '25+', label: isFR ? 'Institutions Partenaires' : 'Partner Institutions', icon: Building2 },
    { value: '15+', label: isFR ? "Années d'Expertise" : 'Years of Expertise', icon: Award },
  ];

  const services = [
    {
      icon: Users,
      title: isFR ? 'Répertoire des Experts' : 'Experts Directory',
      desc: isFR ? 'Accédez au répertoire complet des professionnels du secteur de l\'eau au Cameroun, certifiés et vérifiés.' : 'Access the complete directory of water sector professionals in Cameroon, certified and verified.',
      href: `/${locale}/members`,
      color: '#0a5694',
    },
    {
      icon: Building2,
      title: isFR ? 'Institutions' : 'Institutions',
      desc: isFR ? 'Retrouvez les ministères, ONG, bureaux d\'études et organismes internationaux acteurs du secteur de l\'eau.' : 'Find ministries, NGOs, consulting firms and international organizations in the water sector.',
      href: `/${locale}/institutions`,
      color: '#0d9488',
    },
    {
      icon: BookOpen,
      title: isFR ? 'Documentation' : 'Documentation',
      desc: isFR ? 'Accédez aux publications, études et rapports techniques pour des ressources de haute qualité.' : 'Access publications, studies and technical reports for high quality resources.',
      href: `/${locale}/blog`,
      color: '#7c3aed',
    },
    {
      icon: ShieldCheck,
      title: isFR ? 'Certification' : 'Certification',
      desc: isFR ? 'Notre processus de validation garantit que chaque profil est authentifié par nos équipes d\'experts.' : 'Our validation process ensures each profile is authenticated by our expert teams.',
      href: `/${locale}/about`,
      color: '#dc2626',
    },
  ];

  const partners = [
    { name: 'UNESCO', logo: '/images/partners/unesco.png' },
    { name: 'GWP', logo: '/images/partners/gwp.png' },
    { name: 'MINEE', logo: '/images/partners/minee.png' },
    { name: 'CAMWATER', logo: '/images/partners/camwater.png' },
  ];

  return (
    <div>
      {/* ==================== HERO ==================== */}
      <section style={{
        background: 'linear-gradient(135deg, #0a5694 0%, #0d7ac7 60%, #0d9488 100%)',
        color: 'white',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', fontWeight: 600 }}>
                <Droplets size={14} />
                {isFR ? 'Portail National des Experts en Eaux' : 'National Portal of Water Experts'}
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', fontFamily: '"Outfit", sans-serif' }}>
                {isFR
                  ? <>Les Experts en Eaux<br /><span style={{ color: '#7dd3fc' }}>au Cameroun</span></>
                  : <>Water Experts<br /><span style={{ color: '#7dd3fc' }}>in Cameroon</span></>
                }
              </h1>
              <p style={{ fontSize: '17px', lineHeight: 1.7, opacity: 0.9, marginBottom: '36px', maxWidth: '480px' }}>
                {isFR
                  ? 'Le réseau de référence national pour la valorisation et la structuration de l\'expertise camerounaise dans le secteur de l\'eau et de l\'assainissement.'
                  : 'The national reference network for the valorization and structuring of Cameroonian expertise in the water and sanitation sector.'
                }
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href={`/${locale}/members`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: '#fff', color: '#0a5694',
                  padding: '14px 28px', borderRadius: '8px',
                  fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>
                  {isFR ? 'Consulter le répertoire' : 'Browse Directory'}
                  <ArrowRight size={18} />
                </Link>
                <Link href={`/${locale}/register/resident`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  padding: '14px 28px', borderRadius: '8px',
                  fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                }}>
                  {isFR ? 'S\'inscrire comme Expert' : 'Register as Expert'}
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/images/logo.png"
                  alt="Expertise au Cameroun"
                  style={{ width: '320px', maxWidth: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section style={{ backgroundColor: '#062040', color: 'white', padding: '0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '28px 24px',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color="#7dd3fc" />
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#7dd3fc' }}>{stat.value}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{ color: '#0a5694', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {isFR ? 'À Propos du Réseau' : 'About the Network'}
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '12px', marginBottom: '20px', fontFamily: '"Outfit", sans-serif', color: '#0f172a' }}>
                {isFR ? 'Expertiseaucameroun.org' : 'Expertiseaucameroun.org'}
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '16px', fontSize: '15px' }}>
                {isFR
                  ? 'Ce projet est financé par le Fonds de Solidarité pour les Projets Innovants (FSPI) de l\'Ambassade de France au Cameroun, et la Délégation de l\'Union Européenne au Cameroun. Il est exécuté par le bureau AFD (Agence Française de Développement) au Cameroun.'
                  : 'This project is funded by the Solidarity Fund for Innovative Projects (FSPI) of the French Embassy in Cameroon, and the EU Delegation in Cameroon. It is implemented by the AFD office in Cameroon.'
                }
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '28px', fontSize: '15px' }}>
                {isFR
                  ? 'L\'objectif principal est de créer un répertoire des expertises dans le secteur de l\'eau au Cameroun, afin de valoriser les compétences disponibles localement et dans la diaspora.'
                  : 'The main objective is to create a directory of expertise in the water sector in Cameroon, to promote skills available locally and in the diaspora.'
                }
              </p>
              <Link
                href={`/${locale}/about`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0a5694', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}
              >
                {isFR ? 'En savoir plus' : 'Learn more'} <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { icon: '🌊', title: isFR ? 'Ressources en eau' : 'Water Resources', color: '#dbeafe' },
                  { icon: '🔬', title: isFR ? 'Recherche & Innovation' : 'Research & Innovation', color: '#dcfce7' },
                  { icon: '🏗️', title: isFR ? 'Génie Civil Hydraulique' : 'Hydraulic Engineering', color: '#fef3c7' },
                  { icon: '♻️', title: isFR ? 'Assainissement' : 'Sanitation', color: '#fce7f3' },
                ].map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: item.color,
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>{item.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#f4f6f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#0a5694', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {isFR ? 'Nos Services' : 'Our Services'}
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '12px', fontFamily: '"Outfit", sans-serif', color: '#0f172a' }}>
              {isFR ? 'Ce que nous offrons' : 'What we offer'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={svc.href} style={{ display: 'block', backgroundColor: '#fff', borderRadius: '16px', padding: '32px 24px', textDecoration: 'none', height: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e8ecf0', transition: 'all 0.3s' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: svc.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <Icon size={26} color={svc.color} />
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', fontFamily: '"Outfit", sans-serif' }}>{svc.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{svc.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: svc.color, fontWeight: 600, fontSize: '13px', marginTop: '20px' }}>
                      {isFR ? 'Découvrir' : 'Learn more'} <ChevronRight size={16} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DIASPORA CTA ==================== */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0a5694, #0d9488)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <Globe size={48} style={{ opacity: 0.5, marginBottom: '20px' }} />
              <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', fontFamily: '"Outfit", sans-serif' }}>
                {isFR ? 'Expert Camerounais de la Diaspora ?' : 'Cameroonian Expert in Diaspora?'}
              </h2>
              <p style={{ opacity: 0.85, lineHeight: 1.7, fontSize: '16px', marginBottom: '32px' }}>
                {isFR
                  ? 'Vous avez une expertise dans le secteur de l\'eau et vivez à l\'étranger ? Rejoignez notre réseau et contribuez au développement du Cameroun depuis l\'international.'
                  : 'Do you have expertise in the water sector and live abroad? Join our network and contribute to the development of Cameroon from the international level.'
                }
              </p>
              <Link
                href={`/${locale}/register/diaspora`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', color: '#0a5694', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              >
                {isFR ? 'S\'inscrire comme Expert Diaspora' : 'Register as Diaspora Expert'}
                <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { flag: '🇫🇷', pays: 'France' },
                { flag: '🇩🇪', pays: 'Allemagne' },
                { flag: '🇺🇸', pays: 'États-Unis' },
                { flag: '🇨🇦', pays: 'Canada' },
                { flag: '🇬🇧', pays: 'Royaume-Uni' },
                { flag: '🇧🇪', pays: 'Belgique' },
              ].map((c, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
                  <span style={{ fontSize: '22px' }}>{c.flag}</span> {c.pays}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: '#0a5694', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {isFR ? 'Nos Partenaires' : 'Our Partners'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.7 }}>
            {[
              { name: 'UNESCO', abbr: 'UNESCO' },
              { name: 'GWP', abbr: 'GWP' },
              { name: 'Ambassade de France', abbr: 'AFD' },
              { name: 'Union Européenne', abbr: 'UE' },
              { name: 'MINEE', abbr: 'MINEE' },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#374151', backgroundColor: '#f9fafb' }}>
                  {p.abbr}
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', fontFamily: '"Outfit", sans-serif' }}>
            {isFR ? 'Rejoignez le réseau des experts' : 'Join the experts network'}
          </h2>
          <p style={{ opacity: 0.7, fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
            {isFR
              ? 'Inscrivez-vous dès maintenant pour faire partie du premier réseau national d\'experts en eau du Cameroun.'
              : 'Register now to be part of the first national network of water experts in Cameroon.'
            }
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/register/resident`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0a5694', color: '#fff', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
              {isFR ? 'Expert Résident' : 'Resident Expert'}
            </Link>
            <Link href={`/${locale}/register/diaspora`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0d9488', color: '#fff', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
              {isFR ? 'Expert Diaspora' : 'Diaspora Expert'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
