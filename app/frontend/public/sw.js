// Service worker di Mandari.
// Serve a rendere l'app installabile e a dare una minima resilienza offline.
// NON tocca le chiamate al backend (POST/API): quelle passano sempre dalla rete.

const CACHE = "mandari-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const chiavi = await caches.keys();
      await Promise.all(chiavi.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Solo richieste GET dello stesso sito: le pagine e gli asset.
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigazioni (aprire una pagina): rete prima, cache come rete di sicurezza.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const rete = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, rete.clone());
          return rete;
        } catch (e) {
          const cache = await caches.open(CACHE);
          const salvata = await cache.match(req);
          return salvata || cache.match("/");
        }
      })()
    );
    return;
  }

  // Asset statici: cache prima (più veloce), aggiorna in background.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const salvata = await cache.match(req);
      const dallaRete = fetch(req)
        .then((rete) => {
          if (rete && rete.status === 200) cache.put(req, rete.clone());
          return rete;
        })
        .catch(() => salvata);
      return salvata || dallaRete;
    })()
  );
});
