import { NextRequest, NextResponse } from 'next/server';
import institutionsData from '@/data/institutions.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let results = institutionsData as any[];

  if (category) {
    results = results.filter((inst: any) => inst.category === category);
  }

  return NextResponse.json(results);
}
