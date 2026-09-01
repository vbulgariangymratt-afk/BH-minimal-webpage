import React from 'react';

interface ConceptShadowProps {
  className?: string;
}

/**
 * ConceptShadow
 * 
 * Dedicated atmospheric shadow component for the MONEEEEY (ConceptualStatement) section.
 * Renders a 100% continuous, ultra-soft gradual gradient shadow along the convex arc.
 * ZERO hard vector edges or sharp boundaries anywhere.
 */
export function ConceptShadow({ className = '' }: ConceptShadowProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      {/* 1. Center / Bottom Transition Shadow (Stretched downwards to fully cover bottom edge) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '65.7%',
          top: '68.5%',
          width: '43.5%',
          height: '60%',
          backgroundColor: '#000000',
          filter: 'blur(60px)',
          opacity: 1,
          borderRadius: '30%',
        }}
      />

      {/* 2. Medusa Corner Shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '54.6%',
          top: '-11.4%',
          width: '20%',
          height: '116.1%',
          backgroundColor: '#000000',
          filter: 'blur(40px)',
          opacity: 1,
          borderRadius: '0%',
        }}
      />

      {/* 3. Right-Side Bottom Transition Shadow (Starts at 65.7%, strictly matching existing shadow boundary) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '65.7%',
          bottom: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, #000000 60%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}
