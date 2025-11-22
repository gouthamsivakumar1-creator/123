import React, { RefObject } from 'react';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface BooksSectionProps {
  booksRef: RefObject<HTMLDivElement | null>;
  isBooksVisible: boolean;
}

export default function BooksSection({ booksRef, isBooksVisible }: BooksSectionProps) {
  const { books } = portfolioContent;

  return (
    <section id="books" ref={booksRef} className="py-36 px-6 bg-black/50 dark:bg-black/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <SectionHeading isVisible={isBooksVisible}>{books.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-16">
          {/* GET A LIFE Book */}
          <div className={`max-w-4xl mx-auto ${isBooksVisible ? 'animate-list-item' : 'opacity-0'}`} style={{ animationDelay: isBooksVisible ? '0.1s' : '0s' }}>
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20">
              <div className="mb-6">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-4xl font-bold text-white mb-3">{books.getALife.title}</h3>
                <p className="text-xl text-amber-400 font-semibold mb-4">{books.getALife.subtitle}</p>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                {books.getALife.description}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                {books.getALife.content}
              </p>
              <p className="text-lg text-amber-300 font-medium italic">
                {books.getALife.note}
              </p>
            </div>
          </div>

          {/* HISTORY & MYSTERY OF KERALA Book */}
          <div className={`max-w-4xl mx-auto ${isBooksVisible ? 'animate-list-item' : 'opacity-0'}`} style={{ animationDelay: isBooksVisible ? '0.3s' : '0s' }}>
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20">
              <div className="mb-6">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-4xl font-bold text-white">{books.keralaHistory.title}</h3>
                  <span className="px-4 py-1 bg-amber-600/20 border border-amber-600/40 rounded-full text-sm font-bold text-amber-400">
                    {books.keralaHistory.status}
                  </span>
                </div>
                <p className="text-xl text-amber-400 font-semibold mb-4">{books.keralaHistory.subtitle}</p>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {books.keralaHistory.description}
              </p>
              <div>
                <p className="text-lg text-slate-300 font-semibold mb-4">This work blends:</p>
                <div className="flex flex-wrap gap-3">
                  {books.keralaHistory.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-slate-300 hover:border-amber-600/60 hover:text-amber-400 transition-all duration-300"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* WRITING STYLE */}
          <div className={`max-w-4xl mx-auto ${isBooksVisible ? 'animate-list-item' : 'opacity-0'}`} style={{ animationDelay: isBooksVisible ? '0.5s' : '0s' }}>
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20">
              <div className="mb-6">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-4xl font-bold text-white mb-4">{books.writingStyle.title}</h3>
                <p className="text-xl text-slate-300 leading-relaxed mb-4">
                  {books.writingStyle.description}
                </p>
              </div>
              <ul className="space-y-3">
                {books.writingStyle.points.map((point, index) => (
                  <li key={index} className="flex items-start text-lg text-slate-300">
                    <span className="text-amber-600 mr-3 font-bold text-xl">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


