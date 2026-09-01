import React from 'react';
import Image from 'next/image';

interface ConceptMedusaProps {
  className?: string;
}

/**
 * ConceptMedusa
 * 
 * Renders the top-right cracked Medusa marble sculpture (Broken.webp) with a thick,
 * luscious black shadow wrapped along her left and bottom perimeter so she emerges
 * naturally from the pitch-black void.
 */
export function ConceptMedusa({ className = '' }: ConceptMedusaProps) {
  return (
    <div
      className={`absolute right-0 top-0 pointer-events-none select-none w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-[2/3] max-h-[82vh] ${className}`}
    >
      <Image
        src="/images/Broken.webp"
        alt="Broken Medusa marble sculpture"
        fill
        className="object-cover object-top-right"
        sizes="(max-width: 768px) 280px, 520px"
        priority
      />

      {/* Shared 35mm Analog Film Grain */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

    </div>
  );
}
