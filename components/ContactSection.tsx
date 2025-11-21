import React, { RefObject, FormEvent } from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface ContactSectionProps {
  contactRef: RefObject<HTMLDivElement | null>;
  isContactVisible: boolean;
  formData: { name: string; email: string; message: string };
  setFormData: (data: { name: string; email: string; message: string }) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function ContactSection({ 
  contactRef, 
  isContactVisible, 
  formData, 
  setFormData, 
  handleSubmit 
}: ContactSectionProps) {
  const { contact, hero } = portfolioContent;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function
  const isValid = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    
    return (
      trimmedName.length > 0 &&
      trimmedEmail.length > 0 &&
      emailRegex.test(trimmedEmail) &&
      trimmedMessage.length > 0
    );
  };

  const isFormValid = isValid();

  return (
    <section id="contact" ref={contactRef} className="py-36 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <SectionHeading isVisible={isContactVisible}>{contact.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-slate-300">
            {contact.description}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-4">{contact.form.name.label}</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all text-lg"
              placeholder={contact.form.name.placeholder}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-4">{contact.form.email.label}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all text-lg"
              placeholder={contact.form.email.placeholder}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-4">{contact.form.message.label}</label>
            <textarea
              id="message"
              required
              rows={7}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 resize-none transition-all text-lg"
              placeholder={contact.form.message.placeholder}
            />
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full md:w-auto px-12 py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
              isFormValid
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 shadow-2xl shadow-amber-600/30 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            {contact.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

