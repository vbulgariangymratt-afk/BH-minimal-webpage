# Backbone Webpage Development Guidelines

## 1. Design Specification Source of Truth
- Always reference and adhere to `docs/design_specification.md` as the primary source of truth for WHAT the website should be.
- **Scope of truth**: Page structure, copy/content, visual design, interactions, animations, UX, and pricing presentation.
- **Constraints**:
  - Do NOT invent, add, or remove major sections or functionality without prior user discussion and approval.
  - Do NOT treat future possibilities or ideas mentioned in the spec as implemented requirements.
  - Do NOT modify `docs/design_specification.md` unless explicitly instructed by the user.

## 2. Technical Architecture Constraints (HOW the Website is Built)
- Always reference and adhere to `docs/technical_architecture.md` as the source of truth for architecture and code structure.
- **Core Architecture Rules**:
  - **No God Files**: Never place unrelated responsibilities (page markup, integrations, animations, utils, pricing, analytics) into a single file.
  - **Separation of Concerns**: UI components handle rendering/presentation. Business logic, non-visual utilities, and integrations must live in separate modules.
  - **Component Independence**: Major sections (Hero, Downloads, Problems, Concept, Pricing, Post-purchase/Info, Footer) must be independent components.
  - **Isolated Integrations**: External services (Lemon Squeezy, PostHog, GitHub downloads) must be isolated in dedicated integration modules.
  - **Reuse Working Code**: Reuse existing working implementations (e.g. GitHub release downloads, OS detection) rather than rebuilding them from scratch.
  - **Minimal Dependencies & Simplicity**: Avoid introducing unnecessary libraries, enterprise abstractions, state management, or backend infrastructure unless required by a concrete requirement.
  - **Architectural Conflicts**: If a requested change conflicts with the architectural rules, explain the conflict explicitly to the user before proceeding rather than silently violating the architecture.
  - Do NOT modify `docs/technical_architecture.md` unless explicitly instructed by the user.

## 3. Development Progress (Implementation State)
- Always reference `docs/development_progress.md` as the source of truth for the CURRENT IMPLEMENTATION STATE.
- **Rules**:
  - Do NOT assume a feature is built merely because it is described in the Design Specification.
  - Check `docs/development_progress.md` to see what is completed, currently in progress, and planned next.
  - When completing meaningful development work (major features, architectural changes, or milestone decisions), update `docs/development_progress.md` concisely and accurately.
  - Do not modify the progress document merely from reading it.
