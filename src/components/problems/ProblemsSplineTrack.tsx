import React, { forwardRef } from 'react';
import { KINETIC_PROBLEMS } from '@/data/problems';

interface ProblemsSplineTrackProps {
  className?: string;
}

/**
 * ProblemsSplineTrack
 * 
 * Layer 1: Foreground Text Track with Connected Curved Red SVG Spline.
 * Accepts a forwarded ref for direct 60/120Hz GPU transform updates via RAF.
 */
export const ProblemsSplineTrack = forwardRef<HTMLDivElement, ProblemsSplineTrackProps>(
  function ProblemsSplineTrack({ className = '' }, ref) {
    return (
      <div
        ref={ref}
        className={`relative flex items-center select-none z-10 ${className}`}
        style={{
          width: '4200px',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SVG Connecting Flowing Curved Spline Across All 5 Problem Nodes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible"
          viewBox="0 0 4200 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soft Red Ambient Glow Pathway (Spans all 5 points) */}
          <path
            d="M 40 160 C 160 160, 230 115, 350 115 C 580 115, 840 395, 1110 395 C 1390 395, 1660 105, 1930 105 C 2190 105, 2380 385, 2620 385 C 2920 385, 3200 125, 3460 125 C 3720 125, 3920 230, 4180 230"
            stroke="#ef4444"
            strokeWidth="6"
            strokeOpacity="0.15"
            strokeLinecap="round"
            className="filter blur-[4px]"
          />

          {/* Crisp Red Connecting Thread (Spans all 5 points) */}
          <path
            d="M 40 160 C 160 160, 230 115, 350 115 C 580 115, 840 395, 1110 395 C 1390 395, 1660 105, 1930 105 C 2190 105, 2380 385, 2620 385 C 2920 385, 3200 125, 3460 125 C 3720 125, 3920 230, 4180 230"
            stroke="url(#red-glow-gradient)"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeOpacity="0.65"
          />

          {/* 5 Anchoring Glowing Pulsing Dots (Organic Offsets) */}
          {/* Point 1 (Card 1) */}
          <circle cx="350" cy="115" r="5" fill="#ef4444" className="animate-ping opacity-75" />
          <circle cx="350" cy="115" r="3.5" fill="#ffffff" />

          {/* Point 2 (Card 2) */}
          <circle cx="1110" cy="395" r="5" fill="#ef4444" className="animate-ping opacity-75" />
          <circle cx="1110" cy="395" r="3.5" fill="#ffffff" />

          {/* Point 3 (Card 3) */}
          <circle cx="1930" cy="105" r="5" fill="#ef4444" className="animate-ping opacity-75" />
          <circle cx="1930" cy="105" r="3.5" fill="#ffffff" />

          {/* Point 4 (Card 4) */}
          <circle cx="2620" cy="385" r="5" fill="#ef4444" className="animate-ping opacity-75" />
          <circle cx="2620" cy="385" r="3.5" fill="#ffffff" />

          {/* Point 5 (Card 5) */}
          <circle cx="3460" cy="125" r="5" fill="#ef4444" className="animate-ping opacity-75" />
          <circle cx="3460" cy="125" r="3.5" fill="#ffffff" />

          <defs>
            <linearGradient id="red-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f87171" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Kinetic Floating Statements at Staggered Heights */}
        {KINETIC_PROBLEMS.map((item) => {
          const isTop = item.verticalAlign === 'top';
          return (
            <div
              key={item.id}
              className="w-[750px] shrink-0 px-8 flex flex-col transition-all select-none"
              style={{
                transform: isTop ? 'translateY(-60px)' : 'translateY(70px)',
              }}
            >
              {/* Tag with Red Subtlety */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                  {item.tag}
                </span>
              </div>

              {/* Statement Text (Rock Salt Handwriting) */}
              <h3 className="font-handwriting text-xl sm:text-2xl md:text-[26px] lg:text-[28px] text-white leading-[1.65] md:leading-[1.7] max-w-xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {item.text}
              </h3>
            </div>
          );
        })}
      </div>
    );
  }
);
