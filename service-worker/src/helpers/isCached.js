const { uncached } = require('../configs').default

export function isCached (request) {
  return !uncached.find(file => request.url.includes(file))
}
