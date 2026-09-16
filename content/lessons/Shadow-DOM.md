# ![ico-30 study] Shadow DOM

{{s0.p1}}

{{s0.p2}}
{{s0.p3}}

{{s0.p4}}

## ![ico-20 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

_____________________________________

{{s1.p5}}

{{s1.p6}}
{{s1.p7}}
{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

_______________________________________

## ![ico-25 icon] attachShadow()

{{s1.p11}}
{{s1.p12}}
{{s1.p13}}
{{s1.p14}}

~~~js
const elem = document.createElement('div')
elem.attachShadow({ mode: 'open' })
~~~

____________________________________________

◘◘![ico-20 cap] ** 1 **◘◘

~~~js
const elem = document.body
  .appendChild(document.createElement('div'))

const shadow = elem.attachShadow({ mode: 'open' })

shadow.appendChild((() => Object.assign(document.createElement('script'), {
  innerText: 'console.log(\'HELLO!\')'
}))())

shadow.appendChild((() => Object.assign(document.createElement('img'), {
  src: 'http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg'
}))())

  shadow.appendChild((() => Object.assign(document.createElement('style'), {
    textContent: 'img { width: 200px; }'
  }))())
~~~


### ![ico-20 icon] mode: 'open'

{{s1.p15}}

~~~html
▼ <div>
  ▼ #shadow-root(open)
    <img src="http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg">
    <style>img { width: 200px; }</style>
</div>
~~~

{{s1.p16}}

~~~js
console.dir(elem.shadowRoot)
~~~

~~~~console
▼ #document-fragment
    activeElement: null
    baseURI: "about:blank"
    childElementCount: 2
  ► childNodes: NodeList(2) [img, style]
  ► children: HTMLCollection(2) [img, style]
    delegatesFocus: false
  ► firstChild: img
  ► firstElementChild: img
  ► host: div
    innerHTML: "<img src="http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg"><style>img { width: 200px; } </style>"
    isConnected: true
  ► lastChild: style
  ► lastElementChild: style
    mode: "open"
    nextSibling: null
    nodeName: "#document-fragment"
    nodeType: 11
    nodeValue: null
  ► ownerDocument: document
    parentElement: null
    parentNode: null
    pictureInPictureElement: null
    pointerLockElement: null
    previousSibling: null
  ► styleSheets: StyleSheetList {0: CSSStyleSheet, length: 1}
    textContent: "img { width: 200px; }"
  ► __proto__: ShadowRoot
~~~~

### ![ico-20 icon] mode: 'closed'

{{s1.p17}}

{{s1.p18}}

{{s1.p19}}

~~~js
console.dir(elem.shadowRoot) // null
~~~

___________________________________________________________

※※※exercises ⟦f13⟧※※※
