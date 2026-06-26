import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  try {
    const expertsPath = path.join(process.cwd(), 'data', 'members.json');
    const fileContents = fs.readFileSync(expertsPath, 'utf8');
    let expertsData = JSON.parse(fileContents) as any[];

    // Optional filters via query params
    const { searchParams } = new URL(request.url);
    const emailFilter = searchParams.get('email');
    const statusFilter = searchParams.get('status');

    if (emailFilter) {
      expertsData = expertsData.filter((e: any) =>
        e.email?.toLowerCase() === emailFilter.toLowerCase()
      );
    }
    if (statusFilter) {
      expertsData = expertsData.filter((e: any) => e.status === statusFilter);
    }

    return NextResponse.json(expertsData);
  } catch (error) {
    console.error('Error reading experts data:', error);
    return NextResponse.json({ error: 'Failed to load experts data' }, { status: 500 });
  }
}

