import { validateVersion } from './validateVersion'
import { getFromRemote } from './getFromRemote'
import { updateCache } from './updateCache'
import { isStable } from './isStable'
import { isCached } from './isCached'
import { getCacheName } from './getCacheName'

/**
 * respondWith wants a Response. Given nothing it throws, which shows up as an
 * error against the worker and as a request the page can neither read nor
 * recover from — so a plain 404 came out looking like the worker was broken.
 *
 * Where there is nothing to hand back, hand back what the network actually
 * said, 404 included; and if even that fails, a network error, which is what
 * the page would have got with no worker at all.
 */
const orNetwork = async (request, response) =>
  response || await fetch(request).catch(() => Response.error())

export async function searchInCache (event) {
  const { request } = event

  if (!isCached(request)) return orNetwork(request, await getFromRemote(request.url))

  const cache = await caches.open(getCacheName())
  const response = await cache.match(request, { ignoreSearch: true })

  if (response) {
    if (isStable(request)) return response

    const valid = await validateVersion(request.url, response)

    if (valid) return response

    const fetchResponse = await getFromRemote(request.url)

    if (fetchResponse && fetchResponse.ok) {
      await cache.delete(request.url)
      await updateCache(fetchResponse)
      return fetchResponse
    } else {
      console.warn(`Old cache will be used for ${request.url}.`)
      return response
    }
  } else {
    if (navigator.onLine) {
      const fetchResponse = await getFromRemote(request.url)
      fetchResponse && await updateCache(fetchResponse)
      return orNetwork(request, fetchResponse)
    } else {
      console.warn('OFFLINE MODE: ', request.url)
      const offline = await cache.match('lessons/offline.md', { ignoreSearch: true })
      return orNetwork(request, offline)
    }
  }
}
