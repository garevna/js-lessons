# ![ico-30 study] {{s1.h1}}

____________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

~~~js
var func = new Function('x', 'y', `
  console.log(x, y)
  console.log(this)
  return arguments
`)

func(5, 8, 11, false)
~~~

{{s2.p5}}
{{s2.p6}}
{{s2.p7}}

~~~js
console.dir(func)
~~~

{{s2.p8}}

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

^^^[{{s3.spoiler1}}]

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

^^^[{{s3.spoiler2}}]

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

{{s3.p11}}

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

{{s3.p12}}

~~~console
I'm sample
I'm figure
~~~

____________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
![](images/funcs-call-girls-ukr.svg)

{{s4.p2}}
{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

~~~js
var obj = {
  name: 'google',
  say: function () {
    console.log(this.name)
  }
}
obj.say()   // google
~~~

{{s4.p6}}
{{s4.p7}}

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

{{s4.p8}}

{{s4.p9}}

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

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}

{{s5.p7}}

{{s5.p8}}

{{s5.p9}}

{{s5.p10}}

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

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

{{s6.p3}}

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.call(figure, 9, false, 'Hello')
func.call(sample, 5, 1, 'Bye')
~~~

{{s6.p4}}

{{s6.p5}}
{{s6.p6}}


________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.apply(figure, [9, false, 'Hello'])
func.apply(sample, [5, 1, 'Bye'])
~~~

{{s7.p3}}

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

__________________________________________________


{{s7.p4}}
{{s7.p5}}

{{s7.p6}}

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

{{s7.p7}}

{{s7.p8}}
{{s7.p9}}
{{s7.p10}}
{{s7.p11}}
{{s7.p12}}
{{s7.p13}}

_____________________________

{{s7.p14}}
{{s7.p15}}
{{s7.p16}}

______________________________________________________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

{{s8.p3}}

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

{{s8.p4}}
{{s8.p5}}
{{s8.p6}}

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

{{s8.p7}}

____________________________

{{s8.p8}}

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

{{s8.p9}}

{{s8.p10}}
{{s8.p11}}
{{s8.p12}}

_____________________________

{{s8.p13}}
{{s8.p14}}

____________________________________

{{s8.p15}}

{{s8.p16}}

~~~js
var bloom = { name: 'bloom' }
bloom.figure = funcs[0]
bloom.sample = funcs[1]
bloom.google = funcs[2]

bloom.figure()
bloom.sample()
bloom.google()
~~~

{{s8.p17}}

{{s8.p18}}
{{s8.p19}}
{{s8.p20}}

_______________________________

{{s8.p21}}

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

{{s8.p22}}
{{s8.p23}}


_________________________________________

## ![ico-25 smile] {{s9.h1}}

{{s9.p1}}

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

{{s9.p2}}
