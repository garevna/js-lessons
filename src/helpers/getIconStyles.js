import { minifier } from './minifier'
import { icon } from '../styles/icon'
import { ico } from '../styles/ico'
import { buttons } from '../styles/buttons'

import { getIconsWorker } from './getIconsWorker'

const worker = getIconsWorker()

export const getIconStyles = (source, iconList) => new Promise(resolve => {
  worker.addEventListener('message', function (event) {
    const { route, iconList, response, error } = event.data

    if (route !== source || !iconList) return
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
