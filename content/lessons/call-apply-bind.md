# ![ico-30 study] {{s1.h1}}

____________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
( "_anonymous_" )

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var func = new Function('x', 'y', `
  console.log(x, y)
  console.log(this)
  return arguments
`)

func(5, 8, 11, false)
~~~

{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

~~~js
console.dir(func)
~~~

**{{common.c2}}**

~~~console
▼ ƒ anonymous(x,y,z )
    arguments: null
    caller: null
    length: 3
    name: "anonymous"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}
{{s3.p4}}


~~~js
console.dir(Function)
~~~

^^^[{{common.c2}}]

~~~console
▼ ƒ Function()
    arguments: (...)
    caller: (...)
    length: 1
    name: "Function"
  ▼ prototype: ƒ ()
      ► apply: ƒ apply()
        arguments: (...)
      ► bind: ƒ bind()
      ► call: ƒ call()
        caller: (...)
      ► constructor: ƒ Function()
        length: 0
        name: ""
      ► toString: ƒ toString()
      ► Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
      ► get arguments: ƒ ()
      ► set arguments: ƒ ()
      ► get caller: ƒ ()
      ► set caller: ƒ ()
      ► __proto__: Object
  ► __proto__: ƒ ()
~~~

^^^

{{s3.p5}}

~~~js
function func () {
  console.dir(this)
}

console.dir(func)
~~~

^^^[{{common.c2}}]

~~~console
▼ ƒ func()
    arguments: null
    caller: null
    length: 0
    name: "func"
  ► prototype: {constructor: ƒ}
  ▼ __proto__: ƒ ()
      ► apply: ƒ apply()
        arguments: (...)
      ► bind: ƒ bind()
      ► call: ƒ call()
        caller: (...)
      ► constructor: ƒ Function()
        length: 0
        name: ""
      ► toString: ƒ toString()
      ► Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
      ► get arguments: ƒ ()
      ► set arguments: ƒ ()
      ► get caller: ƒ ()
      ► set caller: ƒ ()
      ► __proto__: Object
~~~

^^^

{{s3.p6}}

_________________________________

{{s3.p7}}

{{s3.p8}}
{{s3.p9}}

{{s3.p10}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
function sample () {
  console.info('I\'m sample')
}

function figure () {
  console.info('I\'m figure')
}

var funcs = ['sample', 'figure']

for (var func of funcs) {
  window[func]()
}
~~~

{{s3.p11}}

~~~console
I'm sample
I'm figure
~~~

____________________________________

## ![ico-25 icon] {{common.c19}}

@@@@
![](images/funcs-call-girls-ukr.svg)

{{s4.p1}}
@@@@

{{s4.p2}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var obj = {
  name: 'google',
  say: function () {
    console.log(this.name)
  }
}
obj.say()   // google
~~~

{{s4.p3}}
{{s4.p4}}

~~~js
window.name = 'window'

function say () {
  console.log(this.name)
}

var obj = {
  name: 'google',
  say: say
}

say()       // window
obj.say()   // google
~~~

_____________________________________________

{{s4.p5}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function getName () {
  console.log(this.name)
}

getName.getName = getName

getName.getName()
~~~
_____________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

![ico-20 green-ok] **~apply()~**
![ico-20 green-ok] **~call()~**
![ico-20 green-ok] **~bind()~**

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}

{{s5.p7}}

### ![ico-20 icon] call()

{{s5.p8}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
window.name = 'window'

function func () {
  console.log(this.name)
}

var figure = {
  name: 'figure'
}

var sample = {
  name: 'sample'
}

func()               // window
func.call(figure)    // figure
func.call(sample)    // sample
~~~

{{s5.p9}}

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.call(figure, 9, false, 'Hello')
func.call(sample, 5, 1, 'Bye')
~~~

**{{common.c2}}**

••figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••
••sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••


________________________________________

### ![ico-20 icon] apply()

{{s5.p11}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.apply(figure, [9, false, 'Hello'])
func.apply(sample, [5, 1, 'Bye'])
~~~

**{{common.c2}}**

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

__________________________________________________


{{s5.p13}}
{{s5.p14}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
var args = [0]

var test = (function () {
  var counter = 0
  return function () {
    args.push(this.name)
    args[0] = ++counter
  }
})()

function func () {
  this.test()
  var args = Array.from(arguments)
  console.warn(`Who was called before ${this.name} (${args.splice(0, 1)}):`)
  for (var x of args) console.info(x)
}

var objects = [
  { name: 'figure', test },
  { name: 'sample', test },
  { name: 'google', test }
]

objects.forEach(obj => func.apply(obj, args))
~~~

**{{common.c2}}**

••![ico-20 warn] ► Who was called before figure (0):••
••![ico-20 warn] ► Who was called before sample (1):••
••figure••
••![ico-20 warn] ► Who was called before google (2):••
••figure••
••sample••

_____________________________

{{s5.p16}}
{{s5.p17}}
{{s5.p18}}

______________________________________________________________________________

### ![ico-20 icon] bind()

{{s5.p19}}

{{s5.p20}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
function bindContext (func, context, args) {
  func.call(context, args)
}

function sample ( message ) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Фигаро' }

bindContext(sample, user, 'Hello')
~~~

{{s5.p21}}
{{s5.p22}}
{{s5.p23}}

~~~js
function bindContext (func, context, props) {
  return function (args) {
    props ? func.call(context, props, args) : func.call(context, args)
  }
}

function sample (message) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Фигаро' }

var userSayHello = bindContext(sample, user, 'Hello')

var userSay = bindContext(sample, user)

userSayHello()     // Фигаро: Hello
userSay('Bye')  // Фигаро: Bye
~~~

{{s5.p24}}

____________________________

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var test = (function () {
  var counter = 0
  return function () {
    return ++counter
  }
})()

function func () {
  console.warn(`Функция func вызвана ${this.test()} раз в контексте объекта ${this.name}`)
}

var objects = [
  { name: 'figure', test: test },
  { name: 'sample', test: test },
  { name: 'google', test: test }
]

var funcs = objects.map(obj => func.bind(obj))

funcs[0]()
funcs[1]()
funcs[2]()
~~~

**{{common.c2}}**

{{s5.p26}}
{{s5.p27}}
{{s5.p28}}

_____________________________

{{s5.p29}}
{{s5.p30}}

____________________________________

{{s5.p31}}

◘◘![ico-25 cap] **10**◘◘

~~~js
var bloom = { name: 'bloom' }
bloom.figure = funcs[0]
bloom.sample = funcs[1]
bloom.google = funcs[2]

bloom.figure()
bloom.sample()
bloom.google()
~~~

**{{common.c2}}**

{{s5.p33}}
{{s5.p34}}
{{s5.p35}}

_______________________________

{{s5.p36}}

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

{{s5.p37}}
{{s5.p38}}


_________________________________________

## ![ico-25 smile] {{s6.h1}}

{{s6.p1}}

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

{{s6.p2}}
