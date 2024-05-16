class SvgNavigationPanel extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({ mode: 'closed' })
        this.shadow.innerHTML = `<svg></svg>`

        this.status = 'norm'
        this.maxWidth = 320
        this.minWidth = 50
        this.step = 5
        this.d = 50
        this.svg = document.querySelector ( 'svg' )

        this.rand1 = this.randomStep
        this.rand2 = this.rand1 + this.randomStep,
        this.offset = this.randomWidth

        this.addEventListener('expand', function(event) {
          this.path.dispatchEvent(new Event(event.type))
        })

        this.addEventListener('close', function (event) {
          this.path.dispatchEvent(new Event(event.type))
        })
    }
    get w () {
      return window.innerWidth
    }
    get h () {
      return window.innerHeight
    }
    get path () {
      return this.shadow.querySelector('svg > path')
    }
    get randomStep () {
      return Math.round(Math.random() * this.h * 0.3)
    }
    get randomWidth () {
      return Math.round(Math.random() * this.maxWidth * 0.4)
    }

    setListeners () {
      this.path.addEventListener('expand', this.movie.bind(this))
      this.path.addEventListener('close', this.reverse.bind(this))
    }

    setStatic ( expand ) {
        this.svg.style.width = expand ? '100vw' : '0'
        this.status = expand ? 'wide' : 'norm'
        let width = expand ? this.maxWidth : this.minWidth
        this.svg.innerHTML = `<path d="M${this.w} 0 L${this.w-width} 0 L${this.w-width} ${this.h} L${this.w} ${this.h} Z" />`
        this.setListeners()
        this.rand1 = this.randomStep
        this.rand2 = this.rand1 + this.randomStep
        this.offset = this.randomWidth
    }

    movie () {
        this.svg.style.width = '100vw'
        this.d += this.step + 1
        this.rand1 += 4
        this.rand2 += 5
        this.svg.innerHTML = `<path d="M${this.w} 0 L${this.w-this.minWidth-this.offset} 0 C${this.w-this.d+this.offset} ${this.rand1} ${this.w-this.d-this.offset} ${this.rand2} ${this.w-this.minWidth-this.offset*2} ${this.h} L${this.w} ${this.h} Z" />`;
        this.d < this.maxWidth ? requestAnimationFrame ( this.movie.bind ( this ) ) : this.setStatic( true )
    }

    reverse () {
        this.d -= this.step + 1
        this.rand1 += 4
        this.rand2 += 5
        this.svg.innerHTML = `<path d="M${this.w} 0 L${this.w-this.minWidth-this.d} 0 C${this.w-this.d+this.offset} ${this.rand1} ${this.w-this.d} ${this.rand2} ${this.w-this.minWidth-this.d} ${this.h} L${this.w} ${this.h} Z" />`;
        this.d > 0 ? requestAnimationFrame ( this.reverse.bind ( this ) ) : this.setStatic( false )
    }

    connectedCallback () {
        this.svg = this.shadow.querySelector ( 'svg' )
        this.shadow.appendChild ( document.createElement ('style'))
            .textContent = `
                svg {
                  position: fixed;
                  right: 0;
                  top: 0;
                  height: 100vh;
                  width: 0;
                  box-sizing:border-box;
                }
            `;
        this.svg.innerHTML = `<path d="M${this.w} 0 L${this.w-this.minWidth} 0 L${this.w-this.minWidth} ${this.h} L${this.w} ${this.h} Z" />`;
        this.setListeners()

        window.addEventListener('resize', function () {
          this.setStatic(status === 'wide')
        }.bind(this))
    }
}

customElements.define('svg-nav-panel', SvgNavigationPanel)

// export default SvgNavigationPanel
