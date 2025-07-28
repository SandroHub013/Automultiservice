// AutoMultiService S.a.S. - Service Worker
// Mobile-First PWA Implementation

const CACHE_NAME = 'automultiservice-v1.0.0';
const STATIC_CACHE = 'automultiservice-static-v1';
const DYNAMIC_CACHE = 'automultiservice-dynamic-v1';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/immagineintestazione.jpg',
  '/manifest.json',
  '/favicon.ico'
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /^https:\/\/api\./,
  /^https:\/\/cdn\./
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch Event Handler - Network First with Cache Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests that we don't want to cache
  if (url.origin !== location.origin && !shouldCacheExternalRequest(url)) {
    return;
  }
  
  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Cache First Strategy (for static assets)
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first strategy failed:', error);
    return await getOfflineFallback(request);
  }
}

// Network First Strategy (for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy (for pages)
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch((error) => {
      console.log('[SW] Network request failed:', error);
      return cachedResponse;
    });
  
  return cachedResponse || fetchPromise;
}

// Helper Functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

function shouldCacheExternalRequest(url) {
  // Cache Google Fonts and other essential external resources
  return url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com') ||
         url.hostname.includes('cdnjs.cloudflare.com');
}

async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // Return offline image for image requests
  if (request.destination === 'image') {
    return new Response(
      '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" fill="#999">Offline</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Background Sync for WhatsApp messages (if user is offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'whatsapp-message') {
    event.waitUntil(syncWhatsAppMessages());
  }
});

async function syncWhatsAppMessages() {
  // Handle queued WhatsApp messages when connection is restored
  try {
    const messages = await getQueuedMessages();
    for (const message of messages) {
      await sendWhatsAppMessage(message);
      await removeFromQueue(message.id);
    }
  } catch (error) {
    console.error('[SW] Failed to sync WhatsApp messages:', error);
  }
}

// Push Notification Handler (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nuovo messaggio da AutoMultiService!',
    icon: '/immagineintestazione.jpg',
    badge: '/immagineintestazione.jpg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Visualizza',
        icon: '/immagineintestazione.jpg'
      },
      {
        action: 'close',
        title: 'Chiudi',
        icon: '/immagineintestazione.jpg'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification('AutoMultiService S.a.S.', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic Background Sync (for future use)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  // Update cached content periodically
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        const response = await fetch(request);
        await cache.put(request, response);
      } catch (error) {
        console.log('[SW] Failed to update cached content:', request.url);
      }
    }
  } catch (error) {
    console.error('[SW] Periodic sync failed:', error);
  }
}

// Utility functions for message queue (implement as needed)
async function getQueuedMessages() {
  // Implementation depends on your storage solution (IndexedDB, etc.)
  return [];
}

async function sendWhatsAppMessage(message) {
  // Implementation for sending WhatsApp messages
  return true;
}

async function removeFromQueue(messageId) {
  // Implementation for removing from message queue
  return true;
}

console.log('[SW] Service Worker loaded successfully');