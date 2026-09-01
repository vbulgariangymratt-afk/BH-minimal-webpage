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
  - Merged Hero video and Downloads section above the fold into an asymmetric editorial layout.
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
- Built Brain Problems section (`src/components/problems/Problems.tsx` & `src/data/problems.ts`): Updated to **"Stuff I no longer struggle with since I built Backbone"** with user's exact 5 personal experiences connected along the 5-node curved red spline, with secondary anti-copycat note placed on the left of the header row.
- Built MONEEEEY / Pricing section (`src/components/concept/`): Fully modularized into 5 isolated single-responsibility subcomponents (`ConceptAtmosphere.tsx`, `ConceptShadow.tsx`, `ConceptMedusa.tsx`, `ConceptHeadline.tsx`, and `ConceptPricing.tsx`), orchestrated cleanly by `ConceptualStatement.tsx`. Integrated custom visually-tuned atmospheric soft shadows in `ConceptShadow.tsx` (`z-[5]`) that feather across both the center mirrored background and the Medusa sculpture while preserving sharp color inversion on `ConceptHeadline` (`relative z-10`). Calibrated scroll pacing and tightened section height (`h-[130vh]`) so the cypher and pricing animations complete seamlessly without dead scroll space before transitioning to "Important Stuff".
- Built "Important Stuff" / "Read this shidd" section (`src/components/info/ImportantStuff.tsx` & `src/data/info.ts`): Integrated continuous background parallax drifting reusing the Michelangelo atmosphere artwork (`/images/this one.webp`) with film grain and obsidian edge vignettes. Implemented direct, open dark glass cards (no-accordion design) displaying top 3 priority statements by default with an editorial `[ + Read 3 more notes ]` progressive disclosure toggle containing all 6 statements (refunds, app access, heavy neuroscience foundation, anti-copycat rationale, data privacy, and the boner joke).
- Built minimal Footer (`src/components/footer/Footer.tsx`) with creator identity (Maximiliano Sors Garza) and social links.
- Built dedicated legal pages (`src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/refund/page.tsx`) implementing all owner identity, custom privacy philosophy, and Paddle-compliant unconditional 14-day refund terms (aligned with "Important Stuff" section).
- Built and tuned **TargetCursor** (`src/components/animations/TargetCursor.tsx` & `.css`): scoped strictly to the entire Downloads zone (`.cursor-target-zone`) with free-spinning reticle and button snapping, completely hidden with standard cursor across the rest of the site.
- Integrated **GlassSurface Component** (`src/components/ui/GlassSurface.tsx` & `.css`): Real SVG displacement mapping with chromatic RGB split & deep refraction for the Download buttons.
- Replaced bottom progress bar with dynamic right-aligned **LineSidebar Navigation** (`src/components/navigation/LineSidebar.tsx` & `.css`) flush with right screen margin, featuring magnetic cursor proximity physics and updated section labels (`DOWNLOAD`, `FIXES FOR U`, `MONEEEEY`, `READ THIS SHIDD`).
- Configured **OpenGraph & Twitter Card SEO metadata** in `src/app/layout.tsx`, dynamic SVG favicon (`src/app/icon.svg`), `src/app/robots.ts`, and `src/app/sitemap.ts`.
- Started Next.js development server at `http://localhost:3000`.

### Currently Working On

> Creative polish pass (paper realism texture, background atmosphere).

### Next

> - Polish the ripped paper aesthetic (paper texture, torn fiber assets, authentic lighting).
> - Finalize luxury background color tones / 4K atmosphere.

### Known Issues / Pending Tasks

- **Integrate AI-Enhanced 4K Assets**: Integrated high-resolution `this one.webp` into MONEEEEY section; pending upscaled Hero background (`crosshands.webp`).
- **Consider changing the MONEEEEY pricing text layout to 3 lines instead of 5**: Adjust typography/wrapping so "JUST ENOUGH FOR ME", "TO GO", "EAT SOMETHING NICE" render strictly as 3 lines across viewports instead of wrapping into 5 lines.
- **Verify Inverted Color Text (`mix-blend-mode: difference`) is Actually Inverted and Live**: Make sure the inverted color text on both the Hero headline and the LineSidebar navigation is truly calculating exact live color inversion against the background artwork/shadows across all screen states (fix/refine with Claude).
- **Torn / Ripped Paper Transition Edge between Hero & Downloads**: Implement an organic torn paper edge mask / SVG divider at the boundary between the pitch-black Hero section and the Downloads artwork (`crosshands.webp`) so the sculpture appears hand-torn rather than cut with a hard digital straight line.
- **Figma Red Scribble Vector for Conceptual Statement**: Draw custom red organic/chaotic scribble vector in Figma, export as SVG, and integrate behind the "BACKBONE DOES FOR OUR BRAINS WHAT THEY CAN'T DO FOR US" typography.
- **Increase and Fix Parallax on Download Section**: Refine and amplify the parallax travel & layer separation between the background imagery and the foreground download controls.
- **4K Image Enhancement & Granite/Grain Texture**: Upscale atmospheric imagery (`crosshands.webp`) to 4K (3840px) with AI to eliminate low-res softness, and apply a procedural granite/film grain noise overlay for tactile editorial finish.
- **Ripped Paper Visual Realism**: Refine the torn paper visual aesthetic in the Brain Problems section with realistic paper texture, organic high-res torn edge paths/PNGs, and authentic lighting/drop shadows (pending user asset review/polish pass).
- **Hero Video Shrink & Dissolve Transition on Scroll**: Instead of the hero video sliding up conventionally with the page, have it dynamically shrink in scale and fade out on scroll, seamlessly revealing the underlying section and atmospheric background directly behind it.
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