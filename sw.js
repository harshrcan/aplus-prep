/* Offline cache. Bump VERSION when files change. Cloud sync calls (supabase.co) always go to the network. */
const VERSION = 'aplus-v1';
const FILES = ['./', 'index.html', 'css/style.css', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'js/data/core1-days1-7.js', 'js/data/core1-days8-14.js', 'js/data/core2-days15-21.js', 'js/data/core2-days22-28.js', 'js/data/decks.js', 'js/data/tickets.js',
  'js/core.js', 'js/engine.js', 'js/pages.js'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // network first so updates show up, cache as fallback when offline
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
