const { versions, initialCachedFiles } = require('../configs').default

export function getVersified (data) {
  const url = typeof data === 'string' ? data : data.url
  return Object.keys(versions).find(key => url.includes(key))
}
