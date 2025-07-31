/**
 * Automultiservice SAS - Service Worker
 * Advanced caching strategy for optimal performance
 */

const CACHE_NAME = 'automultiservice-v1';
const RUNTIME_CACHE = 'automultiservice-runtime-v1';

// Critical resources to cache immediately
const CRITICAL_ASSETS = [
    '/',
    '/css/critical.css',
    '/css/main.css',
    '/js/performance-optimization.js',
    '/js/main.js',
    '/images/logo.webp',
    '/images/hero-bg.webp',
    '/fonts/inter-var.woff2',
    '/fonts/poppins-600.woff2',
    '/offline.html'
];

// Resources that can be cached on demand
const RUNTIME_CACHE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/,
    /\.(?:js|css)$/,
    /\.(?:woff|woff2|eot|ttf|otf)$/
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('ServiceWorker: Caching critical assets');
                return cache.addAll(CRITICAL_ASSETS);
            })
            .then(() => {
                console.log('ServiceWorker: Critical assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('ServiceWorker: Failed to cache critical assets', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('ServiceWorker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('ServiceWorker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached content with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }

    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(handleNavigationRequest(request));
        return;
    }

    // Handle asset requests
    if (shouldCache(request)) {
        event.respondWith(handleAssetRequest(request));
        return;
    }
});

// Handle navigation requests with network first, cache fallback
async function handleNavigationRequest(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('ServiceWorker: Network failed, trying cache');
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Ultimate fallback to offline page
        return caches.match('/offline.html');
    }
}

// Handle asset requests with cache first, network fallback
async function handleAssetRequest(request) {
    // Check cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        // Update cache in background for critical assets
        if (CRITICAL_ASSETS.includes(new URL(request.url).pathname)) {
            updateCacheInBackground(request);
        }
        return cachedResponse;
    }

    try {
        // Fetch from network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache the response
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('ServiceWorker: Failed to fetch asset', request.url);
        
        // Return offline fallback for images
        if (request.destination === 'image') {
            return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" fill="#ddd"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image unavailable</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }
        
        throw error;
    }
}

// Update cache in background
async function updateCacheInBackground(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response);
        }
    } catch (error) {
        console.log('ServiceWorker: Background update failed', error);
    }
}

// Check if request should be cached
function shouldCache(request) {
    const url = new URL(request.url);
    
    // Cache if it matches runtime cache patterns
    return RUNTIME_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

// Sync contact form submissions when online
async function syncContactForm() {
    try {
        const db = await openIndexedDB();
        const forms = await getUnsyncedForms(db);
        
        for (const form of forms) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form.data)
                });
                
                if (response.ok) {
                    await markFormSynced(db, form.id);
                    console.log('ServiceWorker: Form synced successfully');
                }
            } catch (error) {
                console.log('ServiceWorker: Form sync failed', error);
            }
        }
    } catch (error) {
        console.error('ServiceWorker: Background sync failed', error);
    }
}

// IndexedDB helpers for offline form storage
function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AutomultiserviceDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('forms')) {
                const store = db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
                store.createIndex('synced', 'synced', { unique: false });
            }
        };
    });
}

function getUnsyncedForms(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['forms'], 'readonly');
        const store = transaction.objectStore('forms');
        const index = store.index('synced');
        const request = index.getAll(false);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

function markFormSynced(db, formId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');
        const request = store.get(formId);
        
        request.onsuccess = () => {
            const form = request.result;
            form.synced = true;
            const updateRequest = store.put(form);
            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// Push notification handler
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action) {
        // Handle action buttons
        handleNotificationAction(event.action, event.notification.data);
    } else {
        // Handle notification click
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

function handleNotificationAction(action, data) {
    switch (action) {
        case 'view':
            clients.openWindow(data.url || '/');
            break;
        case 'dismiss':
            // Notification already closed
            break;
        default:
            clients.openWindow('/');
    }
}