import { getContentWorker } from './getContentWorker'

export class SearchComponent extends HTMLElement {
  constructor () {
    super()

    this.worker = getContentWorker()

    this.innerHTML = `
      <div class="search-wrapper">
        <div id="search-component">
          <input type="text" id="search-input" />
          <input type="reset" id="search-reset" value="✖" />
        </div>
        <div id="search-button" class="search-icon"></div>
      </div>
    `
  }
  connectedCallback() {
    this.input = this.querySelector('#search-input')
    this.reset = this.querySelector('#search-reset')
    this.button = this.querySelector('#search-button')

    this.mainMenu = document.querySelector('main-menu')

    this.button.onclick = this.search.bind(this)
    this.reset.onclick = this.resetSearch.bind(this)
  }

  search (event) {
    this.worker.postMessage({ route: 'search', param: this.input.value.toLowerCase() })
  }

  resetSearch (event) {
    this.input.value = ''
    this.worker.postMessage({ route: 'search', param: '' })
  }
}

customElements.define('search-component', SearchComponent)
