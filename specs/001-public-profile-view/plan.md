# Implementation Plan: Public Profile View Page

**Branch**: `001-public-profile-view` | **Date**: 2025-11-17 | **Spec**: [specs/001-public-profile-view/spec.md](specs/001-public-profile-view/spec.md)
**Input**: Feature specification from `/specs/001-public-profile-view/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a public-facing professional profile view page that reuses display components from the SaaS module while removing all editing functionality. The page will use SWR for data fetching, follow Next.js 15 App Router best practices with Server Components by default, and include a simplified header, footer with WhatsApp button, and fixed bar component. Implementation must align with the `pandamiglobal/frontend_pandami-saas` public-profile module patterns.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x, React 18+, Next.js 15 App Router  
**Primary Dependencies**: SWR, TailwindCSS, shadcn/ui, Lucide React, Radix UI  
**Storage**: No local storage required (read-only public data)  
**Testing**: Jest + React Testing Library for unit tests, Playwright for E2E  
**Target Platform**: Web (mobile-first responsive design)  
**Project Type**: Web application with Next.js 15 App Router  
**Performance Goals**: <3s page load time, <100ms interaction response, <50MB memory usage  
**Constraints**: Must follow SOLID principles, use Server Components by default, implement loading states  
**Scale/Scope**: Single page feature with reusable components, supporting 10k+ concurrent profile views

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**✅ GATE PASSED**: No constitution violations detected. Implementation follows:
- SOLID principles with clear component separation
- Server Components by default (Next.js 15 best practice)
- No authentication required for public access
- Component reuse from existing SaaS module
- Clean architecture with proper error handling

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Web application structure (selected)
src/
├── app/
│   ├── (public)/
│   │   ├── p/
│   │   │   ├── [public-profile]/
│   │   │   │   ├── page.tsx           # Main public profile page
│   │   │   │   ├── loading.tsx        # Route-level loading state
│   │   │   │   └── layout.tsx         # Public profile layout
│   │   │   └── layout.tsx             # Public routes layout
│   │   └── layout.tsx                 # Root public layout
│   └── _components/
│       ├── pages/
│       │   └── public-profile/
│       │       ├── public-profile-page/
│       │       │   ├── public-profile-page.view.tsx    # Display component (reused)
│       │       │   └── public-profile-page.model.ts   # Data fetching hook
│       │       └── components/
│       │           ├── profile-header/                 # Profile header component
│       │           ├── services-list/                  # Services display
│       │           ├── contact-section/                # Contact info
│       │           └── whatsapp-button/                # WhatsApp CTA
│       ├── molecules/
│       │   ├── header-bar/                             # Simplified header with logo
│       │   ├── footer-bar/                             # Footer with WhatsApp button
│       │   └── fixed-bar/                              # Fixed navigation bar
│       └── organisms/
├── hooks/
│   └── use-public-profile.ts                           # SWR data fetching hook
├── types/
│   └── IPublicProfile.ts                               # Type definitions (aligned)
└── server/
    └── actions/
        └── get-public-profile.action.ts               # Server action (existing)

__tests__/
├── unit/
│   ├── public-profile-page.test.tsx
│   └── use-public-profile.test.ts
└── e2e/
    └── public-profile.spec.ts
```

**Structure Decision**: Selected web application structure with Next.js 15 App Router. Public profile page implemented as Server Component with Client Component wrapper for SWR data fetching and user interactions. Components organized by feature with clear separation between display (view) and data logic (model).

## Complexity Tracking

> **No complexity violations** - Implementation follows established patterns

| Aspect | Approach | Rationale |
|---------|----------|-----------|
| Component Architecture | Server Components + Client Components for interactivity | Next.js 15 best practice, optimal performance |
| Data Fetching | SWR with Server Actions | Caching, revalidation, error handling |
| Component Reuse | Extract display components from SaaS module | Consistency, reduced development time |
| Layout Structure | Route-level layouts with shared components | Code reuse, maintainable structure |
