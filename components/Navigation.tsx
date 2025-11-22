'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import { portfolioContent } from '@/content/portfolioContent';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-800 dark:border-slate-800 transition-all duration-500 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
        <a href="#" className="text-2xl sm:text-3xl font-bold text-white hover:text-amber-600 transition-colors">
          {portfolioContent.navigation.brand}
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          <a 
            href="#about" 
            className={`transition-colors font-bold text-base xl:text-lg tracking-wide ${
              activeSection === 'about' ? 'text-sky-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.about}
          </a>
          <a 
            href="#projects" 
            className={`transition-colors font-medium text-base xl:text-lg tracking-wide ${
              activeSection === 'projects' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.projects}
          </a>
          <a 
            href="#services" 
            className={`transition-colors font-medium text-base xl:text-lg tracking-wide ${
              activeSection === 'services' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.services}
          </a>
          <a 
            href="#books"
            className={`transition-colors font-medium text-base xl:text-lg tracking-wide ${
              activeSection === 'books' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.books}
          </a>
          <a 
            href="#contact" 
            className={`transition-colors font-medium text-base xl:text-lg tracking-wide ${
              activeSection === 'contact' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {portfolioContent.navigation.links.contact}
          </a>
          <div className="flex items-center gap-2 xl:gap-3 ml-4 xl:ml-6 pl-4 xl:pl-6 border-l border-slate-700">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 xl:w-9 xl:h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Icon src="/assets/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="w-5 h-5 xl:w-6 xl:h-6" />
            </a>
            <a
              href="https://www.youtube.com/@RAVISANTH"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 xl:w-9 xl:h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="YouTube - RAVISANTH"
            >
              <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-5 h-5 xl:w-6 xl:h-6" />
            </a>
            <a
              href="https://www.youtube.com/@Hisorherstories"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 xl:w-9 xl:h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="YouTube - Hisorherstories"
            >
              <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-5 h-5 xl:w-6 xl:h-6" />
            </a>
            <a
              href="mailto:hello@ravisanth.com"
              className="w-8 h-8 xl:w-9 xl:h-9 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Icon src="/assets/icons/email.svg" alt="Email" width={24} height={24} className="w-5 h-5 xl:w-6 xl:h-6" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col gap-1.5 p-2 text-slate-300 hover:text-amber-600 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-6 pt-2 bg-black/95 border-t border-slate-800">
          <div className="flex flex-col gap-4">
            <a 
              href="#about" 
              onClick={closeMenu}
              className={`transition-colors font-bold text-lg py-2 ${
                activeSection === 'about' ? 'text-sky-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {portfolioContent.navigation.links.about}
            </a>
            <a 
              href="#projects" 
              onClick={closeMenu}
              className={`transition-colors font-medium text-lg py-2 ${
                activeSection === 'projects' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {portfolioContent.navigation.links.projects}
            </a>
            <a 
              href="#services" 
              onClick={closeMenu}
              className={`transition-colors font-medium text-lg py-2 ${
                activeSection === 'services' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {portfolioContent.navigation.links.services}
            </a>
            <a 
              href="#books" 
              onClick={closeMenu}
              className={`transition-colors font-medium text-lg py-2 ${
                activeSection === 'books' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {portfolioContent.navigation.links.books}
            </a>
            <a 
              href="#contact" 
              onClick={closeMenu}
              className={`transition-colors font-medium text-lg py-2 ${
                activeSection === 'contact' ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {portfolioContent.navigation.links.contact}
            </a>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Icon src="/assets/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@RAVISANTH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300"
                aria-label="YouTube - RAVISANTH"
              >
                <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@Hisorherstories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300"
                aria-label="YouTube - Hisorherstories"
              >
                <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
              </a>
              <a
                href="mailto:hello@ravisanth.com"
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all duration-300"
                aria-label="Email"
              >
                <Icon src="/assets/icons/email.svg" alt="Email" width={24} height={24} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


