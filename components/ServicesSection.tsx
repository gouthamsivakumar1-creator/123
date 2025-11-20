import React, { RefObject } from 'react';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface ServicesSectionProps {
  servicesRef: RefObject<HTMLDivElement | null>;
  isServicesVisible: boolean;
}

export default function ServicesSection({ servicesRef, isServicesVisible }: ServicesSectionProps) {
  const { services } = portfolioContent;

  return (
    <section id="services" ref={servicesRef} className="py-36 px-6 bg-black/50 dark:bg-black/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <SectionHeading isVisible={isServicesVisible}>{services.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isServicesVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isServicesVisible ? '0.1s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-8">{services.cards.consulting.title}</h3>
            </div>
            <ul className="space-y-5 text-slate-300">
              {services.cards.consulting.items.map((item, index) => (
                <li key={index} className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isServicesVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isServicesVisible ? '0.3s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-8">{services.cards.content.title}</h3>
            </div>
            <ul className="space-y-5 text-slate-300">
              {services.cards.content.items.map((item, index) => (
                <li key={index} className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isServicesVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isServicesVisible ? '0.5s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-8">{services.cards.workshops.title}</h3>
            </div>
            <ul className="space-y-5 text-slate-300">
              {services.cards.workshops.items.map((item, index) => (
                <li key={index} className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

