'use client';

import React, { useRef, useEffect } from 'react';
import { PROBLEMS_SECTION_TITLE } from '@/data/problems';
import { ProblemsBackground } from './ProblemsBackground';
import { ProblemsSplineTrack } from './ProblemsSplineTrack';
import { ProblemsProgressBar } from './ProblemsProgressBar';

/**
 * ProblemsDesktop
 * 
 * Desktop-only horizontal scrolling implementation.
 * Orchestrates the 60/120Hz requestAnimationFrame + lerp smoothing loop
 * for the 4200px horizontal spline track, background image carousel,
 * and progress bar across the sticky 380vh scroll distance.
 * 
 * Mounts ONLY on desktop viewports (>= 1024px).
 */
export function ProblemsDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedPercent = -1;

    const computeTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance over which the sticky horizontal scroll is completed
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance > 0) {
        const rawProgress = -rect.top / totalScrollableDistance;
        targetProgress = Math.max(0, Math.min(1, rawProgress));
      } else {
        targetProgress = 0;
      }
    };

    const tick = () => {
      // Smooth lerp smoothing to eliminate any micro-stutter
      currentProgress += (targetProgress - currentProgress) * 0.18;

      // 1. Foreground spline + problem statements track transform (covers all 5 cards)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${(currentProgress * 74).toFixed(3)}%, 0, 0)`;
      }

      // 2. Background image carousel parallax transform
      if (bgTrackRef.current) {
        bgTrackRef.current.style.transform = `translate3d(-${(currentProgress * 42).toFixed(3)}%, 0, 0)`;
      }

      // 3. Progress bar fill line transform
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress.toFixed(4)})`;
      }

      // 4. Percentage label direct DOM text update (Zero React re-render)
      const currentPercent = Math.round(currentProgress * 100);
      if (currentPercent !== lastRenderedPercent && percentTextRef.current) {
        lastRenderedPercent = currentPercent;
        percentTextRef.current.textContent = `${currentPercent}%`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const handleScroll = () => computeTarget();

    computeTarget();
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full h-[380vh] bg-[#040406] border-t border-white/[0.04] shadow-[0_-20px_45px_rgba(0,0,0,0.45)]"
      id="problems"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-7 sm:pt-9 pb-8 sm:pb-10 px-6 sm:px-10 md:px-14">
        
        {/* Section Header Row */}
        <div className="z-10 w-full flex items-start justify-end pr-16 sm:pr-24 md:pr-36 select-none -translate-y-1 sm:-translate-y-2">
          {/* Right: Section Title */}
          <div className="max-w-md sm:max-w-lg md:max-w-xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.2]">
              {PROBLEMS_SECTION_TITLE}
            </h2>
          </div>
        </div>

        {/* Horizontal Staggered Pathway Track */}
        <div className="relative flex-1 w-full flex items-center overflow-visible my-auto">
          {/* Layer 0: Background Parallax Image Carousel */}
          <ProblemsBackground ref={bgTrackRef} />

          {/* Layer 1: Foreground Text Track with Connected Spline */}
          <ProblemsSplineTrack ref={trackRef} />
        </div>

        {/* Bottom Progress Bar */}
        <ProblemsProgressBar
          barRef={progressBarRef}
          percentTextRef={percentTextRef}
        />

      </div>
    </section>
  );
}
