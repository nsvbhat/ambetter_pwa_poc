// Minimal Service Worker - just register and update
const CACHE_NAME = 'ambetter-pwa-v1';

// Install
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installed');
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  self.clients.claim();
});

// Fetch - just pass through to network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-HTTP(S) and special URLs
  if (!request.url.startsWith('http')) return;

  // Simple network-first strategy
  event.respondWith(
    fetch(request)
      .then(response => response)
      .catch(() => caches.match(request))
  );
});
