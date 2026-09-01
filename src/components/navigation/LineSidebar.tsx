'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import './LineSidebar.css';

const FALLOFF_CURVES: Record<string, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p,
};

export interface LineSidebarItem {
  label: string;
  sectionId?: string;
}

export interface LineSidebarProps {
  items?: (string | LineSidebarItem)[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: 'linear' | 'smooth' | 'sharp';
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  align?: 'left' | 'right';
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const DEFAULT_SECTIONS: LineSidebarItem[] = [
  { label: 'DOWNLOAD', sectionId: 'hero' },
  { label: 'FIXES FOR U', sectionId: 'problems' },
  { label: 'MONEEEEY', sectionId: 'concept' },
  { label: 'READ THIS SHIDD', sectionId: 'important' },
];

export function LineSidebar({
  items = DEFAULT_SECTIONS,
  accentColor = '#ffffff',
  textColor = '#cccccc',
  markerColor = '#999999',
  showIndex = false,
  showMarker = true,
  proximityRadius = 80,
  maxShift = 14,
  falloff = 'smooth',
  markerLength = 32,
  markerGap = 8,
  tickScale = 0.4,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.72,
  smoothing = 100,
  defaultActive = 0,
  align = 'right',
  onItemClick,
  className = '',
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);
  const activeRef = useRef<number | null>(activeIndex);
  const smoothingRef = useRef<number>(smoothing);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const normalizedItems = items.map(item =>
    typeof item === 'string' ? { label: item } : item
  );

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const itemsEls = itemRefs.current;
    for (let i = 0; i < itemsEls.length; i++) {
      const el = itemsEls[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const itemsEls = itemRefs.current;
      for (let i = 0; i < itemsEls.length; i++) {
        const el = itemsEls[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, item: LineSidebarItem) => {
      setActiveIndex(index);
      if (item.sectionId) {
        const targetSection = document.getElementById(item.sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      onItemClick?.(index, item.label);
    },
    [onItemClick]
  );

  // Auto-track active section based on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollY + viewportHeight * 0.4;

      for (let i = normalizedItems.length - 1; i >= 0; i--) {
        const sectionId = normalizedItems[i].sectionId;
        if (!sectionId) continue;
        const el = document.getElementById(sectionId);
        if (el && triggerPoint >= el.offsetTop) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [normalizedItems]);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    []
  );

  return (
    <nav
      className={`line-sidebar ${align === 'right' ? 'line-sidebar--right' : ''}${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''}${className ? ` ${className}` : ''}`}
      style={{
        // @ts-expect-error custom CSS variables
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': `${markerLength}px`,
        '--marker-gap': `${markerGap}px`,
        '--tick-scale': tickScale,
        '--max-shift': `${maxShift}px`,
        '--item-gap': `${itemGap}px`,
        '--font-size': `${fontSize}rem`,
        '--smoothing': `${smoothing}ms`,
      }}
      aria-label="Section Navigation"
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {normalizedItems.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, item)}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              <span className="line-sidebar__text">{item.label}</span>
              {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LineSidebar;
