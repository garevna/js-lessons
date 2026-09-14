# ![ico-30 study] Класи

**ES6 (ECMAScript 2015)**

^^Проксі для роботи з прототипною моделлю успадкування^^

Оскільки прототипна модель успадкування базується на функції (конструкторі), то проксі-об’єкт ~**class**~ є, по суті, обгорткою для цієї функції-конструктора.

Ця оболонка значно полегшує побудову досить складних ланцюжків успадкування завдяки простішому та зручнішому інтерфейсу проксі-об’єкта.

Однак слід пам’ятати, що це всього лише целофан, у який загорнули той самий конструктор.

____________________________________________________________________

## ![ico-25 icon] Синтаксис

![ico-20 warn] Код усередині тіла класу завжди виконується в **~strict mode~**
^^навіть якщо ви не використовували директиву **_~use strict~_**^^

![ico-20 memo] «Тіло» класу завжди укладено в фігурні дужки ~{ }~

~~~js
class User {
  ...
}
~~~

![ico-20 memo] Усередині фігурних дужок оголошується конструктор (**~constructor~**)

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

та методи класу:

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

![ico-20 memo] Метод **_constructor_** створює та ініціалізує екземпляр класу
![ico-20 memo] Усі власні властивості екземпляра мають бути оголошені в конструкторі  **~constructor()~**
![ico-20 memo] Властивості та методи, що створюються в конструкторі класу, можуть бути **приватними** та **публічними**
^^( як і в звичайному конструкторі )^^

У звичайному конструкторі контекстом виклику приватних методів буде глобальний об’єкт ~window~
![ico-20 warn] У конструкторі класу контекстом виклику приватних методів буде ~undefined~

____________________________________

◘◘![ico-25 cap] **Приклад 1**◘◘

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

Щоб позбутися ілюзій щодо «класів» у JS,
створимо аналогічний екземпляр за допомогою звичайного конструктора

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

Виведемо в консоль обидва варіанти **user** і знайдемо ті косметичні відмінності, які там мають бути ![ico-20 smile]

••constructor: class User    /    constructor: ƒ User(name)••

_______________________________________________

## ![ico-25 icon] class declaration


![ico-20 error] **hoisting**

^^Оголошення класу має бути раніше першого звернення до нього^^

Класи — це спеціальні функції-«обгортки», в які «загортають» конструктор

◘◘![ico-25 cap] **Приклад 2**◘◘

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

• ![ico-20 warn] ^^оголошений клас неможливо видалити динамічно, без перезавантаження сторінки^^
• ^^У цьому прикладі ідентифікатор  **_~Picture~_**  вже зайнятий, і жодні магічні заклинання не допоможуть перевизначити його  вміст^^

^^якщо звичайний конструктор JS можна викликати і як функцію, і як конструктор (з ключовим словом **~new~**), ^^
^^то конструктор класу викликати без ключового слова **~new~**  не можна — буде згенеровано виняток **_~TypeError~_**^^

~~~js
const x = new Picture('http://www.radioactiva.cl/wp-content/uploads/2018/05/pikachu.jpg', 200)
document.body.appendChild(x.elem)
~~~

__________________________________________________

## ![ico-25 icon] class expression

**Вираз класу може бути іменованим або анонімним**

### ![ico-20 icon] Приклади іменованих класів

◘◘![ico-25 cap] **Приклад 3**◘◘

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

◘◘**Результат у консолі:**◘◘

~~~console

▼ class Picture
    arguments: (...)
    caller: (...)
    length: 0
    name: "Picture"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

Однак якщо ми створимо екземпляр цього класу і подивимося на нього в консолі, то побачимо, що ім’я класу відсутнє

~~~js
let sample = new Picture

console.log(sample)
~~~

◘◘**Результат у консолі:**◘◘

~~~console

▼ Picture {elem: img}
    elem: img
  ▼ __proto__:
      ► constructor: class
      ► __proto__: Object
~~~

_____________________________________________________________

◘◘![ico-25 cap] **Приклад 4**◘◘

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

◘◘**Результат у консолі:**◘◘

~~~console

▼ class Canvas
    arguments: (...)
    caller: (...)
    length: 0
    name: "Canvas"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

А тепер створимо екземпляр цього класу та виведемо його в консоль:

~~~js
const sample = new Picture

console.log(sample)
~~~

◘◘**Результат у консолі:**◘◘

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

Отже, при використанні class expression ім’я класу стає недоступним ззовні

Точніше кажучи, дістатися до нього можна лише так:

~~~js
sample.constructor.name
~~~

________________________________________________________________

◘◘![ico-25 cap] **Приклад 5**◘◘

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

![ico-20 pin] Щоб отримати ім’я класу, потрібно використати його властивість  **name**:

~~~js
console.log ( Sample.name ) // "Canvas"
~~~

________________________________________________________


## ![ico-25 icon] get & set

^^![ico-20 warn] Властивості, оголошені в конструкторі, будуть власними властивостями екземпляра^^

Для створення обчислюваних властивостей потрібно використовувати геттери та сеттери

![ico-20 memo] За допомогою ключового слова  **~get~**  можна оголосити геттер, який повертає значення обчислюваної властивості

^^Геттер викликатиметься щоразу при зверненні до властивості екземпляра^^

![ico-20 memo] За допомогою ключового слова  **~set~**  можна оголосити сеттер, який змінює значення властивості

^^Сеттер викликатиметься щоразу, коли ідентифікатор обчислюваної властивості буде в лівій частині оператора присвоєння^^

Розглянемо спрощений приклад із canvas:

◘◘![ico-25 cap] **Приклад 6**◘◘

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body.appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')
  }
}
~~~

^^![ico-20 speach] Додамо сеттер властивості  **~history~**^^

^^Зверніть увагу, що в конструкторі такого властивості немає (і не повинно бути)^^

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

^^Цей метод змінює вміст масиву  **canvas._history_**, якщо така властивість уже існує,^^
^^або створює його в іншому випадку^^

^^![ico-20 speach] Тепер додамо геттер властивості  ~history~:^^

~~~js
get history () {
  return this.canvas.history
}
~~~

^^![ico-20 speach] Цей метод повертає масив  **canvas._history_**^^

^^![ico-25 paper] Тепер повний код прикладу буде таким:^^

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

^^![ico-20 speach] Створимо властивість  **_history_**  екземпляра  **pict**, передавши масив значень:^^

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

^^у масив  **canvas._history_**  потрапили лише перші два елементи ^^
^^з масиву в правій частині оператора присвоєння, ^^
^^тобто спрацював сеттер, який відфільтрував вхідний масив^^

^^![ico-20 speach] Спробуємо виконати присвоєння, передаючи некоректні значення:^^

~~~js
pict.history = ['***']
~~~

**Результат — виняток:**

••![ico-20 error] History must contain path array••

~~~js
pict.history = true
~~~

**Результат — виняток:**

••![ico-20 error] History must be array••

^^![ico-20 speach] Значення властивості  **_history_**  не змінилося, ^^
^^а в консолі були виведені відповідні повідомлення про помилку^^

________________________________________________________

## ![ico-25 icon] Втрата контексту

![ico-20 pin] У строгому режимі не відбувається неявної передачі контексту виклику

![ico-20 warn] Втрата контексту відбувається завжди, якщо посилання на метод передається в нову змінну:

◘◘![ico-25 cap] **Приклад 7**◘◘

~~~js
const drawLine = pict.drawLine

drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
~~~

буде згенеровано виняток:

••![ico-20 error] Uncaught TypeError: Cannot read property 'area' of undefined••

Передачу контексту виклику потрібно зробити явно:

~~~js
const drawLine = pict.drawLine.bind(pict)
~~~

![ico-20 pin] ^^Втрата контексту ( ~undefined~ ) відбувається внаслідок того, що весь код усередині тіла класу виконується в  **_strict mode_**, хоча явного вказівки  “use strict”  у коді класу немає^^
^^За відсутності явного вказівника на об’єкт, що викликає метод, ^^
^^у строгому режимі ~this~ не буде посиланням на глобальний об’єкт ~window~^^
^^У строгому режимі ~this~ буде  ~undefined~

______________________________________________________

◘◘![ico-25 cap] **Приклад 8**◘◘

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

^^У цьому прикладі контекст втрачається у функції **_getProp()_**,  оголошеній усередині методу **_addSomeInfo_**^^
^^(внутрішня функція не успадковує контекст виклику батьківської функції)^^
^^Створимо екземпляр **user** класу **User** і викличемо метод **_addSomeInfo_** у контексті об’єкта **user**^^

~~~js
var user = new User('Grig')
user.addSomeInfo([
  { name: 'age', value: 25 },
  { name: 'hobby', value: ['football', 'fishing'] }
])
~~~

**Результат**

••![ico-20 error] Uncaught TypeError: Cannot set property 'age' of undefined••

^^![ico-20 yes] Усередині функції **_getProp_** контекст виклику ( **~this~** ) виявився ~undefined~^^

^^Тепер використаємо стрілкову функцію **_getProp_**, яка не втрачає контекст ![ico-20 smile]^^

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

^^Створимо екземпляр **user** і викличемо метод **_addSomeInfo_**^^

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

## ![ico-25 icon] Спадкування

### ![ico-20 icon] extends

Ключове слово **~extends~** використовується для створення дочірнього класу
Фактично ми передаємо за допомогою **~extends~** посилання на прототип

^^Оголосимо клас **Provider**^^

◘◘![ico-25 cap] **Приклад 9**◘◘

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

^^Зверніть увагу, що в конструкторі класу насамперед за допомогою **super()** ми викликаємо конструктор батьківського класу^^

^^Створимо екземпляр класу **Provider**^^

~~~js
let provider = new Provider
~~~

^^Подивимося на ланцюжок прототипів ^^

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

^^Тепер протестуємо екземпляр:^^

~~~js
provider instanceof Provider  // true
provider instanceof Array     // true

provider + 5   // 10
provider * 3   // 15
~~~

______________________________

◘◘![ico-25 cap] **Приклад 10**◘◘

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

^^![ico-20 speach] Зверніть увагу, що метод **_~drawCircle()~_** знаходиться в прототипі екземпляра^^
^^( що логічно, оскільки це успадкований метод )^^,
^^а метод **_~drawLine()~_** батьківського класу  **Canvas** знаходиться в прототипі прототипу ^^
^^( що відповідає прототипній моделі успадкування — ми отримали ланцюжок прототипів )^^

________________________________________________________

### ![ico-20 icon] super

Методи батьківського класу доступні в дочірньому класі за допомогою ключового слова **~super~**

^^![ico-20 speach] Розширимо успадкований метод **~drawLine()~**  батьківського класу, додавши аргумент **_~lineWidth~_**  (товщину лінії)^^

^^![ico-20 speach] Для цього визначимо «розширений» метод  ~drawLine()~ усередині дочірнього класу,^^
^^який викликатиме  метод  ~drawLine()~ батьківського класу^^
^^за допомогою ключового слова **super**:^^

~~~js
super.drawLine(points, lineColor)
~~~

^^Тепер код буде таким:^^

◘◘![ico-25 cap] **Приклад 11**◘◘

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

^^![ico-20 speach] Створимо екземпляр дочірнього класу:^^

~~~js
let newCanvas = new ExtendedCanvas()
~~~

^^![ico-20 speach] і викличемо його метод  **~drawLine()~**^^

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

^^![ico-20 speach] Тепер лінія буде відтворюватися із заданою товщиною^^

____________________________________________

### ![ico-20 icon] super ()

У попередніх прикладах ми не використовували конструктор класу, що успадковує

![ico-20 warning] Коли потрібно додати власні властивості до екземпляра класу, що успадковує, без конструктора це зробити неможливо

![ico-20 warning] Перше, що потрібно виконати у конструкторі класу, що успадковується, — викликати метод **super()**

◘◘![ico-25 cap] **Приклад 12**◘◘

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

В іншому разі буде згенеровано виняток:

••![ico-20 error] Uncaught ReferenceError: ••
•• Must call super constructor in derived class before accessing 'this' or returning from derived constructor••

_________________________________________________________

### ![ico-20 icon] super у літералах об’єктів

Ключове слово  **~super~**  можна використовувати без оголошення класів
**~super~** є посиланням на прототип об’єкта
Тому його можна використовувати для доступу до властивостей та методів об’єкта-прототипу

••![ico-30 speach] _У наведених нижче прикладах ми використовуватимемо об’єкти, оголошені у літеральній формі_••

^^Прототипом об’єкта  **person**  виступатиме об’єкт  **human**^^
^^Призначати об’єкт  **human**  прототипом об’єкта  **person** ми будемо за допомогою методу^^

~~~js
Object.setPrototypeOf(person, human)
~~~

^^Після такого призначення всередині об’єкта  **person** властивості та методи об’єкта  **human** будуть доступні за допомогою ключового слова  **~super~**^^

^^![ico-20 speach] У наступному прикладі викличемо методи  **_~place()~_**  та  **_~say()~_** прототипу **human**^^
^^у методах   **_~getPlace()~_**  та  **_~talk()~_** об’єкта  **person** ^^
^^за допомогою ключового слова **~super~** :^^

◘◘![ico-25 cap] **Приклад 13**◘◘

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

◘◘![ico-25 cap] **Приклад 14**◘◘

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

![ico-20 speach] ^^У цьому прикладі метод  **~place()~**  прототипу  (об’єкта  **human**) перевіряє наявність елемента з  ••id === «demo»••^^
^^і якщо такий елемент знайдено, повертає посилання на нього, ^^
^^в іншому випадку створює такий елемент, додає його на сторінку^^

![ico-20 speach] ^^Об’єкт  person  спочатку не має властивості  **_place_**,^^
^^але має власний метод  **~getPlace()~**, який створює таку властивість,  ^^
^^викликаючи за допомогою ключового слова  **~super~** метод **~place()~**  прототипу  (об’єкта  **human**), ^^
^^і присвоюючи значення, повернене цим методом, власній властивості  **~place~**^^

![ico-20 speach] ^^Метод  **~talk(_text_)~**  об’єкта  **person**^^
^^викликає метод  **~getPlace()~**^^
^^до виклику методу **~say()~**  ^^
^^прототипу  (об’єкта  **human**)^^

![ico-20 speach] ^^Зверніть увагу, що при оголошенні методу   **~place()~**  об’єкта  **human** ^^
^^ми використовували стрілкову функцію, ^^
^^а при оголошенні методу  **~say()~**  її використовувати не можна, ^^
^^оскільки всередині методів, оголошених за допомогою стрілкових функцій, ^^
^^контекстом виклику буде глобальний об’єкт^^

______________________________________________________

◘◘![ico-25 cap] **Приклад 15**◘◘

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

^^У цьому прикладі властивість  **_place_**  прототипу (об’єкта  **human**) ^^
^^вже не є методом^^
^^Його значення (посилання на елемент) ^^
^^буде встановлено під час ініціалізації об’єкта  **human**^^

^^У цьому прикладі демонструється взаємозамінність ключових слів  **~super~**  та  **~this~** ^^
^^при  посиланнях на властивості прототипу^^

![ico-20 speach] ^^Метод   **_talk()_**  об’єкта  **person** ^^
^^викликає  метод  **_say ()_**  прототипу^^
^^без ключового слова  **~super~**^^
^^(з ключовим словом  **~this~**)^^

![ico-20 speach] ^^Коли метод  **_say()_**  в об’єкті  **person**  не буде знайдено, ^^
^^пошук продовжиться в прототипі, ^^
^^де він і буде успішно знайдений^^

![ico-20 speach] ^^Усередині методу   **_say ()_**, викликаного з методу **_talk ()_**, ^^
^^контекстом виклику буде об’єкт  **person**^^
^^(тобто  **~this~**  буде  вказувати на об’єкт  person)^^
^^проте посилання   **~this._place_~**  ^^
^^буде успішно вирішене за ланцюжком прототипів^^

![ico-20 speach] ^^Якщо ж імена властивостей  об’єкта та його прототипу збігаються, ^^
^^і потрібно отримати саме властивість прототипу, ^^
^^а не власну властивість об’єкта, ^^
^^то для успадкованих властивостей можна використовувати  ~__proto__~^^

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

![ico-20 speach] ^^Очевидно, що в такому випадку код:

~~~js
super.say(text)
~~~

коротший, ніж

~~~js
this.__proto__.say(text)
~~~

а результат ідентичний ![ico-20 smile]

______________________________________________________________

◘◘![ico-25 cap] **Приклад 16**◘◘

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

![ico-20 speach] ^^У цьому прикладі ми використовуємо геттери та сеттери властивостей об’єктів^^
^^Для обчислюваних властивостей це найбільш коректний спосіб доступу до їхніх значень^^

________________________________________________________

## ![ico-25 icon] static

Статичні методи класу оголошуються за допомогою ключового слова **static**

![ico-20 warn] Ці методи можуть бути викликані лише як методи класу

![ico-20 warn] Усередині статичного методу ~this~ вказує на конструктор класу, а не на екземпляр

◘◘![ico-25 cap] **Приклад 17**◘◘

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

![ico-20 pin] Зверніть увагу, що статичні методи **_~resizeCanvas~_** та **_~drawLine~_**
викликаються як методи класу **Canvas**:

~~~js
Canvas.resizeCanvas
Canvas.drawLine
~~~

![ico-20 pin] Усередині конструктора  ~this~  вказує  на екземпляр

У цьому прикладі для того, щоб усередині методу ~this~ вказував на об’єкт **canvas** екземпляра,
виклик методу  **_resizeCanvas_** з конструктора відбувається з передачею контексту:

~~~js
Canvas.resizeCanvas.call(this.canvas)
~~~

і коли цей метод використовується як обробник події **_~resize~_** об’єкта  **~window~**,
то виконується явна прив’язка контексту:

~~~js
window.onresize = Canvas.resizeCanvas.bind(pict.canvas)
~~~

При виклику статичного методу **_~drawLine~_** першим аргументом йому передається контекст виклику

![ico-20 pin] Примітка:

^^У цьому випадку оголошення методу  **~drawLine~**  як статичного^^
^^створює зайві складнощі з передачею контексту, ^^
^^і набагато простіше оголосити його так:^^

~~~js
drawLine (points) {
  this.area.moveTo(points[0].x, points[0].y)
  this.area.lineTo(points[1].x, points[1].y)
  this.area.stroke()
}
~~~

^^щоб контекстом виклику був екземпляр, створений конструктором^^


________________________________________________________

◘◘![ico-25 cap] **Приклад 18**◘◘

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

Коли метод **_~resizeCanvas()~_** буде викликано з конструктора, він виведе в консоль:

••name: "Canvas"••

Змініть розмір вікна браузера
Тепер метод **_~resizeCanvas()~_** буде викликано в глобальній області видимості,
і в консоль буде виведено:

••name: ""••

оскільки  ~this~  всередині **_~resizeCanvas()~_** тепер вказує
на глобальний об’єкт  (~window~)

____________________________________________________________________


## ![ico-25 cap] Приклад

У цьому прикладі ми будемо працювати з графікою [svg](external/svg)

#### ![ico-20 icon] createElementNS()

![ico-20 warn] Для динамічного створення елементів SVG потрібно використовувати метод **~createElementNS()~**
із зазначенням посилання на простір імен ( **_NS_** )

Це необхідно для того, щоб браузер правильно розпізнавав і відображав _svg_-елементи

SVG — це тип XML-розмітки, який має власний простір імен, що може бути вбудований у HTML5

![ico-20 green-ok] Першим аргументом методу  **~createElementNS()~** є посилання на простір імен
( ~http://www.w3.org/2000/svg~ )
![ico-20 green-ok] Другий аргумент — ім’я тегу елемента в цьому просторі імен

![ico-20 warn] Якщо використовувати звичайний метод  ~createElement()~, то браузер інтерпретуватиме його в просторі імен  HTML
(за замовчуванням)

![ico-20 warn] Для коректної роботи svg-елементів потрібно, щоб браузер інтерпретував їх у просторі імен SVG

^^Наприклад, щоб коректно створити контейнер для  svg-графіки:^^

~~~js
document.createElementNS('http://www.w3.org/2000/svg', 'svg')
~~~

**Перевіримо в консолі:**

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

#### ![ico-20 icon] Базовий клас

Створимо клас **DrawFigures**, який буде створювати елемент svg
з двома методами: **_setSize()_** та **~drawFigure()~**

![ico-20 speach] Метод **~setSize()~** змінюватиме розміри елемента  svg
![ico-20 speach] Метод **~drawFigure()~** додаватиме елементи до контейнера  svg

^^Ім'я елемента буде передано першим аргументом методу  (figure)^^
^^можливі значення  «line», «circle», “path”, «rect» тощо^^
^^Параметри фігури будуть передані другим аргументом методу (params)^^

![ico-20 speach] Оскільки кожен елемент  svg  має власний набір атрибутів, створюємо властивість  **~attrs~** (об’єкт), властивості якої будуть іменами svg-елементів, а значення — масивом атрибутів кожного svg-елемента

Під час створення svg-елемента його атрибути будуть встановлені за допомогою методу  **~setAttribute()~**

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

Перевірити роботу класу можна так:

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

![ico-20 speach] Виклик методу   **~drawFigure()~** створить елемент &lt;line> і поверне посилання на нього,
але цей елемент не відобразиться на сторінці, оскільки в масиві  **~attrs.line~**
немає атрибута «~stroke~», що задає колір лінії

![ico-20 speach] Щоб побачити цей елемент на сторінці, нам доводиться встановлювати значення атрибута ~stroke~
після виклику методу **_drawFigure()_**:

~~~js
setAttribute('stroke', 'red')
~~~

![ico-20 speach] Тепер можна малювати й інші фігури та налаштовувати їхні атрибути:

~~~js
const circle = sample.drawFigure('circle', { cx: 180, cy: 180, r: 150 })
circle.setAttribute('stroke', 'blue')
circle.setAttribute('fill', 'transparent')
sample.setSize(400, 400)
circle.setAttribute('stroke-width', 8)
~~~

[![ico-25 cap] Приклад](samples/18)

_____________________________________________________

#### ![ico-20 icon] Дочірній клас

![ico-20 speach] Тепер створимо дочірній клас  **ColoredFigures**,
який розширює функціонал батьківського класу  **DrawFigures**
шляхом додавання атрибутів ліній і заливки фігур
("~stroke~", "~style~", "~fill~")
та методу видалення елемента  **_erase_**

![ico-20 speach] У конструкторі дочірнього класу викличемо метод **~super()~**,
щоб було створено контейнер &lt;svg> з потрібними розмірами,
і оголосимо властивість екземпляра  **~figures~**

![ico-20 speach] Метод **~super()~** має бути викликаний першим у конструкторі,
оскільки до його виклику значення `this` не буде визначено
усередині конструктора

![ico-20 speach] Крім того, розширимо функціонал базового класу  **DrawFigures**,
додавши атрибути  «~stroke~»,  «~style~»  та  «~fill~»
це ми теж зробимо у конструкторі класу  **ColoredFigures**

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

![ico-20 speach] Перевіримо, як працює розширений клас  **ColoredFigures**

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

![ico-20 speach] Звісно, ми можемо створювати елементи, звертаючись до методу базового класу  **~drawFigure()~**:

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

![ico-20 speach] але тоді створені SVG-елементи не потраплять до масиву  **~figures~**
і їх не можна буде видалити за допомогою методу  **~erase()~**

![ico-20 speach] Крім того, виклик методу  **~line()~**  або  **~circle()~**  є лаконічнішим

![ico-25 speach] Зверніть увагу, що клас **ColoredFigures** має властивість prototype, якої немає (і не може бути) у екземпляра
У властивості **~prototype~** класу **ColoredFigures** містяться методи **~circle()~**, **~line()~**, **~draw()~** та **~erase()~**

![ico-25 speach] У класу ColoredFigures є також властивість **~__proto__~**
це посилання на батьківський клас **SVG**

![ico-25 speach] У батьківського класу, як і слід було очікувати, теж є властивість **~prototype~**,
і в цій властивості містяться методи **~drawFigure()~** та **~setSize()~**

![ico-25 speach] Ні у класу **ColoredFigures**, ні у класу **SVG** немає властивостей **~attrs~**, **~canvas~** та **~figures~**
Вони є лише в екземплярі цього класу

________________________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
