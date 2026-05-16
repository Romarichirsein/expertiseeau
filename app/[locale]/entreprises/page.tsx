import React, { Suspense } from 'react';
import { InstitutionCategoryView } from '@/components/InstitutionCategoryView';

export default async function EntreprisesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <InstitutionCategoryView 
        locale={locale} 
        categoryId="enseignement" 
        title="Institutions d’enseignement dans le secteur de l’eau" 
        titleEn="Educational Institutions in the Water Sector" 
      />
    </Suspense>
  );
}
