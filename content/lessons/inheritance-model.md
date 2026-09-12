# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

_________________________

@@@@

{{s1.p6}}
{{s1.p7}}

@@@@

__________________________________


{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}

{{s1.p12}}
{{s1.p13}}
{{s1.p14}}


{{s1.p15}}

{{s1.p16}}

{{s1.p17}}

{{s1.p18}}

_____________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
var sample = {
  name: 'master'
}
~~~

{{s2.p3}}

~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__: Object
~~~

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}

______________________

@@@@

{{s2.p8}}
{{s2.p9}}

@@@@

__________________________

{{s2.p10}}

{{s2.p11}}

~~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__:
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
~~~~

{{s2.p12}}

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

^^^[{{s2.spoiler1}}]
~~~console
▼ {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
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
^^^

{{s2.p16}}

{{s2.p17}}

~~~js
sample.hasOwnProperty('name')   // true
~~~

{{s2.p18}}

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

_________________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}

___________________________________________________________________

{{s3.p13}}

{{s3.p14}}

~~~js
console.dir(function Sigma () {})
~~~

{{s3.p15}}

{{s3.p16}}

~~~console
▼ ƒ Sigma()
    arguments: null
    caller: null
    length: 0
    name: "Sigma"
  ▼ prototype:
    ► constructor: ƒ Sigma()
    ► __proto__: Object
  ► __proto__: ƒ ()
~~~

{{s3.p17}}

{{s3.p18}}

{{s3.p19}}

{{s3.p20}}

{{s3.p21}}

{{s3.p22}}

{{s3.p23}}

~~~js
var obj = new Sigma
~~~

{{s3.p24}}

{{s3.p25}}

~~~js
function Sigma () {}

Sigma.prototype.say = function () {
  console.log('I\'m the instance of Sigma: ', this instanceof Sigma)
}
var obj = {}
obj.__proto__ = Sigma.prototype
~~~

{{s3.p26}}

{{s3.p27}}

~~~js
obj.__proto__ = Sigma.prototype
~~~

{{s3.p28}}

{{s3.p29}}

~~~js
obj.say()
~~~

{{s3.p30}}

{{s3.p31}}

{{s3.p32}}

{{s3.p33}}

{{s3.p34}}

{{s3.p35}}

{{s3.p36}}

{{s3.p37}}

{{s3.p38}}

{{s3.p39}}

{{s3.p40}}

_________________________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

~~~js
Sigma.prototype.say = function () {
  console.log(`My name is ${this.name}`)
}
~~~

{{s4.p7}}

~~~js
obj.name = 'Google'
~~~

{{s4.p8}}

~~~js
obj.say()   // My name is  Google
~~~

{{s4.p9}}

{{s4.p10}}

{{s4.p11}}

{{s4.p12}}

{{s4.p13}}
{{s4.p14}}

{{s4.p15}}

{{s4.p16}}

{{s4.p17}}

{{s4.p18}}

{{s4.p19}}

__________________________________________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

~~~console
▼ Sigma {name: "Google"}
    name: "Google"
  ▼ __proto__:
    ► say: ƒ ()
    ► constructor: ƒ Sigma()
    ► __proto__: Object
~~~

{{s5.p2}}

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}
{{s5.p7}}
{{s5.p8}}

{{s5.p9}}

{{s5.p10}}

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

________________________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

~~~js
var obj = Object.create(null)
~~~

{{s6.p6}}

{{s6.p7}}

~~~js
var obj = {}
obj.__proto__ = null
~~~

_____________________________________________________


### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

~~~~console
▼ Object()
    arguments: (...)
  ► assign: ƒ assign()
    caller: (...)
  ► create: ƒ create()
  ► defineProperties: ƒ defineProperties()
  ► defineProperty: ƒ defineProperty()
  ► entries: ƒ entries()
  ► freeze: ƒ freeze()
  ► fromEntries: ƒ fromEntries()
  ► getOwnPropertyDescriptor: ƒ getOwnPropertyDescriptor()
  ► getOwnPropertyDescriptors: ƒ getOwnPropertyDescriptors()
  ► getOwnPropertyNames: ƒ getOwnPropertyNames()
  ► getOwnPropertySymbols: ƒ getOwnPropertySymbols()
  ► getPrototypeOf: ƒ getPrototypeOf()
  ► is: ƒ is()
  ► isExtensible: ƒ isExtensible()
  ► isFrozen: ƒ isFrozen()
  ► isSealed: ƒ isSealed()
  ► keys: ƒ keys()
    length: 1
    name: "Object"
  ► preventExtensions: ƒ preventExtensions()
  ► prototype: {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
  ► seal: ƒ seal()
  ► setPrototypeOf: ƒ setPrototypeOf()
  ► values: ƒ values()
  ► __proto__: ƒ ()
~~~~

{{s7.p3}}

____________________________________

{{s7.p4}}

{{s7.p5}}

~~~js
var sample = Object.create({ type: 'figure' })
sample.name = 'circle'
~~~

{{s7.p6}}

~~~console
▼ { name: "circle" }
    name: "circle"
  ▼ __proto__:
        type: "figure"
      ► __proto__: Object
~~~

{{s7.p7}}
{{s7.p8}}
{{s7.p9}}
{{s7.p10}}

_________________________________________

{{s7.p11}}

{{s7.p12}}

~~~js
var sample = {
  name: 'circle'
}
var sample = Object.setPrototypeOf(sample, { type: 'figure' })
~~~

{{s7.p13}}

{{s7.p14}}

~~~js
var test = Object.create(sample)
test.draw = function () {
  console.log(this.name)
}
~~~

{{s7.p15}}

~~~console
▼ { draw: ƒ }
    draw: ƒ ()
  ▼ __proto__:
        name: "circle"
      ► __proto__:
            type: "figure"
          ► __proto__: Object
~~~

{{s7.p16}}

{{s7.p17}}

_______________________________________________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

~~~~console
▼ __proto__: ƒ ()
    ► apply: ƒ ()
      arguments: (...)
    ► bind: ƒ ()
    ► call: ƒ ()
      caller: (...)
    ► constructor: ƒ ()
      length: 0
      name: ""
    ► toString: ƒ ()
    ► Symbol(Symbol.hasInstance): ƒ ()
    ► get arguments: ƒ ()
    ► set arguments: ƒ ()
    ► get caller: ƒ ()
    ► set caller: ƒ ()
    ► __proto__: Object
~~~~

{{s8.p2}}

~~~~console
▼ prototype: ƒ ()
    ► apply: ƒ ()
      arguments: (...)
    ► bind: ƒ ()
    ► call: ƒ ()
      caller: (...)
    ► constructor: ƒ ()
      length: 0
      name: ""
    ► toString: ƒ ()
    ► Symbol(Symbol.hasInstance): ƒ ()
    ► get arguments: ƒ ()
    ► set arguments: ƒ ()
    ► get caller: ƒ ()
    ► set caller: ƒ ()
    ► __proto__: Object
~~~~

{{s8.p3}}

~~~js
console.dir( Object.__proto__.constructor.name)
// Function
~~~

{{s8.p4}}

{{s8.p5}}

{{s8.p6}}

{{s8.p7}}
{{s8.p8}}
{{s8.p9}}

_____________________________________________________

## ![ico-25 cap] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

~~~js
for (var prop in console) console.log(prop)
~~~

{{s9.p3}}

~~~js
console['log']
console['dir']
console['info']
console['warn']
console['error']
~~~

{{s9.p4}}

{{s9.p5}}

{{s9.p6}}

{{s9.p7}}

~~~js
console['log']('Привет!')
~~~

{{s9.p8}}

{{s9.p9}}

~~~~js
var presence = {
  'Артюх Илья' : true,
  'Боднарь Михаил' : true,
  'Гончар Виктор' : true,
  'Дмитренко Пётр' : true,
  'Дорошенко Дмитрий' : true,
  'Калашников Григорий' : true,
  'Кержакова Марина' : true,
  'Москаленко Андрей' : true,
  'Ничипоренко Иван' : true,
  'Опрышкин Дмитрий' : true,
  'Подобреева Юлия' : true,
  'Саратова Ольга' : false,
  'Алескерова Евгения' : false
}
~~~~

{{s9.p10}}

{{s9.p11}}

{{s9.p12}}

{{s9.p13}}

~~~js
presence[student] ? 'info' : 'error'
~~~

{{s9.p14}}

~~~js
for (var student in presence) {
  console[presence[student] ? 'info' : 'error'](student)
}
~~~

{{s9.p15}}

~~~~js
var group = [
  {
    name: 'Артюх Илья',
    present: []
  },
  {
    name: 'Боднарь Михаил',
    present: []
  },
  {
    name: 'Гончар Виктор',
    present: []
  },
  {
    name: 'Дмитренко Пётр',
    present: []
  },
  {
    name: 'Дорошенко Дмитрий',
    present: []
  },
  {
    name: 'Калашников Григорий',
    present: []
  },
  {
    name: 'Кержакова Марина',
    present: []
  },
  {
    name: 'Москаленко Андрей',
    present: []
  },
  {
    name: 'Ничипоренко Иван',
    present: []
  },
  {
    name: 'Опрышкин Дмитрий',
    present: []
  },
  {
    name: 'Подобреева Юлия',
    present: []
  },
  {
    name: 'Саратова Ольга',
    present: []
  },
  {
    name: 'Алескерова Евгения',
    present: []
  }
]
~~~~
{{s9.p16}}

~~~js
var lessonDate = new Date().toLocaleString().split(', ')[0]

for (var student of group) {
  student.present.push({
    data: lessonDate,
    name: presence[student.name]
  })
}
~~~

{{s9.p17}}

_____________________________________________________

{{s9.p18}}

__________________________________________________

{{s9.p19}}
{{s9.p20}}
