"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  Home, 
  Users, 
  Building2, 
  Image as ImageIcon, 
  FileText, 
  Mail, 
  ChevronRight,
  Droplets,
  Globe,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { id: 'home', icon: Home, key: 'home', href: '/' },
  { id: 'members', icon: Users, key: 'members', href: '/members' },
  { id: 'institutions', icon: Building2, key: 'institutions', href: '/institutions' },
  { id: 'gallery', icon: ImageIcon, key: 'gallery', href: '/gallery' },
  { id: 'blog', icon: FileText, key: 'blog', href: '/blog' },
  { id: 'about', icon: Droplets, key: 'about', href: '/about' },
  { id: 'contact', icon: Mail, key: 'contact', href: '/contact' },
];

export default function Sidebar({ locale = 'fr' }: { locale?: string }) {
  const t = useTranslations('Navigation');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Content */}
      <AnimatePresence>
        {(isOpen || !isCollapsed) && (
          <motion.aside
            initial={false}
            animate={{ 
              width: isCollapsed ? '80px' : '280px',
              x: 0 
            }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 bg-card border-r border-border transition-all duration-300 ease-in-out",
              "lg:relative lg:translate-x-0",
              !isOpen && "translate-x-full lg:translate-x-0"
            )}
          >
            <div className="flex flex-col h-full p-4">
              {/* Logo Area */}
              <div className="flex items-center gap-3 px-2 mb-10 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 overflow-hidden border border-border">
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                {!isCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col"
                  >
                    <span className="font-bold text-sm leading-tight text-primary">Les Experts en Eaux</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">au Cameroun</span>
                  </motion.div>
                )}
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === `/${locale}${item.href}` || (pathname === '/' && item.href === '/');
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                        isActive 
                          ? "bg-primary text-white shadow-md shadow-primary/10" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon size={20} className={cn("min-w-[20px]", isActive ? "text-white" : "group-hover:text-primary")} />
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="font-medium"
                        >
                          {t(item.key)}
                        </motion.span>
                      )}
                      {isActive && !isCollapsed && (
                        <motion.div 
                          layoutId="active"
                          className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer / Toggle */}
              <div className="pt-4 mt-auto border-t border-border">
                 <button 
                  onClick={toggleSidebar}
                  className="hidden lg:flex items-center gap-3 px-3 py-3 w-full rounded-xl text-muted-foreground hover:bg-secondary transition-all"
                >
                  <ChevronRight size={20} className={cn("transition-transform", !isCollapsed && "rotate-180")} />
                  {!isCollapsed && <span className="font-medium text-sm">Masquer le menu</span>}
                </button>
               
                <div className="flex items-center gap-3 px-3 py-4 mt-2 bg-secondary/50 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe size={16} />
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold uppercase">{locale}</span>
                      <span className="text-[10px] text-muted-foreground">Version 2.0</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
