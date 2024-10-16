class GraphicHeader extends HTMLElement {
  constructor () {
    super ()
    this.normalState = [-100, 0, 300, 0]
    this.currentState = [-100, 0, 300, 0]
    this.hoverState = [20, 70, 80, 70]
    this.defs = `
      <defs>
        <filter id="shadow" x="0" y="0" width="300%" height="300%">
          <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1" />
          <feGaussianBlur result="blurIn" in="offOut" stdDeviation="7" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <pattern id="picture" patternUnits="userSpaceOnUse" width="100" height="100">
          <image xlink:href="https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fstars-5.gif" x="0" y="-50" width="100" height="200" />
        </pattern>
      </defs>
    `
    this.shadow = this.attachShadow({ mode: 'closed' })
		this.shadow.innerHTML = `
      <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        ${this.defs}
      	<path d="M-50 0 C ${this.currentState[0]} ${this.currentState[1]}, ${this.currentState[2]} ${this.currentState[3]}, 250 0" filter="url(#shadow)" fill="url(#picture)" />
    	</svg>
    `
  }

  connectedCallback () {
    this.svg = this.shadow.querySelector('svg')
    this.path = this.shadow.querySelector('path')
    this.shadow.appendChild(document.createElement('style')).textContent = `
      svg {
        position: fixed;
        top: 0;
        height: 50px;
        left: 0;
        width: 100vw;
        background: var(--header-back-color);
        box-shadow: 3px 3px 5px #00000070;
      }
      svg > path {
        fill: url(#picture);
        stroke: none;
      }
      h3 {
        font-family: var(--funny-font);
        color: #f50;
      }

      @media screen and (max-width: 480px), screen and (max-height: 480px) {
        svg, h3 {
          display: none;
        }
      }
    `

    Object.assign(this.svg, {
      onpointerdown: this.change.bind(this, 'hoverState'),
      onpointerup: this.change.bind(this, 'normalState')
    })

    this.svg.addEventListener('pointerdown', this.changeSVGsize )
    this.svg.addEventListener('pointerup', function (event) {
      event.preventDefault()
      event.stopPropagation()
      event.cancelBubble = true
      event.returnValue = false
      return false
    })
    window.oncontextmenu = function(event) {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
  }

  changeSVGsize (event) {
    Object.assign(event.target.style, {
      height: '80vh',
      background: 'var(--back-transparent)',
      boxShadow: 'none'
    })
  }

  animate () {
    const [x1, y1, x2, y2] = this.currentState

    this.svg.innerHTML = `
      ${this.defs}
      <path d="M-150 0 C ${x1} ${y1}, ${x2} ${y2}, 300 0" filter="url(#f1)"/>
    `
    this.change.call(this, arguments[0])
  }

  change () {
    let dist = 0
    for (let index = 0; index < this.currentState.length; index++) {
      let distance = this[arguments[0]][index] - this.currentState[index]
      this.currentState[index] += distance < 0 ? -1 : distance > 0 ? 1 : 0
      dist += Math.abs(distance)
    }
    if (dist === 0) {
      if (arguments[0] === 'normalState') {
        Object.assign(this.svg.style, {
          height: '50px',
          background: 'var(--header-back-color)',
          boxShadow: '4px 4px 5px #00000070'
        })

      } else {
        this.svg.innerHTML += `<image xlink:href="https://yokoent.com/images/fingerprint-png-green-3.png" width="20%" height="20%" x="50" y="20" />`
      }
      return
    }
    requestAnimationFrame(this.animate.bind(this, arguments[0]))
  }

  disconnectedCallback () {
    console.log('GraphicHeaderComponent was disconnected!')
  }
}

customElements.define('graphic-header', GraphicHeader)
