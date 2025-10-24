'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
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
  const [config, setConfig] = useState<ThemeConfig>({
    mode: 'light',
    neonAccent: 'green',
    reducedMotion: false,
    highContrast: false,
  })
  const pathname = usePathname()

  useEffect(() => {
    const savedTheme = loadThemePreference()
    setThemeState(savedTheme)
    applyTheme(savedTheme)

    setConfig((prev: ThemeConfig) => ({
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
  }, [pathname])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    applyTheme(newTheme)
    setConfig((prev: ThemeConfig) => ({ ...prev, mode: newTheme }))
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    setConfig((prev: ThemeConfig) => ({ ...prev, mode: newTheme }))
  }

  const setNeonAccent = (accent: 'green' | 'orange') => {
    setConfig((prev: ThemeConfig) => ({ ...prev, neonAccent: accent }))
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