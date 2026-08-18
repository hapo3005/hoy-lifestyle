const CACHE = "hoy-lifestyle-preview-v0.3.0";
const APP_SHELL = [
  "./", "./index.html", "./operator.html", "./styles.css", "./operator.css", "./gastro-parity-preview.css", "./app.js", "./operator.js",
  "./src/catalog.js", "./src/decision-engine.js", "./src/trust.js", "./data/lifestyle-catalog-index.json", "./manifest.webmanifest",
  "./data/catalog/lifestyle-001-010.json", "./data/catalog/lifestyle-011-020.json", "./data/catalog/lifestyle-021-030.json",
  "./data/catalog/lifestyle-031-040.json", "./data/catalog/lifestyle-041-050.json", "./data/catalog/lifestyle-051-060.json",
  "./data/catalog/lifestyle-061-070.json", "./data/catalog/lifestyle-071-080.json", "./data/catalog/lifestyle-081-090.json",
  "./data/catalog/lifestyle-091-100.json", "./data/catalog/lifestyle-101-101.json"
];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
function isCacheableAppRequest(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.includes("/auth/") || url.pathname.includes("/rest/") || url.pathname.includes("/functions/")) return false;
  return ["document","script","style","manifest","image","font",""].includes(request.destination);
}
self.addEventListener("fetch", event => {
  const { request } = event;
  if (!isCacheableAppRequest(request)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (!response || response.status !== 200 || response.type === "opaque") return response;
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); return response;
  })));
});
