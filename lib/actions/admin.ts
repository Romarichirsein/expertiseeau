'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

// Helper: read members from local JSON file
function getLocalMembers(): any[] {
  const filePath = path.join(process.cwd(), 'data', 'members.json');
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error('Error parsing local members:', e);
      return [];
    }
  }
  return [];
}

// Helper: save members to local JSON file
function saveLocalMembers(members: any[]) {
  const filePath = path.join(process.cwd(), 'data', 'members.json');
  fs.writeFileSync(filePath, JSON.stringify(members, null, 2), 'utf8');
}

export async function getPendingExperts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = getLocalMembers();
      return local.filter((e: any) => e.status === 'pending');
    }
    return data;
  } catch (e) {
    const local = getLocalMembers();
    return local.filter((e: any) => e.status === 'pending');
  }
}

export async function updateExpertStatus(expertId: string, status: 'approved' | 'rejected') {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('experts')
      .update({ status })
      .eq('id', expertId);

    if (error) {
      throw error;
    }

    revalidatePath('/[locale]/admin', 'page');
    revalidatePath('/[locale]/members', 'page');
    return { success: true };
  } catch (e: any) {
    console.error('Update status error, trying local:', e.message);
    try {
      const local = getLocalMembers();
      const idx = local.findIndex((x: any) => x.id.toString() === expertId.toString());
      if (idx !== -1) {
        local[idx].status = status;
        saveLocalMembers(local);
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/members', 'page');
        return { success: true };
      }
      return { success: false, error: 'Expert not found locally' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}

export async function getFilteredExperts(
  searchQuery?: string,
  statusFilter?: string,
  expertiseFilter?: string,
  cityFilter?: string,
  page: number = 1,
  limit: number = 15
) {
  try {
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

    if (error || !data || data.length === 0) {
      throw new Error(error?.message || 'No Supabase data');
    }

    return { experts: data || [], totalCount: count || 0 };
  } catch (e) {
    let local = getLocalMembers();

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      local = local.filter((x: any) => 
        (x.name && x.name.toLowerCase().includes(q)) ||
        (x.email && x.email.toLowerCase().includes(q)) ||
        (x.phone && x.phone.toLowerCase().includes(q)) ||
        (x.profession && x.profession.toLowerCase().includes(q))
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      local = local.filter((x: any) => x.status === statusFilter);
    }

    if (expertiseFilter && expertiseFilter !== 'all') {
      local = local.filter((x: any) => 
        Array.isArray(x.expertise) && x.expertise.some((exp: string) => exp.trim() === expertiseFilter.trim())
      );
    }

    if (cityFilter && cityFilter !== 'all') {
      local = local.filter((x: any) => x.city && x.city.trim() === cityFilter.trim());
    }

    const totalCount = local.length;
    const fromIndex = (page - 1) * limit;
    const paginated = local.slice(fromIndex, fromIndex + limit);

    return { experts: paginated, totalCount };
  }
}

export async function getFilterOptions() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('experts')
      .select('city, expertise');

    if (error || !data || data.length === 0) {
      throw new Error(error?.message || 'No Supabase data');
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
  } catch (e) {
    const local = getLocalMembers();
    const citiesSet = new Set<string>();
    const expertisesSet = new Set<string>();

    local.forEach((expert: any) => {
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
}

export async function exportAllExperts() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getLocalMembers();
    }

    return data || [];
  } catch (e) {
    return getLocalMembers();
  }
}
