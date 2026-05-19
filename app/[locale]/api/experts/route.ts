import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  try {
    const expertsPath = path.join(process.cwd(), 'data', 'members.json');
    const fileContents = fs.readFileSync(expertsPath, 'utf8');
    const expertsData = JSON.parse(fileContents) as any[];

    return NextResponse.json(expertsData);
  } catch (error) {
    console.error('Error reading experts data:', error);
    return NextResponse.json({ error: 'Failed to load experts data' }, { status: 500 });
  }
}
