const fs = require('fs');

const rawDataPath = 'C:\\Users\\COMPUTER STORES\\.gemini\\antigravity\\brain\\2259f9d8-a1a3-4a23-aa36-d7772ec5db80\\scratch\\members_extracted_v6.json';
const outputPath = 'C:\\Users\\COMPUTER STORES\\Downloads\\projets ia\\Sites wellborne\\expertiseaucameroun-next\\data\\members_cleaned.json';

function unserializePHP(data) {
    if (!data || typeof data !== 'string') return data;
    if (!data.startsWith('a:') && !data.startsWith('s:')) return data;

    // Handle serialized arrays a:n:{...}
    if (data.startsWith('a:')) {
        const matches = [...data.matchAll(/s:\d+:"([^"]+)"/g)];
        if (matches.length > 0) {
            return matches.map(m => m[1]);
        }
        return [];
    }
    
    // Handle serialized strings s:n:"value"
    if (data.startsWith('s:')) {
        const match = data.match(/s:\d+:"([^"]+)"/);
        return match ? match[1] : data;
    }

    return data;
}

const rawMembers = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

const cleanedMembers = rawMembers.map(m => {
    const meta = m.meta || {};
    
    // Basic fields
    const firstName = meta.first_name || meta.prenom || '';
    const lastName = meta.last_name || meta.nom || '';
    const fullName = meta.full_name || `${firstName} ${lastName}`.trim() || m.username;

    // Expertise fields (array or string)
    let expertise = unserializePHP(meta.domaines_d_expertise || '');
    if (!Array.isArray(expertise)) expertise = expertise ? [expertise] : [];

    // Experience mapping
    const experience = {
        research: unserializePHP(meta.recherches || ''),
        management: unserializePHP(meta.gestions_de_la_ressource_en_eau || ''),
        teaching: unserializePHP(meta.enseignements || ''),
        works: unserializePHP(meta.ouvrages || ''),
        supply: meta.approvisionnement_en_eau_potable || '',
        sanitation: meta.assainissement_liquide || ''
    };

    return {
        id: m.id,
        email: m.email,
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        gender: unserializePHP(meta.sexe || meta.gender || ''),
        age_range: unserializePHP(meta.age || ''),
        profession: meta.profession1 || '',
        city: meta.ville_de_residence || '',
        country: meta.pays_de_residence || '',
        nationality: meta.nationalite || '',
        phone: meta.mobile_number || '',
        expertise: expertise,
        degree: meta.intitule_du_diplome1 || '',
        university: meta.universite_d_obtention1 || '',
        degree_country: meta.pays_d_obtention1 || '',
        experience_years: experience,
        status: meta.account_status || 'approved'
    };
});

fs.writeFileSync(outputPath, JSON.stringify(cleanedMembers, null, 2));
console.log(`Cleaned ${cleanedMembers.length} members with rich profiles. Ready for Supabase.`);
