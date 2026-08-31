'use client';

import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null) => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

export interface TargetCursorProps {
  zoneSelector?: string;
  targetSelector?: string;
  spinDuration?: number;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

export function TargetCursor({
  zoneSelector = '.cursor-target-zone',
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#ffffff',
  cursorColorOnTarget,
}: TargetCursorProps) {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<Element> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const activeStrengthRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || (navigator as unknown as { vendor?: string }).vendor || '';
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
    }),
    []
  );

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.08,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !mounted) return;

    const originalCursor = document.body.style.cursor;
    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

    let activeTarget: Element | null = null;
    let isInZone = false;

    // Dynamic stylesheet to hide native cursor — only injected when custom cursor is active
    const cursorHideStyle = document.createElement('style');
    cursorHideStyle.textContent = `
      .cursor-target-zone,
      .cursor-target-zone *,
      .cursor-target,
      .cursor-target * {
        cursor: none !important;
      }
    `;

    const initialOffset = getOffset();
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    createSpinTimeline();

    const resetCornersToCenter = () => {
      if (!cornersRef.current) return;
      const { cornerSize } = constants;
      const positions = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
      ];
      const tl = gsap.timeline();
      Array.from(cornersRef.current).forEach((corner, index) => {
        tl.to(
          corner,
          {
            x: positions[index].x,
            y: positions[index].y,
            duration: 0.25,
            ease: 'power3.out',
          },
          0
        );
      });
    };

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = Number(gsap.getProperty(cursorRef.current, 'x'));
      const cursorY = Number(gsap.getProperty(cursorRef.current, 'y'));

      const corners = Array.from(cornersRef.current) as HTMLElement[];
      corners.forEach((corner, i) => {
        const currentX = Number(gsap.getProperty(corner, 'x'));
        const currentY = Number(gsap.getProperty(corner, 'y'));

        const targetX = targetCornerPositionsRef.current![i].x - cursorX;
        const targetY = targetCornerPositionsRef.current![i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY);

      const targetEl = e.target as HTMLElement | null;
      const zoneEl = targetEl?.closest(zoneSelector);

      if (zoneEl) {
        if (!isInZone) {
          isInZone = true;
          cursor.classList.add('is-active');
          document.body.style.cursor = 'none';
          // Inject cursor-hiding stylesheet now that custom cursor is active
          if (!cursorHideStyle.parentNode) {
            document.head.appendChild(cursorHideStyle);
          }
        }

        const buttonTarget = targetEl?.closest(targetSelector);
        if (buttonTarget) {
          if (activeTarget !== buttonTarget) {
            activeTarget = buttonTarget;
            spinTl.current?.pause();
            gsap.set(cursor, { rotation: 0 });

            const rect = buttonTarget.getBoundingClientRect();
            const { borderWidth, cornerSize } = constants;
            const { x: offsetX, y: offsetY } = getOffset();
            const cursorX = Number(gsap.getProperty(cursor, 'x'));
            const cursorY = Number(gsap.getProperty(cursor, 'y'));

            targetCornerPositionsRef.current = [
              { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
              { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
              { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
              { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
            ];

            isActiveRef.current = true;
            if (tickerFnRef.current) {
              gsap.ticker.add(tickerFnRef.current);
            }

            gsap.to(activeStrengthRef, {
              current: 1,
              duration: hoverDuration,
              ease: 'power2.out',
            });

            if (cornersRef.current) {
              Array.from(cornersRef.current).forEach((corner, i) => {
                gsap.to(corner, {
                  x: targetCornerPositionsRef.current![i].x - cursorX,
                  y: targetCornerPositionsRef.current![i].y - cursorY,
                  duration: 0.2,
                  ease: 'power2.out',
                });
              });
            }
          }
        } else {
          // In zone, but not over a button
          if (activeTarget) {
            activeTarget = null;
            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            if (tickerFnRef.current) {
              gsap.ticker.remove(tickerFnRef.current);
            }
            gsap.set(activeStrengthRef, { current: 0, overwrite: true });
            resetCornersToCenter();

            if (spinTl.current) {
              spinTl.current.resume();
            }
          }
        }
      } else {
        // Outside the zone completely
        if (isInZone) {
          isInZone = false;
          activeTarget = null;
          isActiveRef.current = false;
          targetCornerPositionsRef.current = null;
          if (tickerFnRef.current) {
            gsap.ticker.remove(tickerFnRef.current);
          }
          gsap.set(activeStrengthRef, { current: 0, overwrite: true });
          resetCornersToCenter();

          cursor.classList.remove('is-active');
          document.body.style.cursor = originalCursor;
          // Remove cursor-hiding stylesheet so native cursor returns
          if (cursorHideStyle.parentNode) {
            cursorHideStyle.parentNode.removeChild(cursorHideStyle);
          }

          if (spinTl.current) {
            spinTl.current.resume();
          }
        }
      }
    };

    window.addEventListener('mousemove', moveHandler);

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('resize', resizeHandler);

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;

      // Clean up dynamic cursor-hiding stylesheet
      if (cursorHideStyle.parentNode) {
        cursorHideStyle.parentNode.removeChild(cursorHideStyle);
      }

      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [
    zoneSelector,
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    isMobile,
    hoverDuration,
    parallaxOn,
    cursorColor,
    cursorColorOnTarget,
    mounted,
  ]);

  if (!mounted || isMobile || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} />
      <div className="target-cursor-corner corner-tl" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-tr" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-br" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-bl" style={{ borderColor: cursorColor }} />
    </div>,
    document.body
  );
}

export default TargetCursor;
