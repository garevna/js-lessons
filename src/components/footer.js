const { footerStyles } = require('../styles').default
const { createElem } = require('../helpers').default
const { copyrightText, copyrightSign } = require('../configs').default

class Footer extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = footerStyles

    shadow.innerHTML += `
    <footer>
      <div id="donate-button" class="donate-button">
        <img
          src="${location.href.split('?')[0]}/images/donate.png"
          width="80"
          alt="Support the project"
          onclick="document.querySelector('donate-popup').style.bottom = '32px'"
        />
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
