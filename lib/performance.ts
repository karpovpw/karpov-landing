/**
 * Performance Monitoring and Core Web Vitals Tracking
 * Implements comprehensive performance monitoring for optimal user experience
 */

// Core Web Vitals thresholds (Google's recommended targets)
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
} as const;

// Bundle size targets (< 500KB gzipped as per requirements)
export const BUNDLE_SIZE_TARGETS = {
  maxTotalSize: 512000,    // 500KB gzipped target
  maxChunkSize: 256000,    // 250KB per chunk recommendation
  maxEntrySize: 512000,    // 500KB initial bundle
} as const;

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.trackNavigationTiming();
    }
  }

  /**
   * Initialize performance observers for Core Web Vitals
   */
  private initializeObservers(): void {
    try {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('lcp', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.recordMetric('fid', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.recordMetric('cls', clsValue);
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      }

      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.recordMetric('fcp', fcpEntry.startTime);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      }
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }

  /**
   * Track navigation timing metrics
   */
  private trackNavigationTiming(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (navigation) {
        // Time to First Byte (TTFB)
        this.recordMetric('ttfb', navigation.responseStart - navigation.requestStart);

        // DOM Content Loaded
        this.recordMetric('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);

        // Load Complete
        this.recordMetric('loadComplete', navigation.loadEventEnd - navigation.loadEventStart);
      }
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(name: string, value: number): void {
    this.metrics.set(name, value);

    // Send to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'web_vitals', {
        name,
        value: Math.round(value),
        event_category: 'performance',
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} = ${Math.round(value)}ms`);
    }

    // Validate against thresholds
    this.validateMetric(name, value);
  }

  /**
   * Validate metric against thresholds
   */
  private validateMetric(name: string, value: number): void {
    const thresholds = WEB_VITALS_THRESHOLDS[name.toUpperCase() as keyof typeof WEB_VITALS_THRESHOLDS];

    if (thresholds) {
      const status = value <= thresholds.good ? 'good' :
                    value <= thresholds.needsImprovement ? 'needs-improvement' : 'poor';

      if (status !== 'good') {
        console.warn(`Performance: ${name} is ${status} (${Math.round(value)}ms)`);
      }
    }
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Get specific metric value
   */
  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  /**
   * Check if performance targets are met
   */
  checkPerformanceTargets(): {
    targetsMet: boolean;
    results: Record<string, boolean>;
    recommendations: string[];
  } {
    const results: Record<string, boolean> = {};
    const recommendations: string[] = [];

    // Check Core Web Vitals
    const lcp = this.getMetric('lcp');
    if (lcp !== undefined) {
      results.lcp = lcp <= WEB_VITALS_THRESHOLDS.LCP.good;
      if (!results.lcp) {
        recommendations.push(`LCP (${Math.round(lcp)}ms) exceeds good threshold (2500ms)`);
      }
    }

    const fid = this.getMetric('fid');
    if (fid !== undefined) {
      results.fid = fid <= WEB_VITALS_THRESHOLDS.FID.good;
      if (!results.fid) {
        recommendations.push(`FID (${Math.round(fid)}ms) exceeds good threshold (100ms)`);
      }
    }

    const cls = this.getMetric('cls');
    if (cls !== undefined) {
      results.cls = cls <= WEB_VITALS_THRESHOLDS.CLS.good;
      if (!results.cls) {
        recommendations.push(`CLS (${cls}) exceeds good threshold (0.1)`);
      }
    }

    // Check bundle size targets
    if (typeof window !== 'undefined' && 'performance' in window) {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(r => r.name.endsWith('.js'));

      if (jsResources.length > 0) {
        const totalJSSize = jsResources.reduce((total, resource) => {
          return total + ((resource as any).transferSize || 0);
        }, 0);

        results.bundleSize = totalJSSize <= BUNDLE_SIZE_TARGETS.maxTotalSize;
        if (!results.bundleSize) {
          recommendations.push(`Total JS bundle size (${Math.round(totalJSSize / 1024)}KB) exceeds target (500KB)`);
        }
      }
    }

    const targetsMet = Object.values(results).every(result => result);

    return {
      targetsMet,
      results,
      recommendations,
    };
  }

  /**
   * Generate performance report
   */
  generateReport(): {
    metrics: Record<string, number>;
    targets: typeof WEB_VITALS_THRESHOLDS;
    bundleTargets: typeof BUNDLE_SIZE_TARGETS;
    validation: ReturnType<typeof this.checkPerformanceTargets>;
  } {
    return {
      metrics: this.getMetrics(),
      targets: WEB_VITALS_THRESHOLDS,
      bundleTargets: BUNDLE_SIZE_TARGETS,
      validation: this.checkPerformanceTargets(),
    };
  }

  /**
   * Cleanup observers
   */
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState(performanceMonitor.getMetrics());
  const [validation, setValidation] = React.useState(performanceMonitor.checkPerformanceTargets());

  React.useEffect(() => {
    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics());
      setValidation(performanceMonitor.checkPerformanceTargets());
    };

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    validation,
    generateReport: performanceMonitor.generateReport.bind(performanceMonitor),
  };
}

/**
 * Bundle size validator utility
 */
export function validateBundleSize(bundleSize: number): {
  isValid: boolean;
  status: 'good' | 'warning' | 'error';
  message: string;
} {
  if (bundleSize <= BUNDLE_SIZE_TARGETS.maxTotalSize * 0.8) {
    return {
      isValid: true,
      status: 'good',
      message: `Bundle size (${Math.round(bundleSize / 1024)}KB) is within optimal range`,
    };
  }

  if (bundleSize <= BUNDLE_SIZE_TARGETS.maxTotalSize) {
    return {
      isValid: true,
      status: 'warning',
      message: `Bundle size (${Math.round(bundleSize / 1024)}KB) is within target but could be optimized`,
    };
  }

  return {
    isValid: false,
    status: 'error',
    message: `Bundle size (${Math.round(bundleSize / 1024)}KB) exceeds 500KB target`,
  };
}

/**
 * Performance budget checker for CI/CD
 */
export function checkPerformanceBudgets(): {
  passed: boolean;
  violations: string[];
  report: ReturnType<PerformanceMonitor['generateReport']>;
} {
  const report = performanceMonitor.generateReport();
  const violations: string[] = [];

  // Check Core Web Vitals budgets
  if (report.metrics.lcp > WEB_VITALS_THRESHOLDS.LCP.good) {
    violations.push(`LCP budget exceeded: ${Math.round(report.metrics.lcp)}ms > ${WEB_VITALS_THRESHOLDS.LCP.good}ms`);
  }

  if (report.metrics.fid > WEB_VITALS_THRESHOLDS.FID.good) {
    violations.push(`FID budget exceeded: ${Math.round(report.metrics.fid)}ms > ${WEB_VITALS_THRESHOLDS.FID.good}ms`);
  }

  if (report.metrics.cls > WEB_VITALS_THRESHOLDS.CLS.good) {
    violations.push(`CLS budget exceeded: ${report.metrics.cls} > ${WEB_VITALS_THRESHOLDS.CLS.good}`);
  }

  // Check bundle size budget
  const bundleValidation = validateBundleSize(report.metrics.bundleSize || 0);
  if (!bundleValidation.isValid) {
    violations.push(bundleValidation.message);
  }

  return {
    passed: violations.length === 0,
    violations,
    report,
  };
}

export default PerformanceMonitor;