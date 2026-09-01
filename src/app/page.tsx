import { Hero } from '@/components/hero/Hero';
import { Problems } from '@/components/problems/Problems';
import { ConceptualStatement } from '@/components/concept/ConceptualStatement';
import { ImportantStuff } from '@/components/info/ImportantStuff';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-transparent text-[#e8e8f0]">
      {/* 2.1 & 2.2 Hero Curtain & Problems Flow Container */}
      <div className="relative w-full">
        {/* 2.1 Hero & Downloads Unified First Screen (Sticky backdrop) */}
        <Hero />

        {/* 2.2 Brain Problems (Horizontal scroll + artwork carousel rolling over Hero) */}
        <Problems />
      </div>

      {/* 2.3 Conceptual Statement & Pricing (MONEEEEY) */}
      <ConceptualStatement />

      {/* 2.4 Important Stuff */}
      <ImportantStuff />

      {/* 2.5 Footer */}
      <Footer />
    </main>
  );
}
