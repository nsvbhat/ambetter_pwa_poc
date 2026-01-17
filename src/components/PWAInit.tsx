'use client';

import { useEffect } from 'react';

export default function PWAInit() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
          console.log('Service Worker scope:', registration.scope);
          
          // Listen for new service worker ready
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is ready, reload the page silently
                console.log('🔄 New version detected, reloading...');
                setTimeout(() => {
                  window.location.reload();
                }, 2000); // Wait 2 seconds before reload
              }
            });
          });
          
          // Request notification permission for better engagement
          if ('Notification' in window && Notification.permission === 'default') {
            console.log('Requesting notification permission...');
            Notification.requestPermission().catch(() => {});
          }
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    } else {
      console.warn('⚠️ Service Worker not supported in this browser');
    }

    // Check for updates periodically
    const interval = setInterval(async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          registrations.forEach((registration) => {
            registration.update().catch((err) => console.error('Update check failed:', err));
          });
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return null;
}
