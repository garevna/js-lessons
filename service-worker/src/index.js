const { initialCachedFiles, cacheName } = require('./configs').default
const { searchInCache } = require('./helpers').default

self.fromCache = []
self.fromNetwork = []

self.addEventListener('message', event => {
  console.log(self.fromCache)
  console.log(self.fromNetwork)
})

// const enableNavigationPreload = async () => self.registration.navigationPreload && await self.registration.navigationPreload.enable()
//
// self.addEventListener('activate', event => event.waitUntil(enableNavigationPreload()))

self.addEventListener('install', event => event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(initialCachedFiles))))

self.addEventListener('fetch', event => event.respondWith(searchInCache(event)))

self.addEventListener('error', console.warn)
