'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
            className="h-full bg-white/70 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress label */}
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider w-8 text-right tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </aside>
  );
}
