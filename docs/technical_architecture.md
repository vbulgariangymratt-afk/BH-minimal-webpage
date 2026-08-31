# Backbone Website — Technical Architecture

> **Purpose**
> 
> 
> This document defines how the Backbone website codebase must be structured and maintained.
> 
> It is separate from the Design Specification, which defines what the website should look like and how it should behave.
> 
> The goal is to keep the codebase simple, understandable, maintainable, and easy to modify with AI coding tools.
> 
> This is a small website for a solo developer. Do not introduce enterprise-level architecture or unnecessary infrastructure.
> 

---

## 1. Core Architecture Principles

> The following principles are mandatory:
> 
> 
> **1. Separation of concerns**
> 
> Different responsibilities should live in different files/modules.
> 
> UI components should primarily be responsible for rendering and presentation.
> 
> External services, business logic, data processing, analytics, and other non-visual functionality should be separated from UI components.
> 
> **2. Component-based architecture**
> 
> The website should be composed of independent React components rather than one large component containing the entire page.
> 
> Major sections of the website should have their own components.
> 
> **3. Reuse existing implementations**
> 
> Before creating new functionality, check whether an existing component, utility, integration, animation, or implementation can be reused.
> 
> Existing working functionality should not be unnecessarily rewritten.
> 
> **4. Minimal architecture**
> 
> Use the simplest architecture that satisfies the requirements.
> 
> Do not introduce additional services, libraries, abstractions, databases, APIs, state-management systems, or infrastructure unless they solve an actual requirement.
> 
> **5. Easy AI-assisted maintenance**
> 
> Code should be organized so that a developer or AI coding assistant can locate and modify one specific part of the website without needing to understand the entire codebase.
> 

---

# 2. No God Files

> **A single file must not become responsible for the entire website.**
> 
> 
> A “God file” is a file that contains multiple unrelated responsibilities or becomes the central location for most of the application's code.
> 
> Examples of things that should **not** all exist inside one file:
> 
> - Entire page markup
> - All website sections
> - Animation logic
> - Paddle integration
> - GitHub download logic
> - PostHog analytics
> - OS detection
> - Pricing data
> - Legal content
> - Utility functions
> 
> These responsibilities must be separated into appropriate components/modules.
> 
> ### Page-level rule
> 
> The main page component should primarily compose the website's sections.
> 
> Conceptually:
> 
> `Page → Hero → Problems → Concept → Pricing → Information → Footer`
> 
> rather than:
> 
> `Page → contains the implementation of everything`
> 
> ### Component-size rule
> 
> If a component becomes large enough that a distinct section, interaction, or responsibility can reasonably be extracted into its own component, extract it.
> 
> Do not split tiny pieces of code into dozens of meaningless files merely to satisfy this rule.
> 
> The goal is **meaningful separation**, not maximum fragmentation.
> 
> ### Responsibility rule
> 
> A file should have a clear primary responsibility.
> 
> If a file starts accumulating unrelated responsibilities, stop and determine whether those responsibilities should be extracted.
> 

---

# 3. Recommended Project Structure

> Use a clear structure that separates pages, visual components, integrations, utilities, and content.
> 
> 
> A recommended structure is:
> 
> ```
> src/
> ├── app/
> │   ├── page.tsx
> │   ├── layout.tsx
> │   └── legal/
> │
> ├── components/
> │   ├── hero/
> │   ├── problems/
> │   ├── pricing/
> │   ├── downloads/
> │   ├── footer/
> │   ├── animations/
> │   └── ui/
> │
> ├── integrations/
> │   ├── paddle/
> │   ├── posthog/
> │   └── github/
> │
> ├── data/
> │
> ├── lib/
> │
> └── ...
> ```
> 
> This is a starting structure, not a requirement to create every folder immediately.
> 
> Only create directories/files when they are actually needed.
> 

---

# 4. Component Boundaries

> Major visual sections should be independent React components.
> 
> 
> At minimum, the following major areas should be independently maintainable:
> 
> - Hero
> - Download controls
> - Brain-problems section
> - Conceptual statement
> - Pricing
> - Post-purchase/information section
> - Footer
> 
> Individual animations and complex interactions should also be isolated where appropriate.
> 
> A component should not directly contain unrelated external-service logic when that logic can reasonably be isolated.
> 
> Components should communicate through clear props and well-defined interfaces rather than relying on hidden global state.
> 

---

# 5. External Integrations

> External services must be isolated from the visual components of the website wherever practical.
> 
> 
> ### Paddle
> 
> Paddle-related configuration and integration logic should live in the Paddle integration layer.
> 
> Do not scatter Paddle-specific logic throughout unrelated components.
> 
> ### GitHub Downloads
> 
> The existing GitHub download implementation must be preserved.
> 
> The download URLs, OS detection behavior, and existing functionality are defined in the Design Specification / existing-download requirements.
> 
> The new website should reuse/adapt the existing implementation rather than unnecessarily recreating it.
> 
> ### PostHog
> 
> PostHog analytics should be initialized and managed through a dedicated analytics integration rather than having analytics implementation duplicated throughout components.
> 
> ### Supabase
> 
> Supabase belongs primarily to the Backbone application/backend.
> 
> Do not introduce Supabase into the website unless a specific website requirement requires it.
> 

---

# 6. Content & Configuration

> Website copy should be kept separate from complex application logic wherever practical.
> 
> 
> Content that is likely to change — such as:
> 
> - Pricing
> - Problem statements
> - Legal/contact information
> - Download labels
> - Section text
> 
> should not be unnecessarily buried inside unrelated implementation logic.
> 
> However, do not create an unnecessary content-management system or database for static website content.
> 
> Simple local data/constants are sufficient.
> 

---

# 7. Animation Architecture

> Animations should be treated as independent visual systems rather than being mixed into unrelated business logic.
> 
> 
> When an existing animation implementation or library is provided in the **Animation & Asset References** section:
> 
> 1. Inspect the existing implementation.
> 2. Reuse or adapt it where practical.
> 3. Do not unnecessarily recreate an existing effect from scratch.
> 
> Complex animation logic should not make the main page component unnecessarily large.
> 
> Animations must not compromise:
> 
> - Page performance
> - Mobile usability
> - Accessibility
> - Normal scrolling
> - Interaction with buttons/links
> 
> Reduced-motion preferences should be respected where appropriate.
> 

---

# 8. Environment Variables & Secrets

> Private credentials and secrets must never be hardcoded into client-side source code.
> 
> 
> Use environment variables or the appropriate secure configuration mechanism for:
> 
> - Paddle secrets
> - Webhook secrets
> - Private API credentials
> - Other sensitive configuration
> 
> Public configuration values may be exposed to the browser when the relevant service explicitly requires it.
> 
> Never commit private credentials to GitHub.
> 

---

# 9. Responsive Architecture

> The website must be designed for both desktop and mobile.
> 
> 
> Desktop-only interactions, such as the Target Cursor, should not be forced onto mobile devices.
> 
> Complex horizontal scrolling and animation systems must have an intentional mobile behavior rather than simply assuming desktop dimensions.
> 
> Mobile should remain usable even when animations are simplified or disabled.
> 

---

# 10. Development Rules for Gemini

> **Before writing code:**
> 
> 1. Read the Design Specification.
> 2. Read this Technical Architecture document.
> 3. Inspect the existing website/codebase.
> 4. Identify existing functionality that should be reused.
> 5. Determine where the new functionality belongs within the architecture.
> 
> **While coding:**
> 
> - Do not create God files.
> - Do not put unrelated responsibilities into the same module.
> - Do not duplicate existing functionality.
> - Do not recreate existing implementations unnecessarily.
> - Do not introduce dependencies without a reason.
> - Do not introduce backend infrastructure unless required.
> - Do not modify working functionality without understanding why it exists.
> - Keep components focused on clear responsibilities.
> - Prefer simple solutions over elaborate abstractions.
> 
> **When modifying the website:**
> 
> A change to one section should not require editing an unrelated collection of files.
> 
> If a proposed implementation would require putting a large amount of unrelated logic into an existing file, stop and restructure the implementation before continuing.
> 

---

# 11. Decision Rule

> When there are multiple technically valid approaches, prefer the approach that:
> 
> 1. Requires fewer moving parts.
> 2. Reuses existing working code.
> 3. Is easier for a solo developer and AI coding tools to understand.
> 4. Keeps responsibilities separated.
> 5. Introduces fewer dependencies.
> 6. Is easier to remove or replace later.
> 
> **Do not optimize for architectural sophistication. Optimize for simplicity and maintainability.**
> 

---