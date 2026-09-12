# ![ico-30 study] {{s1.h1}}

## ![ico-25 icon]

{{s2.p1}}

{{s2.p2}}

### ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~html
<slot name="script">Default script</slot>
~~~

{{s3.p3}}

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

{{s3.p4}}

{{s3.p5}}

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

{{s3.p6}}

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

{{s3.p7}}

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

{{s3.p8}}

___________________________________________________________

{{s3.p9}}

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

{{s3.p10}}
