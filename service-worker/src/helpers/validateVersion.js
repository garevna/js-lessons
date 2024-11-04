import { getVersified } from './getVersified'
import { getValidVersion } from './getValidVersion'

const { verHeaderName } = require('../configs').default

export function validateVersion (url, response) {
	if (!url || !response) return false

  const versified = getVersified(url)

  if (!versified) return true

  const version = response.headers.get(verHeaderName)

  return !!version && version === getValidVersion(url)
}
