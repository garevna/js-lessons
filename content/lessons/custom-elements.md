# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

~~~html
<speaking-club></speaking-club>
<gold-prize></gold-prize>
<mystery-man></mystery-man>
~~~

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

~~~html
<protuberance></protuberance>
~~~

{{s2.p2}}

~~~js
console.dir(document.querySelector('protuberance').__proto__)
~~~

~~~console
► HTMLUnknownElement
~~~

{{s2.p3}}

~~~js
console.dir(HTMLUnknownElement)
~~~

~~~console
ƒ HTMLUnknownElement()
    arguments: null
    caller: null
    length: 0
    name: "HTMLUnknownElement"
    prototype: HTMLUnknownElement {constructor: ƒ, Symbol(Symbol.toStringTag): "HTMLUnknownElement"}
    __proto__: ƒ HTMLElement()
~~~

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

~~~js
console.dir(customElements)
~~~

~~~console
▼ CustomElementRegistry
  ▼ __proto__: CustomElementRegistry
      ► define: ƒ define()
      ► get: ƒ ()
      ► upgrade: ƒ upgrade()
      ► whenDefined: ƒ whenDefined()
      ► constructor: ƒ CustomElementRegistry()
        Symbol(Symbol.toStringTag): "CustomElementRegistry"
      ► __proto__: Object
~~~

{{s3.p2}}

~~~js
console.dir(CustomElementRegistry)
~~~

~~~~console
▼ ƒ CustomElementRegistry()
    arguments: null
    caller: null
    length: 0
    name: "CustomElementRegistry"
  ▼ prototype: CustomElementRegistry
      ► define: ƒ define()
      ► get: ƒ ()
      ► upgrade: ƒ upgrade()
      ► whenDefined: ƒ whenDefined()
      ► constructor: ƒ CustomElementRegistry()
        Symbol(Symbol.toStringTag): "CustomElementRegistry"
      ► __proto__: Object
  ► __proto__: ƒ ()
~~~~

{{s3.p3}}

______________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}
{{s4.p3}}

~~~js
customElements.define('sample-custom-element', SampleCustomElement)
~~~

_______________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

~~~~js
class SampleElement extends HTMLElement {
  constructor() {
    super ()
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    this.picture = document.createElement('img')
    this.setPicture('https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg')
    wrapper.appendChild(this.picture)
    this.picture.angle = 0
    this.button = document.createElement('button')
    this.button.innerText = 'ROTATE'
    this.button.onclick = this.rotatePicture.bind(this)
    wrapper.appendChild(this.button)

    const style = document.createElement('style')
    style.textContent = `
      .wrapper {
        background-color: #ddddee;
      }
      img {
        width:200px;
        margin: 20%;
        border: dotted 1px #555;
        transition: all 1s;
      }
    `

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(style)
    this.shadow.appendChild(wrapper)
  }

  setPicture(url) {
    this.picture.src = url
  }

  rotatePicture () {
    this.picture.angle += this.picture.angle < 270 ? 90 : -270
    this.picture.style.transform = `rotate(${this.picture.angle}deg)`
  }
}
~~~~

{{s5.p2}}

~~~js
customElements.define('sample-element', SampleElement)
~~~

{{s5.p3}}

~~~js
customElements.get('sample-element')
~~~

~~~console
class SampleElement extends HTMLElement {
    constructor() {
        super ()
        let wrapper = document.createElement ( 'div' )
        wrapper.className = "wrapper"
        this.picture = document.c…
~~~

{{s5.p4}}

~~~javascript
const elem = document.body
  .appendChild(document.createElement('sample-element'))
~~~

________________________________________________

### ![ico-25 icon] {{s6.h1}}

~~~~js
class SampleCustomElement extends HTMLElement {
  constructor () {
    super ()
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    this.canvas = document.createElement('canvas')
    wrapper.appendChild(this.canvas)
    this.resizeCanvas()
    this.area = this.canvas.getContext('2d')
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = `
      .wrapper {
        background-color: #ddddee;
      }
      canvas {
        border: dotted 1px #555;
      }
    `
    this.shadow.appendChild(style)
    this.shadow.appendChild(wrapper)
  }

  resizeCanvas (event) {
    this.canvas.width = window.innerWidth - 20
    this.canvas.height = window.innerHeight - 20
  }

  drawLine (first, second, border) {
    this.area.strokeStyle = border && border.lineColor
      ? border.lineColor
      : '#0000ff'
    this.area.lineWidth = border && border.lineWidth
      ? border.lineWidth
      : 3
    this.area.beginPath()
    this.area.moveTo(first.x, first.y)
    this.area.lineTo(second.x, second.y)
    this.area.stroke()
  }
}

customElements.define('sample-custom-element', SampleCustomElement)

const elem = document.body
  .appendChild(document.createElement('sample-custom-element'))

window.onresize = elem.resizeCanvas.bind(elem)

elem.drawLine({ x:20, y:20 }, { x:400, y:200 }, { lineColor: '#008595', lineWidth: 5 })
~~~~

### ![ico-25 icon] {{s7.h1}}

~~~html
<h3>Пример использования Custom Elements</h3>
<article contenteditable = true>
  <p>Статические методы класса объявляются с помощью ключевого слова <b>static</b></p>
  <p>Эти методы недоступны из экземпляров класса</p>
  <p>Они могут быть вызваны только как методы класса</p>
  <words-counter></words-counter>
</article>
~~~

~~~~js
class WordsCounter extends HTMLElement {
  constructor () {
    super()
    const textContainer = this.parentNode
    const shadow = this.attachShadow({ mode: 'open' })

    const style = Object.assign(document.createElement('style'), {
      textContent: `
        span {
          background-color: #ddddee;
          display: inline-block;
          padding: 5px 10px;
          color: #578;
          border: "1px solid #578";
        }
        `
    })

    shadow.appendChild(style)

    function countWords (node) {
      const text = node.innerText || node.textContent
      return text.split(/\s+/g).length
    }

    const counterElem = Object.assign(document.createElement('span'), {
      textContent: `Words: ${countWords(textContainer)}`
    })

    shadow.appendChild(counterElem)

    setInterval(() => Object.assign(counterElem, {
      textContent: `Words: ${countWords(textContainer)}`
    }), 200)
  }
}
customElements.define('words-counter', WordsCounter)
~~~~
__________________________________________________

### ![ico-25 icon] {{s8.h1}}

~~~~js
class SampleCustomElement extends HTMLElement {
  constructor () {
    super ()

    const wrapper = Object.assign(document.createElement('div'), {
      className: 'wrapper'
    })

    this.canvas = wrapper
      .appendChild(Object.assign(document.createElement('canvas'), {
        self: this,
        history: [],
        onmousemove: function (event) {
          const point = { x: event.clientX, y: event.clientY }
          this.self.drawLine(point, { lineColor: '#f0f', lineWidth: 3 })
        }
      }))

    this.resizeCanvas()

    this.area = this.canvas.getContext('2d')

    this.shadow = this.attachShadow({ mode: 'open' })
    const style = Object.assign(document.createElement('style'), {
      textContent: `
        .wrapper {
          background-color: #ddddee;
        }
        canvas {
          border: dotted 1px #555;
        }
        `
    })

    this.shadow.appendChild(style)
    this.shadow.appendChild(wrapper)
  }

  resizeCanvas (event) {
    Object.assign(this.canvas, {
      width: window.innerWidth - 20,
      height: window.innerHeight - 20
    })
  }

  drawLine (point, border) {
    if (!point || !point.x || !point.y) return

    this.canvas.history.push(point)

    const len = this.canvas.history.length
    if (len < 2)  return

    const prev = this.canvas.history[len - 2]
    this.area.strokeStyle = border && border.lineColor
      ? border.lineColor
      : '#0000ff'

    this.area.lineWidth = border && border.lineWidth
      ? border.lineWidth
      : 3

    this.area.beginPath()
    this.area.moveTo(prev.x, prev.y)
    this.area.lineTo(point.x, point.y)
    this.area.stroke()
  }
}

customElements.define('sample-custom-element', SampleCustomElement)

const elem = document.body
  .appendChild(document.createElement('sample-custom-element'))

window.onresize = elem.resizeCanvas.bind(elem)
~~~~
