'use client'

import { BaseComponentProps } from '@/types'
import { getResponsiveSpacing } from '@/lib/responsive-utils'

interface StackProps extends BaseComponentProps {
  direction?: 'vertical' | 'horizontal'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  divider?: boolean
  as?: 'div' | 'ul' | 'ol' | 'nav' | 'section'
  responsive?: {
    xs?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
    sm?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
    md?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
    lg?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
    xl?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
    '2xl'?: { spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; direction?: 'vertical' | 'horizontal' }
  }
}

const SPACING_CLASSES = {
  xs: {
    vertical: 'space-y-2',
    horizontal: 'space-x-2',
  },
  sm: {
    vertical: 'space-y-3',
    horizontal: 'space-x-3',
  },
  md: {
    vertical: 'space-y-4',
    horizontal: 'space-x-4',
  },
  lg: {
    vertical: 'space-y-6',
    horizontal: 'space-x-6',
  },
  xl: {
    vertical: 'space-y-8',
    horizontal: 'space-x-8',
  },
  '2xl': {
    vertical: 'space-y-12',
    horizontal: 'space-x-12',
  },
}

const ALIGN_CLASSES = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const JUSTIFY_CLASSES = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export function Stack({
  children,
  className = '',
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider = false,
  as: Component = 'div',
  responsive,
  ...props
}: StackProps) {
  // Get responsive classes
  const getResponsiveClasses = (bp: keyof typeof SPACING_CLASSES) => {
    const bpSpacing = responsive?.[bp]?.spacing || spacing
    const bpDirection = responsive?.[bp]?.direction || direction

    const spacingClass = SPACING_CLASSES[bpSpacing]?.[bpDirection] || SPACING_CLASSES[spacing]?.[direction]

    return [
      bp === 'xs' ? spacingClass : `${bp}:${spacingClass}`,
      bp === 'xs' ? (bpDirection === 'horizontal' ? 'flex-row' : 'flex-col') : `${bp}:(flex-${bpDirection === 'horizontal' ? 'row' : 'col'})`,
    ].filter(Boolean)
  }

  // Build responsive classes array
  const responsiveClasses = [
    'xs:flex-col xs:space-y-4',
    'sm:flex-col sm:space-y-4',
    'md:flex-col md:space-y-4',
    'lg:flex-col lg:space-y-6',
    'xl:flex-col xl:space-y-6',
    '2xl:flex-col 2xl:space-y-8',
  ]

  // Build base classes
  const baseClasses = [
    direction === 'horizontal' ? 'flex-row' : 'flex-col',
    SPACING_CLASSES[spacing]?.[direction],
    wrap && direction === 'horizontal' ? 'flex-wrap' : '',
    divider ? 'divide-y divide-border' : '',
    direction === 'horizontal' ? ALIGN_CLASSES[align] : JUSTIFY_CLASSES[justify],
    direction === 'vertical' ? ALIGN_CLASSES[align] : JUSTIFY_CLASSES[justify],
    className,
  ].filter(Boolean).join(' ')

  const stackClasses = [
    'flex',
    baseClasses,
    ...responsiveClasses,
  ].filter(Boolean).join(' ')

  return (
    <Component className={stackClasses} {...props}>
      {children}
    </Component>
  )
}

// Specialized stack components
export function VStack({ children, className = '', spacing = 'md', ...props }: Omit<StackProps, 'direction'>) {
  return (
    <Stack direction="vertical" spacing={spacing} className={`flex-col ${className}`} {...props}>
      {children}
    </Stack>
  )
}

export function HStack({ children, className = '', spacing = 'md', ...props }: Omit<StackProps, 'direction'>) {
  return (
    <Stack direction="horizontal" spacing={spacing} className={`flex-row ${className}`} {...props}>
      {children}
    </Stack>
  )
}

// Stack item component for explicit spacing control
interface StackItemProps extends BaseComponentProps {
  grow?: boolean | number
  shrink?: boolean | number
  basis?: string
}

export function StackItem({
  children,
  className = '',
  grow = false,
  shrink = true,
  basis = 'auto',
  ...props
}: StackItemProps) {
  const flexClasses = [
    grow === true ? 'flex-1' : grow ? `flex-[${grow}]` : '',
    shrink === false ? 'flex-shrink-0' : shrink === true ? 'flex-shrink' : shrink ? `flex-shrink-[${shrink}]` : '',
    basis !== 'auto' ? `flex-basis-[${basis}]` : 'flex-basis-auto',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  )
}