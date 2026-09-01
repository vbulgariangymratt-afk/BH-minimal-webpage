import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', 'sans-serif'],
        display: ['var(--font-unbounded)', 'sans-serif'],
        handwriting: ['var(--font-rock-salt)', 'cursive'],
        pen: ['var(--font-caveat)', 'cursive'],
      },
      colors: {
        background: '#0a0a0f',
        foreground: '#e8e8f0',
        muted: '#a0a8c0',
        surface: '#12121a',
      },
    },
  },
  plugins: [],
};

export default config;
