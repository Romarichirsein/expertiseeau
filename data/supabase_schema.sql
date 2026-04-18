-- Schema pour ExpertiseAuCameroun (Supabase / PostgreSQL)

-- 1. Table des Experts
CREATE TABLE experts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wp_id INTEGER UNIQUE, -- ID original de WordPress pour la migration
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  age_range TEXT,
  profession TEXT,
  city TEXT,
  country TEXT,
  nationality TEXT,
  phone TEXT,
  expertise TEXT[], -- Tableau de strings pour les domaines
  degree TEXT,
  university TEXT,
  degree_country TEXT,
  experience_years TEXT,
  status TEXT DEFAULT 'pending', -- approved, pending, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Institutions
CREATE TABLE institutions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sigle TEXT NOT NULL,
  nom TEXT NOT NULL,
  siege TEXT,
  mandat TEXT,
  site TEXT,
  category TEXT, -- public, ngo, private, research
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Row Level Security (RLS)
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

-- Les experts peuvent voir tout le répertoire (si approuvés)
CREATE POLICY "Experts visibility" ON experts
  FOR SELECT USING (status = 'approved');

-- Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" ON experts
  FOR UPDATE USING (auth.email() = email);

-- Index pour la recherche rapide
CREATE INDEX idx_experts_name ON experts (name);
CREATE INDEX idx_experts_expertise ON experts (expertise);

-- 4. Table du Blog
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author TEXT,
  category TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table de la Galerie
CREATE TABLE gallery_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour le Blog
CREATE INDEX idx_blog_slug ON blog_posts (slug);
CREATE INDEX idx_blog_category ON blog_posts (category);

-- RLS pour le contenu public (Lecture pour tous)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read gallery_items" ON gallery_items FOR SELECT USING (true);
