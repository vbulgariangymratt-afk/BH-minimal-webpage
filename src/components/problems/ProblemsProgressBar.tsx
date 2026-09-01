import React from 'react';

interface ProblemsProgressBarProps {
  barRef: React.RefObject<HTMLDivElement | null>;
  percentTextRef: React.RefObject<HTMLSpanElement | null>;
  className?: string;
}

/**
 * ProblemsProgressBar
 * 
 * Layer 2: Bottom Progress Bar & Indicator.
 * Accepts direct DOM refs for 60/120Hz scaleX transform and textContent updates without triggering React re-renders.
 */
export function ProblemsProgressBar({
  barRef,
  percentTextRef,
  className = '',
}: ProblemsProgressBarProps) {
  return (
    <div className={`z-10 w-full max-w-[82%] md:max-w-[calc(100%-160px)] flex flex-col gap-3 select-none ${className}`}>
      {/* Progress Track & Animated Fill Line */}
      <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-red-500 via-white to-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.85)]"
          style={{
            transform: 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Indicator Info Row */}
      <div className="flex items-center justify-between text-xs text-white/80">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          <span className="tracking-wide text-zinc-200 uppercase text-[11px] font-medium">
            Scroll to travel the loop
          </span>
        </div>
        <span
          ref={percentTextRef}
          className="font-mono text-white font-semibold tracking-wider text-[13px] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        >
          0%
        </span>
      </div>
    </div>
  );
}
