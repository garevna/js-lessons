# ![ico-30 study] {{s1.h1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

_____________________

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

### ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

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

{{s3.p2}}

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

{{s3.p3}}

{{s3.p4}}
{{s3.p5}}

{{s3.p6}}

~~~js
insertCustomElements()
defineCustomElement()
~~~

{{s3.p7}}

{{s3.p8}}

~~~javascript
defineCustomElement()
insertCustomElements()
~~~

{{s3.p9}}

{{s3.p10}}

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

{{s3.p11}}

{{s3.p12}}

_____________________________________

### ![ico-25 cap] {{s4.h1}}

{{s4.p1}}


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

{{s4.p2}}

{{s4.p3}}
{{s4.p4}}

{{s4.p5}}

____________________________________________

{{s4.p6}}

{{s4.p7}}

~~~html
<body>
  <circle-element size="150" color="green"></circle-element>
  <circle-element size="100" color="orange"></circle-element>
  <circle-element size="50" color="blue"></circle-element>
</body>
~~~

{{s4.p8}}

{{s4.p9}}

{{s4.p10}}

{{s4.p11}}

~~~js
const collection = document.getElementsByTagName('circle-element')
for (const elem of collection) elem.setStyle()
~~~

_________________________

{{s4.p12}}

{{s4.p13}}

{{s4.p14}}
{{s4.p15}}

________________________________

### ![ico-25 cap] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

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

{{s5.p3}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{s5.p4}}

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

{{s5.p5}}

~~~js
customElements.whenDefined('circle-element')
  .then(() => elem.setStyle())
~~~

{{s5.p6}}

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

{{s5.p7}}

{{s5.p8}}

{{s5.p9}}

{{s5.p10}}

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

{{s5.p11}}

~~~js
elems.iterator = (async function * () {
  ...
}).call(elems)
~~~

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}

{{s5.p15}}

{{s5.p16}}
{{s5.p17}}

{{s5.p18}}

{{s5.p19}}

{{s5.p20}}
{{s5.p21}}
{{s5.p22}}

~~~js
const addElem = (size, color) => {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))
    elem.setAttribute('color', color)
    elem.setAttribute('size', size)
    return elem
}
~~~

{{s5.p23}}

{{s5.p24}}
{{s5.p25}}

~~~js
const promise = (size, color) => new Promise(resolve => setTimeout(() => resolve(addElem(size, color)), Math.round(Math.random() * 5000)))
~~~

{{s5.p26}}

{{s5.p27}}

~~~js
let len = this.length
while (len --> 0) {
  const elem = await promise(this[len].size, this[len].backColor)
  customElements.whenDefined('circle-element')
    .then(() => elem.setStyle())
  yield elem
}
~~~

{{s5.p28}}

{{s5.p29}}
{{s5.p30}}
{{s5.p31}}
{{s5.p32}}

{{s5.p33}}

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

{{s5.p34}}

~~~js
async function iterateElements () {
  for (const item of elems) await elems.iterator.next()
}

iterateElements ()
~~~

{{s5.p35}}

{{s5.p36}}
