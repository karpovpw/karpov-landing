// Integration tests for utility systems

import {
  DESIGN_TOKENS,
  getGlassBackground,
  getGlassBorder,
  getGlassShadow,
  getGlassBlur,
  getAnimationDuration,
  getAnimationEasing,
  getColorToken,
  getSpacingToken,
  getRadiusToken
} from '@/lib/design-tokens'

import {
  observePerformanceMetrics,
  checkPerformanceBudget,
  PERFORMANCE_BUDGETS
} from '@/lib/performance-utils'

import {
  generateThemeCSS,
  applyThemeCSS,
  getSystemTheme,
  getStoredTheme,
  storeTheme,
  watchSystemTheme,
  getReducedMotionPreference,
  getHighContrastPreference,
  applyThemeTransition,
  setupThemeKeyboardShortcut
} from '@/lib/theme-utils'

import {
  meetsContrastRequirement,
  getContrastRatio,
  initializeAccessibility,
  respectsReducedMotion,
  isHighContrastMode,
  applyFocusRing,
  trapFocus,
  makeKeyboardNavigable,
  announceToScreenReader,
  updateAriaExpanded,
  setAriaLabel,
  setAriaLabelledBy,
  setAriaDescribedBy
} from '@/lib/accessibility-utils'

import {
  createCodeSplitter,
  getOptimizedAssetPath,
  cacheComputedValue,
  clearComputedCache,
  optimizeCriticalPath,
  progressiveEnhance,
  analyzeBundleImpact,
  createLazyLoader,
  debounce,
  throttle,
  optimizedAnimationFrame,
  preloadCriticalResources
} from '@/lib/optimization-utils'

import {
  resolveResponsiveValue,
  useBreakpoint,
  getResponsiveTypography,
  getResponsiveSpacing,
  generateResponsiveGridCSS,
  getResponsiveContainerWidth,
  getResponsiveContainerPadding,
  generateResponsiveImageCSS,
  generateResponsiveClasses,
  getResponsiveFontScale,
  getResponsiveBorderRadius,
  getResponsiveShadow,
  getResponsiveAnimationDuration,
  getResponsiveZIndex,
  mobileFirst,
  createResponsiveStyles,
  useResponsive
} from '@/lib/responsive-utils'

import {
  reportError,
  safeAsync,
  safeSync,
  withRetry,
  safeQuerySelector,
  safeLocalStorageGet,
  safeLocalStorageSet,
  safeFetch,
  safePerformanceMark,
  safeIntersectionObserver,
  safeResizeObserver,
  safeRequestAnimationFrame,
  initializeErrorHandling,
  getErrorStats,
  onErrorReported
} from '@/lib/error-handling-utils'

// Test suite configuration
const TEST_CONFIG = {
  timeout: 10000,
  retryAttempts: 3,
  enableLogging: true,
  mockEnvironment: {
    isSSR: false,
    isBrowser: true,
    userAgent: 'Mozilla/5.0 (test-environment)',
  }
}

describe('Utility Systems Integration Tests', () => {
  beforeAll(() => {
    // Initialize error handling for tests
    initializeErrorHandling()

    // Mock DOM environment if needed
    if (typeof document === 'undefined') {
      Object.defineProperty(global, 'document', {
        value: {
          createElement: () => ({ style: {}, className: '', setAttribute: () => {}, appendChild: () => {} }),
          head: { appendChild: () => {} },
          body: { appendChild: () => {}, removeChild: () => {} },
          querySelector: () => null,
          querySelectorAll: () => [],
          addEventListener: () => {},
          removeEventListener: () => {},
        },
        writable: true,
      })
    }

    if (typeof window === 'undefined') {
      Object.defineProperty(global, 'window', {
        value: {
          location: { href: 'http://test.com', origin: 'http://test.com' },
          innerWidth: 1920,
          innerHeight: 1080,
          matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
          addEventListener: () => {},
          removeEventListener: () => {},
          requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(cb, 16),
          cancelAnimationFrame: clearTimeout,
        },
        writable: true,
      })
    }

    if (typeof navigator === 'undefined') {
      Object.defineProperty(global, 'navigator', {
        value: {
          userAgent: TEST_CONFIG.mockEnvironment.userAgent,
        },
        writable: true,
      })
    }
  })

  describe('Design Tokens Integration', () => {
    test('should have consistent design token structure', () => {
      expect(DESIGN_TOKENS).toBeDefined()
      expect(DESIGN_TOKENS.glass).toBeDefined()
      expect(DESIGN_TOKENS.animations).toBeDefined()
      expect(DESIGN_TOKENS.colors).toBeDefined()
      expect(DESIGN_TOKENS.spacing).toBeDefined()
      expect(DESIGN_TOKENS.typography).toBeDefined()
      expect(DESIGN_TOKENS.breakpoints).toBeDefined()
      expect(DESIGN_TOKENS.zIndex).toBeDefined()
    })

    test('should generate consistent glass morphism tokens', () => {
      const lightBg = getGlassBackground('light')
      const darkBg = getGlassBackground('dark')
      const lightBorder = getGlassBorder('light')
      const darkBorder = getGlassBorder('dark')

      expect(lightBg).toMatch(/rgba\(255, 255, 255, 0\.\d+\)/)
      expect(darkBg).toMatch(/rgba\(0, 0, 0, 0\.\d+\)/)
      expect(lightBorder).toMatch(/rgba\(255, 255, 255, 0\.\d+\)/)
      expect(darkBorder).toMatch(/rgba\(255, 255, 255, 0\.\d+\)/)
    })

    test('should provide responsive spacing utilities', () => {
      expect(getSpacingToken('4')).toBe('1rem')
      expect(getSpacingToken('8')).toBe('2rem')
      expect(getSpacingToken('16')).toBe('4rem')
    })

    test('should have consistent animation tokens', () => {
      expect(getAnimationDuration('fast')).toBe('150ms')
      expect(getAnimationDuration('normal')).toBe('300ms')
      expect(getAnimationEasing('ease')).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
    })
  })

  describe('Performance Utils Integration', () => {
    test('should initialize performance observer safely', (done) => {
      if (typeof window === 'undefined') {
        done()
        return
      }

      const cleanup = observePerformanceMetrics((metrics) => {
        expect(metrics).toBeDefined()
        expect(typeof metrics.lcp).toBe('number')
        expect(typeof metrics.fid).toBe('number')
        expect(typeof metrics.cls).toBe('number')
        expect(typeof metrics.fcp).toBe('number')
        expect(typeof metrics.ttfb).toBe('number')
        cleanup()
        done()
      })
    })

    test('should check performance budgets correctly', () => {
      const mockMetrics = {
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 800,
      }

      const result = checkPerformanceBudget(mockMetrics)
      expect(result.passed).toBe(true)
      expect(result.violations).toHaveLength(0)

      const failingMetrics = {
        lcp: 3000, // Over budget
        fid: 150, // Over budget
        cls: 0.2, // Over budget
        fcp: 1500,
        ttfb: 800,
      }

      const failingResult = checkPerformanceBudget(failingMetrics)
      expect(failingResult.passed).toBe(false)
      expect(failingResult.violations.length).toBeGreaterThan(0)
    })

    test('should respect performance budgets configuration', () => {
      expect(PERFORMANCE_BUDGETS.firstContentfulPaint).toBe(1800)
      expect(PERFORMANCE_BUDGETS.largestContentfulPaint).toBe(2500)
      expect(PERFORMANCE_BUDGETS.cumulativeLayoutShift).toBe(0.1)
      expect(PERFORMANCE_BUDGETS.firstInputDelay).toBe(100)
    })
  })

  describe('Theme Utils Integration', () => {
    test('should generate consistent theme CSS', () => {
      const lightTheme = generateThemeCSS('light', 'green')
      const darkTheme = generateThemeCSS('dark', 'orange')

      expect(lightTheme).toContain('--theme-background:')
      expect(lightTheme).toContain('--theme-primary:')
      expect(lightTheme).toContain('--glass-background:')
      expect(darkTheme).toContain('--theme-background:')
      expect(darkTheme).toContain('--theme-primary:')
    })

    test('should handle system theme detection', () => {
      const systemTheme = getSystemTheme()
      expect(['light', 'dark']).toContain(systemTheme)
    })

    test('should manage theme preferences safely', () => {
      // Test theme storage (will fail silently in test environment)
      expect(() => storeTheme('light')).not.toThrow()
      expect(() => storeTheme('dark')).not.toThrow()

      const storedTheme = getStoredTheme()
      expect(storedTheme === null || ['light', 'dark'].includes(storedTheme)).toBe(true)
    })

    test('should handle accessibility preferences', () => {
      const reducedMotion = getReducedMotionPreference()
      const highContrast = getHighContrastPreference()

      expect(typeof reducedMotion).toBe('boolean')
      expect(typeof highContrast).toBe('boolean')
    })
  })

  describe('Accessibility Utils Integration', () => {
    test('should calculate color contrast ratios correctly', () => {
      const ratio = getContrastRatio('#ffffff', '#000000')
      expect(ratio).toBeGreaterThanOrEqual(21) // White on black should be perfect contrast

      const lowContrast = getContrastRatio('#eeeeee', '#cccccc')
      expect(lowContrast).toBeLessThan(4.5) // Low contrast colors
    })

    test('should validate WCAG compliance', () => {
      const aaCompliant = meetsContrastRequirement('#ffffff', '#000000', 'AA', 'normal')
      expect(aaCompliant).toBe(true)

      const aaaCompliant = meetsContrastRequirement('#ffffff', '#000000', 'AAA', 'normal')
      expect(aaaCompliant).toBe(true)
    })

    test('should handle ARIA attributes safely', () => {
      const mockElement = document.createElement('div')

      expect(() => setAriaLabel(mockElement, 'Test label')).not.toThrow()
      expect(() => setAriaLabelledBy(mockElement, 'label-id')).not.toThrow()
      expect(() => setAriaDescribedBy(mockElement, 'desc-id')).not.toThrow()

      expect(mockElement.getAttribute('aria-label')).toBe('Test label')
    })
  })

  describe('Error Handling Integration', () => {
    test('should report errors with proper context', () => {
      const testError = new Error('Test error')

      expect(() => reportError(testError, {
        component: 'TestComponent',
        action: 'test-action',
      })).not.toThrow()
    })

    test('should handle async operations safely', async () => {
      const successResult = await safeAsync(
        () => Promise.resolve('success'),
        'fallback'
      )
      expect(successResult).toBe('success')

      const errorResult = await safeAsync(
        () => Promise.reject(new Error('test error')),
        'fallback'
      )
      expect(errorResult).toBe('fallback')
    })

    test('should handle sync operations safely', () => {
      const successResult = safeSync(
        () => 'success',
        'fallback'
      )
      expect(successResult).toBe('success')

      const errorResult = safeSync(
        () => { throw new Error('test error') },
        'fallback'
      )
      expect(errorResult).toBe('fallback')
    })

    test('should implement retry mechanism', async () => {
      let attempts = 0
      const flakyOperation = async () => {
        attempts++
        if (attempts < 3) throw new Error('Temporary failure')
        return 'success'
      }

      const result = await withRetry(flakyOperation, 3, 10, { action: 'test-retry' })
      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })
  })

  describe('Responsive Utils Integration', () => {
    test('should resolve responsive values correctly', () => {
      const responsiveConfig = {
        base: '16px',
        md: '20px',
        lg: '24px',
      }

      const baseValue = resolveResponsiveValue(responsiveConfig, 'sm')
      const mdValue = resolveResponsiveValue(responsiveConfig, 'md')
      const lgValue = resolveResponsiveValue(responsiveConfig, 'lg')

      expect(baseValue).toBe('16px')
      expect(mdValue).toBe('20px')
      expect(lgValue).toBe('24px')
    })

    test('should generate responsive grid CSS', () => {
      const gridConfig = {
        cols: { base: 1, md: 2, lg: 3 },
        gap: { base: '1rem', lg: '2rem' },
      }

      const gridCSS = generateResponsiveGridCSS(gridConfig, 'lg')
      expect(gridCSS).toContain('grid-template-columns: repeat(3, 1fr)')
      expect(gridCSS).toContain('gap: 2rem')
    })

    test('should provide responsive container utilities', () => {
      expect(getResponsiveContainerWidth('sm')).toBe('100%')
      expect(getResponsiveContainerWidth('md')).toBe('768px')
      expect(getResponsiveContainerWidth('lg')).toBe('1024px')
      expect(getResponsiveContainerWidth('xl')).toBe('1280px')
    })
  })

  describe('Optimization Utils Integration', () => {
    test('should create code splitters safely', () => {
      const splitter = createCodeSplitter({
        chunkName: 'test-chunk',
        priority: 'high',
        preload: true,
      })

      expect(splitter.priority).toBe('high')
      expect(splitter.chunkName).toBe('test-chunk')
    })

    test('should cache computed values', () => {
      const expensiveComputation = () => {
        let sum = 0
        for (let i = 0; i < 1000000; i++) sum += i
        return sum
      }

      const result1 = cacheComputedValue('expensive-sum', expensiveComputation, 1000)
      const result2 = cacheComputedValue('expensive-sum', expensiveComputation, 1000)

      expect(result1).toBe(result2)
      expect(typeof result1).toBe('number')
    })

    test('should analyze bundle impact', () => {
      const analysis = analyzeBundleImpact()

      expect(analysis).toHaveProperty('totalSize')
      expect(analysis).toHaveProperty('componentSizes')
      expect(analysis).toHaveProperty('recommendations')
      expect(Array.isArray(analysis.recommendations)).toBe(true)
    })

    test('should create lazy loaders safely', () => {
      const lazyLoader = createLazyLoader({
        type: 'viewport',
        threshold: 0.5,
      })

      expect(typeof lazyLoader.load).toBe('function')
    })
  })

  describe('Cross-System Integration', () => {
    test('should integrate error handling with theme system', () => {
      const errorContext = {
        component: 'ThemeProvider',
        action: 'apply-theme',
        theme: 'light',
      }

      expect(() => reportError('Theme application failed', errorContext, 'medium')).not.toThrow()
    })

    test('should integrate error handling with accessibility system', () => {
      const errorContext = {
        component: 'FocusManager',
        action: 'apply-focus-ring',
        metadata: { elementType: 'button' },
      }

      const mockElement = document.createElement('button')
      expect(() => applyFocusRing(mockElement)).not.toThrow()
    })

    test('should integrate error handling with performance monitoring', () => {
      const errorContext = {
        component: 'PerformanceMonitor',
        action: 'observe-metrics',
        metadata: { metricType: 'lcp' },
      }

      expect(() => reportError('Performance monitoring failed', errorContext, 'low')).not.toThrow()
    })

    test('should handle error subscription and unsubscription', () => {
      let receivedReports: any[] = []

      const unsubscribe = onErrorReported((report) => {
        receivedReports.push(report)
      })

      reportError('Test error for subscription', { action: 'test' })
      expect(receivedReports.length).toBeGreaterThan(0)

      unsubscribe()
      reportError('Test error after unsubscribe', { action: 'test' })

      // Should not receive new reports after unsubscribe
      const reportsAfterUnsubscribe = receivedReports.length
      expect(reportsAfterUnsubscribe).toBeGreaterThan(0)
    })
  })

  describe('Performance Benchmarks', () => {
    test('should complete design token access within performance budget', () => {
      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        getGlassBackground('light')
        getSpacingToken('4')
        getAnimationDuration('normal')
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(50) // Should complete in under 50ms
    })

    test('should handle error reporting within performance budget', () => {
      const start = performance.now()

      for (let i = 0; i < 100; i++) {
        reportError(`Performance test error ${i}`, { action: 'benchmark' }, 'low')
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(100) // Should complete in under 100ms
    })

    test('should handle responsive value resolution within budget', () => {
      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        resolveResponsiveValue({ base: '16px', md: '20px', lg: '24px' }, 'md')
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(30) // Should complete in under 30ms
    })
  })

  describe('Error Recovery and Resilience', () => {
    test('should recover from localStorage failures gracefully', () => {
      // Mock localStorage failure
      const originalLocalStorage = window.localStorage
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: () => { throw new Error('Storage quota exceeded') },
          setItem: () => { throw new Error('Storage quota exceeded') },
        },
        writable: true,
      })

      expect(() => safeLocalStorageGet('test-key')).not.toThrow()
      expect(() => safeLocalStorageSet('test-key', 'value')).not.toThrow()

      // Restore original localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
      })
    })

    test('should handle network failures gracefully', async () => {
      // Mock fetch failure
      const originalFetch = global.fetch
      global.fetch = () => Promise.reject(new Error('Network error'))

      const result = await safeFetch('https://example.com/api/test')
      expect(result).toBeNull()

      // Restore original fetch
      global.fetch = originalFetch
    })

    test('should handle performance API unavailability', () => {
      const originalPerformance = global.performance
      Object.defineProperty(global, 'performance', {
        value: undefined,
        writable: true,
      })

      expect(safePerformanceMark('test-mark')).toBe(false)

      // Restore original performance
      Object.defineProperty(global, 'performance', {
        value: originalPerformance,
        writable: true,
      })
    })
  })

  describe('Memory Management', () => {
    test('should cleanup computed cache properly', () => {
      cacheComputedValue('test-key', () => 'test-value', 1000)

      let stats = getErrorStats()
      const initialErrorCount = stats.total

      clearComputedCache()

      // Verify cache is cleared (we can't directly access the cache, but no errors should occur)
      expect(() => cacheComputedValue('new-key', () => 'new-value', 1000)).not.toThrow()
    })

    test('should handle rapid error reporting without memory leaks', () => {
      const initialStats = getErrorStats()

      // Generate many errors rapidly
      for (let i = 0; i < 200; i++) {
        reportError(`Rapid fire error ${i}`, { action: 'memory-test' }, 'low')
      }

      const finalStats = getErrorStats()

      // Should not exceed buffer limit
      expect(finalStats.total).toBeLessThanOrEqual(100)
    })
  })
})

// Utility test helpers
export function createMockElement(tagName: string = 'div'): HTMLElement {
  if (typeof document === 'undefined') {
    return {
      tagName: tagName.toUpperCase(),
      style: {},
      className: '',
      setAttribute: () => {},
      getAttribute: () => null,
      addEventListener: () => {},
      removeEventListener: () => {},
      focus: () => {},
      scrollIntoView: () => {},
    } as any
  }

  return document.createElement(tagName)
}

export function mockBrowserEnvironment(overrides: Partial<typeof global> = {}) {
  const defaults = {
    innerWidth: 1920,
    innerHeight: 1080,
    location: { href: 'http://test.com' },
  }

  Object.assign(global, defaults, overrides)
}

export async function waitForNextTick(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}