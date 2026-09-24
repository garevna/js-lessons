import { versions } from './versions'

export async function getVersified (data) {
  const map = await versions()
  if (!map) return null

  const url = typeof data === 'string' ? data : data.url
  return Object.keys(map).find(key => url.includes(key))
}
