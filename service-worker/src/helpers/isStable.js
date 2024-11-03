const { initialCachedFiles, unvalidated } = require('../configs').default

export function isStable (request) {
  const initial = !!initialCachedFiles.find(file => request.url.includes(file))
  const stable = unvalidated.includes(request.destination)
  return initial || stable
}
