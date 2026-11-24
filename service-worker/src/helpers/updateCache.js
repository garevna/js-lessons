import { getValidVersion } from './getValidVersion'
import { getCacheName } from './getCacheName'

const { verHeaderName } = require('../configs').default

/**
 * The address to file it under is the one that was asked for, not the one the
 * answer came from. They differ whenever a redirect was followed: ask for
 * /maps/course.html, be answered by /maps/course. Filed under the answer's
 * address, the entry would never be found again - the next request asks for
 * .html once more - and the cache would grow a copy per visit while every
 * visit went to the network.
 */
export async function updateCache (response, url = response.url) {
  if (url.includes('chrome-extension://')) return false

  const clone = response.clone()

  const { status, statusText } = response

  const headers = new Headers(clone.headers)

  headers.append(verHeaderName, await getValidVersion(url))

  const blob = await clone.blob()
  const resp = new Response(blob, { status, statusText, headers })

  const cache = await caches.open(getCacheName())

  return await cache.put(url, resp)
}
