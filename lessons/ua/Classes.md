# ![ico-30 study] Класи⟪Classes⟫

**ES6 (ECMAScript 2015)**

••Проксі для спрощення роботи з прототипною моделлю успадкування••

Оскільки прототипна модель успадкування базується на функції (конструкторі), то проксі-об’єкт **~class~** є, по суті, обгорткою для цієї функції-конструктора.

^^Ця оболонка значно полегшує побудову досить складних ланцюжків успадкування завдяки простішому та зручнішому інтерфейсу проксі-об’єкта.^^

^^Однак слід пам’ятати, що це всього лише 'целофан', у який загорнули той самий конструктор.^^

___________________________________________________

## ![ico-25 icon] Синтаксис⟪Syntax⟫

![ico-20 memo] «Тіло» класу завжди укладено в фігурні дужки ~{...}~.

~~~js
class User {
  ...
}
~~~

••![ico-20 warn] **_strict mode_**<br/>Код усередині тіла класу завжди виконується в строгому режимі<br/>(навіть якщо ви не використовували директиву _use strict_).••

![ico-20 memo] У фігурних дужках, як правило, оголошується конструктор:

~~~js
class User {
  constructor () {
    ...
  }
}
~~~

•••• pin
![ico-20 memo] До 2022 року в стандарті мови не було синтаксису для оголошення властивостей у тілі класу. Усі власні властивості мали створюватися виключно всередині **_constructor()_**.
![ico-20 memo] З появою специфікації **Class Fields** правила розширилися. Тепер будь-яка змінна (властивість), оголошена безпосередньо в тілі класу без ключового слова _static_, автоматично стає власною властивістю кожного створюваного екземпляра. «Під капотом» движок сам «переносить» ці оголошення в конструктор і виконує їх у момент виклику _new_ перед вашим кодом.
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

### ![ico-20 icon] Приватні властивості⟪Private_class_fields⟫

••Символ **_#_** перед іменем властивості або методу оголошує його приватним (_Private class fields_). Це стандартний синтаксис **ES2022**.••

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

![ico-25 warn] Зверніть увагу, що для оголошення власної приватної властивості екземпляра ми попередньо декларуємо її в тілі класу (**~#status~**).<br/>^^На відміну від звичайних властивостей, які можуть динамічно додаватися до об’єкта в будь-який момент, приватні властивості жорстко прив’язані до структури класу.<br/>Движок JavaScript повинен заздалегідь (ще на етапі компіляції коду) точно знати, які приватні властивості має клас, щоб гарантувати безпеку доступу та оптимізувати швидкість роботи коду.<br/>^^

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

^^![ico-25 warn] Не намагайтеся відтворити цей код в консолі браузера або у фрагменті коду, оскільки DevTools виконує його в спеціальному розширеному режимі налагодження (REPL-контексті). У цьому режимі браузер навмисно вимикає синтаксичні обмеження щодо приватних полів.<br/>![ico-25 bash] Якщо ви просто введете в терміналі команду **~node~** і натиснете Enter, ви потрапите в інтерактивний режим (як консоль браузера). Там можна вводити будь-який код по рядках, а щоб вийти, двічі натисніть Ctrl + C.^^

___________________________________________________

### ![ico-25 icon] Властивості та методи класу⟪Class_properties_and_methods⟫

Усе, що оголошується в тілі класу, розподіляється на чотири категорії залежно від синтаксису:

•••• none
![ico-20 pin] Власні властивості екземпляра (_Instance fields_): звичайні змінні (наприклад, age = 25), оголошені поза конструктором. Вони створюються індивідуально для кожного нового об’єкта в момент його створення.
![ico-20 pin] Прототипні методи (_Prototype methods_): звичайні функції, оголошені в тілі класу. Вони зберігаються в єдиному екземплярі в prototype класу задля економії пам’яті, а об’єкти отримують до них доступ через ланцюжок прототипів.
![ico-20 pin] Приватні елементи (_Private fields/methods_): властивості та методи, що починаються з **_#_**. Доступні лише коду всередині фігурних дужок цього класу. Кожен екземпляр має свої власні приватні властивості.
![ico-20 pin] Статичні елементи (_Static fields/methods_): оголошуються з ключовим словом **_static_**. Вони є власністю самого класу (конструктора). Доступ до них можливий лише через <Ім’яКласу>.<властивість> (як, наприклад, метод _Object.keys()_ та інші статичні методи конструктора **Object**).
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
  publicField = 'Я належу до екземпляра'

  #privateField = 'Я прихований усередині екземпляра'

  static staticField = 'Я належу до самого класу Demo'

  constructor (name) {
    this.name = name
  }

  publicMethod () {
    return `Доступ до приватного поля: ${this.#privateField}`
  }

  static staticMethod () {
    return 'Мене викликають як Demo.staticMethod()'
  }
}
~~~

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> class Demo {
...   publicField = 'Я належу до екземпляра'
...
...   #privateField = 'Я прихований усередині екземпляра'
...
...   static staticField = 'Я належу до самого класу Demo'
...
...   constructor(name) {
...     this.name = name
...   }
...
...   publicMethod () {
...     return `Доступ до приватного поля: ${this.#privateField}`
...   }
...
...   static staticMethod () {
...     return 'Мене викликають як Demo.staticMethod()'
...   }
... }
< undefined
> const instance = new Demo('Test')
< undefined
> instance
< Demo { publicField: 'Я належу до екземпляра', name: 'Test' }
> instance.publicMethod()
< 'Доступ до приватного поля: Я прихований усередині екземпляра'
> Demo.staticMethod()
< 'Мене викликають як Demo.staticMethod()'
> Demo.staticField
< 'Я належу до самого класу Demo'
~~~

___________________________________________________

## ![ico-25 icon] Порядок ініціалізації⟪Initialisation_process⟫

Під час створення екземпляра движок виконує ініціалізацію суворо зверху вниз, але у два чіткі етапи. Код, написаний у тілі класу, завжди виконується раніше, ніж тіло самого **~constructor~**.
**Етап 1**: Движок створює в пам’яті порожній об’єкт (майбутній екземпляр) і відразу починає ініціалізувати властивості, оголошені в тілі класу, у порядку їх написання:

Розглянемо порядок ініціалізації полів класу на попередньому прикладі 3.

•••• none

1. Виділяється прихований слот і записується приватна властивість **_#privateField_**;
2. Створюється власна публічна властивість **_publicField_** із значенням  '**Я належу до екземпляра**'

••••

**Етап 2**: Виконання конструктора
Лише після того, як усі поля з тіла класу успішно створено в екземплярі, движок переходить до виконання коду всередині функції constructor:

•••• none
3. Виконується рядок _this.name = name_, додаючи екземпляру ще одну власну властивість.
••••

Щоб це довести, зробимо так: замість того, щоб просто присвоювати властивостям рядкові значення, будемо викликати функцію ~getValue()~, яка виводитиме в консоль ім’я змінної, що ініціалізується.

♦♦♦4♦♦♦

~~~js
function getValue (stepName) {
  console.log(`-> Виконується: ${stepName}`)
  return 'значення'
}
~~~

♦♦♦5♦♦♦

~~~js
class TestOrder {
  firstField = getValue('Поле класу (firstField)')

  constructor () {
    getValue('Код у конструкторі')
    this.secondField = 'створено в конструкторі'
  }

  thirdField = getValue('Поле класу (thirdField)')
}

const instance = new TestOrder()
~~~

Це дозволить відстежити порядок ініціалізації змінних.

~~~bash
$ node
Welcome to Node.js v22.11.0.
Type '.help' for more information.
> function getValue(stepName) {
...   console.log(`-> Виконується: ${stepName}`)
...   return 'значення'
... }
< undefined
> class TestOrder {
...   firstField = getValue('Поле класу (firstField)')
...
...   constructor() {
...     getValue('Код у конструкторі')
...     this.secondField = 'створено в конструкторі'
...   }
...
...   thirdField = getValue('Поле класу (thirdField)')
... }
< undefined
> const instance = new TestOrder()
< -> Виконується: Поле класу (firstField)
< -> Виконується: Поле класу (thirdField)
< -> Виконується: Код у конструкторі
< undefined
~~~

Це дозволить відстежити порядок ініціалізації змінних.

___________________________________________________

## ![ico-25 icon] Class expression⟪Class_expression⟫

Оголошення класів за допомогою _Class Expression_ працює аналогічно до _Function Expression_. Цей синтаксис робить класи «першокласними громадянами» (**First-Class Citizens**) у JS — їх можна динамічно передавати у функції, повертати з них або присвоювати змінним.
Головна відмінність полягає в області видимості імені класу та зручності налагодження.

### ![ico-20 icon] Анонімний класовий вираз⟪Anonymous_class_expression⟫

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

**Ім'я класу**: Цей клас не має власного внутрішнього імені. Однак сучасні JS-двигуни досить розумні: вони автоматично беруть ім'я зі змінної, в якій записано клас (~User.name === “User”~).
**Де доступно**: Лише через змінну ~User~.

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

### ![ico-20 icon] Іменований класовий вираз⟪Named_class_expression⟫

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

**Ім’я класу**: Властивість **~name~** тепер жорстко прив’язана до внутрішнього імені: ~User.name === “Human”~.
**Область видимості імені**: Ім’я **~Human~** доступне лише всередині самого тіла класу (у конструкторі або методах). Ззовні викликати ~new Human()~ не можна — ви отримаєте **_^^ReferenceError^^_**. Ззовні цей клас доступний виключно за іменем **~User~**.

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

На перший погляд, створення двох різних імен (**~User~** зовні та **~Human~** всередині) здається заплутаним, але цей підхід має дві важливі практичні цілі:

^^^[Відладження та стек викликів]
^^Якщо всередині конструктора або методу трапиться помилка, у консолі браузера ви побачите чітке ім’я класу.^^
![ico-20 paperclip] ^^Для анонімного класу у складних ланцюжках або під час передачі в інші модулі у стеку помилок може відображатися ~&lt;anonymous>~.^^
![ico-20 paperclip] ^^Для іменованого класу в логах завжди буде вказано конкретну назву: **~Human.constructor~** або **~Human.myMethod~**.^^

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

^^^[Рекурсія та статичні властивості]
^^Якщо вам усередині класу потрібно звернутися до його власних статичних методів або рекурсивно викликати конструктор, використання внутрішньої назви **~Human~** захищає код від зовнішніх змін.^^
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

Для створення обчислюваних властивостей потрібно використовувати геттери та сеттери.
![ico-20 memo] За допомогою ключового слова **~get~** можна оголосити геттер, який повертає значення обчислюваної властивості.
![ico-20 memo] За допомогою ключового слова **~set~** можна оголосити сеттер, який змінює значення властивості.

•••• none
^^Геттер викликатиметься щоразу при зверненні до властивості екземпляра.^^
^^Сеттер викликатиметься щоразу, коли ідентифікатор обчислюваної властивості буде в лівій частині оператора присвоєння.^^
••••

Розглянемо приклад класу **~Canvas~** із обчислюваною властивістю **~history~**:

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
          console.error('Неприпустиме значення.')
          return
        }

        const tmp = newHistory
          .filter(item => item.path && Array.isArray(item.path))

        if (!tmp.length) {
          console.error('canvas.history — це масив об’єктів з обов’язковою властивістю `path`.')
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

Створимо екземпляр цього класу та виведемо його в консоль:

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

У екземпляра з’явилася власна обчислювана властивість **~history~**.
Перевіримо роботу сеттера цієї властивості, присвоївши значення обчислювальній властивості:

~~~js
canvas.history = [
  { path: [{ x: 150, y: 250 }, { x: 350, y: 50 }], lineColor: 'red' },
  { path: [{ x: 350, y: 50 }, { x: 100, y: 250 }], lineColor: 'green' },
  '***',
  { val: '***' }
]
~~~

Ми навмисно передаємо сеттеру некоректні дані, що не відповідають схемі даних об’єкта **~history~**. Тепер перевіримо, яке значення матиме ця властивість, тобто скористаємося геттером:

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

Чудово, наш сеттер відфільтрував отримані значення, запобігаючи потраплянню сміття до масиву **~history~**.

Спробуємо виконати присвоєння, передаючи некоректні значення:

~~~demo
> canvas.history = 'History'
! Неприпустиме значення.
> canvas.history = ['***']
! canvas.history — це масив об’єктів з обов’язковою властивістю `path`.
~~~

Сеттер обчислюваної властивості не дозволив нам зіпсувати дані, і в консолі ми побачимо виняток:

Оскільки **~history~** — це посилальний тип даних, а посилання — це відмичка, перевіримо, що після отримання геттером посилання на **~history~** ми не зможемо його пошкодити:

~~~demo
> canvas.history.push({ x: 10, y: 20 })
! Uncaught TypeError: Cannot add property 2, object is not extensible
> canvas.history.pop()
! Uncaught TypeError: Cannot delete property '1' of [object Array]
~~~

___________________________________________________

## ![ico-25 icon] Втрата контексту⟪Loss_of_context⟫

![ico-20 pin] У строгому режимі не відбувається неявної передачі контексту виклику.

![ico-25 pin] Втрата контексту (~undefined~) відбувається внаслідок того, що весь код усередині тіла класу виконується в **~strict mode~**, хоча явного вказівки 'use strict' у коді класу немає.

•••• none
За відсутності явного вказівника на об’єкт, що викликає метод
у строгому режимі **_this_** не буде посиланням на глобальний об’єкт _window_.
У строгому режимі **_this_** буде **_undefined_**.
••••

Повернемося до прикладу 8:

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

![ico-20 warn] Втрата контексту відбувається завжди, якщо посилання на метод передається в нову змінну:

~~~demo
> const drawLine = picture.drawLine
< undefined
> drawLine([{ x: 50, y: 50 }, { x: 250, y: 250 }])
! Uncaught TypeError: Cannot read property 'area' of undefined
~~~

Оголосимо метод **~drawLine~** за допомогою стрілкової функції:

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

Тепер контекст виклику успадкованого методу **~drawLine~** визначається в момент створення екземпляра, і змінити його вже неможливо.
А в момент створення екземпляра, як ми вже знаємо, контекст виклику буде посиланням на екземпляр, що створюється.

Після виклику функції **~test~** лінія на полотні буде намальована.

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
У цьому прикладі контекст втрачається у функції **_setProp()_**,  оголошеній усередині методу **_addProperties_**
(внутрішня функція не успадковує контекст виклику батьківської функції).
••••

Внесемо деякі зміни до коду прикладу: перетворимо **~setProp()~** на стрілкову функцію:

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

Стрілкова функція **~setProp()~** оголошена всередині методу **~addProperties~**, контекст виклику якого — це посилання на екземпляр. У момент оголошення стрілкова функція отримує контекст виклику від методу **~addProperties~**, і цей контекст уже неможливо змінити.

~~~demo
> const user = new User('Piter')
< undefined
> user.addProperties([{ name: 'country', value: 'UA' }])
< undefined
> user
< ► User {name: 'Piter', country: 'UA'}
~~~

___________________________________________________

## ![ico-25 icon] Спадкування⟪Inheritance⟫

### ![ico-20 icon] extends⟪extends⟫

Ключове слово **~extends~** використовується для створення дочірнього класу.

•••• none
![ico-20 smile] Пекельна робота зі створення ланцюжка прототипів залишилася в минулому. <br />Більше не потрібно вручну виконувати безліч маніпуляцій за допомогою _Object.create_ та _Object.setPrototypeOf_.<br />Більше не потрібно ламати голову над тим, чому у дочірнього класу зникає властивість _prototype.constructor_ і чому не успадковуються статичні властивості батьківського класу.
Ключове слово **_extends_** робить процес створення ланцюжка прототипів декларативним, безпечним і монолітним, перетворюючи складне низькорівневе «ручне» складання на лаконічну та зрозумілу конструкцію. <br />Синтаксис **_extends_** приховує під капотом одразу кілька обов’язкових кроків, які при використанні _Object.create_ або _Object.setPrototypeOf_ доводиться писати самостійно.
••••

^^^[]
![ico-20 warn] ^^~Object.create~ пов’язує лише прототип нащадка та прототип батька. Статичні методи батька автоматично не успадковуються дочірнім класом.^^
![ico-20 warn] ^^Використання ~Object.setPrototypeOf~ для зміни прототипу вже створеного об’єкта — це вкрай повільна операція в JS. Вона порушує внутрішні оптимізації движка (hidden classes) для всіх подальших операцій із цим об’єктом.^^
![ico-20 warn] ^^При перезаписі прототипу за допомогою ~Object.create(Parent.prototype)~ властивість ~Child.prototype.constructor~ повністю стирається. Якщо її не відновити вручну, перевірка ~instance.constructor~ помилково повертатиме ~Parent~.^^
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

![ico-25 warn] ^^Зверніть увагу, що в конструкторі класу насамперед за допомогою **~super()~** ми викликаємо конструктор батьківського класу.^^

^^Створимо екземпляр класу **Provider**^^

~~~js
let provider = new Provider
~~~

^^Подивимося на ланцюжок прототипів:^^

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

^^Тепер протестуємо екземпляр:^^

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
(що відповідає прототипній моделі успадкування — ми отримали ланцюжок прототипів).
••••

___________________________________________________

### ![ico-20 icon] super⟪super⟫

Методи батьківського класу доступні в дочірньому класі за допомогою ключового слова **~super~**.

^^![ico-20 speach] Розширимо успадкований метод **~drawLine()~**  батьківського класу, додавши аргумент **_~lineWidth~_** (товщину лінії)^^

^^![ico-20 speach] Для цього визначимо «розширений» метод ~drawLine()~ усередині дочірнього класу, який викликатиме метод ~drawLine()~ батьківського класу за допомогою ключового слова **~super~**:^^



~~~js
super.drawLine(points)
~~~

^^Тепер код буде таким:^^

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

^^![ico-20 speach] Створимо екземпляр дочірнього класу:^^

~~~js
let newCanvas = new ExtendedCanvas()
~~~

^^![ico-20 speach] і викличемо його метод  **~drawLine()~**^^

~~~js
newCanvas.drawLine([{ x: 20, y: 20 }, { x: 300, y: 400 }], '#ffaa00', 10)
~~~

^^![ico-20 speach] Тепер лінія буде відтворюватися із заданою товщиною.^^

___________________________________________________

### ![ico-20 icon] super()⟪super⟫

У попередніх прикладах ми не використовували конструктор класу, що успадковує

![ico-20 warning] Коли потрібно додати власні властивості до екземпляра класу, що успадковує, без конструктора це зробити неможливо.

![ico-20 warning] Перше, що потрібно виконати у конструкторі класу, що успадковується, — викликати метод **~super()~**

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

В іншому разі буде згенеровано виняток:

~~~console
! Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

___________________________________________________


^^![ico-25 pin] Ключевое слово **~super~** работает и без классов — в обычных
объектах, через их прототип. Это отдельная тема, и она вынесена на свою
страницу:^^

[%%%super в литералах объектов%%%](page/super-in-object-literals)

## ![ico-25 icon] static⟪static⟫

Статичні методи класу оголошуються за допомогою ключового слова **~static~**.

•••• warn
![ico-25 warn] Ці методи можуть бути викликані лише як методи класу
![ico-25 warn] Усередині статичного методу **_this_** вказує на конструктор класу, а не на екземпляр.
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

У цьому прикладі статичний метод **~createCanvas~** класу **~Canvas~** створює та вставляє в тіло документа полотно canvas, а також додає до нього слухач події **~resize~**.
Після створення екземпляра та встановлення слухача події **~resize~** глобального об’єкта ~window~ створений екземпляр реагуватиме на зміну ширини вікна браузера.

~~~js
const picture = new Canvas()
window.onresize = function () {
  picture.canvas.dispatchEvent(new Event('resize'))
}
~~~

Давайте трохи вдосконалимо цей приклад. Додамо до класу **~Canvas~** статичну властивість **~instances~**, у якій реєструватимуться всі створені екземпляри, а також статичну властивість **~listener~**, яка прийматиме значення ~true~, якщо слухач події ~resize~ встановлено для глобального об’єкта ~window~.
Також додамо до класу **~Canvas~** статичний метод **~setListener~**, який встановлює слухач події ~resize~ для глобального об’єкта ~window~, якщо статична властивість **~listener~** має значення ~false~.

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

Зверніть увагу, що слухач події ~resize~ глобального об’єкта ~window~, який встановлюється за допомогою статичного методу класу **~setListener~**, створює та розповсюджує подію ~resize~ для всіх зареєстрованих екземплярів класу **~Canvas~**.
У конструкторі екземпляра ми реєструємо його у статичній властивості класу **~instances~** і викликаємо статичний метод класу **~createCanvas~**, який створює полотно ~canvas~ та додає до нього слухач події ~resize~.
![ico-25 warn] У наведеному вище прикладі існує серйозна небезпека витоків пам’яті.

^^^[Витоки пам'яті]

Для повноцінної реєстрації об’єктів у реєстрі класу з можливістю їх обходу без витоків пам’яті використовується **~FinalizationRegistry~** разом із ~Set~ та **~WeakRef~**. Це дозволяє автоматично видаляти посилання на об’єкти з реєстру, щойно їх видалить збирач сміття.
^^Щоб екземпляр Canvas міг бути видалений збирачем сміття, потрібно:<br/>• Викликати метод очищення (видалити елемент із DOM-дерева);<br/>• Встановити нульове значення (null) для всіх змінних, які посилаються на цей екземпляр.^^


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
    console.log('Об’єкт було видалено з пам’яті, реєстр очищено!')
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

Коли метод **_~resizeCanvas()~_** буде викликано з конструктора, він виведе в консоль:

••name: 'Canvas'••

Змініть розмір вікна браузера
Тепер метод **_~resizeCanvas()~_** буде викликано в глобальній області видимості,
і в консоль буде виведено:

••name: ''••

оскільки  ~this~  всередині **_~resizeCanvas()~_** тепер вказує
на глобальний об’єкт  (~window~)

___________________________________________________

## ![ico-25 cap] Приклад⟪Example⟫

У цьому прикладі ми будемо працювати з графікою [svg](external/svg)

#### ![ico-20 icon] createElementNS()⟪createElementNS⟫

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
console.log(svg.namespaceURI)  // 'http://www.w3.org/1999/xhtml'

const picture = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
console.log(picture.namespaceURI)  // 'http://www.w3.org/2000/svg'
~~~

**Valid Namespace URIs:**

![ico-20 green-ok] **HTML** - http://www.w3.org/1999/xhtml
![ico-20 green-ok] **SVG** - http://www.w3.org/2000/svg

___________________________________________________

#### ![ico-20 icon] Базовий клас⟪Base_class⟫

Створимо клас **~DrawFigures~**, який буде створювати елемент **svg**
з двома методами: **~setSize()~** та **~drawFigure()~**

•••• none
![ico-20 speach] Метод **_setSize()_** змінюватиме розміри елемента  svg
![ico-20 speach] Метод **_drawFigure()_** додаватиме елементи до контейнера  svg
^^Ім'я елемента буде передано першим аргументом методу  (figure)^^
^^можливі значення  «line», «circle», “path”, «rect» тощо^^
^^Параметри фігури будуть передані другим аргументом методу (params)^^
••••

••••
![ico-20 speach] Оскільки кожен елемент  svg  має власний набір атрибутів, створюємо властивість  **_attrs_** (об’єкт), властивості якої будуть іменами svg-елементів, а значення — масивом атрибутів кожного svg-елемента
Під час створення svg-елемента його атрибути будуть встановлені за допомогою методу **_setAttribute()_**
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

Перевірити роботу класу можна так:

~~~js
const sample = new DrawFigures(300, 300)
sample
  .drawFigure('line', { x1: 10, y1: 20, x2: 250, y2: 250 })
  .setAttribute ('stroke', 'red')
~~~

•••• none
![ico-20 speach] Виклик методу **_drawFigure()_** створить елемент &lt;line> і поверне посилання на нього,
але цей елемент не відобразиться на сторінці, оскільки в масиві  **_attrs.line_** немає атрибута _stroke_, що задає колір лінії.

••••

•••• none
![ico-20 speach] Щоб побачити цей елемент на сторінці, нам доводиться встановлювати значення атрибута _stroke_ після виклику методу **_drawFigure()_**:

••••

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

___________________________________________________

#### ![ico-20 icon] Дочірній клас⟪Subclass⟫

![ico-20 speach] Тепер створимо дочірній клас **~ColoredFigures~**, який розширює функціонал батьківського класу **~DrawFigures~** шляхом додавання
• атрибутів ліній і заливки фігур (~stroke~, ~style~, ~fill~)
• методу видалення елемента  **~erase~**



![ico-20 speach] У конструкторі дочірнього класу викличемо метод **~super()~**, щоб було створено контейнер &lt;svg> з потрібними розмірами,

і оголосимо властивість екземпляра  **~figures~**.

••••
![ico-20 speach] Метод **_super()_** має бути викликаний першим у конструкторі, оскільки до його виклику значення _this_ не буде визначено.
••••


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

___________________________________________________

## ![ico-25 hw] Тести⟪Tests⟫

♣♣♣♣
? Яке з наведених нижче тверджень є правильним щодо Class Expression?

+ Воно може бути як іменованим, так і безіменним, і не підлягає hoisting.
= Правильно! Вираз класу може бути анонімним або мати ім’я, доступне лише всередині самого класу. До моменту виклику класу він перебуває в зоні недоступності (temporal dead zone), і звернення до нього призводить до помилки **ReferenceError**.

- Воно обов’язково має мати унікальне ім’я в глобальній області видимості.
= Неправильно. Class Expression може бути абсолютно анонімним.

- Він автоматично переміщується (hoisted) у найвищу частину області видимості.
= Неправильно. Класи (як декларації, так і вирази) перебувають у зоні недоступності (temporal dead zone) до моменту їхньої ініціалізації в коді.

- Його не можна присвоїти змінній або передати як аргумент функції.
= Неправильно. Головна особливість Class Expression — це можливість присвоювати його змінним і передавати куди завгодно як звичайне значення.

? Який спеціальний символ використовується в синтаксисі сучасного JS для оголошення справді приватних властивостей і методів усередині класу?

- Ключове слово **private** перед іменем властивості.
= Неправильно. У JavaScript для інкапсуляції не використовується ключове слово **private** на рівні синтаксису полів.

- Символ підкреслення **_** на початку імені.
= Неправильно. Підкреслення **_** — це лише традиційна домовленість (convention) серед розробників, яка жодним чином не забороняє доступ до властивості ззовні.

+ Символ решітки **#** на початку імені властивості або методу.
= Правильно! Префікс **#** робить поля та методи дійсно приватними на рівні движка JavaScript.

- Символ долара **$** перед іменем.
= Неправильно. Символ **$** не має спеціального вбудованого значення для приватності в класах (хоча іноді використовується в бібліотеках на кшталт jQuery).

? Яке твердження щодо статичних методів (**static**) у класах JavaScript є правильним?

- Статичні методи автоматично копіюються в кожен новий створений екземпляр класу.
= Неправильно. Статичні методи належать самому класу-конструктору, а не його окремим екземплярам.

+ Статичні методи викликаються безпосередньо в класі, а не в його екземплярах, і **_this_** всередині них посилається на конструктор класу.
= Правильно! Ви викликаєте їх через ім’я класу (_Class.method()_), а ключове слово **_this_** всередині статичного методу вказує на сам клас.

- Статичні методи неможливо викликати, якщо в коді не створено хоча б один екземпляр класу.
= Неправильно. Навпаки, статичні методи існують незалежно від створення будь-яких екземплярів.

- Статичні методи за замовчуванням завжди є приватними.
= Неправильно. За замовчуванням статичні методи є публічними, якщо явно не вказано символ **#** перед їхнім іменем.

? Що станеться, якщо відокремити метод звичайного класу від екземпляра та викликати його як звичайну функцію (наприклад, _const fn = instance.method; fn()_)?

- **_this_** усередині методу автоматично залишиться прив’язаним до екземпляра класу.
= Неправильно. При відокремленні методу від об’єкта метод втрачає посилання на свій вихідний об’єкт («втрата контексту»).

- Виникне синтаксична помилка ще на етапі компіляції скрипта.
= Неправильно. Синтаксично передача методу як функції є цілком коректною, проблема проявиться лише під час виконання.

- **_this_** усередині методу завжди вказуватиме на глобальний об’єкт **window** у всіх режимах виконання.
= Неправильно. Тіла класів у JS завжди виконуються у строгому режимі (_strict mode_), тому при втраті контексту **_this_** не стає посиланням на глобальний об’єкт.

+ **_this_** всередині методу втратить контекст і в строгому режимі стане рівним **_undefined_**.
= Правильно! Оскільки класи працюють у _strict mode_, під час виклику методу як звичайної функції значення **_this_** втрачається і стає **_undefined_**, що призведе до винятку при спробі звернутися до властивостей через **_this_**.

? Де в сучасному синтаксисі JS дозволено оголошувати публічні поля екземпляра класу?

+ Безпосередньо в тілі класу (поза методами та конструктором).
= Правильно! Стандарт **Class Fields** дозволяє оголошувати публічні властивості безпосередньо в тілі класу без використання this та конструктора.

- Тільки всередині методу _constructor_ з обов’язковим зазначенням ключового слова **_this_**.
= Неправильно. Хоча історично це робилося саме так, сучасний синтаксис дозволяє виносити ініціалізацію полів назовні з конструктора.

- Виключно у прототипі класу після його повного оголошення через крапку.
= Неправильно. Властивість на _prototype_ — це одне значення, яке застосовується одразу до всіх екземплярів, а не поле конкретного екземпляра, і це не має жодного стосунку до синтаксису полів класу.

- Тільки всередині спеціального статичного блоку **_static_** {}.
= Неправильно. Статичний блок призначений для ініціалізації статичних змінних класу, а не публічних полів екземпляра.

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
