'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { getGlassShadow, getGlassBlur, getRadiusToken } from '@/lib/design-tokens'

interface GlassCardProps extends BaseComponentProps, Omit<HTMLMotionProps<"div">, keyof BaseComponentProps> {
  variant?: 'default' | 'elevated' | 'subtle' | 'outline'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  animate?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  blur = 'lg',
  rounded = 'xl',
  padding = 'md',
  hover = false,
  animate = false,
  ...motionProps
}: GlassCardProps) {
  const glassStyles = {
    background: 'rgba(var(--glass-background), var(--glass-opacity))',
    border: '1px solid rgba(var(--glass-border), 0.2)',
    boxShadow: variant === 'elevated'
      ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(var(--glass-border), 0.2)'
      : variant === 'subtle'
      ? '0 4px 16px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(var(--glass-border), 0.2)'
      : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(var(--glass-border), 0.2)',
  }

  const Component = animate || hover ? motion.div : 'div'

  const motionConfig = animate || hover ? {
    whileHover: hover ? {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' }
    } : undefined,
    whileTap: hover ? {
      scale: 0.98,
      transition: { duration: 0.1 }
    } : undefined,
    ...motionProps
  } : {}

  return (
    <Component
      className={`
        ${blurClasses[blur]}
        ${paddingClasses[padding]}
        rounded-${rounded === 'full' ? 'full' : rounded === '3xl' ? '3xl' : rounded === '2xl' ? '2xl' : rounded}
        ${className}
      `}
      style={glassStyles}
      {...motionConfig}
    >
      {children}
    </Component>
  )
}