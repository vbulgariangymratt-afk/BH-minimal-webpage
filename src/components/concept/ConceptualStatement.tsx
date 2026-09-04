'use client';

import { useRef, useEffect, useState } from 'react';
import { openLemonSqueezyCheckout } from '@/integrations/lemonsqueezy';
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
 * 5. ConceptPricing — Bottom-right typewriter pricing prompt & Lemon Squeezy checkout button
 */
export function ConceptualStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handlePurchaseClick = () => {
    captureEvent('checkout_initiated', { plan: PRICING_PLAN.id, price: PRICING_PLAN.price });
    openLemonSqueezyCheckout();
  };

  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedProgress = -1;

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const computeTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start detecting smoothly as the section enters the viewport
      const startTrigger = windowHeight;
      const scrolled = startTrigger - rect.top;
      
      // Paced across entry and full sticky scroll to pan the artwork from top to bottom
      const totalDistance = windowHeight * 1.85;

      if (totalDistance > 0) {
        targetProgress = Math.max(0, Math.min(1, scrolled / totalDistance));
      } else {
        targetProgress = 0;
      }
      startLoop();
    };

    const tick = () => {
      const delta = Math.abs(targetProgress - currentProgress);
      if (delta < 0.0001) {
        currentProgress = targetProgress;
      } else {
        currentProgress += (targetProgress - currentProgress) * 0.18;
      }

      // 1. Direct GPU transform on the heavy 170vh background atmosphere image
      if (atmosphereRef.current) {
        const translateX = -8;
        const translateY = -(currentProgress * 70);
        atmosphereRef.current.style.transform = `translate3d(${translateX}vw, ${translateY.toFixed(3)}vh, 0)`;
      }

      // 2. Smoothly update text decrypting progress when changed
      if (Math.abs(currentProgress - lastRenderedProgress) > 0.003) {
        lastRenderedProgress = currentProgress;
        setScrollProgress(currentProgress);
      }

      if (currentProgress !== targetProgress) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handleScroll = () => computeTarget();
    const handleResize = () => computeTarget();

    computeTarget();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="relative z-20 w-full h-[200vh] bg-black select-none isolate border-t border-white/[0.08] lg:shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
        
        {/* Layer 0: Mirrored Background Atmosphere Artwork with Smooth Vertical Parallax */}
        <ConceptAtmosphere
          ref={atmosphereRef}
          imageSrc="/images/redish-optimized.webp"
        />

        {/* Layer 1: Top-Right Marble Medusa Sculpture */}
        <ConceptMedusa />

        {/* Layer 2: Atmospheric Soft Shadow Overlays */}
        <ConceptShadow className="hidden lg:block" />

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
