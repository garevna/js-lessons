# ![ico-30 study] Фабричные методы⟪Factory_methods⟫

@@@@
![](illustrations/douglas-crockford.jpg)
«_I think the lack of classes is one of JavaScript's great strengths_» <hr /> [Douglas Crockford](external/crockford)
@@@@

☼☼☼ Только скажи «new» — и (почти) любая функция вернёт объект. ☼☼☼

Ключевое слово **~new~** перед вызовом функции превращает эту функцию в конструктор, и результатом такого вызова всегда будет объект, независимо от того, есть или нет в теле функции оператор ~return~.

Строго говоря, конструктор объект не создаёт: его создаёт оператор **~new~** — сразу с прототипом **~F.prototype~** — и передаёт функции как **~this~**. Функция его только заполняет.

Если она делает это без использования ключевого слова **_~new~_**, то такая функция является **фабрикой**:

~~~js
const creator = (name, age) => ({ name, age })
~~~

В этом примере мы используем стрелочную функцию, а она не может быть конструктором вовсе: у неё нет внутреннего метода **[[Construct]]**, и вызов с **~new~** бросит **~TypeError~**. Свойства **~prototype~** у неё тоже нет, но дело не в нём: обычная функция, у которой ~prototype~ отняли, вызывается с ~new~ как ни в чём не бывало.
Она является фабрикой, потому что возвращает объект.
И этот объект не будет ничего знать о функции **~creator~**. Он будет экземпляром **~Object~**.

![ico-20 warn] Функция не может быть одновременно и фабрикой, и конструктором. А может не быть ни тем, ни другим: колбек или функция, которая что-то вычисляет, — просто функции. Фабрикой или конструктором её делает не объявление, а то, что она возвращает и как её вызывают.
Докажем первую часть.

Необходимым, но недостаточным (![ico-20 warn]) условием того, чтобы функция стала фабрикой, является наличие оператора **~return~**.

◘◘![ico-25 cap] **1**◘◘

~~~js
function creator (name, age) {
  return { name, age }
}
~~~

В этом примере функция **~creator~** возвращает объект. Отлично, посмотрим, что она вернет, если мы вызовем ее с ключевым словом **~new~**:

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

Функция **~creator~** уже не может быть конструктором, и использование ключевого слова **~new~** никак не влияет на ее поведение.

Функция **~creator~** создает экземпляры конструктора **~Object~**.

___

◘◘![ico-25 cap] **2**◘◘

~~~js
function creator () {
  return Array.from(arguments)
}
~~~

В этом примере функция **~creator~** возвращает массив.
Но массив является объектом, поэтому функция **~creator~** обречена быть фабрикой, и никогда не сможет стать конструктором.

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

Функция **~simple~** возвращает число (возможно, NaN или ~Infinity~). Можно ли сказать, что она является фабрикой? - Нет, поскольку она возвращает **не объект**.
Будучи вызвана с ключевым словом **~new~**, она возвращает экземпляр **~simple~**.

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

Аналогичная ситуация будет в случае, если функция возвращает строку, или ~null~, или ~undefined~. Можете проверить самостоятельно.

Т.е. функция будет фабрикой только в том случае, если она возвращает объект — любой: литерал, массив, функцию, — а не примитив.
___

## ![ico-20 icon] ООП-объекты и структуры данных⟪OOP_objects_and_data_structures⟫

•••• none
^^_Роберт Мартин, «Чистый код»:_^^

Объекты предоставляют поведение и скрывают данные.
Структуры данных предоставляют данные, но не обладают сколько-нибудь значительным поведением.
••••

Фабрика может вернуть и то и другое. Конструктор кладёт данные в **~this~**, и они открыты всем. Фабрика может оставить их в замыкании и отдать наружу только поведение — получится объект в том смысле, в каком о нём говорит Мартин. Так устроен паттерн «Модуль»:

**Паттерн "_Модуль_"**

^^В этом примере с помощью IIFE и замыкания создается объект, данные которого скрыты от непосредственного доступа и доступны только через интерфейс, представленный методом _**getVar**_^^

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

IIFE здесь — та же фабрика, только вызванная один раз, на месте. Вызовите её дважды — получите два объекта, и у каждого будут свои скрытые данные: у каждого вызова фабрики своё замыкание.

___

^^В этом примере то же самое делает статический метод класса _User_^^
^^Конструктор класса создает публичное свойство _name_^^
^^Фабричный метод класса _createUser_ создаёт экземпляр и сразу дополняет его: скрытые данные остаются в замыкании, а доступ к ним даёт интерфейс — метод _**getVar**_^^

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

## ![ico-25 icon] Полиморфизм⟪Polymorphism⟫

Полиморфизм — это когда один и тот же вызов работает с объектами разных видов, и каждый отвечает на него по-своему. Код, который вызывает **~shape.area()~**, не знает и не должен знать, круг перед ним или квадрат. А решается, какой именно объект родится, в одном месте — в фабрике.

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

Цикл вызывает **~area()~** у каждой фигуры, не спрашивая, кто она. Чтобы добавить треугольник, достаточно дописать одну ветку в фабрике — цикл менять не нужно.

___

Фабричный метод может жить и на самом конструкторе — как статический метод. Тогда он создаёт экземпляры этого конструктора, но с разным набором свойств и методов.

В следующем примере конструктор **~User~** имеет фабричный метод **~createNewUser~**, позволяющий создавать экземпляры класса с различным набором свойств и методов.

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

Получили _перечислимый_ статический метод **~createNewUser~** конструктора.

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

Создадим с его помощью два экземпляра класса **~User~** с различным набором свойств и методов.

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

Экземпляры **~visitor~** и **~currentUser~** созданы одним конструктором **~User~**, но свойства и методы у них разные.

___

Сделаем то же самое с помощью класса:

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

В этом случае статический метод класса **~createNewUser~** будет неперечислимым, а в остальном все будет аналогично варианту с конструктором

Обратите внимание на **~new this~** внутри метода. **~this~** здесь — тот конструктор, у которого метод вызвали. Вызовите его у наследника — и получите экземпляр наследника, хотя сам метод написан один раз, в родителе. Это и есть полиморфизм фабричного метода:

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

^^А «под капотом» класс — всё тот же конструктор, и работает всё то же прототипное наследование.^^

___

## ![ico-25 icon] Фабрика или конструктор?⟪A_factory_or_a_constructor?⟫

![ico-20 green-ok] фабрику вызывают без **~new~**, и забыть его нельзя. Конструктор, вызванный без **~new~**, вернёт **~undefined~**, а в нестрогом режиме ещё и молча запишет свойства в глобальный объект;
![ico-20 green-ok] данные можно спрятать в замыкании, а не выставлять в **~this~**;
![ico-20 green-ok] фабрика может вернуть объект любого вида — в этом её полиморфизм;
![ico-20 warn] **~instanceof~** о фабрике ничего не скажет: литерал, который она вернула, — экземпляр **~Object~**;
![ico-20 warn] методы, объявленные в возвращаемом литерале, у каждого объекта свои. Чтобы они были общими, как у экземпляров конструктора, фабрика создаёт объект через **~Object.create(proto)~**:

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

Метод **~greet~** у всех объектов один — он лежит в прототипе, а у самих объектов есть только **~name~**.

___

## ![ico-25 hw] Тесты⟪Tests⟫

♣♣♣♣
? Что произойдёт?

~~~js
const creator = (name, age) => ({ name, age })

const user = new creator('Ann', 25)
~~~

+ **~TypeError: creator is not a constructor~**
= Да. У стрелочной функции нет внутреннего метода **[[Construct]]**, и вызвать её с **~new~** нельзя. Фабрикой она быть может, конструктором — нет.

- **~user~** — **~{ name: 'Ann', age: 25 }~**
= Так было бы без **~new~**. С ним до тела функции дело не доходит.

- **~user~** — пустой экземпляр **~creator {}~**
= Нет: экземпляр стрелочной функции создать нельзя вообще.

- **~user~** — **~undefined~**
= Нет: до присваивания дело не дойдёт, вызов бросит исключение.

? Что напечатает код?

~~~js
function creator (name) {
  return { name }
}

const user = new creator('Ann')

console.log(user instanceof creator, user instanceof Object)
~~~

+ **~false true~**
= Да. Функция вернула объект, и **~new~** отдаёт именно его, а не созданный было экземпляр. Это литерал, он ничего не знает о **~creator~** — экземпляр **~Object~**.

- **~true true~**
= Нет: функция, которая возвращает объект, — фабрика, и **~new~** этого не меняет.

- **~true false~**
= Нет: любой объект-литерал — экземпляр **~Object~**.

- **~false false~**
= Нет: литерал — экземпляр **~Object~**.

? Что будет в **~obj~**?

~~~js
function simple () {
  return 42
}

const obj = new simple()
~~~

+ пустой экземпляр **~simple {}~**
= Да. Число — примитив, и **~new~** его не замечает: он возвращает экземпляр, который создал сам. Функция, возвращающая примитив, фабрикой не является.

- **~42~**
= Так вернул бы обычный вызов, без **~new~**.

- **~Number {42}~**
= Нет: **~new~** не оборачивает возвращённый примитив, он его отбрасывает.

- **~undefined~**
= Нет: вызов с **~new~** всегда даёт объект.

? Что напечатает код?

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
= Да. У каждого вызова фабрики своё замыкание: **~a~** досчитал до трёх, **~b~** начал свой счёт с нуля. А переменной **~n~** у объекта нет — она в замыкании, снаружи до неё не дотянуться.

- **~3 4 false~**
= Нет: счёт у **~a~** и **~b~** не общий — каждый вызов **~counter()~** заводит свой **~n~**.

- **~3 1 true~**
= Нет: у объекта есть только **~next~**, а **~n~** осталась в замыкании.

- **~1 1 false~**
= Нет: **~a.next()~** уже вызывали дважды, и **~n~** помнит это между вызовами.

? Что напечатает код?

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
= Да. **~this~** в статическом методе — тот класс, у которого метод вызвали, здесь **~Admin~**. Метод написан один раз, в **~User~**, а создаёт экземпляры любого наследника.

- **~false~**: метод написан в **~User~** и создаёт **~User~**
= Так было бы с **~new User()~**. **~new this()~** создаёт экземпляр того, у кого метод вызвали.

- **~TypeError~**
= Нет: статические методы наследуются, у **~Admin~** метод **~create~** есть.

- **~undefined~**
= Нет: **~instanceof~** отвечает только **~true~** или **~false~**.

? Что напечатает код?

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

+ **~true~** и **~['name']~**
= Да. **~greet~** лежит в прототипе, один на всех, а у самих объектов есть только **~name~** — **~Object.keys~** показывает лишь собственные свойства.

- **~false~** и **~['name']~**
= Нет: метод не копируется в объекты, он один, в прототипе.

- **~true~** и **~['name', 'greet']~**
= Нет: **~greet~** не собственное свойство объекта, а унаследованное.

- **~false~** и **~['name', 'greet']~**
= Так было бы, если бы **~greet~** объявили прямо в литерале, который возвращает фабрика.

? Что напечатает код?

~~~js
function Person (name) {
  this.name = name
}

const ann = Person('Ann')

console.log(ann)
~~~

+ **~undefined~**
= Да. Без **~new~** конструктор — обычная функция без **~return~**. А **~this~** в нестрогом режиме — глобальный объект, так что **~name~** молча ушло туда; в строгом режиме вызов бросил бы **~TypeError~**. Фабрику так не сломать: её и вызывают без **~new~**.

- **~Person {name: 'Ann'}~**
= Так было бы с **~new~**.

- **~{name: 'Ann'}~**
= Нет: функция ничего не возвращает, объект ниоткуда не возьмётся.

- **~TypeError~**
= Так было бы в строгом режиме, где **~this~** без **~new~** — **~undefined~**. В нестрогом ошибки нет.
♣♣♣♣

___

## ![ico-25 hw] Квест⟪Quest⟫

♠♠♠♠ Баланс счёта лежит в **~this~**, и любой может переписать его в обход **~deposit~**. Перепиши конструктор **~Account~** фабрикой **~createAccount(owner, balance)~**, которую вызывают без **~new~**. Она возвращает объект с **~owner~**, методом **~deposit(sum)~** и методом **~getBalance()~**, а сам баланс держит в замыкании, чтобы снаружи его было не изменить.
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
? 3 | счёт создаётся вызовом createAccount, без new
typeof createAccount === 'function' && createAccount('Bob', 10).owner === 'Bob'

? 3 | деньги кладутся, а баланс читается методом
const account = createAccount('Bob', 10)
account.deposit(5)
account.getBalance() === 15

? 4 | баланс снаружи не переписать
const account = createAccount('Bob', 10)
account.balance = 1000000
account.getBalance() === 10

? 2 | у каждого счёта свой баланс
const ann = createAccount('Ann', 1)
const bob = createAccount('Bob', 2)
ann.deposit(10)
ann.getBalance() === 11 && bob.getBalance() === 2
♠♠♠♠

♠♠♠♠ Цикл считает общую площадь фигур и падает: квадрат отвечает на **~getArea()~** вместо **~area()~**, а треугольника фабрика не знает вовсе. Почини фабрику **~createShape~** так, чтобы все фигуры отвечали на один и тот же метод **~area()~** и цикл не пришлось менять. Добавь равносторонний треугольник со стороной **~size~** (его площадь — √3 / 4 · size²), а на неизвестную фигуру фабрика пусть бросает **~TypeError~**.
const createShape = (kind, size) => {
  if (kind === 'circle') return { kind, area: () => Math.PI * size ** 2 }
  if (kind === 'square') return { kind, getArea: () => size ** 2 }
}

const shapes = [createShape('circle', 1), createShape('square', 2), createShape('triangle', 2)]

let total = 0

for (const shape of shapes) total += shape.area()

console.log('total:', total.toFixed(2))
???
? 4 | цикл досчитал общую площадь: total: 8.87
OUTPUT[0] === 'total: 8.87'

? 3 | у всех фигур один и тот же метод area()
['circle', 'square', 'triangle'].every((kind) => typeof createShape(kind, 1).area === 'function')

? 3 | площадь треугольника посчитана верно
Math.abs(createShape('triangle', 2).area() - Math.sqrt(3)) < 1e-9

? 2 | на неизвестную фигуру фабрика бросает TypeError
let thrown = null
try { createShape('hexagon', 1) } catch (error) { thrown = error }
thrown instanceof TypeError
♠♠♠♠
