import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const data = await request.json();
    console.log(`Mock update for expert ${id}:`, data);
    
    // In a real app with local JSON, we could write back to the file
    // But since this is a dev environment and we want to avoid file locking issues,
    // we'll just return success.
    
    return NextResponse.json({ success: true, message: 'Expert updated successfully (mock)' });
  } catch (error) {
    console.error('Error updating expert:', error);
    return NextResponse.json({ error: 'Failed to update expert' }, { status: 500 });
  }
}
