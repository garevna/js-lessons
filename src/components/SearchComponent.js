class SearchComponent extends HTMLElement {
    constructor () {
        super()
    }
    connectedCallback() {
        this.appendChild(
            document.createElement ( "input" )
        )
    }
}
