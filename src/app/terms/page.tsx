import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
            Legal
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last updated: August 2026 &bull; Seller: Maximiliano Sors Garza
          </p>
        </div>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">1. Ownership & License</h2>
          <p>
            Backbone, including its software, object code, branding, and proprietary systems, is owned and maintained by Maximiliano Sors Garza.
          </p>
          <p>
            Purchasing access grants you a limited, non-exclusive, non-transferable license to use Backbone for your personal and business productivity during your paid 30-day period. You may not copy, reverse-engineer, redistribute, resell, or commercially exploit Backbone or its proprietary materials without written permission.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. Subscription & Access Period</h2>
          <p>
            Backbone is purchased as an intentional 30-day access period for $30 (or localized equivalent via Paddle).
          </p>
          <p>
            <strong>No Automatic Renewal:</strong> Backbone will never automatically charge your payment method when your 30 days expire. You decide when and if you wish to purchase another access period.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">3. Service Availability & Limitations</h2>
          <p>
            While every effort is made to ensure Backbone operates smoothly and reliably, Backbone does not guarantee uninterrupted or error-free operation. Backbone relies on cloud infrastructure (such as Supabase) and local operating system permissions to perform its core functions.
          </p>
          <p>
            If a verified technical problem caused directly by Backbone renders the application unusable for you during a paid access period, you are eligible for a full refund for that period.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">4. User Data & Responsibility</h2>
          <p>
            You are responsible for the data you enter, modify, or intentionally/accidentally delete within Backbone. While Backbone provides reliable storage, recovery of user-deleted items cannot be guaranteed.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">5. Contact & Inquiries</h2>
          <p>
            For questions regarding these terms, contact Maximiliano directly via X/Twitter at <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@vz_warhead</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
