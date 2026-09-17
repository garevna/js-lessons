# ![ico-30 study] Shadow DOM

{{p1}}

{{p2}}
{{p3}}

{{p4}}

## ![ico-20 icon] {{p5}}

{{p6}}
{{p7}}
{{p8}}
{{p9}}

_____________________________________

{{p10}}

{{p11}}
{{p12}}
{{p13}}

{{p14}}

{{p15}}

_______________________________________

## ![ico-25 icon] attachShadow()

{{p16}}
{{p17}}
{{p18}}
{{p19}}

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

{{p20}}

~~~html
▼ <div>
  ▼ #shadow-root(open)
    <img src="http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg">
    <style>img { width: 200px; }</style>
</div>
~~~

{{p21}}

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

{{p22}}

{{p23}}

{{p24}}

~~~js
console.dir(elem.shadowRoot) // null
~~~

___________________________________________________________

※※※exercises ⟦f13⟧※※※
