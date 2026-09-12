# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

~~~js
const worker = new Worker('worker.js')
~~~

{{s1.p4}}
{{s1.p5}}

{{s1.p6}}
{{s1.p7}}
{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

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

{{s1.p11}}
{{s1.p12}}

{{s1.p13}}

__________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
~~~js
onmessage = async function (event) {
  console.log(event.data)
}
~~~

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
~~~js
postMessage('message from worker to script')
~~~

{{s3.p3}}

{{s3.p4}}
~~~js
worker.postMessage('message from script to worker')
~~~

______________________________________________________________

{{s3.p5}}

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

{{s3.p6}}
~~~js
const messages = []

onmessage = async function( event ) {
  postMessage('Worker has received a message from main script')
  messages.push(event.data)
  postMessage(`Worker's messages collection: ${...messages}`)
}
~~~

{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

{{{web-worker-sample-1.js}}}
__________________________________________

{{s3.p11}}

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

{{s3.p12}}
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

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}
{{s4.p3}}

{{s4.p4}}
~~~js
self.importScripts('https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js')

onmessage = function (event) {
  postMessage(Sha256.hash(event.data))
}
~~~

{{s4.p5}}
{{s4.p6}}

{{{web-worker-sample-3.js}}}
___________________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

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
