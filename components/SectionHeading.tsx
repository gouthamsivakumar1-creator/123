import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  size?: 'h2' | 'h3';
}

export default function SectionHeading({
  children,
  isVisible,
  className = '',
  size = 'h2',
}: SectionHeadingProps) {
  const baseClasses = `font-bold text-white mb-6 tracking-tight ${
    isVisible ? 'animate-slide-down' : 'opacity-0'
  } ${className}`;

  const sizeClasses = size === 'h2' ? 'text-6xl' : 'text-5xl';

  if (size === 'h2') {
    return (
      <h2 className={`${sizeClasses} ${baseClasses}`} style={{ animationDelay: isVisible ? '0s' : '0s' }}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={`${sizeClasses} ${baseClasses}`} style={{ animationDelay: isVisible ? '0s' : '0s' }}>
      {children}
    </h3>
  );
}



