# ![ico-30 study] Web-workers

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

~~~js
const worker = new Worker('worker.js')
~~~

{{s0.p4}}
{{s0.p5}}

{{s0.p6}}
{{s0.p7}}
{{s0.p8}}

{{s0.p9}}

{{s0.p10}}

~~~console
▼ ƒ Worker()
    arguments: null
    caller: null
    length: 1
    name: "Worker"
  ▼ prototype: Worker
      ► onerror: (...)
      ► onmessage: (...)
      ► postMessage: ƒ postMessage()
      ► terminate: ƒ terminate()
      ► constructor: ƒ Worker()
        Symbol(Symbol.toStringTag): "Worker"
      ► get onerror: ƒ onerror()
      ► set onerror: ƒ onerror()
      ► get onmessage: ƒ onmessage()
      ► set onmessage: ƒ onmessage()
      ► __proto__: EventTarget
  ► __proto__: ƒ EventTarget()
[[Scopes]]: Scopes[0]
~~~

{{s0.p11}}
{{s0.p12}}

{{s0.p13}}

__________________________________________

## ![ico-25 icon] onmessage

{{s0.p14}}
{{s0.p15}}
{{s0.p16}}

◘◘worker.js◘◘
~~~js
onmessage = async function (event) {
  console.log(event.data)
}
~~~

## ![ico-25 icon] postMessage

{{s0.p17}}

◘◘worker.js◘◘
~~~js
postMessage('message from worker to script')
~~~

{{s0.p18}}

◘◘script.js◘◘
~~~js
worker.postMessage('message from script to worker')
~~~

______________________________________________________________

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const worker = new Worker('src/web-worker.js')

worker.onmessage = function (event) {
  document.body
    .appendChild(document.createElement('p'))
    .innerText = `Message from worker: ${event.data}`
}

const button = document.body
  .appendChild(document.createElement('button'))

button.innerText = 'Send message'
button.counter = (function () {
  const count = 'A'.charCodeAt(0) - 1
  return () => String.fromCharCode(++count)
})()

button.onclick = function ( event ) {
  worker.postMessage(event.target.counter())
}
~~~

◘◘worker.js◘◘
~~~js
const messages = []

onmessage = async function( event ) {
  postMessage('Worker has received a message from main script')
  messages.push(event.data)
  postMessage(`Worker's messages collection: ${...messages}`)
}
~~~

{{s0.p19}}
{{s0.p20}}
{{s0.p21}}
{{s0.p22}}

{{{web-worker-sample-1.js}}}
__________________________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const p = document.body.appendChild(document.createElement('p'))

const worker = new Worker('src/web-worker.js')

worker.onmessage = function (event) {
  p.innerHTML = event.data
}

section.appendChild(document.createElement('input'))
  .oninput = function (event) {
    worker.postMessage(event.target.value)
  }
~~~

◘◘web-worker.js◘◘
~~~js
const getHex = () => (Math.max(120, Math.round(Math.random() * 255))).toString(16)

const getColor = () => '#' + getHex() + getHex() + getHex()

const colorMessage = message => message.split('')
  .map(letter => `<span style="color:${getColor()}">${letter}</span>`)
  .join('')

onmessage = function (event) {
  postMessage(colorMessage(event.data))
}
~~~

{{{web-worker-sample-2.js}}}
___________________________________________________

## ![ico-25 icon] importScripts

{{s0.p23}}

{{s0.p24}}
{{s0.p25}}

◘◘![ico-25 cap] ** 3**◘◘
~~~js
self.importScripts('https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js')

onmessage = function (event) {
  postMessage(Sha256.hash(event.data))
}
~~~

{{s0.p26}}
{{s0.p27}}

{{{web-worker-sample-3.js}}}
___________________________________________________

## ![ico-25 icon] MessageChannel

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const section = document.body

function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = event => resolve(event.data)
    port1.postMessage(obj)
  })
}

const user = {
  name: 'Ivan',
  family: {
    mother: {
      name: 'Mary',
      age: 41,
      speciality: 'developer'
    },
    father: {
      name: 'Stephan',
      age: 43,
      speciality: 'engineer'
    },
    brother: {
      name: 'Jeck',
      age: 16,
      speciality: 'student'
    }
  }
}
structuralClone(user)
  .then(response => section.innerText = JSON.stringify(response))

~~~

{{{web-workers-clone.js}}}
