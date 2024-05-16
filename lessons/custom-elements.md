# ![ico-30 study] Custom elements

Создание кастомных элементов DOM
![ico-20 warn] Имена кастомных тегов обязательно должны состоять минимум из двух частей, разделенных дефисом, например:

~~~html
<speaking-club></speaking-club>
<gold-prize></gold-prize>
<mystery-man></mystery-man>
~~~

## ![ico-25 icon] HTMLUnknownElement

Если просто вставить на страницу тег с отфанарным именем:

~~~html
<protuberance></protuberance>
~~~

то свойство ~__proto__~ такого элемента будет  **_~HTMLUnknownElement~_**

~~~js
console.dir(document.querySelector('protuberance').__proto__)
~~~

~~~console
► HTMLUnknownElement
~~~

А вот прототипом **_~HTMLUnknownElement~_** будет уже известный нам **~HTMLElement~**

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

Поэтому элемент _protuberance_ унаследует все свойства и методы, которые мы обнаружим в свойстве ~prototype~ конструктора _HTMLElement_

^^Однако никаких "специфических" свойств и методов у этого элемента не будет, что полностью нивелирует "ценность" подобного творения^^

![ico-20 warn] При создании класса пользовательских элементов в качестве родительского класса (**super**) можно  использовать HTMLElement
Тогда создаваемый нами элемент будет наследовать свойства и методы родительского класса _HTMLElement.prototype_

## ![ico-25 icon] customElements

Свойство **~customElements~** (_read-only_) глобального объекта ~Window~ содержит ссылку на объект **~CustomElementRegistry~**

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

Можно посмотреть, чьим "наследником" является **~customElements~**

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

Мы будем использовать **~CustomElementRegistry~** для регистрации собственных (кастомных) элементов, а так же для получения информации об уже зарегистрированных элементах

______________________________________________

## ![ico-25 icon] customElements.define ()

Метод  **~define()~** глобального объекта **customElements** имеет два обязательных параметра:

• первый - это имя тега для регистрируемого элемента
• второй - ссылка на класс создаваемого элемента

~~~js
customElements.define('sample-custom-element', SampleCustomElement)
~~~

_______________________________________

### ![ico-25 icon] Пример 1

^^Объявим класс **SampleElement**, расширяющий класс HTMLElement^^

~~~~javascript
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

^^Зарегистрируем новый элемент класса _SampleElement_^^

~~~js
customElements.define('sample-element', SampleElement)
~~~

^^Проверим, был ли зарегистрирован наш элемент в ~CustomElementRegistry~^^

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

^^Вставим новый элемент на страницу^^

~~~javascript
const elem = document.body
  .appendChild(document.createElement('sample-element'))
~~~

________________________________________________

### ![ico-25 icon] Пример 2

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

### ![ico-25 icon] Пример 3

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

### ![ico-25 icon] Пример 4

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
