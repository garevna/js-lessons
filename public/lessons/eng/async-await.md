# ![ico-30 study] async | await⟪async___await⟫

**ECMAScript 2017**

________________________________________________________________________________________________

[►►►**Constructor AsyncFunction**►►►](page/async-constructor)

________________________________________________________________________________________________

Two short words that have fantastically changed our reality.
Two words that trigger a powerful mechanism for controlling the element of events.
Words that completely liberated us from the slavery of events, allowed us to "saddle" the wild horse of asynchronousness.
In short, the magic continues... Promises were only the beginning.

## ![ico-25 icon] async function⟪async_function⟫

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
section.style = 'padding: 120px;'
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

and two more helper functions: **~sin~** and **~cos~**:

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

Here we see an anonymous asynchronous function **~async () => sin()~**.
We already know that it returns **~promise~**.

^^^[![ico-30 eyes]]

^^Of course, to demonstrate chained calculations, we could have written it like this:^^

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

In this example, we made use of the fact
that not only the asynchronous function, but also the **~then~** method returns **~promise~**.

As a result, every point on every chart is plotted using a promis (micro-task), meaning the page remains interactive whilst the charts are being plotted.

_________________________________________

Now let’s take a closer look at how microtasks take turns passing each other through the call stack, which gives the impression that the function graphs are being drawn simultaneously, although in reality one point on the sine graph is drawn first, followed by one point on the cosine graph, then another point on the sine graph, and so on.

To make the process more visual, we will use the **~requestAnimationFrame~** method of the global object.

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

To make it even more convincing, let's add an animated figure:

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

and let's make sure that in our example, drawing function graphs does not block the animation of the figure:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

Your applause, gentlemen! The asynchronous function has certainly earned it.
And this is just the beginning.

________________________________________________________________________________________________

## ![ico-25 icon] await⟪await⟫

![ico-20 warn] The keyword **~await~** can only be used inside **asynchronous functions**.

^^In the opposite case, an exception will be generated:^^

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

Let's take a closer look at what the engine does when it encounters the keyword **~await~**.
Firstly, the keyword **~await~** is always followed by some kind of expression.
We know that when the engine encounters an expression in our code, it calculates the value of that expression and replaces it with the calculated value.
So let's take a closer look at what can follow the keyword **~await~** and how the engine will behave in each case.

We will consider cases where the keyword **~await~** is followed by:
1.  promis – our 'magic box with two holes';
2. an object that has a method **~then~**;
3. any expression whose value will be a reference to an array or object, a string, a number, or a boolean value, as well as ~null~ and ~undefined~.

Why do we consider these cases separately?
Because the engine's behavior will be different in each of these cases.

_____________________________________

### ![ico-20 icon] await &lt;promise>⟪await_promise_⟫

First of all, let’s see what happens if there is a link to our 'magic box with two holes' after the keyword **~await~**.

Let's create two helper functions:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

So, we can create a 'magic box with two holes' using the method **~createPromise~**.
We can then use the **~then()~** method of this 'box' (promise) to pass a callback, which will 'retrieve' the result that the promise resolves to.

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

Now let's see how we can use the keyword **~await~** and how its behavior differs from the **~then()~** method of a promise.

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

Or like this:

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

So far, no differences have been observed.
That is, the keyword **~await~** calls the **~then()~** method of the promise that follows it.
But this raises a question: the **~then()~** method of the promise must take a reference to a callback function as an argument.
However, the expression:
~~~js
await createPromise('Resolved!')
~~~
does not contain any callback function. Not even a hint.
Let's see what's happening there.

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

When the constructor **~Promise~** was called, a function with two formal parameters was passed to it.
It was called, and received two callbacks as arguments when called.
As we can see, these are some default callbacks.
They 'retrieve' the result and place it in our 'magic box with two holes'.

Therefore, it is logical to assume that these callbacks have the following code:

~~~js
result => result
~~~

Let’s see what **~await~** does:
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

Let us compare this behaviour with an explicit call to the **~then~** method of the promise, passing it two callbacks:

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

As you can see, **~await~** calls the **~then~** method, but passes only one callback (**~resolve~**) to it.
In case of rejection, control will be 'caught' by the engine, which will throw an exception in the console.

Therefore, to 'catch' exceptions, the **~catch~** method should be used:

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

Let’s assume we have a function as follows:

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

If we use the **~then~** method of the promise to pass the second callback **~reject~**:

◘◘**^^Promise^^**◘◘

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

then the exception will be 'caught', and a warning will be displayed in the console.

If, on the other hand, we use the keyword **~await~**:

◘◘**^^async function^^**◘◘

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

In that case, if the promise ‘fails’, an exception will be thrown:

~~~error
    Uncaught (in promise) Failure.
~~~

Thus, if a promise follows the keyword **~await~**, the engine will call the **~then~** method of that promise, but ![ico-20 warn] without passing the second callback (**~reject~**).

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

But what if, after the keyword **~await~**, there will be any other object rather than a promise?
Or even not an object, but some string, or a number, or a boolean value?

_____________________________________

### ![ico-20 icon] An object with a then method⟪An_object_with_a_then_method⟫

Let's create an object that has a **~then()~** method:

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

Obviously, the object **~user~** is **not** a promise, and no asynchrony is observed yet.

However, let's see what happens when the code is executed:

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

As we can see, the engine, upon encountering the keyword **~await~**, did not get too worked up about what expression follows it, and it was not at all confused by the fact that this is not a promise.
The engine discovered that this is an object that has a **~then()~** method.

And what do we see? The **~then()~** method of the **~user~** object was called!

But here is a mystery:
The **~then()~** method of the **~user~** object is a higher-order function,
That is, it expects to receive one mandatory argument - a **function** - when called.
But we did not pass any argument to the **~then()~** method of the **~user~** object.
Moreover, we did not call it at all!

It turns out that the engine not only called the **~then()~** method of the **~user~** object itself
but also passed it a function as an argument.

Question: Which callback did the engine pass to the **~then()~** method of the **~user~** object?

Judging by the behaviour of the method **~then()~**, it received the following callback:

~~~js
response => response
~~~

That is, a callback that works on the principle: "What I received, I will return".

As you can see, upon encountering the word **~await~**, the engine engages in quite lively activity.

One final 'touch': in the previous example, the method **~then~** of the object **~user~** was a higher-order function, i.e. it took a function as an argument.
Let's see what happens if the method **~then~** is a regular function:

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

As you can see, the line

~~~js
console.log('Hi from Event Loop')
~~~

was never carried out.
This means that the asynchronous function never waited for the callback to return (because it was never sent), and could not resume its execution after **~await~**.
That is, the asynchronous function could only return from the event loop after receiving the callback sent there by the **~then~** method.
But the method **~then~** did not send anything to the event loop.
Be careful!

_____________________________________

### ![ico-20 icon] Let's recall promises⟪Let-s_recall_promises⟫

We have already mentioned that an instance of the **~Promise~** constructor is a magic box with two holes.
The **~then()~** and **~catch()~** methods are the 'holes' in the box.
Through these 'holes', we insert our callbacks, and the box 'promises' us that as soon as it has content, one of our callbacks will receive it.

@@@@ 2
When the box will have content is unknown.<br>What this content will be - a 'white ball' (**response**) or a 'black ball' (**error**) - is also unknown.
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

It should be noted that the promise box knows that it needs to 'catch' the white or black ball when it arrives.

And the magic box sends its own callbacks for the white and black balls to the **Event Loop**.

The callbacks are already 'sitting' in the event table 'in ambush'.
They 'catch the balls' for us.
When they catch it, they will put it in the magic box of the **~Promise~** instance.
They are bound to the following events:

1. "The white ball has arrived" (response)

2. "The black ball has arrived" (error)

Only one of them will return from the **Event Loop**.
The content will appear in the box of the **~Promise~** instance.

{{{async-await-05.js}}}

Now the magic box with two holes is waiting for you to insert your 'hands' (callbacks **~resolve~** and **~reject~**) into these holes, to which the arriving ball can be given.

It is possible that you have already 'inserted your hands' earlier, in which case you will receive the ball as soon as it appears in the box of the **~Promise~** instance.
Otherwise, the ball will lie in the box until you use the **~then()~** and **~catch()~** methods, i.e. until you 'insert your hands' to take the ball.

![ico-30 point_up] Hence, the magic box synchronizes two autonomous asynchronous processes.
This is the magical power of the box with two holes.

That is, the magic box of the promise sends its own callbacks to 'fetch the ball', and then waits for you to insert your hands (callbacks) into the holes **~then()~** and **~catch()~** to give the ball that is in storage.

^^Moreover, you can insert both hands (**~resolve~** and **~reject~**) into one hole **~then()~**, although using the second hole **~catch()~** in some cases saves you from error messages in the console. Try not to make the console blush for you ![ico-20 smile].^^

_________________________________________

### ![ico-20 icon] await &lt;expression>⟪await_expression_⟫

So, the engine encounters the expression ~**await** &lt;expression>~.
It needs to compute the value of this expression.
![ico-25 warn] Until it computes it and replaces the expression ~await &lt;expression>~ with the obtained (computed) value, it will not move to the next line of code of the asynchronous function.

If the value of ~<expression>~ is a reference to an instance of **~Promise~**, then the engine will call the **~then()~** method of that instance, passing it a callback:

~~~js
response => response
~~~
and will suspend the execution of the asynchronous function's code until the callback returns from the **Event Loop** with the 'ball' of the result (~response~) and puts it in the promise box.

After the result appears in the box, the engine will take it out of the box and insert it in place of the expression ~await &lt;expression>~.

We have already asked ourselves what the engine will do if ~&lt;expression>~ is not a promise.
And we have already figured out what the engine will do if ~&lt;expression>~ is an object that has a **~then()~** method.

Now let’s see what the engine will do if ~&lt;expression>~ is a string, a number or some other value.

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

In this example, you need to pay close attention to the sequence of messages printed to the console:

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

Everything printed to the console after the **_Finish_** message is callback functions that have ‘passed through’ the **Event Loop**.
If they are printed before ~undefined~, they are **microtasks**.

So, the engine successfully printed ^^**_Start_**^^ to the console, then encountered a function expression ([IIFE](page/Closure#IIFE)) and began to ‘evaluate’ the expression within the parentheses. And inside the parentheses is a declaration of an anonymous asynchronous function. The engine passes control to the constructor, which creates this function and returns a reference to it. Having received the reference to the function, the engine calls it, as parentheses (a function call) follow next.
The anonymous asynchronous function begins to execute, and the message ^^**_Async function starts_**^^ is printed to the console.
However, in the very next line of the function’s code, the engine ‘stumbles upon’ the expression:
~~~js
console.log(await 'Hello!')
~~~
Here, the engine realises that it needs to send the callback ~() => 'Hello!'~ to the **Event Loop**, and the function must wait for it to return before it can complete execution of this line of code. The function’s code cannot proceed until the callback returns. And it can only return once the call stack is free.
So, the engine needs to ‘get rid of’ this function temporarily, but in such a way that its execution can be resumed once the ~() => 'Hello!'~ callback returns.
How can this be done?

For example, by replacing the remaining unexecuted code of the function:

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

with the following code:

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

and then the engine continues executing the script from that line:

~~~js
console.log('Finish')
~~~

after which the call stack is freed, and the callback is returned from the **Event Loop**:

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

which received a message with the value 'Hello!'.

Thus, the appearance of the **~await~** keyword causes the unexecuted remainder of the asynchronous function's code to become a callback.

_____________________________________________

## ![ico-20 icon] Examples⟪Examples⟫

### ![ico-25 cap] 7⟪7⟫

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

Let's create an object which has the method **~then()~**:

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8⟪8⟫

In this example, the main thread code will execute with the value **5** of the variable ~num~.
However, calling the asynchronous function ~sample()~ will result in the value of the variable ~num~ being 10 after the main thread code has finished executing.

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

### ![ico-25 cap] 9⟪9⟫

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

### ![ico-25 cap] 10⟪10⟫

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

### ![ico-25 cap] 11⟪11⟫

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

### ![ico-25 cap] 12⟪12⟫

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

1. The promise returned by the function ~async () => await 'async-await'~ resolved last, even though it is the first line of code.
2. The first to resolve was ~Promise.resolve('promise')~ (the second line of code).
3. The second to resolve was the promise returned by the function ~async () => 'async'~ (the third line of code).

By swapping the second and third lines of code:

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

We will see that the order of output to the console has changed accordingly:

~~~console
async
promise
async-await
~~~

That is, their callbacks enter the microtask queue in the same sequence in which they appeared in the code.

But with the function ~async () => await 'async-await'~, it is different.

Let's show that the code:

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

works identically to the code:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

To do this, we will run them first in the following sequence:

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

and then we will change the order of their sequence:

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

As we can see, they resolve strictly in the order in which they appear in the code.
That is, the appearance of the **~await~** keyword lengthens the chain of callbacks passing through the **Event Loop** by 1, which leads to ~;(async () => await 'async-await')().then(console.log)~ being the last to 'finish' in example 12.

As we have already mentioned earlier, the asynchronous function itself is interrupted at the point where **~await~** is encountered, and the remainder of the code of this function, which has not been executed up to that point, itself becomes a callback and 'goes' into the **Event Loop** to free up the call stack and allow the callback to return with the result. Therefore, the chain is lengthened by 1 microtask.

______________________________________________

### ![ico-25 cap] 13⟪13⟫

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

### ![ico-25 cap] 14⟪14⟫

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

### ![ico-25 cap] 15⟪15⟫

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

### ![ico-25 cap] 16⟪16⟫

Let's fix the current time value in milliseconds in the variable **~start~** and declare the helper functions **~getRandom~** and **~test~**:

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

Now let's execute the code:

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

As you can see, the messages are printed in a random order, depending on the value returned by the **~getRandom~** function for each promise.

The task is to synchronize the callbacks entering the call stack so that '**_First_**' is printed to the console first, followed by '**_Second_**', and then '**_Third_**'.

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

So, an async function can serve as a "wrapper" for multiple asynchronous operations, the execution of which can be ordered in time, i.e., make it so that their callbacks are executed in a specified sequence.

________________________________

### ![ico-25 cap] 17⟪17⟫

Let’s consider a purely theoretical variant
(in practice, you shouldn’t do this):

◘◘![ico-25 cap] **17**◘◘

~~~js
const origin = 'https://js-lessons-sandbox.garevna.workers.dev/json-server'

const users = ['Stephan', 'Andry']
  .reduce(async (result, item) => {
    const data = await (await fetch(`${origin}/users?name=${item}`)).json()
    result = await result
    result.push(data[0])
    return result
  }, [])
~~~

Here are the key points to consider:

the **reduce** method is passed an asynchronous function that returns a promise.
Therefore, after each iteration, the **result** variable will be a promise
and it must be resolved using **await**.

As a result of the script’s execution, the **users** variable will contain a promise.
Let’s extract the result from the promise:

~~~js
users.then(console.log)
~~~

![ico-20 yes] Please note: to reduce the number of server requests, it is better to do it this way:

~~~js
fetch(`${origin}/users?name=Stephan&name=Andry`)
  .then(response => response.json())
  .then(console.log)
~~~

or like this:

~~~js
const origin = 'https://js-lessons-sandbox.garevna.workers.dev/json-server'

const getEndpoint = userList => userList
  .reduce((result, item, index) => result += `${index > 0 ? '&' : ''}name=${item}`, '')

const getUsers = async userList => await (await fetch(`${origin}/users?${getEndpoint(userList)}`)).json()

getUsers(['Stephan', 'Andry'])
  .then(console.log)
~~~

___________________________________________

### ![ico-25 cap] 18⟪18⟫

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

### ![ico-25 cap] 19⟪19⟫

Let’s extend the **~Object~** constructor prototype with the **~addElem~** method:

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

As we can see, the added element will have two methods: **~addChar~** and **~replace~**, which allow us to modify the element’s text content.

Now let’s extend the prototype of the constructors **~String~** and **~Number~** with the method **~then~**:

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

We can now create the ‘simple’ functions **~typeWritter~** and **~showNumber~**:

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
