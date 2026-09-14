import { donateStyles } from './donateStyles'
import { createElem } from './createElem'
import { donateTo } from './donateTo'
import { donateConfig } from './donate.config'

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

    const { url, label } = donateConfig.payment

    Object.assign(createElem('p', this.popup), {
      innerText: url ? donateConfig.intro.withPayment : donateConfig.intro.cardsOnly
    })

    // A hosted payment page, when there is one: one click instead of copying
    // a number and switching to a banking app. Everything below stays as the
    // fallback — for anyone who would rather transfer it themselves, and for
    // whenever the service is down.
    if (url) {
      Object.assign(createElem('a', this.popup), {
        className: 'pay-button',
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        innerText: label
      })
    }

    const container = Object.assign(createElem('table', this.popup), {
      id: 'donate-popup-container',
      width: '100%',
      rowspan: 32
    })

    // Inside the shadow root on purpose. Created without a parent it lands in
    // document.body, where the popup's styles do not reach it and it is not
    // positioned at all — the confirmation appeared as a stray line at the
    // bottom of the page, if it was noticed at all.
    const tooltip = Object.assign(createElem('small', shadow), {
      className: 'tooltip-text',
      innerText: 'Copied to clipboard'
    })

    const copy = (value, event) => {
      navigator.clipboard.writeText(value)
      const { clientX, clientY } = event
      Object.assign(tooltip.style, {
        top: `${clientY + 16}px`,
        left: `${clientX}px`,
        opacity: 1
      })
      clearTimeout(copy.timer)
      copy.timer = setTimeout(() => Object.assign(tooltip.style, { opacity: 0 }), 2000)
    }

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

          // The whole row copies, not just the icon. The caption is now the
          // card number itself, and a number is the thing a donor reaches for.
          const cell = Object.assign(createElem('div', walletCell), {
            className: 'wallet',
            title: 'Click to copy',
            onclick: (event) => copy(wallet.number, event)
          })

          const { width = 48, height = 36 } = wallet

          Object.assign(createElem('img', cell), {
            src: wallet.icon,
            width,
            height,
            style: 'vertical-align: middle; margin-bottom: 8px;'
          })

          Object.assign(createElem('small', cell), {
            innerText: wallet.name
          })
        })
      createElem('hr', provider)
    }
  }
}

customElements.define('donate-popup', DonatePopup)
