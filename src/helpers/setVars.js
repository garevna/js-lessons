import { createPath } from './createPath'

const { icons } = require('../configs').default

export function setVars () {
  const root = document.documentElement

  root.style.setProperty('--main-menu-icon-image', `url(${createPath('icons', 'file_folder.png')})`)
  root.style.setProperty('--main-menu-active-icon-image', `url(${createPath('icons', 'open_file_folder.png')})`)

  root.style.setProperty('--menu-icon-image', `url(${createPath('icons', 'table-of-contents-white.svg')})`)
  root.style.setProperty('--menu-symbol', `url(${createPath('icons', 'table-of-contents.svg')})`)

  root.style.setProperty('--stars-in-line', `url(${createPath('images', 'stars-in-line.gif')})`)
  root.style.setProperty('--stars-for-donates', `url(${createPath('images', 'stars-for-donates.gif')})`)
  root.style.setProperty('--personage-on-stars', `url(${createPath('images', 'personage-on-stars-180x180.gif')})`)

  root.style.setProperty('--garevna-wild', `url(${createPath('images', 'garevna-wild-180.jpeg')})`)

  Object.keys(icons)
    .forEach(key => root.style.setProperty(`--${key}`, `url(${createPath(icons[key].folder, icons[key].fileName)})`))
}
