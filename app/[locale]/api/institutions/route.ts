import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const dynamic = 'force-dynamic'; // ensure fresh data each request

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    // Resolve path to institutions.json relative to project root
    const filePath = path.join(process.cwd(), 'data', 'institutions.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const institutions = JSON.parse(fileData);
    const filtered = category ? institutions.filter((inst: any) => inst.category === category) : institutions;
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error loading institutions:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
