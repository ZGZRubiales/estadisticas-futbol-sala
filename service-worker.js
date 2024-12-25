self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/script.js',
        '/manifest.json',
        '/icon.png',  // Aquí puedes poner un icono de 192x192 píxeles
        '/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
