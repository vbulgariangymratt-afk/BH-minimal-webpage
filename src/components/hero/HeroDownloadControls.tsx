'use client';

import { useState, useEffect } from 'react';
import { detectUserOS, GITHUB_DOWNLOADS, SupportedOS } from '@/integrations/github/downloads';
import { captureEvent } from '@/integrations/posthog';
import { Copy, Check } from 'lucide-react';

const MAC_COMMAND = 'xattr -cr /Applications/Backbone\\ Hierarchy.app';

export function HeroDownloadControls() {
  const [detectedOS, setDetectedOS] = useState<SupportedOS>('unknown');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDetectedOS(detectUserOS());
  }, []);

  const handleDownloadClick = (os: 'windows' | 'macOS') => {
    captureEvent('download_initiated', {
      platform: os,
      detected_os: detectedOS,
    });
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(MAC_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMac = detectedOS === 'mac';
  const isWindows = detectedOS === 'windows';

  return (
    <div className="flex flex-col items-start gap-3 w-full text-white mix-blend-difference select-none">
      {/* 2. Download Links (Code/Console Style with $ prefix) */}
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm font-mono lowercase tracking-wider text-white">
        <a
          href={GITHUB_DOWNLOADS.macOS}
          onClick={() => handleDownloadClick('macOS')}
          className="cursor-target group transition-opacity hover:opacity-80 flex items-center gap-1.5"
        >
          <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">$</span>
          <span>
            {isMac ? (
              <>
                <span className="underline underline-offset-4 decoration-red-500">download</span>
                <span>-macos</span>
              </>
            ) : (
              <span className="hover:underline underline-offset-4 decoration-white/40">download-macos</span>
            )}
          </span>
        </a>
        <span className="text-white/30 select-none">/</span>
        <a
          href={GITHUB_DOWNLOADS.windows}
          onClick={() => handleDownloadClick('windows')}
          className="cursor-target group transition-opacity hover:opacity-80 flex items-center gap-1.5"
        >
          <span className="text-red-500 font-bold group-hover:translate-x-0.5 transition-transform">$</span>
          <span>
            {isWindows ? (
              <>
                <span className="underline underline-offset-4 decoration-red-500">download</span>
                <span>-windows</span>
              </>
            ) : (
              <span className="hover:underline underline-offset-4 decoration-white/40">download-windows</span>
            )}
          </span>
        </a>
      </div>

      {/* 3. "YOO READ THIS" Footnote */}
      {isMac && (
        <div className="flex flex-col items-start gap-1.5 max-w-md pt-1 text-left text-white/90">
          {/* Explanatory sentence: Normal sans-serif body font */}
          <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white">
            <span className="font-mono uppercase font-bold tracking-wider mr-1 text-red-500">&gt; yoo read this:</span>{' '}
            Drag <strong className="text-white font-semibold">Backbone Hierarchy</strong> into Applications first. If/when u get &ldquo;can&apos;t be opened&rdquo; (cuz I havent payed Apple to notarize this yet), open Terminal and paste this command:
          </p>
          {/* Terminal command line: Entire row is framed by target cursor & 1-click copyable */}
          <button
            type="button"
            onClick={handleCopyCommand}
            className="cursor-target group flex items-center gap-2 pt-0.5 font-mono text-xs sm:text-[13px] text-white text-left px-1.5 py-0.5 -ml-1.5 rounded hover:opacity-90 transition-opacity cursor-pointer"
            title="Click to copy command"
            aria-label="Copy terminal command"
          >
            <code className="select-all underline decoration-dotted underline-offset-4 text-white">
              <span className="text-red-500 font-bold mr-1.5">$</span>
              {MAC_COMMAND}
            </code>
            <span className="p-0.5 inline-flex items-center text-white group-hover:scale-110 transition-all">
              {copied ? <Check className="w-3.5 h-3.5 text-red-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            </span>
          </button>
        </div>
      )}

      {isWindows && (
        <div className="flex flex-col items-start gap-1 max-w-md pt-1 text-left text-white/90">
          <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white">
            <span className="font-mono uppercase font-bold tracking-wider mr-1 text-red-500">&gt; yoo read this:</span>{' '}
            Windows will show a security warning when downloading cuz I haven&apos;t paid to verify the app with Microsoft yet (~$600). Just click <strong className="text-white font-semibold">&ldquo;More info&rdquo; &rarr; &ldquo;Run anyway&rdquo;</strong> ;)
          </p>
        </div>
      )}
    </div>
  );
}
