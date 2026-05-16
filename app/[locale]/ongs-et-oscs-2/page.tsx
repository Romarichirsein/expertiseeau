import React, { Suspense } from 'react';
import { InstitutionCategoryView } from '@/components/InstitutionCategoryView';

export default async function ONGsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <InstitutionCategoryView 
        locale={locale} 
        categoryId="ongs" 
        title="ONGs et OSCs" 
        titleEn="NGOs and CSOs" 
      />
    </Suspense>
  );
}
