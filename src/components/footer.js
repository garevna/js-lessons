const { footerStyles } = require('../styles').default
const { createElem } = require('../helpers').default

const copyrightText = 'The use of these materials or any part thereof by commercial schools (courses) constitutes a violation of copyright.'
const copyrightSign = '© Irina H.Fylyppova 2019'

class Footer extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = footerStyles

    shadow.innerHTML += `
    <footer>
      <div class="footer-text">
        <small> ${copyrightText} <br><br> ${copyrightSign} </small>
      </div>
      <div class="footer-picture">
        <figure class="overshadow">
          <div class="overshadow__shadow">
            <div class="overshadow__text">${copyrightSign}</div>
          </div>
        </figure>
      </div>
    </footer>
    `
  }
}

customElements.define('footer-component', Footer)

export default Footer
