# Research Findings: Public Profile View Page

**Date**: 2025-11-17  
**Source**: MCP GitHub consultation of `pandamiglobal/frontend_pandami-saas` repository  
**Purpose**: Align implementation with existing SaaS module patterns

## Key Findings

### 1. SaaS Module Architecture Analysis

**Decision**: Adopt hybrid Server/Client Component architecture  
**Rationale**: The SaaS module uses `"use client"` directive for pages with interactivity, but leverages wrapper components for streaming loading states (Next.js 15 best practice)  
**Alternatives considered**: 
- Pure Server Components (insufficient for SWR data fetching)
- Pure Client Components (suboptimal performance)

### 2. Component Structure Patterns

**Decision**: Extract and adapt display components from `src/app/_components/pages/my-site/my-site-page/`  
**Rationale**: The SaaS module has well-structured components with clear separation:
- `my-site-page.view.tsx`: Main display component with tab navigation
- `my-site-page.model.ts`: Data fetching and state management
- Wrapper components for loading states and error handling

**Key components to reuse**:
- Profile header with image and basic info
- Services list with pricing and duration
- Business hours display
- Payment methods grid
- Social media links section
- Custom links section

### 3. Data Model Alignment

**Decision**: Use existing `IPublicProfile.ts` type definitions  
**Rationale**: The SaaS module has comprehensive TypeScript interfaces that match the API requirements:
- `IPublicProfileFullResponse`: Complete profile data structure
- `IPublicProfileService`: Service entity with pricing
- `IPublicProfileOpeningHour`: Business hours with weekdays
- `ICustomLink`: Custom links with active status

**Alternatives considered**: Creating new type definitions (rejected for consistency)

### 4. Data Fetching Strategy

**Decision**: Use SWR with existing server actions  
**Rationale**: The SaaS module uses `GetPublicProfileBySlugAction` server action for fetching profile data by slug. SWR provides:
- Automatic caching and revalidation
- Error handling and retry logic
- Loading states management
- Optimistic updates support

**Implementation pattern**:
```typescript
// From SaaS module pattern
const { data: profile, error, isLoading } = useSWR(
  `/public-profile/${slug}`,
  () => GetPublicProfileBySlugAction(slug)
)
```

### 5. Layout Architecture

**Decision**: Implement route-level layouts with shared components  
**Rationale**: Next.js 15 App Router best practices observed in SaaS module:
- `layout.tsx` for shared UI elements
- `loading.tsx` for route-level loading states
- Component composition for maintainability

**Structure**:
- Root layout with simplified header (logo only)
- Public profile layout with main content area
- Footer with WhatsApp button integration
- Fixed bar for persistent navigation

### 6. Component Reuse Strategy

**Decision**: Extract display-only components, remove editing functionality  
**Rationale**: The SaaS module has comprehensive display components but includes editing modals and controls. For public view:

**Components to adapt**:
- Profile header (remove edit buttons)
- Services cards (remove add/edit actions)
- Information sections (remove edit modals)
- Social links (remove add/edit functionality)

**Components to create new**:
- Simplified header bar (logo only)
- Footer bar with WhatsApp button
- Fixed bar component
- Public-specific error boundaries

### 7. Performance Optimization

**Decision**: Leverage Next.js 15 streaming and caching  
**Rationale**: Based on SaaS module patterns and requirements:
- Server Components for static content
- SWR for dynamic data with caching
- Route-level loading states for better UX
- Image optimization for profile pictures

### 8. Error Handling Strategy

**Decision**: Implement comprehensive error boundaries  
**Rationale**: Following SaaS module patterns:
- 404 handling for invalid slugs
- API error handling with retry options
- Graceful fallbacks for missing data
- User-friendly error messages

## Technical Decisions Summary

| Area | Decision | Source |
|------|----------|--------|
| Architecture | Server + Client Components | SaaS module pattern |
| Data Fetching | SWR + Server Actions | `GetPublicProfileBySlugAction` |
| Type System | Reuse `IPublicProfile.ts` | Existing interfaces |
| Component Structure | Extract/adapt from SaaS | `my-site-page` components |
| Layout | Route-level layouts | Next.js 15 best practices |
| Performance | Streaming + caching | SaaS optimization patterns |
| Error Handling | Boundaries + fallbacks | SaaS error patterns |

## Implementation Approach

1. **Phase 0**: Extract reusable display components from SaaS module
2. **Phase 1**: Create public-specific layout and navigation
3. **Phase 2**: Implement SWR data fetching with error handling
4. **Phase 3**: Add WhatsApp integration and fixed bar
5. **Phase 4**: Optimize performance and add loading states

## Alignment Verification

✅ **Domain Model**: Uses existing `IPublicProfileFullResponse` structure  
✅ **Naming Conventions**: Follows SaaS module patterns (`-view`, `-model` suffixes)  
✅ **UI Patterns**: Adapts existing card layouts and visual design  
✅ **Data Flow**: Leverages established server action patterns  
✅ **Error Handling**: Implements consistent error boundaries  

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Component coupling | Extract display-only components, avoid editing dependencies |
| API compatibility | Use existing server actions, maintain interface compatibility |
| Performance overhead | Server Components for static content, SWR caching for dynamic data |
| Visual inconsistency | Reuse exact styling classes and design tokens from SaaS module |

## Next Steps

Proceed to Phase 1 design with:
- Data model based on `IPublicProfile.ts`
- Component contracts derived from SaaS module
- API contracts using existing endpoints
- Architecture following established patterns
