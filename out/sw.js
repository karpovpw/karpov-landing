// Service Worker for caching and offline functionality

const CACHE_NAME = 'karpov-portfolio-v1'
const STATIC_CACHE = 'karpov-static-v1'
const DYNAMIC_CACHE = 'karpov-dynamic-v1'

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/_next/static/css/',
  '/_next/static/js/',
  '/favicon.ico',
  '/images/',
  '/manifest.json',
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache-first strategy for static assets
  cacheFirst: async (request) => {
    const cached = await caches.match(request)
    if (cached) return cached

    try {
      const response = await fetch(request)
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, response.clone())
      return response
    } catch (error) {
      return new Response('Offline content not available', {
        status: 503,
        statusText: 'Service Unavailable'
      })
    }
  },

  // Network-first strategy for dynamic content
  networkFirst: async (request) => {
    try {
      const response = await fetch(request)
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
      return response
    } catch (error) {
      const cached = await caches.match(request)
      return cached || new Response('Content not available offline', {
        status: 503,
        statusText: 'Service Unavailable'
      })
    }
  },

  // Stale-while-revalidate for API calls
  staleWhileRevalidate: async (request) => {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cached = await cache.match(request)

    const fetchPromise = fetch(request).then(response => {
      cache.put(request, response.clone())
      return response
    })

    return cached || fetchPromise
  }
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.log('Failed to cache some assets:', error)
        // Continue even if some assets fail to cache
      })
    })
  )
  self.skipWaiting()
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) return

  // Skip non-GET requests
  if (request.method !== 'GET') return

  event.respondWith(
    (async () => {
      // Determine caching strategy based on request
      if (request.destination === 'document') {
        // HTML pages - Network first with fallback
        return CACHE_STRATEGIES.networkFirst(request)
      }

      if (request.destination === 'image') {
        // Images - Cache first
        return CACHE_STRATEGIES.cacheFirst(request)
      }

      if (request.url.includes('/api/')) {
        // API calls - Stale while revalidate
        return CACHE_STRATEGIES.staleWhileRevalidate(request)
      }

      if (request.destination === 'script' || request.destination === 'style') {
        // JS/CSS - Cache first
        return CACHE_STRATEGIES.cacheFirst(request)
      }

      // Default - Network first
      return CACHE_STRATEGIES.networkFirst(request)
    })()
  )
})

// Background sync for offline forms
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      handleBackgroundSync()
    )
  }
})

// Handle background sync
async function handleBackgroundSync() {
  // This would handle offline form submissions, etc.
  console.log('Background sync triggered')
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/',
      },
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  )
})