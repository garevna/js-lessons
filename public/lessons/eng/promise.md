# ![ico-35 study] Promise

__________________________________________________________________________________________

[►►►callback►►►](page/Event-Loop#Callback)

__________________________________________________________________________________________

## ![ico-30 icon] Function-argument

The function-argument of the **~Promise~** constructor is also a **higher-order function**, i.e. its formal parameters are **functions**.
^^Moreover, its formal parameters are callback functions.^^

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

The function-argument will be called when the **~Promise~** instance is created.

~~~js
const promise = new Promise ()
~~~

Let's try passing to the **~Promise~** constructor the reference to a function without formal parameters:

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] Instance

Let's see what the **~Promise~** constructor creates:
So we have an instance that has a ~[[[PromiseState]]~ property set to "**~pending~**" and a ~[[PromiseResult]]~ property set to **~undefined~**.

^^These properties can be seen in the debugger console, but the script does not have access to them.^^
Also, we see three "inherited" methods: **~then~**, **~catch~**, and **~finally~**, which we'll discuss further.

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

As we can see, the constructor **~Promise~** called the anonymous function passed to it.

~~~console
Start
Promise starts
End
~~~

So, we passed a function to the constructor **~Promise~**, and it called it.
No asynchronous behaviour so far.

_____________________________________

### ![ico-25 icon] Static methods

Let's also see what static methods the **~Promise~** constructor has.

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

Let’s see what they can do.
Ok, we have received an instance whose state is no longer “~pending~”, but “**~fulfilled~**”.

And the result is no longer ~undefined~, but "**Hello**".

__________________________________________

### ![ico-25 icon] Prototypal methods

Each instance created by the **~Promise~** constructor “inherits” the methods **~then~**, **~catch~** and **~finally~** from the “daddy”.

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

The methods **~then~** and **~catch~**  are two “holes” in the box through which we can extract what is in this box.

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

To do this you need to “stick your hands” into these holes.
By "hands" we mean **functions**.

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

![ico-25 warn] So the methods **~then~**, **~catch~** and **~finally~** are **higher-order functions** because their arguments must be **functions**.
However, if you pass nothing or any other value that is not a function the method will not throw an exception, although the method will not work.

Those the expression:
or:

will be equivalent to the expression:

| **pending** | **fulfilled** | **rejected** |
It makes sense, since the method's job is to pass a callback function to the **Event Loop**, and if there's nothing to pass, the method will do nothing.

_________________________________________

![ico-35 coffee]

![ico-25 warn] The methods **~then~**, **~catch~** and **~finally~** return an instance of **~Promise~**.

That is, once you create an instance of **~Promise~**, you can't "escape" the "vicious circle"; no matter what you do, the result will always be a new instance of **~Promise~**.
The response won’t appear straight away, as it takes time to pass the order on to the kitchen.
The response may be positive, in which case ![ico-35 egg] will appear in the box,
or negative, if the chef is currently unable to prepare ![ico-35 egg] due to a lack of the necessary ingredients.

The funny thing is that you can’t look inside the box to see whether anything has appeared there or not.

Whilst the box is empty, its state (~[[PromiseState]]~) will be **~pending~**.
If a ![ico-35 egg] appears in the box, then the state (~[[PromiseState]]~) will become **~fulfilled~**.
If there is a failure in the box, then the state (~[[PromiseState]]~) will become **~rejected~**.

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

Now we need to work out how to ‘extract’ the values of the properties ~[[PromiseState]]~ and ~[[PromiseResult]]~ from this instance.
We can see them in the console, but these properties are not accessible to our code.

And we’re peckish.

Let’s try out the prototype methods available to the constructor instance **~Promise~**.

_______________________________________________________

### ![ico-25 icon] catch

Let's take exception handling seriously.

It’s very bad if the console turns red with error messages while your application is running.
To do this, we need to ‘stick our hands’ into these holes.

By ‘hands’, we mean **functions**.

![ico-25 warn] So, the methods **~then~**, **~catch~** and **~finally~** are **higher-order functions**, as their arguments must be **functions**.

However, if you pass any other value that is not a function to the method, or do not pass anything at all, no exception will be thrown, although the method will not work.
That is, the expression:

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

This makes sense, as the purpose of the method is to pass a callback to the **Event Loop**; if there is nothing to pass, then the method **will do nothing**.

![ico-25 warn] The methods **~then~**, **~catch~** and **~finally~** return an instance of **~Promise~**.

In other words, once you have created an instance of **~Promise~**, you will no longer be able to ‘break out’ of this ‘vicious circle’; that is, whatever you do, the result will always be a new instance of **~Promise~**.

#### ![ico-20 icon] catch

The function we pass to the **~catch~** method will catch an error message if the request is rejected, and the state of our ‘box’ will become **~rejected~**.

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

Let’s take exception handling seriously.
It’s very bad if, whilst your application is running, the console is flooded with error messages.

☼☼☼ Don't make the console blush for you ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

Through the **~then~** hole, you can slip in two hands at once: one to retrieve the result, the other to catch the error message:

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

I think this method is quite straightforward.

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

## ![ico-30 icon] then

So, using the **~Promise~** constructor, you can create a magic box with two holes.
As we’ve already seen, it’s simply impossible to look inside this box ‘here and now’.
Access to its contents is only possible via the [►►►**Event Loop**►►►](page/Event-Loop).
In other words, you’ll have to send a callback to retrieve the result; there’s no other way to extract the contents from the box.

Let’s work out exactly why this is the case.

In fact, the **~Promise~** instance acts as a ‘trap’ for the result of the asynchronous process.
As we do not know when the asynchronous process will finish, we do not know when the state of the box will change and its contents will appear.

If the box could be opened straight away, we would most likely see an empty box.
Now imagine that you are hanging around the box, waiting for its contents to appear.
In other words, you are blocking the call stack.
But the contents cannot appear in the box whilst the call stack is busy.
Even if the server’s response has already arrived, or the timer has expired...
In other words, you’ll be left holding an empty box. And you’ll block the page in the process.
Conclusion: the code that created the instance **~Promise~** must terminate and free up the call stack.

When we pass our callbacks to the **~Promise~** instance via the ‘holes’ **~then~**, **~catch~** and **~finally~**, we free up the call stack and allow the box to obtain the required result. Once it has received the result, the box will pass it to one of our callbacks.

Now let’s return to the constructor.
We know that when calling the constructor **~Promise~**, we must pass it a function (or, more precisely, a reference to a function).

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

This function will be called immediately.
But this function has two formal parameters.

At this point, you’re bound to ask a perfectly logical question:
if we pass a reference to a function to the constructor **~Promise~** but do not pass any arguments for calling that function, how can the constructor call it?
After all, when it calls the function, it must pass arguments to it, mustn’t it?

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

In this example, we can see that we pass the callback **~console.log~** only after the instance **~Promise~** has been created.
And we couldn’t have done so earlier, since we’re using its method **~then~** to pass the callback.

This is precisely where the magic of our box with two holes lies.
The box itself will send its own callbacks to the [►►►**Event Loop**►►►](page/Event-Loop) to retrieve the result.

Let’s see what happens if we create an instance of ~Promise~ well before attaching the callbacks using the methods **_~then~_** and **_~catch~_**

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

After waiting a few seconds, let’s run the code:

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

In the console, we’ll see something like this:

~~~console
Start
End
Time: 24/ 36
~~~

In other words, when the promise **~test~** was created, it was 24 seconds, and by the time we added the callbacks, it was already 36 seconds.
But the funny thing is that, although we ‘stuck our hands’ into the **~then~** hole a few seconds later, the magic box saved the result we’d obtained earlier for us.

Imagine you’ve launched several asynchronous processes, received several ‘magic boxes’, and placed them on a shelf.
You can retrieve the contents of the boxes at any time that suits you and in any order you like.

To illustrate this, let’s use the anonymous function from the previous example, but this time we’ll give it the name **~createPromise~** and modify it slightly:

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

Now let’s use it to create three instances of **~Promise~**:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

As we can see, these three instances are resolved in arbitrary order, depending on the value of the random variable **~interval~**, which is determined at the moment the instance is created.

{{{promise-03.js}}}

Suppose we need to strictly adhere to the output sequence: first → second → third.
To do this, we shall make use of the ‘magical’ properties of our ‘box with two holes’:

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] finally

As we continue to explore the static methods of the **~Promise~** constructor, we discover that, in addition to **~Promise.resolve~** and **~Promise.reject~**, there are a number of other useful methods with which we can handle entire collections of promises at once.
The main thing is that these collections are **iterable**.

When we run several asynchronous operations in parallel, we find ourselves inundated with callbacks.

@@@@
Imagine a tennis court where a machine is firing balls at a rate of five balls per second, and you have to return them.<br>What if there were two machines? Three machines?...
![](illustrations/promise-all.jpg)
@@@@

Promises certainly make the task easier.
These ‘magic boxes’ act as ‘traps’ for the balls.
We can ‘extract balls’ from these ‘boxes’ using the **~then~** method.

Things get more complicated if you need the results of these asynchronous operations in a specific order.

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

A solution of this sort clearly suggests itself here:

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

This is particularly useful if we need the results of several asynchronous operations at the same time.
We can launch several asynchronous operations and process the resulting data ‘in batches’ once they have all completed.

However, in this scenario, we do not know when the array **~results~** will be ready.
In other words, we need another promise that will return **~results~** to us once all the promises in the array have resolved.

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

So, next we will look at the static methods of the **~Promise~** constructor, which take a reference to an **array of promises** as an argument and return a single promise.

@@@@
In other words, we will ‘pack’ several ‘magic boxes’ into a single ‘magic box’.
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

This method takes an iterable collection of promises and returns a single promise, which resolves to an array of results once all the promises have resolved.
What’s remarkable is that the order of the results in the array strictly corresponds to the order of the promises in the original array of promises.

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

![ico-20 warn] If there is a chance that even one of the promises will ‘fail’, then our entire ‘package’ will fail:

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

Let’s return to our Example 5 and see how much simpler the code becomes when using the **~Promise.all~** method:

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

Returns a promise that resolves to an array of objects.
Each promise in the source array corresponds to an object in the resulting array.
An object has three possible properties: **~status~**, **~value~** and **~reason~**.

The property **~status~** can take one of two values: **~fulfilled~** or **~rejected~**.
When the property **~status~** has the value **~fulfilled~**, the property **~value~** contains the result of the promise.
When the property **~status~** has the value **~rejected~**, the property **~reason~** contains a message stating the cause of the error.

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

This static method of the **~Promise~** constructor finds the first successfully resolved promise in the ‘batch’ of promises and returns it.

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

This method is useful when we send several requests but are satisfied with just one of the results.
For example, if we want to display an image on a page but cannot remember exactly which folder it is in.

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

we will see the following in the console:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

However, if we’re certain that at least one of the promises will resolve, we can use the **~Promise.any~** method:

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

and then we’ll see the correct image on the page.
______________________________________________

### ![ico-20 icon] Promise.race

“Race” – which of the promises resolves first.
It doesn’t matter what the result is.
The main thing is that it crossed the finish line first.

In other words, if one of the promises ‘fails’ first, we’ll see an error message.

Let’s use the **GitHub Users API**:

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

## ![ico-25 icon] Magic box

So, using the **~Promise~** constructor, you can create a magic box with two holes.
As we already realized, it's just impossible to peek into this box "here and now."
Access to its contents is possible only through [►►►**Event Loop**►►►](page/Event-Loop).


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

So, you'll have to send callbacks for the result, and there's no other way to get the contents out of the box.

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

Let's figure out why it is this way.

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

Actually, the **~Promise~** instance acts as a "trap" for the result of the asynchronous process.

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
