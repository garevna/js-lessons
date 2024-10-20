# ![ico-35 study] Document Object Model (DOM)

## ![ico-30 icon] Методы объектов DOM

Вот тут и начинается самое прикольное: открывая и закрывая дверцы модели машинки, мы будем заставлять браузер открывать и закрывать дверцы оригинала.

Это и есть браузерный **API** для доступа к тому, что браузер отображает на странице.

Понятное дело, дверцы тут ни при чем. Речь идет о том, что умеет делать браузер, и что из этого его функционала становится доступно нам посредством объектной модели.

Это методы как самого объекта **~document~**, так и всех **элементов DOM**.

### ![ico-25 icon] appendChild()

Добавляет элементу дочерний элемент.

◘◘![ico-25 cap] ** 1**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">&lt/div>
&lt/body>
~~~

~~~js
var section = document.createElement('section')
section.innerHTML = 'Hello'
document
  .querySelector('#demo')
  .appendChild (section)
~~~

◘◘Результат◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection>Hello&lt/section>
  &lt/div>
&lt/body>
~~~

_______________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var style = document.createElement('style')
document.head.appendChild(style)
style.textContent = `p { color: red; }`

style.sheet.cssRules[0]          // объект
style.sheet.cssRules[0].cssText  // "p { color: red; }"

style
  .appendChild(document.createTextNode(`div { color: blue; }`))
~~~

◘◘Результат◘◘

~~~html
&lthead>
  &ltstyle>
    p { color: red; }
    div { color: blue; }
  &lt/style>
&lt/head>
~~~

_______________________________________

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var script = document.createElement('script')
script.appendChild(document.createTextNode(`alert('Hello')`))
document.body.appendChild(script)
~~~

_________________________________________

### ![ico-25 icon] removeChild()

Удаление элемента

Метод возвращает ссылку на удаленный элемент

![ico-20 warn] ~Удалить элемент этим методом может только его непосредственный родитель~

____________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection id="section">&lt/section>
    &ltfigure class="figure">&lt/figure>
  &lt/div>
&lt/body>
~~~

~~~js
var section = document.querySelector('#section')
var removed = section.parentNode.removeChild(section)
console.dir(removed)  // ► section#section

var figure = document.querySelector('.figure')
figure.appendChild(removed)
~~~

◘◘Результат◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltfigure class="figure">
      &ltsection id="section">&lt/section>
    &lt/figure>
  &lt/div>
&lt/body>
~~~

_______________________________

### ![ico-25 icon] insertBefore()

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function addElement (tagName, container = document.body) {
  return (container.nodeType === 1 ? container : document.body)
    .appendChild(document.createElement(tagName))
}

var main = addElement('main')
var section = addElement('section', main)
var figure = addElement ('figure', main)

main.insertBefore(document.createElement('p'), section)
~~~

◘◘Результат◘◘

~~~html
&ltbody>
  &ltmain>
    &ltp>&lt/p>
    &ltsection>&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

_____________________________________________

### ![ico-25 icon] insertAdjacentHTML()

Вставим в разметку элементы _~main~_, _~section~_ и _~figure~_ следующим образом:

◘◘![ico-25 cap] ** 6**◘◘

~~~html
&ltbody>
  &ltmain>
    &ltsection>&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

А теперь выполним следующий код в консоли:

~~~js
var section = document.body.querySelector('section')
section.insertAdjacentHTML('beforeBegin', '<p>beforeBegin</p>')
section.insertAdjacentHTML('afterBegin', '<p>afterBegin</p>')
section.insertAdjacentHTML('beforeEnd', '<p>beforeEnd</p>')
section.insertAdjacentHTML('afterEnd', '<p>afterEnd</p>')
~~~

◘◘Результат◘◘

~~~html
&ltbody>
  &lt;main>
    &lt;p>beforeBegin&lt;/p>
    &lt;section>
      &lt;p>afterBegin&lt/p>
      &ltp>beforeEnd&lt/p>
    &lt/section>
    &ltp>afterEnd&lt/p>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

______________________________________________

### ![ico-25 icon] insertAdjacentElement()

◘◘![ico-25 cap] ** 7**◘◘

~~~html
&ltbody>
  &ltmain>
    &ltsection id="demo">&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

~~~js
document.getElementById('demo')
  .insertAdjacentElement('beforeend', document.createElement('p'))

document.querySelector('figure')
  .insertAdjacentElement('afterend', document.createElement('h3'))

document.querySelector('#demo')
  .insertAdjacentElement('beforebegin', document.createElement('img'))

document.getElementsByTagName('figure')[0]
  .insertAdjacentElement('afterbegin', document.createElement('li'))
~~~

◘◘Результат◘◘

~~~html
&ltbody>
  &ltmain>
    &ltimg>
    &ltsection id="demo">
      &ltp>&lt/p>
    &lt/section>
    &ltfigure>
      &ltli>&lt/li>
    &lt/figure>
    &lth3>&lt/h3>
  &lt/main>
&lt/body>
~~~

________________________________________

## ![ico-30 icon] Свойства элементов DOM

____________________________

### ![ico-25 icon] childNodes

Объект **~NodeList~**

◘◘![ico-25 cap] ** 8**◘◘

~~~html
&lt;body>
  Hi, students!
  &ltdiv
    class="container"
    title="Container"
  >
    &lta
      class="paragraph"
      href="https://translate.google.com/"
      title="Google translate"
    >
      Google translate
    &lt/a>
    &ltimg
      src="http://www.abc.net.au/news/image/9154542-1x1-940x940.jpg"
      width="200"
      id="picture"
      class="galleryPicture"
    />
  &lt/div>
  &lth1 class="header">Welcome!&lt/h1>
  &ltp class="paragraph">You study JS&lt/p>
&lt/body>
~~~

Выведем в консоль все дочерние узлы ~document.body~

~~~js
document.body.childNodes
~~~

◘◘Результат◘◘

~~~console
▼ NodeList(7) [text, div.container, text, h1.header, text, p.paragraph, text]
    0: text
  ► 1: div.container
  ► 2: text
  ► 3: h1.header
  ► 4: text
  ► 5: p.paragraph
  ► 6: text
    length: 7
  ► __proto__: NodeList
~~~

![ico-20 warn] Обратите внимание, что все переводы строк (и пустые строки) рассматриваются как тестовые узлы документа.

Теперь выведем в консоль все дочерние узлы первого элемента с атрибутом **_title_**:

~~~js
document.querySelector('[title]').childNodes
~~~

◘◘Результат◘◘

~~~console
▼ NodeList(5) [text, a.paragraph, text, img#picture.galleryPicture, text]
    0: text
  ► 1: a.paragraph
  ► 2: text
  ► 3: img#picture.galleryPicture
  ► 4: text
    length: 5
  ► __proto__: NodeList
~~~
___________________

[![ico-20 link] **w3schools**](external/w3-child-nodes )

_________________________________

### ![ico-25 icon] children

Объект **~HTMLCollection~**

Используем разметку предыдущего примера.

~~~js
document.body.children
~~~

◘◘Результат◘◘

~~~console
▼ HTMLCollection(3) [div.container, h1.header, p.paragraph]
  ► 0: div.container
  ► 1: h1.header
  ► 2: p.paragraph
    length: 3
  ► __proto__: HTMLCollection
~~~

___________________________________

### ![ico-25 icon] parentNode

^^Ссылка на родительский элемент (контейнер, в котором находится элемент).^^

◘◘![ico-25 cap] ** 9**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection id="section">&lt/section>
    &ltfigure>&lt/figure>
  &lt/div>
&lt/body>
~~~

~~~js
var section = document.querySelector('#section')
console.dir(section.parentNode)  // ► div#demo
~~~

_____________________________________________

### ![ico-25 icon] on + тип события

Все свойства элементов DOM, начинающиеся на **~on~**, являются потенциальными ссылками на обработчика соответствующего события

Изначально они имеют значение ~null~

◘◘![ico-25 cap] **10**◘◘

~~~js
var section = document.body
  .appendChild(document.createElement('section'))

section.innerHTML = '<h3>Hello</h3>'

for (var prop in section) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

_____________________________________

### ![ico-25 icon] Memory leaks

Предположим, вы сохраняете ссылку на конкретную ячейку таблицы (тег &lt;td>) в своем коде.
В какой-то момент в будущем вы решите удалить таблицу из DOM, но забываете удалить ссылку на эту ячейку.
Интуитивно можно предположить, что garbage collector (сборщик мусора) будет очищать память от всех переменных, кроме ссылки на эту ячейку.
На практике произойдет следующее: поскольку ячейка является дочерним узлом таблицы, а а элементы-потомки сохраняют ссылки на своих родителей,
сохранившаяся ссылка на ячейку таблицы приводит к тому, что вся таблица остается в памяти.
Учитывайте это внимательно, сохраняя ссылки на элементы DOM.

_______________________________________

### ![ico-25 icon] Атрибуты тегов

Почти все атрибуты тегов, предусмотренные в спецификации языка HTML5, благополучно маппируются в одноименные свойства объектов DOM.
Например, в разметке присутствует тег **~&lt;img />~** с атрибутом **~src~**. В объектной модели документа ему будет соответствовать объект, имеющий свойство **~src~**. Значение этого свойства будет таким же, как и у атрибута **~src~**.
Исключение составляет атрибут **~class~**, поскольку этот идентификатор используется в JS.
Поэтому аттрибут **~class~** в объектной модели документа представлен свойством **~className~**.

Таким образом, нам не обязательно использовать описанные ниже методы для доступа к значениям стандартных атрибутов.

Однако мы можем устанавливать собственные атрибуты тегов, которые не предусмотрены спецификацией языка.
В этом случае для получения и установки значений этих атрибутов нам необходимы следующие методы.

◘◘![ico-25 cap] **setAttribute** | **getAttribute**◘◘

~~~js
document.body.setAttribute('title', 'Hello')

console.info(document.body.getAttribute('title'))
~~~

______________________

◘◘![ico-25 cap] **getBoundingClientRect**◘◘

~~~js
var div = document.body
  .appendChild(document.createElement('div'))

div.setAttribute('style', `
  width: 200px;
  height: 200px;
  border: solid 1px blue;
`)

console.info(div.getBoundingClientRect())
~~~

◘◘Результат◘◘

~~~console
▼ DOMRect {x: 8, y: 8, width: 202, height: 202, top: 8, …}
    bottom: 210
    height: 202
    left: 8
    right: 210
    top: 8
    width: 202
    x: 8
    y: 8
  ► __proto__: DOMRect
~~~
___________________________

◘◘![ico-25 cap] **backgroundImage**◘◘

~~~js
var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(https://cdn2.iconfinder.com/data/icons/user-23/512/User_Yuppie_2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 5px 10px 5px 30px;
`
document.body.appendChild(btn)
~~~

_________________________________________

## ![ico-30 hw] Tests

◘◘** 1**◘◘
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ Какой элемент появится в DOM? | p, div, 'будет сгенерировано исключение' | p→→→


◘◘** 2**◘◘
~~~js
document.title = 'DOM'
~~~

→→→ Что изменится после выполнения скрипта? | 'ничего', 'текст на странице', 'надпись на вкладке' | надпись на вкладке→→→

◘◘** 3**◘◘
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


◘◘** 4**◘◘

→→→ Какой тип данных у свойства innerHTML элемента DOM? | 'boolean', 'undefined', 'string', 'function', 'number', 'object' | string→→→


◘◘** 5**◘◘
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

_________________________________

[![ico-20 link] w3schools](external/w3-dom-elements)
