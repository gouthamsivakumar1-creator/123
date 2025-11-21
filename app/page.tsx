'use client';

import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/components/useIntersectionObserver';
import { portfolioContent } from '@/content/portfolioContent';
import Navigation from '@/components/Navigation';
import Particles from '@/components/Particles';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import BooksSection from '@/components/BooksSection';
import ContactSection from '@/components/ContactSection';
import ProfilesSection from '@/components/ProfilesSection';
import QuickFactsSection from '@/components/QuickFactsSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentProject, setCurrentProject] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
  }>>([]);
  const [isClient, setIsClient] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  
  // Use reusable intersection observer hook
  const [aboutRef, isAboutVisible] = useIntersectionObserver();
  const [projectsRef, isCarouselVisible] = useIntersectionObserver();
  const [servicesRef, isServicesVisible] = useIntersectionObserver();
  const [booksRef, isBooksVisible] = useIntersectionObserver();
  const [contactRef, isContactVisible] = useIntersectionObserver();
  const [profilesRef, isProfilesVisible] = useIntersectionObserver();
  const [quickFactsRef, isQuickFactsVisible] = useIntersectionObserver();
  const [activeSection, setActiveSection] = useState<string>('');
  
  const { hero } = portfolioContent;

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



  // Intersection Observer for active navigation section
  useEffect(() => {
    if (!isClient) return;

    const sections = [
      { id: 'about', ref: aboutRef as React.RefObject<HTMLDivElement> },
      { id: 'projects', ref: projectsRef as React.RefObject<HTMLDivElement> },
      { id: 'services', ref: servicesRef as React.RefObject<HTMLDivElement> },
      { id: 'books', ref: booksRef as React.RefObject<HTMLDivElement> },
      { id: 'contact', ref: contactRef as React.RefObject<HTMLDivElement> },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeId = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = entry.target.getAttribute('id') || '';
          }
        });
        
        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    // Also listen to hash changes for immediate feedback
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['about', 'projects', 'services', 'books', 'contact'].includes(hash)) {
        setActiveSection(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash
    handleHashChange();

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      window.removeEventListener('hashchange', handleHashChange);
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
    // Sanitize and encode form data to prevent XSS attacks
    const sanitizeInput = (input: string): string => {
      return input.trim().replace(/[<>]/g, ''); // Remove potential HTML tags
    };
    
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);
    
    // Properly encode all values for mailto URL
    const subject = encodeURIComponent(portfolioContent.contact.emailSubject);
    const body = encodeURIComponent(
      `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage: ${sanitizedMessage}`
    );
    
    const mailtoLink = `mailto:${hero.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success toast
    setShowToast(true);
    
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black dark:bg-black relative overflow-hidden">
      {/* Collision Animation Particles - Only render on client */}
      {isClient && <Particles particles={particles} />}

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <Navigation activeSection={activeSection} />
        
        {/* Toast Notification */}
        <Toast 
          message="Message sent successfully! Your email client should open shortly." 
          isVisible={showToast} 
          onClose={() => setShowToast(false)}
        />

        <HeroSection heroRef={heroRef} isHeroVisible={isHeroVisible} />
        <AboutSection aboutRef={aboutRef} isAboutVisible={isAboutVisible} />
        <ProjectsSection 
          projectsRef={projectsRef} 
          isCarouselVisible={isCarouselVisible} 
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
        <ServicesSection servicesRef={servicesRef} isServicesVisible={isServicesVisible} />
        <BooksSection booksRef={booksRef} isBooksVisible={isBooksVisible} />
        <ContactSection 
          contactRef={contactRef} 
          isContactVisible={isContactVisible}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
        <ProfilesSection profilesRef={profilesRef} isProfilesVisible={isProfilesVisible} />
        <QuickFactsSection quickFactsRef={quickFactsRef} isQuickFactsVisible={isQuickFactsVisible} />
        <Footer />
      </div>
    </div>
  );
}
