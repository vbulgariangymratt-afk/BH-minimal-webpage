# Backbone Website — Development Progress

# Backbone Website — Development Progress

> This document is a living record of the current implementation state of the Backbone website.
> 
> 
> Update it after completing meaningful development work.
> 
> Do not treat planned features as completed until they have actually been implemented and verified.
> 

### Current Status

**Overall:** `In development (Foundation & Phase 1 completed)`

### Completed

- **Dead-Code Cleanup & Architecture Simplification**:
  - Purged 6 unused/dead source files (**653 lines of dead code**): legacy `Pricing.tsx` (96 lines), legacy `ScrollProgress.tsx` (89 lines), `GlassSurface.tsx` (248 lines), `GlassSurface.css` (77 lines), `BackgroundTransitions.tsx` (83 lines), and `data/palettes.ts` (60 lines).
  - Cleaned `src/app/layout.tsx` by removing `BackgroundTransitionsProvider` wrapper and its unneeded global window scroll listener, eliminating runtime scroll overhead.
- **Comprehensive WebP Asset Optimization & Payload Reduction**:
  - Re-encoded all major high-resolution images across the entire site into optimized WebP formats (Quality 85, Effort 6) with display-matched Retina resolutions.
  - **Hero Background (`crosshands-optimized.webp`)**: Reduced from 24.86 MB (PNG) to **568.90 KB** (-97.66% reduction), cutting GPU texture memory from ~55 MB to ~21 MB.
  - **Important Stuff Background (`this one-optimized.webp`)**: Reduced from 10.73 MB (Lossless WebP) to **374.39 KB** (-96.59% reduction).
  - **Concept Atmosphere Artwork (`redish-optimized.webp`)**: Reduced from 1.28 MB (JPEG) to **281.20 KB** (-78.60% reduction), reducing dual-instance GPU VRAM from ~76 MB to ~41 MB.
  - **Concept Medusa Sculpture (`broken-optimized.webp`)**: Reduced from 1.22 MB to **324.11 KB** (-74.11% reduction).
  - **Active Small Image Suite (`david-derp-optimized.webp`, `problems/image-[1-4]-optimized.webp`)**: Reduced total small asset payload from 790.1 KB to **228.46 KB** (-71.09% reduction).
  - **Total Site Network Payload Savings**: **~37.3 MB total bandwidth saved**, dramatically improving Largest Contentful Paint (LCP) and page load speed while maintaining 100% visual fidelity and preserving all original master assets.
- **Self-Hosted Variable Fonts (`Lexend`, `Rock Salt`, `Unbounded`) & Font Payload Optimization**: Configured official local WOFF2 font assets in `public/fonts/` with `next/font/local` in `src/app/layout.tsx`. Purged the unused `Caveat` font (73 KB) and duplicate manual `@font-face` blocks in `globals.css`, reducing font preload payload by 34.3% and streamlining CSS output.
- **Image Priority & Lazy-Loading Optimization**: Removed `priority` from below-the-fold Concept section images (`ConceptAtmosphere.tsx` and `ConceptMedusa.tsx`) and switched Problems background carousel to `loading="lazy"`, eliminating ~780 KB of eager/preloaded image downloads on initial page load and reserving critical network bandwidth exclusively for the Hero LCP image (`crosshands-optimized.webp`).
- **RAF Loop Settling & Idle Power Optimization**: Implemented settling thresholds and automatic idle pausing across all 5 scroll/parallax components (`Hero.tsx`, `ProblemsDesktop.tsx`, `ProblemsMobile.tsx`, `ConceptualStatement.tsx`, `ImportantStuff.tsx`). Automatically stops 60/120Hz RAF ticker loops when stationary, completely eliminating idle CPU and GPU draw while preserving 100% of the active lerp smoothing physics during scroll.
- **Dynamic Asynchronous Loader for GSAP & TargetCursor (`DynamicTargetCursor.tsx`)**: Decoupled GSAP from the initial root layout bundle by utilizing Next.js's official `next/dynamic` wrapper with `{ ssr: false }`. Moves GSAP (27.23 KB gzip / 69.33 KB raw) out of the critical initial synchronous HTML bundle into a dedicated asynchronous client chunk, reducing home route First Load JS from 213 kB to 185 kB (-28 kB) without altering desktop cursor behavior.
- **Deferred PostHog Initialization & In-Memory Event Queue (`PostHogProvider.tsx` & `posthog/index.ts`)**: Extracted `posthog-js` (85.37 KB gzip / 264.17 KB raw) from the critical synchronous initial JavaScript bundle into an asynchronous dynamic chunk. Deferred initialization to post-hydration idle via `requestIdleCallback` (with 2s timeout and fallback) with an in-memory queue to guarantee zero lost click events (`download_initiated`, `checkout_initiated`), slashing First Load JS from 185 kB to 123 kB (-62 kB / -33.5%).
- **YouTube Hero Video Integration & Custom Controls (`src/components/hero/Hero.tsx`)**: Embedded the YouTube Hero video (`rLS6HowwDwo`) using native browser `postMessage` protocol with high-resolution preference, automated YouTube caption track unloading, and a bottom-centered custom glass control cluster (`Rewind 5s`, `Play/Pause`, `Forward 5s`, `Mute/Unmute`) that preserves direct native play/audio activation.
- Initialized Next.js (App Router), TypeScript, and Tailwind CSS stack with Lexend typography.
- **Obsidian Black Color Theme**: Replaced navy blue tones across `src/data/palettes.ts` and `src/app/globals.css` with pure Obsidian Void Black (`#040406` / `#000000`).
- **Problems Section Background Filmstrip**: Integrated 4-artwork horizontal parallax background carousel (`image 1.webp` through `image 4.webp`) in `src/components/problems/Problems.tsx` & `src/data/problems.ts` with independent horizontal translation and `#040406` vignette fading.
- **Unified Hero & Downloads Screen (`src/components/hero/Hero.tsx` & `HeroDownloadControls.tsx`)**:
  - Merged Hero video and Downloads section above the fold into an asymmetric editorial layout with natural centered fitting of `crosshands.webp` artwork across the full viewport.
  - Sized and positioned strict 9:16 vertical video player (`86vh`, `max-h-[820px]`) centered over the artwork focal region.
  - Positioned side-by-side macOS and Windows glass download buttons in a single row.
  - Formatted Hero headline into a balanced 2-line split (*"Prosthetic brain for ADHD / founders & entrepreneurs"*).
  - Formatted *"YOO READ THIS"* footnote into 2-line explanation and single-line terminal command block with 1-click copy.
- **Color Inversion & Stacking Context Architecture**:
  - Removed `isolate` from `<section>` and removed parent `transform` wrappers from foreground containers.
  - Applied live `mix-blend-mode: difference` with pure `#ffffff` geometry across the Hero headline, *"YOO READ THIS"* footnote, and `LineSidebar` navigation so all elements calculate live color inversion against the background canvas.
- **Strict Architectural Separation & Cleanup**:
  - Extracted download controls and OS logic into `src/components/hero/HeroDownloadControls.tsx`.
  - Extracted pricing plans and copy into `src/data/pricing.ts`.
  - Extracted pre-purchase clarity statements into `src/data/info.ts`.
  - Purged obsolete legacy files (`src/components/downloads/Downloads.tsx`, `ProblemCard.tsx`, `RippedEdge.tsx`).
- Ported OS detection and GitHub download logic into dedicated integration (`src/integrations/github/downloads.ts`).
- Configured isolated PostHog analytics integration (`src/integrations/posthog/index.ts`).
- Preserved desktop Tauri auto-update manifest (`public/updater.json`).
- Built Brain Problems section (`src/components/problems/`): Fully modularized into 4 single-responsibility subcomponents (`Problems.tsx`, `ProblemsBackground.tsx`, `ProblemsSplineTrack.tsx`, and `ProblemsProgressBar.tsx`). Replaced state-driven scroll updates with a smooth 60/120Hz RAF + lerp loop that mutates DOM transforms directly via refs, completely eliminating scroll jitter and race conditions.
- **Mobile Problems Section Adaptation (`src/components/problems/ProblemsMobile.tsx` & `ProblemsDesktop.tsx`)**: Built an isolated 2-layer vertical architecture for mobile screens (< 1024px) with content-driven height and strict React component mounting isolation via `window.matchMedia('(min-width: 1024px)')`. Completely unmounts desktop component and its 380vh scroll listeners/RAF loop on mobile, and vice versa. Features 3 atmospheric background images (`image 2.webp` square slit-scan -> reduced vertical gap -> `image 4.webp` near-square -> `image 3.webp` portrait collage) on an isolated vertical track with dedicated ~36% RAF vertical parallax, flowing behind 5 unboxed handwriting statements in natural document scroll. Desktop horizontal spline and 380vh scroll behavior remain completely untouched.
- Built MONEEEEY / Pricing section (`src/components/concept/`): Fully modularized into 5 isolated single-responsibility subcomponents (`ConceptAtmosphere.tsx`, `ConceptShadow.tsx`, `ConceptMedusa.tsx`, `ConceptHeadline.tsx`, and `ConceptPricing.tsx`), orchestrated cleanly by `ConceptualStatement.tsx`. Decoupled background image parallax to direct GPU ref in RAF lerp loop to eliminate React render thrashing on the 170vh artwork.
- Global 60/120Hz Scroll Audit & Jitter Elimination: Audited and refactored all scroll handlers across `Hero.tsx`, `Problems.tsx`, `ScrollProgress.tsx`, `ImportantStuff.tsx`, `ConceptualStatement.tsx`, `BackgroundTransitions.tsx`, and `LineSidebar.tsx`, replacing state-driven transforms and layout mutations with direct DOM ref updates and RAF lerp smoothing.
- Built "Important Stuff" / "Read this shidd" section (`src/components/info/ImportantStuff.tsx` & `src/data/info.ts`): Integrated continuous background parallax drifting with film grain and obsidian edge vignettes. Implemented an unboxed, left-aligned code-comment layout (`// 01. REFUND_POLICY`) with no SaaS card backgrounds, displaying top 3 priority statements by default with a clean `$ view --more` terminal command toggle, alongside a right-aligned pinned tactile glass art box framing `david-derp.jpg` with macOS window chrome.
- Built minimal Footer (`src/components/footer/Footer.tsx`) with creator identity (Maximiliano Sors Garza) and social links.
- Built dedicated legal pages (`src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/refund/page.tsx`) and `Footer.tsx` implementing full Lemon Squeezy Merchant of Record (MoR) reseller disclosures, statutory GDPR/CCPA data rights, diagnostic telemetry details (PostHog), 14-day refund guarantee with Lemon Squeezy buyer support/portal links, support email (`vbulgariangymratt@gmail.com`), and legal cross-navigation.
- Built and tuned **TargetCursor** (`src/components/animations/TargetCursor.tsx` & `.css`): scoped strictly to the entire Downloads zone (`.cursor-target-zone`) with free-spinning reticle and button snapping, completely hidden with standard cursor across the rest of the site.
- Integrated **GlassSurface Component** (`src/components/ui/GlassSurface.tsx` & `.css`): Real SVG displacement mapping with chromatic RGB split & deep refraction for the Download buttons.
- Replaced bottom progress bar with dynamic right-aligned **LineSidebar Navigation** (`src/components/navigation/LineSidebar.tsx` & `.css`) flush with right screen margin, featuring magnetic cursor proximity physics and updated section labels (`DOWNLOAD`, `FIXES FOR U`, `MONEEEEY`, `READ THIS SHIDD`).
- Configured **OpenGraph & Twitter Card SEO metadata** in `src/app/layout.tsx`, dynamic SVG favicon (`src/app/icon.svg`), `src/app/robots.ts`, and `src/app/sitemap.ts`.
- Started Next.js development server at `http://localhost:3000`.

### Currently Working On

> Visual polish pass & atmosphere integration.

### Next

> - Finalize luxury background color tones / 4K atmosphere.

### Known Issues / Pending Tasks

- **Hero Procedural 35mm Analog Film Grain**: Integrated procedural SVG turbulence noise overlay (`opacity-45 mix-blend-overlay`) directly over `Upscaled crosshands.png` behind the foreground text and video player in `src/components/hero/Hero.tsx`.
- **Figma Red Scribble Vector for Conceptual Statement**: Draw custom red organic/chaotic scribble vector in Figma, export as SVG, and integrate behind the "BACKBONE DOES FOR OUR BRAINS WHAT THEY CAN'T DO FOR US" typography.
- **Increase and Fix Parallax on Download Section**: Refine and amplify the parallax travel & layer separation between the background imagery and the foreground download controls.
- **4K Image Enhancement & Granite/Grain Texture**: Upscale atmospheric imagery (`crosshands.webp`) to 4K (3840px) with AI to eliminate low-res softness, and apply a procedural granite/film grain noise overlay for tactile editorial finish.
- **Hero Pinned Curtain Reveal Transition**: Configured Hero as a static backdrop (`sticky top-0 z-0`) so the "Fixes for u" section (`relative z-10 bg-[#040406]`) naturally rises up and covers the hero with an authentic obsidian sheet reveal and leading drop shadow.
- **Background Atmosphere & Images**: Select and integrate 4K atmospheric background imagery/textures behind the video and sections.
### Important Implementation Notes & Future Ideas

> **Notes for Concept Section (`ConceptualStatement.tsx` / `THE CONCEPT`)**:
> - **Scroll Language Cycle / Scramble**: Transition text across languages as the user scrolls before revealing final English text (cycle through code characters `$&[]{}!`, Ukrainian, and Japanese).
> - **Full Screen Canvas**: Wants this section to command the entire screen viewport / full-bleed canvas (composition in progress).
> - **Design Decision / Open Question**: Should we reuse the `mix-blend-mode: difference` color inversion technique here, or would that be too repetitive across sections? Explore whether another visual treatment is needed.

> **Notes for Pricing Section (`Pricing.tsx` / `MONEEEEY`)**:
> - **Handwritten Note Direction**: Redesign the pricing section as an authentic handwritten note style rather than a polished SaaS box or corporate statement.
> - **Copy Adjustment**: Remove marketing-style lines like "Only 1 tier, everything included".
> - **Pinterest Mxn Images & Scroll Reveal**: When showing pricing use pinterest mxn images, and as a hand written note something like "{pricing}, just enough for me to eat today ;)", the images reveal themselves when user scrolls.


---

> **Do not rewrite the entire progress document after every small change. Keep it concise. Update it when a meaningful feature, architectural change, or important decision is completed.**
>