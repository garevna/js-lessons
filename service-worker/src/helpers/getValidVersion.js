import { versions } from './versions'
import { getVersified } from './getVersified'

export async function getValidVersion (data) {
  const url = typeof data === 'string' ? data : data.url
  const key = await getVersified(url)
  if (!key) return new Date().toISOString()

  const map = await versions()
  return map ? map[key] : new Date().toISOString()
}
