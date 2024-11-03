# Deeper into iterating methods

[◄◄◄ Array iterating methods ◄◄◄](page/Array-iterating-methods.md)

By displaying the **_~prototype~_** property of the **~Array~** constructor in the console, we can see that these data structures inherit many methods, and some of them we already know.

~~~js
console.log(Array.prototype)
~~~

{{{Array-iteration-methods-theory.js}}}

Some of the methods that we are already familiar with perform some kind of operation on the array.
^^(add an element to an array, remove or replace elements in an array, merge several arrays into one, etc.).^^

Iterating methods loop through the array elements one by one strictly in ascending order of their indices.
^^(except ~reduceRight~, which is right-to-left).^^

_A group of array iterating methods is an example of an implementation of the **functional paradigm**._

The main thing to remember about array iterating methods are **higher-order functions**.
This will remind you that ![ico-20 warn] the **first and required argument of an iterative method is a function**.

• The method will iterate over the elements of the array one by one until it reaches the end of the array.
• At each iteration, the method will call the **argument function** passed to it.
• When an **argument function** is called, the method will pass it the value of the current element of the array.

_____________________________________________

## ![ico-25 icon] Cycle decorator

The advantages of methods over loop operators are obvious.
For example, with the help of methods, we organize chain calculations, and loop operators "break" a beautiful chain, breaking the harmony of our code.

Loops require a lot of routine work from us: we need to initialize the loop variable, determine how it will change in each iteration, control its value in order to complete the loop in time. In short, we need to create a mechanism of cycle with your own hands. We won't even discuss the possible mistakes that arise in this case.

Loops ~for...of~ and ~for...in~ greatly facilitated the work of iterating on arrays and objects. However, these are still loop operators, not methods.

When we wrap a loop in a function (method), we enable on-chain computing.

So, iterative methods can be interpreted as functional "wrappers" for **~for...of~** operator.


◘◘![ico-20 cap] ** 1**◘◘

~~~js
Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

;[7, 4, 1].iterate(console.log)
~~~

In this example, we've created a custom inherited method of arrays **~iterate~**
with the formal parameter ~func~ (^^function^^),
which iterates through the original array in a **~for...of~** loop
and on each iteration calls ~func~,
passing to it the next element of the initial array.

In this example, **~iterate~** method returns nothing,
and it does not mutate the original array, i.e. it does not produce **external effects**.

The same result can be achieved with the help of recursion:

~~~js
Array.prototype.iterate = function (func, index) {
  if (typeof func !== 'function') throw new TypeError('First argument is not a function.')
  let number = typeof index === 'number' ? index : 0
  func(this[number])
  number++ < this.length - 1 && this.iterate.call(this, func, number)
}

;[7, 4, 1].iterate(console.log)
~~~

_____________________________________________

If we want the method to return a new array, all we need to do is the next:

◘◘![ico-20 cap] ** 2**◘◘

~~~js   
Array.prototype.iterate = function (func) {
  const res = []
  for (const item of this) res.push(typeof func === 'function' ? func(item) : item)
  return res
}

;[49, 4, 25].iterate(Math.sqrt)
~~~

Result:

~~~console
► (3) [7, 2, 5]
~~~

As a result, the custom method **~iterate~** will “collect” into the **res** array
the results of calling the function ~func~ at each iteration,
and return the **res** array.

~~~js
const squaring = num => Math.pow(num, 2)
;[7, 2, 5].iterate(squaring)
~~~

Result:

~~~console
► (3) [49, 4, 25]
~~~

_____________________________________________

We can create a custom method that filters the source array in accordance with a given condition.
The function **~func~** should now return a **boolean value**.
If the function **~func~** returns ~true~ for the next array element, then this element will be included in the resulting array **res**.
Otherwise, no.

◘◘![ico-20 cap] ** 3**◘◘

~~~js
Array.prototype.filtering = function (func) {
  const res = []
  for (const item of this) func(item) && res.push(item)
  return res
}

const func = num => num < 10
;[108, 24, 5, 17, 1, 7].filtering(func)
~~~

Result:

~~~console
► (3) [5, 1, 7]
~~~

~~~js   
[7, 4, 1, 20, 8].filtering(item => item > 5)
~~~

Result:

~~~console
► (3) [7, 20, 8]
~~~

_____________________________________________

## ![ico-25 icon] Transferring references

@@@@
![](images/reference-is-a-lockpick.svg)
At this point, the functional purity of iterating methods, unfortunately, ends.<br><br>A function can mutate an object by reference.<br><br>In this case, as a rule, **side effects** occur.
@@@@

There are two ways to pass references in array iterating methods.
The first one is passing a reference to the **call context** of the **function-argument** by the second argument of the method.
The second is passing the reference to the source array to the **function-argument** itself when calling it.

### ![ico-20 icon] The second argument of the method

Each method can take two arguments: a function and a reference to it's call context.
In fact, the second argument of the method saves us from the need to bind the call context to the function-argument.

◘◘ ![ico-25 cap] ** 4** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [7, 5, 0, 11]

Array.prototype.iterate = function (callback, context) {
  const res = []
  for (const item of this) {
    res.push(callback.call(context, item, this.indexOf(item), this))
  }
  return res
}

const sample = numbers.iterate(function (item, index, arr) {
  return this[index] + arr[index]
}, alter)

console.log(sample)
~~~

Result:

~~~console
► (4) [15, 9, 9, 18]
~~~

_______________________

◘◘ ![ico-25 cap] ** 5** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [-4, 1, -2, 0]

Array.prototype.iterate = function (callback, context) {
  const res = []
  const func = callback.bind(context)
  for (const item of this) res.push(func(item))
  return res
}

const sample = numbers.iterate(function (item) {
  return item + this.shift()
}, alter)

console.log(sample)
~~~

Result:

~~~console
► (4) [4, 5, 7, 7]
~~~

However, there is a **side effect** - the array **~alter~** is now empty:

~~~js
console.log(alter) // []
~~~

Another inconvenience is that in this case we cannot pass _arrow functions_ to the method, since their call context cannot be changed.
However, _arrow functions_ make the code more concise.

_____________________________________

### ![ico-20 icon] Reference to the source array

**function-argument** has three optional formal parameters.
The first is the **current element** of the array.
The second is the **index** of the current array element.
The third is a reference to the original array.

Passing this “master key” to the **function-argument** destroys the functional purity of the method and creates opportunities for **side effects**.

The following example shows how this works.


◘◘![ico-20 cap] ** 6**◘◘

~~~js
const numbers = [8, 4, 9, 7]

Array.prototype.iterate = function (func) {
  const res = []
  let index = 0
  for (const item of this) {
    res.push(func(item, index++, this))
  }
  return res
}

const sample = numbers.iterate((item, index, arr) => item * index - arr[0])

console.log(sample)
~~~

Result:

~~~console
► (4) [-8, -4, 10, 13]
~~~

^^The function **sample** receives a reference to the source array **numbers** in the variable **arr**.^^

___________________________________________________

## ![ico-25 icon] Side effects

![ico-20 warn] Pure functions, as iterative methods are supposed to be, do not generate **side effects**, i.e. no _external variables are mutated_.
Array iterating methods are **higher-order functions** that iterate over a source array, passing one array element at a time as an argument to the function.
Thus, the **function-argument** does not have a reference to the original array itself, and cannot mutate it.
_______________________
![ico-20 warn] Except the cases when the elements of the source array have a reference data type, i.e. The function-argument receives not a value but a reference to an array element.
______________________
The original array, as a rule, does not change.
That is, they were originally supposed to be **pure functions** that do not generate external effects, which distinguishes them from ordinary array methods such as ~push()~, ~concat()~, etc.

But we have already shown earlier that this functional purity is violated by passing references (the reference to the call context of function-argument or the reference to the source array).

Similarly, if we are dealing with **deep data structures**, then it is not values ​​that are passed, but references, which creates the possibility of **side effects**.


◘◘![ico-20 cap] ** 7**◘◘

~~~js
const users = [
  { name: 'Helen', age: 25 },
  { name: 'Robert', age: 18 },
  { name: 'Mary', age: 20 },
  { name: 'Piter', age: 30 }
]

Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

users
  .iterate(user => user.age++)
~~~

In this example, we are iterating over an array of objects, i.e. we are dealing with a **deep data structure**.
At each iteration, the argument function (~user => user.age++~) of the **~iterate~** method receives a reference to the object.
This gives to it the ability to mutate the original array, since

☼☼☼ reference is a lockpick ☼☼☼

As a result of executing the code, the **users** array will look like this:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {name: 'Helen', age: 26}
  ► 1: {name: 'Robert', age: 19}
  ► 2: {name: 'Mary', age: 21}
  ► 3: {name: 'Piter', age: 31}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

We see that the age of all users has changed, although we did not pass a link to the original array **users**.
But the array **users** is a **_deep data structure_** and its elements have **reference data type**,
therefore, the function-argument (~user => user.age++~) of the **~iterate~** method received a “master key” and was able to mutate objects by reference.

So, **side effects** arise from **passing references instead of values**.

_____________________________________________

The following example shows that you can mutate the argument function itself:

◘◘![ico-20 cap] ** 8**◘◘

~~~js
var browsers = ['Chrome', 'FireFox', 'Opera', 'Safari', 'Edge']

const storeItem = function (item, index, arr) {
  this.history = Array.isArray(this.history) ? this.history : []
  this.history.push(item)
}

Array.prototype.iterate = function (func) {
  for (var item of this) func.call(func.prototype, item)
}

browsers.iterate(storeItem, storeItem)

console.dir(storeItem)
~~~

◘◘**^^Result^^**◘◘
~~~console
▼ ƒ storeItem(item, index, arr)
  ▼ history: Array(5)
      0: "Chrome"
      1: "FireFox"
      2: "Opera"
      3: "Safari"
      4: "Edge"
      length: 5
    ► __proto__: Array(0)
    arguments: null
    caller: null
    length: 3
    name: "storeItem"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

_____________________________________________

## ![ico-25 icon] Idempotency

If a method every time being called returns the same result with the same argument values, then it is **_idempotent_**.

^^i.e. when calling a method with the same array and function repeatedly, the result will always be the same.^^

In object-oriented languages, method idempotency is practically unattainable if the function arguments have a **reference data type**.
Because arrays have a **reference data type**, array iterating methods operate with a reference.
The reference remains the same, but from one method call to the next, the contents of the array may have changed, which will affect the result.

Let's try to create an idempotent method:

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return res
}

numbers.idempotence(Math.sqrt)
~~~

Result:

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

The first time the **~idempotence~** method is called with a given array, the method mutates the array by adding an ~initialState~ property to it and storing a reference to the initial state of the array in this property.

When called again, the method ignores all changes that may have occurred to the array during the time between the first and second method calls, and works with the clone ~initialState~.

~~~js
numbers[6] = 125

numbers.idempotence(Math.sqrt)
~~~

Result:

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

Note that the method will return a **_new reference_** each time, since each time the method is called it creates a new array, but the contents of this array will be the same.

For the purity of the experiment, you can return the JSON string:

~~~js
Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return JSON.stringify(res)
}
~~~

However, in this example we used the idempotent function-argument **~Math.sqrt~**.

If we pass a function-argument that is not idempotent to the **~idempotence~** method, the method will not be idempotent because it will return a different result when called with the same set of arguments:

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

In this example, you can see that if the function-argument that we pass to the **~idempotence~** method is not _idempotent_, then the result of the method will vary, i.e. the idempotency of a method directly depends on the idempotency of the **function-argument**.

Let's try to fix this situation:

◘◘![ico-20 cap] **10**◘◘
~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  if (!this.initialState) {
    this.result = []
    this.initialState = JSON.parse(JSON.stringify(this))
    for (const item of this.initialState) this.result.push(func(item))
  }

  return JSON.stringify(this.result)
}

numbers.idempotence(Math.sqrt)
~~~

Result:

~~~console
'[5,4,3,7,9,8,2]'
~~~

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

Result:

~~~console
'[5,4,3,7,9,8,2]'
~~~
_________________________________________

Try to figure out the following example on your own.

~~~~js
Array.prototype.idempotence = function (func) {
  const funcArg = func.toString()
  try {
    var sourceData = JSON.stringify(this)
  } catch (err) {
    console.warn(err)
    return null
  }

  const self = this.__proto__

  if (!self.funcs) self.funcs = []
  if (!self.data) self.data = []
  if (!self.results) self.results = []

  if (!self.funcs.includes(funcArg)) self.funcs.push(funcArg)
  if (!self.data.includes(sourceData)) self.data.push(sourceData)

  const index = self.funcs.indexOf(funcArg)
  const num = self.data.indexOf(sourceData)

  if (!self.results[num]) self.results[num] = []

  if (!self.results[num][index]) {
    const result = []
    for (const item of this) {
      result.push(func(item))
    }
    self.results[num][index] = result
  }

  return self.results[num][index]
}
~~~~

^^^[try]
~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]
numbers.idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
[25, 16, 9, 49, 81, 64, 4].idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
numbers.idempotence(item => item + Math.floor(item + Math.random() * 100))
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

~~~js
const randomize = item => item + Math.floor(item + Math.random() * 100)
[25, 16, 9, 49, 81, 64, 4].idempotence(randomize)
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~
^^^
_____________________________________________

## ![ico-25 icon] Examples

Passing the Call Context

◘◘![ico-20 cap] **12**◘◘
~~~js
const jobs = [
  'developer',
  'worker',
  'salesman',
  'manager'
]

const users = [
  { name: 'Piter', job: 1 },
  { name: 'Helen', job: 2 },
  { name: 'Robert', job: 0 },
  { name: 'Michael', job: 1 },
  { name: 'Andrew', job: 0 },
  { name: 'Mary', job: 2 },
  { name: 'Gregory', job: 3 },
]

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  for (const item of this) result.push(func.call(context, item))
  return result
}

function showUser (user) {
  return `<p>${user.name}: ${this[user.job]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = users.iterate(showUser, jobs).join('')
~~~

_____________________________

Passing the second (optional) parameter (the index of the current array element) to the function-argument.

◘◘![ico-20 cap] **13**◘◘

~~~js
const salary = [4000, 3200, 4500, 2800, 3500, 2400, 3700]

const workers = ['Piter', 'Helen', 'Robert', 'Michael', 'Andrew', 'Mary', 'Gregory']

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  index = 0
  for (const item of this) result.push(func.call(context, item, index++))
  return result
}

function showSalary (worker, index) {
  return `<p>${worker}: ${this[index]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = workers.iterate(showSalary, salary).join('')
~~~

__________________________________________

◘◘![ico-20 cap] **14**◘◘

~~~js
const arr = [
  'google',
  'service',
  'user',
  () => Math.round(Math.random() * 1000),
  false
]

function test (elem, index, ref) {
  typeof elem === 'function' && ref.splice(index, 1, elem())
  return ref[index]
}

Array.prototype.iterate = function (func) {
  var res = []
  for (var item of this) res.push(func(item, this.indexOf(item), this))
  return res
}

arr.iterate(test)
~~~
__________________________________________

Let's use the second and third optional parameters of the argument function:

◘◘![ico-20 cap] **15**◘◘

~~~js
const companList = ['Google', 'Mozilla', 'Microsoft']
const browsers = ['Chrome', 'Firefox', 'Edge']

function test (prop, index) {
  this[index] = { [prop] : this[index] }
}

Array.prototype.iterate = function (func, context) {
  var index = index && typeof index === 'number' ? index : 0
  for (var item of this) func.call(context, item, index++)
}

companList.iterate(test, browsers)

console.log(browsers)
~~~

◘◘**^^Result^^**◘◘

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {Google: "Chrome"}
  ► 1: {Mozilla: "Firefox"}
  ► 2: {Microsoft: "Edge"}
    length: 3
  ► __proto__: Array(0)
~~~

________________________________________________________________


[◄◄◄Array iterating methods◄◄◄](page/Array-iterating-methods.md)

________________________________________________________________

[![ico-30 hw] Quiz](quiz/arrayIterationMethods)
