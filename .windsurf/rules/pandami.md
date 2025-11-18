---
trigger: always_on
---

# Project Specfic Context - Pandami

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes. Avoid Emojis when answering me.

This project is a mobile-first app built with most recent front-end frameworks such as Next.js ^15.4, TailwindCSS ^4.1, with Shadcn UI dependencies.

## Consider reter to
 #file:../uxpilot.mdc for best pratices envolving interface generation.
 #file:../frontend.mdc for Next.js pratices.


## Frontend Architecture

### Next.js App Router + MVC Pattern
Use `page.tsx` files in app router only to import page components created in `@/app/_components/pages`. Each page component follows MVC (Model-View-Controller) taxonomy for clean separation of concerns.

### MVC Structure in Next.js

#### **Model** (`*.model.ts`)
- **Purpose**: Data logic, API calls, state management, business rules
- **Location**: `@/app/_components/pages/[feature]/[page]/[page].model.ts`
- **Contains**: 
  - Data fetching functions
  - State management (zustand/redux)
  - Business logic
  - API service calls
  - Data transformation utilities

#### **View** (`*.view.tsx`)
- **Purpose**: Pure UI components, presentation layer
- **Location**: `@/app/_components/pages/[feature]/[page]/[page].view.tsx`
- **Contains**:
  - JSX/TSX markup
  - Styling (TailwindCSS)
  - UI state (loading, error states)
  - Event handlers (passed as props)
  - Accessibility attributes

#### **Controller** (`*.tsx` - main page component)
- **Purpose**: Orchestrates Model and View, handles user interactions
- **Location**: `@/app/_components/pages/[feature]/[page]/[page].tsx`
- **Contains**:
  - Event handlers
  - Form validation
  - Navigation logic
  - Data flow coordination
  - Error handling

### File Naming Convention
```
@/app/_components/pages/
├── (feature)/
│   ├── page-name/
│   │   ├── page-name.tsx          # Controller
│   │   ├── page-name.view.tsx     # View
│   │   └── page-name.model.ts     # Model
```

### MVC Flow
1. **Controller** receives user interactions
2. **Controller** calls **Model** methods for data/business logic
3. **Model** returns data/state to **Controller**
4. **Controller** passes data to **View** as props
5. **View** renders UI based on props

### Benefits
- **Separation of Concerns**: Clear boundaries between data, logic, and presentation
- **Reusability**: Models and Views can be reused across different controllers
- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features following the same pattern

### Component Taxonomy (Angular-inspired)

#### **View Components** (`*.view.tsx`)
- **Semantic Purpose**: Pure presentation layer components
- **Naming Convention**: `[component-name].view.tsx`
- **Characteristics**:
  - Receive data via props only
  - No business logic or state management
  - Focus on UI rendering and user interaction display
  - Emit events through callback props
  - Stateless or minimal local UI state only

#### **Model Components** (`*.model.ts`)
- **Semantic Purpose**: Data and business logic layer
- **Naming Convention**: `[component-name].model.ts`
- **Characteristics**:
  - Contains data fetching logic
  - Business rules and validation
  - State management (Zustand/Redux)
  - API service calls and data transformation
  - Pure functions and utilities

#### **Controller Components** (`*.tsx`)
- **Semantic Purpose**: Orchestration and user interaction layer
- **Naming Convention**: `[component-name].tsx` (main component)
- **Characteristics**:
  - Coordinates between Model and View
  - Handles user interactions and events
  - Form validation and submission logic
  - Navigation and routing decisions
  - Error handling and loading states

### File Structure Example
```
@/app/_components/pages/
├── (feature)/
│   ├── user-profile/
│   │   ├── user-profile.tsx          # Controller (Angular component.ts)
│   │   ├── user-profile.view.tsx      # View (Angular template.html)
│   │   ├── user-profile.model.ts     # Model (Angular service.ts)
│   │   └── user-profile.styles.ts    # Styles (Angular component.scss)
```

## Component Taxonomy Rules

### Atomic Design Applied to React Components

Follow Brad Frost's Atomic Design methodology for component organization and naming conventions.

### Component Classification Rules

#### **Atoms** (`@/app/_components/atoms/`)
**Classification Criteria:**
- **Single HTML element** or **primitive React component**
- **Cannot contain other components** (only HTML elements)
- **No business logic** (only presentation logic)
- **No state management** (only props)
- **No API calls** or data fetching
- **No event handlers** beyond basic UI interactions

**Examples**: `Button`, `Input`, `Icon`, `Label`, `Badge`, `Avatar`, `Spinner`

**NOT Atoms if:**
- Contains other React components
- Has business logic or API calls
- Manages complex state
- Has multiple responsibilities

#### **Molecules** (`@/app/_components/molecules/`)
**Classification Criteria:**
- **Combines 2-3 atoms** to form a functional unit
- **Single responsibility** (one specific function)
- **No complex business logic** (only UI logic)
- **No API calls** or external data fetching
- **Reusable across different contexts**
- **May have simple state** (form inputs, toggles)

**Examples**: `SearchForm`, `ProductCard`, `UserMenu`, `NavigationItem`, `FormField`

**NOT Molecules if:**
- Contains more than 3 atoms
- Has complex business logic
- Makes API calls
- Manages global state
- Has multiple responsibilities

#### **Organisms** (`@/app/_components/organisms/`)
**Classification Criteria:**
- **Combines multiple molecules and/or atoms**
- **Represents a distinct section** of the interface
- **May contain business logic** and state management
- **May make API calls** and handle data
- **Context-specific** but still reusable
- **Manages complex interactions**

**Examples**: `Header`, `Sidebar`, `Footer`, `ProductGrid`, `UserProfile`, `DataTable`

**NOT Organisms if:**
- Contains only atoms (should be molecule)
- Has no business logic (should be molecule)
- Is a complete page (should be page)
- Is a layout structure (should be template)

#### **Templates** (`@/app/_components/templates/`)
**Classification Criteria:**
- **Defines page structure** without specific content
- **Contains only layout components** (organisms, molecules, atoms)
- **No business logic** or data fetching
- **Placeholder content only**
- **Focus on composition** and spacing
- **No specific functionality**

**Examples**: `MainTemplate`, `DashboardTemplate`, `AuthTemplate`, `BlogTemplate`

**NOT Templates if:**
- Contains real content or data
- Has business logic
- Makes API calls
- Has specific functionality
- Is a complete page (should be page)

#### **Pages** (`@/app/_components/pages/`)
**Classification Criteria:**
- **Complete user experience** with real content
- **Contains business logic** and state management
- **Makes API calls** and handles data
- **Route-specific** functionality
- **Not reusable** across different contexts
- **Represents a full page** or major section

**Examples**: `HomePage`, `ProductPage`, `CheckoutPage`, `UserDashboard`, `SettingsPage`

**NOT Pages if:**
- Contains only layout (should be template)
- Has no business logic (should be organism)
- Is reusable across contexts (should be organism)
- Is a single component (should be organism)

### Classification Decision Tree

```
1. Does it contain real content and business logic?
   YES → Is it route-specific and not reusable?
     YES → PAGE
     NO → ORGANISM
   NO → Go to 2

2. Does it define page structure without content?
   YES → TEMPLATE
   NO → Go to 3

3. Does it combine multiple molecules/atoms with business logic?
   YES → ORGANISM
   NO → Go to 4

4. Does it combine 2-3 atoms with single responsibility?
   YES → MOLECULE
   NO → Go to 5

5. Is it a single HTML element or primitive component?
   YES → ATOM
   NO → Review classification criteria
```

### Classification Examples

#### **Correct Classifications:**
- `Button` → **ATOM** (single element, no logic)
- `SearchForm` → **MOLECULE** (combines Input + Button)
- `Header` → **ORGANISM** (combines Logo + Navigation + UserMenu)
- `MainTemplate` → **TEMPLATE** (layout structure)
- `HomePage` → **PAGE** (complete experience with data)

#### **Incorrect Classifications:**
- `ProductCard` → **NOT ATOM** (contains multiple elements)
- `Header` → **NOT MOLECULE** (contains multiple molecules)
- `Button` → **NOT ORGANISM** (single element)
- `HomePage` → **NOT TEMPLATE** (has real content)
- `SearchForm` → **NOT PAGE** (reusable component)

### File Structure Convention

```
@/app/_components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   └── Button.test.tsx
│   └── Input/
│       ├── Input.tsx
│       ├── Input.styles.ts
│       └── Input.test.tsx
├── molecules/
│   ├── SearchForm/
│   │   ├── SearchForm.tsx
│   │   ├── SearchForm.styles.ts
│   │   └── SearchForm.test.tsx
│   └── ProductCard/
│       ├── ProductCard.tsx
│       ├── ProductCard.styles.ts
│       └── ProductCard.test.tsx
├── organisms/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.styles.ts
│   │   └── Header.test.tsx
│   └── Sidebar/
│       ├── Sidebar.tsx
│       ├── Sidebar.styles.ts
│       └── Sidebar.test.tsx
├── templates/
│   ├── MainTemplate/
│   │   ├── MainTemplate.tsx
│   │   ├── MainTemplate.styles.ts
│   │   └── MainTemplate.test.tsx
│   └── DashboardTemplate/
│       ├── DashboardTemplate.tsx
│       ├── DashboardTemplate.styles.ts
│       └── DashboardTemplate.test.tsx
└── pages/
    ├── HomePage/
    │   ├── HomePage.tsx
    │   ├── HomePage.styles.ts
    │   └── HomePage.test.tsx
    └── ProductPage/
        ├── ProductPage.tsx
        ├── ProductPage.styles.ts
        └── ProductPage.test.tsx
```

### Naming Conventions

#### **Component Files**
- **Atoms**: `ComponentName.tsx` (e.g., `Button.tsx`)
- **Molecules**: `ComponentName.tsx` (e.g., `SearchForm.tsx`)
- **Organisms**: `ComponentName.tsx` (e.g., `Header.tsx`)
- **Templates**: `ComponentNameTemplate.tsx` (e.g., `MainTemplate.tsx`)
- **Pages**: `ComponentNamePage.tsx` (e.g., `HomePage.tsx`)

#### **Directory Structure**
- Each component gets its own directory
- Directory name matches component name
- Include related files (styles, tests, types) in the same directory

#### **Naming Conventions**

##### **File Naming**
- **Files**: Use `snake-case` for file names
- **Examples**: 
  - `button.tsx`
  - `search-form.tsx`
  - `user-profile.tsx`
  - `main-template.tsx`

##### **Method Naming**
- **Methods**: Use `camelCase` for method names
- **Examples**:
  - `handleSubmit()`
  - `validateForm()`
  - `fetchUserData()`
  - `onClickHandler()`

##### **Variable Naming**
- **Variables**: Use `camelCase` for variable names
- **Examples**:
  - `userData`
  - `isLoading`
  - `formErrors`
  - `currentUser`

##### **Component Naming**
- **Components**: Use `PascalCase` for component 'export function' names
- **Examples**:
  - `Button`
  - `SearchForm`
  - `UserProfile`
  - `MainTemplate`

#### **Import/Export Patterns**
```typescript
// atoms/button/button.tsx
export interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, size, children }) => {
  const handleClick = () => {
    // Method implementation
  };
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

// molecules/search-form/search-form.tsx
import { Button } from '@/app/_components/atoms/button/button';
import { Input } from '@/app/_components/atoms/input/input';

export const SearchForm: React.FC = () => {
  const handleSubmit = () => {
    // Form submission logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input />
      <Button />
    </form>
  );
};
``