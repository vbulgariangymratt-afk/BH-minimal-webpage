import React from 'react';

// Multilingual cypher glyph sets: Ukrainian Cyrillic, Japanese Katakana/Kanji, and cryptic symbols
const CYPHER_GLYPHS = [
  // Ukrainian / Cyrillic
  'Д', 'О', 'С', 'И', 'Т', 'Ь', 'Л', 'Я', 'М', 'Е', 'Н', 'Ж', 'Щ', 'Я', 'Ф', 'Б', 'Ю', 'Ц', 'Ч', 'Ш', 'Ї', 'Є',
  // Japanese Katakana & Cognitive Kanji
  'シ', 'ネ', 'ム', 'ク', 'ラ', 'ソ', 'ツ', '脳', '神', '経', '記', '憶', '意', '識', '創', '造', '力', '構', '造',
  // Cryptographic & Terminal Glyphs
  '§', '‡', '‰', '0', '1', '<', '>', '/', '[', ']', '*', '#', '_', '%', '&', '+', '~',
];

const STATEMENT_LINES = [
  'JUST ENOUGH FOR ME',
  'TO GO',
  'EAT SOMETHING NICE',
];

interface ConceptHeadlineProps {
  scrollProgress: number;
  className?: string;
}

/**
 * ConceptHeadline
 * 
 * Renders the top-left multilingual decrypting headline and micro sub-copy.
 * Uses live mix-blend-difference color inversion and isolates cypher character animation logic.
 */
export function ConceptHeadline({ scrollProgress, className = '' }: ConceptHeadlineProps) {
  // Compute total character count across all lines to sequence decryption
  const totalChars = STATEMENT_LINES.reduce((acc, line) => acc + line.length, 0);

  // Helper to render a character either as resolved English, scrambling glyph, or foreign cypher
  const renderChar = (char: string, globalIndex: number, progress: number) => {
    const charThreshold = (globalIndex + 1) / (totalChars + 2);
    const resolveWindow = 0.08;

    if (progress >= charThreshold) {
      return (
        <span key={globalIndex} className="text-white transition-colors duration-150">
          {char}
        </span>
      );
    } else if (progress >= charThreshold - resolveWindow) {
      const randomGlyph = CYPHER_GLYPHS[(globalIndex + Math.floor(progress * 100) + Math.floor(Math.random() * 10)) % CYPHER_GLYPHS.length];
      return (
        <span
          key={globalIndex}
          className="text-red-500 font-mono inline-block animate-pulse scale-105"
        >
          {randomGlyph}
        </span>
      );
    } else {
      const cypherGlyph = CYPHER_GLYPHS[(globalIndex * 7 + Math.floor(progress * 20)) % CYPHER_GLYPHS.length];
      return (
        <span
          key={globalIndex}
          className="text-white/35 font-mono inline-block select-none"
        >
          {cypherGlyph}
        </span>
      );
    }
  };

  let charCounter = 0;

  return (
    <div className={`relative w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[52vw] xl:max-w-[48vw] flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-14 lg:pt-20 ${className}`}>
      <div
        className="absolute left-[-1.5rem] right-[5%] top-[4.5rem] bottom-[-1rem] pointer-events-none rounded-[40%] bg-black/[0.32] blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Tag / Status Indicator with Fixed Clean Color */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          [ 03 // THE DEAL &bull; {Math.round(scrollProgress * 100)}% ]
        </span>
      </div>

      {/* Multilingual Decrypting Headline with Explicit Word Spacing & Live Color Inversion */}
      <div className="relative z-10 font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.12] uppercase text-white mix-blend-difference flex flex-col gap-2 sm:gap-3">
        {STATEMENT_LINES.map((line, lineIdx) => {
          const words = line.split(' ');
          return (
            <div key={lineIdx} className="flex flex-wrap items-center gap-x-[0.35em]">
              {words.map((word, wordIdx) => {
                const wordChars = word.split('').map((char) => {
                  const element = renderChar(char, charCounter, scrollProgress);
                  charCounter++;
                  return element;
                });

                if (wordIdx < words.length - 1) {
                  charCounter++;
                }

                return (
                  <span key={wordIdx} className="inline-flex items-center">
                    {wordChars}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Micro Sub-copy with Fixed Clean Color */}
      <p className="relative z-10 font-mono text-xs sm:text-sm text-zinc-300 max-w-md mt-2 leading-relaxed opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        I like eating a lot, go to restaurants and shit, yk?
      </p>
    </div>
  );
}
