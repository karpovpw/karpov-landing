// Core theme types
export interface ThemeConfig {
  mode: 'light' | 'dark'
  neonAccent: 'green' | 'orange'
  reducedMotion: boolean
  highContrast: boolean
}

// Project types
export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  images: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'crypto' | 'mobile' | 'other'
}

// Article types
export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  readingTime: number
  category: 'bmad' | 'blockchain' | 'architecture' | 'tutorials'
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// Animation types
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
}