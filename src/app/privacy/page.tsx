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
            Backbone collects only the information necessary to provide and improve its executive function compensation system:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
            <li><strong>Account details:</strong> Your email address used for login and Paddle purchase verification.</li>
            <li><strong>Tasks & activities:</strong> Projects, hierarchical tasks, and items you create.</li>
            <li><strong>Habit & behavior data:</strong> Predicted vs. actual satisfaction ratings, sleep/wake times, and optional medication logs you provide.</li>
            <li><strong>Usage patterns:</strong> Interaction events that help Backbone recognize executive function breakdown patterns.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">2. How Your Information Is Used</h2>
          <p>
            Information is strictly used to run Backbone&apos;s pattern-recognition features and help you understand recurring behavioral cycles. We do <strong>not</strong> sell, rent, or trade your personal data to third parties or data brokers.
          </p>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">3. Third-Party Infrastructure</h2>
          <p>
            Backbone relies on trusted, industry-standard service providers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
            <li><strong>Supabase:</strong> Secure cloud database infrastructure and authentication.</li>
            <li><strong>Paddle:</strong> Payment processing and Merchant of Record (we never see or store your credit card details).</li>
            <li><strong>PostHog:</strong> Privacy-conscious product analytics to identify UI errors and improve performance.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-6">
          <h2 className="text-lg font-medium text-white">4. Data Control & Contact</h2>
          <p>
            You can request the deletion of your account and associated records at any time by contacting Maximiliano on X/Twitter at <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@vz_warhead</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
