## ![ico-25 icon] Promises


Calling an asynchronous function returns a promise

Let's remember what's good about promises in JS?
First of all, because if a promise is fulfilled, then it is not at all necessary to immediately take back what was promised.
You can put the promise on the shelf:

~~~js
const promise = sayHello ()
~~~

@@@@

![](illustrations/tin.jpg)
and then 'open the tin' (_promise_) when **it will be convenient for us**! Moreover, 'the opener' (~then()~ method) is always with it. Promise is a reliable tin in which the contents will not deteriorate or disappear.

@@@@

@@@@ 3
![](illustrations/modesty.png)
What else is good about a promise? - his modesty! Promise will never interrupt the main thread. Will never fit into the Call Stack without waiting in line.
![](illustrations/promise-in-queue.png)

@@@@

![ico-25 cap] **Example 1**

For example, as a result of executing the following code:

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

we will see in the console:

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

ie the asynchronous function ~sayHello()~ behaves very modestly:
although all it does is just say hello,
but at the same time it does not break into the main thread and does not yell from the threshold: "_Hello!_"
it modestly waits for the main thread to complete its work
after which it politely says "Hello"

but all that distinguishes it from a regular function is the word **~async~**
remove this word, and "Hello" will appear between "Start..." and "Finish..."

So what's the deal?

The fact is that the call to the ~sayHello()~ function returned a promise to say hello,
but when it is convenient for the main thread ![ico-20 smile]

__________________________________

## ![ico-25 icon] More than just a promise

Sometimes you need to streamline the execution of several asynchronous operations.
We can already solve this problem using a promise and a chain of calls to the **~then~** method:

◘◘![ico-20 cap] Example 2◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

In this example, after 1 second the first promise will be resolved with the message "Hello".
When it resolves, a new promise will be created, which will also resolve after 1 second.
The second promise will add the string ", baby" to the message returned by the first promise.
As a result, the chain of promises will resolve in 2 seconds, and the console will display ~Hello, baby~.

Let's change the code a little to track time.

To do this, we declare an auxiliary function ~setTimer~:

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Now the chain of promises will be simplified, and we'll see an indication of the execution time in milliseconds:

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

Now we will see in the console something like:

~~~console
568
Promise {<pending>}
569
570
Hello, baby
~~~

However, an async function is an alternative solution.

Let's declare a helper function **resolve**:

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

Let's slightly correct the code of the **setTimer** function, replacing ~console.log~ with a call to the ~resolve~ function:

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Now let's declare the asynchronous function **sayHello**:

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~

and  call it by passing the **~resolve~** callback through the ~then~ method:

~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

What we see from this example:

• instead of calling the **~then~** method of the promise, the keyword **~await~** of the asynchronous function was used;
• the code that follows the line with **~await~** will be executed as if this code was executed in the callback of the **~then~** method of the previous promise;
• calling an asynchronous function returns a promise, so the result of an asynchronous function can only be obtained using the **~then~** method;
• in order for a call to an asynchronous function will be resolved with some result, the body of the asynchronous function must contain the operator **~return~**;

_________________________

### ![ico-20 icon] Queue Manager

The asynchronous function is an excellent queue organizer.
It strictly ensures that no one jumps over the queue at the Call Stack ![ico-20 smile]

Let us have a function **promise** that returns a promise.
In this case, the callback resolve binds the first argument passed to the function **promise**.
The second argument to the **promise** function is used to set the timer:

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

and function **resolve**:

~~~js
const resolve = response => console.log(response)
~~~

Let's make three consecutive calls to the **promise** function:

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

As we can see, callbacks are returned when the timer has expired, and not in the order they were called.

Now let's queue them up using the asynchronous function **sigma**:

◘◘![ico-20 cap] Example 3◘◘

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

Now they strictly keep the order of queue! ![ico-20 smile]

__________________________________

### ![ico-20 icon] Organizer of asynchronous processes

◘◘![ico-20 cap] Example 4◘◘

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

^^To see what logins are in the database, run in the console:^^

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

_________________________________

Let's rewrite the previous example a little.

Let's declare a function **getInput** that will return **_promise_**.
The **getInput** function receives the **users** object as an argument, and creates an ~input~ element for entering the user's login.

The anonymous function that is passed to the **Promise** constructor sets up a handler for the onchange event of the ~input~ element, which calls either **~resolve~** or **~reject~** depending on what was entered in the ~input~ field (whether there is a corresponding user in the database)

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

Now let's create an asynchronous function **getLogin**, which will send a request to the server, receive data, call the function **getInput** and transfer the received data to it:

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

Let's create two more helper functions:

◘◘![ico-20 file] resolve & reject◘◘

~~~js
const resolve = response => console.log(response)
const reject = error => console.warn(error)
~~~

All that remains is to call the **getLogin** function:

◘◘![ico-20 cap] Invoke the getLogin function◘◘

~~~js
getLogin().then(resolve, reject)
~~~

and don't forget to press 'Enter' after entering your login.

_____________________

So, the complete example code:


◘◘![ico-20 cap] Пример 5◘◘

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

const resolve = response => console.log(response)
const reject = error => console.warn(error)


getLogin().then(resolve, reject)
~~~

{{{async-is-good-5.js}}}

_______________________
[![ico-30 hw] Quiz](quiz/async )
