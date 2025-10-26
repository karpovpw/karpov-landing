# Karpov Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and featuring a sophisticated liquid glass design system with glassmorphism effects.

## 🚀 Features

- **Next.js 15** with App Router for optimal performance and SEO
- **TypeScript** for type safety and enhanced developer experience
- **Liquid Glass Design System** with custom glassmorphism components
- **Dual Theme Support** (Light/Dark) with seamless switching
- **Responsive Design** optimized for all devices
- **Modern Animations** powered by Framer Motion
- **File-based Content** using markdown for easy content management

## 🛠️ Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5.6.x
- **Styling:** Tailwind CSS 3.4.x with custom design system
- **Animations:** Framer Motion 11.5.x
- **Icons:** Lucide React 0.427.x
- **Typography:** Geist font family

## 🏗️ Architecture

This portfolio implements a modular monolith pattern with:

- **Atomic Design** component organization (Atoms, Molecules, Organisms, Templates)
- **CSS Modules + Tailwind** hybrid styling approach
- **React Context** for state management
- **File-based routing** with Next.js App Router
- **Responsive-first** design with 6 breakpoints

## 📁 Project Structure

```
karpov/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page (hero + featured)
│   ├── about/page.tsx           # About/profile page
│   ├── portfolio/page.tsx       # Portfolio showcase
│   ├── articles/page.tsx        # BMAD articles
│   ├── crypto/page.tsx          # Crypto project showcase
│   ├── contact/page.tsx         # Contact form
│   └── globals.css              # Global styles and glassmorphism
├── components/                  # Shared component library
│   ├── design-system/           # Foundational glassmorphism components
│   ├── layout/                  # Layout and navigation components
│   └── features/                # Feature-specific component groups
├── content/                     # Portfolio content (markdown)
├── lib/                         # Utilities and configurations
├── types/                       # TypeScript definitions
└── styles/                      # Global styles and themes
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.17.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd karpov-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:accessibility` - Run accessibility tests
- `npm run test:performance` - Run performance tests with Lighthouse
- `npm run test:bundle` - Analyze bundle size
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI

## 🎨 Design System

The liquid glass design system features:

- **Glassmorphism Effects** with backdrop-filter blur
- **Dynamic Theme Variables** for seamless light/dark switching
- **CSS Custom Properties** for consistent glass effects
- **Hardware-Accelerated Animations** for 60fps performance
- **Reduced Motion Support** for accessibility

## 🧩 Component Library

Built using Atomic Design principles:

- **Atoms:** Basic building blocks (GlassCard, ThemeButton, Typography)
- **Molecules:** Component combinations (Navigation items, Project cards)
- **Organisms:** Complex UI sections (Hero section, Project grid)
- **Templates:** Page-level layouts with consistent structure

## 🌟 Key Features in Detail

### Liquid Glass Effects
- Custom backdrop-filter implementation
- Hardware-accelerated CSS transforms
- Theme-aware glassmorphism tokens
- Smooth hover and focus animations

### Performance Optimized
- Next.js Image optimization with WebP/AVIF
- Route-based code splitting
- Static generation for portfolio content
- Edge deployment ready

### Accessibility First
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- Reduced motion preferences

## 📖 Content Management

Portfolio content is managed through:

- **Markdown files** for project descriptions and articles
- **Structured TypeScript objects** for metadata
- **File-based organization** in `/content` directory
- **Build-time processing** for optimal performance

## 🔧 Development

### Component Development
Components follow the established design system patterns and include:

- TypeScript interfaces for all props
- Responsive design utilities
- Accessibility attributes
- Performance optimizations

### Styling Guidelines
- CSS Modules for component-scoped styles
- Tailwind utilities for layout and responsive design
- CSS custom properties for theme consistency
- Glassmorphism design tokens

## 🧪 Testing

The project includes comprehensive testing strategies:

### Unit and Integration Tests
- **Jest** with jsdom for component and utility testing
- **React Testing Library** for component interaction testing
- **Custom matchers** from @testing-library/jest-dom
- **Mocking** for external dependencies (Next.js, Framer Motion)

### Test Coverage
- Component rendering and behavior
- Form validation and submission
- Theme switching and responsive design
- Error handling and edge cases
- Performance utilities and accessibility features

### Running Tests
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
```

### Test Structure
```
__tests__/
├── components/           # Component tests
│   ├── design-system/    # Design system component tests
│   ├── features/         # Feature component tests
│   └── contact/          # Contact form tests
└── integration/          # Integration tests for utilities
```

## 🚀 Deployment

Ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Docker** container
- **Static hosting** platforms

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js 15 and modern web technologies.