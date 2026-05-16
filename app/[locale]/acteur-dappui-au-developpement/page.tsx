import React, { Suspense } from 'react';
import { InstitutionCategoryView } from '@/components/InstitutionCategoryView';

export default async function ActeurAppuiPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <InstitutionCategoryView 
        locale={locale} 
        categoryId="entreprises" 
        title="Entreprises du secteur de l’eau au Cameroun" 
        titleEn="Water Sector Companies in Cameroon" 
      />
    </Suspense>
  );
}
