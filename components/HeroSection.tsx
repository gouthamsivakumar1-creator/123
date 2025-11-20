import React, { RefObject } from 'react';
import Image from 'next/image';
import { portfolioContent } from '@/content/portfolioContent';

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement | null>;
  isHeroVisible: boolean;
}

export default function HeroSection({ heroRef, isHeroVisible }: HeroSectionProps) {
  const { hero } = portfolioContent;

  return (
    <section ref={heroRef} className="pt-44 pb-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className={`inline-block px-6 py-3 bg-gradient-to-r from-amber-600/25 to-amber-600/15 border border-amber-600/40 rounded-full text-sm font-bold text-amber-400 tracking-wider backdrop-blur-sm shadow-lg shadow-amber-600/10 transition-all duration-700 ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              {hero.badge}
            </div>
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isHeroVisible ? '0.2s' : '0s' }}>
              <span className={`inline-block relative ${isHeroVisible ? 'animate-list-item' : 'opacity-0'}`} style={{ animationDelay: isHeroVisible ? '0.3s' : '0s' }}>
                {hero.textPrefix}
                <span className="text-amber-600 relative inline-block">
                  {hero.textSuffix}
                  <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent opacity-60"></span>
                </span>
                .
              </span>
            </h1>
            <p className={`text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl ${
              isHeroVisible ? 'fade-in' : 'opacity-0'
            }`} style={{ animationDelay: isHeroVisible ? '0.4s' : '0s' }}>
              {hero.description}
            </p>
            <div className={`flex flex-wrap gap-5 pt-6 transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isHeroVisible ? '0.6s' : '0s' }}>
              <a
                href="#projects"
                className="px-12 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-600/40 hover:shadow-amber-600/60"
              >
                {hero.buttons.seeProjects}
              </a>
              <a
                href="#contact"
                className="px-12 py-5 border-2 border-slate-600 text-white rounded-xl font-bold text-lg hover:bg-slate-800/60 hover:border-amber-600/60 transition-all duration-300 backdrop-blur-sm"
              >
                {hero.buttons.getInTouch}
              </a>
            </div>
            <div className={`pt-12 space-y-5 text-base transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isHeroVisible ? '0.8s' : '0s' }}>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-400">
                  <span className="font-semibold text-slate-300 mr-2">Location:</span> 
                  {hero.contact.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-400">
                  <span className="font-semibold text-slate-300 mr-2">Email:</span> 
                  <a href={`mailto:${hero.contact.email}`} className="text-amber-500 hover:text-amber-400 transition-colors">
                    {hero.contact.email}
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className={`aspect-square rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 relative ${
              isHeroVisible ? 'fade-in' : 'opacity-0'
            }`} style={{ animationDelay: isHeroVisible ? '0.3s' : '0s' }}>
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQHqCHLcCfv3rQ/profile-displayphoto-scale_200_200/B56ZmHAJ3iJ8AY-/0/1758906594775?e=2147483647&v=beta&t=3FnM4qI4-GPt1D8KmtEbWF_HfMyQctj5DQchnQ5eyLU"
                alt="Ravisanth R Pillai"
                width={500}
                height={500}
                className="w-full h-full object-cover relative z-0"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

