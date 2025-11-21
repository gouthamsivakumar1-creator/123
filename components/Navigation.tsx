import React from 'react';
import Icon from './Icon';
import { portfolioContent } from '@/content/portfolioContent';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-800 dark:border-slate-800 transition-all duration-500 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold text-white hover:text-amber-600 transition-colors">
          {portfolioContent.navigation.brand}
        </a>
        <div className="flex gap-8 items-center">
          <a 
            href="#about" 
            className={`transition-colors font-bold text-lg tracking-wide ${
              activeSection === 'about' ? 'text-sky-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.about}
          </a>
          <a 
            href="#projects" 
            className={`transition-colors font-medium text-lg tracking-wide ${
              activeSection === 'projects' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.projects}
          </a>
          <a 
            href="#services" 
            className={`transition-colors font-medium text-lg tracking-wide ${
              activeSection === 'services' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.services}
          </a>
          <a 
            href="#books" 
            className={`transition-colors font-medium text-lg tracking-wide ${
              activeSection === 'books' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.books}
          </a>
          <a 
            href="#contact" 
            className={`transition-colors font-medium text-lg tracking-wide ${
              activeSection === 'contact' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.contact}
          </a>
          <div className="flex items-center gap-3 ml-6 pl-6 border-l border-slate-700">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Icon src="/assets/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@RAVISANTH"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="YouTube - RAVISANTH"
            >
              <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@Hisorherstories"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="YouTube - Hisorherstories"
            >
              <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
            </a>
            <a
              href="mailto:info@ravisanth.com"
              className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Icon src="/assets/icons/email.svg" alt="Email" width={24} height={24} className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}


