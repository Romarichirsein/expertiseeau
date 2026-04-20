import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://expertiseaucameroun.org';
const LOCALES = ['fr', 'en'];
const STATIC_ROUTES = [
  '', '/members', '/institutions', '/about',
  '/contact', '/gallery', '/blog',
  '/register/resident', '/register/diaspora',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Static routes
  LOCALES.forEach((locale) => {
    STATIC_ROUTES.forEach((route) => {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Dynamic member pages
  try {
    const { data: members } = await supabase
      .from('experts')
      .select('id')
      .eq('status', 'approved');

    if (members) {
      members.forEach(({ id }) => {
        LOCALES.forEach((locale) => {
          entries.push({
            url: `${BASE_URL}/${locale}/members/${id}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      });
    }
  } catch (_) {
    // Supabase not configured yet – skip dynamic member URLs
  }

  // Dynamic institution pages
  try {
    const { data: institutions } = await supabase
      .from('institutions')
      .select('id');

    if (institutions) {
      institutions.forEach(({ id }) => {
        LOCALES.forEach((locale) => {
          entries.push({
            url: `${BASE_URL}/${locale}/institutions/${id}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      });
    }
  } catch (_) {
    // Supabase not configured yet – skip dynamic institution URLs
  }

  return entries;
}
