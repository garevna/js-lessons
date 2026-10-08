import { minifier } from './minifier'
import { icon } from '../styles/icon'
import { ico } from '../styles/ico'
import { buttons } from '../styles/buttons'

import { getIconsWorker } from './getIconsWorker'

const worker = getIconsWorker()

/**
 * The icons a page or a spoiler asks for, as a stylesheet.
 *
 * The worker echoes the list it was given back with its answer, and the answer
 * is only taken when that echo is the list this call sent. Every caller used to
 * resolve on the first message with a matching route, so two asking at once —
 * the page and a spoiler, or two spoilers — each took whichever answer arrived
 * first, and one of them got the other's icons. The listener is removed once it
 * has its answer; they used to stay on the worker for the life of the page, one
 * more on every call.
 */
export const getIconStyles = (source, iconList) => new Promise(resolve => {
  const asked = JSON.stringify(iconList)

  worker.addEventListener('message', function listener (event) {
    const { route, iconList, response, error } = event.data

    if (route !== source || !iconList) return
    if (JSON.stringify(iconList) !== asked) return

    worker.removeEventListener('message', listener)

    if (error) console.error(error)
    if (!response) console.error('There is no response from icons worker!')

    const css = Object.keys(response)
      .filter(key => !!key && !!response[key])
      .map(key => {
        let selector = `.${key}`
        switch (key) {
          case 'cap':
          case 'coffee':
            selector = '.cap, .coffee, .cup'
            break
          case 'open-in-new':
          case 'open_in_new':
            selector = 'a.visible-anchor, .open-in-new'
            break
          case 'page-next':
          case 'page_next':
            selector = '.page-next'
            break
          case 'page-previous':
          case 'page_previous':
            selector = '.page-previous'
            break
          case 'link':
          case 'link-ico':
            selector = '.link-ico, .link'
            break
          case 'err':
          case 'error':
            selector = '.err, .error'
            break
          case 'warn':
          case 'warning':
            selector = '.warn, .warning'
            break
          default:
            selector = `.${key}`
            break
        }

        return `${selector}{background-image: url(${response[key]});}`
      })
      .join('')

    resolve(minifier(icon + ico + buttons) + css)
  })

  worker.postMessage({ route: source, iconList })
})
