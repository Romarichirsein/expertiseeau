"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  locale: string;
}

export const PageHeader = ({ title, breadcrumbs, locale }: PageHeaderProps) => {
  return (
    <section className="relative bg-[#2794e8] py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-repeat" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>
          
          <nav className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {locale === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={14} className="opacity-50" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Decorative background shape */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
};
