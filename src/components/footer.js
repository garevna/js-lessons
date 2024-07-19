const { footerStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { copyrightText, copyrightSign } = require('../configs').default

class Footer extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = footerStyles

    shadow.innerHTML += `
    <footer>
      <div id="donate-button" class="donate-button" onclick="document.querySelector('donate-popup').style.bottom = '32px'">
        <!-- <span id="blue-heart">&#128153;</span>
        <span id="yellow-heart">&#128155;</span>
        <p>DONATE</p> -->
        <donate-button size="64"></donate-button>
      </div>
      <div id="copyright-text" class="footer-text">
        <small> ${copyrightText} <br><br> ${copyrightSign} </small>
      </div>
      <div id="author-photo" class="footer-picture">
        <figure class="overshadow">
          <div class="overshadow__shadow">
            <div class="overshadow__text">${copyrightSign}</div>
          </div>
        </figure>
      </div>
      <funny-slogan id="slogan-donate" text="don't be a miser!"/>
    </footer>
    `
  }
}

customElements.define('footer-component', Footer)
