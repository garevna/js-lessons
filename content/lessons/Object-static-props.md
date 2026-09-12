# ![ico-30 study] {{s1.h1}}

__________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

~~~js
Object.assign(target, ...sources)
~~~

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

_________________________________________________

{{s2.p7}}

~~~js
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true })
~~~

{{s2.p8}}

~~~console
{
  name: "Егор",
  age: 25,
  write: true,
  read: true
}
~~~

_________________________________


{{s2.p9}}

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

{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}

![](illustrations/Object-assign-01.png)

_______________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}
{{s3.p4}}

{{s3.p5}}

~~~js
var figure = {
  className: 'Figure'
}
var circle = Object.create(figure)
~~~

{{s3.p6}}

~~~js
var emptyObject = Object.create(null)
~~~

________________________

{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

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

{{s3.p10}}


{{s3.p11}}

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


{{s3.p12}}

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

{{s3.p13}}

{{s3.p14}}

~~~console

▼ {}
   ▼ __proto__:
      ► changeFigure: ƒ(newFigure)
        clip: false
        figure: "circle"
        size: 100
      ► __proto__: Object
~~~

{{s3.p15}}

~~~js
var Creator = function (id, val) {
  this.id = id
  this.val = val
}
~~~

{{s3.p16}}

~~~js
Creator.call(obj, 'sample',  75)
~~~

{{s3.p17}}

![](illustrations/Object-static-props-01.png)


________________________________________________________


{{s3.p18}}

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

{{s3.p19}}

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


{{s3.p20}}

~~~js
worker instanceof Human   // true
worker instanceof Object  // true
~~~

_______________________________________________________


{{s3.p21}}

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

{{s3.p22}}

![](illustrations/Object-static-props-02.png)


{{s3.p23}}

~~~js
sample instanceof SubClass    // true
sample instanceof SuperClass  // false
sample instanceof Object      // true
~~~

{{s3.p24}}

____________________________________________________


{{s3.p25}}

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

{{s3.p26}}
{{s3.p27}}

~~~js
Cup.prototype = Object.create(Dishes.prototype)
~~~

{{s3.p28}}

~~~js
Dishes.call(Cup.prototype)
~~~

{{s3.p29}}

~~~js
var redCup = new Cup('red')
~~~

{{s3.p30}}

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


{{s3.p31}}
{{s3.p32}}

~~~js
redCup instanceof Cup        // true
redCup instanceof Dishes     // true
greenCup instanceof Object   // true
~~~

{{s3.p33}}
{{s3.p34}}
{{s3.p35}}

~~~js
redCup.use()  // The tableware has been used and it's dirty now.

redCup.wash() // The tableware has been washed.
~~~

{{s3.p36}}

_________________________________________________________________________

{{s3.p37}}


{{s3.p38}}

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

{{s3.p39}}

~~~js
console.log(Object.getPrototypeOf(yellowCup))
~~~

![](illustrations/Object-static-props-04.png)

~~~js
console.log(Object.getPrototypeOf(Object.getPrototypeOf(yellowCup)))
~~~

![](illustrations/Object-static-props-05.png)

{{s3.p40}}

~~~js
this.__proto__.constructor = Dishes
~~~

{{s3.p41}}

~~~js
this.__proto__ = new Kitchenware()  
~~~

{{s3.p42}}

{{s3.p43}}

~~~js
this.__proto__.constructor = Cup
~~~

{{s3.p44}}

~~~js
yellowCup instanceof Kitchenware  // true
yellowCup instanceof Dishes       // false
yellowCup instanceof Cup          // false
yellowCup instanceof Object       // true
~~~

{{s3.p45}}

_____________________________________________________________________________

{{s3.p46}}

_____________________________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}
{{s4.p3}}
{{s4.p4}}

{{s4.p5}}

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

{{s4.p6}}

~~~console
► (3) ["name", "size", "color"]
~~~

______________________________________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

~~~js
// Добавим еще одно свойство объекту sample
// Свойство operation будет  с геттером и сеттером

Object.defineProperty(sample, 'operation', {
  get: () => this.operation ? this.operation[0] : '?',
  set: newVal => this.operation = newVal + '***'
})
~~~

{{s5.p4}}

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

{{s5.p5}}

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

{{s5.p6}}

~~~console
▼ {get: ƒ, set: ƒ, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► get: ƒ priceUAH()
  ► set: ƒ priceUAH( newPriceUAH )
  ► __proto__: Object
~~~

____________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

~~~html
<body>
  <svg
    width="400"
    height="400"
    style="border: 1px dotted;"
  />
</body>
~~~

{{s6.p3}}

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

{{s6.p4}}

![](illustrations/Object-static-props-07.png)

{{s6.p5}}

~~~js
sample.owner = sample
~~~

![](illustrations/Object-static-props-08.png)

____________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}

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

{{s7.p4}}

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

{{s7.p5}}

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

{{s7.p6}}


~~~js
// Выведем все свойства объекта obj в консоль

console.info('obj = {\n')
for (var x of Object.entries(obj)) {
  console.info(`     ${x[0]}:${x[1]}\n`)
}
console.info('}')
~~~

{{s7.p7}}

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

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

~~~js
var string = 'Welcome to JS!'

string.split(' ') // ["Welcome", "to", "JS!"]

console.log(string) // "Welcome to JS!"
~~~

_______________________________________________________________________

{{s8.p3}}

{{s8.p4}}

~~~js
var food = ['milk', 'apple', 'soup']

food.push('meat')

console.log(food) // ["milk", "apple", "soup", "meat"]
~~~

_______________________________________________________________________

{{s8.p5}}

{{s8.p6}}

~~~js
var provider = { name: 'Google' }

provider.addProp = function (propName, propVal) {
  this[propName] = propVal
}

provider.addProp('browser', 'Chrome')

console.log(provider) // { name: "Google", browser: "Chrome" }
~~~

____________________________________________________

{{s8.p7}}

{{s8.p8}}

{{s8.p9}}

~~~js
var provider = { name: 'Google' }

Object.freeze(provider)

provider.addProp = function (propName, propVal) {
  this[propName] = propVal
}

console.log(provider) // { name: "Google" }
~~~

{{s8.p10}}

{{s8.p11}}

{{s8.p12}}

~~~js
var provider = { name: 'Google', service: 'API' }

Object.freeze(provider)

delete provider.service  // false

console.log(provider) // { name: "Google", service: "API" }
~~~

{{s8.p13}}

{{s8.p14}}

{{s8.p15}}

~~~js
var provider = { name: "Google", service: "API" }

Object.freeze ( provider )

provider.name = "Mozilla"

console.log ( provider.name ) // Google
~~~

{{s8.p16}}

{{s8.p17}}

{{s8.p18}}

{{s8.p19}}

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

{{s8.p20}}

{{s8.p21}}

~~~js
provider.name = 'Mozilla'

console.log(provider.name) // "Google"
~~~

{{s8.p22}}

~~~js
Object.defineProperty(provider, 'name', {
  enumerable: true,
  writable: true
})

provider.name = 'Mozilla'
~~~

{{s8.p23}}

~~~js
for (var prop in provider) {
  console.log(`${prop}: ${provider [ prop ]}`)
}

// name: Mozilla
// service: API
~~~

{{s8.p24}}

{{s8.p25}}

~~~js
Object.freeze(provider)

Object.defineProperty(provider, 'service', {
  enumerable: false,
  writable: false
})
~~~

{{s8.p26}}

{{s8.p27}}

{{s8.p28}}

{{s8.p29}}

~~~js
Object.getOwnPropertyDescriptor(provider, 'service')
~~~

{{s8.p30}}

{{s8.p31}}

{{s8.p32}}

{{s8.p33}}

{{s8.p34}}
_________________________________________________________________________________________________

## ![ico-25 icon] {{s9.h1}}

{{s9.p1}}
{{s9.p2}}
{{s9.p3}}
{{s9.p4}}

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}

{{s10.p3}}
{{s10.p4}}
{{s10.p5}}
{{s10.p6}}
{{s10.p7}}
{{s10.p8}}
{{s10.p9}}

_________________________________________________________________

{{s10.p10}}

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

{{s10.p11}}

~~~console

▼ {value: ƒ, writable: true, enumerable: true, configurable: true}
    configurable: true
    enumerable: true
  ► value: ƒ getName()
    writable: true
  ► __proto__: Object
~~~


____________________________

## ![ico-25 icon] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}
{{s11.p3}}
{{s11.p4}}
{{s11.p5}}

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

{{s11.p6}}

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

## ![ico-25 icon] {{s12.h1}}

{{s12.p1}}

~~~js
var funcObject = {
  getName () {},
  setName () {}
}
var newObject = Object.assign({}, { name: 'Егор', age: 25 }, { write: true, read: true }, funcObject)
Object.getOwnPropertyNames(newObject)
~~~

{{s12.p2}}

~~~console

(6) ["name", "age", "write", "read", "getName", "setName"]
~~~
____________________________

## ![ico-25 icon] {{s13.h1}}

{{s13.p1}}
{{s13.p2}}

{{s13.p3}}

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

{{s13.p4}}

~~~console

(3) [ "name", "age", "speciality" ]
~~~

{{s13.p5}}

~~~js
console.log(Object.keys(Human.prototype))
~~~

{{s13.p6}}

~~~console

(2) [ "setSpeciality", "employed" ]
~~~

{{s13.p7}}

~~~js
man.employed = true
console.log(Object.keys(man))
~~~

{{s13.p8}}

~~~console

(4) [ "name", "age", "speciality", "employed" ]
~~~

{{s13.p9}}

~~~js
console.log(man.employed)           // true
console.log(man.__proto__.employed) // false
~~~
____________________________

## ![ico-25 icon] {{s14.h1}}

{{s14.p1}}
{{s14.p2}}

{{s14.p3}}

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

{{s14.p4}}

{{s14.p5}}
{{s14.p6}}

{{s14.p7}}


{{s14.p8}}

~~~js
const admin = {
  name: 'Stephan',
  age: 25
}
~~~

{{s14.p9}}

{{s14.p10}}

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


{{s14.p11}}

~~~js
Object.setPrototypeOf(admin, proto)
~~~

{{s14.p12}}

{{s14.p13}}

~~~console

▼ { name: "Stephan", age: 25 }
    age: 25
    name: "Stephan"
  ▼ __proto__:
      ► getName: getName() { return this[ Object.keys ( this ) .find ( key => {…}
      ► valueOf: valueOf() { let prop = Object.keys ( this ) .find ( key => {…}
      ► __proto__: Object
~~~


{{s14.p14}}

~~~js
console.log(admin.getName()) // Stephan
console.log(admin.valueOf()) // 25
~~~

{{s14.p15}}

~~~js
const user = {
  login: 'Stephan',
  hobby: 'fishing'
}
~~~

{{s14.p16}}

{{s14.p17}}

~~~js
Object.setPrototypeOf(user, proto)
~~~

{{s14.p18}}

~~~js
console.log(user.getName()) // user
console.log(user.valueOf()) // 0
~~~
____________________________

## ![ico-25 icon] {{s15.h1}}

{{s15.p1}}

{{s15.p2}}
{{s15.p3}}

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

{{s15.p4}}

~~~console

(5) ["first", "circle", "red", 100, Array(2)]
~~~
____________________________

{{s15.p5}}
{{s15.p6}}
{{s15.p7}}
{{s15.p8}}
{{s15.p9}}
{{s15.p10}}
{{s15.p11}}

{{s15.p12}}
____________________________

{{s15.p13}}
