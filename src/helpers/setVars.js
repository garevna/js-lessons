import { createPath } from './createPath'

export function setVars () {
  const root = document.documentElement

  root.style.setProperty('--stars-in-line', `url(${createPath('images', 'stars-in-line.gif')})`)
  root.style.setProperty('--stars-for-donates', `url(${createPath('images', 'stars-for-donates.gif')})`)
  root.style.setProperty('--personage-on-stars', `url(${createPath('images', 'personage-on-stars-180x180.gif')})`)

  root.style.setProperty('--garevna-wild', `url(${createPath('images', 'garevna-wild-180.jpeg')})`)
}
