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
            if (typeof window === 'undefined') {
                const fs = require('fs');
                const path = require('path');
                const filePath = path.join(process.cwd(), 'data', 'members.json');
                const experts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                return experts.filter((m: any) => m.name && m.status === 'approved');
            } else {
                const res = await fetch('/api/experts');
                if (res.ok) return await res.json();
            }
            return [];
        }
        return data;
    } catch (e) {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), 'data', 'members.json');
            const experts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return experts.filter((m: any) => m.name && m.status === 'approved');
        } else {
            const res = await fetch('/api/experts');
            if (res.ok) return await res.json();
        }
        return [];
    }
}

export async function getExpertById(id: string) {
    // Helper: search locally by id, then by email as fallback (for Supabase UUID vs WordPress int id mismatch)
    function findInList(experts: any[], id: string) {
        return experts.find((e: any) => e.id.toString() === id.toString()) || null;
    }

    try {
        // 1. Try Supabase by id
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!error && data) return data;

        // 2. If not found (UUID vs numeric id mismatch), try local file
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), 'data', 'members.json');
            const experts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return findInList(experts, id);
        } else {
            const res = await fetch('/api/experts');
            if (res.ok) {
                const experts = await res.json();
                return findInList(experts, id);
            }
        }
        return null;
    } catch (e) {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), 'data', 'members.json');
            const experts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return findInList(experts, id);
        } else {
            const res = await fetch('/api/experts');
            if (res.ok) {
                const experts = await res.json();
                return findInList(experts, id);
            }
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
            if (typeof window === 'undefined') {
                const fs = require('fs');
                const path = require('path');
                const filePath = path.join(process.cwd(), 'data', 'institutions.json');
                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
            } else {
                const res = await fetch('/api/institutions');
                if (res.ok) return await res.json();
            }
            return [];
        }
        return data;
    } catch (e) {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), 'data', 'institutions.json');
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
            const res = await fetch('/api/institutions');
            if (res.ok) return await res.json();
        }
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
            if (typeof window === 'undefined') {
                const fs = require('fs');
                const path = require('path');
                const filePath = path.join(process.cwd(), 'data', 'institutions.json');
                const insts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                return insts.find((i: any) => i.id.toString() === id.toString()) || null;
            } else {
                const res = await fetch('/api/institutions');
                if (res.ok) {
                    const insts = await res.json();
                    return insts.find((i: any) => i.id.toString() === id.toString()) || null;
                }
            }
            return null;
        }
        return data;
    } catch (e) {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(process.cwd(), 'data', 'institutions.json');
            const insts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return insts.find((i: any) => i.id.toString() === id.toString()) || null;
        } else {
            const res = await fetch('/api/institutions');
            if (res.ok) {
                const insts = await res.json();
                return insts.find((i: any) => i.id.toString() === id.toString()) || null;
            }
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

