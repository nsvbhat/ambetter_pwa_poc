'use client';

import { useEffect } from 'react';

export default function PWAInit() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
          console.log('Service Worker scope:', registration.scope);
          
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
