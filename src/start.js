import './css/main.css'

import './css/for-rainbow.css'
import './configs/rainbowExtends.js'

import './components/glitch'
import './components/plunker-logo'

import './components/footer'
import './components/lang-switcher'
import './components/menu-component'
import './components/spoiler-class'
import './components/console-demo'
import './components/test-series'
import './components/picture-slider'
import './components/spoiler-component'
import './components/script-spoiler'
import './components/codeOutputComponent'
import './components/test-component'
import './components/quiz-card'
import './components/code-fix'

import './components/page-component'

import './components/welcome-win'
import './components/funny-slogan'

const { createPath, createElem } = require('./helpers').default

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

// A resize listener used to be here, forwarding the event to every @@@@ grid
// so each could rewrite its own inline style. The grids are laid out by
// .grid-component in pageStyles.js now, and a media query narrows them to one
// column on a phone, so there is nothing to forward.
