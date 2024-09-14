const { welcomeStyles } = require('../styles').default
const { createElem, createPath } = require('../helpers').default
const { welcomeMessages, copyrightText, copyrightSign } = require('../configs').default

const { folderPhoto, photo, folderPicture, picture, welcome, sign, slogan } = welcomeMessages

class WelcomeWin extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    createElem('style', shadow).textContent = welcomeStyles

    shadow.innerHTML += `
    <div class="box">
      <div class="content">
        <div id="left">
          <img src="${createPath('images', 'garevna-250.jpeg')}" width="250" />
          <h3 style="font-family: 'Luckiest Guy'; font-size: 24px; font-weight: normal;">${welcome}</h3>
          <h4>
            <small>${sign}</small>
          </h4>
        </div>
        <div id="right" style='text-align:right'>
          <img src="${createPath('images', 'personage-on-stars-180x180.gif')}" height="80">
          <h3 style="font-family: Poppins, 'Happy Monkey'; color: #fa0;">${slogan}</h3>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('welcome-win', WelcomeWin)

export default WelcomeWin
