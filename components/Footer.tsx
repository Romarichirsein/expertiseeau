"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer({ locale = 'fr' }: { locale?: string }) {
  const isFR = locale === 'fr';

  return (
    <footer className="bg-[#f5f5f5] pt-16 text-[#777777]">
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold text-[#292929] uppercase tracking-[1px] border-b border-[#aaaaaa] pb-2">Renseignements généraux</h4>
            <div className="text-[15px] leading-[1.8]">
              <p>waterforlife.partner@gmail.com |</p>
              <p>water4lifecmr.com</p>
              <p className="mt-2">(+237) 675 35 87 95 / 697 49 83 22</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold text-[#292929] uppercase tracking-[1px] border-b border-[#aaaaaa] pb-2">Adresse de l’atelier</h4>
            <div className="text-[15px] leading-[1.8]">
              <p>..</p>
              <p>Yaounndé, Cameroun</p>
              <div className="mt-2 flex gap-2">
                <Link href="#" className="hover:text-[#34b4e2] transition-colors">Contact</Link> | 
                <Link href="#" className="hover:text-[#34b4e2] transition-colors">Careers</Link>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold text-[#292929] uppercase tracking-[1px] border-b border-[#aaaaaa] pb-2">Heure d’ouverture</h4>
            <div className="text-[15px] leading-[1.8]">
              <p>8h00 - 11h30</p>
              <p>14h00 - 17h30</p>
              <p>19h00 - 22h00</p>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold text-[#292929] uppercase tracking-[1px] border-b border-[#aaaaaa] pb-2">Get your free weekly tips!</h4>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-3 bg-white border border-[#aaaaaa] rounded-[3px] text-sm focus:outline-none focus:border-[#34b4e2] transition-colors" 
                />
                <button className="bg-[#34b4e2] text-white px-4 py-3 rounded-[3px] font-bold hover:bg-white hover:text-[#34b4e2] hover:border-[#34b4e2] border border-transparent transition-all uppercase text-[12px] tracking-[1px]">
                  OK
                </button>
              </div>
              <div className="flex gap-3 mt-4">
                <Link href="https://twitter.com/Water4life3" className="w-[38px] h-[38px] flex items-center justify-center bg-[#34b4e2] text-white rounded-full hover:bg-[#ffffff] hover:text-[#34b4e2] transition-all border border-transparent hover:border-[#34b4e2]">
                  <span className="sr-only">Twitter</span>
                  {/* Twitter Icon SVG */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </Link>
                <Link href="https://www.facebook.com/Waterforlife-Cameroon-1609403025962592" className="w-[38px] h-[38px] flex items-center justify-center bg-[#34b4e2] text-white rounded-full hover:bg-[#ffffff] hover:text-[#34b4e2] transition-all border border-transparent hover:border-[#34b4e2]">
                  <span className="sr-only">Facebook</span>
                  {/* Facebook Icon SVG */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#4579ec] py-6 text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-[13px] font-bold uppercase tracking-[1px]">
            © Copyright - Les Experts en eau au Cameroun by <a href="https://fydygroup.cm/" title="fydytech" target="_blank" className="hover:text-[#23d2ed] transition-colors">fydytech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

