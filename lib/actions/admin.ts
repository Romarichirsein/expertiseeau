'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPendingExperts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experts')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch pending error:', error.message);
    return [];
  }
  return data;
}

export async function updateExpertStatus(expertId: string, status: 'approved' | 'rejected') {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('experts')
    .update({ status })
    .eq('id', expertId);

  if (error) {
    console.error('Update status error:', error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/[locale]/admin', 'page');
  revalidatePath('/[locale]/members', 'page');
  return { success: true };
}
