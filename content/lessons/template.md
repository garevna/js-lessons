# ![ico-30 study] &lt;template>

_____________________________________________________________________________

{{p1}}

{{p2}}

{{p3}}

____________________________________________________________________________

## ![ico-25 icon] DocumentFragment

{{p4}}

{{p5}}

{{p6}}

{{p7}}

________________________________________________________________________________

### ![ico-25 cap] {{common.c0}} 1

{{p8}}

~~~html
<body>
    <template id="sample">
        <h3>Template header</h3>
        <p>Template text</p>
    </template>
</body>
~~~

{{p9}}

~~~html
▼ <template id="sample">
  ▼ #document-fragment
     <h3>Template header</h3>
     <p>Template text</p>
  </template>
~~~

________________________________________________________________________________

## ![ico-25 icon] content

{{p10}}


### ![ico-25 cap] {{common.c0}} 2

{{p11}}

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

{{p12}}

**content**

~~~javascript
const circle = document.querySelector('#svg')
console.dir(circle.content)
~~~

^^^[{{common.c1}}]

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
  ► [[Prototype]]: DocumentFragment
~~~

^^^

## ![ico-25 icon] {{p13}}

{{p14}}

~~~javascript
document.body.appendChild(circle.content)
~~~

{{p15}}

{{p16}}

~~~javascript
console.dir(circle.content)
~~~

{{p17}}

{{p18}}

{{p19}}

~~~javascript
document.body.appendChild(circle.content.cloneNode(true))
~~~

{{p20}}

_________________________________________________________________

### ![ico-25 cap] {{common.c0}} 3

{{p21}}

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

{{p22}}

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

{{p23}}

~~~html
<canvas-element></canvas-element>
~~~

_______________________________________________________________________

### ![ico-25 cap] {{common.c0}} 4

{{p24}}

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

{{p25}}

~~~javascript
document.body
  .appendChild(document.createElement('sample-element'))
~~~

{{p26}}
