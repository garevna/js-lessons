# ![ico-30 study] Changing the context

____________________________________________

## ![ico-25 icon] The Function constructor

Functions can be created by explicitly calling the **Function** constructor with the keyword **_~new~_**

![ico-20 warn] However, it should be noted that functions created in this way will be anonymous
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

^^As a result, 5 and 8 will be printed to the console^^
^^followed by the global object ~window~^^
^^followed by the ~arguments~ function object, containing 5, 8, 11, ~false~^^

~~~js
console.dir(func)
~~~

**Result in the console:**

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

## ![ico-25 icon] Inheritance

So, every function in JS is an _instance_ of the **Function** class

It follows that:
![ico-20 pin] every function is an object
![ico-20 pin] all functions inherit properties and methods from the **_prototype_** object of the **Function** constructor


~~~js
console.dir(Function)
~~~

^^^[Result in the console:]

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

![ico-20 warn] The **~&#95;&#95;proto&#95;&#95;~** property of any function is a reference to the **_prototype_** property of the **Function** constructor

~~~js
function func () {
  console.dir(this)
}

console.dir(func)
~~~

^^^[Result in the console:]

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

![ico-20 pin] Since the **Function** constructor is also a function, its **_~__proto__~_** property is likewise a reference to its own **_~prototype~_** property

_________________________________

A function in JS:

![ico-20 pin] is always a method (i.e. a property of some object)
![ico-20 pin] is always called within the context of some object

^^Let’s show that functions declared in the global scope are, by default, properties of the global object ~window~^^

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

^^All functions whose names are listed in the array **_funcs_** will be called and the output will be displayed in the console^^

~~~console
I'm sample
I'm figure
~~~

____________________________________

## ![ico-25 icon] prototype

@@@@
![](slogans/funcs-call-girls.svg)

As we already know, at the moment of invocation, each function receives a reference to the call context **_~this~_**.<br><br>If the context is not explicitly specified during the call, the global object (~window~) is implied by default.
@@@@

Explicit context specification occurs when accessing methods of a particular object:

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

^^Here, the call context **obj** is explicitly specified before the method name **_say()_**^^
^^Therefore, _**~this~**_ inside the **_say()_** method is a reference to **obj**^^

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

Work out for yourself the context of the method call ~getName~ within the function ~getName~:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function getName () {
  console.log(this.name)
}

getName.getName = getName

getName.getName()
~~~
_____________________________________________

## ![ico-25 icon] Changing the context

By looking at the **_~prototype~_** property of the **Function** constructor or the **_~&#95;&#95;proto&#95;&#95;~_** property of a function instance
you will find three methods that all functions inherit from their creator:

![ico-20 green-ok] **~apply()~**
![ico-20 green-ok] **~call()~**
![ico-20 green-ok] **~bind()~**

These methods provide the ability to flexibly manipulate the context of a function call

The methods **~apply~** and **~call~** allow a function to be called once in a given context

They differ only in the way arguments are passed

The method **~bind~** creates a new instance of the function with a fixed call context, which cannot be changed or ‘lost’ during subsequent calls

Furthermore, **~bind~** also allows arguments to be rigidly bound to the new instance: in effect, the specified arguments will become constant for the new instance of the function

### ![ico-20 icon] call()

The first mandatory argument of the method is a reference to the object in whose context the function will be called

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

This may be followed by a list of arguments:

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.call(figure, 9, false, 'Hello')
func.call(sample, 5, 1, 'Bye')
~~~

**Result in the console:**

••figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••
••sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••


________________________________________

### ![ico-20 icon] apply()

The **_apply()_** method differs from the **_call()_** method only in the way arguments are passed – they must now be passed as an array:

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

**Result in the console:**

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

__________________________________________________


Passing an array of arguments rather than a list of their values provides a certain degree of flexibility
as arrays are passed by reference, and the contents of the array may be dynamically updated from one call to the next

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

**Result in the console:**

••![ico-20 warn] ► Who was called before figure (0):••
••![ico-20 warn] ► Who was called before sample (1):••
••figure••
••![ico-20 warn] ► Who was called before google (2):••
••figure••
••sample••

_____________________________

^^Calls to the **_func_** function are logged in the **args** array^^
^^With each call, the **_func_** function receives, as arguments, a complete record of how many times it has been called previously and in what context^^
^^Поменяйте местами вызовы функций, или добавьте повторный вызов любой из функций, и посмотрите результат^^

______________________________________________________________________________

### ![ico-20 icon] bind()

По сути, метод **~bind~** является декоратором, поскольку он создает обертку для исходной функции

Функция-wrapper, в которую "заворачивается" исходная функция, вызывает ее в нужном контексте:

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

Чтобы функция-wrapper возвращала новый экземпляр, немного изменим код,
а так же обеспечим возможность привязки не только контекста вызова,
но и аргументов ( этот прием программирования называется **_Currying_**, или каррирование ):

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

Вот и весь механизм работы метода **~bind~**

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

**Result in the console:**

••![ico-20 warn] ► Функция func вызвана 1 раз в контексте объекта figure••
••![ico-20 warn] ► Функция func вызвана 2 раз в контексте объекта sample••
••![ico-20 warn] ► Функция func вызвана 3 раз в контексте объекта google••

_____________________________

^^Теперь контекст вызова экземпляров **_figureFunc()_**, **_sampleFunc()_** и **_googleFunc()_** изменить невозможно,
и при вызове этих функций не нужно явно указывать, в каком контексте они вызываются^^

____________________________________

Добавим еще один объект **bloom** с методами **_figure()_**, **_sample()_** и **_google()_**:

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

**Result in the console:**

••![ico-20 warn] ► Функция func вызвана 4 раз в контексте объекта figure••
••![ico-20 warn] ► Функция func вызвана 5 раз в контексте объекта sample••
••![ico-20 warn] ► Функция func вызвана 6 раз в контексте объекта google••

_______________________________

Несмотря на явное указание контекста при вызове методов:

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

они отрабатывают в том контексте, который мы им "прибиндили" до этого
"Прибиндить" можно не только контекст вызова, но также и аргументы


_________________________________________

## ![ico-25 smile] Тест на вынос мозга

![ico-20 question] Что произойдет в результате запуска кода:

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

※※※tests quiz/call-apply-bind※※※
