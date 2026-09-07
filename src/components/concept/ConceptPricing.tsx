import React from 'react';
import { PRICING_PLAN } from '@/data/pricing';

interface ConceptPricingProps {
  scrollProgress: number;
  onPurchaseClick: () => void;
  className?: string;
}

/**
 * ConceptPricing
 * 
 * Renders the bottom-right minimal pricing prompt (> $30usd a month), value proposition,
 * and Lemon Squeezy checkout trigger button. Always fully visible, no scroll-triggered reveal.
 */
export function ConceptPricing({
  onPurchaseClick,
  className = '',
}: ConceptPricingProps) {
  const NOTE_PRICE = `$${PRICING_PLAN.price}usd a month`;
  const NOTE_BODY = "you get the full desktop app, unlimited usage and\nyou officially become a boner";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPurchaseClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPurchaseClick();
        }
      }}
      className={`cursor-target group self-end flex flex-col items-start text-left max-w-md lg:max-w-xl gap-3 z-10 sm:mr-16 md:mr-24 lg:mr-36 xl:mr-44 pb-8 sm:pb-12 lg:pb-16 cursor-pointer select-none transition-opacity focus:outline-none ${className}`}
      aria-label="Purchase Backbone subscription"
    >
      {/* Level 0: Price Prompt */}
      <div className="min-h-[2rem] flex items-center gap-2 font-mono text-base sm:text-lg md:text-xl text-zinc-300 tracking-wide">
        <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
        <span className="font-medium">{NOTE_PRICE}</span>
      </div>

      {/* Level 1: Value Proposition (Indented Body with Monospace Code Font) */}
      <div className="flex items-center pl-4 sm:pl-5">
        <p className="font-mono text-xs sm:text-[13px] md:text-[14px] text-zinc-400 group-hover:text-zinc-100 transition-colors leading-relaxed max-w-md whitespace-pre-line font-normal tracking-tight">
          {NOTE_BODY}
        </p>
      </div>

      {/* Level 0: Action Button (Aligned flush with > prompt) — heaviest element in the block */}
      <div className="pt-1">
        <div className="font-mono text-xl sm:text-2xl font-bold lowercase tracking-wider text-red-500 group-hover:text-white transition-colors flex items-center gap-3">
          <span>$ get-access --30d</span>
          <span className="text-sm font-normal text-red-500 border border-red-500 group-hover:text-white group-hover:border-white transition-colors rounded px-2 py-0.5 select-none">
            &crarr; enter
          </span>
        </div>
      </div>
    </div>
  );
}
