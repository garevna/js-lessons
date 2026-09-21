# ![ico-30 study] slot⟪slot⟫

## ![ico-25 icon]

Класна фіча, яка дозволяє динамічно змінювати вміст елемента

![ico-20 warn] Підтримка в браузерах ще не повна, **Edge** поки що наздоганяє «вічнозелені»

### ![ico-25 cap] Приклад з іменованим слотом⟪An_example_using_a_named_slot⟫

Тут усе елементарно:

У шаблоні розмітки ми вставимо іменований слот:

~~~html
<slot name="script">Default script</slot>
~~~

Вставимо шаблон зі слотом у DOM:

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

Тепер можна динамічно змінювати текст усередині слота

Давайте для початку створимо кастомний елемент **~sample-element~** із цим шаблоном розмітки:

~~~js
customElements.define('sample-element', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
~~~

Створимо змінну **_~codeText~_**, у якій будемо зберігати текст для вставки:

~~~js
const codeText = `function sayHello () { console.log('Hello!') }`
~~~

Тепер можна вставляти користувацький елемент на сторінку із заданим контентом:

~~~js
document.body
  .appendChild(document.createElement('sample-element'))
  .appendChild((text => Object.assign(document.createElement('pre'), {
    slot: 'script',
    innerText: text
  }))(codeText))
~~~

Ось і все!

___________________________________________________________

Повний код сніпету:

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
