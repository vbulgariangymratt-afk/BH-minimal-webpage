import { Hero } from '@/components/hero/Hero';
import { Problems } from '@/components/problems/Problems';
import { ConceptualStatement } from '@/components/concept/ConceptualStatement';
import { Pricing } from '@/components/pricing/Pricing';
import { ImportantStuff } from '@/components/info/ImportantStuff';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-transparent text-[#e8e8f0]">
      {/* 2.1 Hero & Downloads Unified First Screen */}
      <Hero />

      {/* 2.2 Brain Problems (Horizontal scroll + artwork carousel) */}
      <Problems />

      {/* 2.3 Conceptual Statement */}
      <ConceptualStatement />

      {/* 2.4 Pricing */}
      <Pricing />

      {/* 2.5 Important Stuff */}
      <ImportantStuff />

      {/* 2.6 Footer */}
      <Footer />
    </main>
  );
}
