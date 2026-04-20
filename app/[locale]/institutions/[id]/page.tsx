import React from 'react';
import institutionsData from '@/data/institutions.json';
import { notFound } from 'next/navigation';
import InstitutionDetailClient from './InstitutionDetailClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  
  const allInstitutions = Object.values(institutionsData).flat() as any[];
  // Fix type comparison: inst.id is number, id is string from params
  const institution = allInstitutions.find(inst => String(inst.id) === id || inst.sigle === id);
  
  if (!institution) return { title: 'Institution Not Found' };

  const isFR = locale === 'fr';
  const title = `${institution.nom} (${institution.sigle}) - ExpertiseAuCameroun`;
  const description = isFR 
    ? `Détails institutionnels sur ${institution.nom}. Partenaire clé du secteur de l'eau au Cameroun.`
    : `Institutional details for ${institution.nom}. Key partner in the water sector in Cameroon.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    }
  };
}

export default async function InstitutionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id, locale } = resolvedParams;
  
  const allInstitutions = Object.values(institutionsData).flat() as any[];
  // Fix type comparison: inst.id is number, id is string from params
  const institution = allInstitutions.find(inst => String(inst.id) === id || inst.sigle === id);
  
  if (!institution) return notFound();

  return <InstitutionDetailClient locale={locale} institution={institution} />;
}
