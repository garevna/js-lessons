# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}

{{p6}}

_________________________

@@@@

![](createPath("images", "smoke-monkey.gif"))
{{p7}}

@@@@

__________________________________


{{p8}}
{{p9}}
{{p10}}
{{p11}}

{{p12}}
{{p13}}
{{p14}}


{{p15}}

{{p16}}

{{p17}}

{{p18}}

_____________________________________________________________

## ![ico-25 icon] prototype

{{p19}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var sample = {
  name: 'master'
}
~~~

{{p20}}

~~~console
▼ { name: "master" }
    name: "master"
  ► __proto__: Object
~~~

{{p21}}

{{p22}}

{{p23}}
{{p24}}

______________________

@@@@

![](createPath("images", "cat-no.gif"))
{{p25}}

@@@@

__________________________

{{p26}}

{{p27}}

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

{{p28}}

{{p29}}

{{p30}}

{{p31}}

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

{{p32}}

{{p33}}

~~~js
sample.hasOwnProperty('name')   // true
~~~

{{p34}}

{{p35}}

{{p36}}

{{p37}}

{{p38}}
{{p39}}
{{p40}}

_________________________________________________________________

## ![ico-25 icon] constructor

{{p41}}

{{p42}}

{{p43}}

{{p44}}

{{p45}}

{{p46}}

{{p47}}
{{p48}}

{{p49}}

{{p50}}

{{p51}}

{{p52}}

___________________________________________________________________

{{p53}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
console.dir(function Sigma () {})
~~~

{{p54}}

{{p55}}

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

{{p56}}

{{p57}}

{{p58}}

{{p59}}

{{p60}}

{{p61}}

{{p62}}

~~~js
var obj = new Sigma
~~~

{{p63}}

{{p64}}

~~~js
function Sigma () {}

Sigma.prototype.say = function () {
  console.log('I\'m the instance of Sigma: ', this instanceof Sigma)
}
var obj = {}
obj.__proto__ = Sigma.prototype
~~~

{{p65}}

{{p66}}

~~~js
obj.__proto__ = Sigma.prototype
~~~

{{p67}}

{{p68}}

~~~js
obj.say()
~~~

{{p69}}

{{p70}}

{{p71}}

{{p72}}

{{p73}}

{{p74}}

{{p75}}

{{p76}}

{{p77}}

{{p78}}

{{p79}}

_________________________________________________________________________

## ![ico-25 icon] this

{{p80}}

{{p81}}

{{p82}}

{{p83}}

{{p84}}

{{p85}}

~~~js
Sigma.prototype.say = function () {
  console.log(`My name is ${this.name}`)
}
~~~

{{p86}}

~~~js
obj.name = 'Google'
~~~

{{p87}}

~~~js
obj.say()   // My name is  Google
~~~

{{p88}}

{{p89}}

{{p90}}

{{p91}}

{{p92}}
{{p93}}

{{p94}}

{{p95}}

{{p96}}

{{p97}}

{{p98}}

__________________________________________________________________________

## ![ico-25 icon] {{p99}}

{{p100}}

~~~console
▼ Sigma {name: "Google"}
    name: "Google"
  ▼ __proto__:
    ► say: ƒ ()
    ► constructor: ƒ Sigma()
    ► __proto__: Object
~~~

{{p101}}

{{p102}}
{{p103}}
{{p104}}
{{p105}}
{{p106}}
{{p107}}

{{p108}}

{{p109}}

{{p110}}

{{p111}}

{{p112}}

________________________________________________________

## ![ico-25 icon] {{p113}}

{{p114}}

{{p115}}

{{p116}}

{{p117}}

{{p118}}

~~~js
var obj = Object.create(null)
~~~

{{p119}}

{{common.c9}}

~~~js
var obj = {}
obj.__proto__ = null
~~~

_____________________________________________________


### ![ico-20 icon] {{p120}}

{{p121}}

{{p122}}

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

{{p123}}

____________________________________

{{p124}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var sample = Object.create({ type: 'figure' })
sample.name = 'circle'
~~~

{{p125}}

~~~console
▼ { name: "circle" }
    name: "circle"
  ▼ __proto__:
        type: "figure"
      ► __proto__: Object
~~~

{{p126}}
{{p127}}
{{p128}}
{{p129}}

_________________________________________

{{p130}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
var sample = {
  name: 'circle'
}
var sample = Object.setPrototypeOf(sample, { type: 'figure' })
~~~

{{p131}}

{{p132}}

~~~js
var test = Object.create(sample)
test.draw = function () {
  console.log(this.name)
}
~~~

{{p133}}

~~~console
▼ { draw: ƒ }
    draw: ƒ ()
  ▼ __proto__:
        name: "circle"
      ► __proto__:
            type: "figure"
          ► __proto__: Object
~~~

{{p134}}

{{p135}}

_______________________________________________________________________

### ![ico-20 icon] Object.&#95;&#95;proto&#95;&#95;

{{p136}}

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

{{p137}}

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

{{p138}}

~~~js
console.dir( Object.__proto__.constructor.name)
// Function
~~~

{{p139}}

{{p140}}

{{p141}}

{{p142}}
| ~Object.&#95;&#95;proto&#95;&#95;~ | ~Function.prototype~ |
| ~Function.prototype.&#95;&#95;proto&#95;&#95;~ | ~Object.prototype~ |

_____________________________________________________

## ![ico-25 cap] {{common.c0}}

{{p143}}

{{p144}}

~~~js
for (var prop in console) console.log(prop)
~~~

{{p145}}

~~~js
console['log']
console['dir']
console['info']
console['warn']
console['error']
~~~

{{p146}}

{{p147}}

{{p148}}

{{p149}}

~~~js
console['log']('Привет!')
~~~

{{p150}}

{{p151}}

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

{{p152}}

{{p153}}

{{p154}}

{{p155}}

~~~js
presence[student] ? 'info' : 'error'
~~~

{{p156}}

~~~js
for (var student in presence) {
  console[presence[student] ? 'info' : 'error'](student)
}
~~~

{{p157}}

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
{{p158}}

~~~js
var lessonDate = new Date().toLocaleString().split(', ')[0]

for (var student of group) {
  student.present.push({
    data: lessonDate,
    name: presence[student.name]
  })
}
~~~

{{p159}}

_____________________________________________________

※※※exercises ⟦f39⟧※※※

__________________________________________________

[![ico-20 link] ^^Global_Objects^^](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
[![ico-20 link] ^^Object-Oriented JavaScript^^](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
