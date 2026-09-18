const { initialCachedFiles } = require('./configs').default
const { searchInCache, getCacheName } = require('./helpers').default

const enableNavigationPreload = async () => self.registration.navigationPreload && await self.registration.navigationPreload.enable()

/**
 * Take over the open tabs instead of waiting for the next navigation.
 *
 * A cached page is checked against the version map, and the map lives inside
 * the worker doing the checking. So an old worker keeps saying "still current"
 * about pages the deploy has already replaced — and this site never navigates:
 * choosing a lesson is a fetch, so one tab could stay on yesterday's content
 * for as long as it was open. skipWaiting already activates the new worker;
 * claim is what hands it the pages, and from that moment every lesson fetched
 * is measured against the new map.
 */
const takeOver = async () => {
  await enableNavigationPreload()
  await self.clients.claim()
}

self.addEventListener('activate', event => event.waitUntil(takeOver()))

self.addEventListener('install', event => {
  event.waitUntil(caches.open(getCacheName()).then(cache => cache.addAll(initialCachedFiles)))
  self.skipWaiting()
})

self.addEventListener('fetch', event => event.respondWith(searchInCache(event)))

self.addEventListener('error', console.warn)
