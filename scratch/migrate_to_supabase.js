const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Configuration - User must fill .env.local first or we use placeholders for now
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const membersPath = path.join(__dirname, '../data/members_cleaned.json');

async function migrate() {
  console.log('--- Starting Migration to Supabase ---');
  
  if (!fs.existsSync(membersPath)) {
    console.error('Members file not found at:', membersPath);
    return;
  }

  const members = JSON.parse(fs.readFileSync(membersPath, 'utf8'));
  console.log(`Found ${members.length} members for migration.`);

  // Chunk members into batches of 50 to avoid payload limits
  const BATCH_SIZE = 50;
  for (let i = 0; i < members.length; i += BATCH_SIZE) {
    const batch = members.slice(i, i + BATCH_SIZE).map(m => ({
      wp_id: parseInt(m.id),
      email: m.email || `missing_${m.id}_${Math.random().toString(36).substring(7)}@example.com`,
      name: m.name || 'Anonymous',
      first_name: m.first_name || '',
      last_name: m.last_name || '',
      gender: m.gender || '',
      age_range: m.age_range || '',
      profession: m.profession || '',
      city: m.city || '',
      country: m.country || '',
      nationality: m.nationality || '',
      phone: m.phone || '',
      expertise: Array.isArray(m.expertise) ? m.expertise : (m.expertise ? [m.expertise] : []),
      degree: m.degree || '',
      university: m.university || '',
      degree_country: m.degree_country || '',
      experience_years: m.experience_years || '',
      status: 'approved' // Automatically approve migrated members
    }));

    const { error } = await supabase
      .from('experts')
      .upsert(batch, { onConflict: 'wp_id' });

    if (error) {
      console.error(`Error in batch ${i / BATCH_SIZE}:`, error.message);
    } else {
      console.log(`Successfully migrated batch ${i / BATCH_SIZE + 1} (${i + batch.length} total)`);
    }
  }

  console.log('--- Migration Complete ---');
}

migrate().catch(console.error);
