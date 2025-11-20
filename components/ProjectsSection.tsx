import React, { RefObject } from 'react';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface ProjectsSectionProps {
  projectsRef: RefObject<HTMLDivElement | null>;
  isCarouselVisible: boolean;
  currentProject: number;
  setCurrentProject: (project: number | ((prev: number) => number)) => void;
}

export default function ProjectsSection({ 
  projectsRef, 
  isCarouselVisible, 
  currentProject, 
  setCurrentProject 
}: ProjectsSectionProps) {
  const { projects } = portfolioContent;

  return (
    <section id="projects" ref={projectsRef} className="py-32 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <SectionHeading isVisible={isCarouselVisible}>{projects.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          <p className="text-slate-400 mt-6 text-lg">{projects.subtitle}</p>
        </div>
        
        <div 
          className={`relative transition-all duration-1000 ease-out ${
            isCarouselVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-700/60 p-12 md:p-16 min-h-[550px] flex flex-col justify-between transition-all duration-700 shadow-2xl shadow-black/70 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-start justify-between mb-8">
              <div>
                <span className="inline-block px-5 py-2.5 bg-amber-600/20 border border-amber-600/40 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
                  Project {currentProject + 1} of {projects.items.length}
                </span>
              </div>
              <a 
                href="#about" 
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group/link"
              >
                <svg className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{projects.backLink}</span>
              </a>
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden">
              <div 
                key={currentProject}
                className="animate-slide-up"
              >
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight pr-20 pl-20">
                  {projects.items[currentProject].title}
                </h3>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl pr-20 pl-20">
                  {projects.items[currentProject].description}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentProject((prev) => (prev === 0 ? projects.items.length - 1 : prev - 1))}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-slate-900/95 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-amber-600 shadow-xl backdrop-blur-md z-20 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            aria-label="Previous project"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentProject((prev) => (prev === projects.items.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-slate-900/95 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-amber-600 shadow-xl backdrop-blur-md z-20 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            aria-label="Next project"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-3 mt-10 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            {projects.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentProject
                    ? 'bg-amber-600 w-10 shadow-lg shadow-amber-600/50'
                    : 'bg-slate-700 w-2.5 hover:bg-slate-600 hover:w-4'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

