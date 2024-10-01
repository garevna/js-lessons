const { getMainMenu, getKeywords, getLesson } = require('./helpers').default

self.lang = 'eng'
self.currentLesson = 'start-page'

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
    case 'lang':
      self.lang = ['eng', 'ua', 'ru'].includes(param) ? param : self.lang

      self.postMessage({ route: 'main-menu', response: getMainMenu() })
      self.postMessage({ route: 'lesson', response: getLesson() })

      return
    case 'lesson':
      self.currentLesson = param

      return self.postMessage({ route, response: getLesson() })
    default:
      return self.postMessage({ route, response: null, error: 'Invalid route.' })
  }
}

self.onmessage = event => self.controller(event.data)
