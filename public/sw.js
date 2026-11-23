const cacheName = 'cc-shell-v2'
const logo = '/brand/c-180.png'
self.addEventListener('install', event => event.waitUntil(
  caches.open(cacheName).then(cache => cache.addAll([logo, '/manifest.webmanifest']))
))
self.addEventListener('activate', event => event.waitUntil(caches.delete('cc-shell-v1')))
self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return
  if (new URL(request.url).pathname === logo) {
    event.respondWith(caches.open(cacheName).then(async cache => (await cache.match(logo)) || fetch(request)))
  } else if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => new Response(
      '<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Cristian Coaching</title><body style="background:#161616;color:#fff9f5;font:1rem/1.5 system-ui;padding:8vw"><img src="/brand/c-180.png" width="80" height="80" alt=""><h1>Cristian Coaching</h1><p>Riconnettiti per aprire lo studio. I tuoi dati locali sono conservati.</p></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )))
  }
})
