'use client';

import { useRef, useEffect, useState } from 'react';
import { KINETIC_PROBLEMS, PROBLEMS_SECTION_TITLE, COPYCAT_NOTE, PROBLEM_BACKGROUND_IMAGES } from '@/data/problems';

export function Problems() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (sectionRef.current && trackRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrolled = -rect.top;
        const scrollableDistance = sectionHeight - windowHeight;

        if (scrollableDistance > 0) {
          const rawProgress = scrolled / scrollableDistance;
          const clampedProgress = Math.max(0, Math.min(1, rawProgress));

          // Fresh 60/120Hz foreground text track transform
          trackRef.current.style.transform = `translate3d(-${clampedProgress * 72}%, 0, 0)`;

          // Fresh 60/120Hz background image carousel parallax transform
          if (bgTrackRef.current) {
            bgTrackRef.current.style.transform = `translate3d(-${clampedProgress * 38}%, 0, 0)`;
          }

          // Direct DOM update for the progress bar fill line
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${clampedProgress})`;
          }

          // Only trigger React re-render when progress has meaningfully changed (> 0.001)
          if (Math.abs(clampedProgress - lastProgressRef.current) > 0.001) {
            lastProgressRef.current = clampedProgress;
            setScrollProgress(clampedProgress);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[380vh] bg-transparent"
      id="problems"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 sm:px-10 md:px-14">
        
        {/* Section Header Row (Note on Left, Title on Right) */}
        <div className="z-10 w-full flex items-start justify-between gap-8 pr-16 sm:pr-24 md:pr-36 select-none">
          {/* Left: Subtle Secondary Copycat Note */}
          <div className="max-w-xs md:max-w-sm pt-1">
            <p className="text-xs text-zinc-500 italic leading-relaxed">
              * {COPYCAT_NOTE}
            </p>
          </div>

          {/* Right: Section Title */}
          <div className="max-w-md sm:max-w-lg md:max-w-xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.2]">
              {PROBLEMS_SECTION_TITLE}
            </h2>
          </div>
        </div>

        {/* Horizontal Staggered Pathway Track */}
        <div className="relative flex-1 w-full flex items-center overflow-visible my-auto">
          
          {/* Layer 0: Background Parallax Image Carousel (Monolithic 78vh scale) */}
          <div className="absolute inset-0 w-full h-full flex items-center overflow-visible pointer-events-none -z-10 select-none">
            <div
              ref={bgTrackRef}
              className="flex items-center gap-14 sm:gap-24 pl-8 will-change-transform opacity-75"
              style={{
                transform: `translate3d(-${scrollProgress * 38}%, 0, 0)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              {PROBLEM_BACKGROUND_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-[78vh] max-h-[720px] min-h-[460px] shrink-0 rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-black/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Background Artifact ${idx + 1}`}
                    className="h-full w-auto object-cover max-w-none filter contrast-110 brightness-105"
                    loading="eager"
                    onError={(e) => {
                      // Gracefully hide missing images if user hasn't downloaded all yet
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

          {/* Layer 1: Foreground Text Track with Connected Spline */}
          <div
            ref={trackRef}
            className="relative flex items-center select-none z-10"
            style={{
              transform: `translate3d(-${scrollProgress * 72}%, 0, 0)`,
              width: '4200px',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* SVG Connecting Flowing Curved Spline Across 5 Nodes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible"
              viewBox="0 0 4200 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Red Ambient Glow Pathway */}
              <path
                d="M 100 120 C 400 120, 600 380, 900 380 C 1200 380, 1450 120, 1750 120 C 2050 120, 2300 380, 2600 380 C 2900 380, 3150 120, 3450 120 C 3750 120, 3950 250, 4150 250"
                stroke="#ef4444"
                strokeWidth="6"
                strokeOpacity="0.15"
                strokeLinecap="round"
                className="filter blur-[4px]"
              />

              {/* Crisp Red Connecting Thread */}
              <path
                d="M 100 120 C 400 120, 600 380, 900 380 C 1200 380, 1450 120, 1750 120 C 2050 120, 2300 380, 2600 380 C 2900 380, 3150 120, 3450 120 C 3750 120, 3950 250, 4150 250"
                stroke="url(#red-glow-gradient)"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.6"
              />

              {/* Anchoring Glowing Dots */}
              <circle cx="100" cy="120" r="5" fill="#ef4444" className="animate-ping opacity-75" />
              <circle cx="100" cy="120" r="4" fill="#ffffff" />

              <circle cx="900" cy="380" r="5" fill="#ef4444" className="animate-ping opacity-75" />
              <circle cx="900" cy="380" r="4" fill="#ffffff" />

              <circle cx="1750" cy="120" r="5" fill="#ef4444" className="animate-ping opacity-75" />
              <circle cx="1750" cy="120" r="4" fill="#ffffff" />

              <circle cx="2600" cy="380" r="5" fill="#ef4444" className="animate-ping opacity-75" />
              <circle cx="2600" cy="380" r="4" fill="#ffffff" />

              <circle cx="3450" cy="120" r="5" fill="#ef4444" className="animate-ping opacity-75" />
              <circle cx="3450" cy="120" r="4" fill="#ffffff" />

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
        </div>

        {/* Bottom Progress Bar Container (Extended close to right sidebar) */}
        <div className="z-10 w-full max-w-[82%] md:max-w-[calc(100%-160px)] flex flex-col gap-3 select-none">
          {/* Progress Track & Animated Fill Line */}
          <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-red-500 via-white to-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.85)]"
              style={{
                transform: `scaleX(${scrollProgress})`,
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Indicator Info Row */}
          <div className="flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <span className="tracking-wide text-zinc-200 uppercase text-[11px] font-medium">Scroll to travel the loop</span>
            </div>
            <span className="font-mono text-white font-semibold tracking-wider text-[13px] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
