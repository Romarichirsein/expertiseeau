'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ExpertSignUpData = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  gender: string;
  age_range: string;
  city: string;
  country?: string; // Optional for diaspora
  phone: string;
  profession: string;
  expertise: string[];
  expert_type?: 'resident' | 'diaspora';
};

export async function signUpExpert(data: ExpertSignUpData) {
  const supabase = await createClient();

  // 1. Sign up the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password || 'TemporaryPassword123!', // User should have set this in the form
    options: {
      data: {
        full_name: `${data.first_name} ${data.last_name}`,
        role: 'expert'
      }
    }
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  // 2. Create the profile in the 'experts' table
  const { error: dbError } = await supabase
    .from('experts')
    .insert([
      {
        id: authData.user?.id, // Link Auth ID to experts table ID
        name: `${data.first_name} ${data.last_name}`,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender: data.gender,
        age_range: data.age_range,
        city: data.city,
        country: data.country || 'Cameroun',
        phone: data.phone,
        profession: data.profession,
        expertise: data.expertise,
        expert_type: data.expert_type || 'resident',
        status: 'pending' 
      }
    ]);

  if (dbError) {
    // Note: In production, you might want to rollback the auth user if DB insert fails
    return { success: false, error: dbError.message };
  }

  revalidatePath('/members', 'layout');
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
