# ![ico-30 study] Streams API

{{p1}}

{{p2}}
{{p3}}
{{p4}}
{{p5}}

[![ico-20 link] MDN](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

____________________________________________________

## ![ico-25 icon] {{p6}}

{{p7}}

^^^[Readable Streams]
![ico-20 green-ok] ReadableStream
![ico-20 green-ok] ReadableStreamDefaultReader
![ico-20 green-ok] ReadableStreamDefaultController
^^^
^^^[Writable streams]
![ico-20 green-ok] WritableStream
![ico-20 green-ok] WritableStreamDefaultWriter
![ico-20 green-ok] WritableStreamDefaultController
^^^

### ![ico-20 icon] ReadableStream

**{{common.c7}}**

{{p8}}

{{p9}}

^^• cancel()^^
^^• getReader()^^
^^• pipeThrough()^^
^^• pipeTo()^^
^^• tee()^^

{{p10}}

~~~~ReadableStream
▼ ƒ ReadableStream
    arguments: (...)
    caller: (...)
    length: 0
    name: "ReadableStream"
  ▼ prototype:
      ► cancel: ƒ cancel()
      ► constructor: ƒ ReadableStream()
      ► getReader: ƒ getReader()
        locked: (...)
      ► pipeThrough: ƒ pipeThrough()
      ► pipeTo: ƒ pipeTo()
      ► tee: ƒ tee()
      ► get locked: ƒ locked()
      ► [[Prototype]]: Object
  ► [[Prototype]]: ƒ ()
~~~~

{{p11}}

~~~js
const textStream = new ReadableStream({
    ...
})
~~~

{{p12}}

{{p13}}

{{p14}}

![ico-25 cap] ** 1**

{{p15}}

~~~js
const textStream = new ReadableStream({
  start (controller) {
    console.dir(controller)
  }
})
~~~

{{p16}}

~~~~ReadableStreamDefaultController
▼ ReadableStreamDefaultController
    desiredSize: (...)
  ▼ [[Prototype]]:
      ► close: ƒ close()
      ► constructor: ƒ ReadableStreamDefaultController()
        desiredSize: (...)
      ► enqueue: ƒ enqueue()
      ► error: ƒ error()
      ► get desiredSize: ƒ desiredSize()
      ► [[Prototype]]: Object
~~~~

{{p17}}

________________________________________

![ico-25 cap] ** 2**

{{p18}}
{{p19}}
{{p20}}
{{p21}}
{{p22}}

~~~~js
const textStream = new ReadableStream({
  start (controller) {
    const messages = [
      'How do you use the Streams API’s readable stream functionality?',
      'The Fetch API allows you to fetch resources across the network',
      'The body property is a simple getter exposing the body contents as a readable stream',
      'You can consume Fetch Body objects as streams and create your own custom readable streams',
      'The ReadableStream interface of the Streams API represents a readable stream of byte data'
    ]
    while (messages.length) {
      controller.enqueue(messages.shift())
    }
    controller.close()
  }
})
~~~~

{{p23}}

~~~~textStream
▼ ReadableStream {locked: false}
    locked: false
  ▼ [[Prototype]]: ReadableStream
      ► cancel: ƒ cancel()
      ► constructor: ƒ ReadableStream()
      ► getReader: ƒ getReader()
        locked: (...)
      ► pipeThrough: ƒ pipeThrough()
      ► pipeTo: ƒ pipeTo()
      ► tee: ƒ tee()
        Symbol(Symbol.toStringTag): "ReadableStream"
      ► get locked: ƒ locked()
      ► [[Prototype]]: Object
~~~~

{{p24}}
{{p25}}
{{p26}}
{{p27}}

~~~js
const reader = textStream.getReader()

console.log(reader)
~~~

{{p28}}
{{p29}}
{{p30}}

~~~~ReadableStreamDefaultReader
▼ ReadableStreamDefaultReader {}
    closed: (...)
  ▼ [[Prototype]]:
      ► cancel: ƒ cancel()
        closed: (...)
      ► constructor: ƒ ReadableStreamDefaultReader()
      ► read: ƒ read()
      ► releaseLock: ƒ releaseLock()
      ► get closed: ƒ closed()
      ► [[Prototype]]: Object
~~~~

{{p31}}

~~~js
console.log(reader.read())  // ► Promise {<resolved>: {…}}
~~~

{{p32}}
{{p33}}

{{p34}}

~~~~js
const messageBox = document.body
  .appendChild(document.createElement('section'))

messageBox.putChank = function (chank) {
    this.appendChild(document.createElement('p'))
      .textContent = chank
}
~~~~

{{p35}}
{{p36}}
{{p37}}
{{p38}}

~~~~js
function readStream (stream, container) {
  const reader = stream.getReader()
  reader
    .read()
    .then(function getChank ({ done, value }) {
      if (done) return
      container.putChank(value)
      return reader.read().then(getChank)
    })
}
~~~~

{{p39}}

[![ico-70 youtube]](https://youtu.be/hZJByg_KcX4)

{{p40}}

~~~js
async function readStream (stream, container) {
  const reader = stream.getReader()
  do {
    var { done, value } = await reader.read()
    container.putChank(done ? '' : value)
  } while (!done)
}
~~~

{{p41}}

[![ico-70 youtube]](https://youtu.be/OJOOBgqbsmk)

_______________________________________________

![ico-25 cap] ** 3**

{{p42}}

~~~~js
const stream = new ReadableStream({
  start (controller) {
    let num = 70, end = 80
    while (num < end) {
      fetch(`https://api.github.com/users/${num++}`)
        .then(response => response.json())
        .then(user => controller.enqueue(user.avatar_url))
    }
  }
})
~~~~

{{p43}}

~~~~js
async function readStream (stream, container) {
  const reader = stream.getReader()
  do {
    var { done, value } = await reader.read()
    !done && container.pushUser(value)
  } while (!done)
}
~~~~

{{p44}}

~~~~js
const avatars = document.body
  .appendChild(document.createElement('section'))

avatars.pushUser = function (chank) {
  this.appendChild(document.createElement('img')).src = chank
}
~~~~

{{p45}}

~~~js
readStream(stream, avatars)
~~~

____________________________________________

## ![ico-25 icon] fetch

{{p46}}

![ico-25 cap] ** 4**

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => console.log(response.body))
~~~

^^^[{{common.c1}}]

~~~console
▼ ReadableStream {}
    locked: (...)
  ▼ [[Prototype]]:
      ► cancel: ƒ cancel()
      ► constructor: ƒ ReadableStream()
      ► getReader: ƒ getReader()
        locked: (...)
      ► pipeThrough: ƒ pipeThrough()
      ► pipeTo: ƒ pipeTo()
      ► tee: ƒ tee()
      ► get locked: ƒ locked()
      ► [[Prototype]]: Object
~~~

^^^

{{p47}}

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => console.log(response.body.getReader()))
~~~

^^^[{{common.c1}}]

~~~console
▼ ReadableStreamDefaultReader {}
    closed: (...)
  ▼ [[Prototype]]:
      ► cancel: ƒ cancel()
        closed: (...)
      ► constructor: ƒ ReadableStreamDefaultReader()
      ► read: ƒ read()
      ► releaseLock: ƒ releaseLock()
      ► get closed: ƒ closed()
      ► [[Prototype]]: Object
~~~

^^^

{{p48}}

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => response.body.getReader().read())
  .then(response => console.log(response))
~~~

^^^[{{common.c1}}]

~~~console
▼ {value: Uint8Array(1401), done: false}
    done: false
  ► value: Uint8Array(1401) [123, 34, 84, 105, 109, 101, 115, 116, 97, 109, 112, 34, 58, 34, 50, 48, 49, 56, 45, 49, 48, 45, 50, 52, 84, 48, 55, 58, 48, 52, 58, 49, 56, 46, 48, 57, 51, 49, 90, 34, 44, 34, 77, 101, 116, 104, 111, 100, 34, 58, 34, 80, 79, 83, 84, 34, 44, 34, 82, 101, 109, 111, 116, 101, 65, 100, 100, 114, 34, 58, 34, 49, 56, 53, 46, 51, 56, 46, 50, 49, 55, 46, 54, 57, 34, 44, 34, 73, 68, 34, 58, 57, 56, 48, 48, 48, 49, 44, 34, 72, …]
  ► [[Prototype]]: Object
~~~

^^^

{{p49}}

{{p50}}

~~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => response.body.getReader().read())
  .then(response => {
    const buffer = new ArrayBuffer(response.value.length)
    response.value
      .forEach((val, index) => { buffer[index] = val })
    console.log(buffer)
  }))
~~~~

^^^[{{common.c1}}]

~~~console
ArrayBuffer(1401) {0: 123, 1: 34, 2: 84, 3: 105, 4: 109, 5: 101, 6: 115, 7: 116, 8: 97, 9: 109, 10: 112, 11: 34, 12: 58, 13: 34, 14: 50, 15: 48, 16: 49, 17: 56, 18: 45, 19: 49, 20: 48, 21: 45, 22: 50, 23: 52, 24: 84, 25: 48, 26: 55, 27: 58, 28: 48, 29: 52, 30: 58, 31: 49, 32: 56, 33: 46, 34: 48, 35: 57, 36: 51, 37: 49, 38: 90, 39: 34, 40: 44, 41: 34, 42: 77, 43: 101, 44: 116, 45: 104, 46: 111, 47: 100, 48: 34, 49: 58, 50: 34, 51: 80, 52: 79, 53: 83, 54: 84, 55: 34, 56: 44, 57: 34, 58: 82, 59: 101, 60: 109, 61: 111, 62: 116, 63: 101, 64: 65, 65: 100, 66: 100, 67: 114, 68: 34, 69: 58, 70: 34, 71: 49, 72: 56, 73: 53, 74: 46, 75: 51, 76: 56, 77: 46, 78: 50, 79: 49, 80: 55, 81: 46, 82: 54, 83: 57, 84: 34, 85: 44, 86: 34, 87: 73, 88: 68, 89: 34, 90: 58, 91: 57, 92: 56, 93: 48, 94: 48, 95: 48, 96: 49, 97: 44, 98: 34, 99: 72, …}
~~~

^^^

{{p51}}

~~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => {
    console.log(response.body)
    response.body
      .getReader()
      .read()
        .then(response => {
          const buffer = new ArrayBuffer(response.value.length)
          response.value
            .forEach((val, index) => { buffer[index] = val })
          const blob = new Blob([buffer])
          console.log(blob)
        })
   })
~~~~

^^^[{{common.c1}}]

~~~console
▼ Blob(1401) {size: 1401, type: ""}
    size: 1401
    type: ""
    [[Prototype]]: Blob
~~~

^^^

{{p52}}

~~~~js
const blob = new Blob(['body { background-color: #dde; }' ], { type: 'text/css' })
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = window.URL.createObjectURL(blob)
document.body.appendChild(link)
~~~~
