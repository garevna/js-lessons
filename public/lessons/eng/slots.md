# ![ico-30 study] slot⟪slot⟫

## ![ico-25 icon]

A brilliant feature that allows you to dynamically change an element’s content

![ico-20 warn] Browser support is not yet complete; **Edge** is still catching up with the evergreen browsers

### ![ico-25 cap] An example using a named slot⟪An_example_using_a_named_slot⟫

It’s all very straightforward here:

In the markup template, we’ll insert a named slot:

~~~html
<slot name="script">Default script</slot>
~~~

Let’s insert the template with the slot into the DOM:

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

Now we can dynamically change the text inside the slot

To start with, let’s create a custom element **~sample-element~** using this markup template:

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

Let’s create a variable **_~codeText~_** to store the text to be inserted:

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

Now we can insert the custom element onto the page with the specified content:

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

That’s it!

___________________________________________________________

Full code snippet:

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
