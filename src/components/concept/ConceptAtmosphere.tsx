import React from 'react';
import Image from 'next/image';

interface ConceptAtmosphereProps {
  imageSrc?: string | null;
  className?: string;
}

/**
 * ConceptAtmosphere
 * 
 * Renders the left & center mirrored background artwork with 35mm analog film grain overlay.
 * Completely isolated from text and shadows.
 */
export function ConceptAtmosphere({
  imageSrc = '/images/this one.webp',
  className = '',
}: ConceptAtmosphereProps) {
  if (!imageSrc) return null;

  return (
    <div className={`absolute left-0 top-0 bottom-0 w-full pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Two side-by-side images anchored at bottom-left, expanding towards upper-right */}
      <div className="flex h-full w-auto scale-[1.14] origin-bottom-left">
        {/* 1. Original Image */}
        <div className="relative h-full aspect-[3000/4496] shrink-0">
          <Image
            src={imageSrc}
            alt="Michelangelo David marble collage background"
            fill
            className="object-contain object-bottom-left filter contrast-135 brightness-100 saturate-110"
            sizes="75vh"
            priority
          />
        </div>

        {/* 2. Mirrored Copy to the Right (100% Seamless Reflection) */}
        <div className="relative h-full aspect-[3000/4496] shrink-0 scale-x-[-1] -ml-[1px]">
          <Image
            src={imageSrc}
            alt="Mirrored background reflection"
            fill
            className="object-contain object-bottom-left filter contrast-135 brightness-100 saturate-110"
            sizes="75vh"
            priority
          />
        </div>
      </div>

      {/* Fine 35mm Analog Film Grain Texture Overlay Across Both */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}
