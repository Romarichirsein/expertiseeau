// Server & client compatible Supabase actions

import { supabase } from '@/lib/supabase';

export type ExpertFormData = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age_range: string;
  city: string;
  phone: string;
  profession: string;
  expertise: string[];
};

export async function registerExpert(data: ExpertFormData) {
  try {
    const { error } = await supabase
      .from('experts')
      .insert([
        {
          name: `${data.first_name} ${data.last_name}`,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          gender: data.gender,
          age_range: data.age_range,
          city: data.city,
          phone: data.phone,
          profession: data.profession,
          expertise: data.expertise,
          status: 'pending' // New registrations wait for admin approval
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getApprovedExperts() {
    try {
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('status', 'approved')
          .order('name', { ascending: true });
        
        if (error || !data || data.length === 0) {
            // Fallback to local API
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/experts`);
            if (res.ok) return await res.json();
            return [];
        }
        return data;
    } catch (e) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/experts`);
        if (res.ok) return await res.json();
        return [];
    }
}

export async function getExpertById(id: string) {
    try {
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
            // Fallback
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/experts`);
            if (res.ok) {
                const experts = await res.json();
                return experts.find((e: any) => e.id.toString() === id.toString()) || null;
            }
            return null;
        }
        return data;
    } catch (e) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/experts`);
        if (res.ok) {
            const experts = await res.json();
            return experts.find((e: any) => e.id.toString() === id.toString()) || null;
        }
        return null;
    }
}

export async function getInstitutions() {
    try {
        const { data, error } = await supabase
          .from('institutions')
          .select('*')
          .order('nom', { ascending: true });
        
        if (error || !data || data.length === 0) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/institutions`);
            if (res.ok) return await res.json();
            return [];
        }
        return data;
    } catch (e) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/institutions`);
        if (res.ok) return await res.json();
        return [];
    }
}

export async function getInstitutionById(id: string) {
    try {
        const { data, error } = await supabase
          .from('institutions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/institutions`);
            if (res.ok) {
                const insts = await res.json();
                return insts.find((i: any) => i.id.toString() === id.toString()) || null;
            }
            return null;
        }
        return data;
    } catch (e) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/institutions`);
        if (res.ok) {
            const insts = await res.json();
            return insts.find((i: any) => i.id.toString() === id.toString()) || null;
        }
        return null;
    }
}

export async function updateExpert(id: string, data: any) {
    try {
        const { error } = await supabase
            .from('experts')
            .update(data)
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Update error, trying local fallback:', error.message);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/experts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) return { success: true, message: 'Saved locally (fallback)' };
            return { success: false, error: 'Local update failed' };
        } catch (localError: any) {
            return { success: false, error: localError.message };
        }
    }
}

