# ![ico-30 study] {{p1}}

__________________________________

## ![ico-25 icon] Object.assign()

{{p2}}
{{p3}}

{{p4}}

~~~js
Object.assign(target, ...sources)
~~~

{{p5}}
{{p6}}
{{p7}}

_________________________________________________

♦♦♦1♦♦♦

~~~js
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true })
~~~

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

{{p8}}
{{p9}}
{{p10}}
{{p11}}

![](illustrations/Object-assign-01.png)

_______________________

## ![ico-25 icon] Object.create()

{{p12}}

{{p13}}

{{p14}}
{{p15}}

♦♦♦3♦♦♦

~~~js
var figure = {
  className: 'Figure'
}
var circle = Object.create(figure)
~~~

{{p16}}

~~~js
var emptyObject = Object.create(null)
~~~

________________________

{{p17}}
{{p18}}

^^^[{{common.c0}} 4]

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

~~~console

▼ Figure {x: undefined, y: undefined, radius: undefined}
    radius: undefined
    x: undefined
    y: undefined
  ▼ [[Prototype]]: Figure
        type: "circle"
      ▼ [[Prototype]]:
            className: "Figure"
          ► constructor: ƒ Figure( figType )
          ► [[Prototype]]: Object
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

{{p19}}

~~~console

▼ {}
   ▼ [[Prototype]]:
      ► changeFigure: ƒ(newFigure)
        clip: false
        figure: "circle"
        size: 100
      ► [[Prototype]]: Object
~~~

{{p20}}

~~~js
var Creator = function (id, val) {
  this.id = id
  this.val = val
}
~~~

{{p21}}

~~~js
Creator.call(obj, 'sample',  75)
~~~

{{p22}}

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

~~~console

▼ {}
  ▼ [[Prototype]]:
        hobby: "рыбалка"
        name: "Иван"
      ▼ [[Prototype]]:
            age: 20
            speciality: "монтажник"
          ► [[Prototype]]: Object
~~~

{{p23}}

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

**{{common.c1}}**

![](illustrations/Object-static-props-02.png)

{{p24}}

~~~js
sample instanceof SubClass    // true
sample instanceof SuperClass  // false
sample instanceof Object      // true
~~~

{{p25}}

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

{{p26}}
{{p27}}

~~~js
Cup.prototype = Object.create(Dishes.prototype)
~~~

{{p28}}

~~~js
Dishes.call(Cup.prototype)
~~~

{{p29}}

~~~js
var redCup = new Cup('red')
~~~

~~~console

▼ Cup {type: "cup", color: "red", clean: true}
    clean: true
    color: "red"
    type: "cup"
  ▼ [[Prototype]]: Dishes
        type: "dishes"
      ▼ [[Prototype]]:
          ► use: ƒ ()
          ► wash: ƒ ()
          ► constructor: ƒ Dishes(type)
          ►[[Prototype]]: Object
~~~

{{p30}}
{{p31}}

~~~js
redCup instanceof Cup        // true
redCup instanceof Dishes     // true
greenCup instanceof Object   // true
~~~

{{p32}}
{{p33}}
{{p34}}

~~~js
redCup.use()  // The tableware has been used and it's dirty now.

redCup.wash() // The tableware has been washed.
~~~

{{p35}}

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

{{p36}}

~~~js
console.log(Object.getPrototypeOf(yellowCup))
~~~

![](illustrations/Object-static-props-04.png)

~~~js
console.log(Object.getPrototypeOf(Object.getPrototypeOf(yellowCup)))
~~~

![](illustrations/Object-static-props-05.png)

{{p37}}

~~~js
this.__proto__.constructor = Dishes
~~~

{{p38}}

~~~js
this.__proto__ = new Kitchenware()  
~~~

{{p39}}

{{p40}}

~~~js
this.__proto__.constructor = Cup
~~~

{{p41}}

~~~js
yellowCup instanceof Kitchenware  // true
yellowCup instanceof Dishes       // false
yellowCup instanceof Cup          // false
yellowCup instanceof Object       // true
~~~

{{p42}}

_____________________________________________________________________________

[![ico-30 hw] Quiz](quiz/#Object.create)

_____________________________________________________________________________

## ![ico-25 icon] Object.defineProperty()

{{p43}}

{{p44}}
{{p45}}
{{p46}}

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

~~~console
► (3) ["name", "size", "color"]
~~~

______________________________________________________________________

### ![ico-20 icon] {{p47}}

{{p48}}

{{p49}}

♦♦♦11♦♦♦

~~~js
// Добавим еще одно свойство объекту sample
// Свойство operation будет  с геттером и сеттером

Object.defineProperty(sample, 'operation', {
  get: () => this.operation ? this.operation[0] : '?',
  set: newVal => this.operation = newVal + '***'
})
~~~

~~~console
▼ {name: "figure", size: 100, color: "red", type: "svg"}
    color: "red"
    name: "figure"
    size: 100
    operation: (...)
    type: "svg"
  ► get operation: () => {…}
  ► set operation: newVal => this.operation = newVal + "***"
  ► [[Prototype]]: Object
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

~~~console
▼ {get: ƒ, set: ƒ, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► get: ƒ priceUAH()
  ► set: ƒ priceUAH( newPriceUAH )
  ► [[Prototype]]: Object
~~~

____________________________

## ![ico-25 icon] Object.defineProperties()

{{p50}}

{{p51}}

~~~html
<body>
  <svg
    width="400"
    height="400"
    style="border: 1px dotted;"
  />
</body>
~~~

{{p52}}

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

{{p53}}

![](illustrations/Object-static-props-07.png)

{{p54}}

~~~js
sample.owner = sample
~~~

![](illustrations/Object-static-props-08.png)

____________________________

## ![ico-25 icon] Object.entries()

**ES8 (2017)**

{{p55}}
{{p56}}

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

~~~console

▼ (5) [Array(2), Array(2), Array(2), Array(2), Array(2)]
  ► 0: (2) ["name", "first"]
  ► 1: (2) ["type", "circle"]
  ► 2: (2) ["color", "red"]
  ► 3: (2) ["radius", 100]
  ► 4: (2) ["center", Array(2)]
    length: 5
  ► [[Prototype]]: Array(0)
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

{{p57}}

♦♦♦15♦♦♦

~~~js
var string = 'Welcome to JS!'

string.split(' ') // ["Welcome", "to", "JS!"]

console.log(string) // "Welcome to JS!"
~~~

_______________________________________________________________________

{{p58}}

♦♦♦16♦♦♦

~~~js
var food = ['milk', 'apple', 'soup']

food.push('meat')

console.log(food) // ["milk", "apple", "soup", "meat"]
~~~

_______________________________________________________________________

{{p59}}

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

{{p60}}

^^^[{{p61}}]

![ico-25 cap] **{{common.c0}} 18**

~~~js
var provider = { name: 'Google' }

Object.freeze(provider)

provider.addProp = function (propName, propVal) {
  this[propName] = propVal
}

console.log(provider) // { name: "Google" }
~~~

^^^

^^^[{{p62}}]

![ico-25 cap] **{{common.c0}} 19**

~~~js
var provider = { name: 'Google', service: 'API' }

Object.freeze(provider)

delete provider.service  // false

console.log(provider) // { name: "Google", service: "API" }
~~~

^^^

^^^[{{p63}}]

![ico-25 cap] **{{common.c0}} 20**

~~~js
var provider = { name: "Google", service: "API" }

Object.freeze ( provider )

provider.name = "Mozilla"

console.log ( provider.name ) // Google
~~~

^^^

^^^[{{p64}}]

{{p65}}

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

{{p66}}

{{p67}}

~~~js
provider.name = 'Mozilla'

console.log(provider.name) // "Google"
~~~

{{p68}}

~~~js
Object.defineProperty(provider, 'name', {
  enumerable: true,
  writable: true
})

provider.name = 'Mozilla'
~~~

{{p69}}

~~~js
for (var prop in provider) {
  console.log(`${prop}: ${provider [ prop ]}`)
}

// name: Mozilla
// service: API
~~~

{{p70}}

{{p71}}

~~~js
Object.freeze(provider)

Object.defineProperty(provider, 'service', {
  enumerable: false,
  writable: false
})
~~~

{{topic.t6}}

••![ico-20 error] Uncaught TypeError: Cannot redefine property: service••

{{p72}}

{{p73}}

~~~js
Object.getOwnPropertyDescriptor(provider, 'service')
~~~

••► { value: "API", writable: false, enumerable: true, configurable: false }••

{{p74}}

{{p75}}

{{p76}}

^^^
_________________________________________________________________________________________________

## ![ico-25 icon] Object.getOwnPropertyDescriptor()

{{p77}}
{{p78}}
{{p79}}
{{p80}}

### ![ico-20 icon] {{p81}}

{{p82}}
{{p83}}

{{p84}}
{{p85}}
{{p86}}
{{p87}}
{{p88}}
{{p89}}
{{p90}}

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

~~~console

▼ {value: ƒ, writable: true, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► value: ƒ getName()
    writable: true
  ► [[Prototype]]: Object
~~~

____________________________

## ![ico-25 icon] Object.getOwnPropertyDescriptors()

**ES8 (2017)**

{{p91}}
{{p92}}
{{p93}}
{{p94}}

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

~~~console

▼ {name: {…}, type: {…}, color: {…}, radius: {…}, center: {…}}
  ► center: {value: Array(2), writable: true, enumerable: true, configurable: true}
  ► color: {value: "red", writable: true, enumerable: true, configurable: true}
  ► name: {value: "first", writable: true, enumerable: true, configurable: true}
  ► radius: {value: 100, writable: true, enumerable: true, configurable: true}
  ► type: {value: "circle", writable: true, enumerable: true, configurable: true}
  ► [[Prototype]]: Object
~~~

____________________________

## ![ico-25 icon] Object.getOwnPropertyNames()

{{p95}}

~~~js
var funcObject = {
  getName () {},
  setName () {}
}
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true }, funcObject)
Object.getOwnPropertyNames(newObject)
~~~

~~~console

(6) ["name", "age", "write", "read", "getName", "setName"]
~~~
____________________________

## ![ico-25 icon] Object.keys()

{{p96}}
{{p97}}

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

~~~console

(3) [ "name", "age", "speciality" ]
~~~

{{p98}}

~~~js
console.log(Object.keys(Human.prototype))
~~~

~~~console

(2) [ "setSpeciality", "employed" ]
~~~

{{p99}}

~~~js
man.employed = true
console.log(Object.keys(man))
~~~

~~~console

(4) [ "name", "age", "speciality", "employed" ]
~~~

{{p100}}

~~~js
console.log(man.employed)           // true
console.log(man.__proto__.employed) // false
~~~
____________________________

## ![ico-25 icon] Object.setPrototypeOf()

{{p101}}
{{p102}}

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

{{p103}}

{{p104}}
{{p105}}

{{p106}}

{{p107}}

~~~js
const admin = {
  name: 'Stephan',
  age: 25
}
~~~

{{p108}}

~~~console

▼ { name: "Stephan", age: 25 }
    age: 25
    name: "Stephan"
  ▼ [[Prototype]]:
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

{{p109}}

~~~js
Object.setPrototypeOf(admin, proto)
~~~

{{p110}}

~~~console

▼ { name: "Stephan", age: 25 }
    age: 25
    name: "Stephan"
  ▼ [[Prototype]]:
      ► getName: getName() { return this[ Object.keys ( this ) .find ( key => {…}
      ► valueOf: valueOf() { let prop = Object.keys ( this ) .find ( key => {…}
      ► [[Prototype]]: Object
~~~

{{p111}}

~~~js
console.log(admin.getName()) // Stephan
console.log(admin.valueOf()) // 25
~~~

{{p112}}

~~~js
const user = {
  login: 'Stephan',
  hobby: 'fishing'
}
~~~

{{p113}}

{{p114}}

~~~js
Object.setPrototypeOf(user, proto)
~~~

{{p115}}

~~~js
console.log(user.getName()) // user
console.log(user.valueOf()) // 0
~~~
____________________________

## ![ico-25 icon] Object.values()

**ES8 (2017)**

{{p116}}
{{p117}}

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
