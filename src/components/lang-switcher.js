const { langSwitcherStyles } = require('../styles').default
const { langSwitcherTemplate } = require('../templates').default
const { createElem, createPath, getContentWorker } = require('../helpers').default
const { welcomeMessages, copyrightText, copyrightSign } = require('../configs').default

const { folderPhoto, photo, folderPicture, picture, welcome, sign, slogan } = welcomeMessages

class LangSwitcher extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    createElem('style', shadow).textContent = langSwitcherStyles

    shadow.innerHTML += langSwitcherTemplate

    this.onclick = function (event) {
      this.currentLang = this.currentLang === 'ua'
        ? 'eng'
        : this.currentLang === 'eng'
          ? 'ru'
          : 'ua'
      this.switchLang()
    }.bind(this)

    Object.assign(this, {
      worker: getContentWorker(),
      text: shadow.querySelector('.speech-baloon-text')
    })
  }

  connectedCallback () {
    this.currentLang = localStorage.getItem('lang') || 'eng'
    this.setText()

    let [page, saved] = [
      location.search.slice(1),
      localStorage.getItem('active-topic')
    ]

    saved !== page && localStorage.setItem('active-topic', page)

    this.worker.postMessage({
      route: 'init',
      param: {
        lang: this.currentLang,
        page
      }
    })
  }

  setText () {
    this.text.textContent = this.currentLang.toUpperCase().slice(0,2)
  }

  switchLang () {
    localStorage.setItem('lang', this.currentLang)
    this.worker.postMessage({ route: 'lang', param: this.currentLang })
    this.setText()
  }
}

customElements.define('lang-switcher', LangSwitcher)
