const { routes } = require('../configs').default

export function testErrors (request) {
  if (!request) {
    self.postMessage({ error: 'Invalid empty request.' })
    return true
  }

  const { route, iconList } = request

  if (!route) {
    self.postMessage({ error: 'Invalid request. Route is required.' })
    return true
  }

  if (!Object.keys(routes).includes(request.route)) {
    self.postMessage({ error: `Invalid route ${request.route}.` })
    return true
  }

  return false
}
