import './css/main.css'

import './css/for-rainbow.css'

import './components/glitch'
import './components/plunker-logo'
import './components/GraphicHeaderComponent'
import './components/svg-navigation-panel'
import './components/donate-button'
import './components/donate-component'

import './components/main-menu'
import './components/footer'
import './components/lang-switcher'
import './components/menu-component'
import './components/spoiler-class'
import './components/live-demo-spoiler'
import './components/picture-slider'
import './components/spoiler-component'
import './components/script-spoiler'
import './components/codeOutputComponent'
import './components/test-component'

import './components/page-component'

import './components/welcome-win'
import './components/funny-slogan'

import './components/donate'

// import Shutter from './components/Shutter'

Rainbow.extend('javascript', [
  {
    name: 'keyword',
    pattern: /var|let|const|class|function|function *|function*|return|continue|break/g
  },
  {
    name: 'keyword.magic',
    pattern: /yield|async |await /g
  },
  {
    name: 'method-name',
    pattern: /then|catch/g
  },
  {
    name: 'template-literal',
    pattern: /(\$\{.+\})/g
  }
])

const { setVars, createPath, createElem } = require('./helpers').default

setVars()

const favicon = Object.assign(createElem('link', document.head), {
  rel: 'shortcut icon',
  type: 'image/x-icon',
  href: createPath('icons','personage-icon.ico')
})

window.onscroll = window.onwheel = function (event) {
  const { scrollTop, scrollHeight } = document.documentElement
  const offset = scrollHeight - scrollTop - window.innerHeight
  document.querySelector('main-menu-component')
    .dispatchEvent(Object.assign(new Event('scroll'), { offset }))

  const welcome = document.querySelector('welcome-win')
  welcome && welcome.remove()
}

window.addEventListener('resize', (event) => {
  const grids = document.getElementsByClassName('grid-component')
  Array.from(grids).forEach(elem => elem.dispatchEvent(new Event('resize')))
})
