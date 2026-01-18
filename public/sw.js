// Ultra-minimal Service Worker
self.addEventListener('install', () => {
  console.log('✅ SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('✅ SW activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network only - no caching, no cloning
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});

// Periodic Sync - Background update checks
self.addEventListener('periodicsync', (event) => {
  console.log('🔄 Periodic Sync triggered:', event.tag);
  if (event.tag === 'update-check') {
    event.waitUntil(
      fetch('/').then((response) => {
        console.log('✅ Periodic sync: App state checked');
        return response;
      }).catch((err) => {
        console.log('❌ Periodic sync failed:', err);
      })
    );
  }
});

// Background Sync - Retry failed requests when connection restored
self.addEventListener('sync', (event) => {
  console.log('🔄 Background Sync triggered:', event.tag);
  if (event.tag === 'sync-health-data') {
    event.waitUntil(
      fetch('/', { method: 'POST', body: JSON.stringify({ action: 'sync' }) })
        .then((response) => {
          console.log('✅ Background sync: Data synced successfully');
          return response;
        })
        .catch((err) => {
          console.log('❌ Background sync failed:', err);
          throw err; // Retry later
        })
    );
  }
});

// Push Notifications - Handle incoming push events
self.addEventListener('push', (event) => {
  console.log('📢 Push notification received:', event.data?.text());
  const notificationData = event.data ? event.data.json() : {};
  const title = notificationData.title || 'Ambetter Health';
  const options = {
    body: notificationData.body || 'You have a new notification',
    icon: '/ambetter-logo-192.png',
    badge: '/ambetter-logo-192.png',
    tag: notificationData.tag || 'ambetter-notification',
    requireInteraction: false,
    ...notificationData
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked:', event.notification.tag);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
