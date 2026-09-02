'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Film } from 'lucide-react';
import { HeroDownloadControls } from './HeroDownloadControls';
import Image from 'next/image';

interface HeroProps {
  videoSrc?: string;
  captionsSrc?: string;
}

export function Hero({ videoSrc, captionsSrc }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [hasEntered, setHasEntered] = useState(false);
  
  // Video controls
  const [duration, setDuration] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const hasVideo = Boolean(videoSrc);

  const bgRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

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
    let rafId: number;
    let targetForegroundY = 0;
    let currentForegroundY = 0;

    const computeTarget = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // When scrolling down past hero (0 to 100vh), float foreground up at 38% parallax speed
      if (scrollY <= windowHeight * 1.5) {
        targetForegroundY = -(scrollY * 0.38);
      }
    };

    const tick = () => {
      currentForegroundY += (targetForegroundY - currentForegroundY) * 0.18;
      const transformValue = `translate3d(0, ${currentForegroundY.toFixed(2)}px, 0)`;
      
      if (h1Ref.current) {
        h1Ref.current.style.transform = transformValue;
      }
      if (videoCardRef.current) {
        videoCardRef.current.style.transform = transformValue;
      }
      
      rafId = requestAnimationFrame(tick);
    };

    const handleScroll = () => computeTarget();

    computeTarget();
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      const totalSeconds = Math.floor(videoRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      if (minutes > 0) {
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setDuration(`${seconds}s`);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // We use `isolate` on the parent <section> combined with natural DOM order instead of
  // negative/scattered z-index values (`-z-10`, `z-10`). This creates a single unified stacking
  // context so CSS `mix-blend-mode: difference` can accurately blend against the parallax image canvas.
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="cursor-target-zone relative lg:sticky top-0 z-0 w-full min-h-[100dvh] h-auto lg:h-screen lg:min-h-[700px] pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-8 pt-10 pb-10 lg:pt-8 lg:pb-6 lg:sm:pb-8 flex flex-col justify-start lg:justify-end bg-transparent overflow-visible lg:overflow-hidden select-none"
    >
      {/* 1. Full-Cover Parallax Background Canvas */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[106%] -top-[3%] pointer-events-none"
      >
        <Image
          src="/images/Upscaled crosshands.png"
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
      <div className="w-full flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 pb-1 sm:pb-2">

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
        <div className="lg:hidden order-1 w-full text-left pointer-events-none">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mix-blend-difference leading-[0.96] text-left"
          >
            Prosthetic brain for ADHD<br />
            founders &amp; entrepreneurs
          </h1>
        </div>

        {/* Video Container - single instance, reordered on mobile only */}
        <div
          ref={videoCardRef}
          className="order-2 lg:order-none relative lg:self-center w-full max-w-[280px] sm:max-w-[320px] mx-auto lg:mx-0 lg:w-auto lg:max-w-none h-auto lg:h-[86vh] lg:max-h-[820px] lg:min-h-[540px] aspect-[9/16] rounded-[30px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.55)] border border-black/20 bg-black/60 backdrop-blur-xl shrink-0 mr-auto lg:mr-52 xl:mr-64 my-2 lg:my-auto"
        >
          {hasVideo && videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
            >
              {captionsSrc && (
                <track
                  kind="subtitles"
                  src={captionsSrc}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center">
              <div className="w-full flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-zinc-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{duration ? `${duration} Vertical Pitch` : '30s Vertical Pitch'}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3.5 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-2xl">
                  <Film className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white tracking-tight">
                    Maximiliano&apos;s Objections Video
                  </p>
                  <p className="text-xs text-zinc-400 mt-1.5 max-w-[220px]">
                    Vertical (9:16) video answering your core objections.
                  </p>
                </div>
              </div>
              <div className="w-full pt-3 border-t border-white/10 text-[10px] text-zinc-400 font-mono text-center">
                9:16 VERTICAL FORMAT
              </div>
            </div>
          )}

          {hasVideo && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] text-zinc-200 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{duration ? `${duration} Pitch` : 'Video Pitch'}</span>
              </div>
            </div>
          )}

          {hasVideo && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* MOBILE ONLY: downloads, shown last */}
        <div className="lg:hidden order-3 w-full">
          <HeroDownloadControls />
        </div>

      </div>
    </section>
  );
}
