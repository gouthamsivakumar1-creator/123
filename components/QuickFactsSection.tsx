import React, { RefObject } from 'react';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface QuickFactsSectionProps {
  quickFactsRef: RefObject<HTMLDivElement | null>;
  isQuickFactsVisible: boolean;
}

export default function QuickFactsSection({ quickFactsRef, isQuickFactsVisible }: QuickFactsSectionProps) {
  const { quickFacts } = portfolioContent;

  return (
    <section ref={quickFactsRef} className="py-24 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading isVisible={isQuickFactsVisible} size="h3">{quickFacts.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {quickFacts.items.map((fact, index) => (
            <div key={index} className={`text-center p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl hover:border-amber-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 hover:-translate-y-2 group ${
              isQuickFactsVisible ? 'animate-list-item' : 'opacity-0'
            }`} style={{ animationDelay: isQuickFactsVisible ? `${(index + 1) * 0.2 - 0.1}s` : '0s' }}>
              <div className="text-6xl font-bold text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">{fact.number}</div>
              <div className="text-slate-300 text-xl group-hover:text-white transition-colors">{fact.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

