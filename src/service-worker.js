workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// workbox.routing.registerRoute(
//   /\.(?:mp3|ogg|webm|m4a)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: "audios",
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 120,
//         maxAgeSeconds: 30 * 24 * 60 * 60,
//       }),
//     ],
//   })
// );
