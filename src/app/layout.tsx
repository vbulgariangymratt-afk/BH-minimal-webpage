import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { DynamicTargetCursor } from '@/components/animations/DynamicTargetCursor';
import { LineSidebar } from '@/components/navigation/LineSidebar';

const lexend = localFont({
  src: '../../public/fonts/Lexend-Variable.woff2',
  variable: '--font-lexend',
  display: 'swap',
});


const rockSalt = localFont({
  src: '../../public/fonts/RockSalt-Regular.woff2',
  variable: '--font-rock-salt',
  display: 'swap',
});

const unbounded = localFont({
  src: '../../public/fonts/Unbounded-Variable.woff2',
  variable: '--font-unbounded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Backbone — Prosthetic brain for ADHD founders & entrepreneurs',
  description: 'Prosthetic brain for ADHD founders & entrepreneurs. Built by Maximiliano Sors Garza.',
  metadataBase: new URL('https://backbone.so'),
  authors: [{ name: 'Maximiliano Sors Garza', url: 'https://x.com/vz_warhead' }],
  creator: 'Maximiliano Sors Garza',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://backbone.so',
    title: 'Backbone — Prosthetic brain for ADHD founders & entrepreneurs',
    description: 'Prosthetic brain for ADHD founders & entrepreneurs.',
    siteName: 'Backbone',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backbone — Prosthetic brain for ADHD founders & entrepreneurs',
    description: 'Prosthetic brain for ADHD founders & entrepreneurs.',
    creator: '@vz_warhead',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${rockSalt.variable} ${unbounded.variable}`}>
      <body className="text-[#e8e8f0] font-sans antialiased selection:bg-white/20 selection:text-white bg-transparent">
        <PostHogProvider>
          {children}
          
          {/* Fixed Right Line Sidebar Navigation (No transform on parent so mix-blend-difference blends directly against document) */}
          <div className="fixed right-5 sm:right-8 top-[36vh] z-50 hidden md:block pointer-events-auto mix-blend-difference">
            <LineSidebar align="right" />
          </div>

          <DynamicTargetCursor
            zoneSelector=".cursor-target-zone"
            targetSelector=".cursor-target"
            spinDuration={2.5}
            hoverDuration={0.2}
            parallaxOn={true}
            cursorColor="#ffffff"
          />
        </PostHogProvider>
      </body>
    </html>
  );
}
