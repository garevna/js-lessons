# ![ico-30 study] Changing the context⟪Changing_the_context⟫

____________________________________________

## ![ico-25 icon] The Function constructor⟪The_Function_constructor⟫

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

~~~console
▼ ƒ anonymous(x,y,z )
    arguments: null
    caller: null
    length: 3
    name: "anonymous"
  ► prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()
~~~

________________________________

## ![ico-25 icon] Inheritance⟪Inheritance⟫

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
      ► [[Prototype]]: Object
  ► [[Prototype]]: ƒ ()
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
  ▼ [[Prototype]]: ƒ ()
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
      ► [[Prototype]]: Object
~~~

^^^

![ico-20 pin] Since the **Function** constructor is also a function, its **~__proto__~** property is likewise a reference to its own **~prototype~** property

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

## ![ico-25 icon] prototype⟪prototype⟫

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

## ![ico-25 icon] Changing the context⟪Changing_the_context⟫

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

### ![ico-20 icon] call()⟪call⟫

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

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

________________________________________

### ![ico-20 icon] apply()⟪apply⟫

The **~apply()~** method differs from the **~call()~** method only in the way arguments are passed – they must now be passed as an array:

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

~~~console

<p class="warning-message">Who was called before figure (0):</p>
<p class="warning-message">Who was called before sample (1):</p>
figure
<p class="warning-message">Who was called before google (2):</p>
figure
sample

~~~

_____________________________

^^Calls to the **_func_** function are logged in the **args** array^^
^^With each call, the **_func_** function receives, as arguments, a complete record of how many times it has been called previously and in what context^^
^^Swap the order of the function calls, or add a repeat call to any of the functions, and see what happens^^

______________________________________________________________________________

### ![ico-20 icon] bind()⟪bind⟫

Essentially, the **~bind~** method is a decorator, as it creates a wrapper for the original function

The wrapper function, into which the original function is wrapped, calls it in the required context:

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

To ensure the wrapper function returns a new instance, let’s make a slight change to the code,
and also allow us to bind not only the call context,
but also the arguments (this programming technique is called **_Currying_**):

~~~js
function bindContext (func, context, props) {
  return function (args) {
    props ? func.call(context, props, args) : func.call(context, args)
  }
}

function sample (message) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Figaro' }

var userSayHello = bindContext(sample, user, 'Hello')

var userSay = bindContext(sample, user)

userSayHello()     // Figaro: Hello
userSay('Bye')  // Figaro: Bye
~~~

That’s the whole mechanism behind the **~bind~** method

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
  console.warn(`The function func is called ${this.test()} times within the context of the object ${this.name}`)
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

~~~console
<p class="warning-message">The function func is called 1 times within the context of the object figure</p>
<p class="warning-message">The function func is called 2 times within the context of the object sample</p>
<p class="warning-message">The function func is called 3 times within the context of the object google</p>
~~~

_____________________________

^^It is now impossible to change the call context of the instances **~figureFunc()~**, **~sampleFunc()~** and **~googleFunc()~**,^^
^^and when calling these functions, there is no need to explicitly specify the context in which they are called^^

____________________________________

Let’s add another object **bloom** with the methods **~figure()~**, **~sample()~** and **~google()~**:

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

~~~console
<p class="warning-message">The function func is called 4 times within the context of the object figure</p>
<p class="warning-message">The function func is called 5 times within the context of the object sample</p>
<p class="warning-message">The function func is called 6 times within the context of the object google</p>
~~~

_______________________________

Despite explicitly specifying the context when calling methods:

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

they are executed in the context that we bound to them previously
You can attach not only the call context but also the arguments

_________________________________________

## ![ico-25 smile] A mind-bending test⟪A_mind-bending_test⟫

![ico-20 question] What will happen when the following code is run:

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
