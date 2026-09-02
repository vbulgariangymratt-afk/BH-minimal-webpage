import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 w-full border-t border-white/5 bg-black py-12 px-6 sm:px-10 md:px-14 text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Creator Identity & Copyright */}
        <div className="space-y-1 text-left">
          <p className="text-zinc-300 font-medium">
            Backbone
          </p>
          <p className="text-zinc-500">
            Built & maintained by <strong className="text-zinc-400 font-normal">Maximiliano Sors Garza</strong>.
          </p>
          <p className="text-zinc-600 text-[11px]">
            &copy; {currentYear} Maximiliano Sors Garza. All rights reserved.
          </p>
        </div>

        {/* Links: Legal & Support */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/terms"
            className="hover:text-zinc-300 transition-colors p-1"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="hover:text-zinc-300 transition-colors p-1"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund"
            className="hover:text-zinc-300 transition-colors p-1"
          >
            Refund Policy
          </Link>
          <a
            href="https://x.com/vz_warhead"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1.5 p-1"
          >
            <span>X (fastest):</span>
            <span className="text-zinc-200">@vz_warhead</span>
          </a>
          <a
            href="mailto:vbulgariangymratt@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1.5 p-1"
          >
            <span>Email:</span>
            <span className="text-zinc-200">vbulgariangymratt@gmail.com</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
