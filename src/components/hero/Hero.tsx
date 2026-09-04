'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw } from 'lucide-react';
import { HeroDownloadControls } from './HeroDownloadControls';
import Image from 'next/image';

type YouTubeCommandArg = string | number | boolean | Record<string, unknown>;

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://backbone.so';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTimeRef = useRef<number>(0);

  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const mobileH1Ref = useRef<HTMLHeadingElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  const sendCommand = useCallback((func: string, args: YouTubeCommandArg[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    );
  }, []);

  const disableCaptions = useCallback(() => {
    sendCommand('unloadModule', ['captions']);
    sendCommand('unloadModule', ['cc']);
    sendCommand('setOption', ['captions', 'track', {}]);
    sendCommand('setOption', ['cc', 'track', {}]);
    sendCommand('setOption', ['captions', 'reload', false]);
  }, [sendCommand]);

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('playVideo');
      disableCaptions();
      setIsPlaying(true);
    }
  };

  const seekBy = (deltaSeconds: number) => {
    const targetSeconds = Math.max(0, currentTimeRef.current + deltaSeconds);
    sendCommand('seekTo', [targetSeconds, true]);
    currentTimeRef.current = targetSeconds;
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      sendCommand('setVolume', [100]);
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  // YouTube player listening handshake and telemetry message listener
  useEffect(() => {
    let handshakeInterval: NodeJS.Timeout | null = null;
    let initialConfigApplied = false;

    const clearHandshake = () => {
      if (handshakeInterval !== null) {
        clearInterval(handshakeInterval);
        handshakeInterval = null;
      }
    };

    const sendHandshake = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening' }),
          '*'
        );
      }
    };

    sendHandshake();
    handshakeInterval = setInterval(sendHandshake, 1000);

    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      // Once player is ready or starts delivering telemetry, stop handshake, request highest quality and unload YouTube captions
      if (data?.event === 'onReady' || data?.event === 'infoDelivery') {
        clearHandshake();
        if (!initialConfigApplied) {
          initialConfigApplied = true;
          sendCommand('setPlaybackQuality', ['highres']);
        }
        disableCaptions();
      }

      if (data?.event === 'infoDelivery' && data?.info) {
        if (typeof data.info.currentTime === 'number') {
          currentTimeRef.current = data.info.currentTime;
        }
        if (typeof data.info.playerState === 'number') {
          if (data.info.playerState === 1) setIsPlaying(true);
          if (data.info.playerState === 2) setIsPlaying(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      clearHandshake();
      window.removeEventListener('message', handleMessage);
    };
  }, [sendCommand, disableCaptions]);

  // One-shot IntersectionObserver: fade in when section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Optical parallax calculation: Headline and video card float upward smoothly via RAF lerp while background stays static
  useEffect(() => {
    let rafId: number | null = null;
    let targetForegroundY = 0;
    let currentForegroundY = 0;
    let mobileHeadlineY = 0;

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const computeTarget = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // When scrolling down past hero (0 to 100vh), float foreground up at 38% parallax speed
      if (scrollY <= windowHeight * 1.5) {
        targetForegroundY = -(scrollY * 0.38);
        mobileHeadlineY = -(scrollY * 0.50);
      }
      startLoop();
    };

    const tick = () => {
      const delta = Math.abs(targetForegroundY - currentForegroundY);
      if (delta < 0.01) {
        currentForegroundY = targetForegroundY;
      } else {
        currentForegroundY += (targetForegroundY - currentForegroundY) * 0.18;
      }

      const transformValue = `translate3d(0, ${currentForegroundY.toFixed(2)}px, 0)`;
      
      if (h1Ref.current) {
        h1Ref.current.style.transform = transformValue;
      }
      if (mobileH1Ref.current) {
        mobileH1Ref.current.style.transform = `translate3d(0, ${mobileHeadlineY.toFixed(2)}px, 0)`;
      }
      if (videoCardRef.current) {
        videoCardRef.current.style.transform = transformValue;
      }
      
      if (currentForegroundY !== targetForegroundY) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handleScroll = () => computeTarget();
    const handleResize = () => computeTarget();

    computeTarget();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, []);

  // We use `isolate` on the parent <section> combined with natural DOM order instead of
  // negative/scattered z-index values (`-z-10`, `z-10`). This creates a single unified stacking
  // context so CSS `mix-blend-mode: difference` can accurately blend against the parallax image canvas.
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="cursor-target-zone sticky top-0 z-0 w-full h-[100dvh] lg:h-screen lg:min-h-[700px] pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-8 pt-2 pb-2 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-6 flex flex-col justify-start lg:justify-end bg-transparent overflow-visible lg:overflow-hidden select-none"
    >
      {/* 1. Full-Cover Parallax Background Canvas */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[106%] -top-[3%] pointer-events-none"
      >
        <Image
          src="/images/crosshands-optimized.webp"
          alt="Atmospheric Background"
          fill
          sizes="100vw"
          className="object-cover object-center filter contrast-100 brightness-100"
          priority
        />
        <div
          className="absolute inset-0 opacity-45 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040406]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Content Row */}
      <div className="w-full flex-1 flex flex-col lg:flex-row justify-start lg:justify-between gap-4 sm:gap-5 lg:gap-8 pb-1 sm:pb-2">

        {/* DESKTOP ONLY: original left column, headline + downloads together, untouched */}
        <div className="hidden lg:flex lg:flex-col items-start gap-4 max-w-xl xl:max-w-2xl text-left select-none self-end">
          <div className="text-left pointer-events-none">
            <h1
              ref={h1Ref}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-bold tracking-tight text-white mix-blend-difference leading-[0.96] text-left"
            >
              Prosthetic brain for ADHD<br />
              founders &amp; entrepreneurs
            </h1>
          </div>
          <HeroDownloadControls />
        </div>

        {/* MOBILE ONLY: headline, shown first */}
        <div className="lg:hidden order-1 w-full text-left pointer-events-none pt-0">
          <h1
            ref={mobileH1Ref}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mix-blend-difference leading-[0.96] text-left"
          >
            Prosthetic brain for ADHD<br />
            founders &amp; entrepreneurs
          </h1>
        </div>

        {/* Video Container - single instance, reordered on mobile only */}
        <div
          ref={videoCardRef}
          className="order-2 lg:order-none relative lg:self-center w-auto h-[56dvh] max-h-[490px] sm:max-h-[540px] aspect-[9/16] mx-auto lg:mx-0 lg:w-auto lg:max-w-none lg:h-[86vh] lg:max-h-[820px] lg:min-h-[540px] rounded-[30px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.55)] border border-black/20 bg-black/60 backdrop-blur-xl shrink-0 mr-auto lg:mr-52 xl:mr-64 my-0 lg:my-auto"
        >
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/rLS6HowwDwo?autoplay=0&loop=1&playlist=rLS6HowwDwo&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=none&enablejsapi=1&origin=${encodeURIComponent(SITE_ORIGIN)}`}
            title="Backbone Hero Video"
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />

          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
            {/* 1. Seek backward 5 seconds */}
            <button
              type="button"
              onClick={() => seekBy(-5)}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
              aria-label="Rewind 5 seconds"
              title="Rewind 5 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* 2. Play / Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* 3. Seek forward 5 seconds */}
            <button
              type="button"
              onClick={() => seekBy(5)}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
              aria-label="Forward 5 seconds"
              title="Forward 5 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* 4. Mute / Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MOBILE ONLY: downloads, shown last */}
        <div className="lg:hidden order-3 w-full">
          <HeroDownloadControls />
        </div>

      </div>
    </section>
  );
}
