# ![ico-30 study] &lt;template>

_____________________________________________________________________________

Элемент ~<template>~ предназначен для хранения шаблона разметки

![ico-20 warn] **Он не отображается на странице**

![ico-20 warn] **Он парсится браузером, поэтому должен содержать только валидный код разметки**

____________________________________________________________________________

## ![ico-25 icon] DocumentFragment

это фрагмент документа, у которого нет родителя в дереве DOM

DocumentFragment содержит DOM-элементы ( nodes ), как и объект ~document~

Но поскольку фрагмент документа не является частью структуры DOM, он не отображается на странице

Это шаблон разметки, который при необходимости может быть вставлен в нужное время в нужном месте

________________________________________________________________________________

### ![ico-25 cap] Пример 1

^^Откроем вкладку _Elements_ инструментов разработчика и вставим в элемент ~body~ следующий код разметки:^^

~~~html
<body>
    <template id="sample">
        <h3>Template header</h3>
        <p>Template text</p>
    </template>
</body>
~~~

^^При этом на странице ничего не появится, а вот во вкладке  **Elements**  мы увидим следующую картинку^^

~~~html
▼ <template id="sample">
  ▼ #document-fragment
     <h3>Template header</h3>
     <p>Template text</p>
  </template>
~~~

________________________________________________________________________________

## ![ico-25 icon] content

Свойство  _**~content~**_  элемента  ~template~  содержит код разметки, находящийся  в контейнере ~<template>...</template>~


### ![ico-25 cap] Пример 2

**Шаблон разметки**

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

^^Выведем в консоль свойство ~content~^^

**content**

~~~javascript
const circle = document.querySelector('#svg')
console.dir(circle.content)
~~~

^^^[Результат]

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

## ![ico-25 icon] Вставка в DOM

^^Если выполнить код:^^

~~~javascript
document.body.appendChild(circle.content)
~~~

^^то после вставки в DOM содержимого шаблона контейнер  ~<template id="svg"></template>~  будет пустым^^

^^Можно проверить это:^^

~~~javascript
console.dir(circle.content)
~~~

^^Свойство  **~childNodes~**  будет  **_~NodeList [ ]~_** (пустая коллекция узлов)^^

^^Свойство  **~children~**  будет  **_~HTMLCollection [ ]~_** (пустая коллекция элементов)^^

![ico-20 warn] Для многоразового использования шаблона разметки нужно использовать метод ~cloneNode (true)~

~~~javascript
document.body.appendChild(circle.content.cloneNode(true))
~~~

![ico-20 warn] ~true~ указывает на глубокое копирование, т.е. всех подузлов дерева

_________________________________________________________________

### ![ico-25 cap] Пример 3

**Шаблон разметки**

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

**Класс**

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

**Вставка на страницу**

~~~html
<canvas-element></canvas-element>
~~~

_______________________________________________________________________

### ![ico-25 cap] Пример 4

^^Теперь давайте все сделаем на чистом JS:^^

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

^^Теперь вы можете сколько угодно раз вставить на страницу:^^

~~~javascript
document.body
  .appendChild(document.createElement('sample-element'))
~~~

^^Жутко удобно, правда ?^^ ![wink-25]
