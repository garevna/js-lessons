# ![ico-30 study] slot

## ![ico-25 icon]

Классная фича, которая позволяет динамически изменять контент элемента

![ico-20 warn] Поддержка в браузерах еще не полная, **Edge** пока догоняет вечнозеленые

### ![ico-25 cap] Пример с именованным слотом

Здесь все элементарно:

В шаблоне разметки мы вставим именованный слот:

~~~html
<slot name="script">Default script</slot>
~~~

Вставим шаблон со слотом в DOM:

~~~javascript
const template = document.body.appendChild (
    document.createElement ( "template" )
)

template.innerHTML = `
    <style>
        .code { color: magenta; }
        .div { border: inset 1px; padding: 10px 20px; }
    </style>
    <div class="div">
        <p class="code"><slot name="script">Default script</slot></p>
    </div>
`
~~~

Теперь можно динамически изменять текст внутри слота

Давайте для начала создадим кастомный элемент **~sample-element~** с этим шаблоном разметки:

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

Создадим переменную **_~codeText~_**, в которой будем хранить текст для вставки:

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

Теперь можно вставлять кастомный элемент на страницу с заданным контентом:

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

Вот и все!

___________________________________________________________

Полный код сниппета:

~~~~js
const template = document.body
  .appendChild(document.createElement('template'))

template.innerHTML = `
  <style>
    .code { color: magenta; }
    .div { border: inset 1px; padding: 10px 20px; }
  </style>
  <div class="div">
    <p class="code">
      <slot name="script">
        Default script
      </slot>
    </p>
  </div>
`

customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})

const codeText = `function () { console.log('Hello!') }`

document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~~

_____________________________________________________________________

[![ico-25 cap] ** 2**](https://repl.it/@garevna/web-component)
