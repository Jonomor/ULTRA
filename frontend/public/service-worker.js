const CACHE_NAME = 'ultra+-cache-v2';
const OFFLINE_URL = '/index.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'https://fonts.gstatic.com',
  'https://raw.githubusercontent.com/jonomor/assets/main/strategy-diagram.png',
  'https://raw.githubusercontent.com/jonomor/assets/main/performance-chart.png'
];

// 🔐 Install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ♻️ Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 🧠 Fetch Strategy: Dynamic Data Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  if (request.url.includes('/api/')) {
    // Handle dynamic API caching
    event.respondWith(
      fetch(request)
        .then(response => {
          return caches.open('api-cache').then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Standard static cache strategy
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});

// 🔄 Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-submit') {
    event.waitUntil(
      // Example: retry pending form submissions
      syncPendingData()
    );
  }
});

async function syncPendingData() {
  const data = await getPendingSubmissions(); // Your IndexedDB logic here
  for (const payload of data) {
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 🔔 Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'ULTRA+';
  const body = data.body || 'Stay sharp. New scalping opportunity awaits.';
  const icon = '/favicon.ico';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: icon,
      data: data.url || '/'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});
