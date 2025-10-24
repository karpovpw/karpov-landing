'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { GlassCard } from './GlassCard'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-colors animate-wiggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      suppressHydrationWarning
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

export function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <motion.button
      onClick={() => router.push('/')}
      className="relative p-2 rounded-full transition-colors animate-wiggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go to home"
    >
      <GlassCard className="p-3 rounded-full">
        <motion.div
          whileHover={{ x: -2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </motion.div>
      </GlassCard>
    </motion.button>
  )
}