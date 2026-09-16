# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

_________________________

@@@@

![](createPath("images", "smoke-monkey.gif"))
{{s1.p6}}

@@@@

__________________________________


{{s1.p7}}
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

_____________________________________________________________

## ![ico-25 icon] prototype

{{s1.p18}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sample = {
  name: 'master'
}
~~~

{{s1.p19}}

~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__: Object
~~~

{{s1.p20}}

{{s1.p21}}

{{s1.p22}}
{{s1.p23}}

______________________

@@@@

![](createPath("images", "cat-no.gif"))
{{s1.p24}}

@@@@

__________________________

{{s1.p25}}

{{s1.p26}}

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

{{s1.p27}}

{{s1.p28}}

{{s1.p29}}

{{s1.p30}}

^^^[Object.prototype]
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

{{s1.p31}}

{{s1.p32}}

~~~js
sample.hasOwnProperty('name')   // true
~~~

{{s1.p33}}

{{s1.p34}}

{{s1.p35}}

{{s1.p36}}

{{s1.p37}}
{{s1.p38}}
{{s1.p39}}

_________________________________________________________________

## ![ico-25 icon] constructor

{{s1.p40}}

{{s1.p41}}

{{s1.p42}}

{{s1.p43}}

{{s1.p44}}

{{s1.p45}}

{{s1.p46}}
{{s1.p47}}

{{s1.p48}}

{{s1.p49}}

{{s1.p50}}

{{s1.p51}}

___________________________________________________________________

{{s1.p52}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
console.dir(function Sigma () {})
~~~

{{s1.p53}}

{{s1.p54}}

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

{{s1.p55}}

{{s1.p56}}

{{s1.p57}}

{{s1.p58}}

{{s1.p59}}

{{s1.p60}}

{{s1.p61}}

~~~js
var obj = new Sigma
~~~

{{s1.p62}}

{{s1.p63}}

~~~js
function Sigma () {}

Sigma.prototype.say = function () {
  console.log('I\'m the instance of Sigma: ', this instanceof Sigma)
}
var obj = {}
obj.__proto__ = Sigma.prototype
~~~

{{s1.p64}}

{{s1.p65}}

~~~js
obj.__proto__ = Sigma.prototype
~~~

{{s1.p66}}

{{s1.p67}}

~~~js
obj.say()
~~~

{{s1.p68}}

{{s1.p69}}

{{s1.p70}}

{{s1.p71}}

{{s1.p72}}

{{s1.p73}}

{{s1.p74}}

{{s1.p75}}

{{s1.p76}}

{{s1.p77}}

{{s1.p78}}

_________________________________________________________________________

## ![ico-25 icon] this

{{s1.p79}}

{{s1.p80}}

{{s1.p81}}

{{s1.p82}}

{{s1.p83}}

{{s1.p84}}

~~~js
Sigma.prototype.say = function () {
  console.log(`My name is ${this.name}`)
}
~~~

{{s1.p85}}

~~~js
obj.name = 'Google'
~~~

{{s1.p86}}

~~~js
obj.say()   // My name is  Google
~~~

{{s1.p87}}

{{s1.p88}}

{{s1.p89}}

{{s1.p90}}

{{s1.p91}}
{{s1.p92}}

{{s1.p93}}

{{s1.p94}}

{{s1.p95}}

{{s1.p96}}

{{s1.p97}}

__________________________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

~~~console
▼ Sigma {name: "Google"}
    name: "Google"
  ▼ __proto__:
    ► say: ƒ ()
    ► constructor: ƒ Sigma()
    ► __proto__: Object
~~~

{{s2.p2}}

{{s2.p3}}
{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

~~~js
var obj = Object.create(null)
~~~

{{s3.p6}}

{{common.c9}}

~~~js
var obj = {}
obj.__proto__ = null
~~~

_____________________________________________________


### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

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

{{s4.p3}}

____________________________________

{{s4.p4}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var sample = Object.create({ type: 'figure' })
sample.name = 'circle'
~~~

{{s4.p5}}

~~~console
▼ { name: "circle" }
    name: "circle"
  ▼ __proto__:
        type: "figure"
      ► __proto__: Object
~~~

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}

_________________________________________

{{s4.p10}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
var sample = {
  name: 'circle'
}
var sample = Object.setPrototypeOf(sample, { type: 'figure' })
~~~

{{s4.p11}}

{{s4.p12}}

~~~js
var test = Object.create(sample)
test.draw = function () {
  console.log(this.name)
}
~~~

{{s4.p13}}

~~~console
▼ { draw: ƒ }
    draw: ƒ ()
  ▼ __proto__:
        name: "circle"
      ► __proto__:
            type: "figure"
          ► __proto__: Object
~~~

{{s4.p14}}

{{s4.p15}}

_______________________________________________________________________

### ![ico-20 icon] Object.&#95;&#95;proto&#95;&#95;

{{s4.p16}}

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

{{s4.p17}}

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

{{s4.p18}}

~~~js
console.dir( Object.__proto__.constructor.name)
// Function
~~~

{{s4.p19}}

{{s4.p20}}

{{s4.p21}}

{{s4.p22}}
| ~Object.&#95;&#95;proto&#95;&#95;~ | ~Function.prototype~ |
| ~Function.prototype.&#95;&#95;proto&#95;&#95;~ | ~Object.prototype~ |

_____________________________________________________

## ![ico-25 cap] {{common.c0}}

{{s5.p1}}

{{s5.p2}}

~~~js
for (var prop in console) console.log(prop)
~~~

{{s5.p3}}

~~~js
console['log']
console['dir']
console['info']
console['warn']
console['error']
~~~

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}

{{s5.p7}}

~~~js
console['log']('Привет!')
~~~

{{s5.p8}}

{{s5.p9}}

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

{{s5.p10}}

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

~~~js
presence[student] ? 'info' : 'error'
~~~

{{s5.p14}}

~~~js
for (var student in presence) {
  console[presence[student] ? 'info' : 'error'](student)
}
~~~

{{s5.p15}}

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
{{s5.p16}}

~~~js
var lessonDate = new Date().toLocaleString().split(', ')[0]

for (var student of group) {
  student.present.push({
    data: lessonDate,
    name: presence[student.name]
  })
}
~~~

{{s5.p17}}

_____________________________________________________

※※※exercises ⟦f39⟧※※※

__________________________________________________

[![ico-20 link] ^^Global_Objects^^](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects)
[![ico-20 link] ^^Object-Oriented JavaScript^^](https://developer.mozilla.org/ru/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
