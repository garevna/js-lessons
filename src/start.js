import './css/main.css'

import './css/for-rainbow.css'

import './components/glitch'
import './components/GraphicHeaderComponent'
import './components/svg-navigation-panel'

import './components/main-menu'
import './components/footer'

import './components/menu-component'
import './components/spoiler-class'
import './components/picture-slider'
import './components/spoiler-component'
import './components/script-spoiler'
import './components/codeOutputComponent'

import './components/page-component'

import './components/welcome-win'
import './components/funny-slogan'

import './components/donate'

import Shutter from './components/Shutter'

const { setVars, createPath, createElem } = require('./helpers').default
setVars()

const favicon = Object.assign(createElem('link', document.head), {
  rel: 'shortcut icon',
  type: 'image/x-icon',
  href: createPath('icons','personage-icon.ico')
})

window.onscroll = window.onwheel = function (event) {
  const removed = document.getElementsByTagName('welcome-win')
  if (removed) {
    removed[0].remove()
    window.onscroll = window.onwheel = null
  }
}

window.addEventListener('resize', (event) => {
  const grids = document.getElementsByClassName('grid-component')
  Array.from(grids).forEach(elem => elem.dispatchEvent(new Event('resize')))
})
