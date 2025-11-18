---
trigger: always_on
---

## Project Architecture & Structure


# Libraries



https://magicui.design/ for visually apelling components.


# Frontend Architecture Guide - Next JS 15 

## Project Overview
Please always refer to #file:../pandami.mdc for project specific context.

## When creating new sections from briefing or from scratch
Please consider refer to #file:../uxpilot.mdc for best pratices envolving interface generation.

## Fonts

When modifying font configuration, reference #file:globals.css #file:layout.tsx #file:tailwind.config.js as fonts are configured in these files. Ensure consistency to avoid build errors. Follow Clean Code principles and development best practices.

- Global styles already define Fahkwang for h1, h2, h3 and Ubuntu at :root
- Prefer using project-defined fonts unless specifically needed otherwise
- Avoid 'font-['Fahkwang']' or 'font-['Ubuntu']' in Tailwind classes - global classes are already defined
- Use TailwindCSS utility classes for additional styling (font weight, size, spacing)

## Styling Guidelines

- Always prefer TailwindCSS for styling, avoid pure CSS
- Use TailwindCSS CSS variables from "#file:@/styles/globals.css" for backgrounds, foregrounds, primary colors, and gradients
- Maintain visual consistency with TailwindCSS utility classes
- Check existing sections for styling and semantic structure consistency
- Follow componentization patterns, creating reusable components when needed
- Design responsively from the start using TailwindCSS utility classes
- Always use the &lt;section&gt; tag for new page sections
- Define an id for each section (lowercase, no spaces) - e.g., id="pricing"
- Wrap section content with &lt;Container&gt; for consistent alignment and spacing
- Use descriptive titles with appropriate heading tags (&lt;h2&gt; or &lt;h3&gt;)
- Prefer CSS variables from "#file:@/styles/globals.css" for colors
- Use "lucide-react" icons for visual consistency; use simple-icons for brand/social media icons
- Use "neutral" gray color classes
- Style sections with TailwindCSS utility classes matching overall design
- Use Primary Button for primary actions and Secondary Button for secondary actions
- **Utility-First**: Tailwind CSS with custom CSS variables
- **Component Variants**: class-variance-authority for component styling
- **Conditional Classes**: clsx and tailwind-merge via `cn()` utility
- Prioritize using styles from variables defined in `globals.css` for accent, primary, secondary, background, text colors
- Use Tailwind classes directly in components when no corresponding variable exists in `globals.css`
- For consistent colors, use variables defined in globals.css
- Main scheme: Dark background (#0F0E0D), light text (#F7F7F7), green highlight (#27D182)
- Main gradient: Blue (#017DDD) → Green (#27D182) → Yellow (#FAD007) with stops at 0%, 52%, 100%

## Core Technologies

- **Next.js 15**: React application with App Router
- **next-intl**: Internationalization system for multi-language support (pt/en)
- **TailwindCSS**: Styling with custom color scheme
- **Radix UI**: Accessible UI components
- **Lucide Icons**: Icon library used throughout the application


### Type Definitions (`src/@types/`)

- Centralized TypeScript interfaces and types

- Naming convention: `I[EntityName].ts` (e.g., `IUser.ts`, `IAuthentication.ts`)

- Contains business domain types like authentication, authorization, pagination, etc.

  

### App Router (`src/app/`)

```

src/app/

├── (private)/              # Protected routes (requires authentication)

│   ├── dashboard/          # Main dashboard with dynamic [id] routes

│   └── visagism/           # Visagism features with forms and [id] routes

├── (public)/               # Public routes (no authentication required)

│   ├── auth/               # Authentication pages (sign-in, sign-up)

│   └── free-trial/         # Free trial flow with gender selection

├── globals.css             # Global styles and Tailwind imports

├── layout.tsx              # Root layout with fonts and toast provider

└── page.tsx                # Home page

```

  

### Components (`src/app/_components/`)

```

src/app/_components/

├── pages/                  # Page-specific components

├── sections/               # Reusable section components

├── svg/                    # Custom SVG components

└── ui/                     # shadcn/ui components (auto-generated)

```

  

### Utilities (`src/lib/`)

- `utils.ts` - Utility functions including:

  - `cn()` for className merging with Tailwind

  - Brazilian mobile phone validation and formatting

  - Date formatting for Brazilian locale

  - Base64 to File conversion utilities

  

### Server Layer (`src/server/`)

```

src/server/

├── actions/                # Server actions

├── axios/                  # Axios interceptors and configuration

├── services/               # API service layer

├── api.ts                  # Main API client with interceptors

└── response-codes.ts       # HTTP response code definitions

```

  

### State Management (`src/stores/`)

- Zustand stores only for persistence, not for fetch like SWR

- Example: `user.store.ts` for user authentication state

  

## Architectural Patterns

  

### Route Organization

- **Route Groups**: `(private)` and `(public)` for authentication-based organization

- **Dynamic Routes**: `[id]` pattern for entity-specific pages

- **Nested Layouts**: Leverage Next.js App Router layout system

  

### Component Organization

- **UI Components**: Auto-generated shadcn/ui components in `components/ui/`

- **Page Components**: Specific to individual pages in `components/pages/`

- **Section Components**: Reusable across multiple pages in `components/sections/`

  

### State Management

- **Global State**: Zustand with persistence for user data

- **Form State**: React Hook Form with Zod validation

- **Server State**: Axios with custom interceptors for API communication

  

### Styling Approach

- **Utility-First**: Tailwind CSS with custom CSS variables

- **Component Variants**: class-variance-authority for component styling

- **Conditional Classes**: clsx and tailwind-merge via `cn()` utility


### Design Patterns

We follow Atomic Design and Clean Architecture principles:

#### 1. Atomic Design

Components organized by complexity hierarchy:
- **Atoms**: Basic components like buttons, inputs, icons (`@/app/_components/atoms/`)
- **Molecules**: Combinations of atoms forming simple functional components
- **Organisms**: Complex UI sections like headers, footers, etc.
- **Templates**: Layouts defining structure without specific content
- **Pages**: Templates populated with real data for user interaction

#### 2. Container-Presentational Pattern

Separation of business logic components (containers) from pure presentation components:
- **Container Components**: Handle logic, state, and requests
- **Presentational Components**: Focus only on rendering UI based on props

#### 3. Data Fetching Patterns

Using Next.js recommended data fetching patterns:
- **Server Components**: Prioritize server-side data fetching when possible
- **Parallelization**: Use parallel requests when appropriate
- **Fetch Where Needed**: Fetch data in the component that needs it, leveraging Next.js automatic memoization

## Patterns & Conventions

## General Instructions/Guidelines
These are architectural instructions that you should follow to create new React components/pages using the NextJS framework.

Every component created should follow the conventions and patterns established in this project, including folder structure, file naming, and coding styles.

### Naming Convention
File and folder names should be descriptive and follow the kebab-case convention and should be written in English. For example:
- Components: `component-name.tsx`
- Pages: `page-name/page.tsx`

### Architecture Structure
When creating components should be modularized and organized according to their responsibilities. Here is the full file structure:

- View: `component.view.tsx` 
- Model: `component.model.ts`
- Type: `component.type.ts` (only when necessary)
  
Each file has its own responsibility within the component lifecycle. View files are responsible for component presentation, Model handles business logic and interaction logic, and Type defines the types used (component-specific types).

You should use full structure for:
- Organisms and Pages (complex components)
- Components with business logic
- Reusable, testable components

Simplify for atoms/molecules:
- Single .tsx file if no logic
- Add .type.ts only if types are reused


// page.tsx - App Router Page (only) -> Orchestrator/Entry Point
// - Fetches server data (if RSC)
// - Composes view 

// component.model.ts - Business/Interaction Logic
// - Custom hooks (useState, useEffect, etc.)
// - Client-side state management
// - Data transformations, calculations
// - Event handlers logic
// - Used in views

// component.view.tsx - Pure Presentation
// - TSX only Client Component
// - Receives props, renders UI
// - No logic beyond conditional rendering

For pages, you should create their components inside ('@/app/_components/pages/**') follow the file organization pattern when necessary.

- View: `page.view.tsx`
- Model: `page.model.ts` 
- Type: `page.type.ts` (only when necessary, like validation schemas, data interface, enums or forms validation);
  
Then,

- Import the view in the respective `page.tsx` in app router, either (private) or (public).



## Best Practices

### Components

1. **Naming**: Use PascalCase for components and camelCase for functions/variables, clear boundaries between layers
2. **Organization**: Each component should have its own directory when needed
3. **Typing**: Use TypeScript to explicitly define props with interfaces and maps
4. **Props**: Destructure props and use default values when applicable
5. **Server vs Client**: Prefer Server Components when no state or interactivity is needed
6. **Modularization**: Keep components small and focused on single responsibility

```tsx
// Example component structure
// @/app/_components/feature/FeatureName/FeatureName.tsx

import styles from './FeatureName.module.css';

export interface IFeatureName {
  prop1: string;
  prop2?: number;
}

export default function FeatureName({ prop1, prop2 = 0 }: IFeatureName) {
  return (
    <div className={styles.container}>
      <h3>{prop1}</h3>
      <p>{prop2}</p>
    </div>
  );
}
```

### Performance

1. **Lazy Loading**: Use dynamic imports for large or rarely used components
2. **Images**: Optimize images using `next/image` component
3. **Memoization**: Use `useMemo` and `useCallback` to prevent unnecessary re-renders
4. **Server Components**: Prioritize Server Components to reduce client-side JavaScript

### SEO & Accessibility

1. **Metadata**: Use appropriate metadata on each page
2. **Semantics**: Use semantic and appropriate HTML elements
3. **ARIA**: Add ARIA attributes and ALT text when needed for accessibility
4. **Contrast**: Ensure colors have sufficient contrast


## Global Types Organization

### Type Definitions (`src/types/`)

- **Centralized TypeScript interfaces and types**
- **Naming convention**: `I[EntityName].ts` (e.g., `IUser.ts`, `IAuthentication.ts`)
- **Contains business domain types** like authentication, authorization, pagination, etc.

### When to Use Global Types

#### ✅ **Use Global Types When:**
- **Cross-component usage**: Types used in multiple components/pages
- **API responses**: Server response interfaces and data structures

- **Business domain entities**: User, Organization, Plan, Report, etc.
- **Shared interfaces**: Common props, form data, or state structures
- **Reusable types**: Types that represent core business concepts

#### ❌ **Don't Use Global Types When:**
- **Component-specific props**: Simple props used only in one component
- **Local 