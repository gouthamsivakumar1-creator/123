import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: string;
  className?: string;
  animationType?: 'slide-left' | 'slide-up-scale';
}

export default function AnimatedCard({
  children,
  isVisible,
  delay = '0.1s',
  className = '',
  animationType = 'slide-left',
}: AnimatedCardProps) {
  const animationClass = animationType === 'slide-left' ? 'animate-list-item' : 'animate-slide-up-scale';

  return (
    <div
      className={`${isVisible ? animationClass : 'opacity-0'} ${className}`}
      style={{ animationDelay: isVisible ? delay : '0s' }}
    >
      {children}
    </div>
  );
}



