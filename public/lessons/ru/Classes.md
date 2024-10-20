# ![ico-30 study] Классы

**ES6 (ECMAScript 2015)**

^^Прокси для работы с прототипной моделью наследования^^

Поскольку прототипная модель наследования базируется на функции (конструкторе), то прокси-объект ~**class**~ является, по сути, оберткой для этой функции-конструктора.

Эта обертка значительно облегчает построение довольно сложных цепочек наследования за счет более простого и удобного интерфейса прокси-объекта.

Однако следует помнить, что это всего лишь целлофан, в который завернули все тот же конструктор.

____________________________________________________________________

## ![ico-25 icon] Синтаксис

![ico-20 warn] Код внутри тела класса всегда выполняется в **~strict mode~**
^^даже если вы не использовали директиву **_~use strict~_**^^

![ico-20 memo] "Тело" класса всегда заключено в фигурные скобки ~{ }~

~~~js
class User {
  ...
}
~~~

![ico-20 memo] Внутри фигурных скобок объявляется конструктор (**~constructor~**)

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

и методы класса:

~~~js
class User {
  constructor (name) {
    this.name = name
  }

  getUserInfo () {
    console.log(this.name)
  }
}
~~~

![ico-20 memo] Метод **_constructor_** создает и инициализирует экземпляра класса
![ico-20 memo] Все собственные свойства экземпляра должны быть объявлены в конструкторе  **~constructor()~**
![ico-20 memo] Создаваемые в конструкторе класса свойства и методы могут быть **приватными** и **публичными**
^^( как и в обычном конструкторе )^^

В обычном конструкторе контекстом вызова приватных методов будет глобальный объект ~window~
![ico-20 warn] В конструкторе класса контекстом вызова приватных методов будет ~undefined~

____________________________________

◘◘![ico-25 cap] **Пример 1**◘◘

~~~js
class User {
  constructor (name) {
    const privateVar = prompt('Set privateVar value:')

    function showPrivate () {
      console.log(`Ай-яй-яй, у меня контекст вызова ${this}`)
      console.log(`Зато я вижу приватную переменную: ${privateVar}`)
    }
    this.name = name || 'Бегемот'
    this.show = function () {
      showPrivate ()
    }
  }
}

const user = new User('Крокодил')
user.show()
~~~

◘◘**Result**◘◘

~~~console

Ай-яй-яй, у меня контекст вызова undefined
Зато я вижу приватную переменную: 789
~~~

Для того, чтобы избавиться от иллюзий по поводу "классов" в JS,
создадим аналогичный экземпляр с помощью обычного конструктора

~~~js

function User (name) {
  const privateVar = prompt('Set privateVar value:')
  function showPrivate () {
    console.log(`Ай-яй-яй, у меня контекст вызова ${this}`)
    console.log(`Зато я вижу приватную переменную: ${privateVar}`)
  }
  this.name = name || 'Бегемот'
  this.show = function () {
    showPrivate ()
  }
}

const user = new User('Крокодил')
user.show()
~~~

◘◘**Result**◘◘

~~~console

Ай-яй-яй, у меня контекст вызова [object Window]
Зато я вижу приватную переменную: 789
~~~

Выведем в консоль оба варианта **user** и найдем те косметические отличия, которые там должны быть ![ico-20 smile]

••constructor: class User    /    constructor: ƒ User(name)••

_______________________________________________

## ![ico-25 icon] class declaration


![ico-20 error] **hoisting**

^^объявление класса дожно быть раньше первого обращения к нему^^

Классы - это специальные функции-"обертки", в которые "заворачивают" конструктор

◘◘![ico-25 cap] **Пример 2**◘◘

~~~js
class Picture {
  constructor (url, width) {
    this.elem = document.createElement('img')
    this.elem.src = url
    this.width = width
  }
}

typeof Picture  // "function"
~~~

• ![ico-20 warn] ^^объявленный класс невозможно удалить динамически, без перезагрузки страницы^^
• ^^В этом примере идентификатор  **_~Picture~_**  уже занят, и никакие магические заклинания не помогут переопределить его  содержание^^

^^если обычный конструктор JS можно вызвать и как функцию, и как конструктор ( с ключевым словом **~new~** ), ^^
^^то конструктор класса вызвать без ключевого слова **~new~**  нельзя - будет сгенерировано исключение **_~TypeError~_**^^

~~~js
const x = new Picture('http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg', 200)
document.body.appendChild(x.elem)
~~~

__________________________________________________

## ![ico-25 icon] class expression

**class expression может быть именованным или аниномным**

### ![ico-20 icon] Примеры именованных классов

◘◘![ico-25 cap] **Пример 3**◘◘

~~~js
const Picture = class {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

◘◘**Результат в консоли:**◘◘

~~~console

▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

Однако если мы создадим экземпляр этого класса, и посмотрим на него в консоли, то мы увидим, что имя класса отсутствует

~~~js
let sample = new Picture

console.log(sample)
~~~

◘◘**Результат в консоли:**◘◘

~~~console

▼ Picture {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class
      ► __proto__: Object
~~~

_____________________________________________________________

◘◘![ico-25 cap] **Пример 4**◘◘

~~~js
const Picture = class Canvas {
  constructor (url = 'https://cdn.pastemagazine.com/www/articles/GrinchPOster_header.jpg') {
    this.elem = document.body
      .appendChild(document.createElement('img'))
    this.elem.src = url
  }
}

console.dir(Picture)
~~~

◘◘**Результат в консоли:**◘◘

~~~console

▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

А теперь создадим экземпляр этого класса и выведем его в консоль:

~~~js
const sample = new Picture

console.log(sample)
~~~

◘◘**Результат в консоли:**◘◘

~~~console

▼ Canvas {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class Canvas
      ► __proto__: Object
~~~

~~~js
sample instanceof Picture   // true
~~~

~~~js
sample instanceof Canvas
~~~

••![ico-20 error] Uncaught ReferenceError: Canvas is not defined••

Итак, при использовании class expression имя класса становится недоступным извне

Точнее говоря, достучаться до него можно только так:

~~~js
sample.constructor.name
~~~

________________________________________________________________

◘◘![ico-25 cap] **Пример 5**◘◘

~~~js
const Sample = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.resizeCanvas()
    this.canvas.style.border = '1px solid #000000'
    this.area = this.canvas.getContext('2d')
  }

  resizeCanvas (event) {
    this.canvas.width = window.innerWidth - 30
    this.canvas.height = window.innerHeight - 20
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const pict = new Sample ()
window.onresize = pict.resizeCanvas.bind(pict)

pict.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
pict.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

![ico-20 pin] Чтобы получить имя класса, нужно использовать его свойство  **name**:

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________


## ![ico-25 icon] get & set

^^![ico-20 warn] Свойства, объявленные в конструкторе, будут собственными свойствами экземпляра^^

Для создания вычисляемых свойств нужно использовать геттеры и сеттеры

![ico-20 memo] С помощью ключевого слова  **~get~**  можно объявить геттер, возвращающий значение вычисляемого свойства

^^Геттер будет вызываться каждый раз при обращении к свойству экземпляра^^

![ico-20 memo] С помощью ключевого слова  **~set~**  можно объявить сеттер, изменяющий значение свойства

^^Сеттер будет вызываться каждый раз, когда идентификатор вычисляемого свойства будет в левой части оператора присваивания^^

Рассмотрим упрощенный пример с canvas:

◘◘![ico-25 cap] **Пример 6**◘◘

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

^^![ico-20 speach] Добавим сеттер свойства  **~history~**^^

^^Обратите внимание, что в конструкторе такого свойства нет (и не должно быть)^^

~~~js
set history (newHistory) {
  if (!this.canvas.history) this.canvas.history = []
  if (!Array.isArray(newHistory)) {
    console.error('History must be array')
    return
  }
  const __history = newHistory
    .filter(x => x.points && Array.isArray(x.points))
    if (!__history.length) {
      console.error('History must contain points array')
      return
    }

    this.canvas.history = __history
}
~~~

^^Этот метод изменяет содержимое массива  **canvas._history_**, если такое свойство уже существует,^^
^^или создает его в противном случае^^

^^![ico-20 speach] Теперь добавим геттер свойства  ~history~:^^

~~~js
get history () {
  return this.canvas.history
}
~~~

^^![ico-20 speach] Этот метод возвращает массив  **canvas._history_**^^

^^![ico-25 paper] Теперь полный код примера будет таким:^^

~~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }

  get history () {
    return this.canvas.history
  }

  set history (newHistory) {
    if (!this.canvas.history) this.canvas.history = []
    if (!Array.isArray(newHistory)) {
      console.error('History must be array')
      return
    }
    const __history = newHistory
      .filter(x => x.path && Array.isArray(x.path))
    if (!__history.length) {
      console.error('History must contain path array')
      return
    }
    this.canvas.history = __history
  }
}

let pict = new Canvas()
~~~~

^^![ico-20 speach] Создадим свойство  **_history_**  экземпляра  **pict**, передав массив значений:^^

~~~js
pict.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  "***",
  { val: "***" }
]
~~~

◘◘pict◘◘

~~~console

▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
  ► canvas: canvas
  ▼ history: Array(2)
    ► 0: {path: Array(2), lineColor: "red"}
    ► 1: {path: Array(2), lineColor: "green"}
      length: 2
    ► __proto__: Array(0)
  ► __proto__: Object
~~~

^^в массив  **canvas._history_**  попали только первые два элемента ^^
^^из массива в правой части оператора присваивания, ^^
^^т.е. сработал сеттер, который отфильтровал входной массив^^

^^![ico-20 speach] Попробуем выполнить присваивание, передавая некорректные значения:^^

~~~js
pict.history = ['***']
~~~

**Результат - исключение:**

••![ico-20 error] History must contain path array••

~~~js
pict.history = true
~~~

**Результат - исключение:**

••![ico-20 error] History must be array••

^^![ico-20 speach] Значение свойства  **_history_**  не изменилось, ^^
^^а в консоль были выданы соответствующие сообщения об ошибке^^

________________________________________________________

## ![ico-25 icon] Потеря контекста

![ico-20 pin] В строгом режиме не происходит неявной передачи контекста вызова

![ico-20 warn] Потеря контекста происходит всегда, если ссылка на метод передается в новую переменную:

◘◘![ico-25 cap] **Пример 7**◘◘

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

будет сгенерировано исключение:

••![ico-20 error] Uncaught TypeError: Cannot read property 'area' of undefined••

Передачу контекста вызова нужно сделать явным образом:

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

![ico-20 pin] ^^Потеря контекста ( ~undefined~ ) происходит вследствие того, что весь код внутри тела класса выполняется в  **_strict mode_**, хотя явного указания  'use strict'  в коде класса нет^^
^^При отсутствии явного указания на объект, вызывающий метод, ^^
^^в строгом режиме ~this~ не будет ссылкой на глобальный объект ~window~^^
^^В строгом режиме ~this~ будет  ~undefined~

______________________________________________________

◘◘![ico-25 cap] **Пример 8**◘◘

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    function getProp (prop) {
      this[prop.name] = prop.value
    }

    for (const prop of props) {
      getProp(prop)
    }
  }
}
~~~

^^В этом примере контекст теряется в функции **_getProp()_**,  объявленной внутри метода **_addSomeInfo_**^^
^^(внутренняя функция не наследует контекст вызова родительской)^^
^^Создадим экземпляр **user** класса **User** и вызовем метод **_addSomeInfo_** в контексте объекта **user**^^

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

**Результат**

••![ico-20 error] Uncaught TypeError: Cannot set property 'age' of undefined••

^^![ico-20 yes] Внутри функции **_getProp_** контекст вызова ( **~this~** ) оказался ~undefined~^^

^^Теперь используем стрелочную функцию **_getProp_**, которая не теряет контекст ![ico-20 smile]^^

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addSomeInfo (props) {
    if (!Array.isArray(props)) return

    props.forEach(prop => prop && prop.name && Object.assign(this, { [prop.name]: prop.value }))
  }
}
~~~

^^Создадим экземпляр **user** и вызовем метод **_addSomeInfo_**^^

~~~js
const user = new User('Grig')

user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: hobby, value: ['football', 'fishing'] },
  {},
  54,
  null
])
console.log(user)
~~~

◘◘**Результат**◘◘

~~~console

▼ User {name: "Grig", age: 25, hobby: Array(2)}
    age: 25
  ► hobby: (2) ["football", "fishing"]
    name: "Grig"
  ▼ __proto__:
      ► addSomeInfo: addSomeInfo ( props ) { if ( !Array.isArray ( props ) ) return var getProp = prop => {…}
      ► constructor: class User
      ► __proto__: Object
~~~

________________________________________________________

## ![ico-25 icon] Наследование

### ![ico-20 icon] extends

Ключевое слово **~extends~** используется для создания дочернего класса
Фактически мы передаем с помощью **~extends~** ссылку на прототип

^^Объявим класс **Provider**^^

◘◘![ico-25 cap] **Пример 9**◘◘

~~~js
class Provider extends Array {
  constructor () {
    super();
    ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
      .forEach((item, index) => { this[index] = item })
  }

  valueOf () {
    return this.length
  }
}
~~~

^^Обратите внимание, что в конструкторе класса первым делом с помощью **super()** мы вызываем конструктор родительского класса^^

^^Создадим экземпляр класса **Provider**^^

~~~js
let provider = new Provider
~~~

^^Посмотрим на цепочку прототипов ^^

◘◘provider◘◘

~~~console

▼ Provider(5) ["Google", "Mozilla", "Opera", "Safari", "IE"]
    0: "Google"
    1: "Mozilla"
    2: "Opera"
    3: "Safari"
    4: "IE"
    length: 5
  ▼ __proto__: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► __proto__: Array(0)
~~~

^^Теперь протестируем экземпляр:^^

~~~js
provider instanceof Provider  // true
provider instanceof Array     // true

provider + 5   // 10
provider * 3   // 15
~~~

______________________________

◘◘![ico-25 cap] **Пример 10**◘◘

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.height = '400'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawCircle (center, radius) {
    this.area.beginPath()
    this.area.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    this.area.stroke()
  }
}

let newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])
~~~

^^![ico-20 speach] Обратите внимание, что метод **_~drawCircle()~_** находится в прототипе экземпляра^^
^^( что логично, поскольку это унаследованный метод )^^,
^^а метод **_~drawLine()~_** родительского класса  **Canvas** находится в прототипе прототипа ^^
^^( что соответствует прототипной модели наследования - мы получили цепочку прототипов )^^

________________________________________________________

### ![ico-20 icon] super

Методы родительского класса доступны в дочернем классе посредством ключевого слова **~super~**

^^![ico-20 speach] Расширим унаследованный метод **~drawLine()~**  родительского класса, добавив аргумент **_~lineWidth~_**  ( толщину линии )^^

^^![ico-20 speach] Для этого определим "расширенный" метод  ~drawLine()~ внутри дочернего класса,^^
^^который будет вызывать  метод  ~drawLine()~ родительского класса^^
^^с помощью ключевого слова **super**:^^

~~~js
super.drawLine(points, lineColor)
~~~

^^Теперь код будет таким:^^

◘◘![ico-25 cap] **Пример 11**◘◘

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.canvas.style.border = '1px solid #ddd'
    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  drawLine (points, lineColor, lineWidth) {
    this.area.lineWidth = lineWidth || 3
    this.area.strokeStyle = lineColor
    super.drawLine(points)
  }
}
~~~

^^![ico-20 speach] Создадим экземпляр дочернего класса:^^

~~~js
let newCanvas = new ExtendedCanvas()
~~~

^^![ico-20 speach] и вызовем его метод  **~drawLine()~**^^

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

^^![ico-20 speach] Теперь линия будет отрисовываться заданной толщины^^

____________________________________________

### ![ico-20 icon] super ()

В предыдущих примерах мы не использовали конструктор наследующего класса

![ico-20 warning] Когда нужно добавить собственные свойства экземпляру наследующего класса, без конструктора это сделать невозможно

![ico-20 warning] Первое, что нужно выполнить в конструкторе наследующего класса - вызвать метод **super()**

◘◘![ico-25 cap] **Пример 12**◘◘

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
  drawLine (points) {
    this.area.beginPath()
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

class ExtendedCanvas extends Canvas {
  constructor () {
    super ()
    this.history = []
  }
}
~~~

В противном случае будет сгенерировано исключение:

••![ico-20 error] Uncaught ReferenceError: ••
•• Must call super constructor in derived class before accessing 'this' or returning from derived constructor••

_________________________________________________________

### ![ico-20 icon] super в литералах объектов

Ключевое слово  **~super~**  можно использовать без объявления классов
**~super~** является ссылкой на прототип объекта
Поэтому можно использовать его для доступа к свойствам и методам объекта-прототипа

••![ico-30 speach] _В примерах далее мы будем использовать объекты, объявленные в литеральной форме_••

^^В качестве прототипа объекта  **person**  будет выступать объект  **human**^^
^^Назначать объект  **human**  прототипом объекта  **person** мы будем с помощью метода^^

~~~js
Object.setPrototypeOf(person, human)
~~~

^^После такого назначения внутри объекта  **person** свойства и методы объекта  **human** будут доступны с помощью ключевого слова  **~super~**^^

^^![ico-20 speach] В следующем примере вызовем методы  **_~place()~_**  и  **_~say()~_** прототипа **human**^^
^^в методах   **_~getPlace()~_**  и  **_~talk()~_** объекта  **person** ^^
^^с помощью ключевого слова **~super~** :^^

◘◘![ico-25 cap] **Пример 13**◘◘

~~~js
const human = {
  place () {
    return Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  },
  say (text) {
    this.place.innerHTML = text
  }
}

const person = {
  getPlace () { this.place = super.place () },
  talk (text) {
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.getPlace()
person.talk('привет!')
~~~

__________________________________________________

◘◘![ico-25 cap] **Пример 14**◘◘

~~~js
const human = {
  place: () =>
    document.getElementById('demo')
      ? document.getElementById('demo')
      : document.body.appendChild(document.createElement('p')).id = 'demo',

    say (text) {
      this.place.innerHTML = text
    }
}

let person = {
  getPlace () {
    this.place = super.place()
  },
  talk (text) {
    this.getPlace()
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)

person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

![ico-20 speach] ^^В этом примере метод  **~place()~**  прототипа  (объекта  **human**) проверяет наличие элемента с  ••id === "demo"••^^
^^и если такой элемент найден, возвращает ссылку на него, ^^
^^в противном случае создает такой элемент, добавляет его на страницу^^

![ico-20 speach] ^^Объект  person  изначально не имеет свойства  **_place_**,^^
^^но имеет собственный метод  **~getPlace()~**, который создает такое свойство,  ^^
^^вызывая с помощью ключевого слова  **~super~** метод **~place()~**  прототипа  (объекта  **human**), ^^
^^и присваивая возвращенное этим методом значение собственному свойству  **~place~**^^

![ico-20 speach] ^^Метод  **~talk(_text_)~**  объекта  **person**^^
^^вызывает метод  **~getPlace()~**^^
^^до вызова метода **~say()~**  ^^
^^прототипа  (объекта  **human**)^^

![ico-20 speach] ^^Обратите внимание, что при объявлении метода   **~place()~**  объекта  **human** ^^
^^мы использовали стрелочную функцию, ^^
^^а при объявлении метода  **~say()~**  ее использовать нельзя, ^^
^^поскольку внутри методов, объявленных с помощью стрелочных функций, ^^
^^контектом вызова будет глобальный объект^^

______________________________________________________

◘◘![ico-25 cap] **Пример 15**◘◘

~~~js
const human = {
  place: (() => {
    const elem = document.getElementById('demo')
    return elem || Object.assign(document.body.appendChild(document.createElement('p')), {
      id: 'demo'
    })
  })(),

  say (text) {
    this.place.innerHTML = text
  }
}

let person = {
  talk ( text ) {
    this.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.talk('привет!')
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~

^^В этом примере свойство  **_place_**  прототипа (объекта  **human**) ^^
^^уже не является методом^^
^^Его значение ( ссылка на элемент ) ^^
^^будет установлено при инициализации объекта  **human**^^

^^В этом примере демонстрируется взаимозаменяемость ключевых слов  **~super~**  и  **~this~** ^^
^^при  ссылках на свойства прототипа^^

![ico-20 speach] ^^Метод   **_talk()_**  объекта  **person** ^^
^^вызывает  метод  **_say ()_**  прототипа^^
^^без ключевого слова  **~super~**^^
^^(с ключевым словом  **~this~**)^^

![ico-20 speach] ^^Когда метод  **_say()_**  в объекте  **person**  не будет найден, ^^
^^поиск будет продолжен в прототипе, ^^
^^где и будет благополучно найден^^

![ico-20 speach] ^^Внутри метода   **_say ()_**, вызванного из метода **_talk ()_**, ^^
^^контекстом вызова будет объект  **person**^^
^^(т.е.  **~this~**  будет  указывать на объект  person)^^
^^но тем не менее ссылка   **~this._place_~**  ^^
^^будет благополучно разрешена по цепочке прототипов^^

![ico-20 speach] ^^Если же имена свойств  объекта и его прототипа совпадают, ^^
^^и нужно вытянуть именно свойство прототипа, ^^
^^а не собственное свойство объекта, ^^
^^то для унаследованных свойств можно использовать  ~__proto__~^^

~~~js
const person = {
  say (text) {
    console.log(text)
  },
  talk (text) {
    this.__proto__.say(text)
  }
}
~~~

![ico-20 speach] ^^Очевидно, в таком случае код:

~~~js
super.say(text)
~~~

короче, чем

~~~js
this.__proto__.say(text)
~~~

а результат идентичный ![ico-20 smile]

______________________________________________________________

◘◘![ico-25 cap] **Пример 16**◘◘

~~~~js
const human = {
  id: '',
  get place () {
    if (this.id) return document.getElementById(this.id)
  },
  set place (newId) {
    this.id = newId
    document.getElementById(this.id) ||
      Object.assign(document.body.appendChild(document.createElement('p')), {
        id: this.id
      })
    },
    get message () {
      return this.place.innerText
    },
    set message (val) {
      this.place.innerText = val
    }
}

const person = {
  talk (text) {
    super.message = text
  },
  get place () {
    return super.place
  },
  set place (newId) {
    super.place = newId
  }
}

Object.setPrototypeOf(person, human)
person.place = 'demo-1'
person.talk('привет!')
person.place = 'demo-2'
setTimeout(() => person.talk('Hello, baby!'), 2000)
~~~~

![ico-20 speach] ^^В этом примере мы используем геттеры и сеттеры свойств объектов^^
^^Для вычисляемых свойств это наиболее корректный способ доступа к их значениям^^

________________________________________________________

## ![ico-25 icon] static

Статические методы класса объявляются с помощью ключевого слова **static**

![ico-20 warn] Эти методы могут быть вызваны только как методы класса

![ico-20 warn] Внутри статического метода ~this~ указывает на конструктор класса, а не на экземпляр

◘◘![ico-25 cap] **Пример 17**◘◘

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas.call(this.canvas)
    this.canvas.style.border = "1px solid #000000"
    this.area = this.canvas.getContext ( "2d" )
  }

  static resizeCanvas (event) {
    this.width = window.innerWidth - 30
    this.height = window.innerHeight - 20
  }

  static drawLine (context, points) {
    context.area.moveTo(points[0].x, points[0].y)
    context.area.lineTo(points[1].x, points[1].y)
    context.area.stroke()
  }
}

let pict = new Canvas()
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
Canvas.drawLine(pict, [{ x: 50, y: 50 }, { x: 250, y: 250 }])
Canvas.drawLine(pict, [{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

![ico-20 pin] Обратите внимание, что статические методы **_~resizeCanvas~_** и **_~drawLine~_**
вызываются как методы класса **Canvas**:

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

![ico-20 pin] Внутри конструктора  ~this~  указывает  на экземпляр

В этом примере для того, чтобы внутри метода ~this~ указывал на объект **canvas** экземпляра,
вызов метода  **_resizeCanvas_** из конструктора происходит с передачей контекста:

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

и когда этот метод используется в качестве обработчика события **_~resize~_** объекта  **~window~**,
то выполняется явная привязка контекста:

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

При вызове статического метода  **_~drawLine~_**  первым аргументом ему передается контекст вызова

![ico-20 pin] Примечание:

^^В данном случае объявление метода  **~drawLine~**  как статического^^
^^создает ненужные сложности с передачей контекста, ^^
^^и гораздо проще объявить его так:^^

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

^^чтобы контекстом вызова был экземпляр, создаваемый конструктором^^


________________________________________________________

◘◘![ico-25 cap] **Пример 18**◘◘

~~~js
class Canvas {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    Canvas.resizeCanvas ()
  }

  static resizeCanvas (event) {
    console.log(`name: '${this.name}'`)
  }
}

var pict = new Canvas()
window.onresize = Canvas.resizeCanvas
~~~

Когда метод **_~resizeCanvas()~_** будет вызван из конструктора, он выведет в консоль:

••name: "Canvas"••

Измените размер окна браузера
Теперь метод  **_~resizeCanvas()~_**  будет вызван в глобальной области видимости,
и в консоль будет выведено:

••name: ""••

поскольку  ~this~  внутри **_~resizeCanvas()~_** теперь указывает
на глобальный объект  (~window~)

____________________________________________________________________


## ![ico-25 cap] Пример

В этом примере мы будем работать с графикой [svg](external/svg)

#### ![ico-20 icon] createElementNS()

![ico-20 warn] Для динамического создания элементов SVG нужно использовать метод **~createElementNS()~**
с указанием ссылки на пространство имен ( **_NS_** )

Это необходимо для того, чтобы браузер правильно понимал и отображал _svg_-элементы

SVG - это тип XML-разметки, который имеет собственное пространство имен, которое может быть встроено в HTML5

![ico-20 green-ok] Первым аргументом метода  **~createElementNS()~** идет ссылка на пространство имен
( ~http://www.w3.org/2000/svg~ )
![ico-20 green-ok] Второй аргумент - имя тега элемента в этом пространстве имен

![ico-20 warn] Если использовать обычный метод  ~createElement()~, то браузер будет интерпретировать его в пространстве имен  HTML
( по умолчанию )

![ico-20 warn] Для корректной работы svg-элементов нужно, чтобы браузер интерпретировал их в пространстве имен SVG

^^Например, чтобы корректно создать контейнер для  svg-графики:^^

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

**Проверим в консоли:**

~~~js
const svg = document.createElement('svg')
console.log(svg.namespaceURI)  // "http://www.w3.org/1999/xhtml"

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // "http://www.w3.org/2000/svg"
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

_______________________________________

#### ![ico-20 icon] Базовый класс

Создадим класс  **DrawFigures**, который будет создавать  элемент  svg
с двумя методами:   **_setSize()_**  и  **~drawFigure()~**

![ico-20 speach] Метод **~setSize()~** будет изменять размеры элемента  svg
![ico-20 speach] Метод **~drawFigure()~** будет добавлять элементы в контейнер  svg

^^Имя элемента будет передано первым аргументом метода  (figure)^^
^^возможные значения  "line", "circle", "path", "rect" и т.д.^^
^^Параметры фигуры будут переданы вторым аргументом метода (params)^^

![ico-20 speach] Поскольку у каждого элемента  svg  свой набор атрибутов, создаем свойство  **~attrs~** (объект), свойства которого будут именами svg-элементов, а значения - массивом атрибутов каждого svg-элемента

При создании svg-элемента его атрибуты будут установлены с помощью метода  **~setAttribute()~**

~~~js
const DrawFigures = class SVG {
  constructor (w, h) {
    this.canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    document.body.appendChild(this.canvas)
    this.setSize(w, h)
    this.attrs = {
      line: ['x1', 'y1', 'x2', 'y2'],
      circle: ['cx', 'cy', 'r']
    }
  }

  setSize (w, h) {
    this.canvas.setAttribute ('width', w)
    this.canvas.setAttribute ('height', h)
  }

  drawFigure (figure, params) {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', figure)
    this.canvas.appendChild(elem)
    for (const attr of this.attrs[figure]) {
      elem.setAttribute(attr, params[attr])
    }
    return elem
  }
}
~~~

Протестировать работу класса можно так:

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

![ico-20 speach] Вызов метода   **~drawFigure()~** создаст элемент &lt;line> и вернет ссылку на него,
но этот элемент не отобразится на странице, поскольку в массиве  **~attrs.line~**
нет атрибута "~stroke~", задающего цвет линии

![ico-20 speach] Чтобы увидеть этот элемент на странице, нам приходится устанавливать значение атрибута ~stroke~
после вызова метода **_drawFigure()_**:

~~~js
setAttribute('stroke', 'red')
~~~

![ico-20 speach] Теперь можно рисовать и другие фигуры, и настраивать их атрибуты:

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

[![ico-25 cap] Пример](samples/18)

_____________________________________________________

#### ![ico-20 icon] Дочерний класс

![ico-20 speach] Теперь создадим дочерний класс  **ColoredFigures**,
расширяющий функционал родительского класса  **DrawFigures**
путем добавления атрибутов линий и заливки фигур
("~stroke~", "~style~", "~fill~")
и метода удаления элемента  **_erase_**

![ico-20 speach] В конструкторе дочернего класса вызовем метод **~super()~**,
чтобы был создан контейнер &lt;svg> с нужными размерами,
и объявим свойство экземпляра  **~figures~**

![ico-20 speach] Метод **~super()~** должен быть вызван первым в конструкторе,
поскольку до его вызова  значение  `this`  не будет определено
внутри конструктора

![ico-20 speach] Кроме того, расширим функционал базового класса  **DrawFigures**,
добавив атрибуты  "~stroke~",  "~style~"  и  "~fill~"
это мы тоже сделаем в конструкторе класса  **ColoredFigures**

~~~js
class ColoredFigures extends DrawFigures {
  constructor () {
    super(window.innerWidth - 20, window.innerHeight - 20)
    this.figures = []
    for (const attr in this.attrs) {
      this.attrs[attr].push('stroke', 'style', 'fill')
    }
  }

  line (params, line) {
    this.draw('line', params)
  }

  circle (params, line, fill) {
    this.draw('circle', params)
  }

  draw (figure, params) {
    if (params.strokeWidth) {
      Object.assign(params, {
        style: `stroke-width: ${ params.strokeWidth }`
      })
      delete params.strokeWidth
    }
    this.figures.push(this.drawFigure(figure, params))
  }

  erase (figureIndex) {
    if (figureIndex > this.figures.length - 1 || figureIndex < 0) return
    this.figures[figureIndex].remove()
    this.figures.splice(figureIndex, 1)
  }
}
~~~

![ico-20 speach] Проверим, как работает расширенный класс  **ColoredFigures**

~~~js
const canvas = new ColoredFigures(400, 500)

canvas.line({
  x1: 10,
  y1: 250,
  x2: 250,
  y2: 50,
  stroke: 'green',
  strokeWidth: 5
})
canvas.circle({
  cx: 150,
  cy: 150,
  r: 100,
  fill: '#ff00ff90',
  stroke: '#909',
  strokeWidth: 10
})
~~~

![ico-20 speach] Конечно, мы можем создавать элементы, обращаясь к методу базового класса  **~drawFigure()~**:

~~~js
canvas.drawFigure('line', {
  x1: 200,
  y1: 150,
  x2: 50,
  y2: 100,
  stroke: 'blue',
  style: 'stroke-width: 10'
})
~~~

![ico-20 speach] но тогда созданные svg-элементы не попадут в массив  **~figures~**
и их нельзя будет удалить с помощью метода  **~erase()~**

![ico-20 speach] Кроме того, вызов метода  **~line()~**  или  **~circle()~**  лаконичнее

![ico-25 speach] Обратите внимание, что у класса  **ColoredFigures** есть свойство  prototype, которого нет ( и не может быть ) у экземпляра
В свойстве **~prototype~** класса **ColoredFigures** находятся методы **~circle()~**, **~line()~**, **~draw()~** и **~erase()~**

![ico-25 speach] У класса ColoredFigures есть также свойство  **~__proto__~**
это ссылка на родительский класс **SVG**

![ico-25 speach] У родительского класса, как и следовало ожидать, тоже есть свойство **~prototype~**,
и в этом свойстве находятся методы **~drawFigure()~** и **~setSize()~**

![ico-25 speach] Ни у класса **ColoredFigures**, ни у класса **SVG** нет свойств **~attrs~**, **~canvas~** и **~figures~**
Они есть только у экземпляра этого класса

________________________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
