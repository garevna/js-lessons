import { createPath } from './createPath'

const { icons } = require('../configs').default

export function setVars () {
  const root = document.documentElement

  root.style.setProperty('--menu-icon-image', `url(${createPath('icons', 'table-of-contents-white.svg')}`)
  root.style.setProperty('--menu-icon-size', '36px')
  root.style.setProperty('--menu-symbol', `url(${createPath('icons', 'table-of-contents-white.svg')}`)
  root.style.setProperty('--menu-background', '#333')
  root.style.setProperty('--menu-color', '#eef')
  root.style.setProperty('--menu-highlight-background', '#079')
  root.style.setProperty('--menu-highlight-color', '#fff')

  root.style.setProperty('--back-color', '#fbfbfb90')

  root.style.setProperty('--button-gradient-0', 'linear-gradient(to right, #09b, #09b, #09b)')
  root.style.setProperty('--button-gradient-1', 'linear-gradient(to right top, #09b, #5bd 10% 30%, #09b)')
  root.style.setProperty('--button-gradient-2', 'linear-gradient(to right top, #09b, #5bd 30% 50%, #09b)')
  root.style.setProperty('--button-gradient-3', 'linear-gradient(to right top, #09b, #5bd 50% 70%, #09b)')
  root.style.setProperty('--button-gradient-4', 'linear-gradient(to right top, #09b, #5bd 70% 90%, #09b)')
  root.style.setProperty('--button-gradient-5', 'linear-gradient(to right top, #09b, #5bd 40% 50%, #09b)')

  root.style.setProperty('--stars', `url(${createPath('images', 'stars.gif')}`)

  root.style.setProperty('--garevna-wild', `url(${createPath('images', 'garevna-wild.png')}`)
  root.style.setProperty('--garevna-wild', `url(${createPath('images', 'garevna-wild.png')}`)

  Object.keys(icons)
    .forEach(key => root.style.setProperty(`--${key}`, `url(${createPath(icons[key].folder, icons[key].fileName)}`))
}
