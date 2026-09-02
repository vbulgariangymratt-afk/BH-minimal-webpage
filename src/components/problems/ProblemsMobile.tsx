'use client';

import React, { useRef, useEffect } from 'react';
import {
  KINETIC_PROBLEMS,
  PROBLEMS_SECTION_TITLE,
  PROBLEM_BACKGROUND_IMAGES,
} from '@/data/problems';

/**
 * ProblemsMobile
 * 
 * Mobile adaptation of the Brain Problems ("Fixes for u") section:
 * - Independent 2-layer vertical architecture.
 * - LAYER 0 (Background Track): Exactly 3 atmospheric images (Image 2 -> smaller gap -> Image 4 -> Image 3)
 *   forming a continuous visual backdrop moving with subtle vertical parallax (~40%).
 *   - Image 2: 1:1 Square (glitch slit-scan with neon-red light)
 *   - Image 4: ~1.09:1 Near-Square (hazy sepia scratch portrait)
 *   - Image 3: ~9:16 Portrait (bearded marble sculpture collage)
 * - LAYER 1 (Foreground Sequence): 5 problem statements in natural document flow with white handwriting
 *   typography and red monospace tags.
 * - Stacking context isolated (`isolate`, `z-0` background, `z-10` text) ensuring high visual clarity.
 */
export function ProblemsMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);

  // Subtle vertical parallax loop: translates the 3-image background track at ~40% scroll rate via direct RAF lerp
  useEffect(() => {
    let rafId: number | null = null;
    let targetY = 0;
    let currentY = 0;

    const computeTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress as the section moves across the viewport
      const totalDistance = rect.height + windowHeight;
      const scrolled = windowHeight - rect.top;

      if (totalDistance > 0) {
        const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
        // Restrained parallax travel (~36% of section height)
        const maxTravel = rect.height * 0.36;
        // Centered travel around 0.5 (midpoint of section has 0 translation)
        targetY = (progress - 0.5) * maxTravel;
      }
    };

    const tick = () => {
      currentY += (targetY - currentY) * 0.12;
      if (bgTrackRef.current) {
        bgTrackRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
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
      id="problems"
      ref={containerRef}
      className="relative z-10 w-full overflow-hidden bg-[#040406] border-t border-white/[0.04] shadow-[0_-20px_45px_rgba(0,0,0,0.45)] py-16 px-5 sm:px-8 select-none isolate"
    >
      {/* LAYER 0: Background Vertical Atmospheric Track (Images 2, 4 & 3) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <div
          ref={bgTrackRef}
          className="w-full flex flex-col items-center pt-14 pb-24 will-change-transform opacity-80"
          style={{
            transform: 'translate3d(0, 0px, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* 1. IMAGE 2: 1:1 Square (1080x1080) — Slit-scan with glowing neon-red light */}
          <div className="relative w-[88vw] max-w-[360px] aspect-square rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-black/60 self-end -mr-2 sm:mr-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROBLEM_BACKGROUND_IMAGES[1]}
              alt="Atmospheric Background 2 (Neon Glitch)"
              className="w-full h-full object-cover filter contrast-110 brightness-105"
              loading="lazy"
            />
            {/* Deep Obsidian Edge Vignette Blends matching desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/40 via-transparent to-[#040406]/40" />
          </div>

          {/* Smaller vertical gap between Image 2 and Image 4 */}
          <div className="h-16 sm:h-20 shrink-0" />

          {/* 2. IMAGE 4: ~1.09:1 Near-Square (1080x989) — Hazy sepia scratch portrait */}
          <div className="relative w-[88vw] max-w-[360px] aspect-[1.09/1] rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-black/60 self-start -ml-2 sm:ml-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROBLEM_BACKGROUND_IMAGES[3]}
              alt="Atmospheric Background 4 (Hazy Scratches)"
              className="w-full h-full object-cover filter contrast-110 brightness-105"
              loading="lazy"
            />
            {/* Deep Obsidian Edge Vignette Blends matching desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/40 via-transparent to-[#040406]/40" />
          </div>

          {/* Normal atmospheric gap between Image 4 and Image 3 */}
          <div className="h-24 sm:h-28 shrink-0" />

          {/* 3. IMAGE 3: ~9:16 Portrait (564x1002) — Bearded marble sculpture collage */}
          <div className="relative w-[84vw] max-w-[330px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-black/60 self-end -mr-2 sm:mr-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROBLEM_BACKGROUND_IMAGES[2]}
              alt="Atmospheric Background 3 (Classical Collage)"
              className="w-full h-full object-cover filter contrast-110 brightness-105"
              loading="lazy"
            />
            {/* Deep Obsidian Edge Vignette Blends matching desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/40 via-transparent to-[#040406]/40" />
          </div>
        </div>
      </div>

      {/* LAYER 1: Foreground Reading Sequence (5 Statements in Natural Document Flow) */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col">
        {/* Section Title */}
        <div className="w-full text-left mb-20 sm:mb-24 select-none">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-[1.2] max-w-sm sm:max-w-md">
            {PROBLEMS_SECTION_TITLE}
          </h2>
        </div>

        {/* 5 Problem Statements */}
        <div className="flex flex-col gap-28 sm:gap-36 pb-16">
          {KINETIC_PROBLEMS.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={item.id}
                className={`flex flex-col max-w-sm sm:max-w-md ${
                  isEven ? 'self-end text-left sm:text-right' : 'self-start text-left'
                }`}
              >
                {/* Red Monospace Numbered Pill */}
                <div className={`inline-flex items-center gap-2 mb-3 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                    {item.tag}
                  </span>
                </div>

                {/* White Handwriting Statement */}
                <h3 className="font-handwriting text-xl sm:text-2xl text-white leading-[1.65] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  {item.text}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
