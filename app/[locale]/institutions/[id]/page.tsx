import React from 'react';
import institutionsData from '@/data/institutions.json';
import { notFound } from 'next/navigation';
import InstitutionDetailClient from './InstitutionDetailClient';
import { Metadata } from 'next';

type Props = {
  params: { locale: string; id: string };
};

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const allInstitutions = Object.values(institutionsData).flat();
  const institution = allInstitutions.find(inst => inst.id === id || inst.sigle === id);
  
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

export default function InstitutionDetailPage({ params }: Props) {
  const allInstitutions = Object.values(institutionsData).flat();
  const institution = allInstitutions.find(inst => inst.id === params.id || inst.sigle === params.id);
  
  if (!institution) return notFound();

  return <InstitutionDetailClient locale={params.locale} institution={institution} />;
}
