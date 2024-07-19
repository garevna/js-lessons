const { welcomeStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { welcomeMessages, copyrightText, copyrightSign } = require('../configs').default

const { folderPhoto, photo, folderPicture, picture, welcome, sign, slogan } = welcomeMessages

class LangSwitcher extends HTMLElement {
  constructor () {
    super()

    this.currentLang = localStorage.getItem('lang') || 'eng'

    const shadow = this.attachShadow({ mode: 'closed' })

    shadow.innerHTML += `
    <svg viewBox="0 0 4000 600" width="500" style="cursor:pointer;">
      <style>
        .speech-baloon {
          stroke-linejoin:round;
          stroke-width:8px;
          stroke:#ddd;
          fill:#000;
        }
        .speech-baloon-text, .speech-baloon-text--eng {
          font-family: Luckiest Guy;
          fill: #fff;
        }
        .speech-baloon-text {
          font-size: 200px;
        }
        .speech-baloon-text--eng {
          font-size: 160px;
        }
      </style>
      <path class="speech-baloon" d="M 72.140014,391.37082 L 113.90529,296.44975 C 87.508191,275.83832 40.499658,243.29395 41.222865,182.54446 C 40.834139,90.934537 165.68205,33.400040 263.06697,34.467593 C 392.52123,34.286792 490.51593,101.90676 490.33513,182.00206 C 490.15433,290.48329 338.64222,360.99608 183.87568,323.57006 z ">
      </path>
      <text x="140" y="250" class="speech-baloon-text">RU</text>
    </svg>
    `

    const svg = shadow.querySelector('svg')

    svg.onclick = function (event) {
      this.currentLang = this.currentLang === 'ua'
        ? 'eng'
        : this.currentLang === 'eng'
          ? 'ru'
          : 'ua'
      this.switchLang()
    }.bind(this)

    this.text = shadow.querySelector('text')
  }

  connectedCallback () {
    this.currentLang = localStorage.getItem('lang') || 'eng'
    this.switchLang()
  }

  switchLang () {
    localStorage.setItem('lang', this.currentLang)
    this.text.textContent = this.currentLang.toUpperCase()
    this.text.className.baseVal = this.currentLang === 'eng' ? 'speech-baloon-text--eng' : 'speech-baloon-text'

    ;['main-menu-component', 'page-element']
      .forEach(selector => document.querySelector(selector).setAttribute('lang', this.currentLang))
  }
}

customElements.define('lang-switcher', LangSwitcher)
