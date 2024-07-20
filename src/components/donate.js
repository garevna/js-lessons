const { donateStyles } = require('../styles').default
const { createPath, createElem, get } = require('../helpers').default

const { donateTo } = require('../configs').default

const binance = createPath('images', 'binance.png')

const ref = `<a href="https://www.binance.com" target="_blank"><img src="${binance}" width="48"></a>`

class DonatePopup extends HTMLElement {
  constructor(){
    super()

    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = donateStyles
    Object.assign(createElem('span', shadow), {
      className: 'close-button',
      innerHTML: '&#10006;',
      onclick () { document.querySelector('donate-popup').style.bottom = '-800px' }
    })
    Object.assign(createElem('h5', shadow), {
      innerHTML: `
        I apologise for the temporary inconvenience. I'll connect the service later.<br>
        For now I dare to suggest you to use ${ref} or another exchange.<br>
        Thank you in advance.
      `
    })

    const container = Object.assign(createElem('table', shadow), {
      id: 'donate-popup-container',
      width: '100%',
      rowspan: 32
    })

    for (const key of Object.keys(donateTo)) {
      const provider = createElem('tr', container)

      const [providerIcon, providerWallets] = [0, 1].map(() => createElem('td', provider))

      providerIcon.style = 'text-align: center;'
      providerWallets.style = 'text-align: right;'

      Object.assign(createElem('img', providerIcon), {
        src: donateTo[key].icon,
        width: donateTo[key].iconSize
      })

      donateTo[key].wallets
        .forEach(wallet => {
          const walletCell = createElem('div', providerWallets)
          const cell = createElem('div', walletCell)
          Object.assign(createElem('img', cell), {
            src: wallet.icon,
            width: wallet.iconSize || 48,
            style: 'cursor: pointer; vertical-align: middle;',
            onclick (event) {
              navigator.clipboard.writeText(wallet.number)
              const { clientX, clientY } = event
              const tooltip = Object.assign(createElem('small'), {
                className: 'tooltip-text',
                style: `top: ${clientY}px; left: ${clientX}px;`,
                innerText: 'The number has been copied to clipboard',
                onclick (event) {
                  event.target.remove()
                }
              })
              setTimeout(() => tooltip.remove(), 3000)
            }
          })
          Object.assign(createElem('small', cell), {
            innerText: wallet.name,
            style: 'cursor: pointer;'
            // onclick (event) {
            //   console.log(wallet.number)
            // }
          })
        })
      createElem('hr', provider)
    }
  }
}

customElements.define('donate-popup', DonatePopup)
