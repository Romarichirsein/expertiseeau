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
  X,
  LogOut,
  User as UserIcon,
  ShieldCheck
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
  const isFR = locale === 'fr';

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleMobile}
        className="lg:hidden fixed top-6 right-6 z-[110] w-14 h-14 bg-[#0a5694] text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center active:scale-95 transition-all"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar Content */}
      <AnimatePresence>
        {(isOpen || !isCollapsed) && (
          <motion.aside
            initial={false}
            animate={{ 
              width: isCollapsed ? '100px' : '320px',
              x: 0 
            }}
            className={cn(
              "fixed inset-y-0 left-0 z-[100] bg-white border-r border-gray-50 shadow-2xl transition-all duration-500 ease-out",
              "lg:relative lg:translate-x-0",
              !isOpen && "translate-x-[-100%] lg:translate-x-0"
            )}
          >
            <div className="flex flex-col h-full p-8">
              {/* Logo Area */}
              <Link href={`/${locale}`} className="flex items-center gap-4 px-2 mb-12 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform">
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                {!isCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col"
                  >
                    <span className="font-black text-xs text-[#0a5694] uppercase tracking-widest leading-tight">Expertise</span>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Cameroun</span>
                  </motion.div>
                )}
              </Link>

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
                        "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative",
                        isActive 
                          ? "bg-[#0a5694] text-white shadow-xl shadow-blue-900/20" 
                          : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon size={22} className={cn("min-w-[22px]", isActive ? "text-white" : "group-hover:text-[#0a5694] transition-colors")} />
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="font-black text-xs uppercase tracking-widest"
                        >
                          {t(item.key)}
                        </motion.span>
                      )}
                      {isActive && !isCollapsed && (
                        <motion.div 
                          layoutId="active-dot"
                          className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* User Area / Footer */}
              <div className="pt-8 mt-auto border-t border-gray-50 space-y-6">
                 {!isCollapsed && (
                   <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0a5694]">
                            <ShieldCheck size={20} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{isFR ? 'Accès Sécurisé' : 'Secure Access'}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">v2.0 Premium</span>
                         </div>
                      </div>
                   </div>
                 )}

                 <button 
                  onClick={toggleSidebar}
                  className="hidden lg:flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                >
                  <div className={cn("transition-transform duration-500", !isCollapsed && "rotate-180")}>
                    <ChevronRight size={22} />
                  </div>
                  {!isCollapsed && <span className="font-black text-[10px] uppercase tracking-widest">{isFR ? 'Réduire' : 'Collapse'}</span>}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="lg:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[90]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
