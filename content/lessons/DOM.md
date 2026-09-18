# ![ico-35 study] Document Object Model (DOM)

{{p1}}

{{p2}}

{{p3}}

{{p4}}
{{p5}}
{{p6}}

@@@@ 1
![](slogans/users-see-pixels.svg)
@@@@

{{p7}}
{{p8}}

{{p9}}
{{p10}}
{{p11}}
{{p12}}

^^^[{{p13}}]

{{p14}}
{{p15}}
{{p16}}

{{p17}}
{{p18}}

^^^
{{p19}}
{{p20}}
{{p21}}
{{p22}}
{{p23}}

{{p24}}

{{p25}}
{{p26}}

{{p27}}

☼☼☼ {{p28}} ☼☼☼

_________________________________________

## ![ico-30 icon] {{p29}}

{{p30}}

@@@@
{{p31}}
![](slogans/object-constructor.svg)
@@@@

☼☼☼ {{p32}} ☼☼☼

{{p33}}

◘◘ **showProto** ◘◘
~~~js
function showProto (elem) {
  var proto = elem.__proto__
  console.info(proto?.constructor.name || null)
  proto && showProto(proto)
}
~~~

{{p34}}

~~~js
showProto(document)
~~~

{{common.c4}}

◘◘^^~document~^^◘◘

~~~console
HTMLDocument
Document
Node
EventTarget
Object
~~~

{{p35}}

^^• **document.head**^^
^^• **document.body**^^

{{p36}}

~~~js
showProto(document.head)
~~~

{{p37}}

◘◘^^~document.head~^^◘◘
~~~console
HTMLHeadElement
HTMLElement
Element
Node
EventTarget
Object
~~~

{{p38}}

~~~js
showProto(document.body)
~~~

{{p39}}

◘◘^^~document.body~^^◘◘
~~~console
HTMLBodyElement
HTMLElement
Element
Node
EventTarget
Object
~~~

{{p40}}

@@@@ 1
![](illustrations/DOM-prototype-chain.svg)
@@@@

@@@@
{{p41}}
![](slogans/object-adam.svg)
@@@@

{{p42}}

{{p43}}

~~~js
new HTMLElement()
~~~

{{p44}}

~~~error
    Uncaught TypeError: Illegal constructor
~~~

{{p45}}
{{p46}}

{{p47}}
{{p48}}

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

{{p49}}

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

## ![ico-30 icon] {{p50}}

{{p51}}
{{p52}}

### ![ico-25 icon] HTMLElement

{{p53}}

~~~js
for (var prop in document) {
  document[prop] &&
    document[prop] instanceof HTMLElement &&
    console.log(`${prop}: HTMLElement`)
}
~~~

◘◘^^**HTMLElement**^^◘◘

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

### ![ico-25 icon] HTMLCollection vs NodeList

{{p54}}

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

◘◘^^**{{common.c1}}**^^◘◘
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

{{p55}}

◘◘![ico-25 coffee] **^^document.scripts^^**◘◘
~~~js
for (var script of document.scripts) {
  console.log(script.innerText)
}
~~~

◘◘![ico-25 coffee] **^^document.styleSheets^^**◘◘
~~~js
for (var sheet of document.styleSheets) {
  for (var rule of sheet.cssRules) {
    console.warn(rule.selectorText)
    console.info(rule.cssText)
  }
}
~~~

{{p56}}

◘◘![ico-25 coffee] **^^HTMLCollection / NodeList^^**◘◘
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

{{p57}}

{{p58}}

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

{{p59}}

~~~js
console.log(document.body.children)
~~~

{{p60}}

~~~console
▼ HTMLCollection(2) [section, p]
  ► 0: section
  ► 1: p
    length: 2
  ► [[Prototype]]: HTMLCollection
~~~

{{p61}}

~~~js
console.log(document.body.childNodes)
~~~

{{p62}}

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

### ![ico-25 icon] Strings

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

### ![ico-25 icon] Other objects

{{p63}}

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

◘◘^^**Result**^^◘◘
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

### ![ico-25 icon] Event handlers

{{p64}}
{{p65}}
{{p66}}
{{p67}}

{{p68}}
{{p69}}
{{p70}}

{{p71}}

~~~js
function getEventHandlers (hostObject) {
  for (const prop in hostObject) {
    !prop.indexOf('on') && console.log(prop)
  }
}

getEventHandlers(document)
~~~

{{p72}}

{{p73}}

{{p74}}

~~~js
document.body.onclick = console.log
~~~

{{p75}}

~~~js
document.onscroll = console.log
~~~

{{p76}}
{{p77}}

◘◘ **^^result^^** ◘◘

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

{{p78}}
{{p79}}

{{p80}}

____________________________________________

## ![ico-30 icon] Constructor Node

{{p81}}

{{p82}}

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

### ![ico-25 icon] {{p83}}

{{p84}}

{{p85}}

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

{{p86}}

{{p87}}

{{p88}}
{{p89}}

{{p90}}

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

### ![ico-25 icon] Node.prototype methods

{{p91}}
{{p92}}

~~~console
appendChild: ƒ appendChild()
removeChild: ƒ removeChild()
~~~

{{p93}}
{{p94}}

{{p95}}

{{p96}}

{{p97}}

~~~js
parent.appendChild(elem)
~~~

{{p98}}

{{p99}}

{{p100}}

◘◘^^**Elements**^^◘◘
~~~console
&lt;body>
  &lt;section>
    &lt;p>&lt;/p>
  &lt;/section>
  &lt;figure>
  &lt;/figure>
&lt;/body>
~~~

{{p101}}

{{common.c12}}

~~~js
figure.appendChild(paragraph)
~~~

{{p102}}

◘◘^^**Elements**^^◘◘
~~~console
&lt;body>
  &lt;section>&lt;/section>
  &lt;figure>
    &lt;p>&lt;/p>
  &lt;/figure>
&lt;/body>
~~~

{{p103}}

~~~js
parent.removeChild(elem)
~~~

{{p104}}
{{p105}}

____________________________________________

## ![ico-30 icon] {{p106}}

{{p107}}
{{p108}}
{{p109}}

{{p110}}

{{p111}}

◘◘ **^^getMethods^^** ◘◘

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

{{p112}}
{{p113}}

{{p114}}

~~~js
getMethods.call(HTMLDocument.prototype)
~~~

{{p115}}

{{p116}}

~~~js
getMethods.call(Document.prototype)
~~~

{{p117}}

### ![ico-25 icon] create

{{p118}}

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

{{p119}}
{{p120}}
{{p121}}

#### ![ico-20 icon] document.createElement

{{p122}}

{{p123}}
{{p124}}

◘◘![ico-25 coffee] **createElement**◘◘

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

#### ![ico-20 icon] document.createTextNode

{{p125}}

◘◘![ico-25 coffee] **createTextNode**◘◘

~~~js
var text = document.createTextNode('Text node')
console.log('Node type: ', text.nodeType)
console.log('Node value: ', text.nodeValue)
~~~

~~~console
Node type:  3
Node value:  Text node
~~~

{{p126}}
{{p127}}

◘◘![ico-20 coffee] **Insert styles to document.head**◘◘

~~~js
document.head
  .appendChild(document.createElement('style'))
  .appendChild(document.createTextNode('div { color: blue; }'))
~~~

◘◘![ico-20 coffee] **Insert script to page**◘◘

~~~js
var script = document.body
  .appendChild(document.createElement('script'))
script.appendChild(document.createTextNode(`alert('Hello')`))
~~~

____________________________________________

#### ![ico-20 icon] document.createComment

{{p128}}

~~~js
var comment = document.createComment('Some comment will be here.')
console.log(comment)
~~~

~~~console
&lt;!--Some text will be here.-->
~~~
____________________________________________

#### ![ico-20 icon] document.createDocumentFragment

◘◘^^function **addElem**^^◘◘
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

### ![ico-25 icon] {{p129}}

{{p130}}

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

{{p131}}
{{p132}}

{{p133}}

{{p134}}
{{p135}}
{{p136}}
{{p137}}

![ico-25 coffee] ** 1**

◘◘{{common.c17}}◘◘

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

◘◘^^JS^^◘◘

~~~js
document
  .getElementsByName('main')[0]
  .getElementsByTagName('section')[0]
  .getElementsByClassName('content')
~~~

◘◘^^{{common.c4}}^^◘◘

~~~console

▼ HTMLCollection(2) [div.content, figure.content]
  ► 0: div.content
  ► 1: figure.content
    length: 2
  ► __proto__: HTMLCollection
~~~

____________________________________________

![ico-25 coffee] ** 2**

{{p138}}

{{p139}}
{{topic.t1}}

~~~js
document.getElementsByClassName('screen-reader-text', 'visually-hidden')
~~~

{{p140}}

____________________________________________

#### ![ico-20 icon] append | remove

_________________________________________

{{p141}}
{{p142}}
{{p143}}
________________________________________

### ![ico-25 icon] {{p144}}

______________________________________

### ![ico-25 icon] element.querySelector

{{p145}}
{{p146}}

◘◘![ico-25 coffee] ** 3**◘◘

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

**{{common.c2}}**

~~~console
► section
► h3#demo
► figure.promoClass
► input
► div
~~~

______________________________________________

### ![ico-25 icon] element.querySelectorAll

{{p147}}

![ico-25 coffee] ** 4**

{{p148}}

◘◘js◘◘
~~~js
section.querySelectorAll('*')
~~~

◘◘{{common.c2}}◘◘
~~~console
▼ NodeList(2) [div, figure.promoClass]
  ► 0: div
  ► 1: figure.promoClass
    length: 2
  ► __proto__: NodeList
~~~

_________________________________________________

## ![ico-30 hw] {{common.c11}}

◘◘![ico-25 hw]** 1**◘◘
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ {{p149}} | {{p150}} | {{p151}}→→→

____________________________________________


◘◘![ico-25 hw]** 2**◘◘
~~~js
document.title = 'DOM'
~~~

→→→ {{p152}} | {{p153}} | {{p154}}→→→

_________________________________________________

◘◘![ico-25 hw]** 3**◘◘
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

→→→ {{p155}} | {{p156}} | {{p157}}→→→

_________________________________________

◘◘![ico-25 hw]** 4**◘◘

→→→ {{p158}} | {{p159}} | {{p160}}→→→

_________________________________________________

![ico-25 hw]** 5**

{{p161}}

~~~js
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

{{p162}}

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
~~~

→→→ {{p163}} | {{p164}} | {{p165}}→→→

_____________________________________________

![ico-25 hw]** 6**

{{p166}}

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

→→→ {{p167}} | {{p168}} | {{p169}}→→→

_____________________________________________

![ico-25 hw]** 7**

{{p170}}

~~~js
document.createElement('h3').innerHTML = 'Welcome'
document.createElement('p').innerHTML = 'to JS'
document.createElement('div')
  .style = 'padding: 48px; border-radius: 50%; border: solid 2px #f0f;'
~~~

→→→ {{p171}} | {{p172}} | {{p173}}→→→

_____________________________________________

![ico-25 hw]** 8**

{{p174}}

~~~js
var elems = ['h3', 'p', 'div'].map(tag => document.createElement(tag))

elems.forEach(elem => document.body.appendChild(elem))

elems[2].innerText = '<!-- Comment -->'

for (var elem of document.body.children) {
  for (var node of elem.childNodes) console.log(node.nodeType)
}
~~~

→→→ {{p175}} | {{p176}} | {{p177}}→→→

_____________________________________________

![ico-25 hw]** 9**

{{p178}}

~~~js
document.head.innerHTML = `<!-- Comment -->`
for (var node of document.head.childNodes) console.log(node.nodeType)
~~~

→→→ {{p179}} | {{p180}} | {{p181}}→→→

_____________________________________________

◘◘![ico-25 hw] **10**◘◘

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

→→→ {{p182}} | {{p183}} | {{p184}}→→→


___________________________________

{{p185}}

[![ico-20 link] **^^Document^^**](external/mdi-dom)
