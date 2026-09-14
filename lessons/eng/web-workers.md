# ![ico-30 study] Web-workers

Background (parallel) threads in JavaScript are emulated using workers

How do you create a worker?

As always – using the constructor! [ico-20 wink]

~~~js
const worker = new Worker('worker.js')
~~~

Note that we pass a reference to the script file to the **Worker** constructor
The script contained in that file will run in parallel with the main thread

As the **worker**’s code runs in parallel with the main thread, it has no access to the DOM
The page is inaccessible to it...
However, it can output messages to the console

It can also interact with the main thread from which it was launched

To understand how it does this, let’s take a look at the prototype of its constructor

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

Right then, we (or rather, the **worker**) have at our disposal the inherited methods **postMessage** and **terminate** (quite ‘self-explanatory’ names)
as well as the properties **onmessage** and **onerror**

So it’s all very simple:

__________________________________________

## ![ico-25 icon] onmessage

• in the **worker**’s code, you need to set up an **_message_** event handler, which will be triggered when messages are received from the main script
Like all event handlers, it receives an event object
This event will have a **data** property, which will contain the message sent by the main script

◘◘worker.js◘◘
~~~js
onmessage = async function (event) {
  console.log(event.data)
}
~~~

## ![ico-25 icon] postMessage

• You can send a message from the **worker** to the script in the main thread (which launched the **worker**)

◘◘worker.js◘◘
~~~js
postMessage('message from worker to script')
~~~

• You can send a message from the main thread to the **worker**

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

Please note a very important point:
![ico-20 warn] We are sending an array to the **worker**, not a string
^^i.e. when exchanging data with a **worker** using **postMessage**, we do not need to use the **JSON.stringify** method^^
^^as the data circulates within the browser rather than being sent via _http_^^

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

The importScripts method allows scripts to be imported into the body of the worker

In the following example, we’ll leave the main script unchanged,
and only modify the worker’s code:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
self.importScripts('https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js')

onmessage = function (event) {
  postMessage(Sha256.hash(event.data))
}
~~~

The worker imports the Sha256 script, which it uses to generate a digest of the received message
The generated digest is sent back to the main script

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
