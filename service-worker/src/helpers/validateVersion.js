import { getVersified } from './getVersified'
import { getValidVersion } from './getValidVersion'

const { verHeaderName } = require('../configs').default

export async function validateVersion (url, response) {
  if (!url || !response) return false

  const versified = await getVersified(url)

  // Either the resource is not versioned, or the map could not be read. Both
  // mean there is nothing to check against, and an unanswerable question is
  // not a failed check — offline, this is what keeps the cached course
  // readable instead of sending every page to a network that is not there.
  if (!versified) return true

  const version = response.headers.get(verHeaderName)

  return !!version && version === await getValidVersion(url)
}
