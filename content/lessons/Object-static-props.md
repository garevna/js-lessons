# ![ico-30 study] {{s1.h1}}

__________________________________

## ![ico-25 icon] Object.assign()

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

~~~js
Object.assign(target, ...sources)
~~~

{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

_________________________________________________

♦♦♦1♦♦♦

~~~js
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true })
~~~

◘◘**^^newObject^^**◘◘

~~~console
{
  name: "Егор",
  age: 25,
  write: true,
  read: true
}
~~~

_________________________________


♦♦♦2♦♦♦

~~~js

// Создадим объект source,
// свойство position которого будет массивом,
// а свойство attrs - объектом:

var source = {
  name: 'sample',
  attrs: {
    type: 'figure',
    color: 'green',
    size: 200
  },
  position: [250, 250]
}

// Создадим копию target объекта source с помощью метода Object.assign:

var target = Object.assign({}, source)

// Покажем, что:

// свойство target.attrs содержит ссылку на объект source.attrs,
// а свойство target.position содержит ссылку на массив source.position

// Для этого изменим значение элемента массива target.position:

target.position[0] = 100

// и значение свойства target.attrs.color:

target.attrs.color = '#fa0'
~~~

{{s1.p9}}
{{s1.p10}}
{{s1.p11}}
{{s1.p12}}

![](illustrations/Object-assign-01.png)

_______________________

## ![ico-25 icon] Object.create()

{{s1.p13}}

{{s1.p14}}

{{s1.p15}}
{{s1.p16}}

♦♦♦3♦♦♦

~~~js
var figure = {
  className: 'Figure'
}
var circle = Object.create(figure)
~~~

{{s1.p18}}

~~~js
var emptyObject = Object.create(null)
~~~

________________________

{{s1.p19}}
{{s1.p20}}

^^^[{{s1.spoiler1}}]

~~~js
function Figure (figType) {
  this.type = figType
  console.log('Instance of Figure created')
}
Figure.prototype.className = 'Figure'

var circle = Object.create(new Figure('circle'), {
  x: {
    value: undefined,
    writable: true,
    configurable: false,
    enumerable: false
  },
  y: {
    value: undefined,
    writable: true,
    configurable: false,
    enumerable: false
  },
  radius: {
    value: undefined,
    writable: true,
    configurable: false,
    enumerable: false
  }
})
~~~

^^^


◘◘circle◘◘

~~~console

▼ Figure {x: undefined, y: undefined, radius: undefined}
    radius: undefined
    x: undefined
    y: undefined
  ▼ __proto__: Figure
        type: "circle"
      ▼ __proto__:
            className: "Figure"
          ► constructor: ƒ Figure( figType )
          ► __proto__: Object
~~~


~~~js
circle instanceof Figure  // true
~~~

_________________________________________________________


♦♦♦5♦♦♦

~~~js

// Создадим экземпляр объекта proto:

var proto = {
  figure: 'circle',
  size: 100,
  clip: false,
  changeFigure: function (newFigure) {
    this.figure = newFigure
  }
}

// А теперь вызовем метод Object.create() для создания экземпляра obj

var obj = Object.create(proto)
~~~

{{s1.p22}}

◘◘obj◘◘

~~~console

▼ {}
   ▼ __proto__:
      ► changeFigure: ƒ(newFigure)
        clip: false
        figure: "circle"
        size: 100
      ► __proto__: Object
~~~

{{s1.p23}}

~~~js
var Creator = function (id, val) {
  this.id = id
  this.val = val
}
~~~

{{s1.p24}}

~~~js
Creator.call(obj, 'sample',  75)
~~~

{{s1.p25}}

![](illustrations/Object-static-props-01.png)


________________________________________________________


♦♦♦6♦♦♦

~~~js

// Создадим конструктор Human:

function Human (name = 'Тимофей', hobby = 'футбол') {
  this.name = name
  this.hobby = hobby
}

Human.prototype = {
  speciality: 'монтажник',
  age: 20
}

// и воспользуемся методом Object.create() для создания нового экземпляра worker:

var worker = Object.create(new Human('Иван', 'рыбалка'))
~~~

◘◘worker◘◘

~~~console

▼ {}
  ▼ __proto__:
        hobby: "рыбалка"
        name: "Иван"
      ▼ __proto__:
            age: 20
            speciality: "монтажник"
          ► __proto__: Object
~~~


{{s1.p27}}

~~~js
worker instanceof Human   // true
worker instanceof Object  // true
~~~

_______________________________________________________


♦♦♦7♦♦♦

~~~js

// Объявим конструктор класса SuperClass

function SuperClass () {
  this.__proto__.type = 'SuperClass'
  this.__proto__.name = 'Parent Class'
}

// Теперь используем метод Object.create()
// для создания подкласса SubClass класса SuperClass

// Для этого объявим конструктор подкласса SubClass:

function SubClass () {
  SuperClass.call(this)
  this.name = 'Child Class'
  this.type = 'SubClass'
}

// Конструктор SuperClass вызывается в конструкторе SubClass
// как обычная функция, однако в контексте экземпляра

var sample = new SubClass()
~~~

{{s1.p29}}

![](illustrations/Object-static-props-02.png)


{{s1.p30}}

~~~js
sample instanceof SubClass    // true
sample instanceof SuperClass  // false
sample instanceof Object      // true
~~~

{{s1.p31}}

____________________________________________________


♦♦♦8♦♦♦

~~~js
// Объявляем конструктор класса Dishes

function Dishes (type) {
  this.type = 'dishes'
  console.log('The constructor Dishes has created an instance: \n', this)
}

// Создаем свойства и методы прототипа:

Dishes.prototype.wash = function () {
  this.clean = true
  console.info('The tableware has been washed.')
}
Dishes.prototype.use = function () {
  this.clean = false
  console.info('The tableware has been used and it\'s dirty now.')
}

// Теперь создадим конструктор класса Cup:

function Cup (color) {
  this.type = 'cup'
  this.color = color || 'blue'
}
~~~

{{s1.p33}}
{{s1.p34}}

~~~js
Cup.prototype = Object.create(Dishes.prototype)
~~~

{{s1.p35}}

~~~js
Dishes.call(Cup.prototype)
~~~

{{s1.p36}}

~~~js
var redCup = new Cup('red')
~~~

◘◘redCup◘◘

~~~console

▼ Cup {type: "cup", color: "red", clean: true}
    clean: true
    color: "red"
    type: "cup"
  ▼ __proto__: Dishes
        type: "dishes"
      ▼ __proto__:
          ► use: ƒ ()
          ► wash: ƒ ()
          ► constructor: ƒ Dishes(type)
          ► __proto__: Object
~~~


{{s1.p37}}
{{s1.p38}}

~~~js
redCup instanceof Cup        // true
redCup instanceof Dishes     // true
greenCup instanceof Object   // true
~~~

{{s1.p39}}
{{s1.p40}}
{{s1.p41}}

~~~js
redCup.use()  // The tableware has been used and it's dirty now.

redCup.wash() // The tableware has been washed.
~~~

{{s1.p42}}

_________________________________________________________________________

~&#95;&#95;proto&#95;&#95;~  vs  ~Object.create()~


♦♦♦9♦♦♦

~~~js
// усложним задачу, удлинив цепочку прототипов еще одним классом - Kitchenware

// Создадим конструктор класса Kitchenware

var Kitchenware = function () {
  this.className = 'Kitchenware'
  this.__proto__.constructor = Kitchenware
}

// Теперь создадим конструктор класса Dishes,
// и используем конструктор Kitchenware
// для создания прототипа экземпляров класса Dishes:

var Dishes = function () {
  this.__proto__ = new Kitchenware()
  this.__proto__.constructor = Dishes
  this.className = 'Dishes'
}

// Теперь создадим конструктор класса Cup,
// и используем конструктор Dishes
// для создания прототипа экземпляров класса Cup:

var Cup = function ($color) {
  this.__proto__ = new Dishes()
  this.__proto__.constructor = Cup
  this.className = 'Cup'
  this.color = $color || 'white'
}

// Теперь создадим экземпляр yellowCup класса Cup
// и выведем его в консоль:

var yellowCup = new Cup('yellow')
console.log('*** cup:\n', yellowCup)
~~~

![](illustrations/Object-static-props-03.png)

{{s1.p44}}

~~~js
console.log(Object.getPrototypeOf(yellowCup))
~~~

![](illustrations/Object-static-props-04.png)

~~~js
console.log(Object.getPrototypeOf(Object.getPrototypeOf(yellowCup)))
~~~

![](illustrations/Object-static-props-05.png)

{{s1.p45}}

~~~js
this.__proto__.constructor = Dishes
~~~

{{s1.p46}}

~~~js
this.__proto__ = new Kitchenware()  
~~~

{{s1.p47}}

{{s1.p48}}

~~~js
this.__proto__.constructor = Cup
~~~

{{s1.p49}}

~~~js
yellowCup instanceof Kitchenware  // true
yellowCup instanceof Dishes       // false
yellowCup instanceof Cup          // false
yellowCup instanceof Object       // true
~~~

{{s1.p50}}

_____________________________________________________________________________

[![ico-30 hw] Quiz](quiz/#Object.create)

_____________________________________________________________________________

## ![ico-25 icon] Object.defineProperty()

{{s1.p51}}

{{s1.p52}}
{{s1.p53}}
{{s1.p54}}

♦♦♦10♦♦♦

~~~js
// Добавим свойство type объекту sample и сделаем это свойство неперечислимым

var sample = {
  name: 'figure',
  size: 100,
  color: 'red'
}
Object.defineProperty(sample, 'type', {
  value: 'svg',
  enumerable: false
})

Object.keys(sample)
~~~

{{s1.p56}}

~~~console
► (3) ["name", "size", "color"]
~~~

______________________________________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

♦♦♦11♦♦♦

~~~js
// Добавим еще одно свойство объекту sample
// Свойство operation будет  с геттером и сеттером

Object.defineProperty(sample, 'operation', {
  get: () => this.operation ? this.operation[0] : '?',
  set: newVal => this.operation = newVal + '***'
})
~~~

{{s2.p4}}

~~~console
▼ {name: "figure", size: 100, color: "red", type: "svg"}
    color: "red"
    name: "figure"
    size: 100
    operation: (...)
    type: "svg"
  ► get operation: () => {…}
  ► set operation: newVal => this.operation = newVal + "***"
  ► __proto__: Object
~~~

___________________________________________________________

♦♦♦12♦♦♦

~~~js
var course = 28

var thing = {
  name: 'Утюг',
  mark: 'Tefal',
  priceUSD: 20
}

Object.defineProperty(thing, 'priceUAH', {
  get: function () {
    return this.priceUSD * course
  },
  set: function (newPriceUAH) {
    this.priceUSD = newPriceUAH / course
  }
})

console.log(thing.priceUAH) // 560

// Теперь выполним присваивание значения вычисляемому свойству
// ( вызывая под капотом сеттер этого свойства )

thing.priceUAH = 450

console.log(thing.priceUDS) // 8.928571428571429

// Выведем в консоль дескриптор вычисляемого свойства priceUAH

console.log(Object.getOwnPropertyDescriptor(thing, 'priceUAH'))
~~~

{{s2.p6}}

~~~console
▼ {get: ƒ, set: ƒ, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► get: ƒ priceUAH()
  ► set: ƒ priceUAH( newPriceUAH )
  ► __proto__: Object
~~~

____________________________

## ![ico-25 icon] Object.defineProperties()

{{s2.p7}}

{{s2.p8}}

~~~html
<body>
  <svg
    width="400"
    height="400"
    style="border: 1px dotted;"
  />
</body>
~~~

{{s2.p9}}

~~~js
var sample = {
  name: 'figure',
  size: 100,
  color: 'red'
}

Object.defineProperties(sample, {
  canvas: {
    value: document.querySelector('svg'),
    writable: false,
    configurable: false,
    enumerable: false
  },
  owner: {
    get: () => this.owner || this,
    set: newOwner => Object.assign(this, { owner: newOwner })
  }
})
~~~

![](illustrations/Object-static-props-06.png)

{{s2.p10}}

![](illustrations/Object-static-props-07.png)

{{s2.p11}}

~~~js
sample.owner = sample
~~~

![](illustrations/Object-static-props-08.png)

____________________________

## ![ico-25 icon] Object.entries()

**ES8 (2017)**

{{s2.p12}}
{{s2.p13}}

~~~js
var obj = {
  name: 'first',
  type: 'circle',
  color: 'red',
  radius: 100,
  center: [120, 120]
}

console.log(Object.entries(obj))
~~~

{{s2.p14}}

~~~console

▼ (5) [Array(2), Array(2), Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "first"]
  ► 1: (2) ["type", "circle"]
  ► 2: (2) ["color", "red"]
  ► 3: (2) ["radius", 100]
  ► 4: (2) ["center", Array(2)]
    length: 5
  ► __proto__: Array(0)
~~~

________________________________________

♦♦♦13♦♦♦

~~~js
// Нарисуем окружность

var obj = {
  width: '30%',
  height: '30%',
  border: 'solid 1px red',
  borderRadius: '50%',
  position: 'fixed',
  top: '10%',
  left: '10%'
}

var elem = document.body
  .appendChild(document.createElement('div'))

Object.entries(obj)
  .forEach(prop => elem.style[prop[0]] = prop[1])
~~~

____________________

♦♦♦14♦♦♦


~~~js
// Выведем все свойства объекта obj в консоль

console.info('obj = {\n')
for (var x of Object.entries(obj)) {
  console.info(`     ${x[0]}:${x[1]}\n`)
}
console.info('}')
~~~

{{s2.p17}}

~~~console

obj = {
      width:30%
      height:30%
      border:solid 1px red
      borderRadius:50%
      position:fixed
      top:10%
      left:10%
}
~~~

____________________________

## ![ico-25 icon] Object.freeze()

{{s2.p18}}

♦♦♦15♦♦♦

~~~js
var string = 'Welcome to JS!'

string.split(' ') // ["Welcome", "to", "JS!"]

console.log(string) // "Welcome to JS!"
~~~

_______________________________________________________________________

{{s2.p20}}

♦♦♦16♦♦♦

~~~js
var food = ['milk', 'apple', 'soup']

food.push('meat')

console.log(food) // ["milk", "apple", "soup", "meat"]
~~~

_______________________________________________________________________

{{s2.p22}}

♦♦♦17♦♦♦

~~~js
var provider = { name: 'Google' }

provider.addProp = function (propName, propVal) {
  this[propName] = propVal
}

provider.addProp('browser', 'Chrome')

console.log(provider) // { name: "Google", browser: "Chrome" }
~~~

____________________________________________________

{{s2.p24}}

^^^[{{s2.spoiler1}}]

{{s2.p25}}

~~~js
var provider = { name: 'Google' }

Object.freeze(provider)

provider.addProp = function (propName, propVal) {
  this[propName] = propVal
}

console.log(provider) // { name: "Google" }
~~~

^^^

^^^[{{s2.spoiler2}}]

{{s2.p26}}

~~~js
var provider = { name: 'Google', service: 'API' }

Object.freeze(provider)

delete provider.service  // false

console.log(provider) // { name: "Google", service: "API" }
~~~

^^^

^^^[{{s2.spoiler3}}]

{{s2.p27}}

~~~js
var provider = { name: "Google", service: "API" }

Object.freeze ( provider )

provider.name = "Mozilla"

console.log ( provider.name ) // Google
~~~

^^^

^^^[{{s2.spoiler4}}]

{{s2.p28}}

♦♦♦21♦♦♦

~~~js
// Изменим дескриптор свойства объекта до "заморозки":

var provider = { name: 'Google', service: 'API' }

Object.defineProperty(provider, 'name', {
  enumerable: false,
  writable: false
})

for (var prop in provider) {
  console.log(`${prop}: ${provider [ prop ]}`)
}

// service: API
~~~

{{s2.p30}}

{{s2.p31}}

~~~js
provider.name = 'Mozilla'

console.log(provider.name) // "Google"
~~~

{{s2.p32}}

~~~js
Object.defineProperty(provider, 'name', {
  enumerable: true,
  writable: true
})

provider.name = 'Mozilla'
~~~

{{s2.p33}}

~~~js
for (var prop in provider) {
  console.log(`${prop}: ${provider [ prop ]}`)
}

// name: Mozilla
// service: API
~~~

{{s2.p34}}

{{s2.p35}}

~~~js
Object.freeze(provider)

Object.defineProperty(provider, 'service', {
  enumerable: false,
  writable: false
})
~~~

{{s2.p36}}

••![ico-20 error] Uncaught TypeError: Cannot redefine property: service••

{{s2.p37}}

{{s2.p38}}

~~~js
Object.getOwnPropertyDescriptor(provider, 'service')
~~~

••► { value: "API", writable: false, enumerable: true, configurable: false }••

{{s2.p39}}

{{s2.p40}}

{{s2.p41}}

^^^
_________________________________________________________________________________________________

## ![ico-25 icon] Object.getOwnPropertyDescriptor()

{{s2.p42}}
{{s2.p43}}
{{s2.p44}}
{{s2.p45}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
{{s3.p6}}
{{s3.p7}}
{{s3.p8}}
{{s3.p9}}

_________________________________________________________________

♦♦♦22♦♦♦

~~~js
var newObject = {
  name: 'Егор',
  age: 25,
  write: true,
  read: true,
  getName () {},
  setName () {}
}
Object.getOwnPropertyDescriptor(newObject, 'getName')
~~~

{{s3.p11}}

~~~console

▼ {value: ƒ, writable: true, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► value: ƒ getName()
    writable: true
  ► __proto__: Object
~~~


____________________________

## ![ico-25 icon] Object.getOwnPropertyDescriptors()

**ES8 (2017)**

{{s3.p12}}
{{s3.p13}}
{{s3.p14}}
{{s3.p15}}

~~~js
var obj = {
  name: 'first',
  type: 'circle',
  color: 'red',
  radius: 100,
  center: [120, 120]
}

Object.getOwnPropertyDescriptors(obj)
~~~

{{s3.p16}}

~~~console

▼ {name: {…}, type: {…}, color: {…}, radius: {…}, center: {…}}
  ► center: {value: Array(2), writable: true, enumerable: true, configurable: true}
  ► color: {value: "red", writable: true, enumerable: true, configurable: true}
  ► name: {value: "first", writable: true, enumerable: true, configurable: true}
  ► radius: {value: 100, writable: true, enumerable: true, configurable: true}
  ► type: {value: "circle", writable: true, enumerable: true, configurable: true}
  ► __proto__: Object
~~~

____________________________

## ![ico-25 icon] Object.getOwnPropertyNames()

{{s3.p17}}

~~~js
var funcObject = {
  getName () {},
  setName () {}
}
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true }, funcObject)
Object.getOwnPropertyNames(newObject)
~~~

{{s3.p18}}

~~~console

(6) ["name", "age", "write", "read", "getName", "setName"]
~~~
____________________________

## ![ico-25 icon] Object.keys()

{{s3.p19}}
{{s3.p20}}

♦♦♦23♦♦♦

~~~js
var Human = function () {
  this.name = arguments [ 0 ] || 'Тимофей'
  this.age = arguments [ 1 ] || 25
  this.speciality = arguments[2] || 'слесарь'
}

Human.prototype.setSpeciality = function (spec) {
  this.speciality = spec
}

var man = new Human(null)

// Добавим в прототип Human новое свойство employed:

Human.prototype.employed = false
console.log(man.employed)  // false

// выведем в консоль собственные перечислимые свойства экземпляра  man

console.log(Object.keys(man))
~~~

{{s3.p22}}

~~~console

(3) [ "name", "age", "speciality" ]
~~~

{{s3.p23}}

~~~js
console.log(Object.keys(Human.prototype))
~~~

{{s3.p24}}

~~~console

(2) [ "setSpeciality", "employed" ]
~~~

{{s3.p25}}

~~~js
man.employed = true
console.log(Object.keys(man))
~~~

{{s3.p26}}

~~~console

(4) [ "name", "age", "speciality", "employed" ]
~~~

{{s3.p27}}

~~~js
console.log(man.employed)           // true
console.log(man.__proto__.employed) // false
~~~
____________________________

## ![ico-25 icon] Object.setPrototypeOf()

{{s3.p28}}
{{s3.p29}}

♦♦♦24♦♦♦

~~~js
// Создадим объект proto с двумя методами: valueOf() и getName()

const proto = {
  valueOf () {
    return this[Object.keys(this).find(key => !isNaN(this[key]))] || 0
  },
  getName () {
    return this.name || 'user'
  }
}
~~~

{{s3.p31}}

{{s3.p32}}
{{s3.p33}}

{{s3.p34}}


{{s3.p35}}

~~~js
const admin = {
  name: 'Stephan',
  age: 25
}
~~~

{{s3.p36}}

◘◘admin◘◘

~~~console

▼ { name: "Stephan", age: 25 }
    age: 25
    name: "Stephan"
  ▼ __proto__:
      ► constructor: ƒ Object()
      ► hasOwnProperty: ƒ hasOwnProperty()
      ► isPrototypeOf: ƒ isPrototypeOf()
      ► propertyIsEnumerable: ƒ propertyIsEnumerable()
      ► toLocaleString: ƒ toLocaleString()
      ► toString: ƒ toString()
      ► valueOf: ƒ valueOf()
      ► __defineGetter__: ƒ __defineGetter__()
      ► __defineSetter__: ƒ __defineSetter__()
      ► __lookupGetter__: ƒ __lookupGetter__()
      ► __lookupSetter__: ƒ __lookupSetter__()
      ► get __proto__: ƒ __proto__()
      ► set __proto__: ƒ __proto__()
~~~


{{s3.p37}}

~~~js
Object.setPrototypeOf(admin, proto)
~~~

{{s3.p38}}

◘◘admin◘◘

~~~console

▼ { name: "Stephan", age: 25 }
    age: 25
    name: "Stephan"
  ▼ __proto__:
      ► getName: getName() { return this[ Object.keys ( this ) .find ( key => {…}
      ► valueOf: valueOf() { let prop = Object.keys ( this ) .find ( key => {…}
      ► __proto__: Object
~~~


{{s3.p39}}

~~~js
console.log(admin.getName()) // Stephan
console.log(admin.valueOf()) // 25
~~~

{{s3.p40}}

~~~js
const user = {
  login: 'Stephan',
  hobby: 'fishing'
}
~~~

{{s3.p41}}

{{s3.p42}}

~~~js
Object.setPrototypeOf(user, proto)
~~~

{{s3.p43}}

~~~js
console.log(user.getName()) // user
console.log(user.valueOf()) // 0
~~~
____________________________

## ![ico-25 icon] Object.values()

**ES8 (2017)**

{{s3.p44}}
{{s3.p45}}

~~~js
var obj = {
  name: 'first',
  type: 'circle',
  color: 'red',
  radius: 100,
  center: [120, 120]
}

console.log(Object.values(obj))
~~~

{{s3.p46}}

~~~console

(5) ["first", "circle", "red", 100, Array(2)]
~~~
____________________________

^^![ico-25 icon] Object.getOwnPropertySymbols()^^
^^![ico-25 icon] Object.getPrototypeOf()^^
^^![ico-25 icon] Object.is()^^
^^![ico-25 icon] Object.isExtensible()^^
^^![ico-25 icon] Object.isFrozen()^^
^^![ico-25 icon] Object.isSealed()^^
^^![ico-25 icon] Object.seal()^^

[![ico-30 link] MDN](external/mdn-object-static-props)
____________________________

[![ico-30 hw] Quiz](quiz/Object)
