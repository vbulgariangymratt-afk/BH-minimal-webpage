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
- Built MONEEEEY / Pricing section (`src/components/concept/`): Fully modularized into 5 isolated single-responsibility subcomponents (`ConceptAtmosphere.tsx`, `ConceptShadow.tsx`, `ConceptMedusa.tsx`, `ConceptHeadline.tsx`, and `ConceptPricing.tsx`), orchestrated cleanly by `ConceptualStatement.tsx`. Decoupled background image parallax to direct GPU ref in RAF lerp loop to eliminate React render thrashing on the 170vh artwork.
- Global 60/120Hz Scroll Audit & Jitter Elimination: Audited and refactored all scroll handlers across `Hero.tsx`, `Problems.tsx`, `ScrollProgress.tsx`, `ImportantStuff.tsx`, `ConceptualStatement.tsx`, `BackgroundTransitions.tsx`, and `LineSidebar.tsx`, replacing state-driven transforms and layout mutations with direct DOM ref updates and RAF lerp smoothing.
- Built "Important Stuff" / "Read this shidd" section (`src/components/info/ImportantStuff.tsx` & `src/data/info.ts`): Integrated continuous background parallax drifting with film grain and obsidian edge vignettes. Implemented an unboxed, left-aligned code-comment layout (`// 01. REFUND_POLICY`) with no SaaS card backgrounds, displaying top 3 priority statements by default with a clean `$ view --more` terminal command toggle, alongside a right-aligned pinned tactile glass art box framing `david-derp.jpg` with macOS window chrome.
- Built minimal Footer (`src/components/footer/Footer.tsx`) with creator identity (Maximiliano Sors Garza) and social links.
- Built dedicated legal pages (`src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/refund/page.tsx`) implementing all owner identity, custom privacy philosophy, and Paddle-compliant unconditional 14-day refund terms (aligned with "Important Stuff" section).
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