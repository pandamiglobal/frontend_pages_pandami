# Feature Specification: Public Profile View Page

**Feature Branch**: `001-public-profile-view`  
**Created**: 2025-11-17  
**Status**: Draft  
**Input**: User description: "Implementar página de visualização pública do perfil profissional para usuários comuns, reaproveitando componentes do módulo SaaS, removendo funcionalidades de edição, usando SWR para consumir API GET public-profile/{slug}, com header simplificado (logo), footer com botão WhatsApp e fixed bar"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - View Professional Profile Information (Priority: P1)

A regular user visits a professional's public profile page to view their basic information, services offered, and contact details.

**Why this priority**: This is the core value proposition - allowing users to discover and learn about professionals. Without this, the feature has no purpose.

**Independent Test**: Can be fully tested by navigating to `/p/{slug}` and verifying all profile information displays correctly, including name, bio, services, contact info, and business hours.

**Acceptance Scenarios**:

1. **Given** a valid professional slug, **When** user navigates to `/p/{slug}`, **Then** the page displays professional's name, bio, profile image, and business information
2. **Given** the profile has services listed, **When** user views the page, **Then** all services are displayed with name, description, price range, and duration
3. **Given** the profile has business hours configured, **When** user views the page, **Then** opening hours for each day of the week are displayed
4. **Given** the profile has contact information, **When** user views the page, **Then** phone number (if enabled) and address (if enabled) are visible

---

### User Story 2 - View Professional Social and Custom Links (Priority: P2)

A user wants to connect with the professional via social media platforms and access their custom links.

**Why this priority**: Social proof and additional resources are important for user decision-making, but the profile is still valuable without them.

**Independent Test**: Can be tested by verifying social media links and custom links navigate to the correct platforms.

**Acceptance Scenarios**:

1. **Given** the profile has social media links configured, **When** user views the page, **Then** Instagram, WhatsApp, TikTok, and LinkedIn links are visible and functional
2. **Given** the profile has custom links, **When** user views the page, **Then** custom links are displayed with their names and navigate correctly

---

### User Story 3 - Contact Professional via WhatsApp (Priority: P2)

A user wants to quickly contact the professional through WhatsApp after viewing their profile.

**Why this priority**: Direct contact is a key conversion action, making it easy to reach out increases engagement.

**Independent Test**: Can be tested by clicking the WhatsApp button in the footer and verifying it opens WhatsApp with the correct number.

**Acceptance Scenarios**:

1. **Given** user is viewing a profile, **When** user clicks the WhatsApp button in the footer, **Then** WhatsApp opens with the professional's phone number pre-filled
2. **Given** the professional has WhatsApp link configured, **When** user clicks the WhatsApp social link, **Then** WhatsApp opens with the professional's number

---

### User Story 4 - View Payment Methods (Priority: P3)

A user wants to know which payment methods the professional accepts before booking a service.

**Why this priority**: Helpful information but not critical for initial profile viewing. Users can inquire about payment later.

**Independent Test**: Can be tested by verifying payment method icons/labels display correctly when configured.

**Acceptance Scenarios**:

1. **Given** the profile has payment methods configured, **When** user views the page, **Then** all accepted payment methods (Cash, Credit Card, Debit Card, PIX, Bank Transfer) are displayed with appropriate icons

---

### User Story 5 - Handle Invalid or Non-existent Profiles (Priority: P1)

A user attempts to access a profile that doesn't exist or has an invalid slug.

**Why this priority**: Error handling is critical for good user experience and preventing broken states.

**Independent Test**: Can be tested by navigating to `/p/invalid-slug` and verifying appropriate error handling.

**Acceptance Scenarios**:

1. **Given** an invalid or non-existent slug, **When** user navigates to `/p/{invalid-slug}`, **Then** a user-friendly "Profile not found" message is displayed
2. **Given** a profile fetch error, **When** the API returns an error, **Then** an appropriate error message is shown to the user

### Edge Cases

- What happens when a profile has no services configured? Display empty state with message "No services available"
- What happens when a profile has no business hours? Hide business hours section
- What happens when API is slow or times out? Show loading skeleton, then error message with retry option after timeout
- What happens when profile image fails to load? Display fallback placeholder image or initials
- What happens when social media links are malformed? Validate and sanitize URLs, hide invalid links
- What happens when user has slow internet connection? Show progressive loading with skeleton states
- What happens when profile data is partially loaded? Display available data and show loading states for pending sections
- What happens when WhatsApp button is clicked but user doesn't have WhatsApp installed? Open WhatsApp Web as fallback
- What happens when custom links exceed reasonable display limits? Implement scrolling or "show more" pattern

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

**Data Fetching & Display**
- **FR-001**: System MUST fetch profile data from GET `/public-profile/{slug}` API endpoint using SWR for caching and revalidation
- **FR-002**: System MUST display professional's name, bio, profile image, business name, city, and state
- **FR-003**: System MUST display all configured services with name, description, price range (from-to), and duration in hours
- **FR-004**: System MUST display business hours for each day of the week with start and end times
- **FR-005**: System MUST display payment methods that are marked as active (Cash, Credit Card, Debit Card, PIX, Bank Transfer)
- **FR-006**: System MUST respect profile visibility settings (show_phone, show_address, show_links)

**Navigation & Layout**
- **FR-008**: System MUST render page at route `/p/[public-profile]` where `[public-profile]` is the professional's slug
- **FR-009**: System MUST display a simplified header containing only the application logo
- **FR-010**: System MUST display a footer with a WhatsApp contact button
- **FR-011**: System MUST implement a fixed bar component for persistent navigation or actions

**Social & Contact Links**
- **FR-012**: System MUST display active social media links (Instagram, WhatsApp, TikTok, LinkedIn) when configured
- **FR-013**: System MUST display custom links with their names when configured and active
- **FR-014**: System MUST open WhatsApp with pre-filled professional phone number when WhatsApp button is clicked
- **FR-015**: System MUST display phone number only when show_phone setting is enabled
- **FR-016**: System MUST display address (street, number, city, state, postal code) only when show_address setting is enabled

**Component Reuse & Architecture**
- **FR-017**: System MUST consult the public-profile module in `pandamiglobal/frontend_pandami-saas` repository via MCP GitHub to align domain model, naming conventions, and UI patterns
- **FR-018**: System MUST reuse display components from the SaaS module, removing all editing functionality
- **FR-019**: System MUST maintain the same visual design and card layouts for services, information, and configuration sections
- **FR-020**: System MUST follow SOLID principles in component architecture with clear separation of concerns
- **FR-021**: System MUST NOT include any form inputs, edit buttons, or administrative functionality

**Error Handling & Loading States**
- **FR-022**: System MUST display loading skeleton while fetching profile data
- **FR-023**: System MUST display user-friendly error message when profile is not found (404)
- **FR-024**: System MUST display error message with retry option when API request fails
- **FR-025**: System MUST handle missing or null data gracefully by hiding optional sections
- **FR-026**: System MUST display fallback image when profile image fails to load

**Next.js 15 Best Practices**
- **FR-027**: System MUST follow Next.js 15 App Router architecture using `app/` directory structure
- **FR-028**: System MUST use Server Components by default, applying `"use client"` directive only where client-side interactivity is required (SWR hooks, user interactions)
- **FR-029**: System MUST implement route-level loading states using `loading.tsx` file convention
- **FR-030**: System MUST use Next.js 15 file-based routing with dynamic segments (`[public-profile]`)
- **FR-031**: System MUST leverage layout composition with `layout.tsx` for shared UI elements (header, footer)
- **FR-032**: System MUST avoid duplicating data fetching logic between server and client when server-side fetching is viable

### Key Entities

- **Public Profile**: Represents a professional's public-facing profile containing personal information (name, bio, profile image), business details (business name, location), and visibility preferences (show_phone, show_address, show_links)

- **Service**: Represents a service offered by the professional with descriptive information (name, description), pricing details (price_from, price_to), and time commitment (duration_hours)

- **Business Hours**: Represents operating schedule with day of week (weekday), time range (start_time, end_time), and availability status (active)

- **Payment Method**: Represents accepted payment options with method type (Cash, Credit Card, Debit Card, PIX, Bank Transfer) and acceptance status (active)

- **Custom Link**: Represents additional external links with display name (name), destination (url), and visibility status (active)

- **Social Media Links**: Represents professional's social media presence across platforms (instagram_link, whatsapp_link, tiktok_link, linkedin_link)

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Profile page loads and displays complete information within 3 seconds on standard internet connection
- **SC-002**: Users can view all profile sections (services, hours, contact, social links) without scrolling more than 3 screen heights
- **SC-003**: 95% of users successfully navigate to WhatsApp contact within 10 seconds of viewing profile
- **SC-004**: Zero editing functionality or administrative controls are accessible to regular users
- **SC-005**: Profile page correctly handles and displays all data types (text, images, links) without layout breaks
- **SC-006**: Error states (404, API failures) display clear actionable messages within 2 seconds of error occurrence
- **SC-007**: Loading skeletons appear immediately (< 100ms) when navigating to profile page
- **SC-008**: All reused components from SaaS module maintain visual consistency with original design
- **SC-009**: Page remains functional and displays available data even when optional sections (custom links, social links) are empty
- **SC-010**: WhatsApp contact button generates correctly formatted WhatsApp link with professional's phone number 100% of the time

## Assumptions

1. **Framework**: Implementation is based on Next.js 15 App Router with modern React patterns
2. **API Availability**: The GET `/public-profile/{slug}` endpoint is already implemented and returns data in the same format as the SaaS module
3. **Component Compatibility**: Display components from the SaaS module can be extracted and reused without major refactoring
4. **Slug Uniqueness**: Professional slugs are unique across the system and validated at creation time
5. **Image Hosting**: Profile images are hosted and accessible via URLs provided by the API (gallery images are out of scope)
6. **Mobile Responsiveness**: All reused components are already mobile-responsive and will work on the public view
7. **Browser Support**: Target browsers support modern JavaScript features required by SWR and React
8. **WhatsApp Integration**: Opening WhatsApp links works consistently across mobile and desktop browsers
9. **No Authentication**: Public profile pages are accessible without user authentication
10. **SEO Not Required**: Initial implementation does not need server-side rendering or SEO optimization
11. **Existing Route Structure**: The `/p/[public-profile]` route structure is already defined in the project

## Dependencies

1. **SaaS Module Components**: Requires access to display components from `pandamiglobal/frontend_pandami-saas` repository (consulted via MCP GitHub)
2. **API Endpoint**: Depends on backend API endpoint `/public-profile/{slug}` being available and stable
3. **SWR Library**: Requires SWR library for data fetching and caching
4. **Image CDN**: Depends on image hosting service for profile images
5. **Existing Design System**: Relies on existing UI components, styling, and design tokens
6. **Type Definitions**: Requires TypeScript interfaces matching the API response structure
7. **Next.js 15**: Project must be using Next.js 15 with App Router enabled

## Out of Scope

1. **Gallery/Portfolio Images**: No image gallery or portfolio section in public view
2. **Profile Editing**: No functionality for professionals to edit their profiles (handled in SaaS module)
3. **User Authentication**: No login or authentication required for viewing profiles
4. **Booking System**: No appointment booking or scheduling functionality
5. **Payment Processing**: No payment or transaction functionality
6. **Reviews/Ratings**: No user review or rating system
7. **Search/Discovery**: No search functionality to find professionals (separate feature)
8. **Analytics**: No tracking or analytics for profile views
9. **SEO Optimization**: No server-side rendering or meta tag optimization in initial version
10. **Multi-language Support**: Single language only (Portuguese assumed)
11. **Admin Controls**: No moderation or administrative features for profiles
12. **Notifications**: No notification system for contact attempts
13. **Profile Sharing**: No social media sharing buttons or share functionality

## Clarifications

### Session 2025-11-17

- **Q**: Should the public profile page display a gallery of images?  
  **A**: No. Gallery/portfolio images are out of scope for the public view. Only profile image is displayed.

- **Q**: How should we ensure alignment with the SaaS module's public-profile implementation?  
  **A**: Consult the `pandamiglobal/frontend_pandami-saas` repository via MCP GitHub to review the public-profile module's domain model, naming conventions, and UI patterns before implementation.

- **Q**: What framework best practices should be followed?  
  **A**: Implementation must follow Next.js 15 App Router best practices, including Server Components by default, `"use client"` only where needed, route-level loading states with `loading.tsx`, and layout composition with `layout.tsx`.
