"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, Zap } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === 'fr';

  const contactInfo = [
    {
      icon: MapPin,
      title: isFR ? 'Notre Adresse' : 'Our Address',
      content: 'Efoulan - Yaoundé, Cameroun',
      color: 'bg-blue-600'
    },
    {
      icon: Phone,
      title: isFR ? 'Téléphone' : 'Phone Number',
      content: '(+237) 675 35 87 95 / 697 49 83 22',
      color: 'bg-green-600'
    },
    {
      icon: Mail,
      title: isFR ? 'Email' : 'Email Address',
      content: 'waterforlife.partner@gmail.com',
      color: 'bg-orange-500'
    }
  ];

  const businessHours = [
    { label: isFR ? 'Matin' : 'Morning', hours: '08h00 - 11h30' },
    { label: isFR ? 'Après-midi' : 'Afternoon', hours: '14h00 - 17h30' },
    { label: isFR ? 'Soir' : 'Evening', hours: '19h00 - 22h00' }
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <PageHeader 
        title={isFR ? 'Contactez-nous' : 'Contact Us'} 
        breadcrumbs={[{ label: isFR ? 'Contact' : 'Contact' }]}
        locale={locale}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 ${info.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-500 font-medium">{info.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{isFR ? 'Envoyez-nous un message' : 'Send us a message'}</h2>
                  <p className="text-gray-500 text-sm">{isFR ? 'Nous vous répondrons dans les 24 heures.' : 'We will reply within 24 hours.'}</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">{isFR ? 'Nom' : 'Name'}</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">Email</label>
                    <input type="email" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">{isFR ? 'Sujet' : 'Subject'}</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder={isFR ? "Comment pouvons-nous vous aider ?" : "How can we help?"} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">Message</label>
                  <textarea rows={5} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all resize-none" placeholder={isFR ? "Votre message ici..." : "Your message here..."}></textarea>
                </div>

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 group">
                  {isFR ? 'Envoyer le Message' : 'Send Message'}
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="bg-[#292929] text-white p-10 rounded-[40px] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">{isFR ? 'Heures d\'ouverture' : 'Business Hours'}</h3>
                  </div>

                  <div className="space-y-6">
                    {businessHours.map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">{item.label}</span>
                        <span className="text-xl font-medium font-outfit">{item.hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <Zap className="text-[#34b4e2]" />
                    <p className="text-sm text-gray-300">
                      {isFR ? 'Disponible 7j/7 pour vos demandes urgentes.' : 'Available 7/7 for urgent requests.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white p-4 rounded-[40px] shadow-sm border border-gray-100 h-80 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Globe size={32} />
                  </div>
                  <p className="font-bold uppercase tracking-widest text-xs">Interactive Map View</p>
                </div>
                {/* Real iframe would go here */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.366472251433!2d11.502127!3d3.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf947514a687%3A0xb366a7b7d9036c07!2sEfoulan%2C%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1715674800000!5m2!1sfr!2scm" 
                  className="w-full h-full border-0 rounded-[30px] relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
