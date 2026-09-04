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
          <h2 className="text-lg font-medium text-white">1. Product Description, Ownership & License</h2>
          <p>
            Backbone is a downloadable desktop application and executive function compensation system designed for ADHD founders and entrepreneurs, available for macOS, Windows, and Linux. Backbone, including its object code, design, branding, and proprietary systems, is owned and maintained by Maximiliano Sors Garza.
          </p>
          <p>
            Purchasing access grants you a non-exclusive, non-transferable license to install and use Backbone with unlimited features across all your personal or business devices during your paid 30-day access period.
          </p>
          <p className="text-xs text-zinc-400">
            <strong>Acceptable Use:</strong> You agree not to: (a) copy, modify, distribute, resell, sublicense, or commercially exploit Backbone; (b) reverse engineer, decompile, or attempt to extract source code; (c) attempt to probe, scan, or breach system security; or (d) use Backbone for any unlawful purpose.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. Merchant of Record & Payment Processing</h2>
          <p>
            Our order process is conducted by our online reseller LemonSqueezy.com. LemonSqueezy.com (Lemon Squeezy LLC) is the Merchant of Record for all our orders. Lemon Squeezy provides order fulfillment, customer service inquiries, and handles returns. Payment, billing, tax compliance, and transaction-level disputes are governed by{' '}
            <a
              href="https://www.lemonsqueezy.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-medium"
            >
              Lemon Squeezy&apos;s Terms of Service
            </a>.
          </p>
          <p className="text-xs text-zinc-400">
            When you purchase access to Backbone, your transaction is processed directly by LemonSqueezy.com (Lemon Squeezy LLC). Lemon Squeezy is responsible for billing, issuing invoices and receipts with applicable sales taxes/VAT, and handling payment compliance. Charges on your credit card or bank statement will typically appear as <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-200 font-mono">LEMONSQUEEZY* BACKBONE</code> (or <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-200 font-mono">LMSQ* BACKBONE</code>).
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">3. Access Period & No Automatic Renewals</h2>
          <p>
            Backbone is purchased as an intentional 30-day access period for $30 (or localized currency equivalent calculated by Lemon Squeezy).
          </p>
          <p>
            <strong>Zero Automatic Renewals:</strong> Backbone does not operate on recurring subscriptions. We will never automatically charge your card when your 30 days expire. You decide if and when you want to purchase another period.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">4. Service Availability & Limitation of Liability</h2>
          <p>
            Backbone is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. While every effort is made to ensure smooth, bug-free operation, Backbone does not guarantee uninterrupted service.
          </p>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Maximiliano Sors Garza or Backbone be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of data, profits, or productivity) arising from your use of or inability to use the software. In any case, maximum aggregate liability is strictly limited to the amount you actually paid for your most recent 30-day access period.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">5. User Data & Responsibility</h2>
          <p>
            You are responsible for the data you enter, modify, or delete within Backbone, as well as keeping your login credentials secure. While Backbone uses secure cloud database infrastructure, recovery of user-deleted records cannot be guaranteed.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">6. Governing Law</h2>
          <p>
            These Terms and any dispute arising from your use of Backbone shall be governed by and construed in accordance with applicable laws, without giving effect to any conflict of law principles.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">7. Contact & Support</h2>
          <p>
            For any questions regarding these Terms, licensing, or support, reach out to Maximiliano on X/Twitter at{' '}
            <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">
              @vz_warhead
            </a>{' '}
            (preferred for fastest reply) or via email at{' '}
            <a href="mailto:vbulgariangymratt@gmail.com" className="text-blue-400 hover:underline">
              vbulgariangymratt@gmail.com
            </a>.
          </p>
        </section>

        {/* Footer cross-links */}
        <div className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Maximiliano Sors Garza</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-zinc-300 transition-colors">
              Refund Policy
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
