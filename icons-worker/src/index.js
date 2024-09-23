const { getIconList, testErrors } = require('./helpers').default
const { routes } = require('./configs').default

self.controller = async function (request) {
  if (testErrors(request)) return

  const { route, iconList } = request

  const response = iconList ? getIconList(iconList) : getIconList(routes[route])

  self.postMessage({ route, iconList, response })
}

self.onmessage = event => self.controller(event.data)
