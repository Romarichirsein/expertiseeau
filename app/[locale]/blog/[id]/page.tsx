import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { Metadata } from 'next';

type Props = {
  params: { locale: string; id: string };
};

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!post) {
    // Check mock
    if (id === 'mock-1') {
      return { title: 'Défis du stress hydrique au Cameroun | ExpertiseAuCameroun' };
    }
    return { title: 'Article non trouvé' };
  }

  return {
    title: `${post.title} | ExpertiseAuCameroun`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
      type: 'article',
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  let post = null;
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    // Fallback mock
    if (params.id === 'mock-1') {
      post = {
        id: 'mock-1',
        title: "Le Cameroun face aux défis du stress hydrique en 2025",
        excerpt: "Analyse des récentes données pluviométriques et des stratégies de résilience pour les zones urbaines.",
        content: "Le stress hydrique devient une réalité préoccupante pour de nombreuses villes camerounaises. Avec le changement climatique, la périodicité des pluies a été perturbée, affectant la recharge des nappes phréatiques...",
        created_at: "2025-04-14T10:00:00Z",
        author: "Dr. Fonkoua",
        category: "Analyse",
        image_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
      };
    }
  } else {
    post = data;
  }

  if (!post) return notFound();

  return <BlogPostClient locale={params.locale} post={post} />;
}
