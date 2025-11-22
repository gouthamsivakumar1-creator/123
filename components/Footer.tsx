import React from 'react';
import { portfolioContent } from '@/content/portfolioContent';

export default function Footer() {
  const { footer } = portfolioContent;

  return (
    <footer className="py-8 px-6 bg-slate-900/90 dark:bg-black/90 backdrop-blur-sm text-slate-400 text-center relative z-10">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2">{footer.copyright}</p>
        <p className="text-sm mb-2">{footer.tagline}</p>
        {footer.vision && (
          <p className="text-sm text-slate-500 italic mb-4 max-w-3xl mx-auto">{footer.vision}</p>
        )}
        {footer.consultancy && (
          <p className="text-sm text-amber-400 mb-4">{footer.consultancy}</p>
        )}
        <div className="mt-4 space-x-4 text-sm text-slate-400">
          <span>{footer.contact.phone}</span>
          <span>|</span>
          <a href={`mailto:${footer.contact.email}`} className="text-amber-500 hover:text-amber-400 transition-colors">
            {footer.contact.email}
          </a>
          <span>|</span>
          <span>{footer.contact.website}</span>
        </div>
      </div>
    </footer>
  );
}



