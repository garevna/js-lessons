# ![ico-30 study] Document Object Model ( DOM )

_____________________

## ![ico-25 icon] Объект document

воспользуемся рекурсивной функцией ~showProto~:

~~~js
function showProto (elem) {
  var proto = elem.__proto__
  if (!proto) return
  console.info(proto.constructor.name)
  showProto(proto)
}
~~~

для получения цепочки прототипов объекта **~document~**

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

^^^[Сравнение прототипов]


| ^^**document**^^ | ^^**document.head**^^ | ^^**document.body**^^ |
|                  | ~HTMLHeadElement~     | ~HTMLBodyElement~     |
| ~HTMLDocument~   | ~HTMLElement~         | ~HTMLElement~         |
| ~Document~       | ~Element~             | ~Element~             |
| ~Node~           | ~Node~                | ~Node~                |
| ~EventTarget~    | ~EventTarget~         | ~EventTarget~         |
| ~Object~         | ~Object~              | ~Object~              |

![ico-25 warn] Все цепочки прототипов заканчиваются **Object**
![ico-25 warn] В каждой цепочке прототипов есть объекты **EventTarget** и **Node**
![ico-25 warn] Все html-элементы наследуют от класса **HTMLElement**

^^^

______________________

## ![ico-25 icon] Свойства объекта document

^^^[Свойства document]

| ![ico-20 green-ok] **document.head**         | ^^HTMLHeadElement^^ |
| ![ico-20 green-ok] **document.body**         | ^^HTMLBodyElement^^ |
| ![ico-20 green-ok] **document.doctype**      | ^^_строка_^^        |
| ![ico-20 green-ok] **document.URL**          | ^^_строка_^^        |
| ![ico-20 green-ok] **document.location**     | ^^_объект_^^        |
| ![ico-20 green-ok] **document.images**       | ^^HTMLCollection^^  |
| ![ico-20 green-ok] **document.forms**        | ^^HTMLCollection^^  |
| ![ico-20 green-ok] **document.links**        | ^^HTMLCollection^^  |
| ![ico-20 green-ok] **document.scripts**      | ^^HTMLCollection^^  |
| ![ico-20 green-ok] **document.styleSheets**  | ^^StyleSheetList^^  |
| ![ico-20 green-ok] **document.cookie**       | ^^строка^^          |
| ![ico-20 green-ok] **document.lastModified** | ^^строка ( ~'09/30/2018 11:00:15'~ )^^ |
| **...**                                      |                     |

^^^

◘◘![ico-20 cap] **^^document.scripts^^**◘◘

~~~js
for (var script of document.scripts)
  console.log(script.innerText)
~~~

◘◘![ico-20 cap] **^^document.styleSheets^^**◘◘

~~~js
for (var sheet of document.styleSheets) {
  for (var rule of sheet.cssRules) {
    console.warn(rule.selectorText)
    console.info(rule.cssText)
  }
}
~~~

![ico-20 warn] Все свойства, имена которых начинаются на "**_on_**", могут содержать ссылку на обработчика события, тип которого определяется тем, что следует за "**_on_**" в имени свойства
^^по умолчанию значениями этих свойств будет ~null~^^

◘◘![ico-20 cap] **^^on...^^**◘◘

~~~js
for (var prop in document) {
  prop.indexOf('on') === 0
    ? console.info(prop.slice(2))
    : ''
}
~~~

^^Мы получим длинный перечень событий объекта **~document~**^^
^^например, присвойте свойству **~onmouseover~** объекта ~document~ ссылку на функцию:^^


◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.onmouseover = function (event) {
  console.info(`${event.clientX} : ${event.clientY}`)
}
~~~

____________________________

## ![ico-25 icon] Методы объекта document

### ![ico-20 icon] document.createElement

Создает элемент DOM и возвращает ссылку на него

Аргументом метода является строка, содержащая имя тега html-элемента ( ^^регистр не имеет значения^^ )
Если переданная строка не соответствует никакому тегу в спецификации языка html, то созданный элемент будет иметь класс **~HTMLUnknownElement~**

◘◘![ico-20 cap] ** 2**◘◘

~~~js
var style = document.createElement('style')
style.appendChild(document.createTextNode(`section { border: inset 1px; }`))
console.log(style)
~~~

____________________________

### ![ico-20 icon] document.createTextNode

◘◘![ico-20 cap] ** 3**◘◘

~~~js
style.appendChild(document.createTextNode(`div { color: blue; }`))
~~~

_____________________________

### ![ico-20 icon] Методы поиска элементов

Для поиска элементов на странице у объекта **~document~** есть несколько методов:

![ico-20 green-ok] document.getElementById

^^Возвращает ссылку на элемент, найденный по его атрибуту **id**^^

![ico-20 green-ok] document.getElementsByTagName

^^Возвращает коллецию html-элементов ( итерабельный объект класса **~HTMLCollection~** ) по имени тега^^

![ico-20 green-ok] document.getElementsByClassName

^^Возвращает коллецию html-элементов ( итерабельный объект класса **~HTMLCollection~** ) по имени класса^^

![ico-20 cap] ** 4**

**^^Разметка^^**

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

**^^JS^^**

~~~js
document
  .getElementsByName('main')[0]
  .getElementsByTagName('section')[0]
  .getElementsByClassName('content')
~~~

**^^Результат:^^**

~~~console

▼ HTMLCollection(2) [div.content, figure.content]
  ► 0: div.content
  ► 1: figure.content
    length: 2
  ► __proto__: HTMLCollection
~~~

____________________________________________

![ico-25 cap] ** 5**

Перейдите [**ссылке**](https://css-tricks.com/almanac/selectors/c/checked/)

Откройте консоль новой вкладки
Выполните код в консоли:

~~~js
document.getElementsByClassName('screen-reader-text', 'visually-hidden')
~~~

Объект **HTMLCollection** является "живой" коллекцией
Это означает, что если в документе произойдут изменения (удаление элементов, добавление элементов), то эти изменения будут отражены в полученном до этих изменений объекте класса ~HTMLCollection~

______________________________________

![ico-20 green-ok] element.querySelector

^^Возвращает первый найденный элемент по указанному CSS-селектору^^
^^Поиск осуществляется в пределах элемента, в контексте которого вызван метод ( ~element~ )^^

![ico-25 cap] ** 6**

~~~html
<body>
  <h3 id="demo">demo</h3>
  <section>
    <div title="figure">figure</div>
    <figure class="promoClass">promoClass</figure>
  </section>
  <input type="number">
  <input type="color">
</body>
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

### ![ico-20 icon] document.querySelectorAll

Возвращает итерабельный объект класса **~NodeList~**, содержащий все элементы, соответствующие указанному селектору

![ico-25 cap] ** 7**

Вернемся к предыдущему примеру (5) и выполним следующий код:

~~~js
section.querySelectorAll('*')
~~~

**Результат в консоли:**

~~~console

▼ NodeList(2) [ div, figure.promoClass ]
  ► 0: div
  ► 1: figure.promoClass
    length: 2
  ► __proto__: NodeList
~~~

______________________

## ![ico-25 icon] Типы узлов дерева DOM

DOM представляет собой граф ( дерево ), вершины которого ( узлы, или **_nodes_** ) могут быть html-элементами, комментариями, обычным текстом...

Получить все дочерние узлы элемента DOM можно с помощью свойства  **~childNodes~**  этого элемента

~~~js
document.body.childNodes
document.querySelector('main').childNodes
~~~

Каждый узел ( объект )  имеет свойство  **_nodeType_**

^^^[nodeType]


| Код    | Тип узла                                | Пример                                              |
| ^^ 1^^ | ^^ELEMENT&#95;NODE^^                    | ~&lt;div>~                                          |
| ^^ 2^^ | ^^ATTRIBUTE&#95;NODE^^                  | ~href = "https://translate.google.com/"~            |
| ^^ 3^^ | ^^TEXT&#95;NODE^^                       | ~document.body.appendChild ( new Text( "Hello" ) )~ |
| ^^ 4^^ | ^^CDATA&#95;SECTION&#95;NODE^^          |                                                     |
| ^^ 5^^ | ^^ENTITY&#95;REFERENCE&#95;NODE^^       |                                                     |
| ^^ 6^^ | ^^ENTITY&#95;NODE^^                     |                                                     |
| ^^ 7^^ | ^^PROCESSING&#95;INSTRUCTION&#95;NODE^^ |                                                     |
| ^^ 8^^ | ^^COMMENT&#95;NODE^^                    | ~&lt;!&ndash;&ndash; ... &ndash;&ndash;>~           |
| ^^ 9^^ | ^^DOCUMENT&#95;NODE^^                   | ~&lt;html>...&lt;/html>~                            |
| ^^10^^ | ^^DOCUMENT&#95;TYPE&#95;NODE^^          | ~&lt;!DOCTYPE>~                                     |
| ^^11^^ | ^^DOCUMENT&#95;FRAGMENT&#95;NODE^^      | ~&lt;template>~                                     |
| ^^12^^ | ^^NOTATION&#95;NODE^^                   |                                                     |


^^^

![ico-25 cap] ** 8**

Выполним код в консоли:

~~~js
document.body.appendChild(new Text('Hello'))
document.body.childNodes
~~~

Результат:

~~~console

▼ NodeList [text]
      0: text
      length: 1
    ► __proto__: NodeList
~~~

![ico-25 cap] ** 9**

~~~js
var style = document.createElement('style')
document.head.appendChild(style)
style.innerText = `p { color: red; }`

var p = document.body.appendChild(document.createElement('p'))
p.innerText = 'Hello!'

document.head.childNodes              // ► NodeList [style]
document.head.childNodes[0].nodeType  // 1
~~~

_____________________________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSfOAAnZrszP3EiO3zgYzfkqBpH68ggE9mFzsDyK40_WUjB89A/viewform)

___________________________________

[![ico-20 link] **^^Типы узлов дерева DOM^^**](https://www.w3schools.com/xml/dom_nodetype.asp)

[![ico-20 link] **^^Document^^**](https://developer.mozilla.org/en-US/docs/Web/API/Document)
