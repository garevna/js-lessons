# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}

{{s1.p4}}

## ![ico-20 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}
{{s2.p4}}

_____________________________________

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

_______________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}
{{s3.p4}}

~~~js
const elem = document.createElement('div')
elem.attachShadow({ mode: 'open' })
~~~

____________________________________________

{{s3.p5}}

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


### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

~~~html
▼ <div>
  ▼ #shadow-root(open)
    <img src="http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg">
    <style>img { width: 200px; }</style>
</div>
~~~

{{s4.p2}}

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

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

~~~js
console.dir(elem.shadowRoot) // null
~~~

___________________________________________________________

{{s5.p4}}
