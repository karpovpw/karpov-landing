// Comprehensive error handling utilities for the design system

// Type declarations for Node.js environment
declare const process: { env: { NODE_ENV: string } }

export interface ErrorContext {
  component?: string
  action?: string
  breakpoint?: string
  theme?: string
  metadata?: Record<string, any>
}

export interface ErrorReport {
  message: string
  stack?: string
  context: ErrorContext
  timestamp: number
  userAgent?: string
  url?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low' as const,
  MEDIUM: 'medium' as const,
  HIGH: 'high' as const,
  CRITICAL: 'critical' as const,
}

// Error boundary hook for React components
export function useErrorHandler(componentName: string) {
  const handleError = (error: Error, errorInfo?: ErrorContext) => {
    reportError(error, {
      component: componentName,
      ...errorInfo,
    })
  }

  const handleAsyncError = async (asyncFn: () => Promise<any>, context?: ErrorContext) => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error, context)
      throw error // Re-throw to maintain error flow
    }
  }

  return { handleError, handleAsyncError }
}

// Centralized error reporting system
const errorListeners: Array<(report: ErrorReport) => void> = []
let errorBuffer: ErrorReport[] = []
const MAX_BUFFER_SIZE = 100

export function reportError(
  error: Error | string,
  context: ErrorContext = {},
  severity: ErrorReport['severity'] = 'medium'
): void {
  const errorMessage = typeof error === 'string' ? error : error.message
  const errorStack = typeof error === 'object' && error.stack ? error.stack : undefined

  const report: ErrorReport = {
    message: errorMessage,
    stack: errorStack,
    context,
    timestamp: Date.now(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    severity,
  }

  // Add to buffer
  errorBuffer.push(report)
  if (errorBuffer.length > MAX_BUFFER_SIZE) {
    errorBuffer.shift() // Remove oldest error
  }

  // Notify listeners
  errorListeners.forEach(listener => {
    try {
      listener(report)
    } catch (listenerError) {
      console.error('Error in error listener:', listenerError)
    }
  })

  // Log based on severity
  switch (severity) {
    case 'critical':
      console.error('🚨 CRITICAL ERROR:', report)
      break
    case 'high':
      console.error('❌ HIGH PRIORITY ERROR:', report)
      break
    case 'medium':
      console.warn('⚠️ MEDIUM PRIORITY ERROR:', report)
      break
    case 'low':
      console.info('ℹ️ LOW PRIORITY ERROR:', report)
      break
  }

  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production' && severity !== 'low') {
    sendToErrorReportingService(report)
  }
}

// Error reporting service integration (placeholder)
async function sendToErrorReportingService(report: ErrorReport): Promise<void> {
  try {
    // This would integrate with services like Sentry, LogRocket, etc.
    // For now, we'll use a simple fetch to a hypothetical endpoint
    if (typeof fetch !== 'undefined') {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: report.message,
          stack: report.stack,
          context: report.context,
          timestamp: report.timestamp,
          severity: report.severity,
          userAgent: report.userAgent,
          url: report.url,
        }),
      })
    }
  } catch (error) {
    // Silent fail for error reporting
    console.warn('Failed to send error report:', error)
  }
}

// Subscribe to error reports
export function onErrorReported(callback: (report: ErrorReport) => void): () => void {
  errorListeners.push(callback)

  // Return unsubscribe function
  return () => {
    const index = errorListeners.indexOf(callback)
    if (index > -1) {
      errorListeners.splice(index, 1)
    }
  }
}

// Get error statistics
export function getErrorStats(): {
  total: number
  bySeverity: Record<ErrorReport['severity'], number>
  recentErrors: ErrorReport[]
  topComponents: Array<{ component: string; count: number }>
} {
  const bySeverity = errorBuffer.reduce((acc, report) => {
    acc[report.severity] = (acc[report.severity] || 0) + 1
    return acc
  }, {} as Record<ErrorReport['severity'], number>)

  const componentErrors = errorBuffer.reduce((acc, report) => {
    const component = report.context.component || 'unknown'
    acc[component] = (acc[component] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topComponents = Object.entries(componentErrors)
    .map(([component, count]: [string, number]) => ({ component, count }))
    .sort((a: { component: string; count: number }, b: { component: string; count: number }) => b.count - a.count)
    .slice(0, 10)

  return {
    total: errorBuffer.length,
    bySeverity,
    recentErrors: [...errorBuffer].reverse().slice(0, 50),
    topComponents,
  }
}

// Safe async wrapper
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback?: T,
  context?: ErrorContext
): Promise<T> {
  try {
    return await asyncFn()
  } catch (error) {
    reportError(error as Error, context, 'medium')
    if (fallback !== undefined) {
      return fallback
    }
    throw error
  }
}

// Safe sync wrapper
export function safeSync<T>(
  syncFn: () => T,
  fallback?: T,
  context?: ErrorContext
): T {
  try {
    return syncFn()
  } catch (error) {
    reportError(error as Error, context, 'medium')
    if (fallback !== undefined) {
      return fallback
    }
    throw error
  }
}

// Retry mechanism for transient failures
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  context?: ErrorContext
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        reportError(lastError, {
          ...context,
          action: `retry-failed-after-${maxRetries}-attempts`,
        }, 'high')
        throw lastError
      }

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}

// DOM operation safety wrappers
export function safeQuerySelector<T extends Element = Element>(
  selector: string,
  context?: ErrorContext
): T | null {
  return safeSync(
    () => {
      if (typeof document === 'undefined') return null
      return document.querySelector<T>(selector)
    },
    null,
    { ...context, action: 'querySelector' }
  )
}

export function safeQuerySelectorAll<T extends Element = Element>(
  selector: string,
  context?: ErrorContext
): NodeListOf<T> | null {
  return safeSync(
    () => {
      if (typeof document === 'undefined') return null
      return document.querySelectorAll<T>(selector)
    },
    null,
    { ...context, action: 'querySelectorAll' }
  )
}

// Storage operation safety wrappers
export function safeLocalStorageGet(
  key: string,
  fallback?: string,
  context?: ErrorContext
): string | null {
  return safeSync(
    () => {
      if (typeof window === 'undefined' || !window.localStorage) return fallback || null
      try {
        return localStorage.getItem(key)
      } catch (error) {
        // Handle private browsing mode or disabled storage
        return fallback || null
      }
    },
    fallback || null,
    { ...context, action: 'localStorage.getItem' }
  )
}

export function safeLocalStorageSet(
  key: string,
  value: string,
  context?: ErrorContext
): boolean {
  return safeSync(
    () => {
      if (typeof window === 'undefined' || !window.localStorage) return false
      try {
        localStorage.setItem(key, value)
        return true
      } catch (error) {
        reportError(error as Error, { ...context, action: 'localStorage.setItem' }, 'low')
        return false
      }
    },
    false,
    { ...context, action: 'localStorage.setItem' }
  )
}

// Network operation safety wrapper
export async function safeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  context?: ErrorContext
): Promise<Response | null> {
  return safeAsync(
    async () => {
      if (typeof fetch === 'undefined') throw new Error('Fetch not available')

      const response = await fetch(input, init)

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response
    },
    null,
    { ...context, action: 'fetch' }
  )
}

// Performance monitoring error handling
export function safePerformanceMark(markName: string, context?: ErrorContext): boolean {
  return safeSync(
    () => {
      if (typeof performance === 'undefined' || typeof performance.mark !== 'function') {
        return false
      }
      performance.mark(markName)
      return true
    },
    false,
    { ...context, action: 'performance.mark' }
  )
}

// Intersection Observer safety wrapper
export function safeIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
  context?: ErrorContext
): IntersectionObserver | null {
  return safeSync(
    () => {
      if (typeof IntersectionObserver === 'undefined') return null
      return new IntersectionObserver(callback, options)
    },
    null,
    { ...context, action: 'IntersectionObserver' }
  )
}

// ResizeObserver safety wrapper
export function safeResizeObserver(
  callback: ResizeObserverCallback,
  context?: ErrorContext
): ResizeObserver | null {
  return safeSync(
    () => {
      if (typeof ResizeObserver === 'undefined') return null
      return new ResizeObserver(callback)
    },
    null,
    { ...context, action: 'ResizeObserver' }
  )
}

// Animation frame safety wrapper
export function safeRequestAnimationFrame(
  callback: FrameRequestCallback,
  context?: ErrorContext
): number | null {
  return safeSync(
    () => {
      if (typeof requestAnimationFrame === 'undefined') return null
      return requestAnimationFrame(callback)
    },
    null,
    { ...context, action: 'requestAnimationFrame' }
  )
}

// Initialize error handling system
export function initializeErrorHandling(): void {
  if (typeof window === 'undefined') return

  // Global error handler
  window.addEventListener('error', (event) => {
    reportError(
      new Error(event.message),
      {
        action: 'window-error',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      },
      'high'
    )
  })

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    reportError(
      new Error(event.reason?.message || 'Unhandled promise rejection'),
      {
        action: 'unhandled-promise-rejection',
        metadata: { reason: event.reason },
      },
      'high'
    )
  })

  // Performance errors
  if (typeof window.PerformanceObserver !== 'undefined') {
    try {
      const observer = new window.PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Report long tasks as potential performance issues
          if (entry.entryType === 'longtask' && entry.duration > 50) {
            reportError(
              `Long task detected: ${entry.duration}ms`,
              {
                action: 'performance-long-task',
                metadata: {
                  duration: entry.duration,
                  entryType: entry.entryType,
                },
              },
              'medium'
            )
          }
        })
      })

      observer.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      // Silently handle if Long Task API is not available
    }
  }
}

// Development error utilities
export function logErrorBoundary(
  error: Error,
  errorInfo: { componentStack: string },
  context?: ErrorContext
): void {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔥 React Error Boundary')
    console.error('Error:', error)
    console.log('Component Stack:', errorInfo.componentStack)
    console.log('Context:', context)
    console.groupEnd()
  }

  reportError(error, {
    ...context,
    metadata: {
      ...context?.metadata,
      componentStack: errorInfo.componentStack,
      boundary: true,
    },
  }, 'high')
}