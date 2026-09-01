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
    const handleParallax = () => {
      if (sectionRef.current && bgRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate parallax translation as section scrolls across viewport
        const centerOffset = rect.top - (windowHeight / 2);
        const parallaxY = centerOffset * 0.18; // Smooth 18% parallax travel
        
        bgRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0) scale(1.08)`;
      }
    };

    const tick = () => {
      handleParallax();
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

  const visibleStatements = isExpanded ? IMPORTANT_STATEMENTS : IMPORTANT_STATEMENTS.slice(0, 3);
  const hiddenCount = IMPORTANT_STATEMENTS.length - 3;

  return (
    <section
      ref={sectionRef}
      id="important"
      className="relative w-full px-6 sm:px-10 md:px-14 py-24 sm:py-32 lg:py-40 bg-transparent overflow-hidden select-none isolate border-t border-white/[0.06]"
    >
      {/* Background Parallax Atmosphere Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div
          ref={bgRef}
          className="absolute -top-[20%] -bottom-[20%] left-0 right-0 w-full h-[140%] will-change-transform opacity-30"
          style={{
            transform: 'translate3d(0, 0, 0) scale(1.08)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Mirrored Atmosphere Artwork */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/this one.webp"
              alt="Atmospheric Michelangelo background"
              fill
              className="object-cover object-center filter contrast-125 brightness-75 saturate-90"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Obsidian Vignettes & Edge Shadow Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000] opacity-90" />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Fine 35mm Analog Film Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto text-left relative z-10 flex flex-col gap-10">
        
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
          
          <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-lg mt-1">
            No nested dropdown accordions. Real, direct answers before getting in.
          </p>
        </div>

        {/* Statements Grid */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {visibleStatements.map((statement, idx) => (
            <div
              key={statement.id}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#09090d]/80 border border-white/[0.08] hover:border-red-500/30 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col gap-2.5"
            >
              {/* Tag / Micro Index */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-mono text-xs font-bold">&gt;</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {STATEMENT_TAGS[idx] || `NOTE 0${idx + 1}`}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-600 select-none">
                  [ 0{idx + 1} ]
                </span>
              </div>

              {/* Statement Body Text */}
              <p className="text-sm sm:text-base md:text-[17px] text-zinc-200 group-hover:text-white leading-relaxed font-sans font-normal transition-colors">
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

        {/* Read More / Show Less Toggle Button */}
        {hiddenCount > 0 && (
          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-300 hover:text-white px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/40 transition-all duration-200 flex items-center gap-3 cursor-pointer shadow-sm"
            >
              <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">
                {isExpanded ? '−' : '+'}
              </span>
              <span>
                {isExpanded ? 'Show less notes' : `Read ${hiddenCount} more notes`}
              </span>
              <span className="text-zinc-500 text-xs group-hover:text-zinc-300 select-none">
                {isExpanded ? '[ collapse ]' : '[ expand ]'}
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
