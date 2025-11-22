import React from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

interface ParticlesProps {
  particles: Particle[];
}

export default function Particles({ particles }: ParticlesProps) {
  return (
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
  );
}



