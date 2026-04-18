"use client";

import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Navbar({ locale = 'fr' }: { locale?: string }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/members?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <header className="h-16 border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <form onSubmit={handleSearch} className="relative max-w-md w-full hidden md:block">
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
            <Search size={18} />
          </button>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === 'fr' ? "Rechercher un expert..." : "Search for an expert..."}
            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <div className="flex bg-secondary rounded-xl p-1 mr-2 text-xs font-bold">
          <button className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'fr' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}>FR</button>
          <button className={`px-3 py-1.5 rounded-lg transition-all ${locale === 'en' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}>EN</button>
        </div>

        <button className="p-2.5 text-muted-foreground hover:bg-secondary rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>

        <div className="h-8 w-[1px] bg-border mx-2"></div>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-secondary transition-all group">
          <div className="flex flex-col items-end text-xs hidden sm:flex">
            <span className="font-semibold text-foreground">{locale === 'fr' ? 'Connexion' : 'Login'}</span>
            <span className="text-muted-foreground uppercase text-[9px] tracking-tighter">Portail Expert</span>
          </div>
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <User size={20} />
          </div>
        </button>
      </div>
    </header>
  );
}
