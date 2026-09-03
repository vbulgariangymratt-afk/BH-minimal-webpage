'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IMPORTANT_STATEMENTS } from '@/data/info';

const STATEMENT_TAGS = [
  'REFUND POLICY',
  'APP ACCESS',
  'NEUROSCIENCE',
  'ANTI-COPYCAT',
  'DATA PRIVACY',
  'THE JOKE',
];

export function ImportantStuff() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetParallaxY = 0;
    let currentParallaxY = 0;

    const computeTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerOffset = rect.top - (windowHeight / 2);
      targetParallaxY = centerOffset * 0.18;
    };

    const tick = () => {
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.18;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${currentParallaxY.toFixed(2)}px, 0) scale(1.08)`;
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

  const visibleStatements = isExpanded ? IMPORTANT_STATEMENTS : IMPORTANT_STATEMENTS.slice(0, 3);
  const hiddenCount = IMPORTANT_STATEMENTS.length - 3;

  return (
    <section
      ref={sectionRef}
      id="important"
      className="relative z-30 w-full px-6 sm:px-10 md:px-14 py-24 sm:py-32 lg:py-40 bg-black overflow-hidden select-none isolate"
    >
      {/* Background Parallax Atmosphere Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div
          ref={bgRef}
          className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%] will-change-transform opacity-65 lg:opacity-30"
          style={{
            transform: 'translate3d(0, 0, 0) scale(1.08)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Mirrored Atmosphere Artwork */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/this one-optimized.webp"
              alt="Atmospheric Michelangelo background"
              fill
              className="object-cover object-center filter contrast-125 brightness-75 saturate-90"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Obsidian Vignettes & Edge Shadow Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000] opacity-90" />
        <div className="absolute inset-0 bg-black/25 lg:bg-black/60" />
        
        {/* Fine 35mm Analog Film Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Main Content Container (Split Grid on Desktop, Left-Aligned) */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 pl-0 sm:pl-4 lg:pl-8">
        
        {/* Left Column: Title & Code-Comment FAQ Notes */}
        <div className="w-full lg:max-w-2xl flex flex-col gap-10 sm:gap-12">
          
          {/* Header Row */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                [ 04 // PRACTICAL CLARITY ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              Read this shidd
            </h2>
            
            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl mt-1 leading-relaxed">
              This is like a FAQ that nobody has asked me at the time of writing this
            </p>
          </div>

          {/* Clean Code-Comment List (No Card Backgrounds / Completely Unboxed) */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {visibleStatements.map((statement, idx) => (
              <div
                key={statement.id}
                className="group relative flex flex-col gap-2 border-l border-white/10 hover:border-red-500/50 pl-5 sm:pl-6 transition-colors duration-200"
              >
                {/* Code Comment Header Tag */}
                <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                  <span className="text-red-500 font-semibold">// 0{idx + 1}.</span>
                  <span className="text-zinc-500 group-hover:text-zinc-300 uppercase transition-colors">
                    {STATEMENT_TAGS[idx] || `NOTE_0${idx + 1}`}
                  </span>
                </div>

                {/* Statement Raw Body Text */}
                <p className="text-base sm:text-lg md:text-[19px] text-zinc-200 group-hover:text-white leading-relaxed font-sans font-normal transition-colors">
                  {statement.text}{' '}
                  {statement.linkHref && statement.linkText && (
                    <a
                      href={statement.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-400 hover:text-red-300 underline underline-offset-4 decoration-red-500/60 font-medium transition-colors cursor-pointer"
                    >
                      {statement.linkText}
                    </a>
                  )}
                  {statement.textSuffix && statement.textSuffix}
                </p>
              </div>
            ))}
          </div>

          {/* Terminal Style Read More Toggle Button */}
          {hiddenCount > 0 && (
            <div className="pt-2 flex justify-start pl-5 sm:pl-6">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group font-mono text-xs sm:text-sm lowercase tracking-wider text-zinc-300 hover:text-white transition-all duration-200 flex items-center gap-2.5 cursor-pointer underline underline-offset-4 decoration-red-500 hover:decoration-white"
              >
                <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">$</span>
                <span>
                  {isExpanded ? 'view --less' : `view --more (${hiddenCount} remaining)`}
                </span>
                <span className="text-zinc-500 text-xs group-hover:text-zinc-300 select-none">
                  {isExpanded ? '[ ↵ collapse ]' : '[ ↵ expand ]'}
                </span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Pinned Tactile Artwork Box */}
        <div className="hidden lg:flex flex-col items-center self-start pt-6 xl:pt-10 pr-4 sm:pr-8 lg:pr-12 xl:pr-16 shrink-0 select-none">
          <div className="relative w-[290px] xl:w-[330px] rounded-2xl bg-[#09090d]/80 border border-white/[0.12] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {/* Top Bar / Mac Window Dots */}
            <div className="flex items-center justify-between px-1 pb-2.5 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                [ david_derp.raw ]
              </span>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/[0.08] bg-black">
              <Image
                src="/images/david-derp-optimized.webp"
                alt="David collage with crossed eyes and nose ring"
                fill
                className="object-cover object-center filter contrast-110 brightness-95 saturate-105"
                sizes="(max-width: 1280px) 290px, 330px"
              />
              
              {/* Fine 35mm Analog Film Grain Texture */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px 128px',
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
