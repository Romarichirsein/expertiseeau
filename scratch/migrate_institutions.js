const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const institutionsPath = path.join(__dirname, '../data/institutions.json');

async function migrate() {
  console.log('--- Starting Institutions Migration to Supabase ---');
  
  if (!fs.existsSync(institutionsPath)) {
    console.error('Institutions file not found at:', institutionsPath);
    return;
  }

  const institutions = JSON.parse(fs.readFileSync(institutionsPath, 'utf8'));
  console.log(`Found ${institutions.length} institutions for migration.`);

  const batch = institutions.map(inst => ({
    sigle: inst.sigle,
    nom: inst.nom,
    siege: inst.siege,
    mandat: inst.mandat,
    site: inst.site,
    category: 'public' // Default to public, can be adjusted manually in DB or via logic
  }));

  const { data: existing } = await supabase.from('institutions').select('sigle');
  const existingSigles = new Set(existing?.map(e => e.sigle) || []);

  const toInsert = batch.filter(inst => !existingSigles.has(inst.sigle));

  if (toInsert.length === 0) {
    console.log('No new institutions to migrate.');
    return;
  }

  const { error } = await supabase
    .from('institutions')
    .insert(toInsert);

  if (error) {
    console.error('Migration error:', error.message);
  } else {
    console.log(`Successfully migrated ${toInsert.length} institutions.`);
  }

  console.log('--- Migration Complete ---');
}

migrate().catch(console.error);
