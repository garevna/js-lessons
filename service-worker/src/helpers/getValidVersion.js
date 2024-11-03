import { getVersified } from './getVersified'

const { versions } = require('../configs').default

export function getValidVersion (data) {
  const url = typeof data === 'string' ? data : data.url
  const key = getVersified(url)
  return key ? versions[key] : new Date().toISOString()
}
