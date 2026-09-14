# ![ico-35 study] Document Object Model (DOM)

Давате разберемся, что же стоит за словами "**Объектная модель документа**".

Первое: документ. Что это такое?

Вряд ли вы хотите погрузиться в дебри того, что из себя представляет документ для браузера.

Для юзера браузер отрисовывает страницу, превращая в пиксели всю разметку, картинки, кнопки и т.д.
Именно пиксели видит юзер, открывая вкладку браузера.
Т.е. содержимое документа юзер видит как пиксели на экране монитора, из которых складывается изображение страницы.

@@@@ 1
![](images/users-see-pixels.svg)
@@@@

Для верстальщика документ - это тег **~&lt;html>~** со всем его содержимым.
^^Верстальщик представляет себе, как браузер распарсит его разметку и стили, и как будет выглядеть страница, когда браузер отрисует пиксели на экране.^^

Что же такое документ для девелопера?
Т.е. мы говорим не о том, чем на самом деле является документ и все элементы, которые в нем содержатся.
Мы говорим о модели, которую создает для нас браузер.
О такой модели, которую может "воспринимать" **JS**, и с которой он сможет взаимодействовать.

^^^[Модель]

^^Представьте себе, что вы купили своему ребенку (или себе) маленькую модель полицейской машины.^^
^^Конечно, это далеко не оригинал, но у нее тоже крутятся колеса и открываются дверцы.^^
^^Однако эта модель не влияет на исходную машину. Т.е. когда вы крутите колеса или открываете дверцы модели, с оригинальной машиной ничего подобного не происходит.^^

^^В случае объектной модели браузера или объектной модели документа все гораздо прикольнее.^^
^^**То, что вы делаете с моделью, будет происходить с оригиналом**.^^

^^^
**JS** может оперировать ограниченным набором типов данных, которые мы уже изучили.
И, конечно, наиболее универсальным типом является **объект**.
Объект обладает свойствами и методами, большую часть которых он "наследует" от своих "создателей" (конструкторов в цепочке прототипов объекта).
Каждый объект является **экземпляром**, созданным конкретным конструктором (который, в свою очередь, является объектом, а потому тоже является экземпляром, созданным конструктором).
Цепочка прототипов экземпляра всегда заканчивается конструктором **~Object~**, который мы называем "Адам", поскольку это единственный объект, у которого нет конструктора, которым он был создан.

Для нас браузер создает модель документа в виде объекта **~document~**.

Через свойства и методы объекта **~document~** мы получаем доступ к возможностям браузера.
Так браузер обеспечивает нам своеобразный **API** (Application Programming Interface) для доступа к его (браузера) сервисам, функционалу.

Итак, объектная модель - это модель в виде объекта того, что на самом деле является чем-то гораздо более сложным, и с чем мы просто не смогли бы взаимодействовать, если бы не созданная для нас упрощенная модель.

☼☼☼ Юзер видит пиксели, верстальщик - теги, а дев - объекты ☼☼☼

_________________________________________

## ![ico-30 icon] Цепочка прототипов

Каждый объект является экземпляром, созданным каким-то конструктором.

@@@@
<br>Поскольку все элементы DOM и сам **~document~** являются для нас объектами, очевидно, что у них есть конструкторы, которыми эти объекты были созданы.<br>^^Скажем больше: ввиду сложности этих объектов там явно "поработал" не один конструктор, и стоит изучить цепочку прототипов различных хост-объектов, чтобы понимать, от какого общего корня они происходят, и в чем их "генеалогические древа" расходятся.^^
![](images/object-constructor.svg)
@@@@

☼☼☼ Видишь объект - ищи конструктор ☼☼☼

Воспользуемся рекурсивной функцией ~showProto~:

◘◘ **showProto** ◘◘
~~~js
function showProto (elem) {
  var proto = elem.__proto__
  console.info(proto?.constructor.name || null)
  proto && showProto(proto)
}
~~~

для получения цепочки прототипов объекта **~document~**:

~~~js
showProto(document)
~~~

Результат:

◘◘^^~document~^^◘◘

~~~console
HTMLDocument
Document
Node
EventTarget
Object
~~~

Объект **~document~** включает две структурные части:

^^• **document.head**^^
^^• **document.body**^^

Если применить функцию **_^^showProto^^_** к **~document.head~**:

~~~js
showProto(document.head)
~~~

то мы получим такую цепочку протипов:

◘◘^^~document.head~^^◘◘
~~~console
HTMLHeadElement
HTMLElement
Element
Node
EventTarget
Object
~~~

Применим функцию **_showProto_** к **~document.body~**:

~~~js
showProto(document.body)
~~~

цепочка протипов будет такой:

◘◘^^~document.body~^^◘◘
~~~console
HTMLBodyElement
HTMLElement
Element
Node
EventTarget
Object
~~~

Итак, сравним цепочки прототипов:

@@@@ 1
![](illustrations/DOM-prototype-chain.svg)
@@@@

@@@@
и обнаружим, что:<br><br>![ico-20 warn] При движении вглубь по цепочке прототипов в самом конце мы всегда обнаруживаем **Object**.<br>![ico-20 warn] У каждого элемента DOM в цепочке прототипов мы находим конструкторы **EventTarget** и **Node**.<br>![ico-20 warn] И мы обнаружили, что все html-элементы наследуют от конструктора **HTMLElement**.
![](images/object-adam.svg)
@@@@

Эти объекты (**~document~**, **~document.head~**, **~document.body~**) **не** являются для нас нативными ("родными"), поскольку созданы внешними конструкторами, большинство из которых мы даже не можем вызвать с ключевым словом **~new~**.

Например, попробуйте выполнить такой код:

~~~js
new HTMLElement()
~~~

и вы увидите в консоли сообщение:

~~~error
    Uncaught TypeError: Illegal constructor
~~~

Поэтому мы их будем называть **хост-объекты** (host-объекты), т.е. объекты внешней среды (host), в которой функционирует наш скрипт.
Для нас они как "инопланетяне", которых мы видим как объекты, но которые, по своей истинной сути, объектами не являются.

В консоли браузера этих "инопланетян" (элементы DOM) мы будем видеть по-разному в зависимости от того, используем ли мы **~console.log~** или **~console.dir~**.
Если мы воспользуемся методом **~console.log~**, то мы увидим их в консоли такими же, какими мы видим их во вкладке **Elements** консоли браузера.

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

**~console.dir~** будет показывать их нам как объекты, т.е. отображать нам модель, созданную браузером специально для нас.

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

## ![ico-30 icon] Свойства объекта document

Разберем содержимое объекта **~document~** "по косточкам".
![ico-20 warn] ^^Для этого нужно открыть любую страницу, потому что далее мы будем итерировать свойства объекта **~document~**, а у него есть свойство **~cookie~**, которое недоступно на пустой странице (~about:blank~).^^

### ![ico-25 icon] HTMLElement

"Вытянем" из объекта **~document~** все свойства, являющиеся экземплярами конструктора **HTMLElement**:

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

Теперь посмотрим, какие свойства документа являются ссылками на экземпляры конструкторов **HTMLCollection** и **NodeList**:

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

◘◘^^**Результат**^^◘◘
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

Откройте любую страницу и в консоли открытой вкладки выполните код:

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

Экземпляры конструкторов **HTMLCollection** и **NodeList** являются итерабельными объектами, в первом случае элементами итерабельного объекта класса **HTMLCollection** являются html-элементы, а во втором - узлы дерева DOM.

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

![ico-30 coffee] Чтобы понять главное отличие **HTMLCollection** от **NodeList**, рассмотрим пример.

Пусть во вкладке **Elements** консоли браузера у нас такая картинка:

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

После выполнения такого кода:

~~~js
console.log(document.body.children)
~~~

мы увидим в консоли **HTMLCollection**:

~~~console
▼ HTMLCollection(2) [section, p]
  ► 0: section
  ► 1: p
    length: 2
  ► [[Prototype]]: HTMLCollection
~~~

А после выполнения кода:

~~~js
console.log(document.body.childNodes)
~~~

мы увидим в консоли **NodeList**:

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

С помощью функции **~getObjects~** найдем в объекте **~document~** все свойства, являющиеся объектами, но не являющихся экземплярами конструкторов **HTMLElement**, **HTMLCollection** и **NodeList**, а так же не являющихся методами объекта **~document~**:

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

Главное отличие хост-объектов от нативных объектов JS заключается в способности реагировать на события.
Не трудно догадаться, что такая способность обеспечивается конструктором **EventTarget**, название которого говорит само за себя.
Оно означает, что объект, созданный этим конструктором, является целью, или "мишенью" для событий.
Иными словами, в жизни этого объекта могут происходить события, и у него заложена способность реагировать на эти события.

^^На самом деле реагировать на события будет браузер, и весь механизм "передачи" этих событий хост-объектам осуществляется в нашей хост-среде, или глобальном объекте - браузере.^^
У хост-объектов предусмотрены для этого специальные свойства, имена которых начинаются с приставки "**~on~**"
^^(по умолчанию значениями этих свойств будет ~null~).^^

Получить список таких свойств вы можете, запустив в консоли любой страницы код:

~~~js
function getEventHandlers (hostObject) {
  for (const prop in hostObject) {
    !prop.indexOf('on') && console.log(prop)
  }
}

getEventHandlers(document)
~~~

Чуть позже мы будем подробнее изучать события, но сейчас нам достаточно понять, что любой хост-объект в своей цепочке прототипов имеет конструктор **EventTarget**, что обеспечивает его способность реагировать на события, и имеет перечень стандартных событий, доступ к которым для нас обеспечивает набор свойств, начинающихся с приставки "**~on~**".

Если откинуть приставку **~on~**, то останется **тип события** хост-объекта.

Если мы хотим, чтобы при наступлении события из списка запускалась какая-то функция, нужно ссылку на эту функцию сделать значением соответствующего свойства:

~~~js
document.body.onclick = console.log
~~~

^^Например, поместите в свойство **~onscroll~** объекта ~document~ ссылку на функцию **~console.log~**:^^

~~~js
document.onscroll = console.log
~~~

и прокрутите страницу.
В результате вы увидите в консоли объект события, который получила функция **~console.log~** в качестве аргумента при вызове:

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

Так браузер обеспечивает нам доступ к событиям, позволяя каждому событию назначать функцию, которая будет вызвана при наступлении этого события.
И, как мы убедились, эта функция при вызове получит ссылку на объект события в качестве агрумента.

Как видите, **даже события браузер моделирует для нас как объекты**.

____________________________________________

## ![ico-30 icon] Constructor Node

Этот конструктор принимает участие в создании всех объектов DOM, включая объект **~document~**.

Это означает, что свойства и методы, которые есть в его объекте **~prototype~**, "наследуются" экземплярами, т.е. объектами DOM.

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

### ![ico-25 icon] Типы узлов дерева DOM

Первое, что мы видим в прототайпе конструктора **~Node~** - это перечень констант.

Обратим внимание на следующие константы:

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

^^Константы **ENTITY&lowbar;REFERENCE&lowbar;NODE**, **ENTITY&lowbar;NODE** and **NOTATION&lowbar;NODE** устарели и больше не используются, поэтому мы не показываем их в этом списке.^^

Это **типы узлов дерева DOM**.

Элементы DOM имеют тип **ELEMENT&lowbar;NODE** с числовым значением 1.
Как мы видим, есть также узлы комментариев (**COMMENT&lowbar;NODE**), текстовые узлы (**TEXT&lowbar;NODE**), узлы атрибутов (**ATTRIBUTE&lowbar;NODE**) и т.д.

Все узлы дерева DOM имеют свойство **~nodeType~** с числовым значением.

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

Как уже было сказано ранее, эти методы наследуют **все элементы DOM**, включая само объект **~document~**.
В данный момент нас интересуют два метода:

~~~console
appendChild: ƒ appendChild()
removeChild: ƒ removeChild()
~~~

Из названия методов понятно, что каждый элемент DOM может добавлять или удалять своих потомков.
Главное - иметь ссылку на потомка, который будет добавлен или удален.

Оба метода возвращают **ссылку** на добавленного/удаленного потомка.

Предположим, что в переменной **~parent~** находится ссылка на родительский элемент, а в переменной **~elem~** - ссылка на элемент, который мы хотим вставить в контейнер **~parent~**.

Тогда после выполнения кода:

~~~js
parent.appendChild(elem)
~~~

элемент **~elem~** окажется внутри элемента **~parent~**.

Если **~elem~** был потомком другого родителя, то после выполнения этого кода он будет перемещен.

Например, пусть во вкладке **~Elements~** консоли мы видим такую картину:

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

при этом в переменной **~figure~** у нас есть ссылка на элемент **~&lt;figure>~**, в переменной **~section~** - ссылка на элемент **~&lt;section>~**, а в переменной **~paragraph~** - ссылка на элемент **~&lt;p>~**.

После выполнения кода:

~~~js
figure.appendChild(paragraph)
~~~

наша разметка (в) будет выглядеть уже иначе:

◘◘^^**Elements**^^◘◘
~~~console
&lt;body>
  &lt;section>&lt;/section>
  &lt;figure>
    &lt;p>&lt;/p>
  &lt;/figure>
&lt;/body>
~~~

Предположим, что в переменной **~parent~** находится ссылка на родительский элемент, а впеременной **~elem~** - ссылка на потомка элемента **~parent~**.

~~~js
parent.removeChild(elem)
~~~

При удалении потомка удаляемый элемент будет доступен до тех пор, пока "жива" ссылка на него (переменная **~elem~**).
Это означает, что вы сможете в любой удобный момент вставить этот элемент туда, куда вам нужно.

____________________________________________

## ![ico-30 icon] Методы объекта document

Есть вещи, которые может делать только объект **~document~**.
Не трудно догадаться, где искать эти методы.
Какой конструктор есть в цепочке прототипов объекта **~document~**, и которого нет в цепочке прототипов других объектов DOM?

А их у нас целых два, это конструкторы **~HTMLDocument~** и **~Document~**.

Объявим функцию **~getMethods~**, которую нужно вызывать в контексте объекта, имена методов которого мы ходим получить:

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

Обратите внимание, что мы заложили возможность фильтровать список методов, поскольку он обещает быть довольно длинным.
Фильтруя список методов, мы сможем разбить его на группы по назначению методов.

Заглянем в прототайп конструктора **~HTMLDocument~** и поищем там только функции (т.е. методы):

~~~js
getMethods.call(HTMLDocument.prototype)
~~~

Мы получим пустой массив. Действительно, загляните самостоятельно в **~HTMLDocument.prototype~** и убедитесь, что там только свойства.

Ищем дальше. Теперь заглянем в прототайп конструктора **~Document~**:

~~~js
getMethods.call(Document.prototype)
~~~

Здесь мы уже видим внушительный список методов, и самое время включить фильтр.

### ![ico-25 icon] create

Посмотрим, что наш хост-объект **~document~** умеет создавать:

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

По списку методов, начинающихся со слова **create**, мы можем судить о том, какие возможности предоставляет нам баузер по динамическому добавлению новых объектов в DOM.
![ico-25 warn] Это еще не означает, что созданные объекты будут вставлены на страницу.
Для добавления узлов дерева DOM на страницу мы будем использовать метод **~appendChild~**, который у всех объектов DOM, поскольку унаследован от конструктора **Node**.

#### ![ico-20 icon] document.createElement

Создает элемент DOM и возвращает ссылку на него.

Аргументом метода является строка, содержащая имя тега html-элемента (^^регистр не имеет значения^^).
Если переданная строка не соответствует никакому тегу в спецификации языка html, то созданный элемент будет иметь класс **~HTMLUnknownElement~**.

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

Этот метод создает текстовый узел и возвращает ссылку на него.

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

Если этот узел вставить в тело документа, то текст будет отображен на странице, но, как вы понимаете, без какого-либо форматирования.
Поэтому вставка текстовых узлов не используется непосредственно для вывода какого-либо текста юзеру, но может применяться для других целей.

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

Этот метод создает узел комментария и возвращает ссылку на него.

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

### ![ico-25 icon] Методы поиска элементов

Посмотрим, что можно получить с помощью хост-объекта **~document~**:

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

Как мы видим, здесь представлены методы поиска элементов DOM по значениям аттрибутов или имени тега.
Методы **~getAnimations~** и **~getSelection~** мы пока затрагивать не будем.

Для поиска элементов на странице у объекта **~document~** есть несколько методов:

| ![ico-20 pin] | **document.getElementById**         | ^^Возвращает ссылку на элемент, найденный по его атрибуту **id**.^^ |
| ![ico-20 pin] | **document.getElementsByTagName**   | ^^Возвращает коллекцию html-элементов (итерабельный объект класса **~HTMLCollection~**) по имени тега.^^ |
| ![ico-20 pin] | **document.getElementsByClassName** | ^^Возвращает коллекцию html-элементов (итерабельный объект класса **~HTMLCollection~**) по имени класса.^^ |
| ![ico-20 pin] | **document.getElementsByName**      | ^^Возвращает коллекцию html-элементов (итерабельный объект класса **~HTMLCollection~**) по значению аттрибута **~name~**.^^ |

![ico-25 coffee] ** 1**

◘◘Разметка◘◘

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

◘◘^^Результат:^^◘◘

~~~console

▼ HTMLCollection(2) [div.content, figure.content]
  ► 0: div.content
  ► 1: figure.content
    length: 2
  ► __proto__: HTMLCollection
~~~

____________________________________________

![ico-25 coffee] ** 2**

Перейдите [**ссылке**](external/css-trics-checked )

Откройте консоль новой вкладки.
Выполните код в консоли:

~~~js
document.getElementsByClassName('screen-reader-text', 'visually-hidden')
~~~

Получив один раз ссылку на объект класса **HTMLCollection**, вы можете рассчитывать на то, что этот объект будет отображать актуальное состояние страницы, т.е. любые изменения в документе (удаление или добавление элементов) будут отображаться в вашем объекте класса **HTMLCollection**.

____________________________________________

#### ![ico-20 icon] append | remove

_________________________________________

Как видите, мы нашли конструктор, который обеспечивает объект **~document~** методами. И достаточно щедро.
Однако не все эти методы рекомендуется использовать.
Проверьте их сначала на [**MDN**](https://developer.mozilla.org/en-US/docs/Web/API/Document ).
________________________________________

### ![ico-25 icon] Методы поиска элементов

______________________________________

### ![ico-25 icon] element.querySelector

^^Возвращает первый найденный элемент по указанному CSS-селектору^^
^^Поиск осуществляется в пределах элемента, в контексте которого вызван метод (~element~)^^

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

**Результат в консоли:**

~~~console
► section
► h3#demo
► figure.promoClass
► input
► div
~~~

______________________________________________

### ![ico-25 icon] element.querySelectorAll

Возвращает итерабельный объект класса **~NodeList~**, содержащий все элементы, соответствующие указанному селектору.

![ico-25 coffee] ** 4**

Вернемся к предыдущему примеру и выполним следующий код:

◘◘js◘◘
~~~js
section.querySelectorAll('*')
~~~

◘◘Результат в консоли:◘◘
~~~console
▼ NodeList(2) [div, figure.promoClass]
  ► 0: div
  ► 1: figure.promoClass
    length: 2
  ► __proto__: NodeList
~~~

_________________________________________________

## ![ico-30 hw] Тесты

◘◘![ico-25 hw]** 1**◘◘
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ Какой элемент появится в DOM? | p, div, 'будет сгенерировано исключение' | p→→→

____________________________________________


◘◘![ico-25 hw]** 2**◘◘
~~~js
document.title = 'DOM'
~~~

→→→ Что изменится после выполнения скрипта? | 'ничего', 'текст на странице', 'надпись на вкладке' | надпись на вкладке→→→

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

→→→ Сколько элементов будет добавлено на страницу? | 0, 3, 1, 4 | 4→→→

_________________________________________

◘◘![ico-25 hw]** 4**◘◘

→→→ Какой тип данных у свойства innerHTML элемента DOM? | 'boolean', 'undefined', 'string', 'function', 'number', 'object' | string→→→

_________________________________________________

![ico-25 hw]** 5**

В консоли пустой страницы (about:blank) был выполнен код:

~~~js
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

А затем выполнена следующая строчка кода:

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
~~~

→→→ Сколько элементов находятся в теле документа? | 0, 1, 2, 3 | 1→→→

_____________________________________________

![ico-25 hw]** 6**

В консоли пустой страницы (about:blank) был выполнен код:

~~~js
document.write('<h3 style="color: #09b">Hello!</h3>')
var paragraph = document.body
  .appendChild(document.createElement('p'))
paragraph.appendChild(document.createElement('span'))
~~~

→→→ Сколько элементов находятся в теле документа? | 0, 1, 2, 3 | 2→→→

_____________________________________________

![ico-25 hw]** 7**

В консоли пустой страницы (about:blank) был выполнен код:

~~~js
document.createElement('h3').innerHTML = 'Welcome'
document.createElement('p').innerHTML = 'to JS'
document.createElement('div')
  .style = 'padding: 48px; border-radius: 50%; border: solid 2px #f0f;'
~~~

→→→ Сколько элементов появится в теле документа? | 0, 1, 2, 3 | 0→→→

_____________________________________________

![ico-25 hw]** 8**

В консоли пустой страницы (about:blank) был выполнен код:

~~~js
var elems = ['h3', 'p', 'div'].map(tag => document.createElement(tag))

elems.forEach(elem => document.body.appendChild(elem))

elems[2].innerText = '<!-- Comment -->'

for (var elem of document.body.children) {
  for (var node of elem.childNodes) console.log(node.nodeType)
}
~~~

→→→ Что появится в консоли? | 1, 2, 3, 8, 9 | 3→→→

_____________________________________________

![ico-25 hw]** 9**

В консоли пустой страницы (about:blank) был выполнен код:

~~~js
document.head.innerHTML = `<!-- Comment -->`
for (var node of document.head.childNodes) console.log(node.nodeType)
~~~

→→→ Что появится в консоли? | 1, 2, 3, 8, 9 | 8→→→

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

→→→ Что итерирует функция showProto? | 'массив html-элементов', 'свойства html-элемента', 'цепочку прототипов html-элемента' | цепочку прототипов html-элемента→→→


___________________________________

[![ico-20 link] **^^Типы узлов дерева DOM^^**](external/w3-node-types)

[![ico-20 link] **^^Document^^**](external/mdi-dom)
