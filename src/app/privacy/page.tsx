import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            Privacy
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last updated: August 2026 &bull; Owner & Developer: Maximiliano Sors Garza
          </p>
        </div>

        {/* Developer Personal Philosophy Statement */}
        <div className="bg-[#141420] border border-blue-500/20 rounded-xl p-6 space-y-2">
          <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
            Personal Statement from Maximiliano
          </span>
          <p className="text-sm text-zinc-200 leading-relaxed italic">
            &ldquo;I really don’t care about ur data, I wouldn’t know what to do w it, Backbone saves some of ur data to improve its pattern recognition features, making you stay in the app which already benefits me, so i dont need to do anything else with it&rdquo;
          </p>
        </div>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">1. Information We Collect</h2>
          <p>
            Backbone collects only what is strictly necessary to authenticate your purchase, run the app, and prevent technical crashes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-400">
            <li>
              <strong>Account & Email Address:</strong> We collect your email address purely as your unique account identifier to verify your Paddle purchase, unlock your license, and sync your data across devices. <em>We will never send you promotional newsletters, marketing spam, or unsolicited emails.</em>
            </li>
            <li>
              <strong>Application Data:</strong> Projects, hierarchical tasks, predicted vs. actual satisfaction ratings, sleep/wake times, and optional medication logs you enter into Backbone to run its executive function compensation system.
            </li>
            <li>
              <strong>Technical & Telemetry Data (via PostHog):</strong> When you visit our website or use the application, standard diagnostic telemetry is automatically recorded—including your IP address, approximate geographical region (country/city), operating system (macOS/Windows/Linux), browser type, screen resolution, error/crash logs, and interaction events (such as download clicks and checkout initiation). This data is strictly used for debugging, app stability, and preventing abuse.
            </li>
            <li>
              <strong>Payment Information:</strong> All transactions are processed directly by our Merchant of Record, Paddle. Backbone never collects, sees, or stores your credit card numbers, CVVs, or financial billing details.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. How Your Information Is Used</h2>
          <p>
            Your data is strictly used to deliver Backbone&apos;s pattern-recognition features and keep the service operational. We do <strong>not</strong> sell, rent, monetize, or trade your personal data to third parties, advertising networks, or data brokers.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">3. Third-Party Infrastructure & Merchant of Record</h2>
          <p>
            Backbone relies on trusted, industry-standard service providers to deliver secure infrastructure and payments:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-400">
            <li>
              <strong>Paddle (Merchant of Record & Independent Data Controller):</strong> Our order and checkout process is conducted by our online reseller Paddle.com (Paddle.com Market Ltd / Paddle Payments Ltd). Paddle acts as the Merchant of Record and an independent data controller for buyer transaction data (such as billing address, country, tax ID, and payment instrument details) for order fulfillment, billing, invoicing, fraud detection, and global tax (VAT/GST/Sales Tax) compliance. Backbone never collects, sees, or stores your credit card numbers. All payment data is processed under the{' '}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium"
              >
                Paddle Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Supabase:</strong> Encrypted cloud database and authentication infrastructure used to store your tasks and verify your access.
            </li>
            <li>
              <strong>PostHog:</strong> Privacy-conscious product analytics and diagnostic telemetry used to detect bugs, monitor performance, and improve the application.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">4. Legal Bases for Processing (GDPR / UK / EEA)</h2>
          <p>
            If you are located in the European Economic Area (EEA), UK, or Switzerland, we process your personal data under the following lawful legal bases:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
            <li><strong>Performance of a Contract:</strong> Processing your email and account information to provide software access, verify entitlements, and enable multi-device synchronization.</li>
            <li><strong>Legitimate Interests:</strong> Processing diagnostic telemetry and crash logs (via PostHog) to protect software integrity, resolve errors, and prevent malicious abuse.</li>
            <li><strong>Legal Obligations:</strong> Compliance with statutory financial, legal, and tax reporting requirements handled in partnership with Paddle.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">5. Data Retention & Cookies</h2>
          <p>
            <strong>Data Retention:</strong> We retain your account and task records for as long as your account exists or until you request its permanent deletion.
          </p>
          <p>
            <strong>Cookies & Local Storage:</strong> Backbone uses essential browser local storage to maintain your login session and privacy-conscious analytics (PostHog) to diagnose page errors. We do <strong>not</strong> use advertising trackers, marketing cookies, or cross-site profiling tools.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">6. Your Data Rights (GDPR, CCPA & Global Rights)</h2>
          <p>
            Regardless of where you reside, you have full control over your personal data. Under global privacy laws (including GDPR and CCPA), you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
            <li><strong>Right of Access:</strong> Request confirmation of whether we process your data and obtain a copy of your records.</li>
            <li><strong>Right to Rectification:</strong> Request correction of any inaccurate or incomplete personal details.</li>
            <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request the permanent deletion of your account, tasks, habits, and associated database records.</li>
            <li><strong>Right to Data Portability:</strong> Export your data directly through the Backbone app or request an export file.</li>
            <li><strong>Right to Restrict or Object:</strong> Restrict or object to the processing of your data at any time.</li>
          </ul>
          <p className="text-xs text-zinc-400 pt-2">
            To exercise any of these rights, request account deletion, or ask privacy questions, message Maximiliano directly on X/Twitter at{' '}
            <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">
              @vz_warhead
            </a>{' '}
            (fastest response) or by email at{' '}
            <a href="mailto:vbulgariangymratt@gmail.com" className="text-blue-400 hover:underline">
              vbulgariangymratt@gmail.com
            </a>.
          </p>
        </section>

        {/* Footer cross-links */}
        <div className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Maximiliano Sors Garza</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
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
