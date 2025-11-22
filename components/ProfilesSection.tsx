import React, { RefObject } from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { portfolioContent } from '@/content/portfolioContent';

interface ProfilesSectionProps {
  profilesRef: RefObject<HTMLDivElement | null>;
  isProfilesVisible: boolean;
}

export default function ProfilesSection({ profilesRef, isProfilesVisible }: ProfilesSectionProps) {
  const { profiles } = portfolioContent;

  return (
    <section ref={profilesRef} className="py-24 px-6 bg-black/60 dark:bg-black/60 backdrop-blur-sm border-t border-slate-800 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading isVisible={isProfilesVisible} size="h3">{profiles.title}</SectionHeading>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          <p className="text-slate-400 mt-6 text-lg">{profiles.subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://www.ravisanth.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
            aria-label="Website"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon src="/assets/icons/globe.svg" alt="Website" width={28} height={28} className="w-7 h-7 relative z-10" />
          </a>
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
            aria-label="LinkedIn"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon src="/assets/icons/linkedin.svg" alt="LinkedIn" width={28} height={28} className="w-7 h-7 relative z-10" />
          </a>
          <a 
            href="https://www.youtube.com/@RAVISANTH" 
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
            aria-label="YouTube - RAVISANTH"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={28} height={28} className="w-7 h-7 relative z-10" />
          </a>
          <a
            href="https://www.youtube.com/@Hisorherstories" 
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
            aria-label="YouTube - Hisorherstories"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={28} height={28} className="w-7 h-7 relative z-10" />
          </a>
          <a 
            href="mailto:hello@ravisanth.com" 
            className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
            aria-label="Email"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon src="/assets/icons/email.svg" alt="Email" width={28} height={28} className="w-7 h-7 relative z-10" />
          </a>
        </div>
      </div>
    </section>
  );
}

