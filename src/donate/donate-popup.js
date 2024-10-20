import { donateStyles } from './donateStyles'
import { createPath } from './createPath'
import { createElem } from './createElem'
import { donateTo } from './donateTo'

const binance = createPath('images', 'binance.png')

const ref = `
  <a href="https://www.binance.com" target="_blank">
    <img src="${binance}" width="48" height="26">
  </a>
`

class DonatePopup extends HTMLElement {
  constructor(){
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    Object.assign(this, {
      shadow: Object.assign(createElem('div', shadow), {
        className: 'donate-shadow'
      }),
      popup: Object.assign(createElem('div', shadow), {
        className: 'donate-popup'
      })
    })

    this.addEventListener('show', function (event) {
      this.shadow.style.display = 'block'
      Object.assign(this.popup.style, { display: 'block' })
      setTimeout(function () {
        Object.assign(this.popup.style, { opacity: 1 })
      }.bind(this))
    })

    createElem('style', shadow).textContent = donateStyles

    Object.assign(createElem('span', this.popup), {
      className: 'close-button',
      innerHTML: '&#10006;',
      onclick: function (event) {
        Object.assign(this.popup.style, { opacity: 0 })
        Object.assign(this.shadow.style, { display: 'none' })
        setTimeout(function () {
          Object.assign(this.popup.style, { display: 'none' })
        }.bind(this), 500)
      }.bind(this)
    })
    Object.assign(createElem('p', this.popup), {
      innerHTML: `
        I apologise for the temporary inconvenience. I'll connect the service later.<br>
        For now I dare to suggest you to use ${ref} or another exchange.<br>
        Thank you in advance.
      `
    })

    const container = Object.assign(createElem('table', this.popup), {
      id: 'donate-popup-container',
      width: '100%',
      rowspan: 32
    })

    const tooltip = Object.assign(createElem('small'), {
      className: 'tooltip-text',
      style: 'display: none',
      innerText: 'The number has been copied to clipboard.'
    })

    for (const key of Object.keys(donateTo)) {
      const provider = createElem('tr', container)

      const [providerIcon, providerWallets] = [0, 1].map(() => createElem('td', provider))

      providerIcon.style = 'text-align: left; margin-left: -4px;'
      providerWallets.style = 'text-align: right;'

      const { width, height } = donateTo[key]

      Object.assign(createElem('img', providerIcon), {
        src: donateTo[key].icon,
        width,
        height
      })

      donateTo[key].wallets
        .forEach(wallet => {
          const walletCell = createElem('div', providerWallets)
          const cell = createElem('div', walletCell)
          const { width = 48, height = 36 } = wallet
          Object.assign(createElem('img', cell), {
            src: wallet.icon,
            width,
            height,
            style: 'cursor: pointer; vertical-align: middle; margin-bottom: 8px;',
            onclick (event) {
              navigator.clipboard.writeText(wallet.number)
              const { clientX, clientY } = event
              Object.assign(tooltip.style, {
                top: `${clientY}px`,
                left: `${clientX}px`,
                display: 'block'
              })
              setTimeout(() => Object.assign(tooltip.style, { display: 'none' }), 3000)
            }
          })
          Object.assign(createElem('small', cell), {
            innerText: wallet.name,
            style: 'cursor: pointer;'
          })
        })
      createElem('hr', provider)
    }
  }
}

customElements.define('donate-popup', DonatePopup)
