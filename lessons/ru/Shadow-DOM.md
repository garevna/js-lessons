# ![ico-30 study] Shadow DOM

**Shadow DOM** - это суверенное дерево DOM-узлов элемента

^^До появления ~Shadow DOM~ инкапсуляция стилей элементов DOM была острой проблемой разработчиков^^
^^Однако с учетом поддержки Shadow DOM всеми основными браузерами эта проблема больше не существует^^

**~Shadow DOM API~**  обеспечивает возможность привязать **Shadow DOM** к отдельному элементу

## ![ico-20 icon] Термины

• _Shadow host_ - элемент DOM, к которому привязан shadow DOM
• _Shadow tree_ - дерево элементов DOM внутри shadow DOM>
• _Shadow boundary_ - граница между shadow DOM и обычным DOM
• _Shadow root_ - корневой элемент дерева shadow DOM

_____________________________________

Оперировать элементами shadow DOM можно точно так же, как и обычными DOM элементами:

• можно добавлять дочерние элементы или атрибуты настройки,
• стилизовать отдельные узлы с помощью ~element.style~ или
• применять стили ко всему дереву **~shadow DOM~** внутри элемента ~<style>~

Преимущество заключается в том, что содержимое **~shadow DOM~** инкапсулировано внутри него, и не может отразиться на поведении или стилях других элементов DOM

Кроме того, все свойства элемента, "спрятанные"  в  его **~shadow DOM~**, не могут быть случайно изменены извне

_______________________________________

## ![ico-25 icon] attachShadow()

Добавить элементу его собственный **~shadow DOM~** очень легко
Для этого существует метод **~attachShadow()~**
Метод  **~attachShadow()~**  принимает в качестве аргумента объект опций, который содержит единственную опцию **_~mode~_**
Опция  **_~mode~_**  может иметь значение  **_~'open'~_**  или  **_~'closed'~_**

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

Значение  **_~open~_**  означает, что ~shadow DOM~  данного элемента будет доступен в контексте страницы через его свойство **~shadowRoot~**

~~~html
▼ <div>
  ▼ #shadow-root(open)
    <img src="http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg">
    <style>img { width: 200px; }</style>
</div>
~~~

**Доступные свойства shadowRoot**

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

Значение  **_~closed~_**  делает shadow DOM  данного элемента недоступным для скриптов

При обращении к свойству shadowRoot  элемента  будет возвращено значение  ~null~

**Доступные свойства shadowRoot**

~~~js
console.dir(elem.shadowRoot) // null
~~~

___________________________________________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSdjCWOSAVFqZqcm4sy-q-KBFmd1i2BbfYQ0pcZaqYb9YZyv5w/viewform)
