# ![ico-35 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

{{s1.p7}}
![](images/users-see-pixels.svg)
{{s1.p8}}

{{s1.p9}}
{{s1.p10}}

{{s1.p11}}
{{s1.p12}}
{{s1.p13}}
{{s1.p14}}

{{s1.p15}}

{{s1.p16}}
{{s1.p17}}
{{s1.p18}}

{{s1.p19}}
{{s1.p20}}

{{s1.p21}}
{{s1.p22}}
{{s1.p23}}
{{s1.p24}}
{{s1.p25}}
{{s1.p26}}

{{s1.p27}}

{{s1.p28}}
{{s1.p29}}

{{s1.p30}}

☼☼☼ {{s1.slogan1}} ☼☼☼

_________________________________________

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
![](images/object-constructor.svg)
{{s2.p4}}

☼☼☼ {{s2.slogan1}} ☼☼☼

{{s2.p5}}

{{s2.p6}}
~~~js
function showProto (elem) {
  var proto = elem.__proto__
  console.info(proto?.constructor.name || null)
  proto && showProto(proto)
}
~~~

{{s2.p7}}

~~~js
showProto(document)
~~~

{{s2.p8}}

{{s2.p9}}

~~~console
HTMLDocument
Document
Node
EventTarget
Object
~~~

{{s2.p10}}

{{s2.p11}}
{{s2.p12}}

{{s2.p13}}

~~~js
showProto(document.head)
~~~

{{s2.p14}}

{{s2.p15}}
~~~console
HTMLHeadElement
HTMLElement
Element
Node
EventTarget
Object
~~~

{{s2.p16}}

~~~js
showProto(document.body)
~~~

{{s2.p17}}

{{s2.p18}}
~~~console
HTMLBodyElement
HTMLElement
Element
Node
EventTarget
Object
~~~

{{s2.p19}}

{{s2.p20}}
![](illustrations/DOM-prototype-chain.svg)
{{s2.p21}}

{{s2.p22}}
{{s2.p23}}
![](images/object-adam.svg)
{{s2.p24}}

{{s2.p25}}

{{s2.p26}}

~~~js
new HTMLElement()
~~~

{{s2.p27}}

~~~error
    Uncaught TypeError: Illegal constructor
~~~

{{s2.p28}}
{{s2.p29}}

{{s2.p30}}
{{s2.p31}}

~~~js
console.log(document)
~~~

~~~console
▼ #document (about:blank#)
  &lt;html>
    &lt;head>&lt;/head>
    &lt;body>&lt;/body>
  &lt;/html>
~~~

{{s2.p32}}

~~~js
console.dir(document)
~~~

~~~~console
▼ #document
  ► location: Location {ancestorOrigins: DOMStringList, href: 'about:blank#', origin: 'null', protocol: 'about:', host: '', …}
    URL: "about:blank#"
  ► activeElement: body
  ► adoptedStyleSheets: Proxy(Array) {}
    alinkColor: ""
  ► all: HTMLAllCollection(3) [html, head, body]
  ► anchors: HTMLCollection []
  ► applets: HTMLCollection []
    baseURI: "about:blank#"
    bgColor: ""
  ► body: body
    characterSet: "UTF-8"
    charset: "UTF-8"
    childElementCount: 1
  ► childNodes: NodeList [html]
  ► children: HTMLCollection [html]
    compatMode: "BackCompat"
    contentType: "text/html"
    cookie: (...)
    currentScript: null
  ► defaultView: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    designMode: "off"
    dir: ""
    doctype: null
  ► documentElement: html
    documentURI: "about:blank#"
    domain: ""
  ► embeds: HTMLCollection []
  ► featurePolicy: FeaturePolicy {}
    fgColor: ""
  ► firstChild: html
  ► firstElementChild: html
  ► fonts: FontFaceSet {onloading: null, onloadingdone: null, onloadingerror: null, ready: Promise, status: 'loaded', …}
  ► forms: HTMLCollection []
  ► fragmentDirective: FragmentDirective {}
    fullscreen: false
    fullscreenElement: null
    fullscreenEnabled: true
  ► head: head
    hidden: false
  ► images: HTMLCollection []
  ► implementation: DOMImplementation {}
    inputEncoding: "UTF-8"
    isConnected: true
  ► lastChild: html
  ► lastElementChild: html
    lastModified: "10/05/2024 11:42:37"
    linkColor: ""
  ► links: HTMLCollection []
    nextSibling: null
    nodeName: "#document"
    nodeType: 9
    nodeValue: null
    onabort: null
    onanimationend: null
    onanimationiteration: null
    onanimationstart: null
    onauxclick: null
    onbeforecopy: null
    onbeforecut: null
    onbeforeinput: null
    onbeforematch: null
    onbeforepaste: null
    onbeforetoggle: null
    onbeforexrselect: null
    onblur: null
    oncancel: null
    oncanplay: null
    oncanplaythrough: null
    onchange: null
    onclick: null
    onclose: null
    oncontentvisibilityautostatechange: null
    oncontextlost: null
    oncontextmenu: null
    oncontextrestored: null
    oncopy: null
    oncuechange: null
    oncut: null
    ondblclick: null
    ondrag: null
    ondragend: null
    ondragenter: null
    ondragleave: null
    ondragover: null
    ondragstart: null
    ondrop: null
    ondurationchange: null
    onemptied: null
    onended: null
    onerror: null
    onfocus: null
    onformdata: null
    onfreeze: null
    onfullscreenchange: null
    onfullscreenerror: null
    ongotpointercapture: null
    oninput: null
    oninvalid: null
    onkeydown: null
    onkeypress: null
    onkeyup: null
    onload: null
    onloadeddata: null
    onloadedmetadata: null
    onloadstart: null
    onlostpointercapture: null
    onmousedown: null
    onmouseenter: null
    onmouseleave: null
    onmousemove: null
    onmouseout: null
    onmouseover: null
    onmouseup: null
    onmousewheel: null
    onpaste: null
    onpause: null
    onplay: null
    onplaying: null
    onpointercancel: null
    onpointerdown: null
    onpointerenter: null
    onpointerleave: null
    onpointerlockchange: null
    onpointerlockerror: null
    onpointermove: null
    onpointerout: null
    onpointerover: null
    onpointerrawupdate: null
    onpointerup: null
    onprerenderingchange: null
    onprogress: null
    onratechange: null
    onreadystatechange: null
    onreset: null
    onresize: null
    onresume: null
    onscroll: null
    onscrollend: null
    onscrollsnapchange: null
    onscrollsnapchanging: null
    onsearch: null
    onsecuritypolicyviolation: null
    onseeked: null
    onseeking: null
    onselect: null
    onselectionchange: null
    onselectstart: null
    onslotchange: null
    onstalled: null
    onsubmit: null
    onsuspend: null
    ontimeupdate: null
    ontoggle: null
    ontransitioncancel: null
    ontransitionend: null
    ontransitionrun: null
    ontransitionstart: null
    onvisibilitychange: null
    onvolumechange: null
    onwaiting: null
    onwebkitanimationend: null
    onwebkitanimationiteration: null
    onwebkitanimationstart: null
    onwebkitfullscreenchange: null
    onwebkitfullscreenerror: null
    onwebkittransitionend: null
    onwheel: null
    ownerDocument: null
    parentElement: null
    parentNode: null
    pictureInPictureElement: null
    pictureInPictureEnabled: true
  ► plugins: HTMLCollection []
    pointerLockElement: null
    prerendering: false
    previousSibling: null
    readyState: "complete"
    referrer: ""
    rootElement: null
  ► scripts: HTMLCollection []
  ► scrollingElement: body
  ► styleSheets: StyleSheetList {length: 0}
    textContent: null
  ► timeline: DocumentTimeline {currentTime: 580619.35, duration: null}
    title: ""
    visibilityState: "visible"
    vlinkColor: ""
    wasDiscarded: false
    webkitCurrentFullScreenElement: null
    webkitFullscreenElement: null
    webkitFullscreenEnabled: true
    webkitHidden: false
    webkitIsFullScreen: false
    webkitVisibilityState: "visible"
    xmlEncoding: null
    xmlStandalone: false
    xmlVersion: null
  ► [[Prototype]]: HTMLDocument
~~~~
______________________

## ![ico-30 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

~~~js
for (var prop in document) {
  document[prop] &&
    document[prop] instanceof HTMLElement &&
    console.log(`${prop}: HTMLElement`)
}
~~~

{{s4.p2}}

~~~console
documentElement: HTMLElement
body: HTMLElement
head: HTMLElement
scrollingElement: HTMLElement
firstElementChild: HTMLElement
lastElementChild: HTMLElement
activeElement: HTMLElement
lastChild: HTMLElement
~~~

_______________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

~~~js
;['HTMLCollection', 'NodeList']
  .forEach(constructorName => {
    for (var prop in document) {
      document[prop] &&
        document[prop] instanceof window[constructorName] &&
        console.log(`${prop}: ${constructorName}`)
    }
  })
~~~

{{s5.p2}}
~~~console
images: HTMLCollection
embeds: HTMLCollection
plugins: HTMLCollection
links: HTMLCollection
forms: HTMLCollection
scripts: HTMLCollection
anchors: HTMLCollection
applets: HTMLCollection
children: HTMLCollection
childNodes: NodeList
~~~

{{s5.p3}}

{{s5.p4}}
~~~js
for (var script of document.scripts) {
  console.log(script.innerText)
}
~~~

{{s5.p5}}
~~~js
for (var sheet of document.styleSheets) {
  for (var rule of sheet.cssRules) {
    console.warn(rule.selectorText)
    console.info(rule.cssText)
  }
}
~~~

{{s5.p6}}

{{s5.p7}}
~~~js
function test (hostObject) {
  var res = {}
  for (var key in hostObject) {
    (hostObject[key] instanceof NodeList || hostObject[key] instanceof HTMLCollection) &&
    Object.assign(res, {
      [key]: hostObject[key].__proto__.constructor.name
    })
  }
  return res
}

console.log(test(document.body))
~~~

~~~console
▼ {children: 'HTMLCollection', childNodes: 'NodeList'}
  ► childNodes: "NodeList"
  ► children: "HTMLCollection"
  ► [[Prototype]]: Object
~~~

_____________________________________________

{{s5.p8}}

{{s5.p9}}

~~~html
&lt;html>
  &lt;head>&lt;/head>
  &lt;body>
    Hello!
    &lt;section>&lt;/section>
    &lt;p>Students&lt;/p>
    &lt;!-- Comment -->
  &lt;/body>
&lt;/html>
~~~

{{s5.p10}}

~~~js
console.log(document.body.children)
~~~

{{s5.p11}}

~~~console
▼ HTMLCollection(2) [section, p]
  ► 0: section
  ► 1: p
    length: 2
  ► [[Prototype]]: HTMLCollection
~~~

{{s5.p12}}

~~~js
console.log(document.body.childNodes)
~~~

{{s5.p13}}

~~~console
▼ NodeList(7) [text, section, text, p, text, comment, text]
  ► 0: text
  ► 1: section
  ► 2: text
  ► 3: p
  ► 4: text
  ► 5: comment
  ► 6: text
    length: 7
  ► [[Prototype]]: NodeList
~~~

______________________________________________________

### ![ico-25 icon] {{s6.h1}}

~~~js
function getStrings (hostObject) {
  var res = {}
  for (const prop in hostObject) {
    typeof hostObject[prop] === 'string' &&
      Object.assign(res, {
        [prop]: hostObject[prop].__proto__.constructor.name
      })
  }
  return res
}

console.log(getStrings(document))
~~~

~~~console
▼ {URL: 'String', documentURI: 'String', compatMode: 'String', characterSet: 'String', charset: 'String', …}
    URL: String
    alinkColor: String
    baseURI: String
    bgColor: String
    characterSet: String
    charset: String
    compatMode: String
    contentType: String
    cookie: String
    designMode: String
    dir: String
    documentURI: String
    domain: String
    fgColor: String
    inputEncoding: String
    lastModified: String
    linkColor: String
    nodeName: String
    readyState: String
    referrer: String
    title: String
    visibilityState: String
    vlinkColor: String
    webkitVisibilityState: String
  ► [[Prototype]]: Object
~~~

______________________________________________________

### ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

~~~js
function getObjects () {
  var res = {}
  for (var key in document) {
    !(document[key] instanceof NodeList ||
    document[key] instanceof HTMLCollection ||
    document[key] instanceof HTMLElement ||
    typeof document[key] === 'function') &&
    document[key] instanceof Object &&
    Object.assign(res, {
      [key]: document[key].__proto__.constructor.name
    })
  }
  return res
}

console.log(getObjects())
~~~

{{s7.p2}}
~~~console
▼ {location: 'Location', implementation: 'DOMImplementation', doctype: 'DocumentType', defaultView: 'Window', all: 'HTMLAllCollection', …}
  adoptedStyleSheets: "Array"
  all: "HTMLAllCollection"
  defaultView: "Window"
  doctype: "DocumentType"
  featurePolicy: "FeaturePolicy"
  firstChild: "DocumentType"
  fonts: "EventTarget"
  fragmentDirective: "FragmentDirective"
  implementation: "DOMImplementation"
  location: "Location"
  styleSheets: "StyleSheetList"
  timeline: "DocumentTimeline"
~~~

_________________________________________________

### ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}
{{s8.p4}}

{{s8.p5}}
{{s8.p6}}
{{s8.p7}}

{{s8.p8}}

~~~js
function getEventHandlers (hostObject) {
  for (const prop in hostObject) {
    !prop.indexOf('on') && console.log(prop)
  }
}

getEventHandlers(document)
~~~

{{s8.p9}}

{{s8.p10}}

{{s8.p11}}

~~~js
document.body.onclick = console.log
~~~

{{s8.p12}}

~~~js
document.onscroll = console.log
~~~

{{s8.p13}}
{{s8.p14}}

{{s8.p15}}

~~~console
▼ Event {isTrusted: true, type: 'scroll', target: document, currentTarget: document, eventPhase: 2, …}
    isTrusted: true
    bubbles: true
    cancelBubble: false
    cancelable: false
    composed: false
    currentTarget: null
    defaultPrevented: false
    eventPhase: 0
    returnValue: true
  ► srcElement: document
  ► target: document
    timeStamp: 249903.10000014305
    type: "scroll"
  ► [[Prototype]]: Event
~~~

{{s8.p16}}
{{s8.p17}}

{{s8.p18}}

____________________________________________

## ![ico-30 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

~~~js
console.dir(Node.prototype)
~~~

~~~~console
▼ Node
    ATTRIBUTE_NODE: 2
    CDATA_SECTION_NODE: 4
    COMMENT_NODE: 8
    DOCUMENT_FRAGMENT_NODE: 11
    DOCUMENT_NODE: 9
    DOCUMENT_POSITION_CONTAINED_BY: 16
    DOCUMENT_POSITION_CONTAINS: 8
    DOCUMENT_POSITION_DISCONNECTED: 1
    DOCUMENT_POSITION_FOLLOWING: 4
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
    DOCUMENT_POSITION_PRECEDING: 2
    DOCUMENT_TYPE_NODE: 10
    ELEMENT_NODE: 1
    ENTITY_NODE: 6
    ENTITY_REFERENCE_NODE: 5
    NOTATION_NODE: 12
    PROCESSING_INSTRUCTION_NODE: 7
    TEXT_NODE: 3
  ► appendChild: ƒ appendChild()
    baseURI: (...)
    childNodes: (...)
  ► cloneNode: ƒ cloneNode()
  ► compareDocumentPosition: ƒ compareDocumentPosition()
  ► contains: ƒ contains()
    firstChild: (...)
  ► getRootNode: ƒ getRootNode()
  ► hasChildNodes: ƒ hasChildNodes()
  ► insertBefore: ƒ insertBefore()
    isConnected: (...)
  ► isDefaultNamespace: ƒ isDefaultNamespace()
  ► isEqualNode: ƒ isEqualNode()
  ► isSameNode: ƒ isSameNode()
    lastChild: (...)
  ► lookupNamespaceURI: ƒ lookupNamespaceURI()
  ► lookupPrefix: ƒ lookupPrefix()
    nextSibling: (...)
    nodeName: (...)
    nodeType: (...)
    nodeValue: (...)
  ► normalize: ƒ normalize()
    ownerDocument: (...)
    parentElement: (...)
    parentNode: (...)
    previousSibling: (...)
  ► removeChild: ƒ removeChild()
  ► replaceChild: ƒ replaceChild()
    textContent: (...)
  ► constructor: ƒ Node()
    Symbol(Symbol.toStringTag): "Node"
  ► get baseURI: ƒ baseURI()
  ► get childNodes: ƒ childNodes()
  ► get firstChild: ƒ firstChild()
  ► get isConnected: ƒ isConnected()
  ► get lastChild: ƒ lastChild()
  ► get nextSibling: ƒ nextSibling()
  ► get nodeName: ƒ nodeName()
  ► get nodeType: ƒ nodeType()
  ► get nodeValue: ƒ nodeValue()
  ► set nodeValue: ƒ nodeValue()
  ► get ownerDocument: ƒ ownerDocument()
  ► get parentElement: ƒ parentElement()
  ► get parentNode: ƒ parentNode()
  ► get previousSibling: ƒ previousSibling()
  ► get textContent: ƒ textContent()
  ► set textContent: ƒ textContent()
  ► [[Prototype]]: EventTarget
~~~~

_________________________________________

### ![ico-25 icon] {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

~~~console
ATTRIBUTE&lowbar;NODE: 2
CDATA&lowbar;SECTION&lowbar;NODE: 4
COMMENT&lowbar;NODE: 8
DOCUMENT&lowbar;FRAGMENT&lowbar;NODE: 11
DOCUMENT&lowbar;NODE: 9
DOCUMENT&lowbar;TYPE&lowbar;NODE: 10
ELEMENT&lowbar;NODE: 1
PROCESSING&lowbar;INSTRUCTION&lowbar;NODE: 7
TEXT&lowbar;NODE: 3
~~~

{{s10.p3}}

{{s10.p4}}

{{s10.p5}}
{{s10.p6}}

{{s10.p7}}

~~~js
document.nodeType
~~~

~~~console
9
~~~

~~~js
document.body.nodeType
~~~

~~~console
1
~~~
_______________________________________

### ![ico-25 icon] {{s11.h1}}

{{s11.p1}}
{{s11.p2}}

~~~console
appendChild: ƒ appendChild()
removeChild: ƒ removeChild()
~~~

{{s11.p3}}
{{s11.p4}}

{{s11.p5}}

{{s11.p6}}

{{s11.p7}}

~~~js
parent.appendChild(elem)
~~~

{{s11.p8}}

{{s11.p9}}

{{s11.p10}}

{{s11.p11}}
~~~console
&lt;body>
  &lt;section>
    &lt;p>&lt;/p>
  &lt;/section>
  &lt;figure>
  &lt;/figure>
&lt;/body>
~~~

{{s11.p12}}

{{s11.p13}}

~~~js
figure.appendChild(paragraph)
~~~

{{s11.p14}}

{{s11.p15}}
~~~console
&lt;body>
  &lt;section>&lt;/section>
  &lt;figure>
    &lt;p>&lt;/p>
  &lt;/figure>
&lt;/body>
~~~

{{s11.p16}}

~~~js
parent.removeChild(elem)
~~~

{{s11.p17}}
{{s11.p18}}

____________________________________________

## ![ico-30 icon] {{s12.h1}}

{{s12.p1}}
{{s12.p2}}
{{s12.p3}}

{{s12.p4}}

{{s12.p5}}

{{s12.p6}}

~~~js
function getMethods (search) {
  const keys = Object.keys(this)
  const funcNames = keys
    .map(key => Object.getOwnPropertyDescriptor(this, key).value)
    .map((value, index) => typeof value === 'function' ? keys[index] : null)
    .filter(key => !!key && (search ? key.startsWith(search) : true))

  return funcNames
}
~~~

{{s12.p7}}
{{s12.p8}}

{{s12.p9}}

~~~js
getMethods.call(HTMLDocument.prototype)
~~~

{{s12.p10}}

{{s12.p11}}

~~~js
getMethods.call(Document.prototype)
~~~

{{s12.p12}}

### ![ico-25 icon] {{s13.h1}}

{{s13.p1}}

~~~js
getMethods.call(Document.prototype, 'create')
~~~

~~~~console
▼ (15) ['createAttribute', 'createAttributeNS', 'createCDATASection', 'createComment', 'createDocumentFragment', 'createElement', 'createElementNS', 'createEvent', 'createExpression', 'createNSResolver', 'createNodeIterator', 'createProcessingInstruction', 'createRange', 'createTextNode', 'createTreeWalker']
    0: "createAttribute"
    1: "createAttributeNS"
    2: "createCDATASection"
    3: "createComment"
    4: "createDocumentFragment"
    5: "createElement"
    6: "createElementNS"
    7: "createEvent"
    8: "createExpression"
    9: "createNSResolver"
    10: "createNodeIterator"
    11: "createProcessingInstruction"
    12: "createRange"
    13: "createTextNode"
    14: "createTreeWalker"
    length: 15
  ► [[Prototype]]: Array(0)
~~~~

{{s13.p2}}
{{s13.p3}}
{{s13.p4}}

#### ![ico-20 icon] {{s14.h1}}

{{s14.p1}}

{{s14.p2}}
{{s14.p3}}

{{s14.p4}}

~~~js
var div = document.createElement('div')
console.log(div)
console.log('Node type: ', div.nodeType)
console.log('Tag name: ', div.tagName)
~~~

~~~html
&lt;div>&lt;/div>
Node type:  1
Tag name:  DIV
~~~

____________________________________________

#### ![ico-20 icon] {{s15.h1}}

{{s15.p1}}

{{s15.p2}}

~~~js
var text = document.createTextNode('Text node')
console.log('Node type: ', text.nodeType)
console.log('Node value: ', text.nodeValue)
~~~

~~~console
Node type:  3
Node value:  Text node
~~~

{{s15.p3}}
{{s15.p4}}

{{s15.p5}}

~~~js
document.head
  .appendChild(document.createElement('style'))
  .appendChild(document.createTextNode('div { color: blue; }'))
~~~

{{s15.p6}}

~~~js
var script = document.body
  .appendChild(document.createElement('script'))
script.appendChild(document.createTextNode(`alert('Hello')`))
~~~

____________________________________________

#### ![ico-20 icon] {{s16.h1}}

{{s16.p1}}

~~~js
var comment = document.createComment('Some comment will be here.')
console.log(comment)
~~~

~~~console
&lt;!--Some text will be here.-->
~~~
____________________________________________

#### ![ico-20 icon] {{s17.h1}}

{{s17.p1}}
~~~js
function addElem (tagName = 'div', container = document.body) {
  return container.appendChild(document.createElement(tagName))
}
~~~

~~~js
var section = addElem('section')
var article = addElem('article')

var fragment = document.createDocumentFragment()
for (var item of ['name', 'hostory', 'speciality', 'hobby', 'city', 'job']) {
  addElem('p', fragment).textContent = item
}

section.appendChild(fragment)
console.log(section)
~~~

~~~console
&lt;section>
  &lt;p>name&lt;/p>
  &lt;p>hostory&lt;/p>
  &lt;p>speciality&lt;/p>
  &lt;p>hobby&lt;/p>
  &lt;p>city&lt;/p>
  &lt;p>job&lt;/p>
&lt;/section>
~~~
_____________________________________________

### ![ico-25 icon] {{s18.h1}}

{{s18.p1}}

~~~js
getMethods.call(Document.prototype, 'get')
~~~

~~~~console
▼ (7) ['getAnimations', 'getElementById', 'getElementsByClassName', 'getElementsByName', 'getElementsByTagName', 'getElementsByTagNameNS', 'getSelection']
    0: "getAnimations"
    1: "getElementById"
    2: "getElementsByClassName"
    3: "getElementsByName"
    4: "getElementsByTagName"
    5: "getElementsByTagNameNS"
    6: "getSelection"
    length: 7
  ► [[Prototype]]: Array(0)
~~~~

{{s18.p2}}
{{s18.p3}}

{{s18.p4}}

{{s18.p5}}
{{s18.p6}}
{{s18.p7}}
{{s18.p8}}

{{s18.p9}}

{{s18.p10}}

~~~html
&lt;body>
   &lt;main name="main">
      &lt;section>
         &lt;div class="content">&lt;/div>
         &lt;figure class="content">&lt;/figure>
      &lt;/section>
   &lt;/main>
&lt;/body>
~~~

{{s18.p11}}

~~~js
document
  .getElementsByName('main')[0]
  .getElementsByTagName('section')[0]
  .getElementsByClassName('content')
~~~

{{s18.p12}}

~~~console

▼ HTMLCollection(2) [div.content, figure.content]
  ► 0: div.content
  ► 1: figure.content
    length: 2
  ► __proto__: HTMLCollection
~~~

____________________________________________

{{s18.p13}}

{{s18.p14}}

{{s18.p15}}
{{s18.p16}}

~~~js
document.getElementsByClassName('screen-reader-text', 'visually-hidden')
~~~

{{s18.p17}}

____________________________________________

#### ![ico-20 icon] {{s19.h1}}

_________________________________________

{{s19.p1}}
{{s19.p2}}
{{s19.p3}}
________________________________________

### ![ico-25 icon] {{s20.h1}}

______________________________________

### ![ico-25 icon] {{s21.h1}}

{{s21.p1}}
{{s21.p2}}

{{s21.p3}}

~~~html
&lt;body>
  &lt;h3 id="demo">demo&lt;/h3>
  &lt;section>
    &lt;div title="figure">
      figure
    &lt;/div>
    &lt;figure class="promoClass">
      promoClass
    &lt;/figure>
  &lt;/section>

  &lt;input type="number" />
  &lt;input type="color" />
&lt;/body>
~~~

~~~js
var section = document.body.querySelector('section')
console.dir(section)
console.dir(document.querySelector('#demo'))
console.dir(section.querySelector('.promoClass'))
console.dir(document.body.querySelector('[type=\'number\']'))
console.dir(section.querySelector('[title]'))
~~~

{{s21.p4}}

~~~console
► section
► h3#demo
► figure.promoClass
► input
► div
~~~

______________________________________________

### ![ico-25 icon] {{s22.h1}}

{{s22.p1}}

{{s22.p2}}

{{s22.p3}}

{{s22.p4}}
~~~js
section.querySelectorAll('*')
~~~

{{s22.p5}}
~~~console
▼ NodeList(2) [div, figure.promoClass]
  ► 0: div
  ► 1: figure.promoClass
    length: 2
  ► __proto__: NodeList
~~~

_________________________________________________

## ![ico-30 hw] {{s23.h1}}

{{s23.p1}}
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ {{s23.quiz1}} | {{s23.quizVariants1}} | {{s23.quizAnswer1}}→→→

____________________________________________


{{s23.p2}}
~~~js
document.title = 'DOM'
~~~

→→→ {{s23.quiz2}} | {{s23.quizVariants2}} | {{s23.quizAnswer2}}→→→

_________________________________________________

{{s23.p3}}
~~~js
var paragraph = [
  'BOM',
  'DOM',
  'HTMLElement',
  'Browser Object Model'
]

for (var text of paragraph) {
  document.body
    .appendChild(document.createElement('p'))
    .innerHTML = text
}
~~~

→→→ {{s23.quiz3}} | {{s23.quizVariants3}} | {{s23.quizAnswer3}}→→→

_________________________________________

{{s23.p4}}

→→→ {{s23.quiz4}} | {{s23.quizVariants4}} | {{s23.quizAnswer4}}→→→

_________________________________________________

{{s23.p5}}

{{s23.p6}}

~~~js
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

{{s23.p7}}

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
~~~

→→→ {{s23.quiz5}} | {{s23.quizVariants5}} | {{s23.quizAnswer5}}→→→

_____________________________________________

{{s23.p8}}

{{s23.p9}}

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

→→→ {{s23.quiz6}} | {{s23.quizVariants6}} | {{s23.quizAnswer6}}→→→

_____________________________________________

{{s23.p10}}

{{s23.p11}}

~~~js
document.createElement('h3').innerHTML = 'Welcome'
document.createElement('p').innerHTML = 'to JS'
document.createElement('div')
  .style = 'padding: 48px; border-radius: 50%; border: solid 2px #f0f;'
~~~

→→→ {{s23.quiz7}} | {{s23.quizVariants7}} | {{s23.quizAnswer7}}→→→

_____________________________________________

{{s23.p12}}

{{s23.p13}}

~~~js
var elems = ['h3', 'p', 'div'].map(tag => document.createElement(tag))

elems.forEach(elem => document.body.appendChild(elem))

elems[2].innerText = '<!-- Comment -->'

for (var elem of document.body.children) {
  for (var node of elem.childNodes) console.log(node.nodeType)
}
~~~

→→→ {{s23.quiz8}} | {{s23.quizVariants8}} | {{s23.quizAnswer8}}→→→

_____________________________________________

{{s23.p14}}

{{s23.p15}}

~~~js
document.head.innerHTML = `<!-- Comment -->`
for (var node of document.head.childNodes) console.log(node.nodeType)
~~~

→→→ {{s23.quiz9}} | {{s23.quizVariants9}} | {{s23.quizAnswer9}}→→→

_____________________________________________

{{s23.p16}}

~~~js
function showProto (elem) {
  var proto = elem.__proto__
  var result = []
  while (proto) {
    result.push(proto.constructor.name)
    proto = proto.__proto__
  }
  return { [elem.tagName]: result }
}

var elems = ['p', 'img', 'a', 'div', 'input', 'style', 'script']

elems.forEach(function (elem) {
  console.log(showProto(document.createElement(elem)))
})
~~~

→→→ {{s23.quiz10}} | {{s23.quizVariants10}} | {{s23.quizAnswer10}}→→→


___________________________________

{{s23.p17}}

{{s23.p18}}
