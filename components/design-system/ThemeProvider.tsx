'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeConfig } from '@/types'
import { getSystemTheme, applyTheme, loadThemePreference } from '@/lib/utils'

interface ThemeContextType {
  theme: 'light' | 'dark'
  config: ThemeConfig
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setNeonAccent: (accent: 'green' | 'orange') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<ThemeConfig>({
    mode: 'light',
    neonAccent: 'green',
    reducedMotion: false,
    highContrast: false,
  })

  useEffect(() => {
    setMounted(true)
    const savedTheme = loadThemePreference()
    setThemeState(savedTheme)
    applyTheme(savedTheme)

    setConfig(prev => ({
      ...prev,
      mode: savedTheme,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }))

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setThemeState(newTheme)
        applyTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    applyTheme(newTheme)
    setConfig(prev => ({ ...prev, mode: newTheme }))
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    setConfig(prev => ({ ...prev, mode: newTheme }))
  }

  const setNeonAccent = (accent: 'green' | 'orange') => {
    setConfig(prev => ({ ...prev, neonAccent: accent }))
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  const value: ThemeContextType = {
    theme,
    config,
    toggleTheme,
    setTheme,
    setNeonAccent,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}