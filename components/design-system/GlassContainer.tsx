'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { GlassCard } from './GlassCard'

interface GlassContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centered?: boolean
  variant?: 'default' | 'elevated' | 'subtle'
  animate?: boolean
  as?: keyof React.JSX.IntrinsicElements
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

export function GlassContainer({
  children,
  className = '',
  maxWidth = 'lg',
  centered = true,
  variant = 'default',
  animate = false,
  as: Component = 'div',
  ...props
}: GlassContainerProps) {
  const containerClasses = `
    ${centered ? 'mx-auto' : ''}
    ${maxWidthClasses[maxWidth]}
    ${className}
  `

  return (
    <GlassCard
      variant={variant}
      className={containerClasses}
      animate={animate}
      {...props}
    >
      {children}
    </GlassCard>
  )
}