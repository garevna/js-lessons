## ![ico-25 icon] {{s1.h1}}


{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

~~~js
const promise = sayHello ()
~~~

@@@@

![](illustrations/tin.jpg)
{{s1.p5}}

@@@@

@@@@ 3
![](illustrations/modesty.png)
{{s1.p6}}
![](illustrations/promise-in-queue.png)

@@@@

{{s1.p7}}

{{s1.p8}}

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

{{s1.p9}}

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

{{s1.p10}}
{{s1.p11}}
{{s1.p12}}
{{s1.p13}}
{{s1.p14}}

{{s1.p15}}
{{s1.p16}}

{{s1.p17}}

{{s1.p18}}
{{s1.p19}}

__________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

{{s2.p3}}

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

{{s2.p10}}

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

{{s2.p11}}

~~~console
568
Promise {<pending>}
569
570
Hello, baby
~~~

{{s2.p12}}

{{s2.p13}}

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

{{s2.p14}}

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

{{s2.p15}}

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~

{{s2.p16}}

~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

{{s2.p17}}

{{s2.p18}}
{{s2.p19}}
{{s2.p20}}
{{s2.p21}}

_________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}
{{s3.p4}}
{{s3.p5}}

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

{{s3.p6}}

~~~js
const resolve = response => console.log(response)
~~~

{{s3.p7}}

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

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

{{s3.p11}}

__________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

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

{{s4.p2}}

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

_________________________________

{{s4.p3}}

{{s4.p4}}
{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

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

{{s4.p8}}

{{s4.p9}}

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

{{s4.p10}}

{{s4.p11}}

~~~js
const resolve = response => console.log(response)
const reject = error => console.warn(error)
~~~

{{s4.p12}}

{{s4.p13}}

~~~js
getLogin().then(resolve, reject)
~~~

{{s4.p14}}

_____________________

{{s4.p15}}


{{s4.p16}}

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
{{s4.p17}}
