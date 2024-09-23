import { minifier } from './minifier'
import { icon } from '../styles/icon'
import { ico } from '../styles/ico'

if (!window[Symbol.for('icons.worker')]) {
  window[Symbol.for('icons.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}icons.worker.js`), {
    onerror: error => console.error('! Icons worker Error\n', error)
  })
}

export const getIconStyles = (source, iconList) => new Promise(resolve => {
  window[Symbol.for('icons.worker')].addEventListener('message', function (event) {
    const { route, iconList, response, error } = event.data

    if (route !== source || !iconList) return
    if (error) console.error(error)
    if (!response) console.error('There is no response from icons worker!')

    const css = Object.keys(response)
      .filter(key => !!key && !!response[key])
      .map(key => `.${key}{background-image: url(${response[key]});}`)
      .join('')

    resolve(minifier(icon + ico) + css)
  })

  window[Symbol.for('icons.worker')].postMessage({ route: source, iconList })
})
