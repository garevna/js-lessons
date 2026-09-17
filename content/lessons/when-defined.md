# ![ico-30 study] Custom elements

## ![ico-25 icon] .whenDefined()

{{p1}}

{{p2}}

_____________________

{{p3}}

{{p4}}

{{p5}}

{{p6}}

### ![ico-25 cap] {{common.c0}} 1

{{p7}}

~~~js
function defineCustomElement () {
  class SampleElement extends HTMLElement {
    constructor () {
      super()
      this.style.color = this.getAttribute('color')
    }
  }

  customElements.define('sample-element', SampleElement)
}
~~~

{{p8}}

~~~js
finction insertCustomElements () {
  for (const clr of ['red', 'green', 'blue']) {
    const elem = document.body
      .appendChild(document.createElement('sample-element'))
    elem.innerHTML = '<h3>test</h3>'
    elem.setAttribute('color', clr)
  }
}
~~~

{{p9}}

• **~defineCustomElement~**
• **~insertCustomElements~**

{{p10}}

~~~js
insertCustomElements()
defineCustomElement()
~~~

{{p11}}

{{p12}}

~~~javascript
defineCustomElement()
insertCustomElements()
~~~

{{p13}}

{{p14}}

~~~js
function defineCustomElement () {
  class SampleElement extends HTMLElement {
    constructor () {
      super()
      const shadow = this.attachShadow({ mode: 'closed' })
      this.elem = shadow
        .appendChild(document.createElement('h3'))
      this.elem.innerText = 'test'
    }

    setStyle () {
      this.elem.style.color = this.getAttribute('color')
    }
  }

  customElements.define('sample-element', SampleElement)
}

function insertCustomElements () {
  for (const clr of ['red', 'green', 'blue']) {
    const elem = document.body
      .appendChild(document.createElement('sample-element'))
    elem.setAttribute('color', clr)

    customElements.whenDefined('sample-element')
      .then(() => elem.setStyle())
  }
}

defineCustomElement()
insertCustomElements()
~~~

{{p15}}

{{p16}}

_____________________________________

### ![ico-25 cap] {{common.c0}} 2

{{p17}}


~~~~js
class CircleElement extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(document.createElement('div'))
    this.shadowStyle = document.createElement('style')
    this.shadow.appendChild(this.shadowStyle)
    this.shadowStyle.textContent = ''
    this.setStyle()
  }

  setStyle () {
    this.shadowStyle.textContent = `
      div {
        width: ${ this.getAttribute('size') }px;
        height: ${ this.getAttribute('size') }px;
        border: inset 1px;
        border-radius: 50%;
        box-shadow: 3px 3px 5px #00000090;
        background-color: ${ this.getAttribute('color') };
      }
      div:hover {
        box-shadow: inset 3px 3px 5px #00000090;
      }
    `
  }
}

customElements.define('circle-element', CircleElement)
~~~~

{{p18}}

{{p19}}
{{p20}}

{{p21}}

____________________________________________

{{p22}}

{{p23}}

~~~html
<body>
  <circle-element size="150" color="green"></circle-element>
  <circle-element size="100" color="orange"></circle-element>
  <circle-element size="50" color="blue"></circle-element>
</body>
~~~

{{p24}}

{{p25}}

{{p26}}

{{p27}}

~~~js
const collection = document.getElementsByTagName('circle-element')
for (const elem of collection) elem.setStyle()
~~~

_________________________

{{p28}}

{{p29}}

{{p30}}
{{p31}}

________________________________

### ![ico-25 cap] {{common.c0}} 3

{{p32}}

{{p33}}

~~~js
class CircleElement extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow ( { mode: 'open' } )
    this.shadow.appendChild(document.createElement('div'))
    this.createStyle()
    this.setStyle()
  }
  ...
}

customElements.define ( "circle-element", CircleElement )
~~~

{{p34}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{p35}}

~~~console
▼ #shadow-root (open)
  <div></div>
  <style>
    div {
      width: nullpx;
      height: nullpx;
      border: inset 1px;
      border-radius: 50%;
      box-shadow: 3px 3px 5px #00000090;
      background-color: null;
    }
    div:hover {
      box-shadow: inset 3px 3px 5px #00000090;
    }
  </style>
~~~

{{p36}}

~~~js
customElements.whenDefined('circle-element')
  .then(() => elem.setStyle())
~~~

{{p37}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
  elem.setAttribute('color', x)
  elem.setAttribute('size', Math.round(Math.random() * 200))

  customElements.whenDefined('circle-element')
    .then(() => elem.setStyle())
}
~~~

___________________________________

[![ico-25 cap]](https://garevna.github.io/js-samples/#22)

{{p38}}

{{p39}}

{{p40}}

~~~js
const elems = [
  {
    size: Math.round(Math.random() * 200),
    backColor: 'red'
  },
  {
    size: Math.round(Math.random() * 200),
    backColor: 'orange'
  },
  {
    size: Math.round(Math.random() * 200),
    backColor: 'yellow'
  },
  {
    size: Math.round(Math.random() * 200),
    backColor: 'green'
  },
  {
    size: Math.round(Math.random() * 200),
    backColor: 'blue'
  }
]
~~~

{{p41}}

~~~js
elems.iterator = (async function * () {
  ...
}).call(elems)
~~~

{{p42}}

{{p43}}

{{p44}}

{{p45}}

• addElem
• promise

{{p46}}

{{p47}}

{{p48}}
{{p49}}
{{p50}}

~~~js
const addElem = (size, color) => {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', color)
    elem.setAttribute('size', size)
    return elem
}
~~~

{{p51}}

{{p52}}
{{p53}}

~~~js
const promise = (size, color) => new Promise(resolve => setTimeout(() => resolve(addElem(size, color)), Math.round(Math.random() * 5000)))
~~~

{{p54}}

{{p55}}

~~~js
let len = this.length
while (len --> 0) {
  const elem = await promise(this[len].size, this[len].backColor)
  customElements.whenDefined('circle-element')
    .then(() => elem.setStyle())
  yield elem
}
~~~

{{p56}}

{{p57}}
{{p58}}
{{p59}}
{{p60}}

{{p61}}

~~~js
elems.iterator = (async function * () {
  const addElem = (size, color) => {
    const elem = document.body
      .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', color)
    elem.setAttribute('size', size)

    return elem
  }

  const promise = (size, color) => new Promise(resolve => setTimeout(() => resolve(addElem(size, color)), Math.round(Math.random() * 5000)))

  let len = this.length
  while (len --> 0) {
    const elem = await promise(this[len].size, this[len].backColor)
    customElements.whenDefined('circle-element')
      .then(() => elem.setStyle())
    yield elem
  }
}).call(elems)
~~~

{{p62}}

~~~js
async function iterateElements () {
  for (const item of elems) await elems.iterator.next()
}

iterateElements ()
~~~

{{p63}}

{{p64}}
