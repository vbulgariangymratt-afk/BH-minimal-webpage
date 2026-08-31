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

  // Parallax offsets
  const [bgParallaxY, setBgParallaxY] = useState(0);
  const [fgParallaxY, setFgParallaxY] = useState(0);

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

  // Optical parallax depth calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalSpan = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const scrollRatio = currentPos / totalSpan;
      const delta = (scrollRatio - 0.5) * 2;

      setBgParallaxY(delta * 120);
      setFgParallaxY(delta * -20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      const totalSeconds = Math.floor(videoRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
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
      className="cursor-target-zone relative w-full h-screen min-h-[700px] pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-8 pt-8 pb-6 sm:pb-8 flex flex-col justify-end bg-transparent overflow-hidden select-none"
    >
      {/* 1. Full-Cover Parallax Background Canvas */}
      <div
        className="absolute inset-0 w-full h-[125%] -top-[12%] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${bgParallaxY}px, 0)`,
        }}
      >
        <Image
          src="/images/crosshands.webp"
          alt="Atmospheric Background"
          fill
          sizes="100vw"
          className="object-cover object-left md:object-[0%_center] filter contrast-100 brightness-100"
          priority
        />
        {/* Subtle dark vignette blend at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* 2. Bottom-Aligned Editorial Row (Headline & De-styled Controls on Left, 9:16 Video on Right) */}
      <div className="w-full flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 pb-1 sm:pb-2">
        {/* Bottom-Left Editorial Stack: Headline -> Download Links -> Loose Footnote */}
        <div className="flex flex-col items-start gap-4 max-w-xl xl:max-w-2xl text-left select-none self-end">
          {/* 1. Large Asymmetric Poster Headline (Ragged Right Edge) */}
          <div className="text-left pointer-events-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-bold tracking-tight text-white mix-blend-difference leading-[0.96] text-left">
              Prosthetic brain for ADHD<br />
              founders &amp; entrepreneurs
            </h1>
          </div>

          {/* 2 & 3. Quiet Secondary Download Links + Unbordered Footnote */}
          <HeroDownloadControls />
        </div>

        {/* Center-Right: Large Vertical (9:16) Video Container (Vertically Centered with Equal Top & Bottom Space) */}
        <div className="relative lg:self-center h-[86vh] max-h-[820px] min-h-[540px] aspect-[9/16] rounded-[30px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.55)] border border-black/20 bg-black/60 backdrop-blur-xl shrink-0 mr-auto lg:mr-52 xl:mr-64 my-auto">
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
            /* Vertical Video Placeholder Frame */
            <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center">
              {/* Top Status Pill */}
              <div className="w-full flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-zinc-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>30s Vertical Pitch</span>
                </div>
              </div>

              {/* Center Play Icon & Prompt */}
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

              {/* Bottom Spec Badge */}
              <div className="w-full pt-3 border-t border-white/10 text-[10px] text-zinc-400 font-mono text-center">
                9:16 VERTICAL FORMAT
              </div>
            </div>
          )}

          {/* Video Overlay Controls (When real video is loaded) */}
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

      </div>
    </section>
  );
}
