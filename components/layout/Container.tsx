'use client'

import { BaseComponentProps } from '@/types'
import { getContainerPadding, getResponsiveSpacing, CONTAINER_MAX_WIDTHS, BREAKPOINTS } from '@/lib/responsive-utils'

interface ContainerProps extends BaseComponentProps {
  size?: keyof typeof CONTAINER_MAX_WIDTHS
  padding?: boolean | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  as?: 'div' | 'main' | 'section' | 'article' | 'aside'
  responsive?: {
    xs?: { padding?: string; maxWidth?: string }
    sm?: { padding?: string; maxWidth?: string }
    md?: { padding?: string; maxWidth?: string }
    lg?: { padding?: string; maxWidth?: string }
    xl?: { padding?: string; maxWidth?: string }
    '2xl'?: { padding?: string; maxWidth?: string }
  }
}

export function Container({
  children,
  className = '',
  size = 'lg',
  padding = 'md',
  centered = true,
  as: Component = 'div',
  responsive,
  ...props
}: ContainerProps) {
  // Responsive padding classes
  const getPaddingClass = (bp: keyof typeof BREAKPOINTS) => {
    if (responsive?.[bp]?.padding) return responsive[bp].padding!

    if (padding === false) return ''
    if (padding === true) return 'px-4'

    const paddingMap = {
      xs: 'px-2',
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-6',
      xl: 'px-8',
    }

    return paddingMap[padding] || paddingMap.md
  }

  // Responsive max-width classes
  const getMaxWidthClass = (bp: keyof typeof BREAKPOINTS) => {
    if (responsive?.[bp]?.maxWidth) return `max-w-[${responsive[bp].maxWidth!}]`

    const sizeMap = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }

    return sizeMap[size] || sizeMap.lg
  }

  // Generate responsive classes for different breakpoints
  const responsiveClasses = [
    'mx-auto', // Always center horizontally
    'w-full',  // Full width by default
    'px-4',    // Default horizontal padding
    // Mobile-first responsive classes
    'sm:max-w-sm sm:px-6',
    'md:max-w-md md:px-8',
    'lg:max-w-lg lg:px-10',
    'xl:max-w-xl xl:px-12',
    '2xl:max-w-2xl 2xl:px-16',
  ]

  // Build container classes
  const containerClasses = [
    ...responsiveClasses,
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  )
}

// Specialized container variants
export function Section({ children, className = '', ...props }: BaseComponentProps) {
  return (
    <Container
      as="section"
      className={`py-8 md:py-12 lg:py-16 ${className}`}
      {...props}
    >
      {children}
    </Container>
  )
}

export function Main({ children, className = '', ...props }: BaseComponentProps) {
  return (
    <Container
      as="main"
      className={`flex-1 ${className}`}
      {...props}
    >
      {children}
    </Container>
  )
}

export function Article({ children, className = '', ...props }: BaseComponentProps) {
  return (
    <Container
      as="article"
      size="md"
      className={`prose prose-lg max-w-none ${className}`}
      {...props}
    >
      {children}
    </Container>
  )
}

export function Aside({ children, className = '', ...props }: BaseComponentProps) {
  return (
    <Container
      as="aside"
      size="sm"
      className={`${className}`}
      {...props}
    >
      {children}
    </Container>
  )
}