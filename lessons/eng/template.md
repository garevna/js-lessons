# ![ico-30 study] &lt;template>⟪template_⟫

_____________________________________________________________________________

The ~<template>~ element is intended to store a markup template

![ico-20 warn] **It is not displayed on the page**

![ico-20 warn] **It is parsed by the browser, so it must contain only valid markup code**

____________________________________________________________________________

## ![ico-25 icon] DocumentFragment⟪DocumentFragment⟫

This is a document fragment that has no parent in the DOM tree

A DocumentFragment contains DOM elements (nodes), just like the ~document~ object

However, as a document fragment is not part of the DOM structure, it is not displayed on the page

This is a markup template which, if necessary, can be inserted at the right time and in the right place

________________________________________________________________________________

### ![ico-25 cap] Example 1⟪Example_1⟫

^^Let’s open the _Elements_ tab in the developer tools and insert the following markup code into the ~body~ element:^^

~~~html
<body>
    <template id="sample">
        <h3>Template header</h3>
        <p>Template text</p>
    </template>
</body>
~~~

^^Nothing will appear on the page, but in the **Elements** tab we will see the following image^^

~~~html
▼ <template id="sample">
  ▼ #document-fragment
     <h3>Template header</h3>
     <p>Template text</p>
  </template>
~~~

________________________________________________________________________________

## ![ico-25 icon] content⟪content⟫

The _**~content~**_ property of the ~template~ element contains the markup code located within the ~<template>...</template>~ container


### ![ico-25 cap] Example 2⟪Example_2⟫

**Markup template**

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

^^Let’s log the ~content~ property to the console^^

**content**

~~~javascript
const circle = document.querySelector('#svg')
console.dir(circle.content)
~~~

^^^[Result:]

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

## ![ico-25 icon] Inserting into the DOM⟪Inserting_into_the_DOM⟫

^^If we run the code:^^

~~~javascript
document.body.appendChild(circle.content)
~~~

^^then, after the template’s content has been inserted into the DOM, the container  ~<template id="svg"></template>~  will be empty^^

^^You can check this:^^

~~~javascript
console.dir(circle.content)
~~~

^^The property  **~childNodes~**  will be  **_~NodeList [ ]~_** (an empty collection of nodes)^^

^^The property  **~children~**  will be  **_~HTMLCollection [ ]~_** (an empty collection of elements)^^

![ico-20 warn] To reuse the markup template, you need to use the ~cloneNode (true)~ method

~~~javascript
document.body.appendChild(circle.content.cloneNode(true))
~~~

![ico-20 warn] ~true~ indicates a deep copy, i.e. all subnodes of the tree

_________________________________________________________________

### ![ico-25 cap] Example 3⟪Example_3⟫

**Markup template**

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

**Class**

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

**Insert into page**

~~~html
<canvas-element></canvas-element>
~~~

_______________________________________________________________________

### ![ico-25 cap] Example 4⟪Example_4⟫

^^Now let’s do it all in pure JS:^^

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

^^Now you can insert it into the page as many times as you like:^^

~~~javascript
document.body
  .appendChild(document.createElement('sample-element'))
~~~

^^It’s incredibly handy, isn’t it?^^ ![wink-25]
