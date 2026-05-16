import React, { Suspense } from 'react';
import { InstitutionCategoryView } from '@/components/InstitutionCategoryView';

export default async function InstitutionTransfrontalierePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <InstitutionCategoryView 
        locale={locale} 
        categoryId="transfrontaliere" 
        title="Institution transfrontalière" 
        titleEn="Cross-border Institution" 
      />
    </Suspense>
  );
}
