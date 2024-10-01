const { createElem } = require('../helpers').default

class DonateComponent extends HTMLElement {
  constructor () {
    super()

    this.button = Object.assign(createElem('donate-button', this), {
      onclick (event) {
        this.popup.dispatchEvent(new Event('show'))
      }
    })

    this.popup = createElem('donate-popup', this)

    this.addEventListener('main-menu-expand', function (event) {
      if (window.innerWidth <= 460) this.button.style.display = 'none'
    }.bind(this))

    this.addEventListener('main-menu-close', function (event) {
      this.button.style.display = 'block'
    }.bind(this))
  }

  connectedCallback () {
    const size = this.getAttribute('size') || 80
    this.button.setAttribute('size', size)
    this.button.popup = this.popup
  }
}

customElements.define('donate-component', DonateComponent)
