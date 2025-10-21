# Technical Specification: Core Infrastructure & Design System

Date: 2025-10-21
Author: karpovpw
Epic ID: 1
Status: Draft

---

## Overview

This technical specification details the implementation of Epic 1: Core Infrastructure & Design System for the Karpov portfolio website. This foundational epic establishes the liquid glass design system, theme management, responsive layout framework, performance optimization, and accessibility foundation that will support all subsequent feature development.

The implementation leverages Next.js 15 with a custom component library designed specifically for glassmorphism effects and iOS 26-like fluent animations, providing a solid technical foundation for the portfolio's unique visual requirements while maintaining excellent performance and accessibility standards.

## Objectives and Scope

### In Scope
- Next.js 15 project setup with TypeScript and App Router configuration
- Custom liquid glass design system with CSS architecture and component library
- Theme switching system supporting white/purple gradient and AMOLED black themes
- Responsive layout framework with mobile-first 6-breakpoint system
- Performance optimization including code splitting, image optimization, and caching
- Accessibility foundation with WCAG 2.1 AA compliance and ARIA implementation

### Out of Scope
- Portfolio content population (handled in Epic 2)
- Feature-specific components (Hero, Projects, Articles - Epic 2)
- External API integrations beyond basic contact form
- Advanced analytics implementation
- Content management system features

## System Architecture Alignment

### Referenced Architecture Components
**Design System Module (@/design-system)**
- **GlassCard:** Base component with liquid glass effects and backdrop-filter blur
- **ThemeProvider:** React Context for global theme state management
- **AnimationUtils:** Reusable Framer Motion functions for glassmorphism

**Layout Module (@/layout)**
- **App Shell:** Root layout with navigation structure and glassmorphism header
- **Grid System:** Responsive CSS Grid with liquid glass containers
- **Mobile Navigation:** Hamburger menu with slide-in glassmorphism drawer

**Technology Stack Integration**
- **Next.js 15:** App Router for server-side rendering and performance optimization
- **Framer Motion 11.5.x:** Complex animation library for liquid glass effects
- **CSS Modules + Tailwind:** Hybrid styling for component isolation and utility classes
- **TypeScript 5.6.x:** Type safety for component library development

## Detailed Design

### Services and Modules

| Module | Responsibility | Key Functions | Owner |
|--------|---------------|---------------|-------|
| **Design System** | Liquid glass component library | GlassCard, ThemeProvider, AnimationUtils | Frontend Team |
| **Layout Engine** | Responsive layout framework | Grid system, breakpoints, containers | Frontend Team |
| **Theme Manager** | Global theme state management | Context provider, CSS custom properties | Frontend Team |
| **Performance Layer** | Optimization and caching | Code splitting, image optimization | Frontend Team |
| **Accessibility Layer** | WCAG compliance foundation | ARIA implementation, keyboard navigation | Frontend Team |

### Data Models and Contracts

**Theme Configuration Model**
```typescript
interface ThemeConfig {
  mode: 'light' | 'dark'
  neonAccent: 'green' | 'orange'
  reducedMotion: boolean
  highContrast: boolean
  glassIntensity: 'low' | 'medium' | 'high'
}

interface GlassmorphismConfig {
  blur: number // 20px default
  opacity: number // 0.15 default
  borderWidth: number // 1px default
  borderOpacity: number // 0.2 default
  shadowLayers: number // 3 layers default
}
```

**Layout Configuration Model**
```typescript
interface BreakpointConfig {
  mobileSmall: '320px'
  mobileMedium: '480px'
  mobileLarge: '768px'
  desktopSmall: '1024px'
  desktopMedium: '1440px'
  desktopLarge: '1920px'
}

interface GridConfig {
  maxWidth: '1200px'
  columns: 12
  gap: '24px'
  containerPadding: '16px'
}
```

### APIs and Interfaces

**Theme Management API**
```typescript
interface ThemeAPI {
  // Get current theme configuration
  getCurrentTheme(): ThemeConfig

  // Update theme with smooth transition
  setTheme(theme: Partial<ThemeConfig>): Promise<void>

  // Toggle between light and dark modes
  toggleTheme(): Promise<void>

  // Subscribe to theme changes
  onThemeChange(callback: (theme: ThemeConfig) => void): () => void
}
```

**Animation Control Interface**
```typescript
interface AnimationAPI {
  // Control liquid glass effect intensity
  setGlassIntensity(level: 'low' | 'medium' | 'high'): void

  // Pause/resume animations for performance
  setAnimationsEnabled(enabled: boolean): void

  // Respect user's motion preferences
  respectMotionPreference(): void
}
```

### Workflows and Sequencing

**Project Initialization Workflow**
```
Developer → Next.js Setup → Design System → Theme System → Layout Framework → Performance → Accessibility → Testing
     ↓           ↓            ↓           ↓           ↓            ↓           ↓            ↓           ↓
1. Create     2. Install   3. Build    4. Create   5. Implement   6. Optimize   7. Implement  8. Validate
   project      TypeScript   glass       theme       responsive     bundle        ARIA         component
   structure    and ESLint   morphism    context     breakpoints    size and      labels       functionality
                            CSS         provider    and grid       performance                 and keyboard
                            system                                                navigation
```

## Non-Functional Requirements

### Performance

**Measurable Performance Targets**
- **Initial Page Load:** < 2 seconds on 3G connection (PRD NFR001)
- **Theme Switch Time:** < 200ms for seamless user experience
- **Animation Performance:** 60fps for all liquid glass effects
- **Bundle Size:** < 500KB gzipped JavaScript (optimization target)
- **Image Load Time:** < 1 second for LCP (Largest Contentful Paint)

**Performance Monitoring Signals**
- Core Web Vitals (LCP, FID, CLS) tracking
- Bundle analyzer results and trends
- Animation frame rates during interactions
- Memory usage for component library

### Security

**Application Security Approach**
- **Content Security Policy:** Strict CSP for XSS prevention
```xml
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
```

- **Dependency Security:** Automated vulnerability scanning with npm audit
- **Environment Variables:** Secure configuration management
- **HTTPS Only:** All communications encrypted via HTTPS

### Reliability/Availability

**Reliability Targets**
- **Uptime:** 99.9% availability (matching PRD NFR002)
- **Error Recovery:** Graceful degradation for animation failures
- **Theme Persistence:** Theme preferences survive browser sessions
- **Performance Degradation:** Reduced animation complexity on low-end devices

### Observability

**Logging and Monitoring Strategy**
- **Error Tracking:** Next.js error boundaries with user-friendly messages
- **Performance Metrics:** Core Web Vitals collection and reporting
- **User Interactions:** Theme switching and animation performance tracking
- **Component Health:** Glassmorphism rendering success rates

**Required Monitoring Signals**
- Animation frame drops during liquid glass interactions
- Theme switching success/failure rates
- Component render times and memory usage
- Accessibility violations and warnings

## Dependencies and Integrations

**Runtime Dependencies**
```json
{
  "next": "15.0.0",
  "react": "19.0.0-rc",
  "react-dom": "19.0.0-rc",
  "typescript": "5.6.x",
  "framer-motion": "11.5.x",
  "tailwindcss": "3.4.x",
  "lucide-react": "0.427.x"
}
```

**Development Dependencies**
```json
{
  "@types/node": "20.17.x",
  "@types/react": "19.0.0-rc",
  "@types/react-dom": "19.0.0-rc",
  "eslint": "9.x",
  "prettier": "3.x",
  "postcss": "8.x",
  "autoprefixer": "10.x"
}
```

**External Integrations**
- **Vercel Platform:** Hosting and deployment integration
- **Google Fonts:** Geist typography loading (display=swap performance)
- **LinkedIn API:** Professional profile integration (display only)

## Acceptance Criteria (Authoritative)

**AC001: Project Structure Setup**
- Next.js 15 project initializes without errors
- TypeScript strict mode enabled and passing
- ESLint and Prettier configured with project standards
- Development server starts and hot reload functions
- Basic routing structure implemented for all planned pages

**AC002: Liquid Glass Design System**
- CSS custom properties system implements glassmorphism tokens
- GlassCard component renders with backdrop-filter blur effects
- Glass morphism works across different theme configurations
- Component library structure follows atomic design principles
- CSS architecture supports theme switching without FOUC

**AC003: Theme Switching Functionality**
- ThemeProvider context manages global theme state
- Light theme (white/purple gradient) renders correctly
- Dark theme (AMOLED black) renders correctly
- Theme switching transitions smoothly (< 200ms)
- Theme preference persists across browser sessions
- Neon accent colors (green/orange) apply correctly in both themes

**AC004: Responsive Layout Framework**
- CSS Grid system implements 6-breakpoint responsive design
- Mobile-first approach validated across all breakpoints
- Layout containers use liquid glass effects appropriately
- Grid system supports planned component layouts
- Responsive images scale appropriately across devices

**AC005: Performance Optimization**
- Code splitting implemented at route and component levels
- Image optimization configured for WebP/AVIF formats
- Bundle analyzer shows < 500KB gzipped target
- Lazy loading implemented for below-fold content
- Performance budgets enforced in build process

**AC006: Accessibility Foundation**
- ARIA labels implemented for all interactive glassmorphism elements
- Keyboard navigation works for all theme switching and navigation
- Screen reader compatibility validated for glass morphism content
- Color contrast ratios meet WCAG 2.1 AA standards in both themes
- Focus indicators visible on all interactive elements

## Traceability Mapping

| Acceptance Criteria | PRD Reference | Architecture Component | Test Strategy |
|--------------------|---------------|------------------------|---------------|
| **AC001** Project Setup | FR005, NFR003 | Next.js Framework | Unit: Project initialization tests |
| **AC002** Design System | FR005, NFR004 | Design System Module | Unit: Glassmorphism component tests |
| **AC003** Theme System | FR004, FR005 | Theme Management | Integration: Theme switching tests |
| **AC004** Layout Framework | FR011, NFR005 | Layout Module | Unit: Responsive breakpoint tests |
| **AC005** Performance | NFR001, NFR002 | Performance Layer | Performance: Bundle analysis tests |
| **AC006** Accessibility | NFR004 | Accessibility Layer | E2E: Screen reader compatibility |

## Risks, Assumptions, Open Questions

### Risks
- **R001: Animation Performance** - Complex liquid glass effects may impact 60fps target on lower-end devices
  - **Mitigation:** Implement adaptive animation intensity based on device capability detection
- **R002: Theme Switching FOUC** - Flash of unstyled content during theme transitions
  - **Mitigation:** Implement theme loading states and ensure CSS custom properties load before content
- **R003: CSS-in-CSS Performance** - Heavy backdrop-filter usage may impact mobile performance
  - **Mitigation:** Use transform3d for hardware acceleration and reduced blur on mobile devices

### Assumptions
- **A001: Modern Browser Support** - All users have browsers supporting backdrop-filter and CSS custom properties
  - **Fallback:** Graceful degradation for older browsers with simplified glass effects
- **A002: Device Capability** - Target devices can handle 60fps animations and GPU-accelerated CSS
  - **Fallback:** Reduced motion support and performance adaptation
- **A003: Content Availability** - Portfolio content structure defined before Epic 2 implementation
  - **Validation:** Content models established in this epic for Epic 2 consumption

### Open Questions
- **Q001: Animation Complexity** - Optimal balance between visual fidelity and performance for liquid glass effects?
- **Q002: Theme Persistence** - Best approach for cross-device theme synchronization?
- **Q003: CSS Architecture** - Most maintainable approach for glassmorphism CSS across component library?

## Test Strategy Summary

### Unit Testing Strategy
**Component-Focused Testing**
- **Glassmorphism Components:** Test liquid glass effects render correctly in both themes
- **Theme System:** Validate context provider state management and theme switching
- **Layout Components:** Test responsive behavior across all breakpoints
- **Animation Utils:** Verify Framer Motion integration and performance

**Testing Frameworks**
- **React Testing Library:** Component behavior and user interaction testing
- **Jest:** Unit test execution and mocking capabilities
- **MSW:** API mocking for component integration tests

### Integration Testing Strategy
**Module Interaction Testing**
- **Theme Integration:** Test theme switching affects all glassmorphism components consistently
- **Layout Integration:** Validate responsive layout works with design system components
- **Performance Integration:** Test code splitting and lazy loading work together

### End-to-End Testing Strategy
**Critical User Path Testing**
- **Theme Switching Journey:** Complete theme toggle across different pages
- **Responsive Journey:** Multi-device experience validation
- **Accessibility Journey:** Keyboard and screen reader navigation testing

**E2E Testing Frameworks**
- **Playwright:** Cross-browser testing with accessibility focus
- **Lighthouse CI:** Performance and accessibility automated testing
- **axe-core:** Accessibility violation detection

### Coverage Goals
- **Component Coverage:** 90% for design system and layout modules
- **Animation Coverage:** 85% for motion-related functionality
- **Accessibility Coverage:** 100% for WCAG 2.1 AA criteria
- **Performance Coverage:** 80% for optimization-related code