# ![ico-30 study] slot

## ![ico-25 icon]

{{p1}}

{{p2}}

### ![ico-25 cap] {{p3}}

{{p4}}

{{p5}}

~~~html
<slot name="script">Default script</slot>
~~~

{{p6}}

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

{{p7}}

{{p8}}

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

{{p9}}

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

{{p10}}

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

{{p11}}

___________________________________________________________

{{p12}}

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
