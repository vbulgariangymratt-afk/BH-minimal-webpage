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
      <div className="flex items-center gap-4 text-xs sm:text-sm font-mono lowercase tracking-wider text-white">
        <a
          href={GITHUB_DOWNLOADS.macOS}
          onClick={() => handleDownloadClick('macOS')}
          className="cursor-target underline underline-offset-4 decoration-white/40 hover:decoration-white transition-opacity hover:opacity-80"
        >
          $ download-macos
        </a>
        <span className="text-white/30 select-none">/</span>
        <a
          href={GITHUB_DOWNLOADS.windows}
          onClick={() => handleDownloadClick('windows')}
          className="cursor-target underline underline-offset-4 decoration-white/40 hover:decoration-white transition-opacity hover:opacity-80"
        >
          $ download-windows
        </a>
      </div>

      {/* 3. "YOO READ THIS" Footnote */}
      {isMac && (
        <div className="flex flex-col items-start gap-1.5 max-w-md pt-1 text-left text-white/90">
          {/* Explanatory sentence: Normal sans-serif body font */}
          <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white">
            <span className="font-mono uppercase font-bold tracking-wider mr-1 text-white">&gt; yoo read this:</span>{' '}
            Drag <strong className="text-white font-semibold">Backbone Hierarchy</strong> into Applications first. If/when u get &ldquo;can&apos;t be opened&rdquo; (cuz I havent payed Apple to notarize this yet), open Terminal and paste this command:
          </p>
          {/* Terminal command line: Monospace with matching $ console prefix */}
          <div className="flex items-center gap-2 pt-0.5 font-mono text-xs sm:text-[13px] text-white">
            <code className="select-all underline decoration-dotted underline-offset-4">
              $ {MAC_COMMAND}
            </code>
            <button
              onClick={handleCopyCommand}
              className="cursor-target p-0.5 hover:opacity-75 transition-opacity inline-flex items-center text-white"
              title="Copy command"
              aria-label="Copy terminal command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>
        </div>
      )}

      {isWindows && (
        <div className="flex flex-col items-start gap-1 max-w-md pt-1 text-left text-white/90">
          <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white">
            <span className="font-mono uppercase font-bold tracking-wider mr-1 text-white">&gt; yoo read this:</span>{' '}
            Windows will show a security warning when downloading cuz I haven&apos;t paid to verify the app with Microsoft yet (~$600). Just click <strong className="text-white font-semibold">&ldquo;More info&rdquo; &rarr; &ldquo;Run anyway&rdquo;</strong> ;)
          </p>
        </div>
      )}
    </div>
  );
}
