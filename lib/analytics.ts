// Analytics and monitoring utilities for production deployment

export interface AnalyticsConfig {
  googleAnalyticsId?: string
  gtmId?: string
  enablePerformanceTracking?: boolean
  enableErrorTracking?: boolean
  debug?: boolean
}

export function initializeAnalytics(config: AnalyticsConfig = {}): void {
  if (typeof window === 'undefined') return

  const {
    googleAnalyticsId,
    gtmId,
    enablePerformanceTracking = true,
    enableErrorTracking = true,
    debug = false
  } = config

  // Initialize Google Analytics if ID provided
  if (googleAnalyticsId) {
    initializeGoogleAnalytics(googleAnalyticsId, debug)
  }

  // Initialize Google Tag Manager if ID provided
  if (gtmId) {
    initializeGoogleTagManager(gtmId, debug)
  }

  // Initialize performance tracking
  if (enablePerformanceTracking) {
    initializePerformanceTracking()
  }

  // Initialize error tracking
  if (enableErrorTracking) {
    initializeErrorTracking()
  }
}

function initializeGoogleAnalytics(gaId: string, debug: boolean): void {
  // Add Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`

  if (debug) {
    script.onload = () => console.log('Google Analytics loaded')
    script.onerror = () => console.error('Failed to load Google Analytics')
  }

  document.head.appendChild(script)

  // Initialize gtag
  ;(window as any).gtag = function() {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(arguments)
  }

  ;(window as any).gtag('js', new Date())
  ;(window as any).gtag('config', gaId, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

function initializeGoogleTagManager(gtmId: string, debug: boolean): void {
  // Add GTM script
  const script = document.createElement('script')
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `

  if (debug) {
    script.onload = () => console.log('Google Tag Manager loaded')
  }

  document.head.appendChild(script)

  // Add GTM noscript fallback
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

function initializePerformanceTracking(): void {
  // Track Core Web Vitals
  if ('web-vitals' in window) {
    // This would integrate with the web-vitals library
    // For now, we'll use a simple implementation
    trackCoreWebVitals()
  }

  // Track custom performance metrics
  trackCustomMetrics()
}

function initializeErrorTracking(): void {
  // Global error handler for analytics
  window.addEventListener('error', (event) => {
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'exception', {
        description: event.message,
        fatal: false,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
  })

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'exception', {
        description: 'Unhandled promise rejection: ' + event.reason,
        fatal: false,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
  })
}

function trackCoreWebVitals(): void {
  // Simple Core Web Vitals tracking
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if ((window as any).gtag) {
        ;(window as any).gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: entry.name,
          value: Math.round(entry.startTime),
          non_interaction: true,
        })
      }
    })
  })

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
  } catch (error) {
    // Silently handle if not supported
  }
}

function trackCustomMetrics(): void {
  // Track page load time
  window.addEventListener('load', () => {
    if ((window as any).gtag) {
      const loadTime = performance.now()
      ;(window as any).gtag('event', 'page_load_time', {
        event_category: 'Performance',
        value: Math.round(loadTime),
        non_interaction: true,
      })
    }
  })

  // Track time to first contentful paint
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint' && (window as any).gtag) {
        ;(window as any).gtag('event', 'first_contentful_paint', {
          event_category: 'Performance',
          value: Math.round(entry.startTime),
          non_interaction: true,
        })
      }
    })
  })

  try {
    observer.observe({ entryTypes: ['paint'] })
  } catch (error) {
    // Silently handle if not supported
  }
}

// Track user interactions
export function trackInteraction(action: string, category: string, label?: string, value?: number): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return

  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track conversions and goals
export function trackConversion(goalName: string, value?: number, currency?: string): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return

  ;(window as any).gtag('event', 'conversion', {
    event_category: 'Conversion',
    event_label: goalName,
    value: value,
    currency: currency || 'USD',
  })
}

// Track e-commerce events
export function trackEcommerce(eventName: string, parameters: Record<string, any>): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return

  ;(window as any).gtag('event', eventName, {
    event_category: 'Ecommerce',
    ...parameters,
  })
}