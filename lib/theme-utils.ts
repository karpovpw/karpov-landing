// Theme utility functions for enhanced theme management

export type Theme = 'light' | 'dark'
export type NeonAccent = 'green' | 'orange'

export interface ThemeConfig {
  mode: Theme
  neonAccent: NeonAccent
  reducedMotion: boolean
  highContrast: boolean
}

// Default theme configurations
export const THEME_CONFIGS = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    surface: 'hsl(0, 0%, 98%)',
    primary: 'hsl(262, 83%, 58%)',
    secondary: 'hsl(210, 40%, 96%)',
    accent: 'hsl(142, 76%, 36%)',
    text: 'hsl(222.2, 84%, 4.9%)',
    textMuted: 'hsl(215.4, 16.3%, 46.9%)',
    border: 'hsl(214.3, 31.8%, 91.4%)',
    neon: 'hsl(142, 76%, 36%)',
  },
  dark: {
    background: 'hsl(222.2, 84%, 4.9%)',
    surface: 'hsl(222.2, 84%, 6%)',
    primary: 'hsl(263, 70%, 50%)',
    secondary: 'hsl(217.2, 32.6%, 17.5%)',
    accent: 'hsl(32, 95%, 44%)',
    text: 'hsl(210, 40%, 98%)',
    textMuted: 'hsl(215, 20.2%, 65.1%)',
    border: 'hsl(217.2, 32.6%, 17.5%)',
    neon: 'hsl(32, 95%, 44%)',
  },
}

// Generate CSS custom properties for theme
export function generateThemeCSS(theme: Theme, accent: NeonAccent): string {
  const config = THEME_CONFIGS[theme]

  return `
    :root {
      --theme-background: ${config.background};
      --theme-surface: ${config.surface};
      --theme-primary: ${config.primary};
      --theme-secondary: ${config.secondary};
      --theme-accent: ${config.accent};
      --theme-text: ${config.text};
      --theme-text-muted: ${config.textMuted};
      --theme-border: ${config.border};
      --theme-neon: ${accent === 'green' ? 'hsl(142, 76%, 36%)' : 'hsl(32, 95%, 44%)'};

      /* Glassmorphism variables for current theme */
      --glass-background: ${theme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)'};
      --glass-border: ${theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
      --glass-shadow: ${theme === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 8px 32px rgba(0, 0, 0, 0.3)'};
    }
  `
}

// Apply theme CSS to document
export function applyThemeCSS(theme: Theme, accent: NeonAccent): void {
  if (typeof document === 'undefined') return

  const existingStyle = document.getElementById('theme-variables')
  const css = generateThemeCSS(theme, accent)

  if (existingStyle) {
    existingStyle.textContent = css
  } else {
    const style = document.createElement('style')
    style.id = 'theme-variables'
    style.textContent = css
    document.head.appendChild(style)
  }
}

// Get system theme preference
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery.matches ? 'dark' : 'light'
}

// Get stored theme preference
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem('theme') as Theme
    return stored || null
  } catch {
    return null
  }
}

// Store theme preference
export function storeTheme(theme: Theme): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Silently handle localStorage errors (e.g., in private browsing mode)
    console.warn('Failed to store theme preference')
  }
}

// Listen for system theme changes
export function watchSystemTheme(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }

  mediaQuery.addEventListener('change', handleChange)

  return () => {
    mediaQuery.removeEventListener('change', handleChange)
  }
}

// Reduced motion preference detection
export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// High contrast preference detection
export function getHighContrastPreference(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-contrast: high)').matches
}

// Theme transition utilities
export function applyThemeTransition(theme: Theme): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  // Add transition class
  root.classList.add('theme-transitioning')

  // Apply theme
  root.classList.remove('light', 'dark')
  root.classList.add(theme)

  // Remove transition class after animation completes
  setTimeout(() => {
    root.classList.remove('theme-transitioning')
  }, 300)
}

// Keyboard shortcut handler for theme toggle
export function setupThemeKeyboardShortcut(toggleTheme: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleKeyDown = (event: KeyboardEvent) => {
    // Ctrl+Shift+T or Cmd+Shift+T
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === 'T'
    ) {
      event.preventDefault()
      toggleTheme()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}