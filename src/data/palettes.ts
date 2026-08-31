export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: {
    hero: string;
    downloads: string;
    problems: string;
    problemsCard: string;
    concept: string;
    pricing: string;
    important: string;
    footer: string;
  };
}

export const PALETTES: Record<string, ColorPalette> = {
  palette3: {
    id: 'palette3',
    name: 'Obsidian Noir & Titanium',
    description: 'Ultra-deep obsidian jet black, smoked graphite, and titanium.',
    colors: {
      hero: '#050508',       // Pure Jet Obsidian
      downloads: '#08080c',  // Deep Obsidian
      problems: '#040406',   // True Void Black
      problemsCard: '#0a0a0f',
      concept: '#020204',    // Deep Infinite Black
      pricing: '#060609',    // Smoked Noir
      important: '#050508',  // Obsidian
      footer: '#000000',     // Absolute Black
    },
  },
  palette1: {
    id: 'palette1',
    name: 'Obsidian & Warm Noir',
    description: 'Architectural luxury with deep obsidian, rich stone basalt, and charcoal contrast.',
    colors: {
      hero: '#0b0c10',
      downloads: '#13151c',
      problems: '#1c1f2b',
      problemsCard: '#242837',
      concept: '#060709',
      pricing: '#161922',
      important: '#101218',
      footer: '#050608',
    },
  },
  palette2: {
    id: 'palette2',
    name: 'Espresso Velvet & Bronze',
    description: 'Warm editorial luxury with rich roasted espresso, warm amber undertones, and dark bronze.',
    colors: {
      hero: '#0f0c0a',
      downloads: '#17120e',
      problems: '#221913',
      problemsCard: '#2c211a',
      concept: '#080605',
      pricing: '#1b140f',
      important: '#130e0b',
      footer: '#070504',
    },
  },
};
