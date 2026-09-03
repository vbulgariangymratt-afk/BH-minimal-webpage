import React, { forwardRef } from 'react';
import { PROBLEM_BACKGROUND_IMAGES } from '@/data/problems';

interface ProblemsBackgroundProps {
  className?: string;
}

/**
 * ProblemsBackground
 * 
 * Layer 0: Background Parallax Image Carousel (78vh scale).
 * Accepts a forwarded ref for direct 60/120Hz GPU transform updates via RAF.
 */
export const ProblemsBackground = forwardRef<HTMLDivElement, ProblemsBackgroundProps>(
  function ProblemsBackground({ className = '' }, ref) {
    return (
      <div className={`absolute inset-0 w-full h-full flex items-center overflow-visible pointer-events-none -z-10 select-none ${className}`}>
        <div
          ref={ref}
          className="flex items-center gap-14 sm:gap-24 pl-8 will-change-transform opacity-75"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {PROBLEM_BACKGROUND_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="relative h-[72vh] max-h-[640px] min-h-[420px] shrink-0 rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-black/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Background Artifact ${idx + 1}`}
                className="h-full w-auto object-cover max-w-none filter contrast-110 brightness-105"
                loading="lazy"
                onError={(e) => {
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) parent.style.display = 'none';
                }}
              />
              {/* Deep Obsidian Edge Vignette Blends */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/40 via-transparent to-[#040406]/40" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
