import { getVersified } from './getVersified'
import { getValidVersion } from './getValidVersion'

const { verHeaderName } = require('../configs').default

export function validateVersion (cacheResponse) {
	if (!cacheResponse) return true

  const versified = getVersified(cacheResponse.url)

  if (!versified) return true

  const version = cacheResponse.headers.get(verHeaderName)

  return version && version === getValidVersion(cacheResponse.url)
}
