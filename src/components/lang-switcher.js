const { welcomeStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { welcomeMessages, copyrightText, copyrightSign } = require('../configs').default

const { folderPhoto, photo, folderPicture, picture, welcome, sign, slogan } = welcomeMessages

class LangSwitcher extends HTMLElement {
  constructor(){
    super()

    this.lang = localStorage.getItem('lang') || 'eng'

    this.shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = `
      .lang-switcher {
        position: fixed;
        bottom: 88px;
        right: calc(50% - 578px);
        border: solid 1px #f0f;
        padding: 16px;
        border-radius: 4px 32px 32px 4px;
        font-size: 24px;
        background: #eef;
      }
    `

    shadow.innerHTML += `
      <div class="lang-switcher">
        <img id="lang-flag" src="" width="48" />
      </div>
    `
  }

  switchLanguage (val) {
    localStorage.setItem('lang', val)
    const fileName = val === 'eng' ? 'uk-flag.png' : 'ua-flag.png'
    this.el.src = createPath('images', fileName)
  }

  connectedCallback () {
    this.el = Object.assign(this.shadow.querySelector('#lang-flag'), {

    })
  }
}

customElements.define('lang-switcher', LangSwitcher)

export default WelcomeWin
