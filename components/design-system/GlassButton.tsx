'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { getGlassBackground, getGlassBorder, getGlassShadow } from '@/lib/design-tokens'
import { useTheme } from './ThemeProvider'

interface GlassButtonProps extends BaseComponentProps, Omit<HTMLMotionProps<"button">, keyof BaseComponentProps> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

export function GlassButton({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  ...motionProps
}: GlassButtonProps) {
  const { theme } = useTheme()

  const baseClasses = `
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    rounded-lg font-medium
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed
    border backdrop-blur-lg
    active:scale-95
  `

  const variantClasses = {
    default: `
      bg-[${getGlassBackground(theme)}]
      border-[${getGlassBorder(theme)}]
      box-shadow: ${getGlassShadow(theme)}
      hover:scale-105 hover:shadow-lg
    `,
    primary: `
      bg-primary/20 backdrop-blur-lg
      border-primary/30
      text-primary-foreground
      hover:bg-primary/30 hover:border-primary/40
      shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-secondary/20 backdrop-blur-lg
      border-secondary-foreground/20
      text-secondary-foreground
      hover:bg-secondary/30 hover:border-secondary-foreground/30
    `,
    outline: `
      bg-transparent backdrop-blur-lg
      border-2 border-primary/50
      text-primary
      hover:bg-primary/10 hover:border-primary
    `,
  }

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...motionProps}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}