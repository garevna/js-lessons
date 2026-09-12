# ![ico-30 study] slot

## ![ico-25 icon]

{{s0.p1}}

{{s0.p2}}

### ![ico-25 cap] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

~~~html
<slot name="script">Default script</slot>
~~~

{{s1.p3}}

~~~javascript
const template = document.body.appendChild (
    document.createElement ( "template" )
)

template.innerHTML = `
    <style>
        .code { color: magenta; }
        .div { border: inset 1px; padding: 10px 20px; }
    </style>
    <div class="div">
        <p class="code"><slot name="script">Default script</slot></p>
    </div>
`
~~~

{{s1.p4}}

{{s1.p5}}

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

{{s1.p6}}

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

{{s1.p7}}

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

{{s1.p8}}

___________________________________________________________

{{s1.p9}}

~~~~js
const template = document.body
  .appendChild(document.createElement('template'))

template.innerHTML = `
  <style>
    .code { color: magenta; }
    .div { border: inset 1px; padding: 10px 20px; }
  </style>
  <div class="div">
    <p class="code">
      <slot name="script">
        Default script
      </slot>
    </p>
  </div>
`

customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})

const codeText = `function () { console.log('Hello!') }`

document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~~

_____________________________________________________________________

[![ico-25 cap] ** 2**](https://repl.it/@garevna/web-component)
