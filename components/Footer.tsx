import React from 'react';
import { portfolioContent } from '@/content/portfolioContent';

export default function Footer() {
  const { footer } = portfolioContent;

  return (
    <footer className="py-8 px-6 bg-slate-900/90 dark:bg-black/90 backdrop-blur-sm text-slate-400 text-center relative z-10">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2">{footer.copyright}</p>
        <p className="text-sm">{footer.tagline}</p>
        <div className="mt-4 space-x-4 text-sm text-slate-400">
          <span>{footer.contact.phone}</span>
          <span>|</span>
          <span>{footer.contact.email}</span>
          <span>|</span>
          <span>{footer.contact.website}</span>
        </div>
      </div>
    </footer>
  );
}


