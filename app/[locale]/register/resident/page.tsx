"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { RegistrationForm } from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegisterResidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Inscription Expert Résident' : 'Resident Expert Registration'} 
        breadcrumbs={[
          { label: isFR ? 'Inscription' : 'Registration', href: `/${locale}/register` },
          { label: isFR ? 'Expert Résident' : 'Resident Expert' }
        ]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            {isFR ? 'Devenir membre' : 'Become a member'}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 italic">
            « {isFR ? 'Vous êtes camerounais et vous vivez au Cameroun' : 'You are Cameroonian and you live in Cameroon'} »
          </h2>
        </div>

        <RegistrationForm type="resident" locale={locale} />

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            {isFR ? 'Déjà un compte ?' : 'Already have an account?'}{' '}
            <Link href={`/${locale}/login`} className="text-blue-600 font-bold hover:underline">
              {isFR ? 'Connectez-vous ici' : 'Login here'}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
