# ![ico-30 study] Closure

[Closure](external/w3-closures) is an effect that allows variables in the context of the parent function—which returns the function—to be ‘hidden’.

[Closure](external/mdn-closures) is a combination of a function and the lexical environment in which that function was declared.

If a function returns a function, the lexical environment of the parent function is included in the scope chain of the child function.

In other words, all arguments passed to the parent function upon invocation, as well as all variables and functions declared within it, will be accessible to the child function (it ‘sees’ them).

^^However, they will not be accessible anywhere else, as references to them are only available to the child function.^^

So, the closure effect only occurs if a function returns a function.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
function parent (arg) {
  var frog = 'I\'m frog'
  return function () {
    console.log(arg, frog)
  }
}

var child = parent('Hello!')
~~~

Let’s call the child function:

~~~js
child()  // Hello!  I'm frog
~~~

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var parent = message => () => console.log(message)

var hello = parent('Hello!')
var welcome = parent('Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

An alternative to closure is another mechanism – currying:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var parent = message => console.log(message)

var hello = parent.bind(null, 'Hello!')
var welcome = parent.bind (null, 'Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function parent (omega) {
  var alpha = 0
  return () => omega > alpha
    ? omega-- - alpha++
    : null
}

var child = parent(20)
~~~

Now, each subsequent call to the **child** function will return a new number that is 2 less than the previous one
and so on, until the returned value is greater than 0

~~~js
child() // 20
child() // 18
...
~~~

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function first (firstArg) {
  function second (secondArg) {
    return firstArg.toString().split('').join(secondArg)
  }
  return function () {
    return second('*')
  }
}

first('Happy New Year!')()
~~~

The result will be: ••‘H*a*p*p*y* *N*e*w* *Y*e*a*r*!’••

_______________________

## ![ico-25 icon] IIFE

**_Immediately Invoked Function Expression_**

A functional expression [**IIFE**](external/mdn-iife), i.e. an ‘in-place’ call to an anonymous function
(at the point where it is declared)

In this example, the anonymous function is ‘enclosed’ in round brackets:

◘◘![ico-25 cap] ** 6**◘◘

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})
~~~

When the engine reaches the line containing this code, it evaluates the expression within the round brackets,
and the value of this expression will be a **reference** to the function declared within the brackets.

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

If parentheses are placed after this function expression, the function will be called immediately at the point where it is declared:

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

As the function declared within the parentheses returns an object, the result will be:

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

As we do not store the resulting reference to the function, the garbage collector will remove the function object from memory during its next pass.
Therefore, an anonymous function is declared within the parentheses, as its name will never be used.

Calling the function without an argument resulted in the object’s `name` property being set to `undefined`

Let’s pass an argument to the function, obtaining the name via the prompt modal window:

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

In the modal window, enter the name **_Semen_**

As a result, the variable `user` will become an object:

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

The anonymous function was called only once, after which it is removed from memory (as the reference to it is not retained).

______________________

In this example, the anonymous function receives the argument “Hello”, declares the variable **_message_** in its functional scope,
in which it stores the value of the argument, and returns the anonymous function.

At this point, its context is deallocated (removed from the stack), and it is logical to assume that the variable **_message_** will also be removed from memory,

![ico-20 yes] but!

The garbage collector cannot remove the variable **_message_** from memory, as the returned anonymous function uses a reference to it within its scope.

As long as there is at least one active reference to the variable, the garbage collector cannot free the memory allocated for that variable.

This effect is called ‘closing’.

After the functional expression has been evaluated, the variable **_func_** will contain a reference to the anonymous function,
within the context of which the variable **_message_** will be ‘bound’.

Now, the reference to the variable **_message_** exists only within the context of the returned function.

◘◘![ico-25 cap] ** 7**◘◘

~~~js
var sayHello = (function (message) {
  return function (name) {
    console.log(`${ message }, ${ name }`)
  }
})('Hello')

sayHello('Дима')
sayHello ('Николай')
~~~

The closure effect is often used to protect variables, but it is important to remember that this is merely a side effect, not a technique in its own right, and that this effect can lead to memory leaks.

-----------------------------

## ![ico-25 icon] The ‘Module’ pattern

Combining IIFE with the closure effect gives us one of the design patterns known as the ‘Module’ pattern, which, unfortunately, is widely used in development as well as when building applications.

Any application is built from modules, each of which has its own isolated scope.
All variables and functions declared within a module are accessible only within that module.

However, in order to ‘hide’ variables and functions within a module, it makes more sense to use currying rather than relying on the side effect of the garbage collector.
I recommend that you familiarise yourself thoroughly with currying, a technique borrowed from functional programming languages; it is a more correct way not only to ‘hide’ variables within a function (or module), but also to construct elegant chained computations.

_____________________________

## ![ico-25 warn] Function

![ico-20 err] Functions created using the **Function** constructor do not create closures

◘◘![ico-25 cap] ** 8**◘◘

~~~js
var __var__ = 'Global Scope'

function functionConstructor() {
  var __var__ = 'Function Scope'
  return new Function('console.warn(__var__)')
}

function functionDeclaration() {
  var __var__ = 'Closured Scope'
  return function () {
    console.info(__var__)
  }
}

functionConstructor()()   // Global Scope
functionDeclaration()()   // Closured Scope
~~~

_____________________________

## ![ico-25 warn] Memory Leaks

![ico-20 warn] Closures can lead to memory leaks.

The following code will cause the application to crash due to a memory overflow:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var globalFunc

function closure () {
  var data = new Array(1000000)
  var func = globalFunc

  function innerFunc() {
    if (func) return data
  }

  return function () {}
}

setInterval(() => globalFunc = closure(), 5)
~~~

What causes memory leaks in this code snippet?

Every time the timer fires, ~closure~ is called and the value of ~globalFunc~ is redefined
In each new instance of ~globalFunc~, the variables ~data~, ~func~ and ~innerFunc~ are captured
At the same time, the reference to the previous value ~globalFunc~ is captured in the local variable ~func~,
which is captured in the closure of the new value ~globalFunc~,
thereby ensuring that, together with the previous value ~globalFunc~, all variables
that were in the closure ~globalFunc~—including ~innerFunc~—are captured in the closure
The variable ~data~ will occupy a considerable amount of memory
The reference to ~data~ is captured in the closure ~innerFunc~
~innerFunc~ is captured in the closure of every new version of ~globalFunc~

This results in deep nesting of variables within the closure, and ~data~ will be duplicated until
this leads to a memory overflow (very quickly, as the timer interval is 5 milliseconds)

_____________________________

[![ico-30 hw] Tests](quiz/closures-timers)
