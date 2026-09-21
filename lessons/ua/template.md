# ![ico-30 study] &lt;template>⟪template_⟫

_____________________________________________________________________________

Елемент ~<template>~ призначений для зберігання шаблону розмітки

![ico-20 warn] **Він не відображається на сторінці**

![ico-20 warn] **Він аналізується браузером, тому має містити лише валідний код розмітки**

____________________________________________________________________________

## ![ico-25 icon] DocumentFragment⟪DocumentFragment⟫

це фрагмент документа, який не має батьківського елемента в дереві DOM

DocumentFragment містить DOM-елементи (nodes), як і об’єкт ~document~

Але оскільки фрагмент документа не є частиною структури DOM, він не відображається на сторінці

Це шаблон розмітки, який за потреби можна вставити в потрібний час у потрібному місці

________________________________________________________________________________

### ![ico-25 cap] Приклад 1⟪Example_1⟫

^^Відкриємо вкладку _Elements_ інструментів розробника та вставимо в елемент ~body~ такий код розмітки:^^

~~~html
<body>
    <template id="sample">
        <h3>Template header</h3>
        <p>Template text</p>
    </template>
</body>
~~~

^^При цьому на сторінці нічого не з’явиться, а ось у вкладці  **Elements**  ми побачимо таке зображення^^

~~~html
▼ <template id="sample">
  ▼ #document-fragment
     <h3>Template header</h3>
     <p>Template text</p>
  </template>
~~~

________________________________________________________________________________

## ![ico-25 icon] content⟪content⟫

Властивість  _**~content~**_  елемента  ~template~  містить код розмітки, що знаходиться  у контейнері ~<template>...</template>~


### ![ico-25 cap] Приклад 2⟪Example_2⟫

**Шаблон розмітки**

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

^^Виведемо в консоль властивість ~content~^^

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
  ► [[Prototype]]: DocumentFragment
~~~

^^^

## ![ico-25 icon] Вставка в DOM⟪Inserting_into_the_DOM⟫

^^Якщо виконати код:^^

~~~javascript
document.body.appendChild(circle.content)
~~~

^^то після вставки вмісту шаблону в DOM контейнер  ~<template id="svg"></template>~  буде порожнім^^

^^Це можна перевірити:^^

~~~javascript
console.dir(circle.content)
~~~

^^Властивість  **~childNodes~**  буде  **_~NodeList [ ]~_** (порожня колекція вузлів)^^

^^Властивість  **~children~**  буде  **_~HTMLCollection [ ]~_** (порожня колекція елементів)^^

![ico-20 warn] Для багаторазового використання шаблону розмітки потрібно використовувати метод ~cloneNode (true)~

~~~javascript
document.body.appendChild(circle.content.cloneNode(true))
~~~

![ico-20 warn] ~true~ вказує на глибоке копіювання, тобто всіх підвузлів дерева

_________________________________________________________________

### ![ico-25 cap] Приклад 3⟪Example_3⟫

**Шаблон розмітки**

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

**Клас**

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

**Вставка на сторінку**

~~~html
<canvas-element></canvas-element>
~~~

_______________________________________________________________________

### ![ico-25 cap] Приклад 4⟪Example_4⟫

^^А тепер давайте зробимо все на чистому JS:^^

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

^^Тепер ви можете вставляти на сторінку скільки завгодно разів:^^

~~~javascript
document.body
  .appendChild(document.createElement('sample-element'))
~~~

^^Дуже зручно, правда?^^ ![wink-25]
