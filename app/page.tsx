'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentProject, setCurrentProject] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
  }>>([]);
  const [isClient, setIsClient] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      title: "Indus Crusher — Strategic Product Portfolio",
      description: "Product strategy, plant designs, and market expansion across 40 countries.",
    },
    {
      title: "Bucket Crusher vs. Wheel Jaw Study",
      description: "Comparative study focusing on ROI, fuel, and excavator requirements.",
    },
    {
      title: "History & Mystery (Book + Documentary)",
      description: "Research and production notes on medieval Kerala, documentary plan.",
    },
  ];

  // Generate particles only on client side to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
      }))
    );
  }, []);

  // Intersection Observer for hero section scroll animation
  useEffect(() => {
    if (!isClient) return;

    let observer: IntersectionObserver | null = null;

    // Small delay to ensure ref is set
    const timer = setTimeout(() => {
      // Check if hero is already in view on initial load
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          setIsHeroVisible(true);
          return;
        }
      }

      // Otherwise, set up observer for scroll
      if (!heroRef.current) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsHeroVisible(true);
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of the element is visible
          rootMargin: '0px',
        }
      );

      const currentRef = heroRef.current;
      observer.observe(currentRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer && heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [isClient]);

  // Intersection Observer for carousel scroll animation
  useEffect(() => {
    if (!isClient || !carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCarouselVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it enters viewport
      }
    );

    const currentRef = carouselRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isClient]);

  useEffect(() => {
    // Set dark mode based on system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const html = document.documentElement;
      
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@ravisanth.com?subject=Contact from Portfolio&body=Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-black dark:bg-black relative overflow-hidden">
      {/* Collision Animation Particles - Only render on client */}
      {isClient && (
        <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-collide"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              <div 
                className="bg-amber-600/40 rounded-full blur-[1px]"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  boxShadow: `0 0 ${particle.size * 2}px rgba(251, 191, 36, 0.5)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-800 dark:border-slate-800 transition-all duration-500 shadow-lg shadow-black/50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-white hover:text-amber-600 transition-colors">Ravisanth</a>
            <div className="flex gap-8 items-center">
              <a href="#about" className="text-slate-300 hover:text-white transition-colors font-medium text-sm tracking-wide">About</a>
              <a href="#projects" className="text-slate-300 hover:text-white transition-colors font-medium text-sm tracking-wide">Projects</a>
              <a href="#services" className="text-slate-300 hover:text-white transition-colors font-medium text-sm tracking-wide">Services</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium text-sm tracking-wide">Contact</a>
              <div className="flex items-center gap-3 ml-6 pl-6 border-l border-slate-700">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-600 border border-slate-700 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Icon src="/assets/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@RAVISANTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-600 border border-slate-700 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="YouTube - RAVISANTH"
                >
                  <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={20} height={20} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@Hisorherstories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-600 border border-slate-700 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="YouTube - Hisorherstories"
                >
                  <Icon src="/assets/icons/youtube.svg" alt="YouTube" width={20} height={20} className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@ravisanth.com"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-600 border border-slate-700 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Icon src="/assets/icons/email.svg" alt="Email" width={20} height={20} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-44 pb-36 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className={`inline-block px-6 py-3 bg-gradient-to-r from-amber-600/25 to-amber-600/15 border border-amber-600/40 rounded-full text-sm font-bold text-amber-400 tracking-wider backdrop-blur-sm shadow-lg shadow-amber-600/10 transition-all duration-700 ${
                isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                Country Head — Indus Crusher
              </div>
              <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight transition-all duration-1000 ${
                isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: isHeroVisible ? '0.2s' : '0s' }}>
                I build crushing equipment businesses, write, and tell stories about{' '}
                <span className="text-amber-600 relative inline-block">
                  Kerala
                  <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent opacity-60"></span>
                </span>.
              </h1>
              <p className={`text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl transition-all duration-1000 ${
                isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: isHeroVisible ? '0.4s' : '0s' }}>
                15+ years in mining, crushing and aggregates. Worked across ~40 countries. Writer of research and travel essays; producing a documentary on Kerala's medieval history.
              </p>
              <div className={`flex flex-wrap gap-5 pt-6 transition-all duration-1000 ${
                isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: isHeroVisible ? '0.6s' : '0s' }}>
                <a
                  href="#projects"
                  className="px-12 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-600/40 hover:shadow-amber-600/60"
                >
                  See Projects
                </a>
                <a
                  href="#contact"
                  className="px-12 py-5 border-2 border-slate-600 text-white rounded-xl font-bold text-lg hover:bg-slate-800/60 hover:border-amber-600/60 transition-all duration-300 backdrop-blur-sm"
                >
                  Get in touch
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
                    India
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-400">
                    <span className="font-semibold text-slate-300 mr-2">Email:</span> 
                    <a href="mailto:info@ravisanth.com" className="text-amber-500 hover:text-amber-400 transition-colors">info@ravisanth.com</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <Image
                  src="https://media.licdn.com/dms/image/v2/D5603AQHqCHLcCfv3rQ/profile-displayphoto-scale_200_200/B56ZmHAJ3iJ8AY-/0/1758906594775?e=2147483647&v=beta&t=3FnM4qI4-GPt1D8KmtEbWF_HfMyQctj5DQchnQ5eyLU"
                  alt="Ravisanth R Pillai"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover relative z-0 group-hover:scale-105 transition-transform duration-500"
          priority
        />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-36 px-6 bg-black/50 dark:bg-black/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">About</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-24 text-center max-w-4xl mx-auto">
            I combine field engineering, product strategy and market development in crushing and mineral processing. Aside from industrial work, I research Kerala history, produce short documentaries, and create content on YouTube (RAVISANTH, Hisorherstories).
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-6">Expertise</h3>
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">VSI knowledge</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Plant design</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Aftermarket strategy</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Bucket crushers</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Screening solutions</span>
                </li>
              </ul>
            </div>
            
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-6">Research & Writing</h3>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                Authoring a book and producing a documentary on medieval Kerala — research, narration, field production.
              </p>
            </div>
            
            <div className="p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-6">Speaking & Training</h3>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                Workshops on crushing efficiency, product demos, and leadership mentoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">Selected Projects</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
            <p className="text-slate-400 mt-6 text-lg">Showcasing strategic initiatives and research</p>
          </div>
          
          {/* Carousel */}
          <div 
            ref={carouselRef}
            className={`relative transition-all duration-1000 ease-out ${
              isCarouselVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Project Card */}
            <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-700/60 p-12 md:p-16 min-h-[550px] flex flex-col justify-between transition-all duration-700 shadow-2xl shadow-black/70 relative overflow-hidden group">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top section with badge and back link */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div>
                  <span className="inline-block px-5 py-2.5 bg-amber-600/20 border border-amber-600/40 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
                    Project {currentProject + 1} of {projects.length}
                  </span>
                </div>
                <a 
                  href="#about" 
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group/link"
                >
                  <svg className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Portfolio</span>
                </a>
              </div>
              
              {/* Main content with slide animation */}
              <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden">
                <div 
                  key={currentProject}
                  className="animate-slide-up"
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight pr-20 pl-20">
                    {projects[currentProject].title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl pr-20 pl-20">
                    {projects[currentProject].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-slate-900/95 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-amber-600 shadow-xl backdrop-blur-md z-20 animate-fade-in-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              aria-label="Previous project"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-slate-900/95 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-amber-600 shadow-xl backdrop-blur-md z-20 animate-fade-in-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              aria-label="Next project"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-10 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              {projects.map((_, index) => (
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

      {/* Services Section */}
      <section id="services" className="py-36 px-6 bg-black/50 dark:bg-black/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">What I Offer</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-8">Consulting (Mining & Crushing)</h3>
              </div>
              <ul className="space-y-5 text-slate-300">
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Plant design</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Equipment selection</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">ROI analysis</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Field commissioning</span>
                </li>
              </ul>
            </div>
            
            <div className="p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-8">Content & Documentary</h3>
              </div>
              <ul className="space-y-5 text-slate-300">
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Research</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Scripting</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Production planning</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Regional history & travelogues</span>
                </li>
              </ul>
            </div>
            
            <div className="p-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/60 rounded-3xl hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-3 group">
              <div className="mb-8">
                <div className="w-14 h-1.5 bg-gradient-to-r from-amber-600 to-amber-500 mb-5"></div>
                <h3 className="text-3xl font-bold text-white mb-8">Workshops</h3>
              </div>
              <ul className="space-y-5 text-slate-300">
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Technical training</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Sales enablement</span>
                </li>
                <li className="flex items-start group-hover:text-white transition-colors">
                  <span className="text-amber-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-lg">Leadership coaching</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-36 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">Contact</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-slate-300">
              For consulting, collaborations or media enquiries — drop a message.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-4">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all text-lg"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-4">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all text-lg"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-4">Message</label>
              <textarea
                id="message"
                required
                rows={7}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-5 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 resize-none transition-all text-lg"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-600/30"
            >
              Send Message
            </button>
          </form>
          
          <p className="mt-10 text-center text-slate-400 text-lg">
            Or email directly:{' '}
            <a href="mailto:info@ravisanth.com" className="text-amber-600 hover:text-amber-500 hover:underline font-bold transition-colors">
              info@ravisanth.com
            </a>
          </p>
        </div>
      </section>

      {/* Profiles & Links */}
      <section className="py-24 px-6 bg-black/60 dark:bg-black/60 backdrop-blur-sm border-t border-slate-800 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-white mb-6 tracking-tight">Profiles & Links</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
            <p className="text-slate-400 mt-6 text-lg">Connect with me across platforms</p>
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
              href="mailto:info@ravisanth.com" 
              className="group w-16 h-16 rounded-xl bg-slate-900/80 border border-slate-700 hover:bg-amber-600 hover:border-amber-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden"
              aria-label="Email"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Icon src="/assets/icons/email.svg" alt="Email" width={28} height={28} className="w-7 h-7 relative z-10" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-24 px-6 bg-black/40 dark:bg-black/40 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-white mb-6 tracking-tight">Quick Facts</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl hover:border-amber-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 hover:-translate-y-2 group">
              <div className="text-6xl font-bold text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-slate-300 text-xl group-hover:text-white transition-colors">Years — Mining & Crusher industry</div>
            </div>
            <div className="text-center p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl hover:border-amber-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 hover:-translate-y-2 group">
              <div className="text-6xl font-bold text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">40</div>
              <div className="text-slate-300 text-xl group-hover:text-white transition-colors">Countries — field experience</div>
            </div>
            <div className="text-center p-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl hover:border-amber-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/10 hover:-translate-y-2 group">
              <div className="text-6xl font-bold text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">∞</div>
              <div className="text-slate-300 text-xl group-hover:text-white transition-colors">Author & documentary creator (in progress)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900/90 dark:bg-black/90 backdrop-blur-sm text-slate-400 text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <p className="mb-2">© Ravisanth R Pillai</p>
          <p className="text-sm">Engineer | Entrepreneur | Writer | Life Coach</p>
          <div className="mt-4 space-x-4 text-sm text-slate-400">
            <span>+91 9605673444</span>
            <span>|</span>
            <span>hello@ravisanth.com</span>
            <span>|</span>
            <span>www.ravisanth.com</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
