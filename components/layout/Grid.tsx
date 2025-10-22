'use client'

import { BaseComponentProps } from '@/types'
import { getGridGap, getContainerPadding, BREAKPOINTS } from '@/lib/responsive-utils'

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full'

type GridItemResponsiveConfig = {
  colSpan?: ColSpan
  colStart?: number
  colEnd?: number
}

interface GridProps extends BaseComponentProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rows?: string
  minItemWidth?: string
  autoFit?: boolean
  autoFill?: boolean
  responsive?: Partial<Record<keyof typeof BREAKPOINTS, number>>
  as?: keyof JSX.IntrinsicElements
}

// Responsive column configurations
const RESPONSIVE_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const GAP_CLASSES = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

export function Grid({
  children,
  className = '',
  cols = 1,
  gap = 'md',
  rows,
  minItemWidth,
  autoFit = false,
  autoFill = false,
  responsive,
  as: Component = 'div',
  ...props
}: GridProps) {
  // Build responsive classes
  const responsiveClasses = responsive ? Object.entries(responsive)
    .map(([breakpoint, cols]) => `${breakpoint}:${RESPONSIVE_COLS[cols as keyof typeof RESPONSIVE_COLS]}`)
    .join(' ') : ''

  // Determine grid template columns
  let gridColsClass = ''
  if (autoFit && minItemWidth) {
    gridColsClass = `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`
  } else if (autoFill && minItemWidth) {
    gridColsClass = `grid-cols-[repeat(auto-fill,minmax(${minItemWidth},1fr))]`
  } else {
    gridColsClass = RESPONSIVE_COLS[cols]
  }

  // Grid template rows if specified
  const gridRowsClass = rows ? `grid-rows-[${rows}]` : ''

  const gridClasses = [
    'grid',
    gridColsClass,
    responsiveClasses,
    GAP_CLASSES[gap],
    gridRowsClass,
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component className={gridClasses} {...props}>
      {children}
    </Component>
  )
}

// Grid item component for more explicit grid control
interface GridItemProps extends BaseComponentProps {
  colSpan?: ColSpan
  rowSpan?: number
  colStart?: number
  colEnd?: number
  rowStart?: number
  rowEnd?: number
  responsive?: Partial<Record<keyof typeof BREAKPOINTS, GridItemResponsiveConfig>>
}

export function GridItem({
  children,
  className = '',
  colSpan = 1,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  responsive,
  ...props
}: GridItemProps) {
  const spanClasses = []

  // Default column span
  if (colSpan === 'full') {
    spanClasses.push('col-span-full')
  } else {
    spanClasses.push(`col-span-${colSpan}`)
  }

  // Responsive column spans
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, config]) => {
      if (config?.colSpan === 'full') {
        spanClasses.push(`${breakpoint}:col-span-full`)
      } else if (config?.colSpan) {
        spanClasses.push(`${breakpoint}:col-span-${config.colSpan}`)
      }

      if (config?.colStart) {
        spanClasses.push(`${breakpoint}:col-start-${config.colStart}`)
      }

      if (config?.colEnd) {
        spanClasses.push(`${breakpoint}:col-end-${config.colEnd}`)
      }
    })
  }

  // Manual positioning
  if (colStart) spanClasses.push(`col-start-${colStart}`)
  if (colEnd) spanClasses.push(`col-end-${colEnd}`)
  if (rowStart) spanClasses.push(`row-start-${rowStart}`)
  if (rowEnd) spanClasses.push(`row-end-${rowEnd}`)
  if (rowSpan) spanClasses.push(`row-span-${rowSpan}`)

  const itemClasses = [
    ...spanClasses,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={itemClasses} {...props}>
      {children}
    </div>
  )
}