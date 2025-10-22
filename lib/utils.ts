import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Project } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme utility functions
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: 'light' | 'dark') {
  if (typeof window === 'undefined') return

  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)

  // Store theme preference
  localStorage.setItem('theme', theme)
}

export function loadThemePreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem('theme') as 'light' | 'dark'
  return stored || getSystemTheme()
}

// Animation utilities
export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read'
  if (minutes === 1) return '1 min read'
  return `${minutes} min read`
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Project filtering utilities
export function filterProjectsByTechnology(
  projects: Project[],
  technology: string
): Project[] {
  return projects.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

export function filterProjectsByCategory(
  projects: Project[],
  category: Project['category']
): Project[] {
  return projects.filter(project => project.category === category)
}