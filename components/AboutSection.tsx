import React, { RefObject } from 'react';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface AboutSectionProps {
  aboutRef: RefObject<HTMLDivElement | null>;
  isAboutVisible: boolean;
}

export default function AboutSection({ aboutRef, isAboutVisible }: AboutSectionProps) {
  const { about } = portfolioContent;

  return (
    <section id="about" ref={aboutRef} className="py-36 px-6 bg-black/50 dark:bg-black/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <SectionHeading isVisible={isAboutVisible}>{about.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-24 text-center max-w-4xl mx-auto">
          {about.description}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isAboutVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isAboutVisible ? '0.1s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-6">{about.cards.expertise.title}</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              {about.cards.expertise.items.map((item, index) => (
                <li key={index} className={`flex items-start group-hover:text-white transition-colors ${isAboutVisible ? 'animate-list-item' : 'opacity-0'}`} style={{ animationDelay: isAboutVisible ? `${(index + 1) * 0.1}s` : '0s' }}>
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isAboutVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isAboutVisible ? '0.3s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-6">{about.cards.research.title}</h3>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
              {about.cards.research.description}
            </p>
          </div>
          
          <div className={`p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group ${
            isAboutVisible ? 'animate-list-item' : 'opacity-0'
          }`} style={{ animationDelay: isAboutVisible ? '0.5s' : '0s' }}>
            <div className="mb-8">
              <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
              <h3 className="text-3xl font-bold text-white mb-6">{about.cards.speaking.title}</h3>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
              {about.cards.speaking.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

