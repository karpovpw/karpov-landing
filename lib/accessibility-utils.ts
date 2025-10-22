// Accessibility utilities for WCAG 2.1 AA compliance

export interface FocusRingOptions {
  width?: string
  color?: string
  offset?: string
  radius?: string
}

// Focus management utilities
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// Skip link functionality
export function setupSkipLinks(): void {
  if (typeof document === 'undefined') return

  const skipLinks = document.querySelectorAll('[data-skip-link]')

  skipLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = (link as HTMLElement).dataset.skipLink
      const target = document.getElementById(targetId || '')

      if (target) {
        target.focus()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

// ARIA live region utilities
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') return

  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.className = 'sr-only'
  liveRegion.textContent = message

  document.body.appendChild(liveRegion)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(liveRegion)
  }, 1000)
}

// Color contrast utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const lum1 = getLuminance(rgb1)
  const lum2 = getLuminance(rgb2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

// Check if color combination meets WCAG standards
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background)

  const requirements = {
    AA: {
      normal: 4.5,
      large: 3,
    },
    AAA: {
      normal: 7,
      large: 4.5,
    },
  }

  return ratio >= requirements[level][size]
}

// Focus indicator utilities
export function applyFocusRing(
  element: HTMLElement,
  options: FocusRingOptions = {}
): void {
  const {
    width = '2px',
    color = 'hsl(var(--primary))',
    offset = '2px',
    radius = '4px',
  } = options

  element.style.outline = 'none'
  element.style.boxShadow = `0 0 0 ${width} ${color}`
  element.style.borderRadius = radius

  const handleFocus = () => {
    element.style.boxShadow = `0 0 0 ${width} ${color}, 0 0 0 calc(${width} + ${offset}) ${color}33`
  }

  const handleBlur = () => {
    element.style.boxShadow = `0 0 0 ${width} ${color}`
  }

  element.addEventListener('focus', handleFocus)
  element.addEventListener('blur', handleBlur)

  // Store cleanup function for later use
  ;(element as any)._focusRingCleanup = () => {
    element.removeEventListener('focus', handleFocus)
    element.removeEventListener('blur', handleBlur)
  }
}

// Keyboard navigation utilities
export function makeKeyboardNavigable(
  element: HTMLElement,
  options: {
    onEnter?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
  } = {}
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        options.onEnter?.()
        break
      case 'Escape':
        options.onEscape?.()
        break
      case 'ArrowUp':
        options.onArrowUp?.()
        e.preventDefault()
        break
      case 'ArrowDown':
        options.onArrowDown?.()
        e.preventDefault()
        break
      case 'ArrowLeft':
        options.onArrowLeft?.()
        e.preventDefault()
        break
      case 'ArrowRight':
        options.onArrowRight?.()
        e.preventDefault()
        break
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

// Reduced motion utilities
export function respectsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function addReducedMotionStyles(): void {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.textContent = `
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `
  document.head.appendChild(style)
}

// High contrast mode utilities
export function isHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-contrast: high)').matches
}

export function addHighContrastStyles(): void {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.textContent = `
    @media (prefers-contrast: high) {
      .glass-card {
        background: hsl(var(--background)) !important;
        border: 2px solid hsl(var(--foreground)) !important;
        backdrop-filter: none !important;
      }

      .glass-button {
        background: hsl(var(--background)) !important;
        border: 2px solid hsl(var(--foreground)) !important;
        color: hsl(var(--foreground)) !important;
      }
    }
  `
  document.head.appendChild(style)
}

// Screen reader only content
export function addScreenReaderOnlyStyles(): void {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .sr-only:focus {
      position: static;
      width: auto;
      height: auto;
      padding: initial;
      margin: initial;
      overflow: visible;
      clip: auto;
      white-space: normal;
    }
  `
  document.head.appendChild(style)
}

// Initialize all accessibility features
export function initializeAccessibility(): void {
  addScreenReaderOnlyStyles()
  addReducedMotionStyles()
  addHighContrastStyles()
  setupSkipLinks()
}

// ARIA utilities for dynamic content
export function updateAriaExpanded(trigger: HTMLElement, expanded: boolean): void {
  trigger.setAttribute('aria-expanded', expanded.toString())

  // Update aria-controls if the trigger controls a collapsible element
  const controls = trigger.getAttribute('aria-controls')
  if (controls) {
    const controlledElement = document.getElementById(controls)
    if (controlledElement) {
      controlledElement.setAttribute('aria-hidden', (!expanded).toString())
    }
  }
}

export function setAriaLabel(element: HTMLElement, label: string): void {
  element.setAttribute('aria-label', label)
}

export function setAriaLabelledBy(element: HTMLElement, labelId: string): void {
  element.setAttribute('aria-labelledby', labelId)
}

export function setAriaDescribedBy(element: HTMLElement, descriptionId: string): void {
  element.setAttribute('aria-describedby', descriptionId)
}