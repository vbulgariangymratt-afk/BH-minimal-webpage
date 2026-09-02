'use client';

import React, { useState, useEffect } from 'react';
import { ProblemsDesktop } from './ProblemsDesktop';
import { ProblemsMobile } from './ProblemsMobile';

/**
 * Problems
 * 
 * Top-level responsive orchestrator for the Brain Problems ("Fixes for u") section.
 * 
 * Guarantees strict runtime component isolation:
 * - On desktop (>= 1024px), ONLY `ProblemsDesktop` is mounted and running its 60/120Hz RAF loop.
 *   `ProblemsMobile` is completely unmounted.
 * - On mobile (< 1024px), ONLY `ProblemsMobile` is mounted and running its lightweight vertical parallax.
 *   `ProblemsDesktop` (and all its 380vh scroll listeners & 4200px SVG elements) is completely unmounted.
 * - CSS `display: none` is NOT used as an execution barrier; unmounted components have zero active effects or DOM nodes.
 */
export function Problems() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    setMounted(true);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mql.addEventListener('change', handleMediaChange);
    return () => mql.removeEventListener('change', handleMediaChange);
  }, []);

  // Before mounting on the client (during SSR / initial hydration), render a static placeholder with zero animation hooks
  if (!mounted) {
    return (
      <section
        id="problems"
        className="relative z-10 w-full bg-[#040406] border-t border-white/[0.04] shadow-[0_-20px_45px_rgba(0,0,0,0.45)]"
      >
        <div className="hidden lg:block h-[380vh]" />
        <div className="block lg:hidden min-h-[1400px]" />
      </section>
    );
  }

  // Mount ONLY the matching component; the other is completely unmounted from the React tree
  return isDesktop ? <ProblemsDesktop /> : <ProblemsMobile />;
}
