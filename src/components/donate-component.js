class DonateComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.shadow.innerHTML += `
      <div onclick="document.querySelector('donate-popup').style.bottom = '32px'">
        <donate-button size="80"></donate-button>
      </div>
    `
  }

  connectedCallback () {
    const size = this.getAttribute('size') || 80
    this.shadow.querySelector('donate-button').setAttribute('size', size)
  }
}

customElements.define('donate-component', DonateComponent)
