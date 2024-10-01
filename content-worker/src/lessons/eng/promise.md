# ![ico-35 study] Promise

__________________________________________________________________________________________

## ![ico-30 icon] Constructor

Constructor **~Promise~** is a **higher-order function**.
This means that the constructor **~Promise~** expects a **function** as a **required argument**.

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

If you call constructor **~Promise~** without an argument:

~~~js
const promise = new Promise ()
~~~

![ico-20 err] an exception will be thrown:

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] Function-argument

The function-argument of the **~Promise~** constructor is also a **higher-order function**, i.e. its formal parameters are **functions**.
^^Moreover, its formal parameters are callback functions.^^

The function-argument will be called when the **~Promise~** instance is created.
Let's try passing to the **~Promise~** constructor the reference to a function without formal parameters:

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

~~~console
Start
Promise starts
End
~~~

As we can see, the **~Promise~** constructor called the anonymous function passed to it.
So, we've passed a function to **~Promise~** constructor, and the last one has called this function.

So far, no async stuff.

_____________________________________

### ![ico-25 icon] Instance

Let's see what the **~Promise~** constructor creates:

~~~js
const promise = new Promise(() => console.log('Promise starts'))
console.log(promise)
~~~

~~~console
Promise starts

▼ Promise {<pending>}
  ▼ [[Prototype]]: Promise
    ► catch: ƒ catch()
    ► constructor: ƒ Promise()
    ► finally: ƒ finally()
    ► then: ƒ then()
      Symbol(Symbol.toStringTag): "Promise"
    ► [[Prototype]]: Object
    [[PromiseState]]: "pending"
    [[PromiseResult]]: undefined
~~~

So we have an instance that has a ~[[[PromiseState]]~ property set to "**~pending~**" and a ~[[PromiseResult]]~ property set to **~undefined~**.

^^These properties can be seen in the debugger console, but the script does not have access to them.^^
Also, we see three "inherited" methods: **~then~**, **~catch~**, and **~finally~**, which we'll discuss further.

__________________________________________

### ![ico-25 icon] Static methods

Let's also see what static methods the **~Promise~** constructor has.

~~~js
console.dir(Promise)
~~~

~~~console
▼ ƒ Promise()
  ►  all: ƒ all()
  ►  allSettled: ƒ allSettled()
  ► any: ƒ any()
  length: 1
  name: "Promise"
  ► prototype: Promise {Symbol(Symbol.toStringTag): 'Promise', then: ƒ, catch: ƒ, finally: ƒ}
  ► race: ƒ race()
  ► reject: ƒ reject()
  ► resolve: ƒ resolve()
  ► withResolvers: ƒ withResolvers()
  ► Symbol(Symbol.species): ƒ Promise()
  ► Symbol(Symbol.species): ƒ Promise()
    arguments: (...)
    caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

Let’s see what they can do.

~~~js
const promise = Promise.resolve('Hello')
console.log(promise)
~~~

~~~console
▼ Promise {<fulfilled>: 'Hello'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: "Hello"
~~~

Ok, we have received an instance whose state is no longer “~pending~”, but “**~fulfilled~**”.
And the result is no longer ~undefined~, but "**Hello**".

~~~js
const promise = Promise.reject('Access denied.')
console.log(promise)
~~~

~~~console
▼ Promise {<rejected>: 'Access denied.'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "Access denied."
~~~

Now we have an instance whose state is no longer "~pending~", not "~fulfilled~", but "**~rejected~**".
And the result is "**Access denied.**".

Those, we have received an object that can have different states (~[[PromiseState]]~), and which can have content (~[[PromiseResult]]~).
It's pretty much like a closed box that might have something inside (~[[PromiseResult]]~).

So, an instance of the **~Promise~** constructor will be in one of three possible states:

| **pending** | **fulfilled** | **rejected** |
| ^^No contents yet (box empty)^^ | ^^The result is in the box^^  | ^^There is an error message in the box^^ |

_________________________________________

![ico-35 coffee]

Let's say you walked into a café where there are no waiters and you placed an order ![ico-35 egg].
At the same time, a box appears on the table in front of you, and at some point the answer to your order will appear in this box.
The answer will not appear immediately, since it takes time to transfer the order to the kitchen.
The answer may be positive (then the ![ico-35 egg] will will appear in the box),
or negative if the chef can't cook the ![ico-35 egg] right now due to a lack of necessary ingredients.

The trick is that you can't peek inside the box to see if something's come up or not.

While the box is empty, its state (~[[PromiseState]]~) will be **~pending~**.
If the ![ico-35 egg] appears in the box, the state (~[[PromiseState]]~) will become **~fulfilled~**.
If there's a rejection in the box, then the state (~[[PromiseState]]~) will become **~rejected~**.

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

Now we need to figure out how to “pull” the values ​​of the ~[[PromiseState]]~ and ~[[PromiseResult]]~ properties from this instance.
We can see them in the console, but those properties aren't available for our code.

But we are really hungry.

Let's try out the prototypal methods that are available to an instance of the **~Promise~** constructor.

_______________________________________________________

### ![ico-25 icon] Prototypal methods

Each instance created by the **~Promise~** constructor “inherits” the methods **~then~**, **~catch~** and **~finally~** from the “daddy”.

The methods **~then~** and **~catch~**  are two “holes” in the box through which we can extract what is in this box.
To do this you need to “stick your hands” into these holes.

By "hands" we mean **functions**.

![ico-25 warn] So the methods **~then~**, **~catch~** and **~finally~** are **higher-order functions** because their arguments must be **functions**.

However, if you pass nothing or any other value that is not a function the method will not throw an exception, although the method will not work.
Those the expression:

~~~js
Promise.resolve('Access granted.').then()
~~~

or:

~~~js
Promise.resolve('Access granted.').then(10)
~~~

will be equivalent to the expression:

~~~js
Promise.resolve('Access granted.')
~~~

It makes sense, since the method's job is to pass a callback function to the **Event Loop**, and if there's nothing to pass, the method will do nothing.

![ico-25 warn] The methods **~then~**, **~catch~** and **~finally~** return an instance of **~Promise~**.

That is, once you create an instance of **~Promise~**, you can't "escape" the "vicious circle"; no matter what you do, the result will always be a new instance of **~Promise~**.

#### ![ico-20 icon] catch

The function that we will pass to the **~catch~** method will pick up an error message if the request is rejected and the state of our “box” becomes **~rejected~**.

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

Let's take exception handling seriously.
It’s very bad if the console turns red with error messages while your application is running.

☼☼☼ Don't make the console blush for you ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

Through the hole **~then~** you can stick two hands at once: one for the result, the other for the error message:

~~~js
console.log('Start')
Promise.resolve('Access granted.').then(console.log, console.log)
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
~~~

#### ![ico-20 icon] finally

I think this method is quite simple.

~~~js
console.log('Start')
Promise.resolve('Access granted.')
  .then(console.log, console.log)
  .finally(() => console.log('Finally'))
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
Finally
~~~
______________________________________________

## ![ico-30 icon] Magic box

So, using the **~Promise~** constructor, you can create a magic box with two holes.
As we already realized, it's just impossible to peek into this box "here and now."
Access to its contents is possible only through [►►►**Event Loop**►►►](page/Event-Loop).
So, you'll have to send callbacks for the result, and there's no other way to get the contents out of the box.

Let's figure out why it is this way.

Actually, the **~Promise~** instance acts as a "trap" for the result of the asynchronous process.

Since we don't know when the asynchronous process will end, we don't know when the state of the box will change and the contents will appear inside it.

If the box could be opened immediately, then most likely we would see an empty box.
Now imagine that you are hovering near a box and waiting for the contents to appear inside it.
Those you block the **Call Stack**.
But the contents cannot appear in the box while the Call Stack is busy.
Even if the server response has already delivered, or the timer has expired...
So, you'll be stuck with an empty box in your hands. Plus, you'll lock the page.

The output: the code that created the **~Promise~** instance should finish running and free up the Call Stack.

When we pass our callback functions through the holes **~then~**, **~catch~** and **~finally~** of the **~Promise~** instance, we free the call stack and we give the box the opportunity to get the desired result. Having received the result, the box will pass it on to one of our callback functions.

Now let's go back to the constructor.
We know that when calling the **~Promise~** constructor, we must pass it a certain function (more precisely, a reference to a function).

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

This function will be called immediately.
But this function has two formal parameters.

Here you should have a completely reasonable question:
if we pass the **~Promise~** constructor a reference to a function, but we do not pass any arguments to call that function, then how can the constructor call it?
After all, the constructor should pass  an arguments to this function when calling?

◘◘![ico-25 coffee] ** 2**◘◘
~~~js
const promise = (function (startTime) {
  const interval = Math.round(Math.random() * 5000)

  function recurse (callback) {
    Date.now() - startTime < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(Date.now() - startTime)
  }

  return new Promise(resolve => recurse(resolve))
})(Date.now())

promise.then(console.log)
~~~

In this example, we see that we send the **~console.log~** callback after the **~Promise~** instance has been created.
And we couldn’t have done this before, since we use its **~then~** method to pass the callback.

This is precisely the magic of our two-hole box.
The box itself will send its own callback functions to the [►►►**Event Loop**►►►](page/Event-Loop) for the result.

Let's see what happens if we create the **~Promise~** instance much earlier than we'll transfer the callback functions using the **_~then~_** and **_~catch~_** methods.

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

After waiting a few seconds, let's execute the code:

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

In the console we will see something like:

~~~console
Start
End
Time: 24/ 36
~~~

Those. at the time the promise **~test~** was created, it was 24 seconds, and when we added callbacks, it was already 36 seconds.
But the trick is that, although we “stuck our hands” into the **~then~** hole a few seconds later, the magic box saved for us the result that was obtained earlier.

Imagine that you launched several asynchronous processes, received several "magic boxes", and put them on a shelf.
You can get out the contents of the boxes at any time convenient for you and in any sequence convenient for you.

To illustrate this, let's use the anonymous function from the previous example, but now give it the name **~createPromise~** and modify it a little:

~~~js
function createPromise (startTime, title) {
  const interval = Math.round(Math.random() * 5000)
  function recurse (callback) {
    const time = Date.now() - startTime
    time < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(`${title}: ${Date.now() - startTime}`)
  }
  return new Promise(resolve => recurse(resolve))
}
~~~

Now let's use it to create three instances of **~Promise~**:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

As we can see, these three instances are resolved in a random order, depending on the value of the random variable **~interval~**, which is determined at the time the instance is created.

{{{promise-03.js}}}

Suppose we need to strictly follow the output order: first → second → third.
To do this, let’s use the “magical” properties of our “box with two holes”:

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] "Bundles" of promises

Continuing to study the static methods of the **~Promise~** constructor, we discover that in addition to **~Promise.resolve~** and **~Promise.reject~**, there are a number of useful methods with which we can serve entire collections of promises at once.
The main thing is that these collections should be **iterable**.

When we run several asynchronous operations in parallel, we find ourselves in the storm of callback functions returning to us.

@@@@
Imagine a tennis court and a cannon fires balls at a rate of five balls per second, and you have to catch them.<br>What if there are two cannons? Three cannons?...
![](illustrations/promise-all.jpg)
@@@@

Of course, promises make things easier.
These "magic boxes" act as "traps" for the balls.
We can "get the balls" from these "boxes" using the method **~then~**.

Things get more complicated if you need the results of these asynchronous operations in a given order.

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

This clearly suggests a solution of this kind:

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))

const results = []
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(value => { results[index] = { time: Date.now() - start, value } }))
~~~

{{{promise-arrays-02.js}}}

This is especially convenient if we need the results of several asynchronous operations simultaneously.
We can run several asynchronous operations, and process the received data in a "batch" when they all complete.
However, in this case, we don't know when the array **~results~** will be ready.
So we need another promise which will resolve after all the promises in the array are resolved.

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

const results = new Array(promises.length).fill(null)
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(response => { results[index] = response }))

function recurse (resolve) {
  results.filter(item => !item).length
    ? setTimeout(recurse.bind(null, resolve), 400)
    : resolve(results)
}

const promise = new Promise(resolve => recurse(resolve))

promise.then(console.log)
~~~

So, next we will look at the static methods of the **~Promise~** constructor, which take as an argument a reference to **iterable collection of promises** and return **one promise**.

@@@@
I.e. let's "pack" several "magic boxes" into one "magic box".
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

This method takes an iterable collection of promises, and returns a single promise, which will resolve with an iterable collection of results when all promises resolve.
The remarkable thing is that the order of responses in the results collection strictly corresponds to the order of promises in the original collection of promises.

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const create = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time))
const show = message => document.body.appendChild(document.createElement('p')).innerText = message

const promises = [
  create('Hello', 1000),
  create('Bye', 3000),
  create('How are you?', 2000)
]

Promise.all(promises)
  .then(responses => responses.forEach(show))
~~~

![ico-20 warn] If there is a possibility of rejection of at least one of the promises, then our entire “package” will be rejected:

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

Let's go back to our example 5 and see how much simpler the code becomes using the **~Promise.all~** method:

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)
let results = null

const start = Date.now()

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

Promise.all(promises)
  .then(responses => { results = responses })
  .then(() => console.log(results))
~~~

______________________________________________

### ![ico-20 icon] Promise.allSettled

Returns a promise that resolves with the iterable collection of objects.
Each promise in the source iterable collection of promises corresponds the object in the resulting iterable collection of objects.
Each object of resulting iterable collection has three possible properties: **~status~**, **~value~** and **~reason~**.

The **~status~** property can take one of two values: **~fulfilled~** or **~rejected~**.
When the **~status~** property has the value **~fulfilled~**, then the **~value~** property contains the result of the promise.
When the **~status~** property has the value **~rejected~**, then the **~reason~** property contains a message about the reason for the error.

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

This static method of **~Promise~** constructor finds the first successfully resolved promise in the promise "batch" and returns it.

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

This method is good when we send several requests, but are satisfied with one of the results.
For example, if we want to display a picture on the page, but we don’t remember exactly in which folder it is located.

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const getURLs = fileName => ['icons', 'images', 'files', 'sounds']
  .map(folder => `https://garevna.github.io/js-lessons/${folder}/${fileName}`)

function testURL (src) {
  return new Promise ((resolve, reject) => {
    const img = Object.assign(new Image(48), {
      onload (event) {
        resolve(img)
      },
      onerror (event) {
        reject(`Image ${src} does not exist.`)
      },
      src
    })
  })
}

const promises = getURLs('coffee.png').map(url => testURL(url))
~~~

If we use the previous method:

~~~js
Promise.allSettled(promises).then(console.log)
~~~

then we will see in the console:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

However, if we are sure that at least one of the promises will be resolved, then we can use the method **~Promise.any~**:

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

and then we will see the desired picture on the page.
______________________________________________

### ![ico-20 icon] Promise.race

"Race" - which of the promises will be resolved first.
It doesn't matter what the result will be.
The main thing is that it reaches the finish line first.

If one of the promises will be rejected before the others are resolved or rejected, we will see an error message.

Let's use **Github Users API**:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))

const getURLs = () => ['brynary', 'stocad', 'holin', 'mojombo', 'Bill']
  .map(id => `https://api.github.com/users/${id}`)

const show = response => {
  const text = addElem('h4')
  if (response.avatar_url) {
    Object.assign(addElem('img'), {
      src: response.avatar_url,
      width: 150
    })
    text.innerText = `${response.id}: ${response.login}`
  } else {
    text.innerText = response.message.replaceAll('. ', '.\n')
    text.style.color = '#a00'
  }
}

function getPromise (url) {
  return new Promise ((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(resolve)
  })
}

const promises = getURLs().map(url => getPromise(url))

Promise.race(promises).then(show)
~~~

{{{promise-race.js}}}
__________________________________________________________________________________________

## ![ico-25 icon] Examples

We use **Battery API** to get information about battery charging.
The **~getBattery()~** method of the **~navigator~** object returns a ~promise~.
![ico-25 warn] This example will not work in the console of the ~about:blank~ page.
^^Метод  **_getBattery()_**  объекта  **navigator** возвращает промис.^^


◘◘![ico-25 cap] **10**◘◘

~~~js
navigator.getBattery()
  .then(result => {
    for (const prop in result) {
      console.log(`${prop}: ${result[prop]}`)
    }
})
~~~

__________________________________________________________________________________________

◘◘![ico-25 cap] **11**◘◘

~~~js
const boy = [
  'Hi, what\'s your name?',
  'And I\'m Robert. Where do you live?',
  'In Lviv. Do you work or study?',
  'Me too. Okay, see you later, good luck!'
]

const girl = [
  'Hi, I\'m Helen, and you?',
  'In Kharkov. And where are you?',
  'I study and work. And you?',
  'Thanks, mutually!'
]

function output () {
  console.log(this.shift())
  return this[0]
}

boySpeak = output.bind(boy)
girlSpeak = output.bind(girl)

new Promise(resolve => resolve())
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)

new Promise(resolve => resolve())
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
~~~

______________________________________________________________

Let's extend the prototype of the **~Error~** constructor a little:

~~~~js
Object.defineProperty(Error.prototype, 'name', {
  get () { return this.errorNames[this.code] }
})

Object.defineProperty(Error.prototype, 'message', {
  get () { return this.messages[this.code] }
})

Object.assign(Error.prototype, {
  errorNames: [
    'CustomError',
    'RandomError',
    'FatalError',
    'GameOver',
    'Shit',
    'FuckingError',
    'StrangeError',
    'XSS',
    'DoS',
    'DDoS'
  ],
  messages: [
    'Not authorized.',
    'Something happens...',
    'Access denied.',
    'Try another way.',
    'You are the kremlin troll.',
    'Operation failed.',
    'Unknown operation.',
    'Malicious code injection.',
    'Denial-of-service attack.',
    'Distributed denial-of-service attack.'
  ]
})
~~~~

In addition, let's extend the functionality of the console:

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

Now let's do the following:

◘◘![ico-25 cap] **12**◘◘

~~~js
const func = callback => callback(Object.assign(new Error(), { code: Math.round(Math.random() * 9) }))

const getError = (resolve, reject) => setTimeout(func.bind(null, reject), Math.random() * 10000)

for (let num = 0; num < 10; num++) {
  new Promise(getError)
    .then(null, console.warning)
}
~~~

{{{promise-12.js}}}

________________________________

| [![ico-25 plunker] **13**](https://plnkr.co/edit/99ajm1Z3jcpKQQoE ) | [![ico-25 plunker] **14**](https://plnkr.co/edit/DIStxeDAPpXmhSTw ) | [![ico-70 replit] **15**](https://repl.it/@garevna/promise-sample-1 ) |

__________________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/promise)
