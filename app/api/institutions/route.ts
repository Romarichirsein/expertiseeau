// app/api/institutions/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const dynamic = 'force-dynamic'; // ensure fresh data on each request

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const locale = url.searchParams.get('locale'); // not used currently but kept for future i18n

  // Resolve path to institutions.json (project root)
  const dataPath = path.join(process.cwd(), 'data', 'institutions.json');
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    const allInstitutions = JSON.parse(raw);
    const filtered = category
      ? allInstitutions.filter((inst: any) => inst.category === category)
      : allInstitutions;
    return NextResponse.json(filtered);
  } catch (err) {
    console.error('Failed to load institutions:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
