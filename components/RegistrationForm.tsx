"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Phone, MapPin, 
  GraduationCap, Briefcase, BarChart, 
  ChevronRight, ChevronLeft, CheckCircle2 
} from 'lucide-react';

interface RegistrationFormProps {
  type: 'resident' | 'diaspora';
  locale: string;
}

const EXPERTISE_DOMAINS = [
  "Hydrobiologie",
  "Qualité de l'eau",
  "Hydrologie",
  "Hydrogéologie",
  "Ingénierie fluviale",
  "Sciences aquacoles",
  "Suivi des barrages",
  "Approvisionnement en eau",
  "Assainissement liquide",
  "Station de pompage",
  "Luttes contre les pollutions"
];

export const RegistrationForm = ({ type, locale }: RegistrationFormProps) => {
  const [step, setStep] = useState(1);
  const isFR = locale === 'fr';

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    { id: 1, title: isFR ? 'Compte' : 'Account', icon: User },
    { id: 2, title: isFR ? 'Profil' : 'Profile', icon: MapPin },
    { id: 3, title: isFR ? 'Expertise' : 'Expertise', icon: GraduationCap },
    { id: 4, title: isFR ? 'Expérience' : 'Experience', icon: BarChart },
  ];

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-gray-50 border-b border-gray-100 p-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {step > s.id ? <CheckCircle2 size={24} /> : <s.icon size={20} />}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-blue-600" /> {isFR ? 'Prénom' : 'First Name'}
                  </label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-blue-600" /> {isFR ? 'Nom' : 'Last Name'}
                  </label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-blue-600" /> Email
                </label>
                <input type="email" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="john.doe@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Lock size={16} className="text-blue-600" /> {isFR ? 'Mot de passe' : 'Password'}
                  </label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Lock size={16} className="text-blue-600" /> {isFR ? 'Confirmer' : 'Confirm'}
                  </label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{isFR ? 'Sexe' : 'Gender'}</label>
                  <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 appearance-none">
                    <option value="male">{isFR ? 'Homme' : 'Male'}</option>
                    <option value="female">{isFR ? 'Femme' : 'Female'}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{isFR ? 'Tranche d\'âge' : 'Age Range'}</label>
                  <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 appearance-none">
                    <option>25-35</option>
                    <option>35-45</option>
                    <option>45-55</option>
                    <option>55+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Phone size={16} className="text-blue-600" /> {isFR ? 'Téléphone' : 'Phone'}
                  </label>
                  <input type="tel" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="+237 ..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" /> {isFR ? 'Ville de résidence' : 'City of residence'}
                  </label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder={type === 'resident' ? 'Yaoundé' : 'Paris'} />
                </div>
              </div>

              {type === 'diaspora' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{isFR ? 'Pays de résidence' : 'Country of residence'}</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="France" />
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-600" /> {isFR ? 'Profession actuelle' : 'Current Profession'}
                </label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Ingénieur des Eaux" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-600" /> {isFR ? 'Dernier Diplôme' : 'Latest Degree'}
                  </label>
                  <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 appearance-none">
                    <option>Doctorat / PhD</option>
                    <option>Master / Ingénieur</option>
                    <option>Licence</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{isFR ? 'Université / Institution' : 'University / Institution'}</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isFR ? 'Domaines d\'expertise' : 'Expertise Domains'}</label>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-2xl">
                  {EXPERTISE_DOMAINS.map(domain => (
                    <label key={domain} className="flex items-center gap-2 text-xs font-medium cursor-pointer hover:text-blue-600 transition-colors">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                      {domain}
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">
                {isFR ? 'Années d\'expérience par secteur' : 'Years of experience by sector'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'research', label: isFR ? 'Recherche' : 'Research' },
                  { id: 'management', label: isFR ? 'Management' : 'Management' },
                  { id: 'teaching', label: isFR ? 'Enseignement' : 'Teaching' },
                  { id: 'works', label: isFR ? 'Travaux' : 'Works' },
                  { id: 'supply', label: isFR ? 'Approvisionnement' : 'Supply' },
                  { id: 'sanitation', label: isFR ? 'Assainissement' : 'Sanitation' },
                ].map(sector => (
                  <div key={sector.id} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{sector.label}</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" 
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
                <CheckCircle2 size={18} className="text-green-500" />
                <p>{isFR ? 'En vous inscrivant, vous acceptez nos conditions d\'utilisation et notre politique de confidentialité.' : 'By registering, you accept our terms of use and privacy policy.'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between">
          <button 
            onClick={prevStep}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={20} />
            {isFR ? 'Précédent' : 'Previous'}
          </button>
          
          {step < 4 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              {isFR ? 'Suivant' : 'Next'}
              <ChevronRight size={20} />
            </button>
          ) : (
            <button className="flex items-center gap-2 bg-green-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
              {isFR ? 'Terminer l\'inscription' : 'Finish Registration'}
              <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
