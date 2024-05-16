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
          <img src="${createPath(folderPhoto, photo)}" width="250" />
          <h3>${welcome}</h3>
          <h4>
            <small>${sign}</small>
          </h4>
        </div>
        <div id="right" style='text-align:right'>
          <img src="${createPath(folderPicture, picture)}">
          <h3>${slogan}</h3>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('welcome-win', WelcomeWin)

export default WelcomeWin
