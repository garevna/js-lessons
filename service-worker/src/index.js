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
/**
 * Drop the cached code, and keep the cached course.
 *
 * A new worker exists because the code changed, so the code in the cache is
 * the one thing certain to be out of date on arrival. Worse, it may be out of
 * date and say otherwise: until the fetch here began passing no-store, the
 * browser's own cache could answer with a previous build and this worker would
 * file those bytes under the version the map calls current. Such an entry is
 * wrong and stamped correct — the version check will never catch it, and no
 * later deploy will either unless that bundle's hash happens to change.
 *
 * So each new worker begins by forgetting every .js, .json, .css and .html it
 * inherits. They are a few hundred kilobytes and come back on demand. The
 * lessons — the megabytes, and the reason there is a cache at all — are left
 * where they are: they are checked file by file against the map, and that
 * check was never the thing that was broken.
 */
const forgetCode = async () => {
  const cache = await caches.open(getCacheName())
  const code = /\.(js|json|css|html)$/

  const stale = (await cache.keys())
    .filter(request => code.test(new URL(request.url).pathname))

  await Promise.all(stale.map(request => cache.delete(request)))
}

const takeOver = async () => {
  await enableNavigationPreload()
  await forgetCode()
  await self.clients.claim()
}

self.addEventListener('activate', event => event.waitUntil(takeOver()))

self.addEventListener('install', event => {
  event.waitUntil(caches.open(getCacheName()).then(cache => cache.addAll(initialCachedFiles)))
  self.skipWaiting()
})

self.addEventListener('fetch', event => event.respondWith(searchInCache(event)))

self.addEventListener('error', console.warn)
