## ![ico-25 icon] {{p1}}

[![ico-20 link] Event Loop](page/Event-Loop)

{{p2}}

{{p3}}

{{p4}}
{{p5}}

~~~js
const promise = sayHello()
~~~

@@@@
![](illustrations/promise-tin.svg)
{{p6}}
@@@@

{{p7}}

@@@@
{{p8}}
![](illustrations/queue-microtask.svg)
@@@@

{{common.c15}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Finish: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

{{p9}}

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

@@@@
{{p10}}
![](illustrations/promise-modesty.svg)
@@@@

{{p11}}
{{p12}}

{{p13}}

{{p14}}

__________________________________

## ![ico-25 icon] {{p15}}

{{p16}}

{{p17}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

{{p18}}
{{p19}}
{{p20}}
{{p21}}

{{p22}}

{{p23}}

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

{{p24}}

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

{{p25}}

~~~console
568
► Promise {&lt;pending>}
569
570
Hello, baby
~~~

{{p26}}

{{p27}}

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

{{p28}}

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

{{p29}}

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~
{{p30}}
~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

{{p31}}

{{p32}}
{{p33}}
{{p34}}
{{p35}}

_________________________

### ![ico-20 icon] {{p36}}

{{p37}}
{{p38}}

{{p39}}
{{p40}}
{{p41}}

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

{{p42}}

~~~js
const resolve = response => console.log(response)
~~~

{{p43}}

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

{{p44}}

{{p45}}

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

{{p46}}

__________________________________

### ![ico-20 icon] {{p47}}

◘◘![ico-20 cap] ** 4**◘◘

~~~js
async function getLogin (resolve, reject) {
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all')).json()

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

{{p48}}

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all')
  .then(response => response.json())
  .then(console.log)
~~~

_________________________________

{{p49}}

{{p50}}
{{p51}}

{{p52}}
{{p53}}
{{p54}}

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

{{p55}}

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all')).json()

  return await getInput(users)
}
~~~

{{p56}}

{{p57}}

~~~js
getLogin().then(console.log, console.error)
~~~

{{p58}}


^^^[{{p59}}]
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
  const users = await (await fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all')).json()

  return await getInput(users)
}


getLogin().then(console.log, console.error)
~~~
^^^

{{{async-is-good-5.js}}}

_______________________
※※※tests quiz/async※※※
