const { getMainMenu, getKeywords, getLesson, parseHeaders, search } = require('./helpers').default

self.lang = 'eng'
self.currentLesson = 'start-page'

function switchContent () {
  const text = getLesson()
  const headers = parseHeaders(text)

  self.postMessage({ route: 'lesson', response: text })
  self.postMessage({ route: 'page-menu', response: headers })
}

self.controller = async function (request) {
  const { route, param } = request

  switch (route) {
    case 'init':
      const { lang, page } = param
      self.lang = lang ? lang : self.lang
      self.currentLesson = page ? page : self.currentLesson

      self.postMessage({ route, response: { lang: self.lang, page: self.currentLesson } })

      self.postMessage({ route: 'main-menu', response: getMainMenu() })
      self.postMessage({ route: 'lesson', response: getLesson() })
    case 'main-menu':
      return self.postMessage({ route, response: getMainMenu() })
    case 'keywords':
      return self.postMessage({ route, response: getKeywords() })
    case 'search':
      return search(param)
    case 'lang':
      self.lang = ['eng', 'ua', 'ru'].includes(param) ? param : self.lang
      switchContent()
      self.postMessage({ route: 'main-menu', response: getMainMenu() })
      return
    case 'lesson':
      self.currentLesson = param
      switchContent()
      return
    default:
      return self.postMessage({ route, response: null, error: 'Invalid route.' })
  }
}

self.onmessage = event => self.controller(event.data)
