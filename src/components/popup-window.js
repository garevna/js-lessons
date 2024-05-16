const { createElem } = require('../helpers').default
const { popupWindowStyles } = require('../styles').default

class PopupWindow extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
        this.shadow.innerHTML = `
          <div class="box">
              <div class="content">
                <slot name="left"></slot>
                <slot name="right"></slot>
              </div>
          </div>
        `
        this.box = this.shadow.querySelector ( '.box' )
        this.content = this.shadow.querySelector ( '.content' )
    }
    connectedCallback () {
      createElem('style', this.shadow).textContent = popupWindowStyles
      this.onclick = event => event.target.remove()
    }

    static get observedAttributes () {
      return ['content']
    }
    attributeChangedCallback ( attrName, oldVal, newVal ) {
        newVal ? this.content.innerHTML = newVal : null
    }
}

customElements.define('popup-win', PopupWindow)

export default PopupWindow
