"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  locale: string;
}

export const TestimonialsSection = ({ locale }: TestimonialsSectionProps) => {
  const isFR = locale === 'fr';

  const testimonials = [
    {
      name: "Dr. Emmanuel Noumsi",
      role: isFR ? "Hydrogéologue, Expert AEP - Yaoundé" : "Hydrogeologist, Water Supply Expert - Yaounde",
      text: isFR 
        ? "Le Réseau National est un outil de collaboration exceptionnel. Il permet de mutualiser nos expertises pour répondre efficacement aux défis complexes de l'accès à l'eau potable au Cameroun."
        : "The National Network is an exceptional collaboration tool. It allows us to pool our expertise to effectively respond to the complex challenges of access to clean drinking water in Cameroon.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ing. Carine Bella",
      role: isFR ? "Spécialiste Assainissement & GIRE - Douala" : "Sanitation & IWRM Specialist - Douala",
      text: isFR 
        ? "Grâce à cette plateforme, nous pouvons enfin connecter les bureaux d'études, les institutions et les experts indépendants. C'est un grand pas en avant pour la gouvernance des ressources aquatiques."
        : "Thanks to this platform, we can finally connect consulting firms, institutions, and independent experts. This is a major step forward for aquatic resource governance.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Prof. Jean-Pierre Mvondo",
      role: isFR ? "Chercheur en Hydrologie, Université de Dschang" : "Hydrology Researcher, University of Dschang",
      text: isFR 
        ? "La recherche appliquée trouve ici un pont direct vers les acteurs opérationnels du secteur de l'eau. Une excellente initiative pour encourager l'innovation et le partage des connaissances."
        : "Applied research finds a direct bridge to operational actors in the water sector here. An excellent initiative to encourage innovation and knowledge sharing.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="section-padding bg-[#292929] text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#34b4e2] font-bold uppercase tracking-[0.3em] text-xs">
            {isFR ? "Avis des experts" : "Expert Reviews"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {isFR ? "Vos experts vous parlent de leurs expériences" : "Your experts talk about their experiences"}
          </h2>
          <div className="h-1 w-20 bg-[#84c340] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl relative group hover:bg-white/10 transition-all"
            >
              <Quote className="absolute top-6 right-8 text-[#34b4e2] opacity-20 w-12 h-12" />
              <p className="text-gray-300 mb-8 relative z-10 leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-[#34b4e2] p-0.5" />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-[#84c340] uppercase tracking-widest border-y border-white/10 py-8 inline-block">
            {isFR 
              ? "” COMMENCEZ VOTRE JOURNEE AVEC LES CONSEILS DE NOS EXPERTS ”" 
              : "” START YOUR DAY WITH OUR EXPERTS' ADVICE ”"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
