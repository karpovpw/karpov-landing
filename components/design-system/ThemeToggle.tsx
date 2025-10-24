'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { GlassCard } from './GlassCard'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    setTheme(newTheme)
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-colors animate-wiggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <GlassCard className="p-3 rounded-full">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <Sun className="w-5 h-5 text-primary" />
          )}
        </motion.div>
      </GlassCard>
    </motion.button>
  )
}