'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { GlassButton } from './GlassButton'
import { useTheme } from './ThemeProvider'
import { BaseComponentProps } from '@/types'

interface ThemeToggleProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button'
  showLabel?: boolean
}

export function ThemeToggle({
  className = '',
  size = 'md',
  variant = 'icon',
  showLabel = false,
  ...props
}: ThemeToggleProps) {
  const { theme, toggleTheme, config } = useTheme()

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const buttonSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  if (variant === 'button') {
    return (
      <GlassButton
        size={buttonSizes[size]}
        variant="outline"
        onClick={toggleTheme}
        className={`gap-2 ${className}`}
        {...props}
      >
        {theme === 'light' ? (
          <Moon className={iconSizes[size]} />
        ) : (
          <Sun className={iconSizes[size]} />
        )}
        {showLabel && (
          <span className="capitalize">
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </span>
        )}
      </GlassButton>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-full
        bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.2)]
        border border-[rgba(255,255,255,0.2)] dark:border-[rgba(255,255,255,0.1)]
        backdrop-blur-md
        hover:bg-[rgba(255,255,255,0.2)] dark:hover:bg-[rgba(0,0,0,0.3)]
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary/20
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className={`${iconSizes[size]} text-primary`} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex items-center justify-center"
      >
        <Moon className={`${iconSizes[size]} text-primary`} />
      </motion.div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          backgroundColor: theme === 'light'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

// Keyboard shortcut handler for theme toggle (Ctrl/Cmd + Shift + T)
export function useThemeKeyboardShortcut() {
  const { toggleTheme } = useTheme()

  // This would be used in a parent component that mounts once
  // For now, we'll export the handler function that can be used in layout
  return toggleTheme
}