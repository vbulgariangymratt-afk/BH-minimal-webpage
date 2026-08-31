'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { PALETTES, ColorPalette } from '@/data/palettes';

interface PaletteContextType {
  currentPalette: ColorPalette;
  setPaletteId: (id: string) => void;
  activeBg: string;
}

const PaletteContext = createContext<PaletteContextType>({
  currentPalette: PALETTES.palette3,
  setPaletteId: () => {},
  activeBg: PALETTES.palette3.colors.hero,
});

export function usePalette() {
  return useContext(PaletteContext);
}

export function BackgroundTransitionsProvider({ children }: { children: React.ReactNode }) {
  // Default to Palette 3 (Midnight Sapphire & Titanium)
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('palette3');
  const currentPalette = PALETTES[selectedPaletteId] || PALETTES.palette3;
  const [activeBg, setActiveBg] = useState<string>(currentPalette.colors.hero);

  useEffect(() => {
    // Map section IDs to palette color keys
    const sectionColorMap: { id: string; getColor: (p: ColorPalette) => string }[] = [
      { id: 'hero', getColor: p => p.colors.hero },
      { id: 'downloads', getColor: p => p.colors.downloads },
      { id: 'problems', getColor: p => p.colors.problems },
      { id: 'concept', getColor: p => p.colors.concept },
      { id: 'pricing', getColor: p => p.colors.pricing },
      { id: 'important', getColor: p => p.colors.important },
      { id: 'footer', getColor: p => p.colors.footer },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollY + viewportHeight * 0.4;

      for (let i = sectionColorMap.length - 1; i >= 0; i--) {
        const item = sectionColorMap[i];
        const el = document.getElementById(item.id) || (item.id === 'footer' ? document.querySelector('footer') : null);
        if (el) {
          const top = el.offsetTop;
          if (triggerPoint >= top) {
            setActiveBg(item.getColor(currentPalette));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPalette]);

  return (
    <PaletteContext.Provider value={{ currentPalette, setPaletteId: setSelectedPaletteId, activeBg }}>
      {/* Smooth Background Canvas */}
      <div
        className="fixed inset-0 pointer-events-none -z-50 transition-colors duration-700 ease-out"
        style={{ backgroundColor: activeBg }}
        aria-hidden="true"
      />

      {children}
    </PaletteContext.Provider>
  );
}
