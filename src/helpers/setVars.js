import { createPath } from './createPath'

export function setVars () {
  const root = document.documentElement

  root.style.setProperty('--personage-on-stars', `url(${createPath('images', 'personage-on-stars-180x180.gif')})`)
  root.style.setProperty('--garevna-wild', `url(${createPath('images', 'garevna-wild-180.jpeg')})`)
}
