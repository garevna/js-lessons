# ![ico-30 study] Custom elements

## ![ico-25 icon] .whenDefined()

{{s0.p1}}

{{s0.p2}}

_____________________

{{s0.p3}}

{{s0.p4}}

{{s0.p5}}

{{s0.p6}}

### ![ico-25 cap] {{s1.h1}}

{{s1.p1}}

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

{{s1.p2}}

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

{{s1.p3}}

• **~defineCustomElement~**
• **~insertCustomElements~**

{{s1.p4}}

~~~js
insertCustomElements()
defineCustomElement()
~~~

{{s1.p5}}

{{s1.p6}}

~~~javascript
defineCustomElement()
insertCustomElements()
~~~

{{s1.p7}}

{{s1.p8}}

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

{{s1.p9}}

{{s1.p10}}

_____________________________________

### ![ico-25 cap] {{s2.h1}}

{{s2.p1}}


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

{{s2.p2}}

{{s2.p3}}
{{s2.p4}}

{{s2.p5}}

____________________________________________

{{s2.p6}}

{{s2.p7}}

~~~html
<body>
  <circle-element size="150" color="green"></circle-element>
  <circle-element size="100" color="orange"></circle-element>
  <circle-element size="50" color="blue"></circle-element>
</body>
~~~

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

~~~js
const collection = document.getElementsByTagName('circle-element')
for (const elem of collection) elem.setStyle()
~~~

_________________________

{{s2.p12}}

{{s2.p13}}

{{s2.p14}}
{{s2.p15}}

________________________________

### ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

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

{{s3.p3}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{s3.p4}}

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

{{s3.p5}}

~~~js
customElements.whenDefined('circle-element')
  .then(() => elem.setStyle())
~~~

{{s3.p6}}

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

{{s3.p7}}

{{s3.p8}}

{{s3.p9}}

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

{{s3.p10}}

~~~js
elems.iterator = (async function * () {
  ...
}).call(elems)
~~~

{{s3.p11}}

{{s3.p12}}

{{s3.p13}}

{{s3.p14}}

• addElem
• promise

{{s3.p15}}

{{s3.p16}}

{{s3.p17}}
{{s3.p18}}
{{s3.p19}}

~~~js
const addElem = (size, color) => {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', color)
    elem.setAttribute('size', size)
    return elem
}
~~~

{{s3.p20}}

{{s3.p21}}
{{s3.p22}}

~~~js
const promise = (size, color) => new Promise(resolve => setTimeout(() => resolve(addElem(size, color)), Math.round(Math.random() * 5000)))
~~~

{{s3.p23}}

{{s3.p24}}

~~~js
let len = this.length
while (len --> 0) {
  const elem = await promise(this[len].size, this[len].backColor)
  customElements.whenDefined('circle-element')
    .then(() => elem.setStyle())
  yield elem
}
~~~

{{s3.p25}}

{{s3.p26}}
{{s3.p27}}
{{s3.p28}}
{{s3.p29}}

{{s3.p30}}

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

{{s3.p31}}

~~~js
async function iterateElements () {
  for (const item of elems) await elems.iterator.next()
}

iterateElements ()
~~~

{{s3.p32}}

{{s3.p33}}
