'use client';

import Link from 'next/link';
import { openPaddleCheckout } from '@/integrations/paddle';
import { captureEvent } from '@/integrations/posthog';
import { PRICING_PLAN } from '@/data/pricing';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function Pricing() {
  const handlePurchaseClick = () => {
    captureEvent('checkout_initiated', { plan: PRICING_PLAN.id, price: PRICING_PLAN.price });
    openPaddleCheckout();
  };

  return (
    <section id="pricing" className="w-full px-6 sm:px-10 md:px-14 py-20 md:py-28 bg-transparent flex flex-col items-center">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white/95 mb-8">
          Only 1 tier, everything included
        </h2>

        {/* Pricing Card */}
        <div className="w-full bg-[#12121c]/90 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col items-center text-left shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Subtle top glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Product Header */}
          <div className="w-full flex items-baseline justify-between pb-6 border-b border-white/5">
            <div>
              <h3 className="text-xl font-semibold text-white">{PRICING_PLAN.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{PRICING_PLAN.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                ${PRICING_PLAN.price}
              </div>
              <div className="text-xs text-zinc-500 font-mono">{PRICING_PLAN.period}</div>
            </div>
          </div>

          {/* Core Description */}
          <div className="w-full py-6 text-sm text-zinc-300 leading-relaxed space-y-4">
            <p className="text-zinc-200">
              {PRICING_PLAN.description}
            </p>

            <ul className="space-y-2.5 pt-1 text-xs text-zinc-400">
              {PRICING_PLAN.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="w-full pt-2">
            <button
              onClick={handlePurchaseClick}
              className="w-full py-4 rounded-xl bg-white text-zinc-950 font-semibold text-sm md:text-base hover:bg-zinc-200 transition-all duration-200 shadow-lg shadow-white/5 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-500" />
              {PRICING_PLAN.ctaLabel}
            </button>
            <p className="text-[11px] text-zinc-500 text-center mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PRICING_PLAN.securityNote}</span>
            </p>
          </div>

          {/* Purchase Flow Note & Legal Links */}
          <div className="w-full mt-6 pt-5 border-t border-white/5 text-center space-y-2">
            <p className="text-xs text-zinc-400 leading-relaxed">
              {PRICING_PLAN.purchaseNote}
            </p>
            <p className="text-[11px] text-zinc-500">
              By purchasing, you agree to our{' '}
              <Link href="/terms" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/refund" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                14-Day Refund Policy
              </Link>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
