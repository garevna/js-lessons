# ![ico-30 study] Custom elements

## ![ico-25 icon] lifecycle hooks

Кастомные элементы имеют жизненный цикл - от вставки на страницу до удаления из DOM
Этапы жизненного цикла - это события в жизни компонента
На каждое такое событие компонента можно повесить колбэк

### ![ico-20 icon] connectedCallback()

Срабатывает каждый раз при вставке кастомного элемента в DOM

### ![ico-20 icon] disconnectedCallback()

Срабатывает при удалении кастомного элемента
Самое удобное время для удаление прослушивателей событий

![ico-20 warn] не сработает при закрытии пользователем вкладки

В последнем случае лучше использовать событие ~window.onbeforeunload~

~~~js
window.onbeforeunload = function (event) {
  ...
  return '...'
}
~~~


### ![ico-20 icon] attributeChangedCallback()

Срабатывает каждый раз при изменении значений отслеживаемых html-атрибутов элемента

~~~js
attributeChangedCallback (attrName, oldVal, newVal) {
  ...
}
~~~

Атрибуты кастомного элемента - это удобный интефейс для его взаимодействия с внешним окружением

Изменяя значения атрибутов, можно извне влиять на состояние и поведение веб-компонента

Чтобы указать, какие html-атрибуты нужно отслеживать, используется геттер статического свойства **~observedAttributes~**

имена отслеживаемых атрибутов передаются массивом:

~~~js
static get observedAttributes () {
  return ['size', 'color']
}
~~~

Браузер вызывает **~attributeChangedCallback()~** при изменении значения любого атрибута, включенного в массив отслеживаемых атрибутов **_~observedAttributes~_**

#### ![ico-25 icon] Пример

~~~~js
class CircleElement extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(document.createElement('div'))
  }

  connectedCallback () {
    this.createStyle ()
  }

  static get observedAttributes () {
    return [ 'size', 'color']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    this.setStyle ()
  }

  createStyle () {
    this.shadowStyles = document.createElement('style')
    this.shadow.appendChild(this.shadowStyles)
    this.shadowStyles.appendChild(document.createTextNode(''))
  }

  setStyle () {
    this.shadowStyles.textContent = `
      div {
        width: ${this.getAttribute("size")}px;
        height: ${this.getAttribute("size")}px;
        border: inset 1px;
        border-radius: 50%;
        box-shadow: 3px 3px 5px #00000090;
        background-color: ${this.getAttribute("color")};
      }
      div:hover {
        box-shadow: inset 3px 3px 5px #00000090;
      }
    `
  }
}

customElements.define('circle-element', CircleElement)
~~~~

Благодаря хукам **~connectedCallback~** и **~attributeChangedCallback~** теперь абсолютно все равно, когда будут вставлены кастомные элементы на страницу

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))

    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

Но это не главное

Важный момент заключается в том, что при динамическом изменении значений атрибутов без хука **~attributeChangedCallback~** внешний вид кастомного элемента не изменится

Однако если такой хук есть в определении класса, то результатом выполнения кода

~~~js
document
  .getElementsByTagName('circle-element')
  .setAttribute('color', 'magenta')
~~~

будет изменение внешнего вида (цвета фона) элемента

Аналогично кастомный элемент отреагирует на изменение значения атрибута во вкладке **_Elements_**

______________________________________________

[![ico-25 cap] **Пример в песочнице**](https://repl.it/@garevna/customElements-lifecycle-hooks)
