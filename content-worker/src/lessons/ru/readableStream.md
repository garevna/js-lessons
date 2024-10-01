# ![ico-30 study] Streams API

обеспечивает фрагментированный доступ из JS к данным, представляющим собой потенциально неограниченный поток байт

^^Считывание больших объемов данных одним "куском" ( или чанком ) приводит к чрезмерному расходу памяти памяти как на стороне клиента, так и на стороне сервера^^
^^Если же объем считываемой информации в принципе не ограничен, то есть речь не идет о пересылке конкретного файла клиенту, а происходит процесс непрерывной подзагрузки данных, то для организации такого процесса необходимо дробить поток данных на отдельные куски ( chunks ) и управлять очередностью их получения ( на стороне клиента ) и передачи ( на стороне сервера )^^
^^Для организации работы кода с потоками данных используется Streams API^^
^^Streams API предоставляет коду ряд интерфейсов ( сервисов ), с помощью которых можно создавать потоки и управлять процессом потоковой передачи данных^^

[![ico-20 link] MDN](https://developer.mozilla.org/ru/docs/Web/API/Streams_API)

____________________________________________________

## ![ico-25 icon] Интерфейсы Streams API

К основным интерфейсам **Streams API** относятся

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

**Конструктор**

Создает экземпляры класса **ReadableStream**

Получает в качестве аргументов функции, которые задают функциональность потока:

^^• cancel()^^
^^• getReader()^^
^^• pipeThrough()^^
^^• pipeTo()^^
^^• tee()^^

**Конструктор ~ReadableStream~**

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
      ► __proto__: Object
  ► __proto__: ƒ ()
~~~~

Конструктор принимает в качестве аргумента объект

~~~js
const textStream = new ReadableStream({
    ...
})
~~~

Свойства этого объекта определяют модель потока

Первое свойство - **~start()~** - это метод, который вызывается единожды при создании потока и определяет его функциональность

Метод ~start()~ имеет обязательный формальный параметр - объект **контроллера**

![ico-25 cap] ** 1**

^^Посмотрим в консоли на объект **контроллера**^^

~~~js
const textStream = new ReadableStream({
  start (controller) {
    console.dir(controller)
  }
})
~~~

^^**Контроллер** имеет встроенные методы для управления состоянием потока и очередью ( ~queue~ ) внутри него^^

~~~~ReadableStreamDefaultController
▼ ReadableStreamDefaultController
    desiredSize: (...)
  ▼ __proto__:
      ► close: ƒ close()
      ► constructor: ƒ ReadableStreamDefaultController()
        desiredSize: (...)
      ► enqueue: ƒ enqueue()
      ► error: ƒ error()
      ► get desiredSize: ƒ desiredSize()
      ► __proto__: Object
~~~~

^^Метод **~enqueue()~** помещает переданный ему аргументом фрагмент данных ( ~chunk~ ) в управляемый контроллером поток^^

________________________________________

![ico-25 cap] ** 2**

^^С помощью конструктора **~ReadableStream~** создадим экземпляр **_~textStream~_**^^
^^Передадим конструктору объект с методом ~start()~^^
^^В методе ~start()~ объявим массив сообщений, которые и будут чанками потока^^
^^Далее запустим цикл, который поочередно будет помещать сообщения в контролиремый поток с помощью метода **~enqueue()~** контроллера потока^^
^^По завершении передачи данных вызовем метод ~close()~ контроллера потока^^

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

^^Выведем в консоль созданный нами объект **~textStream~**^^

~~~~textStream
▼ ReadableStream {locked: false}
    locked: false
  ▼ __proto__: ReadableStream
      ► cancel: ƒ cancel()
      ► constructor: ƒ ReadableStream()
      ► getReader: ƒ getReader()
        locked: (...)
      ► pipeThrough: ƒ pipeThrough()
      ► pipeTo: ƒ pipeTo()
      ► tee: ƒ tee()
        Symbol(Symbol.toStringTag): "ReadableStream"
      ► get locked: ƒ locked()
      ► __proto__: Object
~~~~

^^Обратите внимание, что этого объекта есть унаследованный метод **~getReader~**^^
^^Он нам понадобится для организации чтения данных из потока^^
^^Метод **~getReader~** возвращает объект^^
^^Посмотрим на этот объект в консоли:^^

~~~js
const reader = textStream.getReader()

console.log(reader)
~~~

^^В консоли мы видим, что:^^
^^• объект **~reader~** является экземпляром класса **ReadableStreamDefaultReader**^^
^^• у него есть унаследованный метод **~read()~**:^^

~~~~ReadableStreamDefaultReader
▼ ReadableStreamDefaultReader {}
    closed: (...)
  ▼ __proto__:
      ► cancel: ƒ cancel()
        closed: (...)
      ► constructor: ƒ ReadableStreamDefaultReader()
      ► read: ƒ read()
      ► releaseLock: ƒ releaseLock()
      ► get closed: ƒ closed()
      ► __proto__: Object
~~~~

^^Посмотрим, что возвращает метод **_~read()~_** объекта **~reader~**^^

~~~js
console.log(reader.read())  // ► Promise {<resolved>: {…}}
~~~

^^Итак, мы знаем все, что нам нужно: метод **_~read()~_** объекта **~reader~** возвращает промис^^
^^Теперь можно организовать чтение потока **~textStream~**^^

^^Создадим контейнер **~messageBox~** для вывода текста получаемых сообщений на страницу и добавим ему метод **_~putChank~_**, который получает очередной фрагмент потока и помещает его в контейнер:^^

~~~~js
const messageBox = document.body
  .appendChild(document.createElement('section'))

messageBox.putChank = function (chank) {
    this.appendChild(document.createElement('p'))
      .textContent = chank
}
~~~~

^^Для считывания данных из потока объявим функцию **~readStream~**^^
^^Функция **~readStream~** будет получать два аргумента: ссылку на поток и ссылку на контейнер для вывода данных^^
^^Используем метод **~getReader()~** объекта класса ~ReadableStream~^^
^^Этот метод вызвращает объект^^

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

^^Недостаток: В этом случае вложенные вызовы могут привести к переполнению стека^^

[![ico-70 youtube]](https://youtu.be/hZJByg_KcX4)

^^Однако если использовать асинхронную функцию для чтения данных из потока:^^

~~~js
async function readStream (stream, container) {
  const reader = stream.getReader()
  do {
    var { done, value } = await reader.read()
    container.putChank(done ? '' : value)
  } while (!done)
}
~~~

^^то вложенных вызовов не будет, и переполнение стека нам не грозит, в чем можно убедиться на видео^^

[![ico-70 youtube]](https://youtu.be/OJOOBgqbsmk)

_______________________________________________

![ico-25 cap] ** 3**

^^Создадим поток **~stream~**, который заполняется ссылками на аватарки юзеров гитхаба^^

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

^^Объявим асинхронную функцию для чтения данных из потока:^^

~~~~js
async function readStream (stream, container) {
  const reader = stream.getReader()
  do {
    var { done, value } = await reader.read()
    !done && container.pushUser(value)
  } while (!done)
}
~~~~

^^Создадим контейнер для вывода аватарок:^^

~~~~js
const avatars = document.body
  .appendChild(document.createElement('section'))

avatars.pushUser = function (chank) {
  this.appendChild(document.createElement('img')).src = chank
}
~~~~

^^Осталось только вызвать readStream ():^^

~~~js
readStream(stream, avatars)
~~~

____________________________________________

## ![ico-25 icon] fetch

Метод fetch возвращает промис, который резолвится объектом класса **~Response~**, свойство **_~body~_** которого является объектом класса **~ReadableStream~**

![ico-25 cap] ** 4**

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => console.log(response.body))
~~~

^^^[Результат]

~~~console
▼ ReadableStream {}
    locked: (...)
  ▼ __proto__:
      ► cancel: ƒ cancel()
      ► constructor: ƒ ReadableStream()
      ► getReader: ƒ getReader()
        locked: (...)
      ► pipeThrough: ƒ pipeThrough()
      ► pipeTo: ƒ pipeTo()
      ► tee: ƒ tee()
      ► get locked: ƒ locked()
      ► __proto__: Object
~~~

^^^

Мы можем использовать метод **_~getReader~_** для получения дефолтного ридера этого объекта

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => console.log(response.body.getReader()))
~~~

^^^[Результат]

~~~console
▼ ReadableStreamDefaultReader {}
    closed: (...)
  ▼ __proto__:
      ► cancel: ƒ cancel()
        closed: (...)
      ► constructor: ƒ ReadableStreamDefaultReader()
      ► read: ƒ read()
      ► releaseLock: ƒ releaseLock()
      ► get closed: ƒ closed()
      ► __proto__: Object
~~~

^^^

Мы уже знаем, что метод **_~read()~_** объекта _~ReadableStreamDefaultReader~_ возвращает промис

~~~js
fetch('http://ptsv2.com/t/garevna/d/980001/json')
  .then(response => response.body.getReader().read())
  .then(response => console.log(response))
~~~

^^^[Результат]

~~~console
▼ {value: Uint8Array(1401), done: false}
    done: false
  ► value: Uint8Array(1401) [123, 34, 84, 105, 109, 101, 115, 116, 97, 109, 112, 34, 58, 34, 50, 48, 49, 56, 45, 49, 48, 45, 50, 52, 84, 48, 55, 58, 48, 52, 58, 49, 56, 46, 48, 57, 51, 49, 90, 34, 44, 34, 77, 101, 116, 104, 111, 100, 34, 58, 34, 80, 79, 83, 84, 34, 44, 34, 82, 101, 109, 111, 116, 101, 65, 100, 100, 114, 34, 58, 34, 49, 56, 53, 46, 51, 56, 46, 50, 49, 55, 46, 54, 57, 34, 44, 34, 73, 68, 34, 58, 57, 56, 48, 48, 48, 49, 44, 34, 72, …]
  ► __proto__: Object
~~~

^^^

По дефолту этот промис разрезолвится объектом класса **~ArrayBuffer~**

**~ArrayBuffer~** - это конструктор, поэтому мы можем и сами создавать экземпляры класса **~ArrayBuffer~**

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

^^^[Результат]

~~~console
ArrayBuffer(1401) {0: 123, 1: 34, 2: 84, 3: 105, 4: 109, 5: 101, 6: 115, 7: 116, 8: 97, 9: 109, 10: 112, 11: 34, 12: 58, 13: 34, 14: 50, 15: 48, 16: 49, 17: 56, 18: 45, 19: 49, 20: 48, 21: 45, 22: 50, 23: 52, 24: 84, 25: 48, 26: 55, 27: 58, 28: 48, 29: 52, 30: 58, 31: 49, 32: 56, 33: 46, 34: 48, 35: 57, 36: 51, 37: 49, 38: 90, 39: 34, 40: 44, 41: 34, 42: 77, 43: 101, 44: 116, 45: 104, 46: 111, 47: 100, 48: 34, 49: 58, 50: 34, 51: 80, 52: 79, 53: 83, 54: 84, 55: 34, 56: 44, 57: 34, 58: 82, 59: 101, 60: 109, 61: 111, 62: 116, 63: 101, 64: 65, 65: 100, 66: 100, 67: 114, 68: 34, 69: 58, 70: 34, 71: 49, 72: 56, 73: 53, 74: 46, 75: 51, 76: 56, 77: 46, 78: 50, 79: 49, 80: 55, 81: 46, 82: 54, 83: 57, 84: 34, 85: 44, 86: 34, 87: 73, 88: 68, 89: 34, 90: 58, 91: 57, 92: 56, 93: 48, 94: 48, 95: 48, 96: 49, 97: 44, 98: 34, 99: 72, …}
~~~

^^^

Объект класса **~ArrayBuffer~** всегда можно превратить в экземпляр класса **~Blob~**

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

^^^[Результат]

~~~console
▼ Blob(1401) {size: 1401, type: ""}
    size: 1401
    type: ""
    __proto__: Blob
~~~

^^^

поскольку **~Blob~** - это тоже конструктор:

~~~~js
const blob = new Blob(['body { background-color: #dde; }' ], { type: 'text/css' })
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = window.URL.createObjectURL(blob)
document.body.appendChild(link)
~~~~
