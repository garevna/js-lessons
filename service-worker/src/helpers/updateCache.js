import { getValidVersion } from './getValidVersion'

const { cacheName, verHeaderName } = require('../configs').default

export async function updateCache (response) {
  if (response.url.includes('chrome-extension://')) return false

  const clone = response.clone()

  const { status, statusText } = response

  const headers = new Headers(clone.headers)

  headers.append(verHeaderName, getValidVersion(response))

  const blob = await clone.blob()
  const resp = new Response(blob, { status, statusText, headers })

  const cache = await caches.open(cacheName)

  return await cache.put(response.url, resp)
}
