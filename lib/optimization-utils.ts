// Advanced optimization utilities for enhanced performance

import { DESIGN_TOKENS } from './design-tokens'

// Type declarations for browser APIs
declare const process: { env: { NODE_ENV: string } }
declare global {
  interface Window {
    gc?: () => void
  }
  interface Navigator {
    connection?: {
      effectiveType: string
    }
  }
}

// Code splitting utilities
export interface CodeSplitConfig {
  chunkName?: string
  priority?: 'low' | 'normal' | 'high'
  preload?: boolean
}

export function createCodeSplitter(config: CodeSplitConfig = {}) {
  const { chunkName, priority = 'normal', preload = false } = config

  return {
    split: (importFn: () => Promise<any>) => {
      if (typeof window === 'undefined') return importFn()

      const importPromise = importFn()
      if (preload && chunkName) {
        preloadChunk(chunkName)
      }
      return importPromise
    },
    priority,
    chunkName,
  }
}

// Asset optimization utilities
export interface AssetOptimizationOptions {
  maxWidth?: number
  quality?: number
  format?: 'webp' | 'avif' | 'original'
  progressive?: boolean
}

export function getOptimizedAssetPath(
  assetPath: string,
  options: AssetOptimizationOptions = {}
): string {
  const { maxWidth = 1920, quality = 85, format = 'webp', progressive = true } = options

  // This would integrate with your image optimization service
  const url = new URL(assetPath, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

  // Add optimization parameters based on format
  switch (format) {
    case 'webp':
      url.searchParams.set('fm', 'webp')
      break
    case 'avif':
      url.searchParams.set('fm', 'avif')
      break
  }

  url.searchParams.set('w', maxWidth.toString())
  url.searchParams.set('q', quality.toString())

  if (progressive) {
    url.searchParams.set('progressive', 'true')
  }

  return url.toString()
}

// Memory management utilities
export function cleanupMemory(): void {
  if (typeof window === 'undefined') return

  // Force garbage collection if available (development mode)
  if (process.env.NODE_ENV === 'development' && 'gc' in window) {
    ;(window as any).gc()
  }

  // Clear event listeners that might be lingering
  const detachedElements = document.querySelectorAll('[data-detached]')
  detachedElements.forEach(el => el.remove())

  // Clear any cached computations
  clearComputedCache()
}

// Computed value cache for expensive operations
const computedCache = new Map<string, { value: any; timestamp: number; ttl: number }>()

export function cacheComputedValue<T>(
  key: string,
  computeFn: () => T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): T {
  const cached = computedCache.get(key)

  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.value
  }

  const value = computeFn()
  computedCache.set(key, { value, timestamp: Date.now(), ttl })

  return value
}

export function clearComputedCache(): void {
  computedCache.clear()
}

// Preload critical resources
export function preloadCriticalResources(): void {
  if (typeof document === 'undefined') return

  const criticalResources = [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true },
    { href: '/fonts/inter-var.woff2', rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: true },
  ]

  criticalResources.forEach(({ href, rel, crossorigin, as, type }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (as) link.as = as
    if (type) link.type = type
    if (crossorigin) link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Critical path optimization
export interface CriticalPathConfig {
  aboveFold?: boolean
  defer?: boolean
  priority?: 'high' | 'low'
}

export function optimizeCriticalPath(
  element: HTMLElement,
  config: CriticalPathConfig = {}
): void {
  const { aboveFold = false, defer = false, priority = 'low' } = config

  if (aboveFold) {
    // Ensure element is in critical rendering path
    element.setAttribute('data-critical', 'true')

    // Add to head for critical CSS
    if (element.tagName === 'STYLE') {
      const head = document.head
      if (head && !head.contains(element)) {
        head.appendChild(element)
      }
    }
  }

  if (defer) {
    element.setAttribute('defer', '')
  }

  element.setAttribute('data-priority', priority)
}

// Progressive enhancement utilities
export function progressiveEnhance(
  selector: string,
  enhancer: (element: Element) => void,
  options: { timeout?: number; fallback?: () => void } = {}
): void {
  const { timeout = 5000, fallback } = options

  const elements = document.querySelectorAll(selector)

  if (elements.length === 0) {
    if (fallback) fallback()
    return
  }

  const enhanceElement = (element: Element, index: number) => {
    // Add slight delay for progressive enhancement
    setTimeout(() => {
      try {
        enhancer(element)
        element.setAttribute('data-enhanced', 'true')
      } catch (error) {
        console.warn(`Progressive enhancement failed for element ${index}:`, error)
        if (fallback) fallback()
      }
    }, index * 100) // Stagger enhancements
  }

  elements.forEach(enhanceElement)

  // Timeout fallback
  if (timeout > 0) {
    setTimeout(() => {
      const enhancedCount = document.querySelectorAll(`${selector}[data-enhanced]`).length
      if (enhancedCount === 0 && fallback) {
        fallback()
      }
    }, timeout)
  }
}

// Bundle optimization helpers
export function analyzeBundleImpact(): {
  totalSize: number
  componentSizes: Record<string, number>
  recommendations: string[]
} {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return {
      totalSize: 0,
      componentSizes: {},
      recommendations: ['Bundle analysis not available in this environment']
    }
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  const jsResources = resources.filter(r => r.name.includes('.js'))

  const totalSize = jsResources.reduce((total, resource) => {
    return total + (resource.transferSize || resource.decodedBodySize || 0)
  }, 0)

  const componentSizes: Record<string, number> = {}
  jsResources.forEach(resource => {
    const name = resource.name.split('/').pop() || 'unknown'
    componentSizes[name] = resource.transferSize || resource.decodedBodySize || 0
  })

  const recommendations: string[] = []

  if (totalSize > 500 * 1024) {
    recommendations.push('Consider code splitting for large bundles')
  }

  if (Object.keys(componentSizes).length > 10) {
    recommendations.push('Bundle has many chunks - consider consolidation')
  }

  const largeChunks = Object.entries(componentSizes).filter(([_, size]: [string, number]) => size > 100 * 1024)
  if (largeChunks.length > 0) {
    recommendations.push(`Large chunks detected: ${largeChunks.map(([name]: [string, number]) => name).join(', ')}`)
  }

  return {
    totalSize,
    componentSizes,
    recommendations
  }
}

// Lazy loading strategies
export interface LazyLoadStrategy {
  type: 'viewport' | 'interaction' | 'time' | 'network'
  threshold?: number
  delay?: number
}

export function createLazyLoader(strategy: LazyLoadStrategy) {
  const { type, threshold = 0.1, delay = 0 } = strategy

  return {
    load: (loadFn: () => void | Promise<void>) => {
      const executeLoad = async () => {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        if (loadFn.length > 0) {
          await loadFn()
        } else {
          loadFn()
        }
      }

      switch (type) {
        case 'viewport':
          return createViewportLoader(executeLoad, threshold)
        case 'interaction':
          return createInteractionLoader(executeLoad)
        case 'time':
          return createTimeLoader(executeLoad, threshold)
        case 'network':
          return createNetworkLoader(executeLoad, threshold)
        default:
          executeLoad()
      }
    }
  }
}

// Viewport-based lazy loading
function createViewportLoader(loadFn: () => void | Promise<void>, threshold: number) {
  if (typeof window === 'undefined') return () => {}

  return () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadFn()
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    // Observe a placeholder element or trigger immediately
    const placeholder = document.createElement('div')
    document.body.appendChild(placeholder)
    observer.observe(placeholder)

    return () => observer.disconnect()
  }
}

// Interaction-based lazy loading
function createInteractionLoader(loadFn: () => void | Promise<void>) {
  if (typeof window === 'undefined') return () => {}

  const handleInteraction = () => {
    loadFn()
    ;['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
      window.removeEventListener(event, handleInteraction, true)
    })
  }

  ;['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    window.addEventListener(event, handleInteraction, true)
  })

  return () => {
    ;['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
      window.removeEventListener(event, handleInteraction, true)
    })
  }
}

// Time-based lazy loading
function createTimeLoader(loadFn: () => void | Promise<void>, threshold: number) {
  return () => {
    setTimeout(loadFn, threshold)
  }
}

// Network-based lazy loading
function createNetworkLoader(loadFn: () => void | Promise<void>, threshold: number) {
  if (typeof navigator === 'undefined') return () => loadFn()

  return () => {
    if (navigator.connection) {
      const connection = navigator.connection as any
      if (connection.effectiveType && ['slow-2g', '2g'].indexOf(connection.effectiveType) !== -1) {
        setTimeout(loadFn, threshold)
      } else {
        loadFn()
      }
    } else {
      loadFn()
    }
  }
}

// Preload critical chunks
export function preloadChunk(chunkName: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'modulepreload'
  link.href = chunkName
  document.head.appendChild(link)
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: number | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Animation frame optimization
export function optimizedAnimationFrame(callback: (deltaTime: number) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  let lastTime = 0
  let animationId: number

  const animate = (currentTime: number) => {
    const deltaTime = currentTime - lastTime
    callback(deltaTime)
    lastTime = currentTime
    animationId = requestAnimationFrame(animate)
  }

  animationId = requestAnimationFrame(animate)

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
}