'use client';

import { useRef, useEffect, useState } from 'react';
import { openPaddleCheckout } from '@/integrations/paddle';
import { captureEvent } from '@/integrations/posthog';
import { PRICING_PLAN } from '@/data/pricing';

import { ConceptAtmosphere } from './ConceptAtmosphere';
import { ConceptShadow } from './ConceptShadow';
import { ConceptMedusa } from './ConceptMedusa';
import { ConceptHeadline } from './ConceptHeadline';
import { ConceptPricing } from './ConceptPricing';

/**
 * ConceptualStatement (MONEEEEY Section)
 * 
 * Orchestrates the 5 independent concept subcomponents:
 * 1. ConceptAtmosphere — Mirrored Michelangelo background & film grain
 * 2. ConceptShadow — Dedicated convex curved gradient shadow
 * 3. ConceptMedusa — Top-right broken marble sculpture with radial vignette
 * 4. ConceptHeadline — Top-left multilingual decrypting cypher headline
 * 5. ConceptPricing — Bottom-right typewriter pricing prompt & Paddle checkout button
 */
export function ConceptualStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handlePurchaseClick = () => {
    captureEvent('checkout_initiated', { plan: PRICING_PLAN.id, price: PRICING_PLAN.price });
    openPaddleCheckout();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start detecting smoothly as the section enters the viewport
        const startTrigger = windowHeight;
        const scrolled = startTrigger - rect.top;
        
        // Paced tightly across entry and sticky scroll to eliminate dead scroll space
        const totalDistance = windowHeight * 1.25;

        if (totalDistance > 0) {
          const scrollFactor = Math.max(0, Math.min(1, scrolled / totalDistance));
          setScrollProgress((prev) => {
            if (Math.abs(prev - scrollFactor) < 0.002) return prev;
            return scrollFactor;
          });
        }
      }
    };

    const tick = () => {
      handleScroll();
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

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="relative w-full h-[130vh] bg-black select-none isolate"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
        
        {/* Layer 0: Mirrored Background Atmosphere Artwork */}
        <ConceptAtmosphere imageSrc="/images/this one.webp" />

        {/* Layer 1: Top-Right Marble Medusa Sculpture */}
        <ConceptMedusa />

        {/* Layer 2: Atmospheric Soft Shadow Overlays */}
        <ConceptShadow />

        {/* Layer 3: Top-Left Decrypting Multilingual Cypher Headline */}
        <ConceptHeadline scrollProgress={scrollProgress} />

        {/* Layer 4: Bottom-Right Minimal Pricing Prompt & Checkout Button */}
        <ConceptPricing
          scrollProgress={scrollProgress}
          onPurchaseClick={handlePurchaseClick}
        />

      </div>
    </section>
  );
}
