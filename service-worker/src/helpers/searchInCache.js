import { validateVersion } from './validateVersion'
import { getFromRemote } from './getFromRemote'
import { updateCache } from './updateCache'
import { isStable } from './isStable'
import { isCached } from './isCached'
import { getCacheName } from './getCacheName'

export async function searchInCache (event) {
  const { request } = event

  if (!isCached(request)) return await getFromRemote(request.url)

  const cache = await caches.open(getCacheName())
  const response = await cache.match(request, { ignoreSearch: true })

  if (response) {
    if (isStable(request)) return response

    const valid = validateVersion(request.url, response)

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
      return fetchResponse
    } else {
      console.warn('OFFLINE MODE: ', request.url)
      const offline = await cache.match('lessons/offline.md', { ignoreSearch: true })
      return offline
    }
  }
}
