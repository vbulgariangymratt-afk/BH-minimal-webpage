import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0] px-6 sm:px-10 md:px-14 py-16 max-w-3xl mx-auto">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Backbone</span>
      </Link>

      <div className="space-y-8 text-left">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            Policy
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Refund Policy
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last updated: August 2026 &bull; Seller: Maximiliano Sors Garza
          </p>
        </div>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">1. Refunds</h2>
          <p>
            Full refund available within 14 days of purchase, no questions asked. To request one, send a direct message on X/Twitter to <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@vz_warhead</a> with your Paddle checkout email.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. Zero Accidental Renewals</h2>
          <p>
            Backbone operates on intentional 30-day access passes without automatic renewal. You will never be charged for an unexpected renewal period.
          </p>
        </section>
      </div>
    </main>
  );
}
