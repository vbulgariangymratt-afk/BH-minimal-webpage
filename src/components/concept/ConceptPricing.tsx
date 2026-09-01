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
 * and Paddle checkout trigger button. Completely isolated from shadows and artwork.
 */
export function ConceptPricing({
  scrollProgress,
  onPurchaseClick,
  className = '',
}: ConceptPricingProps) {
  const NOTE_PRICE = `$${PRICING_PLAN.price}usd a month`;
  const NOTE_BODY = "you get the full desktop app, unlimited usage and\nyou officially become a boner";

  // Delay the pricing typewriter so it activates smoothly following the headline reveal
  const priceProg = Math.max(0, Math.min(1, (scrollProgress - 0.38) / 0.30));
  const visiblePriceLength = Math.ceil(priceProg * NOTE_PRICE.length);
  const currentPrice = NOTE_PRICE.slice(0, visiblePriceLength);
  const isWritingPrice = scrollProgress >= 0.35 && priceProg < 1;

  const bodyProg = Math.max(0, Math.min(1, (scrollProgress - 0.58) / 0.32));
  const visibleBodyLength = Math.ceil(bodyProg * NOTE_BODY.length);
  const currentBody = NOTE_BODY.slice(0, visibleBodyLength);
  const isWritingBody = scrollProgress >= 0.55 && bodyProg < 1;

  const btnOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.74) / 0.22));

  return (
    <div className={`self-end flex flex-col items-start text-left max-w-md lg:max-w-xl gap-3 z-10 sm:mr-16 md:mr-24 lg:mr-36 xl:mr-44 pb-8 sm:pb-12 lg:pb-16 ${className}`}>
      {/* Level 0: Price Prompt */}
      <div className="min-h-[2rem] flex items-center gap-2 font-mono text-base sm:text-lg md:text-xl text-white tracking-wide">
        <span className="text-red-500 font-bold">&gt;</span>
        <span className="font-semibold">{currentPrice}</span>
        {isWritingPrice && (
          <span className="inline-block w-2 h-4.5 bg-red-500 animate-pulse ml-0.5" />
        )}
      </div>

      {/* Level 1: Value Proposition (Indented Body) */}
      <div className="min-h-[3rem] flex items-center pl-4 sm:pl-5">
        <p className="font-sans text-xs sm:text-[14px] md:text-base text-zinc-300 leading-relaxed max-w-md whitespace-pre-line font-normal">
          {currentBody}
          {isWritingBody && (
            <span className="inline-block w-1.5 h-4 bg-red-500 ml-1 animate-pulse align-middle" />
          )}
        </p>
      </div>

      {/* Level 0: Action Button (Aligned flush with > prompt) */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onPurchaseClick}
          className="font-mono text-sm sm:text-[15px] lowercase tracking-wider text-white underline underline-offset-4 decoration-red-500 hover:decoration-white transition-all flex items-center gap-2.5 cursor-pointer group"
          style={{
            opacity: btnOpacity,
            pointerEvents: 'auto',
          }}
        >
          <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">$</span>
          <span>get-access --30d</span>
          <span className="text-zinc-500 text-xs group-hover:text-zinc-300 select-none">[ ↵ enter ]</span>
        </button>
      </div>
    </div>
  );
}
