# ![ico-30 study] {{s1.h1}}

_____________________________________________________________________________

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

____________________________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

________________________________________________________________________________

### ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

~~~html
<body>
    <template id="sample">
        <h3>Template header</h3>
        <p>Template text</p>
    </template>
</body>
~~~

{{s3.p2}}

~~~html
▼ <template id="sample">
  ▼ #document-fragment
     <h3>Template header</h3>
     <p>Template text</p>
  </template>
~~~

________________________________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}


### ![ico-25 cap] {{s5.h1}}

{{s5.p1}}

~~~html
<template id="svg">
    <svg width="400" height="400">
        <circle cx="200" cy="200"
                r="100"
                fill="transparent"
                stroke="red"
                style="stroke-width:5">
        </circle>
    </svg>
</template>
~~~

{{s5.p2}}

{{s5.p3}}

~~~javascript
const circle = document.querySelector('#svg')
console.dir(circle.content)
~~~

^^^[{{s5.spoiler1}}]

~~~console
▼ #document-fragment
    baseURI: "about:blank"
    childElementCount: 2
  ► childNodes: NodeList(5) [text, h3, text, p, text]
  ► children: HTMLCollection(2) [h3, p]
  ► firstChild: text
  ► firstElementChild: h3
    isConnected: false
  ► lastChild: text
  ► lastElementChild: p
    nextSibling: null
    nodeName: "#document-fragment"
    nodeType: 11
    nodeValue: null
  ► ownerDocument: document
    parentElement: null
    parentNode: null
    previousSibling: null
    textContent: "↵        Template header↵        Template text↵    "
  ► __proto__: DocumentFragment
~~~

^^^

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

~~~javascript
document.body.appendChild(circle.content)
~~~

{{s6.p2}}

{{s6.p3}}

~~~javascript
console.dir(circle.content)
~~~

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

~~~javascript
document.body.appendChild(circle.content.cloneNode(true))
~~~

{{s6.p7}}

_________________________________________________________________

### ![ico-25 cap] {{s7.h1}}

{{s7.p1}}

~~~html
<template id="sample">
    <style>
        svg { border: dotted 1px; }
        circle { stroke-width:5; }
    </style>
    <svg width="400" height="400" id="svg">
        <circle cx="200" cy="200" r="100"
                id="circle"
                fill="transparent"
                stroke="red">
        </circle>
    </svg>
</template>
~~~

{{s7.p2}}

~~~javascript
class CanvasElement extends HTMLElement {
  constructor () {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    var sample = document.querySelector('#sample')
    shadow.appendChild(sample.content)
  }
}
customElements.define('canvas-element', CanvasElement)
~~~

{{s7.p3}}

~~~html
<canvas-element></canvas-element>
~~~

_______________________________________________________________________

### ![ico-25 cap] {{s8.h1}}

{{s8.p1}}

~~~~js
const template = document.body
  .appendChild(document.createElement('template'))

template.innerHTML = `
    <style>
        .red { color: red; }
        .div { width: 100px; height: 50px; border: solid 1px green; }
    </style>
    <div class="div"></div>
    <p class="red">Hello!</p>
`

customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~~

{{s8.p2}}

~~~javascript
document.body
  .appendChild(document.createElement('sample-element'))
~~~

{{s8.p3}}
