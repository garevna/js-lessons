# ![ico-30 study] Elements of functional programming in JS⟪Elements_of_functional_programming_in_JS⟫

## ![ico-25 icon] pure function⟪pure_function⟫

•••• none
![ico-20 memo] A **pure function** is a function that:
![ico-20 pin] returns the same result for the same set of arguments (predictable behaviour)
![ico-20 pin] does not affect the external environment, i.e. does not alter the values of external variables (does not create side effects)
![ico-20 pin] does not depend on the state of the environment, because it does not use external variables in its computations
••••

__________________________________________

### ![ico-20 icon] referential transparency⟪referential_transparency⟫

••![ico-20 pin] **_referential transparency_** is the ability to replace a function call with a given set of arguments with the result of that call.••

~~~js
const func = (x, y, z) => x + y - z
~~~

^^A call to the function **~func(3, 4, 2)~** always returns 5 therefore, **~func(3, 4, 2)~** can be replaced with the value 5.^^

^^However, a function like this will not possess the property **~referential transparency~** as the result of its operation will be a pseudo-random number:^^


~~~js
const func = (x, y, z) => x + y - z * Math.random()
~~~

^^In the following example, the **~counter~** function will also not be referentially transparent, as each call to this function will return a new result:^^

~~~js
const makeCounter = () => {
  let counter = 0
  return () => counter++
}

const counter = makeCounter()
~~~

••••
What does referential transparency provide? – optimisation.
The engine can 'remember' a value that has already been computed for a given set of arguments and when the function is called again with the same set of arguments, return the value that was previously computed.
••••

___________________________________________________________

### ![ico-20 icon] Immutability⟪Immutability⟫

••••
![ico-20 pin] **Immutability** – this is resistance to change.
Immutable data is data that does not change over time.
••••

^^In the following example, the variable **~sum~** changes its value three times whilst the loop is being executed:^^

~~~js
const numbers = [10, 5, 7]
let sum = 0

for (const number of array) {
  sum += number
}
~~~

^^And if we use the **~summation~** function:^^

~~~js
const summation = array => {
  return (function recurse (index = 0, sum = 0) {
    sum += array[index++]
    return index < array.length ? recurse (index, sum) : sum
  })()
}
~~~

^^then after the call^^

~~~js
const numbers = [10, 5, 7]

summation(numbers)  // 22
~~~

^^the array **~numbers~** and the variable **~sum~** will not change; that is, the **~summation~** function produces no external effects.^^

^^But this version of the **~summation~** function:^^

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  while (numbers.length > 0) {
    sum += numbers.shift()
  }
  return sum
}
~~~

^^produces side effects, because as a result of calling the function:^^

~~~js
summation()
~~~

^^the values of the external variables **~numbers~** and **~sum~** change.^^

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const numbers = [10, 5, 7]

const summation = (sum = 0) => {
  for (const num of numbers) {
    sum += numbers.shift()
    numbers.push(sum)
  }
  console.log(`[${numbers.toString()}]:`, sum)
}

summation()
summation()
summation()
~~~

~~~console
[10,15,22]: 22
[10,25,47]: 47
[10,35,82]: 82
~~~

________________________________________

### ![ico-20 icon] Idempotence⟪Idempotence⟫

•••• none
![ico-20 pin] An idempotent function is a function whose repeated or multiple application yields the same result as the first application. In other words, if we apply the same function twice or three times to the same set of arguments, the result will be the same as when the function was first called with that set of arguments.
Will calling an idempotent function again not change the state of the system? – Not necessarily. If that were the case, then an idempotent function would, by definition, be pure. Idempotence is a necessary but not sufficient condition for a function to be pure. An idempotent function may modify external data. Indeed, we have reference data types, and if a function takes a reference as an argument, the immutability of the reference itself does not guarantee that the data (array or object) referenced by that reference will not be modified. In other words, an idempotent function will receive the same argument (reference), but this does not mean that it receives the same set of data via that reference.
••••

~~~js
function setAdmin (user) {
  user.role = 'admin'
  return user
}
~~~

It is obvious that the idempotency of functions is very closely linked to the immutability of data. If a function operates on mutable data, its result is unpredictable; in other words, it will not be idempotent.
For instance, the **~summation~** function from Example 1 is not **idempotent**, because each call to the **~summation~** function mutates the source array, thereby altering the result of the next call to the function.

Let’s look at a very simple example of an idempotent function, **~five~**: it always returns 5, so applying this function to the result of the previous call changes nothing, as we can see from the console output:

~~~js
function five () {
  console.log(5)
  return 5
}

five(five(five(five())))
~~~

~~~console
5
5
5
5
<• 5
~~~

So, the result of calling an idempotent function is predictable; it operates on immutable data. A function is a good candidate for being ‘pure’ if it produces no side effects, i.e. it does not alter the state of the system. However, this is not always the case. A function may be idempotent, yet still produce side effects; in other words, it may not be a 'pure' function. For example:

◘◘![ico-25 cap] **2**◘◘

~~~js
function initArray (array) {
  if (!Array.isArray(array) {
    return false
  }
  array.length = 0
  array.push(1, 2, 3, 4, 5)
  return true
}
~~~

••Mutations in the system state cause the application to become unstable and make debugging and testing more difficult.••

_______________________________________________________

## ![ico-25 icon] Higher-order function⟪Higher-order_function⟫

••**_Higher-order function_** — a function that takes other functions as arguments or returns another function as its result.••

••••
Since functions in JS are objects, you can treat them exactly the same way as any other object:
![ico-20 pin] organise into structures (arrays, objects)
![ico-20 pin] pass as an argument
![ico-20 pin] return as a result (which is, in fact, what the constructor **_Function_** does)
In short, everything we can do with objects can be done with functions, since functions are simply objects of the **_Function_** class
••••

### ![ico-20 icon] Function as an argument⟪Function_as_an_argument⟫

◘◘![ico-25 cap] ** 3**◘◘

~~~js
function frog () {
  console.log('frog')
}
function elefant () {
  console.log('elefant')
}

function animal (func) {
  func()
}
~~~

In this example, the **~animal~** function receives a reference to a function as an argument, which it then calls. We can pass various functions to the **~animal~** function.



Let’s call the function **~animal~**:

~~~js
animal(frog)
animal(elefant)
~~~

and in the console we will see:

~~~console
frog
elefant
~~~

However, if the argument passed to the **~animal~** function is not a function, then attempting to call it (using round brackets) will raise an exception (**~TypeError~**)

~~~console
<p class="error-message">Uncaught TypeError&colon; func is not a function</p>
~~~

To avoid this, let’s modify the code of the **~animal~** function slightly by adding a type check for the argument:

~~~js
function animal (func) {
  typeof func === 'function' ? func() : null
}
~~~

Let’s create an element ~div~ and add it to ~document.body~

Let’s set the _~id~_ property of this element to "_sample_"

Let’s modify the code for the **~frog()~** and **~elefant()~** functions:

~~~js
function frog () {
  return 'frog'
}
function elefant () {
  return 'elefant'
}
~~~

Now let’s declare the function **~newFunc()~**, which will create a new element ~ p~, insert it into the container with the identifier _elemId_ and set its content (_~innerHTML~_) using the function passed as an argument:

~~~js
function newFunc (func, elemId) {
  const elem = document.getElementById(elemId)

  if (!elem || !elem.nodeType || elem.nodeType !== 1) return

  function makeElem () {
    const el = document.createElement('p')
    elem.appendChild(el)
    el.innerHTML = func()
    console.log(el)
  }

  typeof func === 'function' && makeElem(func, elem)
}
~~~

Let’s call the **~newFunc~** function, passing the **~frog~** function as the first argument, and passing ~id~ of the element we created ('_sample_') as the second argument:

~~~js
newFunc(frog, 'sample')
~~~

As a result, a new element will appear on the page with the text returned by the **~frog()~** function

Now let’s call the **~newFunc()~** function, passing it the **~elefant()~** function:

~~~js
newFunc(elefant, 'sample')
~~~

As a result, a new element will appear on the page with the text returned by the **~elefant()~** function.

________________________________

### ![ico-20 icon] A function as a return value⟪A_function_as_a_return_value⟫

Now let’s declare the **~createFunction()~** function, which will return a function:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function createFunction (param) {
  return function () {
    console.log('function ', param)
  }
}
~~~

and use it to create two new functions: **~firstFunc()~** and **~secondFunc()~**:

~~~js
var firstFunc = createFunction('First')
var secondFunc = createFunction('Second')
~~~

Let’s call each of these functions:

~~~js
firstFunc()
secondFunc()
~~~

We'll see in the console:

~~~console
function  First
function  Second
~~~

________________________________________

### ![ico-20 icon] Chain computations⟪Chain_computations⟫

The following example demonstrates how to create chained calculations using a higher-order function:

◘◘![ico-25 cap] **5**◘◘

~~~js
function first (a, b, c) {
  if (!a || typeof a !== 'number') {
      return first
  }
  if (!b || typeof b !== 'number') {
    return function second (b, c) {
      if (!b || typeof b !== 'number') {
        return second
      }
      if (!c || typeof c !== 'number') {
        return function third (c) {
          if (!c || typeof c !== 'number') {
            return third
          }
          return a + b + c
        }
      } else {
        return a + b + c
      }
    }
  } else {
    if (!c || typeof c !== 'number') {
      return function third (c) {
        if (!c) return third
        return a + b + c
      }
    } else {
      return a + b + c
    }
  }
}

console.log('first(5, 10, 20):', first(5, 10, 20))
console.log('first(5)(10)(20):', first(5)(10)(20))
~~~

~~~console
first(5, 10, 20): 35
first(5)(10)(20): 35
~~~

The **~first()~** function expects three numeric arguments. If it is called without any arguments, or if the arguments are not numbers, it returns itself.
If only one argument is passed to it, it returns the function **~second()~**, which expects two numeric arguments, as the first is already within its scope.
If no arguments are passed when the function **~second()~** is called, or if the arguments are not numbers, it returns itself.
If only one argument is passed to the **~second()~** function when it is called, it returns the **~third()~** function, which expects only one numeric argument, because the first two are already within its scope.
If no numeric argument is passed to the **~third()~** function when it is called, it returns itself.
If a numeric argument is passed to the **~third()~** function, it returns the sum of all three arguments.

~~~js
const second = first(5)
const third = second(10)
console.log('third(20):', third(20))
~~~

~~~console
third(20): 35
~~~

~~~js
console.log('first("a", "b", "c")')
console.dir(first('a', 'b', 'c'))
~~~

~~~console
first("a", "b", "c")
▼ ƒ first(a, b, c)
    length: 3
    name: "first"
  ► prototype: {}
    arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

~~~js
console.log('first(5, 10, "*"):')
console.dir(first(5, 10, '*'))
~~~

~~~console
▼ ƒ third(c)
    length: 1
    name: "third"
  ► prototype: {}
    arguments: null
    caller: null
  ► [[Prototype]]: ƒ ()
~~~

Chain computations

~~~js
first('*')(undefined)(5)(NaN)(7)(false)(null)(3)
~~~

~~~console
15
~~~
