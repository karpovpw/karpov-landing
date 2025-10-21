# karpov Product Requirements Document (PRD)

**Author:** karpovpw
**Date:** 2025-10-21
**Project Level:** Level 2 (Small complete system)
**Project Type:** Web application
**Target Scale:** 5-15 stories, 1-2 epics, focused PRD + solutioning handoff

---

## Description, Context and Goals

### Description

Karpov is a sophisticated personal portfolio website designed to showcase technical expertise, innovative projects, and thought leadership in software development and blockchain technology. Drawing inspiration from buildmode.dev's clean aesthetic, the site serves as a professional gateway for multiple stakeholder audiences while featuring cutting-edge liquid glass design effects and seamless dark/black theme switching.

The portfolio uniquely positions itself at the intersection of traditional software development and emerging blockchain technologies, featuring a dedicated crypto project showcase and authoritative content on BMAD (Blockchain-enabled Multi-Agent Development) methodologies. The liquid glass design creates an immersive, modern visual experience that reflects technical sophistication while maintaining accessibility across all devices and user preferences.

### Deployment Intent

**Production app** - Professional portfolio serving as the primary digital presence for career opportunities, client acquisition, and industry networking within the developer and blockchain communities.

### Context

In today's competitive tech landscape, developers need more than just a resume - they need a compelling digital narrative that showcases both technical depth and innovative thinking. This portfolio addresses the growing need for developers to demonstrate expertise across traditional web development and emerging blockchain technologies, particularly in the context of multi-agent systems and decentralized applications. The focus on BMAD content and crypto project showcases positions the site as a thought leadership platform while attracting opportunities from employers, clients, and collaborators in both traditional and blockchain sectors.

### Goals

1. **Professional Visibility:** Establish a distinctive online presence that effectively communicates technical expertise and innovative capabilities to employers and clients in both traditional software development and blockchain sectors.

2. **Content Leadership:** Build authority and credibility through high-quality articles on BMAD methodologies and practical insights for the developer community.

3. **Project Showcase:** Create an engaging platform to present and demonstrate innovative projects, with particular emphasis on the upcoming crypto project and development methodologies.

---

## Requirements

### Functional Requirements

**FR001:** Users can view personal profile with professional photo, bio, and contact information
**FR002:** Users can browse portfolio projects with detailed descriptions and screenshots
**FR003:** Users can read articles about BMAD methodologies and technical insights
**FR004:** Users can switch between dark and black theme modes seamlessly
**FR005:** Site displays liquid glass design effects throughout the interface
**FR006:** Users can filter projects by technology stack and category
**FR007:** Users can filter articles by topic and publication date
**FR008:** Contact form allows visitors to send inquiries and collaboration requests
**FR009:** Site displays LinkedIn profile integration for professional networking
**FR010:** Crypto project showcase with dedicated section and enhanced visuals
**FR011:** Responsive design adapts to mobile, tablet, and desktop screens
**FR012:** Search functionality across projects and articles
**FR013:** Social media sharing capabilities for articles and projects
**FR014:** Newsletter signup for updates on new content and projects
**FR015:** Performance metrics dashboard (view counts, popular content)

### Non-Functional Requirements

**NFR001:** Site loads within 2 seconds on standard broadband connections
**NFR002:** 99.9% uptime reliability for professional accessibility
**NFR003:** Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
**NFR004:** WCAG 2.1 AA accessibility compliance for inclusive design
**NFR005:** Mobile-first responsive design with touch-friendly interactions

## User Journeys

### Primary User Journey: Employer/Client Discovery

**Persona:** Tech Recruiter/Employer
**Goal:** Evaluate candidate's technical expertise and project quality

1. **Discovery:** Recruiter finds portfolio via LinkedIn or search engines
2. **Initial Assessment:** Scans hero section with professional photo and key skills summary
3. **Project Review:** Browses portfolio projects, focusing on crypto project showcase and technical implementations
4. **Content Evaluation:** Reads BMAD articles to assess thought leadership and expertise
5. **Contact Decision:** Reviews contact information and reaches out via contact form or LinkedIn

**Success Metrics:** Contact form submissions, time on site > 3 minutes, project page views

**Alternative Path:** Direct project link sharing leads to specific project deep-dive

## UX Design Principles

**Progressive Disclosure:** Present information hierarchically - essential details first, deeper technical information available on demand to serve both casual visitors and technical experts.

**Visual Hierarchy:** Use liquid glass effects strategically to guide attention to key content areas (projects, articles, contact) while maintaining clean, scannable layouts.

**Inclusive Accessibility:** Support both dark and black themes with high contrast ratios and ensure all interactive elements are keyboard-navigable and screen reader friendly.

**Performance-First Aesthetics:** Design animations and effects to enhance rather than hinder content discovery, with fallbacks for slower connections.

**Multi-Audience Navigation:** Provide clear pathways for different user types - quick project showcase for recruiters, detailed technical deep-dives for collaborators, educational content for crypto-enthusiasts.

## Epics

### Epic 1: Core Infrastructure & Design System
**Focus:** Technical foundation and visual identity (6 stories, 2 weeks)

**Stories:**
- Set up project structure with modern web framework
- Implement liquid glass design system and components
- Build dark/black theme switching functionality
- Create responsive layout framework
- Set up performance optimization and loading states
- Implement accessibility features and ARIA labels

### Epic 2: Content & User Features
**Focus:** Portfolio content and user interactions (6 stories, 2 weeks)

**Stories:**
- Build personal profile and hero section with photo
- Create portfolio projects showcase with filtering
- Implement articles system for BMAD content
- Build contact form and LinkedIn integration
- Add crypto project dedicated showcase section
- Implement search and social sharing features

**Total: 12 stories across 2 epics (Level 2 scope: 5-15 stories)**

## Out of Scope

**Technical Infrastructure:**
- Custom CMS for content management (use markdown files instead)
- Multi-author blog functionality (single-author focus)
- Advanced animation libraries beyond liquid glass effects
- Complex state management solutions (lightweight context-based approach)

**Advanced Features:**
- E-commerce integration or payment processing
- Newsletter automation and advanced email marketing
- Social media auto-posting and management
- Advanced analytics dashboard and heat mapping
- Internationalization and multi-language support

**Content & Scale:**
- Large media library with video backgrounds
- Extensive case studies beyond project showcases
- Community features or user accounts
- Advanced search with AI-powered recommendations
- Integration with job boards or recruitment platforms

**Note:** Liquid glass design and dark/black themes are core features, not out of scope.

## Assumptions and Dependencies

### Key Assumptions

- **Access & Permissions:** You have access and permissions needed to edit, deploy, and maintain the site
- **Content Provision:** Content (photo, project data, articles) will be provided or generated by you or BMAD agents
- **Tech Stack Compatibility:** The chosen tech stack (React, Svelte, Next.js, etc.) is compatible with glassmorphism effects and can be hosted on platforms like Netlify, Vercel, or GitHub Pages
- **User Environment:** Users will primarily access the site via modern browsers and mobile devices
- **Development Environment:** BMAD agents, templates, and workflows are correctly installed and configured

### Critical Dependencies

- **BMAD v6 alpha:** Successful installation and operational status of BMAD agents within your workspace
- **Development Tools:** Kilocode or VSCode Extension required for AI workflow and command integration
- **Runtime Environment:** Node.js v20+ as core runtime for BMAD and most modern static site generators
- **UI Libraries:** Third-party libraries (TailwindCSS, Framer Motion, or similar) for glassmorphism UI; their versions must be compatible with your frontend framework
- **Hosting Platform:** Netlify, Vercel, or GitHub Pages must support your static build/SSR options
- **Content Sources:** If using GitHub, proper repo access and workflows must be configured (if enabling automated syncs)

---

## Next Steps

## Document Status

- [ ] Goals and context validated with stakeholders
- [ ] All functional requirements reviewed
- [ ] User journeys cover all major personas
- [ ] Epic structure approved for phased delivery
- [ ] Ready for architecture phase

_Note: See technical-decisions.md for captured technical context_

---

_This PRD adapts to project level Level 2 (Small complete system) - providing appropriate detail without overburden._