// Performance optimization utilities

export interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint
  ttfb: number // Time to First Byte
}

// Performance observer for Core Web Vitals
export function observePerformanceMetrics(callback: (metrics: PerformanceMetrics) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const metrics: Partial<PerformanceMetrics> = {}

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1] as any
    if (lastEntry) {
      metrics.lcp = lastEntry.startTime
    }
  })
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      metrics.fid = entry.processingStart - entry.startTime
    })
  })
  fidObserver.observe({ type: 'first-input', buffered: true })

  // Cumulative Layout Shift (CLS)
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    metrics.cls = clsValue
  })
  clsObserver.observe({ type: 'layout-shift', buffered: true })

  // First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const paintEntry = entries.find((entry: any) => entry.name === 'first-contentful-paint')
    if (paintEntry) {
      metrics.fcp = paintEntry.startTime
    }
  })
  fcpObserver.observe({ type: 'paint', buffered: true })

  // Time to First Byte (TTFB)
  const navigationObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const navigationEntry = entries[0] as any
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
    }
  })
  navigationObserver.observe({ type: 'navigation', buffered: true })

  // Report metrics periodically
  const reportMetrics = () => {
    callback(metrics as PerformanceMetrics)
  }

  const interval = setInterval(reportMetrics, 5000) // Report every 5 seconds

  return () => {
    lcpObserver.disconnect()
    fidObserver.disconnect()
    clsObserver.disconnect()
    fcpObserver.disconnect()
    navigationObserver.disconnect()
    clearInterval(interval)
  }
}

// Lazy loading hook for components
export function useLazyLoad(threshold: number = 0.1): (callback: () => void) => void {
  if (typeof window === 'undefined') return () => {}

  return (callback: () => void) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    return observer
  }
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  document.head.appendChild(link)
}

// Critical resource hints
export function addResourceHints(): void {
  if (typeof document === 'undefined') return

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'dns-prefetch', href: 'https://karpov.dev' },
  ]

  hints.forEach(({ rel, href, crossorigin }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (crossorigin) link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Image optimization utilities
export function getOptimizedImageSrc(
  src: string,
  width: number,
  quality: number = 75
): string {
  // This would integrate with your image optimization service
  // For now, return the original src with optimization parameters
  const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

  if (url.hostname === 'images.unsplash.com') {
    // Unsplash optimization parameters
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', quality.toString())
    url.searchParams.set('auto', 'format')
  }

  return url.toString()
}

// Bundle size monitoring
export function logBundleSize(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') return

  // This would be used with webpack bundle analyzer
  const resources = performance.getEntriesByType('resource') as any[]

  const totalSize = resources.reduce((total, resource) => {
    return total + (resource.transferSize || 0)
  }, 0)

  const jsSize = resources
    .filter(resource => resource.name.includes('.js'))
    .reduce((total, resource) => total + (resource.transferSize || 0), 0)

  console.log('Performance Metrics:', {
    totalResourcesSize: `${(totalSize / 1024).toFixed(2)} KB`,
    javascriptSize: `${(jsSize / 1024).toFixed(2)} KB`,
    resourceCount: resources.length,
  })
}

// Service worker registration for caching
export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('ServiceWorker registered successfully:', registration)
    } catch (error) {
      console.log('ServiceWorker registration failed:', error)
    }
  })
}

// Performance budget checking
export const PERFORMANCE_BUDGETS = {
  bundleSize: 500 * 1024, // 500KB gzipped
  firstContentfulPaint: 1800, // 1.8 seconds
  largestContentfulPaint: 2500, // 2.5 seconds
  cumulativeLayoutShift: 0.1, // CLS score
  firstInputDelay: 100, // 100ms
} as const

export function checkPerformanceBudget(metrics: PerformanceMetrics): {
  passed: boolean
  violations: string[]
} {
  const violations: string[] = []

  if (metrics.fcp > PERFORMANCE_BUDGETS.firstContentfulPaint) {
    violations.push(`FCP exceeded budget: ${metrics.fcp}ms > ${PERFORMANCE_BUDGETS.firstContentfulPaint}ms`)
  }

  if (metrics.lcp > PERFORMANCE_BUDGETS.largestContentfulPaint) {
    violations.push(`LCP exceeded budget: ${metrics.lcp}ms > ${PERFORMANCE_BUDGETS.largestContentfulPaint}ms`)
  }

  if (metrics.cls > PERFORMANCE_BUDGETS.cumulativeLayoutShift) {
    violations.push(`CLS exceeded budget: ${metrics.cls} > ${PERFORMANCE_BUDGETS.cumulativeLayoutShift}`)
  }

  if (metrics.fid > PERFORMANCE_BUDGETS.firstInputDelay) {
    violations.push(`FID exceeded budget: ${metrics.fid}ms > ${PERFORMANCE_BUDGETS.firstInputDelay}ms`)
  }

  return {
    passed: violations.length === 0,
    violations,
  }
}