import React from 'react';
import { notFound } from 'next/navigation';
import MemberProfileClient from './MemberProfileClient';
import { Metadata } from 'next';
import { getExpertById } from '@/lib/actions';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  
  const member = await getExpertById(id);
  if (!member) return { title: 'Expert Not Found' };

  const isFR = locale === 'fr';
  const title = `${member.name} | ${member.profession || (isFR ? 'Expert Eau' : 'Water Expert')} - ExpertiseAuCameroun`;
  const description = isFR 
    ? `Profil professionnel de ${member.name}, expert en ${member.expertise?.join(', ') || 'secteur de l\'eau'} basé à ${member.city || 'Cameroun'}.`
    : `Professional profile of ${member.name}, expert in ${member.expertise?.join(', ') || 'water sector'} based in ${member.city || 'Cameroon'}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: ['/images/og-expert.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function MemberProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const member = await getExpertById(resolvedParams.id);
  if (!member) return notFound();

  return <MemberProfileClient locale={resolvedParams.locale} member={member} />;
}
