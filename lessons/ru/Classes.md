# ![ico-30 study] Классы⟪Classes⟫

**ES6 (ECMAScript 2015)**

••Прокси для упрощения работы с прототипной моделью наследования••

Поскольку прототипная модель наследования базируется на функции (конструкторе), то прокси-объект **~class~** является, по сути, оберткой для этой функции-конструктора.

^^Эта обертка значительно облегчает построение довольно сложных цепочек наследования за счет более простого и удобного интерфейса прокси-объекта.^^

^^Однако следует помнить, что это всего лишь 'целлофан', в который завернули все тот же конструктор.^^

___________________________________________________

## ![ico-25 icon] Синтаксис⟪Syntax⟫

![ico-20 memo] 'Тело' класса всегда заключено в фигурные скобки ~{...}~.

~~~js
class User {
  ...
}
~~~

••![ico-20 warn] **_strict mode_**<br/>Код внутри тела класса всегда выполняется в строгом режиме<br/>(даже если вы не использовали директиву _use strict_).••

![ico-20 memo] Внутри фигурных скобок, как правило, объявляется конструктор:

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

•••• pin
![ico-20 memo] До 2022 года в стандарте языка не было синтаксиса для объявления свойств в теле класса. Все собственные свойства обязаны были создаваться строго внутри **_constructor()_**.
![ico-20 memo] С появлением спецификации **Class Fields** правила расширились. Теперь любая переменная (свойство), объявленная прямо в теле класса без ключевого слова _static_, автоматически становится собственным свойством каждого создаваемого экземпляра. Под капотом движок сам «переносит» эти объявления в конструктор и выполняет их в момент вызова _new_ перед вашим кодом.
••••

~~~js
class User {
  constructor (name) {
    this.name = name
  }
  age = 35
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user
< ► User {age: 35, name: 'Piter'}
~~~

___________________________________________________

### ![ico-20 icon] Приватные свойства⟪Private_class_fields⟫

••Символ **_#_** перед именем свойства или метода объявляет его приватным (_Private class fields_). Это стандартный синтаксис **ES2022**.••

♦♦♦1♦♦♦

~~~js
class User {
  #status
  constructor (name = 'Unknown', status) {
    this.name = name
    this.#status = status
    this.getStatus = () => console.log(this.#status)
  }
}
~~~

![ico-25 warn] Обратите внимание, что для объявления собственного приватного свойства экземпляра мы предварительно декларируем его в теле класса (**~#status~**).<br/>^^В отличие от обычных свойств, которые могут динамически добавляться объекту в любой момент, приватные свойства жестко привязаны к структуре класса.<br/>Движок JavaScript должен заранее (еще на этапе компиляции кода) точно знать, какие приватные свойства есть у класса, чтобы гарантировать безопасность доступа и оптимизировать скорость работы кода.<br/>^^

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...   constructor (name = 'Unknown', status) {
...     this.name = name
...     this.#status = status
...     this.getStatus = () => console.log(this.#status)
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user
< User { name: 'Piter', getStatus: [Function (anonymous)] }
> user.getStatus()
registered
undefined
> user.#status = 'test'
< user.#status = 'test'
<     ^
<
< Uncaught SyntaxError: Private field '#status' must be declared in an enclosing class
~~~

^^![ico-25 warn] Не пробуйте воспроизвести этот код в консоли браузера или в сниппете, поскольку DevTools выполняет его в специальном расширенном режиме отладки (REPL-контексте). В этом режиме браузер намеренно отключает синтаксические ограничения на приватные поля.<br/>![ico-25 bash] Если вы просто введете в терминале команду **~node~** и нажмете Enter, вы попадете в интерактивный режим (как консоль браузера). Там можно вставлять любой код построчно, а для выхода нажать Ctrl + C дважды.^^

___________________________________________________

### ![ico-25 icon] Свойства и методы класса⟪Class_properties_and_methods⟫

Всё, что объявляется в теле класса, распределяется по четырем категориям в зависимости от синтаксиса:

•••• none
![ico-20 pin] Собственные свойства экземпляра (_Instance fields_): обычные переменные (например, age = 25), объявленные вне конструктора. Они создаются персонально на каждом новом объекте в момент его рождения.
![ico-20 pin] Прототипные методы (_Prototype methods_): обычные функции, объявленные в теле класса. Они сохраняются в единственном экземпляре в prototype класса ради экономии памяти, а объекты получают к ним доступ через цепочку прототипов.
![ico-20 pin] Приватные элементы (_Private fields/methods_): свойства и методы, начинающиеся с **_#_**. Доступны только коду внутри фигурных скобок этого класса. У каждого экземпляра приватные свойства свои собственные.
![ico-20 pin] Статические элементы (_Static fields/methods_): объявляются с ключевым словом **_static_**. Они являются собственностью самого класса (конструктора). Доступ к ним возможен только через <ИмяКласса>.<свойство> (как, например, метод _Object.keys()_ и другие статические методы конструктора **Object**).
••••

♦♦♦2♦♦♦

~~~js
class User {
  #status

  constructor (name, status) {
    this.name = name
    this.#status = status
  }

  getStatus () {
    return this.#status
  }

  get status () {
    return this.#status
  }

  set status (newStatus) {
    const allowedStatuses = ['registered', 'admin', 'customer'];
    if (allowedStatuses.includes(newStatus)) {
      this.#status = newStatus
    } else {
      console.error(`Invalid status '${newStatus}'.`)
    }
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class User {
...   #status
...
...   constructor (name, status) {
...     this.name = name
...     this.#status = status
...   }
...
...   getStatus () {
...     return this.#status
...   }
...
...   get status () {
...     return this.#status
...   }
...
...   set status (newStatus) {
...     const allowedStatuses = ['registered', 'admin', 'customer'];
...     if (allowedStatuses.includes(newStatus)) {
...       this.#status = newStatus
...     } else {
...       console.error(`Invalid status '${newStatus}'.`)
...     }
...   }
... }
< undefined
> const user = new User('Piter', 'registered')
< undefined
> user.getStatus()
< 'registered'
> user.status
< 'registered'
> user.status = 'figma'
! Invalid status 'figma'.
> user.status = 'hacker'
! Invalid status 'hacker'.
~~~

___________________________________________________

♦♦♦3♦♦♦

~~~js
class Demo {
  publicField = 'Я принадлежу экземпляру'

  #privateField = 'Я скрыто внутри экземпляра'

  static staticField = 'Я принадлежу самому классу Demo'

  constructor (name) {
    this.name = name
  }

  publicMethod () {
    return `Доступ к приватному полю: ${this.#privateField}`
  }

  static staticMethod () {
    return 'Я вызываюсь как Demo.staticMethod()'
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class Demo {
...   publicField = 'Я принадлежу экземпляру'
...
...   #privateField = 'Я скрыто внутри экземпляра'
...
...   static staticField = 'Я принадлежу самому классу Demo'
...
...   constructor(name) {
...     this.name = name
...   }
...
...   publicMethod () {
...     return `Доступ к приватному полю: ${this.#privateField}`
...   }
...
...   static staticMethod () {
...     return 'Я вызываюсь как Demo.staticMethod()'
...   }
... }
< undefined
> const instance = new Demo('Test')
< undefined
> instance
< Demo { publicField: 'Я принадлежу экземпляру', name: 'Test' }
> instance.publicMethod()
< 'Доступ к приватному полю: Я скрыто внутри экземпляра'
> Demo.staticMethod()
< 'Я вызываюсь как Demo.staticMethod()'
> Demo.staticField
< 'Я принадлежу самому классу Demo'
~~~

___________________________________________________

## ![ico-25 icon] Порядок инициализации⟪Initialisation_process⟫

При создании экземпляра движок выполняет инициализацию строго сверху вниз, но в два четких этапа. Код, написанный в теле класса, всегда выполняется раньше, чем тело самого **~constructor~**.
**Этап 1**: Движок создает в памяти пустой объект (будущий экземпляр) и сразу начинает инициализировать свойства, объявленные в теле класса, по порядку их написания:

Рассмотрим порядок инициализации полей класса на предыдущем примере 3.

•••• none

1. Выделяется скрытый слот и записывается приватное свойство **_#privateField_**;
2. Создается собственное публичное свойство **_publicField_** со значением  '**Я принадлежу экземпляру**'

••••

**Этап 2**: Выполнение конструктора
Только после того, как все поля из тела класса успешно созданы на экземпляре, движок переходит к выполнению кода внутри функции constructor:

•••• none
3. Выполняется строчка _this.name = name_, добавляя экземпляру еще одно собственное свойство.
••••

Чтобы доказать это, сделаем так: вместо того, чтобы просто присваивать свойствам строковые значения, будем вызывать функцию ~getValue()~, которая будет выводить в консоль имя инициализируемой переменной.

♦♦♦4♦♦♦

~~~js
function getValue (stepName) {
  console.log(`-> Выполняется: ${stepName}`)
  return 'значение'
}
~~~

♦♦♦5♦♦♦

~~~js
class TestOrder {
  firstField = getValue('Поле класса (firstField)')

  constructor () {
    getValue('Код внутри constructor')
    this.secondField = 'создано в конструкторе'
  }

  thirdField = getValue('Поле класса (thirdField)')
}

const instance = new TestOrder()
~~~

Это позволит отследить порядок инициализации переменных.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> function getValue(stepName) {
...   console.log(`-> Выполняется: ${stepName}`)
...   return 'значение'
... }
< undefined
> class TestOrder {
...   firstField = getValue('Поле класса (firstField)')
...
...   constructor() {
...     getValue('Код внутри constructor')
...     this.secondField = 'создано в конструкторе'
...   }
...
...   thirdField = getValue('Поле класса (thirdField)')
... }
< undefined
> const instance = new TestOrder()
< -> Выполняется: Поле класса (firstField)
< -> Выполняется: Поле класса (thirdField)
< -> Выполняется: Код внутри constructor
< undefined
~~~

Обратите внимание на **~thirdField~**. Даже если свойство объявлено в теле класса ниже конструктора, движок все равно поднимет его инициализацию и выполнит до того, как запустится код внутри **~constructor~**.

___________________________________________________

## ![ico-25 icon] Class expression⟪Class_expression⟫

Объявление классов через _Class Expression_ работает аналогично _Function Expression_. Этот синтаксис делает классы «первоклассными гражданами» (**First-Class Citizens**) в JS — их можно динамически передавать в функции, возвращать из них или присваивать переменным.
Главное отличие заключается в области видимости имени класса и удобстве отладки.

### ![ico-20 icon] Анонимное классовое выражение⟪Anonymous_class_expression⟫

♦♦♦6♦♦♦

~~~js
const User = class {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

**Имя класса**: У этого класса нет собственного внутреннего имени. Однако современные JS-движки достаточно умны: они автоматически берут имя из переменной, в которую записан класс (~User.name === 'User'~).
**Где доступно**: Только через переменную ~User~.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'User'
> const user = new User
< undefined
> user
< User { setName: [Function: setName], getName: [Function: getName] }
> user.getName()
< 'Unknown'
> user.setName('Piter')
< undefined
> user.getName()
< 'Piter'
~~~

___________________________________________________

### ![ico-20 icon] Именованное классовое выражение⟪Named_class_expression⟫

♦♦♦7♦♦♦

~~~js
const User = class Human {
  #name
  constructor (name = 'Unknown') {
    this.#name = name
  } 
  setName = name => {
    if (!!name) {
      this.#name = name
    } else {
      console.error('Invalid name: ', name)
    }
  }
  getName = () => this.#name
}
~~~

**Имя класса**: Свойство **~name~** теперь жестко привязано к внутреннему имени: ~User.name === 'Human'~.
**Область видимости имени**: Имя **~Human~** доступно только внутри самого тела класса (в конструкторе или методах). Снаружи вызвать ~new Human()~ нельзя — вы получите **_^^ReferenceError^^_**. Снаружи этот класс доступен исключительно по имени **~User~**.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const User = class Human {
...   #name
...   constructor (name = 'Unknown') {
...     this.#name = name
...   }
...   setName = name => {
...     if (!!name) {
...       this.#name = name
...     } else {
...       console.error('Invalid name: ', name)
...     }
...   }
...   getName = () => this.#name
... }
< undefined
> User.name
< 'Human'
~~~

___________________________________________________

На первый взгляд, создание двух разных имен (**~User~** снаружи и **~Human~** внутри) кажется запутанным, но у этого подхода есть две важные практические цели:

^^^[Отладка и Call Stack]
^^Если внутри конструктора или метода произойдет ошибка, в консоли браузера вы увидите четкое имя класса.^^
![ico-20 paperclip] ^^Для анонимного класса в сложных цепочках или при передаче в другие модули в стеке ошибок может отображаться ~&lt;anonymous>~.^^
![ico-20 paperclip] ^^Для именованного класса в логах всегда будет написано конкретное имя: **~Human.constructor~** или **~Human.myMethod~**.^^

~~~js
let User = class {
  static createDefault() { return new User }
}
~~~

~~~demo
> const Student = User
< undefined
> User = null
< null
> Student.createDefault()
! Uncaught TypeError: User is not a constructor
~~~

^^^

^^^[Рекурсия и статические свойства]
^^Если вам внутри класса нужно обратиться к его собственным статическим методам или вызвать конструктор рекурсивно, использование внутреннего имени **~Human~** защищает код от внешних изменений.^^
^^^

___________________________________________________

♦♦♦8♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

~~~demo
> console.log(Picture.name)
< Canvas
~~~

~~~js
const picture = new Picture()

picture.drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
picture.drawLine([{ x: 250, y: 250 }, { x: 100, y: 250 }])
~~~

~~~demo
> picture instanceof Picture
< true
> picture instanceof Canvas
! Uncaught ReferenceError: Canvas is not defined
~~~

{{{Classes-5.js}}}

___________________________________________________

## ![ico-25 icon] get & set⟪get_&_set⟫

Для создания вычисляемых свойств нужно использовать геттеры и сеттеры.
![ico-20 memo] С помощью ключевого слова **~get~** можно объявить геттер, возвращающий значение вычисляемого свойства.
![ico-20 memo] С помощью ключевого слова **~set~** можно объявить сеттер, изменяющий значение свойства.

•••• none
^^Геттер будет вызываться каждый раз при обращении к свойству экземпляра.^^
^^Сеттер будет вызываться каждый раз, когда идентификатор вычисляемого свойства будет в левой части оператора присваивания.^^
••••

Рассмотрим пример класса **~Canvas~** с вычисляемым свойством **~history~**:

♦♦♦9♦♦♦

~~~js
const Canvas = class {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    this.area = this.canvas.getContext('2d')

    let history = []

    Object.defineProperty(this, 'history', {
      get: () => Object.freeze(history),

      set: newHistory => {
        if (!Array.isArray(newHistory)) {
          console.error('Недопустимое значение.')
          return
        }

        const tmp = newHistory
          .filter(item => item.path && Array.isArray(item.path))

        if (!tmp.length) {
          console.error('canvas.history - это массив объектов с обязательным свойством `path`.')
          return
        }

        history = tmp
      },

      enumerable: true,
      configurable: true
    })
  }
}
~~~

Создадим экземпляр этого класса и выведем его в консоль:

~~~js
const canvas = new Canvas
console.log(canvas)
~~~

~~~console
▼ Canvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
    history: (...)
  ► get history: () => history
  ► set history: newHistory => {…}
  ▼ [[Prototype]]: Object
      ► constructor: class Canvas
      ► [[Prototype]]: Object
~~~

У экземпляра появилось собственное вычисляемое свойство **~history~**.
Проверим работу сеттера этого свойства путем присваивания значения вычисляемому свойству:

~~~js
canvas.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  '***',
  { val: '***' }
]
~~~

Мы специально передаем сеттеру некорректные данные, не соответствующие схеме данных объекта **~history~**. Теперь проверим, что же теперь будет значением этого свойства, т.е. воспользуемся геттером:

~~~js
console.log(canvas.history)
~~~

~~~console
▼ (2) [{…}, {…}]
  ► 0: {path: Array(2), lineColor: 'red'}
  ► 1: {path: Array(2), lineColor: 'green'}
    length: 2
  ► [[Prototype]]: Array(0)
~~~

Отлично, наш сеттер отфильтровал полученные значения, блокируя попадание мусора в массив **~history~**.

Попробуем выполнить присваивание, передавая некорректные значения:

~~~demo
> canvas.history = 'History'
! Недопустимое значение.
> canvas.history = ['***']
! canvas.history - это массив объектов с обязательным свойством `path`.
~~~

Сеттер вычисляемого свойства не позволил нам испортить данные, и в консоли мы увидим исключение:

Поскольку **~history~** - это **ссылочный тип данных**, а ссылка - это отмычка, проверим, что после получения геттером ссылки на **~history~** мы не сможем его повредить:

~~~demo
> canvas.history.push({ x: 10, y: 20 })
! Uncaught TypeError: Cannot add property 2, object is not extensible
> canvas.history.pop()
! Uncaught TypeError: Cannot delete property '1' of [object Array]
~~~

___________________________________________________

## ![ico-25 icon] Потеря контекста⟪Loss_of_context⟫

![ico-20 pin] В строгом режиме не происходит неявной передачи контекста вызова.

![ico-25 pin] Потеря контекста (~undefined~) происходит вследствие того, что весь код внутри тела класса выполняется в **~strict mode~**, хотя явного указания 'use strict'  в коде класса нет.

•••• none
При отсутствии явного указания на объект, вызывающий метод
в строгом режиме **_this_** не будет ссылкой на глобальный объект _window_.
В строгом режиме **_this_** будет **_undefined_**.
••••

Вернемся к примеру 8:

~~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine (points) {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}

const picture = new Picture
~~~~

![ico-20 warn] Потеря контекста происходит всегда, если ссылка на метод передается в новую переменную:

~~~demo
> const drawLine = picture.drawLine
< undefined
> drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
! Uncaught TypeError: Cannot read property 'area' of undefined
~~~

Объявим метод **~drawLine~** с помощью стрелочной функции:

♦♦♦10♦♦♦

~~~js
const Picture = class Canvas {
  constructor () {
    this.canvas = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(this.canvas, {
      width: 320,
      height: 320,
      style: 'border: 1px solid #000; background: #FFF'
    })

    this.area = this.canvas.getContext('2d')
  }

  drawLine = (points) => {
    this.area.moveTo(points[0].x, points[0].y)
    this.area.lineTo(points[1].x, points[1].y)
    this.area.stroke()
  }
}
~~~

Теперь контекст вызова унаследованного метода **~drawLine~** определяется в момент создания экземпляра, и изменить его уже невозможно.
А в момент создания экземпляра, как мы уже знаем, контекст вызова будет ссылкой на создаваемый экземпляр.

После вызова функции **~test~** линия на холсте будет отрисована.

~~~demo
> const picture = new Picture()
< undefined
> const test = picture.drawLine
< undefined
> test([{ x: 50, y: 50 }, { x: 250, y: 250 }])
< undefined
~~~

___________________________________________________

♦♦♦11♦♦♦

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    function setProp (prop) {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
! Cannot set properties of undefined (setting 'country')
~~~

•••• none
В этом примере контекст теряется в функции **_setProp()_**, объявленной внутри метода **_addProperties_**
(внутренняя функция не наследует контекст вызова родительской).
••••

Внесем некоторые изменения в код примера: сделаем **~setProp()~** стрелочной функцией:

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }

  addProperties (props) {
    if (!Array.isArray(props)) {
      console.error('The argument must be an array.')
      return
    }

    const setProp = (prop) => {
      try {
        this[prop.name] = prop.value
      } catch (err) {
        console.error(err.message)
      }
    }

    for (const prop of props) {
      setProp(prop)
    }
  }
}
~~~

Стрелочная функция **~setProp()~** объявлена внутри метода **~addProperties~**, контекст вызова которого - это ссылка на экземпляр. В момент объявления стрелочная функция получает контекст вызова от метода **~addProperties~**, и этот контекст уже изменить невозможно.

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
< undefined
> user
< ► User {name: 'Piter', country: 'UA'}
~~~

___________________________________________________

## ![ico-25 icon] Наследование⟪Inheritance⟫

### ![ico-20 icon] extends⟪extends⟫

Ключевое слово **~extends~** используется для создания дочернего класса.

•••• none
![ico-20 smile] Адская работа по созданию цепочки прототипов осталась в прошлом.<br />Больше не нужно вручную проделывать множество манипуляций с помощью _Object.create_ и _Object.setPrototypeOf_.<br />Больше не нужно ломать голову над тем, почему у дочернего класса пропадает свойство _prototype.constructor_ и почему не наследуются статические свойства родительского класса.
Ключевое слово **_extends_** делает процесс создания цепочки прототипов декларативным, безопасным и монолитным, превращая сложную низкоуровневую сборку «вручную» в лаконичную и понятную конструкцию.<br />Синтаксис **_extends_** скрывает под капотом сразу несколько обязательных шагов, которые при использовании _Object.create_ или _Object.setPrototypeOf_ приходится писать самостоятельно.
••••

^^^[]
![ico-20 warn] ^^~Object.create~ связывает только прототип потомка и прототип родителя. Статические методы родителя автоматически не наследуются дочерним классом.^^
![ico-20 warn] ^^Использование ~Object.setPrototypeOf~ для изменения прототипа уже созданного объекта — это крайне медленная операция в JS. Она ломает внутренние оптимизации движка (hidden classes) для всех последующих операций с этим объектом.^^
![ico-20 warn] ^^При перезаписи прототипа через ~Object.create(Parent.prototype)~ свойство ~Child.prototype.constructor~ полностью стирается. Если его не восстановить вручную, проверка ~instance.constructor~ будет ошибочно возвращать ~Parent~.^^
^^^

♦♦♦12♦♦♦

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

![ico-25 warn] ^^Обратите внимание, что в конструкторе класса первым делом с помощью **~super()~** мы вызываем конструктор родительского класса.^^

^^Создадим экземпляр класса **Provider**^^

~~~js
let provider = new Provider
~~~

^^Посмотрим на цепочку прототипов:^^

~~~console

▼ Provider(5) ['Google', 'Mozilla', 'Opera', 'Safari', 'IE']
    0: 'Google'
    1: 'Mozilla'
    2: 'Opera'
    3: 'Safari'
    4: 'IE'
    length: 5
  ▼ [[Prototype]]: Array
      ► constructor: class Provider
      ► valueOf: ƒ valueOf()
      ► [[Prototype]]: Array(0)
~~~

^^Теперь протестируем экземпляр:^^

~~~demo
> provider instanceof Provider
< true
> provider instanceof Array
< true

> provider + 5
< 10
> provider * 3
< 15
~~~

___________________________________________________

♦♦♦13♦♦♦

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

const newCanvas = new ExtendedCanvas()
newCanvas.drawCircle({ x: 100, y: 100 }, 100)
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }])

console.log(newCanvas)
~~~

~~~console
▼ ExtendedCanvas {canvas: canvas, area: CanvasRenderingContext2D}
  ► area: CanvasRenderingContext2D {canvas: canvas, lang: 'inherit', font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', …}
  ► canvas: canvas
  ▼ [[Prototype]]: Canvas
    ► constructor: class ExtendedCanvas
    ► drawCircle: ƒ drawCircle(center, radius)
    ▼ [[Prototype]]: Object
      ► constructor: class
      ► drawLine: ƒ drawLine(points)
      ► [[Prototype]]: Object
~~~

••••
Обратите внимание, что метод **_drawCircle()_** находится в прототипе экземпляра
(что логично, поскольку это собственный метод дочернего класса)
а унаследованный метод **_drawLine()_** родительского класса **Canvas** находится в прототипе прототипа
(что соответствует прототипной модели наследования - мы получили цепочку прототипов).
••••

___________________________________________________

### ![ico-20 icon] super⟪super⟫

Методы родительского класса доступны в дочернем классе посредством ключевого слова **~super~**.

^^![ico-20 speach] Расширим унаследованный метод **~drawLine()~**  родительского класса, добавив аргумент **_~lineWidth~_** (толщину линии)^^

^^![ico-20 speach] Для этого определим "расширенный" метод ~drawLine()~ внутри дочернего класса, который будет вызывать метод ~drawLine()~ родительского класса с помощью ключевого слова **~super~**:^^



~~~js
super.drawLine(points)
~~~

^^Теперь код будет таким:^^

♦♦♦14♦♦♦

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

^^![ico-20 speach] Теперь линия будет отрисовываться заданной толщины.^^

___________________________________________________

### ![ico-20 icon] super()⟪super⟫

В предыдущих примерах мы не использовали конструктор наследующего класса

![ico-20 warning] Когда нужно добавить собственные свойства экземпляру наследующего класса, без конструктора это сделать невозможно.

![ico-20 warning] Первое, что нужно выполнить в конструкторе наследующего класса - вызвать метод **~super()~**

♦♦♦15♦♦♦

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

~~~console
! Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

___________________________________________________


^^![ico-25 pin] Ключевое слово **~super~** работает и без классов — в обычных
объектах, через их прототип. Это отдельная тема, и она вынесена на свою
страницу:^^

[%%%super в литералах объектов%%%](page/super-in-object-literals)

## ![ico-25 icon] static⟪static⟫

Статические методы класса объявляются с помощью ключевого слова **~static~**.

•••• warn
![ico-25 warn] Эти методы могут быть вызваны только как методы класса, и не наследуются экземплярами.
![ico-25 warn] Внутри статического метода **_this_** указывает на конструктор класса, а не на экземпляр.
••••

♦♦♦16♦♦♦

~~~js
class Canvas {
  constructor () {
    this.canvas = Canvas.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: 'background: #ddd; margin-inline: 32px'
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

В этом примере статический метод **~createCanvas~** класса **~Canvas~** создает и вставляет в тело документа холст canvas, добавляет ему прослушивателя события **~resize~**.
После создания экземпляра и установки прослушивателя события **~resize~** глобального объекта ~window~ созданный экземпляр будет реагировать на изменение ширины окна браузера.

~~~js
const picture = new Canvas()
window.onresize = function () {
  picture.canvas.dispatchEvent(new Event('resize'))
}
~~~

Давайте немного усовершенствуем этот пример. Добавим классу **~Canvas~** статическое свойство **~instances~**, в котором будут регистрироваться все созданные экземпляры, а так же статическое свойство **~listener~**, которое будет принимать значение ~true~, если прослушиватель события ~resize~ установлен для глобального объекта ~window~.
Также добавим классу **~Canvas~** статический метод **~setListener~**, который устанавливает прослушиватель события ~resize~ на глобальный объект ~window~, если статическое свойство **~listener~** имеет значение ~false~.

♦♦♦17♦♦♦

~~~js
class Canvas {
  constructor () {
    this.constructor.instances.add(this)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
  }

  static instances = new Set()
  static listener = false

  static setListener () {
    if (this.listener) {
      console.log('The listener is already enabled.')
      return
    }
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.instances
        .forEach(instance => instance.canvas.dispatchEvent(event))
    }
    this.listener = true
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }
}
~~~

Обратите внимание, что прослушиватель события ~resize~ глобального объекта ~window~, который устанавливается статическим методом класса **~setListener~**, создает и диспатчит событие ~resize~ для всех зарегистрированных экземпляров класса **~Canvas~**.
В конструкторе экземпляра мы регистрируем его в статическом свойстве класса **~instances~**, и вызываем статический метод класса **~createCanvas~**, создающий холст ~canvas~ и добавляющий ему прослушивателя события ~resize~.
![ico-25 warn] В приведенном выше примере возникает серьезная опасность утечек памяти.

^^^[Утечки памяти]

^^Для полноценной регистрации объектов в реестре класса с возможностью их обхода без утечек памяти используется **~FinalizationRegistry~** вместе с ~Set~ и **~WeakRef~**. Это позволяет автоматически удалять ссылки на объекты из реестра, как только их удалит сборщик мусора.^^
^^Чтобы экземпляр Canvas мог быть удален сборщиком мусора, нужно:<br/>• Вызвать метод очистки (удалить элемент из DOM-дерева);<br/>• Занулить (null) все переменные, которые ссылаются на этот экземпляр.^^


| [![ico-20 link] **~FinalizationRegistry~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) | [![ico-20 link] **~WeakRef~**⯈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) |

~~~js
class Canvas {
  constructor () {
    const ref = new WeakRef(this)
    Canvas.#registry.add(ref)
    Canvas.#cleaner.register(this, ref)
    this.canvas = this.constructor.createCanvas()
    this.area = this.canvas.getContext('2d')
    
    Canvas.setListener()
  }

  static #registry = new Set()
  static #listener = false

  static #cleaner = new FinalizationRegistry((ref) => {
    Canvas.#registry.delete(ref)
    console.log('Объект был удален из памяти, реестр очищен!')
  })

  static setListener () {
    if (this.#listener) return // Если слушатель уже есть, ничего не делаем
    
    window.onresize = function () {
      const event = new Event('resize')
      Canvas.#registry.forEach(ref => {
        const instance = ref.deref()
        if (instance && instance.canvas) {
          instance.canvas.dispatchEvent(event)
        }
      })
    }
    this.#listener = true
  }

  static getAliveInstances() {
    const alive = []
    for (const ref of this.#registry) {
      const obj = ref.deref()
      if (obj) alive.push(obj)
    }
    return alive
  }

  static createCanvas () {
    const elem = document.body
      .appendChild(document.createElement('canvas'))
    Object.assign(elem, {
      width: window.innerWidth - 64,
      height: 400,
      style: `
        background: #ddd;
        margin: 32px;
        border: solid 1px #777;
      `
    })
    elem.addEventListener('resize', function () {
      this.width = window.innerWidth - 64
    })
    return elem
  }

  destroy () {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    this.canvas = null
    this.area = null
  }
}

const first = new Canvas()
const second = new Canvas()
~~~

^^^

___________________________________________________

♦♦♦18♦♦♦

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

••name: 'Canvas'••

Измените размер окна браузера
Теперь метод  **_~resizeCanvas()~_**  будет вызван в глобальной области видимости,
и в консоль будет выведено:

••name: ''••

поскольку  ~this~  внутри **_~resizeCanvas()~_** теперь указывает
на глобальный объект  (~window~)

___________________________________________________

## ![ico-25 cap] Пример⟪Example⟫

В этом примере мы будем работать с графикой [svg](external/svg)

#### ![ico-20 icon] createElementNS()⟪createElementNS⟫

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
console.log(svg.namespaceURI)  // 'http://www.w3.org/1999/xhtml'

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // 'http://www.w3.org/2000/svg'
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

___________________________________________________

#### ![ico-20 icon] Базовый класс⟪Base_class⟫

Создадим класс **~DrawFigures~**, который будет создавать  элемент **svg**
с двумя методами:   **~setSize()~**  и  **~drawFigure()~**

•••• none
![ico-20 speach] Метод **_setSize()_** будет изменять размеры элемента  svg
![ico-20 speach] Метод **_drawFigure()_** будет добавлять элементы в контейнер  svg
^^Имя элемента будет передано первым аргументом метода  (figure)^^
^^возможные значения  "line", "circle", "path", "rect" и т.д.^^
^^Параметры фигуры будут переданы вторым аргументом метода (params)^^
••••

••••
![ico-20 speach] Поскольку у каждого элемента  svg  свой набор атрибутов, создаем свойство  **_attrs_** (объект), свойства которого будут именами svg-элементов, а значения - массивом атрибутов каждого svg-элемента
При создании svg-элемента его атрибуты будут установлены с помощью метода  **_setAttribute()_**
••••

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

•••• none
![ico-20 speach] Вызов метода **_drawFigure()_** создаст элемент &lt;line> и вернет ссылку на него,
но этот элемент не отобразится на странице, поскольку в массиве **_attrs.line_** нет атрибута _stroke_, задающего цвет линии.

••••

•••• none
![ico-20 speach] Чтобы увидеть этот элемент на странице, нам приходится устанавливать значение атрибута _stroke_ после вызова метода **_drawFigure()_**:

••••

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

___________________________________________________

#### ![ico-20 icon] Дочерний класс⟪Subclass⟫

![ico-20 speach] Теперь создадим дочерний класс **~ColoredFigures~**, расширяющий функционал родительского класса **~DrawFigures~** путем добавления 
• атрибутов линий и заливки фигур (~stroke~, ~style~, ~fill~)
• метода удаления элемента **~erase~**



![ico-20 speach] В конструкторе дочернего класса вызовем метод **~super()~**, чтобы был создан контейнер &lt;svg> с нужными размерами,

и объявим свойство экземпляра  **~figures~**.

••••
![ico-20 speach] Метод **_super()_** должен быть вызван первым в конструкторе, поскольку до его вызова  значение _this_  не будет определено.
••••


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

___________________________________________________

## ![ico-25 hw] Тесты⟪Tests⟫

♣♣♣♣
? Какое из следующих утверждений верно для Class Expression?

+ Оно может быть как именованным, так и безымянным, и не подвергается hoisting.
= Верно! Выражение класса может быть анонимным или иметь имя, доступное только внутри самого класса. До своей строки класс находится в зоне недоступности (temporal dead zone), и обращение к нему даёт **ReferenceError**.

- Оно обязательно должно иметь уникальное имя в глобальной области видимости.
= Неверно. Class Expression может быть абсолютно анонимным.

- Оно автоматически всплывает (hoisted) в самый верх области видимости.
= Неверно. Классы (как декларации, так и выражения) находятся в зоне недоступности (temporal dead zone) до момента их инициализации в коде.

- Его нельзя присвоить переменной или передать в качестве аргумента функции.
= Неверно. Главная особенность Class Expression — это возможность присваивать его переменным и передавать куда угодно как обычное значение.

? Какой специальный символ используется в синтаксисе современного JS для объявления по-настоящему приватных свойств и методов внутри класса?

- Ключевое слово **private** перед именем свойства.
= Неверно. В JavaScript для инкапсуляции не используется ключевое слово **private** на уровне синтаксиса полей.

- Символ подчеркивания **_** в начале имени.
= Неверно. Подчеркивание **_** — это лишь традиционное соглашение (convention) среди разработчиков, которое никак не запрещает доступ к свойству извне.

+ Символ решетки **#** в начале имени свойства или метода.
= Верно! Префикс **#** делает поля и методы действительно приватными на уровне движка JavaScript.

- Символ доллара **$** перед именем.
= Неверно. Символ **$** не имеет специального встроенного значения для приватности в классах (хотя иногда используется в библиотеках вроде jQuery).

? Какое утверждение о статических методах (**static**) в классах JavaScript является верным?

- Статические методы автоматически копируются в каждый новый созданный экземпляр класса.
= Неверно. Статические методы принадлежат самому классу-конструктору, а не его отдельным экземплярам.

+ Статические методы вызываются на самом классе, а не в его экземплярах, и **_this_** внутри них ссылается на конструктор класса.
= Верно! Вы вызываете их через имя класса (_Class.method()_), а ключевое слово **_this_** внутри статического метода указывает на сам класс.

- Статические методы невозможно вызывать, если в коде не создан хотя бы один экземпляр класса.
= Неверно. Напротив, статические методы существуют независимо от создания каких-либо экземпляров.

- Статические методы по умолчанию всегда являются приватными.
= Неверно. По умолчанию статические методы публичны, если явно не указан символ **#** перед их именем.

? Что произойдёт, если оторвать метод обычного класса от экземпляра и вызвать его как обычную функцию (например, const fn = instance.method; fn())?

- **_this_** внутри метода автоматически останется привязанным к экземпляру класса.
= Неверно. При отделении метода от объекта метод теряет ссылку на свой исходный объект («потеря контекста»).

- Возникнет ошибка синтаксиса ещё на этапе компиляции скрипта.
= Неверно. Синтаксически передача метода как функции абсолютно корректна, проблема проявится только во время выполнения.

- **_this_** внутри метода всегда будет указывать на глобальный объект **window** во всех режимах выполнения.
= Неверно. Тела классов в JS всегда выполняются в строгом режиме (_strict mode_), поэтому при потере контекста **_this_** не становится ссылкой на глобальный объект.

+ **_this_** внутри метода потеряет контекст и в строгом режиме станет равным **_undefined_**.
= Верно! Поскольку классы работают в _strict mode_, при вызове метода как обычной функции значение **_this_** теряется и становится **_undefined_**, что приведет к исключению при попытке обратиться к свойствам через **_this_**.

? Где в современном синтаксисе JS разрешено объявлять публичные поля экземпляра класса?

+ Напрямую в теле класса (вне методов и конструктора).
= Верно! Стандарт **Class Fields** позволяет объявлять публичные свойства прямо в теле класса без использования this и конструктора.

- Только внутри метода _constructor_ с обязательным указанием ключевого слова **_this_**.
= Неверно. Хотя исторически это делалось именно так, современный синтаксис позволяет выносить инициализацию полей наружу из конструктора.

- Исключительно в прототипе класса после его полного объявления через точку.
= Неверно. Свойство на _prototype_ — это одно значение сразу на все экземпляры, а не поле конкретного экземпляра, и к синтаксису полей класса отношения не имеет.

- Только внутри специального статического блока **_static_** {}.
= Неверно. Статический блок предназначен для инициализации статических переменных класса, а не публичных полей экземпляра.

♣♣♣♣

## ![ico-25 hw] Квест⟪Quest⟫

♠♠♠♠ Клик по кнопке должен менять надпись на ней самой, но обработчик теряет контекст. Почини его.
class CustomButton {
  constructor (label) {
    this.label = label
    this.clicks = 0
    
    this.elem = document.createElement('button')
    this.elem.textContent = this.label
    
    this.elem.addEventListener('click', this.handleClick)
    document.body.appendChild(this.elem)
  }

  handleClick () {
    this.clicks++
    this.textContent = `Clicked: ${this.clicks}`
  }
}

const btn = new CustomButton('Click me!')
???
? 2 | кнопка появилась на странице
document.querySelector('button') !== null

? 4 | клик увеличивает счётчик
document.querySelector('button').click()
btn.clicks === 1

? 4 | надпись меняется на самой кнопке
document.querySelector('button').textContent === 'Clicked: 1'

? 2 | контекст связан полем-стрелкой, а не bind
/handleClick\s*=\s*[(\w$]/.test(SOURCE) && !/\.bind\s*\(/.test(SOURCE)
♠♠♠♠

___________________________________________________

[![ico-30 hw] Quiz](quiz/classes)
