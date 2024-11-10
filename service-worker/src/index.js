const { initialCachedFiles } = require('./configs').default
const { searchInCache, getCacheName } = require('./helpers').default

const enableNavigationPreload = async () => self.registration.navigationPreload && await self.registration.navigationPreload.enable()

self.addEventListener('activate', event => event.waitUntil(enableNavigationPreload()))

self.addEventListener('install', event => {
  event.waitUntil(caches.open(getCacheName()).then(cache => cache.addAll(initialCachedFiles)))
  self.skipWaiting()
})

self.addEventListener('fetch', event => event.respondWith(searchInCache(event)))

self.addEventListener('error', console.warn)
