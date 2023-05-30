// service-worker.js
const cacheName = "my-app-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/", // Add the paths to your static assets here
        "/index.html",
        "/manifest.json",
        "/logo.png",
        // Add more static assets as needed
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
