import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a no-op client stub when credentials are missing (e.g. during static build)
function createSafeClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Dynamic features will be limited.');
    // Return a minimal stub so imports don't crash at module load time
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        eq: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
      }),
    } as unknown as SupabaseClient;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSafeClient();
