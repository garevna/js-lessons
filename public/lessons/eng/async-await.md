# ![ico-30 study] async | await

**ECMAScript 2017**

________________________________________________________________________________________________

[►►►**Constructor AsyncFunction**►►►](page/async-constructor)

________________________________________________________________________________________________

Two short words that have fantastically changed our reality.
Two words that trigger a powerful mechanism for controlling the element of events.
Words that completely liberated us from the slavery of events, allowed us to "saddle" the wild horse of asynchronousness.
In short, the magic continues... Promises were only the beginning.

## ![ico-25 icon] async function

To declare an asynchronous function, use **~async~** keyword before the **_function_** keyword:

~~~js
async function sigma () {
  ...
}
~~~

For arrow functions:

~~~js
const sayHello = async () => 'Hello'
~~~

What does this change in our lives?

![ico-25 warn] **Calling an asynchronous function returns a promise**.

Therefore, the asynchronous function is a more concise way to create promises than the **~Promise~** constructor.

Now, instead of creating a promise in the traditional way (using the constructor):

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

we can make our code much shorter and more readable:

~~~js
const createPromise = async message => message
~~~

**~createPromise~** function in both cases creates a promise, but in the second case, we don't explicitly call the **~Promise~** constructor.

What will the promise returned by an asynchronous function be resolved by?

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

![ico-20 warn] It will be resolved by what the asynchronous function returns using the **~return~** statement.
^^If there is no ~return~ statement in the asynchronous function, then the promise returned by it will be resolved with the value ~undefined~.^^

______________________________________________

In the following examples, we will plot functions asynchronously by points.
Since we will be displaying function graphs on the page, we need to decide in which container these graphs will be.

~~~js
const section = document.body
section.style = 'padding-top: 120px;'
~~~

Also let's create a helper function **~createPoint~**:

~~~js
function createPoint (x, y, color = '#f50') {
  const point = section
    .appendChild(document.createElement('span'))
  point.innerText = '•'
  point.style = `
    position: relative;
    left: ${x.toFixed(2)}px;
    top: ${y.toFixed(2)}px;
    color: ${color};
  `
}
~~~

and two more helper functions **~sin~** and **~cos~**:

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

Note that we haven't used the async function so far.

And now it will appear:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const recurse = (times => {
  let counter = 0
  let promise = (async () => sin(0))().then(cos(0))
  return function () {
    promise = promise
      .then(sin.bind(null, counter))
      .then(cos.bind(null, counter))
    counter++ < times && recurse()
  }
})(20)

recurse()
~~~

{{{async-await-01.js}}}

Here we see the anonymous function **~async () => sin()~**.
We already know that it returns **~promise~**.

^^^[![ico-30 eyes]]

^^Of course, we could have written it this way as well to demonstrate chained computation:^^

~~~js
const start = () => (async () => sin())().then(cos)

start()
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
~~~

^^but using a recursive function makes the code much shorter, although not as visual.^^

^^^

In this example, we took advantage of the fact that not only the asynchronous function, but also the **~then~** method returns **~promise~**.
This ensures that each point of each graph is built by a callback function (microtask), meaning that the page does not lose interactivity for the duration of the graphs.

_________________________________________

And now let's show more clearly how microtasks one by one are coming into the call stack, which gives the impression that the graphs of functions are drawn simultaneously, although in fact one point of the graph of the function ~sin~ is drawn first, followed by one point of the graph of ~cos~, then one point of the graph of ~sin~ again, and so on.

To make the process more visual, let's use the method of the global object **~requestAnimationFrame~**.

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const recurseSin = (times => {
  let counter = 0
  let promise = (async () => sin(0))()
  return function () {
    promise = promise.then(sin.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseSin)
  }
})(20)

const recurseCos = (times => {
  let counter = 0
  let promise = (async () => cos(0))()
  return function () {
    promise = promise.then(cos.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseCos)
  }
})(20)

recurseSin()
recurseCos()
~~~

{{{async-await-02.js}}}

________________________

To make it more convincing, let's add an animated figure:

~~~js
const start = Date.now()

function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 5000 && requestAnimationFrame(figure.move)
    }
  })
}
~~~

and then make sure that drawing function graphs does not block the animation of the figure in our example:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

Your applause, gentlemen! The asynchronous function definitely deserves them.
And this is just the beginning.

________________________________________________________________________________________________

## ![ico-25 icon] await

![ico-20 warn] The **~await~** keyword can only be used inside **async functions**.

^^Otherwise an exception will be thrown:^^

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

Let's understand what the engine does when it encounters the **~await~** keyword.
Firstly, the **~await~** keyword is always followed by some expression.
We know that when the engine meets an expression in our code, it calculates the value of that expression, and replaces that expression with the calculated value.
So, let's see what can follow the keyword **~await~**, and how the engine will behave in each case.

We'll look at cases where the **~await~** keyword is followed by:
1. an instance of ~Promise~ (our ‘magic box with two holes’);
2. an object that has a **~then~** method;
3. any expression whose value will be a reference to an array or object, a string, or a number, or a boolean value, as well as ~null~ and ~undefined~.

Why do we consider these options separately?
Because the engine behaviour will be different in each of these cases.

_____________________________________

### ![ico-20 icon] await &lt;promise>

First let's see what happens if after the keyword **~await~** there is a reference to our ‘magic box with two holes’.

Let's create two auxiliary functions:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

So, we can create a ‘magic box with two holes’ using the **~createPromise~** method.
We can then use the **~then()~** method of this ‘box’ (instance of ~Promise~) to pass a callback function that will ‘take’ the result that the promise is resolved to.

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

Now let's see how the **~await~** keyword can be used, and how its operation differs from that of the **~then()~** method of ~Promise~ instance.

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

Or so:

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

So far, no differences have been observed.
That is, the keyword **~await~** calls the method **~then()~** of the ~Promise~ instance which comes after **~await~**.
But a question arises: the method **~then()~** of a ~Promise~ instance should get a references to callback functions as an arguments.
However, the expression:

~~~js
await createPromise('Resolved!')
~~~
does not contain any callback function. Not even a hint.
Let's figure out what is going on there.

~~~js
new Promise((resolve, reject) => {
  console.log('resolve:\n', resolve)
  console.log('reject:\n', reject)
})
~~~

~~~console
resolve:
 ƒ () { [native code] }
reject:
 ƒ () { [native code] }
~~~

When the constructor **~Promise~** was called, it was passed a function with two formal parameters.
This function was called, and received two references to callback functions as arguments when called.
As we can see, these are some kind of default callback functions.
They ‘take’ the result and put it into our ‘magic box with two holes’.

Therefore, it is logical to assume that these colbeks have this code:

~~~js
result => result
~~~

Let's see what **~await~** does:

◘◘resolve◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.resolve('Success.'))
test()
~~~

~~~console
Result:  Success.
~~~

◘◘reject◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.reject('Failure.'))
test()
~~~

~~~error
    Uncaught (in promise) Failure.
~~~

Let's compare this behavior with the explicit call the method ~then~ of a ~Promise~ instance with two callback functions passed to it:

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

As you can see, **~await~** calls **~then~** method, but passes it only one callback (**~resolve~**).
In the case of a rejection, control will be ‘hijacked’ by the engine, which will throw an exception to the console.

That's why you should use the **~catch~** method to ‘catch’ exceptions:

~~~js
const test = async () => {
  const result = await Promise.reject('Failure.')
    .catch(console.warn)
  result && console.log('Result: ', result)
}
test()
~~~

~~~warn
    Failure.
~~~
_____________________________________________

Let’s say we have a function **~func~** like this:

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

If we'll use the method **~then~** of the ~Promise~ instance to pass the second callback function (**~reject~**):

◘◘**^^Promise^^**◘◘

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

then the exception will be ‘caught’ and a warning will be displayed in the console.

If we'll use the keyword **~await~**:

◘◘**^^async function^^**◘◘

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

then an exception will be generated if the ~Promise~ instance will be rejected:

~~~error
    Uncaught (in promise) Failure.
~~~

Thus, if a **~await~** keyword is followed by a promice, the engine will call the **~then~** method of that promice, but ![ico-20 warn] without passing the second callback function (**~reject~**).

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

What if after the keyword **~await~** there is not a ~Promise~ instance but any other object?
Or even not an object, but some string, or a number, or a logical value?

_____________________________________

### ![ico-20 icon] Object with 'then' method

Let's create an object which has the method **~then()~**:

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const user = {
  name: 'Polina',
  then (callback) {
    callback(this.name)
  }
}

user.then(console.log)
console.log('finish')
~~~
~~~console
Polina
finish
~~~

Obviously, the object **~user~** is **not** a ~Promise~ instance, and no asynchrony is observed yet.

However, let's see what happens when this code is executed:

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

As you can see, when the engine detected the keyword **~await~**, it didn't bother much about what expression followed it, and it wasn't bothered at all by the fact that it wasn't a ~Promise~ instance.
The engine detected that it is an object that has a **~then()~** method.

And what do we see? The **~then()~** method of the **~user~** object was called!

But there is one mystery here:
The **~then()~** method of the **~user~** object is a higher-order function,
i.e. it expects to receive one mandatory argument when called - **function**.
But we did not pass any argument to the **~then()~** method of the **~user~** object.
Moreover, we didn't call it at all!

It turns out that the engine not only called the **~then()~** method of the **~user~** object, but also passed a certain function as an argument to it.

Question: what callback did the engine pass to the **~then()~** method of the **~user~** object?

From the behaviour of the method **~then()~**, it seems that it has received this callback:

~~~js
response => response
~~~

i.e. callback function, which operates according to the principle: ‘What I get is what I give back’.

As you can see, when the engine meets one small word **~await~**, it starts a flurry of activity.

One last ‘touch’: in the previous example, the method **~then~** of the **~user~** object was a higher-order function, i.e. it took a function as an argument.
Let's see what happens if the **~then~** method is an ordinary function:

~~~js
const user = {
  name: 'Polina',
  then () {
    console.log(this.name)
  }
}

;(async () => {
  await user
  console.log('Hi from Event Loop')
})()

console.log('finish')
~~~

~~~console
finish
Polina
~~~

As you can see, the string:

~~~js
console.log('Hi from Event Loop')
~~~

was never executed.
This means that the asynchronous function is waiting for the return of the callback function, but there is no callback function at all, and the asynchronous function could not resume its execution after **~await~**.
That is, the asynchronous function could return from the **Event Loop** only after the return of the callback function sent there by the method **~then~**.
But the method **~then~** didn't send anything to the event loop.
![ico-25 warn] Be careful!

_____________________________________

### ![ico-20 icon] Promises' reminder

We have already said that a copy of the **~Promise~** constructor is a `magic box with two holes`.
**~then()~** and **~catch()~** methods are the "holes" in the box.
Through these "holes" we put in our callback functions, and the box "promises" us that as soon as the contents appear in it, one of our callbacks will receive it.

@@@@ 2
It is not known when the contents will appear in the box.<br>What will this content be - a "white ball" (**response**) or "black ball" (**error**) also unknown.
![](illustrations/white-and-black.png)
@@@@

~~~~js
const getStatus = async () => Math.random() > .5 ? 'white' : 'black'

const func = ((startTime, callback) => {
  const time = Math.round(Math.random() * 30000)
  return async timeStamp => {
    const interval = timeStamp - startTime
    if (interval < time) requestAnimationFrame(func)
    else callback(await getStatus())
  }
})(0, console.log)

requestAnimationFrame(func)
~~~~

It should be noted that the promise box knows that it needs to "catch" a white or black ball when it arrives.

And the magic box sends its own callback functions for the white and black balls to the **Event Loop**.

Callbacks are already "sitting" in the table of events "in ambush".
They "catch the balls" for us.
When caught, they will put it in the magic box of the **~Promise~** instance.
They are tied, respectively, to the following events:

1. "A white ball has arrived" (response).
2. "A black ball has arrived" (error).

Only one of them will return back from the **Event Loop**.
The contents will appear in the box of the **~Promise~** instance.

{{{async-await-05.js}}}

Now a magic box with two holes is waiting for you to stick your "hands" (**~resolve~** and **~reject~** callbacks), into these holes, to which the box can give the ball.

Perhaps, you have already "stick your hands in" before, then you will receive the ball as soon as it appears in the box of the **~Promise~** instance.
Otherwise, the ball will remain in the box until you use the methods **~then()~** and **~catch()~**, i.e. until you "stick your hands in" to pick up the ball.

![ico-30 point_up] It follows that the magic box synchronizes two autonomous asynchronous processes.
This is the magical power of a "box with two holes".

Those, the 'magic promise box' sends its own callback functions "to run out and get the ball", and then waits for you to stick your hands (callbacks) into the holes **~then()~** and **~catch()~** to give out the ball from storage.

^^Moreover, you can stick both hands (**~resolve~** и **~reject~**) into one hole **~then()~**, although using the second hole **~catch()~** in some cases saves you from error messages in the console.^^

☼☼☼Don't make the console blush for you.☼☼☼

_________________________________________

### ![ico-20 icon] await &lt;expression>

So, the engine meets the expression ~**await** &lt;expression>~.
It needs to calculate the value of this expression.
![ico-25 warn] Until it calculates it and replaces the ~await &lt;expression>~ with the received (calculated) value, it will not move to the next line of asynchronous function code.

If the value is a reference to the **~Promise~**, instance, then the engine will call the method **~then()~** of this instance and pass the callback to it:

~~~js
response => response
~~~

and will pause the execution of the asynchronous function until the callback function returns from **Event Loop** with the result "ball" (~response~) and puts it in the box (~Promise~ instance).

After the result appears in the box, the engine will take it out of the box and insert it into the place of the ~await &lt;expression>~.

We've already asked ourselves what the engine will do if ~&lt;expression>~ is not a promise.
And we have already figured out what the engine will do if ~&lt;expression>~ is an object that has a **~then()~** method.

Now let's see what the engine will do if ~&lt;expression>~ is a string, or a number, or some other value.

◘◘![ico-25 cap] ** 6**◘◘
~~~js
console.log('Start')
;(async function () {
  console.log('Async function starts')
  console.log(await 'Hello!')
  console.log('Async function finished')
})()
console.log('Finish')
~~~

In this example, you need to carefully monitor the sequence of messages output to the console:

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

Everything that is printed to the console after the **_Finish_** message is the callback functions that "passed" through the **Event Loop**.
If they are printed before ~undefined~ these are **microtasks**.

So, the engine was safely outputting ^^**_Start_**^^ to the console, then it came across a functional expression ([IIFE](page/Closure#IIFE)) and started ‘calculating’ the value of the expression in parentheses.
But we see the declaration of an anonymous asynchronous function in the parentheses.
The engine passes the control to the constructor, which creates this function and returns a reference to it.
The engine, having received a reference to the function, calls it, as the parentheses (function call) follow.
The anonymous asynchronous function starts executing, and the console displays the message ^^**_Async function starts_**^^.
However, in the next line of the function's code, the engine "stumbled upon" an expression:

~~~js
console.log(await 'Hello!')
~~~

Here the engine understands that it is necessary to send a callback function ~() => 'Hello!''~ to **Event Loop**, and the async function must wait for its return to complete the execution of this line of code.
The engine couldn't resume the async function execution until the callback function ~() => 'Hello!''~ returns.
But callback function can return only when the Call Stack will be free.
So, the engine needs to ‘get rid’ of this async function for a while, but in such a way that after the return of the callback ~() => 'Hello!''~ it can resume the execution of async function.
How can this be done?

For example, by replacing the remaining unexecuted function code:

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

to this code:

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

And then the engine continues to execute the script code from the line:

~~~js
console.log('Finish')
~~~

after which the call stack is freed, and a callback function ~() => 'Hello!''~ is returned from **Event Loop**:

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

which received a message with the value 'Hello!'.

Thus, the occurrence of the keyword **~await~** causes the unexecuted remainder of the asynchronous function code to become a callback function.

_____________________________________________

## ![ico-20 icon] Examples

### ![ico-25 cap] 7

In this example, we specifically named the function **~test~** to track its appearance in the call stack.

◘◘![ico-25 cap] ** 7**◘◘

~~~js
console.log('Start')

;(async function test (callback) {
  const inputs = []
  inputs.push(await 5)
  inputs.push(await 7)
  inputs.push(await 9)
  const result = inputs
    .reduce((res, num) => res += num)
  callback(await result)
})(console.log)

console.log('Finish')
~~~

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8

In this example, the main thread code will run when the variable ~num~ is set to ** 5**.
However, calling the asynchronous ~sample()~ function will result in the value of the variable ~num~ becomes **10** after the main thread's code has finished running.

◘◘![ico-25 cap] ** 8**◘◘

~~~js
let num = 5

async function sample (arg) {
  num = await arg
}

sample(10)
  .then(() => console.log(`Finish value: ${num}`))

console.log('Start value: ', num)
~~~

••Start value:  5••
••Finish value: 10••

_________________________________

### ![ico-25 cap] 9

◘◘![ico-25 cap] ** 9**◘◘

~~~js
async function getUser (userNum) {
  return (await (await fetch(`https://api.github.com/users/${userNum}`)).json()).name
}

getUser(5)
  .then(console.log)
~~~

**Output**:

••Yuriy Semchyshyn••

_____________________________________

### ![ico-25 cap] 10

◘◘![ico-25 cap] **10**◘◘

~~~js
const browsers = ['Chrome', 'Mozilla', 'Safari', 'IE']

browsers.then = (function () {
  let current = 0

  return function (resolve) {
    const response = {
      value: this[current++],
      done: current > this.length
    }

    setTimeout(() => resolve.call(null, response), 1000)
  }
})()

async function showBrowsers () {
  do {
    var { done, value } = await browsers

    console.log(`{ value: ${value}, done: ${done} }`)
  } while (!done)
}

showBrowsers ()
~~~

{{{async-await-6.js}}}

____________________________________________________________

### ![ico-25 cap] 11

◘◘![ico-25 cap] **11**◘◘

~~~js
(function demo (maxValue) {
  const placeholder = document.body
    .appendChild(document.createElement('h3'))

  while (maxValue--) {
    const number = maxValue
    setTimeout(async () => Object.assign(placeholder, {
      innerText: await number
    }), number * 1000)
  }
})(10)
~~~

{{{async-await-11.js}}}

____________________________________________________________

### ![ico-25 cap] 12

◘◘![ico-25 cap] **12**◘◘

~~~js
;(async () => await 'async-await')().then(console.log)

Promise.resolve('promise').then(console.log)

;(async () => 'async')().then(console.log)
~~~

~~~console
promise
async
async-await
~~~

Note that:

1. The ~Promise~ instance returned by ~async () => await 'async-await'~ will be resolved last, even though it is the first line of code.
2. The ~Promise.resolve('promise')~ (second line of code) will be resolved first.
3. The ~Promise~ instance returned by ~async () => 'async'~ (third line of code) will be resolved second.

Having castling of the second and third lines of the code:

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

we will see that the order of the console output has changed accordingly:

~~~console
async
promise
async-await
~~~

that is, their callback functions end up in the microtask queue in the same sequence in which they appeared in the code.

But with the function ~async () => await 'async-await'~ it's different.

Let's show that the code:

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

works identical to the code:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

To do this, let’s run them first in the following sequence:

~~~js
;(async () => await 'async-await-1')().then(console.log)

new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

~~~console
async-await-1
async-await-2
~~~

and then change the order of them:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)

;(async () => await 'async-await-1')().then(console.log)
~~~

~~~console
async-await-2
async-await-1
~~~

As we can see, they are resolved strictly in the order they appear in the code.
That is, the occurrence of the keyword **~await~** elongates the chain of callback functions passing through **Event Loop** by 1, which results in ~;(async () => await 'async-await')().then(console.log)~ being the last to finish in Example 12.

As we said earlier, the asynchronous function itself is interrupted at the point where **~await~** is met, and the rest of the code of this function, which was not executed before, itself becomes a callback function and "goes" into the **Event Loop** to free the Call Stack and allow the callback ~() => 'async-await'~ to return with the result ('async-await'). Therefore, the chain is extended by 1 microtask.

______________________________________________

### ![ico-25 cap] 13

◘◘![ico-25 cap] **13**◘◘

~~~js
const promise = message => new Promise(resolve => {
  const time = Math.round(Math.random() * 3000)
  setTimeout(() => resolve(`${message}: ${time}`), time)
})

const test = async () => await promise(await promise(await promise('start')))

test().then(response => console.log(response))
~~~

{{{async-await-13.js}}}

______________________________________________

### ![ico-25 cap] 14

Let's declare a helper function:

~~~js
const createElem = tag => document.body.appendChild(document.createElement(tag))
~~~

◘◘![ico-25 cap] **14**◘◘

~~~js
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  style: `
    padding: 8px 16px;
    border-radius: 4px;
  `,
  onchange: event => resolve(event.target.value)
}))

const func = async () => Object.assign({}, {
  name: await promise('Your name'),
  hobby: await promise('Your hobby'),
  speciality: await promise('Your speciality')
})

func().then(response => console.log(response))
~~~

{{{async-await-9.js}}}

______________________________________________

### ![ico-25 cap] 15

◘◘![ico-25 cap] **15**◘◘

~~~JS
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  onchange: event => resolve(event.target.value)
}))

const func = async () => {
  const user = {}
  const messages = ['name', 'hobby', 'speciality']

  const responses = await Promise.all(messages.map(message => promise(message)))

  responses.forEach((val, index) => Object.assign(user, { [messages[index]]: val }))
  return user
}

func().then(console.log)
~~~

{{{async-await-10.js}}}

______________________________________________

### ![ico-25 cap] 16

Let's record the value of the current time in milliseconds in the **~start~** variable and declare the auxiliary functions **~getRandom~** and **~test~**:

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

Now let's declare the functions **~func~** and **~createPromise~**:

~~~js
function func (name, time, callback) {
  test(time)
    ? callback(`${name}: ${time}`)
    : requestAnimationFrame(func.bind(null, name, time, callback))
}

function createPromise (name, time) {
  return new Promise(func.bind(null, name, time))
}
~~~

Now let's run the code:

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

As you can see, messages are output in a random order, depending on what value the **~getRandom~** function returned for each ~Promise~ instance.

The task is to synchronize the entry of callback functions into the Call Stack so that the first output to the console is "**_First_**", then "**_Second_**", and then "**_Third_**".

◘◘**promise chain**◘◘

~~~js
createPromise('First', getRandom())
  .then(console.log)
  .then(() => createPromise('Second', getRandom()).then(console.log))
  .then(() => createPromise('Third', getRandom()).then(console.log))
~~~

◘◘**async function**◘◘

~~~js
const showResults = async () => {
  const promises = ['First', 'Second', 'Third']
    .map(name => createPromise(name, getRandom()))

  for (const promise of promises) console.log(await promise)
}

showResults()
~~~

So, an asynchronous function can serve as a “wrapper” for several asynchronous operations, the execution of which should be ordered in time, to enforce their callbacks are processed in a given sequence.

________________________________

### ![ico-25 cap] 17

Let's consider a purely speculative option
^^(you shouldn't do this in real  projects)^^:

◘◘![ico-25 cap] **17**◘◘

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const users = ['Stephan', 'Andry']
  .reduce(async (result, item) => {
    const data = await (await fetch(`${origin}/users?name=${item}`)).json()
    result = await result
    result.push(data[0])
    return result
  }, [])
~~~

What you should pay attention to:

the **~reduce~** method is passed an async function.
Therefore, after each iteration, the **~result~** variable will be a ~Promise~ instance,
and it must be resolved using **await**.

As a result of the script running, the **~users~** variable will contain a ~Promise~ instance.
Let's extract the result:

~~~js
users.then(console.log)
~~~

![ico-20 yes] to reduce the number of calls to the server, it is better to do this:

~~~js
fetch(`${origin}/users?name=Stephan&name=Andry`)
  .then(response => response.json())
  .then(console.log)
~~~

or this:

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const getEndpoint = userList => userList
  .reduce((result, item, index) => result += `${index > 0 ? '&' : ''}name=${item}`, '')

const getUsers = async userList => await (await fetch(`${origin}/users?${getEndpoint(userList)}`)).json()

getUsers(['Stephan', 'Andry'])
  .then(console.log)
~~~

___________________________________________

### ![ico-25 cap] 18

~~~js
const origin = 'https://api.github.com'

const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))
~~~

◘◘![ico-25 cap] **18**◘◘

~~~js
async function getUsersData (userName) {
  const userData = await (await fetch(`${origin}/users/${userName}`)).json()

  addElem('img').src = userData.avatar_url

  const userRepos = await (await fetch(userData.repos_url)).json()

  for (const item of userRepos) addElem('div').innerText = item.events_url

  return 'Ready'
}

getUsersData('garevna').then(console.log)
~~~

_________________________________________

### ![ico-25 cap] 19

Let's extend the prototype of the **~Object~** constructor with the **~addElem~** method:

◘◘Object◘◘
~~~js
Object.prototype.addElem = function (tagName) {
  const elem = document.body
    .appendChild(document.createElement(tagName))
  Object.assign(elem, {
    addChar (char) {
      elem.textContent += char
    },
    replace (text) {
      elem.textContent = text
    }
  })
  return elem
}
~~~

As we can see, the added element will have two methods: **~addChar~** and **~replace~**, which allow you to modify the text content of the element.

Now let's extend the prototype of the **~String~** and **~Number~** constructors with the method **~then~**:

◘◘String◘◘
~~~js
String.prototype.then = function () {
  const placeholder = this.addElem('div')
  this
    .split('')
    .forEach((char, index) => setTimeout(() => placeholder.addChar(char), 1000 * index))
}
~~~

◘◘Number◘◘

~~~js
Number.prototype.then = function () {
  const placeholder = this.addElem('div')
  for (let ind = 0; ind <= this; ind++) {
    setTimeout(() => placeholder.replace(ind), 1000 * ind)
  }
}
~~~

Now you can create “simple” functions **~typeWritter~** and **~showNumber~**:

◘◘![ico-25 cap] **19**◘◘

~~~js
const typeWritter = async string => await Object(string)
const showNumber = async number => await Object(number)

typeWritter('Welcome')
showNumber(11)
~~~

_________________________________________

[:::**20**:::](https://plnkr.co/edit/3JMiqa1CFLK55hgx/)

_______________________
[![ico-30 hw] Quiz](quiz/async)
