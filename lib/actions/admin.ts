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

export async function getFilteredExperts(
  searchQuery?: string,
  statusFilter?: string,
  expertiseFilter?: string,
  cityFilter?: string,
  page: number = 1,
  limit: number = 15
) {
  const supabase = await createClient();
  
  let query = supabase
    .from('experts')
    .select('*', { count: 'exact' });

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%,profession.ilike.%${searchQuery}%`);
  }

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  if (expertiseFilter && expertiseFilter !== 'all') {
    query = query.contains('expertise', [expertiseFilter]);
  }

  if (cityFilter && cityFilter !== 'all') {
    query = query.eq('city', cityFilter);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  query = query
    .order('created_at', { ascending: false })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Fetch filtered experts error:', error.message);
    return { experts: [], totalCount: 0 };
  }

  return { experts: data || [], totalCount: count || 0 };
}

export async function getFilterOptions() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('experts')
    .select('city, expertise');

  if (error) {
    console.error('Fetch filter options error:', error.message);
    return { cities: [], expertises: [] };
  }

  const citiesSet = new Set<string>();
  const expertisesSet = new Set<string>();

  data?.forEach(expert => {
    if (expert.city) {
      citiesSet.add(expert.city.trim());
    }
    if (Array.isArray(expert.expertise)) {
      expert.expertise.forEach((exp: string) => {
        if (exp) expertisesSet.add(exp.trim());
      });
    }
  });

  return {
    cities: Array.from(citiesSet).sort(),
    expertises: Array.from(expertisesSet).sort()
  };
}

export async function exportAllExperts() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('experts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Export all experts error:', error.message);
    return [];
  }

  return data || [];
}

