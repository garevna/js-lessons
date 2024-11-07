## ![ico-25 icon] Promises

An asynchronous function call returns an instance of **~Promise~**.

Let's recall some valuable properties of **~Promise~** instances.

First of all, it is convenient that if an instance of **~Promise~** goes to the **~fulfilled~** state, it is not at all necessary to pick up the result immediately.
We can put our ‘magic box’ on a shelf:

~~~js
const promise = sayHello()
~~~

@@@@
![](illustrations/promise-tin.svg)
and "open" it (like a tin can) when it suits us!<br><br>Moreover, the "opener" - the **~then()~** method - is always with it.<br><br>The **~Promise~** instance is a reliable tin where the contents won't spoil or disappear.<br>The main thing is not to lose the reference to this can.
@@@@

What else makes instances of **~Promise~** so convenient for us?

@@@@
The **~Promise~** instance is a **microtask**, and microtasks have their own queue, the priority of which is higher than the priority of the task queue.<br><br>I.e. while the fat and sluggish tasks will stupidly sit in their queue and wait for the ‘office’ (**Call Stack**) to be vacated, microtasks one by one will jump past them into the ‘office’. And until the last microtask from the privileged queue passes through the **Call Stack**, the tasks will wait.
![](illustrations/queue-microtask.svg)
@@@@

For example, as a result of executing the following code:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Finish: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

we'll see in the console:

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

@@@@
<br>i.e. the asynchronous **~sayHello()~** function behaves very modestly:<br>although all it does is just say hello,<br>but it doesn't break into the worker thread and yell "Hello" from the doorstep.<br>it modestly waits for the thread to finish its work,<br>and then politely says "Hello".<br><br>
![](illustrations/promise-modesty.svg)
@@@@

And all that distinguishes it from a normal function is the word **~async~**.
Remove that word, and "Hello" appears between "Start..." and "Finish...".

Why?

Because the **~sayHello()~** function call returned a promise to say hello, but when it is convenient for the main thread to do so ![ico-20 smile]

__________________________________

## ![ico-25 icon] More than just a promise

Sometimes you may want to streamline the execution of several asynchronous operations.

We can already solve such a problem with the ~Promise~ instance and the call chain of **~then~** method:

◘◘![ico-20 cap] ** 2**◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

In this example, after 1 second, the first instance of ~Promise~ will resolve with the message ‘Hello’.
When it resolves, a new instance of ~Promise~ will be created, which will also resolve after 1 second.
The second instance of ~Promise~ will append the string ‘, baby’ to the message returned by the first instance of ~Promise~.
Eventually, the chain of ~Promise~ instances will resolve after 2 seconds, and the console will show ~Hello, baby~.

Let's modify the code a bit to keep track of time.

To do this, let's declare a helper function ~setTimer~:

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Now the chain of method **~then~** calls of ~Promise~ instances will be simplified, while we will see an indication of the execution time in milliseconds:

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

Now we'll see in the console something like:

~~~console
568
► Promise {&lt;pending>}
569
570
Hello, baby
~~~

The asynchronous function is an alternative solution.

Let's declare an auxiliary function **~resolve~**:

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

Now let's adjust the code of the **~setTimer~** function a bit, replacing ~console.log~ with a call of the **~resolve~** function:

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

and now declare the asynchronous function **~sayHello~**:

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~

and call it by passing a **~resolve~** callback through the **~then~** method:

~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

What we see from this example:

• instead of calling the **~then~** method of the **~Promise~** instance, the **~await~** keyword of the asynchronous function is used;
• the code that follows the line with **~await~** will be executed as if this code were executed in the callback function passed to **~then~** method of the previous **~Promise~** instance;
• the asynchronous function call returns an instance of **~Promise~**, so you can only get the result of the asynchronous function using the **~then~** method;
• in order to resolve an asynchronous function call with the result, there must be a **~return~** operator in the body of the asynchronous function.

_________________________

### ![ico-20 icon] Queue Manager

The asynchronous function is an excellent queue organiser.
It strictly enforces the order of the microtask queue ![ico-20 smile].

Suppose we have a function **~promise~** that returns an instance of ~Promise~,
and also binds to the **~resolve~** colback the first argument passed to the **~promise~** function.
The second argument to the **~promise~** function is used to set the timer:

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

and the **~resolve~** function:

~~~js
const resolve = response => console.log(response)
~~~

Let's make three consecutive calls to the **~promise~** function:

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

As we can see, the colbacks are returned when the timer time has expired, not in the order they were called.

Now let's queue them using the asynchronous function **~sigma~**:

◘◘![ico-20 cap] ** 3**◘◘

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}

async function sigma () {
  console.log(await promise('Start', 5))
  console.log(await promise('Continue', 3))
  console.log(await promise('End', 2))
  return 'Finish'
}

sigma().then(response => console.log(response))
~~~

{{{async-is-good-3-2.js}}}

Now they're strictly following the queue ![ico-20 smile]

__________________________________

### ![ico-20 icon] Organiser of asynchronous processes

◘◘![ico-20 cap] ** 4**◘◘

~~~js
async function getLogin (resolve, reject) {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  const logins = Object.keys(users)

  const userInput = document.body
    .appendChild(document.createElement('input'))

  userInput.oninput = function (event) {
    const test = logins.includes(event.target.value)

    event.target.style.color = test ? 'green' : 'red'
    event.target.title = test ? 'OK' : 'There is no such user in DB'
  }

  userInput.onchange = async event => {
    const res = logins.includes(event.target.value)

    userInput.remove()

    !res ? reject('Not found') : resolve(users[event.target.value])
  }
}

getLogin(res => console.log(res), err => console.error(err))
~~~


{{{async-is-good-4.js}}}

^^To see which logins are in the database, execute in the console:^^

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(console.log)
~~~

_________________________________

Let's slightly rewrite the previous example.

Declare a **~getInput~** function that will return an instance of **Promise**.
The **~getInput~** function takes a **~users~** object as an argument, and creates an ~input~ element to enter the login of the user.

The anonymous function that is passed to the **Promise** constructor sets the ~onchange~ event handler of the ~input~ element,
which calls either **~resolve~** or **~reject~** depending on what was entered into the ~input~ field.
(whether the corresponding user is in the database).

◘◘![ico-20 file] getInput◘◘

~~~js
function getInput (users) {
  const logins = Object.keys(users)

  const userInput = document.body
    .appendChild(document.createElement('input'))

  userInput.oninput = event => {
    const test = logins.includes(event.target.value)

    event.target.style.color = test ? 'green' : 'red'
    event.target.title = test ? '...' : 'There are no such user in DB'
  }

  return new Promise((resolve, reject) => {
    userInput.onchange = event => {
      const test = logins.includes(event.target.value)

      userInput.remove()

      !test ? reject('Not found') : resolve(users[event.target.value])
    }
  })
}
~~~

Now let's create an asynchronous function **~getLogin~** that will make a request to the server, get the data and call the function **~getInput~** and pass it the received data:

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

The only thing left to do is to call the function **getLogin**:

◘◘![ico-20 file] Function getLogin call◘◘

~~~js
getLogin().then(console.log, console.error)
~~~

and don't forget to press **Enter** after entering the login.


^^^[Full example code]
~~~js
function getInput ( users ) {
  const logins = Object.keys(users)

  const userInput = document.body
    .appendChild(document.createElement('input'))

  userInput.oninput = event => {
    const test = logins.includes(event.target.value)

    event.target.style.color = test ? 'green' : 'red'
    event.target.title = test ? '...' : 'There is no such user in DB'
  }

  return new Promise((resolve, reject) => {
    userInput.onchange = event => {
      const test = logins.includes(event.target.value)

      userInput.remove()

      !test ? reject('Not found') : resolve(users[event.target.value])
    }
  })
}

async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}


getLogin().then(console.log, console.error)
~~~
^^^

{{{async-is-good-5.js}}}

_______________________
[![ico-30 hw] Quiz](quiz/async )
