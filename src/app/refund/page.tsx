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
          <h2 className="text-lg font-medium text-white">1. 14-Day Money-Back Guarantee</h2>
          <p>
            We want you to be completely confident in Backbone. We offer a full, unconditional refund within <strong>14 days of purchase</strong>, no questions asked.
          </p>
          <p>
            To request a refund, send a direct message on X/Twitter to{' '}
            <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">
              @vz_warhead
            </a>{' '}
            (fastest response) or email{' '}
            <a href="mailto:vbulgariangymratt@gmail.com" className="text-blue-400 hover:underline">
              vbulgariangymratt@gmail.com
            </a>{' '}
            with your Paddle purchase email or transaction order ID.
          </p>
          <p className="text-xs text-zinc-400">
            Alternatively, you can request a refund directly through the transaction receipt email issued to you by Paddle or via Paddle Buyer Support at{' '}
            <a
              href="https://help.paddle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              help.paddle.com
            </a>.
          </p>
          <p className="text-xs text-zinc-400">
            Once a refund is approved, Paddle will issue the funds back to your original payment method (credit card, PayPal, etc.). Refunds typically reflect on your bank or card statement within <strong>3 to 5 business days</strong>. All purchases and refund processing are subject to{' '}
            <a
              href="https://www.paddle.com/legal/checkout-buyer-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Paddle&apos;s Checkout Buyer Terms
            </a>.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. No Recurring Subscriptions or Hidden Charges</h2>
          <p>
            Backbone operates on standalone, intentional 30-day access passes. There is no recurring monthly subscription, and you will never be automatically charged or debited when your 30-day pass expires.
          </p>
        </section>

        {/* Footer cross-links */}
        <div className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Maximiliano Sors Garza</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Backbone Home &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
