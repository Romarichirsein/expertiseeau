import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const data = await request.json();
    console.log(`Updating expert ${id} in local database:`, data);
    
    const filePath = path.join(process.cwd(), 'data', 'members.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Database file members.json not found' }, { status: 504 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const experts = JSON.parse(fileContents);
    
    const index = experts.findIndex((e: any) => e.id.toString() === id.toString());
    if (index === -1) {
      return NextResponse.json({ error: 'Expert not found' }, { status: 404 });
    }
    
    // Merge update payload
    experts[index] = {
      ...experts[index],
      ...data
    };
    
    // Save changes
    fs.writeFileSync(filePath, JSON.stringify(experts, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Expert updated successfully' });
  } catch (error: any) {
    console.error('Error updating expert:', error);
    return NextResponse.json({ error: error.message || 'Failed to update expert' }, { status: 500 });
  }
}
