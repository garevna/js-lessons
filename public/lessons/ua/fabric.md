# ![ico-30 study] Фабричні методи⟪Factory_methods⟫

@@@@
![](illustrations/douglas-crockford.jpg)
«_I think the lack of classes is one of JavaScript's great strengths_» <hr /> [Douglas Crockford](external/crockford)
@@@@

☼☼☼ Просто скажи «new», і (майже) кожна функція поверне об’єкт. ☼☼☼

Ключове слово **~new~** перед викликом функції перетворює цю функцію на конструктор, і результатом такого виклику завжди буде об’єкт, незалежно від того, чи є в тілі функції оператор ~return~.

Строго кажучи, конструктор об’єкт не створює: його створює оператор **~new~** — одразу з прототипом **~F.prototype~** — і передає функції як **~this~**. Функція його лише заповнює.

Якщо вона робить це без використання ключового слова **_~new~_**, то така функція є **фабрикою**:

~~~js
const creator = (name, age) => ({ name, age })
~~~

У цьому прикладі ми використовуємо стрілкову функцію, а вона не може бути конструктором узагалі: у неї немає внутрішнього методу **[[Construct]]**, і виклик із **~new~** кине **~TypeError~**. Властивості **~prototype~** у неї теж немає, але річ не в ній: звичайна функція, в якої ~prototype~ відібрали, викликається з ~new~ як ні в чому не бувало.
Вона є фабрикою, тому що повертає об’єкт.
І цей об’єкт нічого не знатиме про функцію **~creator~**. Він буде екземпляром **~Object~**.

![ico-20 warn] Функція не може бути одночасно і фабрикою, і конструктором. А може не бути ні тим, ні іншим: колбек або функція, яка щось обчислює, — просто функції. Фабрикою чи конструктором її робить не оголошення, а те, що вона повертає і як її викликають.
Доведемо першу частину.

Необхідною, але недостатньою (![ico-20 warn]) умовою того, щоб функція стала фабрикою, є наявність оператора **~return~**.

◘◘![ico-25 cap] **1**◘◘

~~~js
function creator (name, age) {
  return { name, age }
}
~~~

У цьому прикладі функція **~creator~** повертає об’єкт. Чудово, подивимося, що вона поверне, якщо ми викличемо її з ключовим словом **~new~**:

~~~demo
> const user = new creator('Piter', 25)
< undefined
> user
< ► {name: 'Piter', age: 25}
> console.log(user instanceof creator)
< false
> console.log(user instanceof Object)
< true
~~~

Функція **~creator~** вже не може бути конструктором, і використання ключового слова **~new~** жодним чином не впливає на її поведінку.

Функція **~creator~** створює екземпляри конструктора **~Object~**.

___

◘◘![ico-25 cap] **2**◘◘

~~~js
function creator () {
  return Array.from(arguments)
}
~~~

У цьому прикладі функція **~creator~** повертає масив.
Але масив є об’єктом, тому функція **~creator~** приречена бути фабрикою і ніколи не зможе стати конструктором.

~~~demo
> const obj = new creator(5, 8, 7)
< undefined
> obj
< ► (3) [5, 8, 7]
> obj instanceof creator
< false
> obj instanceof Array
< true
> obj instanceof Object
< true
~~~

___

◘◘![ico-25 cap] **3**◘◘

~~~js
function simple () {
  return Math.min(...arguments)
}
~~~

Функція **~simple~** повертає число (можливо, NaN або ~Infinity~). Чи можна сказати, що вона є фабрикою? — Ні, оскільки вона повертає **не об’єкт**.
При виклику з ключовим словом **~new~** вона повертає екземпляр **~simple~**.

~~~demo
> simple(5, 8, 4, 9)
< 4
> const obj = new simple
< undefined
> obj
< ► simple {}
> obj instanceof simple
< true
~~~

Аналогічна ситуація буде у випадку, якщо функція повертає рядок, або ~null~, або ~undefined~. Можете перевірити самостійно.

Тобто функція буде фабрикою лише в тому випадку, якщо вона повертає об’єкт — будь-який: літерал, масив, функцію, — а не примітив.
___

## ![ico-20 icon] ООП-об’єкти та структури даних⟪OOP_objects_and_data_structures⟫

•••• none
^^_Роберт Мартін, «Чистий код»:_^^

Об’єкти забезпечують поведінку та приховують дані.
Структури даних надають дані, але не мають жодної значущої поведінки.
••••

Фабрика може повернути і те, і інше. Конструктор кладе дані в **~this~**, і вони відкриті всім. Фабрика може залишити їх у замиканні й віддати назовні лише поведінку — вийде об’єкт у тому сенсі, у якому про нього говорить Мартін. Так влаштований патерн «Модуль»:

**Паттерн «_Модуль_»**

^^У цьому прикладі за допомогою IIFE та замикання створюється об’єкт, дані якого приховані від безпосереднього доступу й доступні лише через інтерфейс, представлений методом _**getVar**_^^

◘◘![ico-25 cap] **4**◘◘

~~~js
const google = (function (params, pin) {
  return {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Forbidden'
    }
  }
})({
  name: 'Google',
  token: 'A7fgh14-771pd-ufr147'
}, '789541')
~~~

~~~demo
> google
< ► {getVar: ƒ}
> google.getVar('token')
< 'Forbidden'
> google.getVar('name', '789541')
< 'Google'
~~~

IIFE тут — та сама фабрика, тільки викликана один раз, на місці. Викличте її двічі — отримаєте два об’єкти, і в кожного будуть свої приховані дані: у кожного виклику фабрики своє замикання.

___

^^У цьому прикладі те саме робить статичний метод класу _User_^^
^^Конструктор класу створює публічну властивість _name_^^
^^Фабричний метод класу _createUser_ створює екземпляр і одразу доповнює його: приховані дані лишаються в замиканні, а доступ до них дає інтерфейс — метод _**getVar**_^^

◘◘![ico-25 cap] **5**◘◘

~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }
}

User.createUser = function (name, params, pin) {
  return Object.assign(new User(name), {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Access denied'
    }
  })
}

const google = User.createUser('Google', {
  token: 'AfG78-1nm*15ph',
  cash: 25000
}, '789451')
~~~

~~~demo
> google
< ► User {name: 'Google', getVar: ƒ}
> google.getVar('token', '789451')
< 'AfG78-1nm*15ph'
> google.getVar('cash', '789451')
< 25000
> google.getVar('cash', '55555')
< 'Access denied'
~~~

___

## ![ico-25 icon] Поліморфізм⟪Polymorphism⟫

Поліморфізм — це коли той самий виклик працює з об’єктами різних видів, і кожен відповідає на нього по-своєму. Код, який викликає **~shape.area()~**, не знає й не мусить знати, коло перед ним чи квадрат. А вирішується, який саме об’єкт народиться, в одному місці — у фабриці.

◘◘![ico-25 cap] **6**◘◘

~~~js
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, area: () => size ** 2 }

  throw new TypeError(`Unknown shape: ${kind}`)
}

const shapes = [createShape('circle', 1), createShape('square', 2)]

for (const shape of shapes) {
  console.log(shape.kind, shape.area().toFixed(2))
}
~~~

~~~console
circle 3.14
square 4.00
~~~

Цикл викликає **~area()~** у кожної фігури, не питаючи, хто вона. Щоб додати трикутник, досить дописати одну гілку у фабриці — цикл міняти не треба.

___

Фабричний метод може жити й на самому конструкторі — як статичний метод. Тоді він створює екземпляри цього конструктора, але з різним набором властивостей і методів.

У наступному прикладі конструктор **~User~** має фабричний метод **~createNewUser~**, що дозволяє створювати екземпляри класу з різним набором властивостей і методів.

◘◘![ico-25 cap] **7**◘◘

~~~js
function User () {
  this.console = function (key) {
    console.log(`${key}: ${this[key]}`)
  }
  this.output = function (key) {
    for (const id of Object.keys(this[key])) {
      console.log(this[key][id])
    }
  }
}

User.createNewUser = function (params) {
  const user = new this
  for (const key in params) {
    Object.assign(user, { [key]: params[key] })
  }
  return user
}
~~~

Отримали _перелічуваний_ статичний метод **~createNewUser~** конструктора.

~~~console
▼ ƒ User()
  ► createNewUser: ƒ (params)
    length: 0
    name: "User"
  ► prototype: {constructor: ƒ}
  ► arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

Створимо з його допомогою два екземпляри класу **~User~** з різним набором властивостей і методів.

~~~demo
> const visitor = User.createNewUser({ name: 'visitor', speciality: 'dev' })
< undefined
> visitor.console('name')
< name: visitor
> visitor.console('speciality')
< speciality: dev
~~~

~~~js
const currentUser = User.createNewUser({
  name: prompt('What is your name?'),
  age: prompt('How old are you?'),
  id: Date.now(),
  posts: {},
  registered: new Date().toISOString().slice(0, 10),
  writePost: function (text) {
    this.posts = Object.assign(this.posts, {
      [Date.now()]: text
    })
  }
})
~~~

~~~demo
> currentUser.writePost('Hello, students!')
< undefined
> currentUser.writePost('I like potatoes!')
< undefined
> currentUser.output('posts')
< Hello, students!
< I like potatoes!
~~~

Екземпляри **~visitor~** і **~currentUser~** створені одним конструктором **~User~**, але властивості й методи в них різні.

___

Зробимо те саме за допомогою класу:

~~~js
class User {
  constructor () {
    this.console = function (key) {
      console.log(`${key}: ${this[key]}`)
    }
    this.output = function (key) {
      for (const id of Object.keys(this[key])) {
        console.log(this[key][id])
      }
    }
  }

  static createNewUser (params) {
    const user = new this
    for (const key in params) {
      Object.assign(user, { [key]: params[key] })
    }
    return user
  }
}
~~~

У цьому випадку статичний метод класу **~createNewUser~** буде неперелічуваним, а в іншому все буде аналогічно варіанту з конструктором

Зверніть увагу на **~new this~** усередині методу. **~this~** тут — той конструктор, у якого метод викликали. Викличте його в нащадка — і отримаєте екземпляр нащадка, хоча сам метод написано один раз, у батьківському класі. Це і є поліморфізм фабричного методу:

◘◘![ico-25 cap] **8**◘◘

~~~js
class Admin extends User {
  rights () {
    return 'all'
  }
}
~~~

~~~demo
> const admin = Admin.createNewUser({ name: 'root' })
< undefined
> admin instanceof Admin
< true
> admin.rights()
< 'all'
> admin.console('name')
< name: root
~~~

^^А «під капотом» клас — той самий конструктор, і працює те саме прототипне успадкування.^^

___

## ![ico-25 icon] Фабрика чи конструктор?⟪A_factory_or_a_constructor?⟫

![ico-20 green-ok] фабрику викликають без **~new~**, і забути його неможливо. Конструктор, викликаний без **~new~**, поверне **~undefined~**, а в нестрогому режимі ще й мовчки запише властивості в глобальний об’єкт;
![ico-20 green-ok] дані можна сховати в замиканні, а не виставляти в **~this~**;
![ico-20 green-ok] фабрика може повернути об’єкт будь-якого виду — у цьому її поліморфізм;
![ico-20 warn] **~instanceof~** про фабрику нічого не скаже: літерал, який вона повернула, — екземпляр **~Object~**;
![ico-20 warn] методи, оголошені в літералі, що повертається, у кожного об’єкта свої. Щоб вони були спільними, як в екземплярів конструктора, фабрика створює об’єкт через **~Object.create(proto)~**:

◘◘![ico-25 cap] **9**◘◘

~~~js
const proto = {
  greet () {
    return `Hi, ${this.name}`
  }
}

const make = (name) => Object.assign(Object.create(proto), { name })

const ann = make('Ann')
const bob = make('Bob')
~~~

~~~demo
> ann.greet()
< 'Hi, Ann'
> ann.greet === bob.greet
< true
> Object.keys(ann)
< ► ['name']
~~~

Метод **~greet~** в усіх об’єктів один — він лежить у прототипі, а в самих об’єктів є лише **~name~**.

___

## ![ico-25 hw] Тести⟪Tests⟫

♣♣♣♣
? Що станеться?

~~~js
const creator = (name, age) => ({ name, age })

const user = new creator('Ann', 25)
~~~

+ **~TypeError: creator is not a constructor~**
= Так. У стрілкової функції немає внутрішнього методу **[[Construct]]**, і викликати її з **~new~** не можна. Фабрикою вона бути може, конструктором — ні.

- **~user~** — **~{ name: 'Ann', age: 25 }~**
= Так було б без **~new~**. З ним до тіла функції справа не доходить.

- **~user~** — порожній екземпляр **~creator {}~**
= Ні: екземпляр стрілкової функції створити не можна взагалі.

- **~user~** — **~undefined~**
= Ні: до присвоєння справа не дійде, виклик кине виняток.

? Що надрукує код?

~~~js
function creator (name) {
  return { name }
}

const user = new creator('Ann')

console.log(user instanceof creator, user instanceof Object)
~~~

+ **~false true~**
= Так. Функція повернула об’єкт, і **~new~** віддає саме його, а не створений було екземпляр. Це літерал, він нічого не знає про **~creator~** — екземпляр **~Object~**.

- **~true true~**
= Ні: функція, яка повертає об’єкт, — фабрика, і **~new~** цього не змінює.

- **~true false~**
= Ні: будь-який об’єкт-літерал — екземпляр **~Object~**.

- **~false false~**
= Ні: літерал — екземпляр **~Object~**.

? Що буде в **~obj~**?

~~~js
function simple () {
  return 42
}

const obj = new simple()
~~~

+ порожній екземпляр **~simple {}~**
= Так. Число — примітив, і **~new~** його не помічає: він повертає екземпляр, який створив сам. Функція, що повертає примітив, фабрикою не є.

- **~42~**
= Так повернув би звичайний виклик, без **~new~**.

- **~Number {42}~**
= Ні: **~new~** не обгортає повернений примітив, він його відкидає.

- **~undefined~**
= Ні: виклик із **~new~** завжди дає об’єкт.

? Що надрукує код?

~~~js
const counter = () => {
  let n = 0
  return { next: () => ++n }
}

const a = counter()
const b = counter()

a.next()
a.next()

console.log(a.next(), b.next(), 'n' in a)
~~~

+ **~3 1 false~**
= Так. У кожного виклику фабрики своє замикання: **~a~** дорахував до трьох, **~b~** почав свій рахунок із нуля. А змінної **~n~** в об’єкта немає — вона в замиканні, ззовні до неї не дотягтися.

- **~3 4 false~**
= Ні: рахунок у **~a~** і **~b~** не спільний — кожен виклик **~counter()~** заводить свій **~n~**.

- **~3 1 true~**
= Ні: в об’єкта є лише **~next~**, а **~n~** лишилася в замиканні.

- **~1 1 false~**
= Ні: **~a.next()~** уже викликали двічі, і **~n~** пам’ятає це між викликами.

? Що надрукує код?

~~~js
class User {
  static create () {
    return new this()
  }
}

class Admin extends User {}

console.log(Admin.create() instanceof Admin)
~~~

+ **~true~**
= Так. **~this~** у статичному методі — той клас, у якого метод викликали, тут **~Admin~**. Метод написано один раз, у **~User~**, а створює він екземпляри будь-якого нащадка.

- **~false~**: метод написано в **~User~**, і він створює **~User~**
= Так було б із **~new User()~**. **~new this()~** створює екземпляр того, у кого метод викликали.

- **~TypeError~**
= Ні: статичні методи успадковуються, в **~Admin~** метод **~create~** є.

- **~undefined~**
= Ні: **~instanceof~** відповідає лише **~true~** або **~false~**.

? Що надрукує код?

~~~js
const proto = {
  greet () {
    return `Hi, ${this.name}`
  }
}

const make = (name) => Object.assign(Object.create(proto), { name })

const a = make('Ann')
const b = make('Bob')

console.log(a.greet === b.greet, Object.keys(a))
~~~

+ **~true~** і **~['name']~**
= Так. **~greet~** лежить у прототипі, один на всіх, а в самих об’єктів є лише **~name~** — **~Object.keys~** показує тільки власні властивості.

- **~false~** і **~['name']~**
= Ні: метод не копіюється в об’єкти, він один, у прототипі.

- **~true~** і **~['name', 'greet']~**
= Ні: **~greet~** не власна властивість об’єкта, а успадкована.

- **~false~** і **~['name', 'greet']~**
= Так було б, якби **~greet~** оголосили просто в літералі, який повертає фабрика.

? Що надрукує код?

~~~js
function Person (name) {
  this.name = name
}

const ann = Person('Ann')

console.log(ann)
~~~

+ **~undefined~**
= Так. Без **~new~** конструктор — звичайна функція без **~return~**. А **~this~** у нестрогому режимі — глобальний об’єкт, тож **~name~** мовчки пішло туди; у строгому режимі виклик кинув би **~TypeError~**. Фабрику так не зламати: її й викликають без **~new~**.

- **~Person {name: 'Ann'}~**
= Так було б із **~new~**.

- **~{name: 'Ann'}~**
= Ні: функція нічого не повертає, об’єкт нізвідки не візьметься.

- **~TypeError~**
= Так було б у строгому режимі, де **~this~** без **~new~** — **~undefined~**. У нестрогому помилки немає.
♣♣♣♣

___

## ![ico-25 hw] Квест⟪Quest⟫

♠♠♠♠ Баланс рахунку лежить у **~this~**, і будь-хто може переписати його в обхід **~deposit~**. Перепиши конструктор **~Account~** фабрикою **~createAccount(owner, balance)~**, яку викликають без **~new~**. Вона повертає об’єкт з **~owner~**, методом **~deposit(sum)~** і методом **~getBalance()~**, а сам баланс тримає в замиканні, щоб ззовні його не можна було змінити.
function Account (owner, balance) {
  this.owner = owner
  this.balance = balance

  this.deposit = function (sum) {
    this.balance += sum
  }
}

const account = new Account('Ann', 100)

account.balance = 1000000
account.deposit(50)

console.log(account.owner, account.balance)
???
? 3 | рахунок створюється викликом createAccount, без new
typeof createAccount === 'function' && createAccount('Bob', 10).owner === 'Bob'

? 3 | гроші кладуться, а баланс читається методом
const account = createAccount('Bob', 10)
account.deposit(5)
account.getBalance() === 15

? 4 | баланс ззовні не переписати
const account = createAccount('Bob', 10)
account.balance = 1000000
account.getBalance() === 10

? 2 | у кожного рахунку свій баланс
const ann = createAccount('Ann', 1)
const bob = createAccount('Bob', 2)
ann.deposit(10)
ann.getBalance() === 11 && bob.getBalance() === 2
♠♠♠♠

♠♠♠♠ Цикл рахує загальну площу фігур і падає: квадрат відповідає на **~getArea()~** замість **~area()~**, а трикутника фабрика не знає взагалі. Почини фабрику **~createShape~** так, щоб усі фігури відповідали на той самий метод **~area()~** і цикл не довелося міняти. Додай рівносторонній трикутник зі стороною **~size~** (його площа — √3 / 4 · size²), а на невідому фігуру фабрика хай кидає **~TypeError~**.
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, getArea: () => size ** 2 }
}

const shapes = [createShape('circle', 1), createShape('square', 2), createShape('triangle', 2)]

let total = 0

for (const shape of shapes) total += shape.area()

console.log('total:', total.toFixed(2))
???
? 4 | цикл дорахував загальну площу: total: 8.87
OUTPUT[0] === 'total: 8.87'

? 3 | у всіх фігур той самий метод area()
['circle', 'square', 'triangle'].every((kind) => typeof createShape(kind, 1).area === 'function')

? 3 | площу трикутника пораховано правильно
Math.abs(createShape('triangle', 2).area() - Math.sqrt(3)) < 1e-9

? 2 | на невідому фігуру фабрика кидає TypeError
let thrown = null
try { createShape('hexagon', 1) } catch (error) { thrown = error }
thrown instanceof TypeError
♠♠♠♠
