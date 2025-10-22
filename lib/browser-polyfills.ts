// Browser compatibility polyfills for production deployment

// Simple, safe browser polyfills
export function initializeBrowserPolyfills(): void {
  if (typeof window === 'undefined') return

  try {
    // ResizeObserver polyfill - simple stub to prevent errors
    if (!window.ResizeObserver) {
      window.ResizeObserver = function(callback: any) {
        return {
          observe: function() {},
          unobserve: function() {},
          disconnect: function() {}
        }
      } as any
    }

    // IntersectionObserver polyfill - simple stub to prevent errors
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = function(callback: any, options?: any) {
        return {
          observe: function() {},
          unobserve: function() {},
          disconnect: function() {}
        }
      } as any
    }

    // requestAnimationFrame polyfill
    if (!window.requestAnimationFrame) {
      let lastTime = 0
      window.requestAnimationFrame = function(callback: any) {
        const currentTime = Date.now()
        const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
        const id = setTimeout(() => callback(currentTime), timeToCall)
        lastTime = currentTime
        return id
      }

      window.cancelAnimationFrame = function(id: number) {
        clearTimeout(id)
      }
    }

    // Performance polyfill
    if (!window.performance) {
      window.performance = {
        now: () => Date.now(),
        mark: (name: string) => {},
        getEntriesByName: (name: string) => [],
        getEntriesByType: (type: string) => []
      } as any
    }
  } catch (error) {
    // Silently handle polyfill errors in production
    // Only log in development if we can detect it
    if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
      console.warn('Browser polyfill initialization failed:', error)
    }
  }
}

// Auto-initialize when module loads
initializeBrowserPolyfills()

// Export a simple browser support check
export function checkBrowserSupport(): {
  resizeObserver: boolean
  intersectionObserver: boolean
  requestAnimationFrame: boolean
  performance: boolean
} {
  if (typeof window === 'undefined') {
    return {
      resizeObserver: false,
      intersectionObserver: false,
      requestAnimationFrame: false,
      performance: false
    }
  }

  return {
    resizeObserver: 'ResizeObserver' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    performance: 'performance' in window
  }
}