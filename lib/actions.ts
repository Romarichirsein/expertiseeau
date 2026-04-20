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
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('status', 'approved')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Fetch error:', error.message);
      return [];
    }
    return data;
}

export async function getExpertById(id: string) {
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Fetch error:', error.message);
      return null;
    }
    return data;
}

export async function getInstitutions() {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('nom', { ascending: true });
    
    if (error) {
      console.error('Fetch institutions error:', error.message);
      return [];
    }
    return data;
}

export async function getInstitutionById(id: string) {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Fetch institution error:', error.message);
      return null;
    }
    return data;
}
