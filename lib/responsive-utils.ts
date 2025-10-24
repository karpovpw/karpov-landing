// Responsive design utilities with design tokens integration

import { useState, useEffect } from 'react'
import { DESIGN_TOKENS } from './design-tokens'

// Responsive breakpoint hooks and utilities
export type Breakpoint = keyof typeof DESIGN_TOKENS.breakpoints
export type BreakpointValue = string | number

export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

// Media query utilities
export function createMediaQuery(breakpoint: Breakpoint, type: 'min' | 'max' = 'min'): string {
  const value = DESIGN_TOKENS.breakpoints[breakpoint]
  return `(${type}-width: ${value})`
}

// Responsive hook for client-side breakpoint detection
export function useBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'sm'

  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth

      if (width >= 1536) setBreakpoint('2xl')
      else if (width >= 1280) setBreakpoint('xl')
      else if (width >= 1024) setBreakpoint('lg')
      else if (width >= 768) setBreakpoint('md')
      else setBreakpoint('sm')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Responsive value resolver
export function resolveResponsiveValue<T>(
  responsiveValue: T | ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T {
  if (typeof responsiveValue === 'object' && responsiveValue !== null && 'base' in responsiveValue) {
    const rv = responsiveValue as ResponsiveValue<T>

    // Return the most specific breakpoint value available
    switch (currentBreakpoint) {
      case '2xl': return rv['2xl'] ?? rv.xl ?? rv.lg ?? rv.md ?? rv.sm ?? rv.base!
      case 'xl': return rv.xl ?? rv.lg ?? rv.md ?? rv.sm ?? rv.base!
      case 'lg': return rv.lg ?? rv.md ?? rv.sm ?? rv.base!
      case 'md': return rv.md ?? rv.sm ?? rv.base!
      case 'sm': return rv.sm ?? rv.base!
      default: return rv.base!
    }
  }

  return responsiveValue as T
}

// Responsive typography utilities
export function getResponsiveTypography(
  element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small',
  breakpoint: Breakpoint
): {
  fontSize: string
  lineHeight: string | number
  fontWeight: string | number
} {
  const typography = DESIGN_TOKENS.typography

  const responsiveSizes = {
    h1: { base: typography.fontSize['4xl'], lg: typography.fontSize['5xl'] },
    h2: { base: typography.fontSize['3xl'], lg: typography.fontSize['4xl'] },
    h3: { base: typography.fontSize['2xl'], lg: typography.fontSize['3xl'] },
    h4: { base: typography.fontSize.xl, lg: typography.fontSize['2xl'] },
    h5: { base: typography.fontSize.lg, lg: typography.fontSize.xl },
    h6: { base: typography.fontSize.base, lg: typography.fontSize.lg },
    p: { base: typography.fontSize.base, sm: typography.fontSize.sm },
    small: { base: typography.fontSize.sm, sm: typography.fontSize.xs },
  }

  const size = responsiveSizes[element]
  const fontSize = resolveResponsiveValue(size, breakpoint)

  const lineHeight = element.startsWith('h') ? typography.lineHeight.tight : typography.lineHeight.normal
  const fontWeight = element.startsWith('h') ? typography.fontWeight.semibold : typography.fontWeight.normal

  return { fontSize, lineHeight, fontWeight }
}

// Responsive spacing utilities
export function getResponsiveSpacing(
  property: 'padding' | 'margin' | 'gap',
  direction: 'all' | 'x' | 'y' | 't' | 'r' | 'b' | 'l',
  size: keyof typeof DESIGN_TOKENS.spacing,
  breakpoint: Breakpoint
): string {
  const baseSpacing = DESIGN_TOKENS.spacing[size]

  // Responsive spacing scale
  const responsiveScale: Record<string, Record<string | number, string>> = {
    sm: { 0: '0', 1: '0.125rem', 2: '0.25rem', 3: '0.375rem', 4: '0.5rem', 5: '0.625rem', 6: '0.75rem', 8: '1rem' },
    md: { 0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem' },
    lg: { 0: '0', 1: '0.5rem', 2: '1rem', 3: '1.5rem', 4: '2rem', 5: '2.5rem', 6: '3rem', 8: '4rem' },
    xl: { 0: '0', 1: '0.75rem', 2: '1.5rem', 3: '2.25rem', 4: '3rem', 5: '3.75rem', 6: '4.5rem', 8: '6rem' },
    '2xl': { 0: '0', 1: '1rem', 2: '2rem', 3: '3rem', 4: '4rem', 5: '5rem', 6: '6rem', 8: '8rem' },
  }

  const currentScale = responsiveScale[breakpoint] || responsiveScale.md
  const spacingValue = currentScale[size] || baseSpacing

  return direction === 'all' ? `${property}: ${spacingValue}` : `${property}${direction}: ${spacingValue}`
}

// Responsive grid utilities
export interface ResponsiveGridConfig {
  cols?: ResponsiveValue<number>
  gap?: ResponsiveValue<string>
  minItemWidth?: string
}

export function generateResponsiveGridCSS(
  config: ResponsiveGridConfig,
  breakpoint: Breakpoint
): string {
  const cols = resolveResponsiveValue(config.cols || 1, breakpoint)
  const gap = resolveResponsiveValue(config.gap || '1rem', breakpoint)

  if (config.minItemWidth) {
    return `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(${config.minItemWidth}, 1fr));
      gap: ${gap};
    `
  }

  return `
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    gap: ${gap};
  `
}

// Responsive container utilities
export function getResponsiveContainerWidth(breakpoint: Breakpoint): string {
  const containerWidths = {
    sm: '100%',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }

  return containerWidths[breakpoint] || containerWidths.md
}

export function getResponsiveContainerPadding(breakpoint: Breakpoint): string {
  const padding = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
    '2xl': '6rem',
  }

  return `padding-left: ${padding[breakpoint]}; padding-right: ${padding[breakpoint]}`
}

// Responsive image utilities
export interface ResponsiveImageConfig {
  src: string
  alt: string
  aspectRatio?: ResponsiveValue<string>
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
}

export function generateResponsiveImageCSS(
  config: ResponsiveImageConfig,
  breakpoint: Breakpoint
): string {
  const aspectRatio = resolveResponsiveValue(config.aspectRatio || '16/9', breakpoint)

  return `
    aspect-ratio: ${aspectRatio};
    object-fit: ${config.objectFit || 'cover'};
    width: 100%;
    height: auto;
  `
}

// Responsive utility classes generator
export function generateResponsiveClasses(
  property: string,
  values: ResponsiveValue<string | number>,
  unit: string = ''
): string {
  const classes: string[] = []

  if (values.base) classes.push(`${property}-${values.base}${unit}`)
  if (values.sm) classes.push(`sm:${property}-${values.sm}${unit}`)
  if (values.md) classes.push(`md:${property}-${values.md}${unit}`)
  if (values.lg) classes.push(`lg:${property}-${values.lg}${unit}`)
  if (values.xl) classes.push(`xl:${property}-${values.xl}${unit}`)
  if (values['2xl']) classes.push(`2xl:${property}-${values['2xl']}${unit}`)

  return classes.join(' ')
}

// Responsive font scale utilities
export function getResponsiveFontScale(
  scale: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
  breakpoint: Breakpoint
): string {
  const scales = {
    xs: { base: '0.75rem', lg: '0.75rem' },
    sm: { base: '0.875rem', lg: '0.875rem' },
    base: { base: '1rem', lg: '1rem' },
    lg: { base: '1.125rem', lg: '1.125rem' },
    xl: { base: '1.25rem', lg: '1.25rem' },
    '2xl': { base: '1.5rem', lg: '1.875rem' },
    '3xl': { base: '1.875rem', lg: '2.25rem' },
    '4xl': { base: '2.25rem', lg: '3rem' },
  }

  const responsiveScale = scales[scale]
  return resolveResponsiveValue(responsiveScale, breakpoint)
}

// Responsive border radius utilities
export function getResponsiveBorderRadius(
  radius: keyof typeof DESIGN_TOKENS.radius,
  breakpoint: Breakpoint
): string {
  const baseRadius = DESIGN_TOKENS.radius[radius]

  // Responsive radius scale
  const responsiveRadius: Record<string, Record<string, string>> = {
    sm: { none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem', '2xl': '0.75rem', '3xl': '1rem' },
    md: { none: '0', sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem' },
    lg: { none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', '2xl': '1.5rem', '3xl': '2rem' },
    xl: { none: '0', sm: '0.375rem', md: '0.75rem', lg: '1rem', '2xl': '1.5rem', '3xl': '2.25rem' },
    '2xl': { none: '0', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '2.5rem', '3xl': '3rem' },
  }

  const currentScale = responsiveRadius[breakpoint] || responsiveRadius.md
  return currentScale[radius] || baseRadius
}

// Responsive shadow utilities
export function getResponsiveShadow(
  elevation: 'none' | 'sm' | 'md' | 'lg' | 'xl',
  breakpoint: Breakpoint
): string {
  const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  }

  // Scale shadows responsively
  const responsiveShadows: Record<string, string | Record<string, string>> = {
    sm: shadows,
    md: shadows,
    lg: { none: shadows.none, sm: shadows.md, md: shadows.lg, lg: shadows.lg, xl: shadows.xl },
    xl: { none: shadows.none, sm: shadows.md, md: shadows.lg, lg: shadows.xl, xl: shadows.xl },
    '2xl': { none: shadows.none, sm: shadows.lg, md: shadows.xl, lg: shadows.xl, xl: shadows.xl },
  }

  const currentShadows = responsiveShadows[breakpoint] || shadows
  return typeof currentShadows === 'string' ? currentShadows : currentShadows[elevation]
}

// Responsive animation utilities
export function getResponsiveAnimationDuration(
  duration: keyof typeof DESIGN_TOKENS.animations.duration,
  breakpoint: Breakpoint
): string {
  const baseDuration = DESIGN_TOKENS.animations.duration[duration]

  // Responsive animation scale
  const responsiveDurations: Record<string, Record<string, string>> = {
    sm: { fast: '100ms', normal: '200ms', slow: '300ms', slower: '500ms' },
    md: { fast: '150ms', normal: '300ms', slow: '500ms', slower: '800ms' },
    lg: { fast: '200ms', normal: '400ms', slow: '700ms', slower: '1200ms' },
    xl: { fast: '250ms', normal: '500ms', slow: '900ms', slower: '1500ms' },
    '2xl': { fast: '300ms', normal: '600ms', slow: '1100ms', slower: '1800ms' },
  }

  const currentScale = responsiveDurations[breakpoint] || responsiveDurations.md
  return currentScale[duration] || baseDuration
}

// Responsive z-index utilities
export function getResponsiveZIndex(
  level: keyof typeof DESIGN_TOKENS.zIndex,
  breakpoint: Breakpoint
): string | number {
  const zIndex = DESIGN_TOKENS.zIndex[level]

  // Responsive z-index scale
  const responsiveZIndex: Record<string, Record<string, string | number>> = {
    sm: { auto: 'auto', 0: 0, 10: 10, 20: 20, 30: 30, 40: 40, 50: 50 },
    md: DESIGN_TOKENS.zIndex,
    lg: { auto: 'auto', 0: 0, 10: 15, 20: 25, 30: 35, 40: 45, 50: 55 },
    xl: { auto: 'auto', 0: 0, 10: 20, 20: 30, 30: 40, 40: 50, 50: 60 },
    '2xl': { auto: 'auto', 0: 0, 10: 25, 20: 35, 30: 45, 40: 55, 50: 65 },
  }

  const currentScale = responsiveZIndex[breakpoint] || responsiveZIndex.md
  return currentScale[level]
}

// Mobile-first responsive utilities
export function mobileFirst(classes: TemplateStringsArray, ...values: ResponsiveValue<any>[]): string {
  const result: string[] = []

  classes.forEach((classStr, index) => {
    result.push(classStr)

    if (index < values.length) {
      const value = values[index]

      if (typeof value === 'object' && value !== null && 'base' in value) {
        const responsiveClasses = generateResponsiveClasses('', value as ResponsiveValue<string>, '')
        if (responsiveClasses) result.push(responsiveClasses)
      } else {
        result.push(String(value))
      }
    }
  })

  return result.join('').trim()
}

// Responsive utility for CSS-in-JS
export function createResponsiveStyles(
  styles: Record<string, ResponsiveValue<any>>,
  breakpoint: Breakpoint
): Record<string, any> {
  const resolvedStyles: Record<string, any> = {}

  Object.entries(styles).forEach(([property, responsiveValue]: [string, ResponsiveValue<any>]) => {
    resolvedStyles[property] = resolveResponsiveValue(responsiveValue, breakpoint)
  })

  return resolvedStyles
}

// Legacy exports for backward compatibility with existing components
export const BREAKPOINTS = DESIGN_TOKENS.breakpoints
export const CONTAINER_MAX_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
}

export function getGridGap(size: keyof typeof DESIGN_TOKENS.spacing): string {
  return DESIGN_TOKENS.spacing[size]
}

export function getContainerPadding(breakpoint: Breakpoint): string {
  const paddingMap = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
    '2xl': '6rem',
  }
  return paddingMap[breakpoint]
}

// Hook for responsive utilities
export function useResponsive() {
  const breakpoint = useBreakpoint()

  return {
    breakpoint,
    isMobile: breakpoint === 'sm',
    isTablet: ['md', 'lg'].indexOf(breakpoint) !== -1,
    isDesktop: ['xl', '2xl'].indexOf(breakpoint) !== -1,
    isLargeScreen: breakpoint === '2xl',

    // Utility functions
    getResponsiveValue: <T>(value: T | ResponsiveValue<T>) =>
      resolveResponsiveValue(value, breakpoint),
    getResponsiveSpacing: (property: 'padding' | 'margin' | 'gap', size: keyof typeof DESIGN_TOKENS.spacing) =>
      getResponsiveSpacing(property, 'all', size, breakpoint),
    getResponsiveTypography: (element: Parameters<typeof getResponsiveTypography>[0]) =>
      getResponsiveTypography(element, breakpoint),
  }
}