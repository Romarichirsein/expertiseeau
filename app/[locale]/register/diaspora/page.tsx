"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { RegistrationForm } from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegisterDiasporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Inscription Expert Diaspora' : 'Diaspora Expert Registration'} 
        breadcrumbs={[
          { label: isFR ? 'Inscription' : 'Registration', href: `/${locale}/register` },
          { label: isFR ? 'Expert Diaspora' : 'Diaspora Expert' }
        ]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <p className="text-[#292929] font-bold uppercase tracking-widest text-sm">
            {isFR ? 'Devenir membre' : 'Become a member'}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 italic">
            « {isFR ? 'Vous êtes camerounais et vous vivez hors du Cameroun' : 'You are Cameroonian and you live outside Cameroon'} »
          </h2>
        </div>

        <RegistrationForm type="diaspora" locale={locale} />

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            {isFR ? 'Déjà un compte ?' : 'Already have an account?'}{' '}
            <Link href={`/${locale}/login`} className="text-[#292929] font-bold hover:underline">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
