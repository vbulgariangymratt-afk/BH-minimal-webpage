'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollProgress
 * 
 * Global bottom scroll indicator.
 * Operates entirely on GPU compositor (scaleX) via RAF + lerp with direct DOM refs.
 * Zero React re-renders during scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedPercent = -1;

    const computeTarget = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        targetProgress = 0;
        return;
      }
      const raw = (window.scrollY / totalScroll) * 100;
      targetProgress = Math.min(100, Math.max(0, raw));
    };

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${(currentProgress / 100).toFixed(4)})`;
      }

      const percent = Math.round(currentProgress);
      if (percent !== lastRenderedPercent && labelRef.current) {
        lastRenderedPercent = percent;
        labelRef.current.textContent = `${percent}%`;
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
    <aside
      aria-label="Page scroll progress"
      className="fixed bottom-4 inset-x-0 z-40 px-6 sm:px-10 md:px-14 pointer-events-none select-none"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Progress track */}
        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full bg-white/70 rounded-full origin-left will-change-transform"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
        </div>

        {/* Progress label */}
        <span
          ref={labelRef}
          className="text-[10px] font-mono text-zinc-500 tracking-wider w-8 text-right tabular-nums"
        >
          0%
        </span>
      </div>
    </aside>
  );
}

