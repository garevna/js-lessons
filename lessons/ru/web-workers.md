# ![ico-30 study] Web-workers

Фоновые ( параллельные ) потоки в JS эмулируются с помощью worker-ов

Как создать worker-а ?

Как всегда - с помощью конструктора ![ico-20 wink]

~~~js
const worker = new Worker('worker.js')
~~~

Обратите внимание, что конструктору **Worker** мы передаем ссылку на файл скрипта
Скрипт, находящийся в упомянутом файле, и будет запущен параллельно с основным потомком

Поскольку код **worker**-а работает параллельно с основным потоком, он не имеет доступа к DOM
страница ему недоступна...
однако он может выводить сообщения в консоль

И еще он может взаимодействовать с основным потоком, из которого был запущен

Чтобы понять, как он это делает, давайте заглянем в прототип его конструктора

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

Так-с, в нашем (точнее, **worker**-а) распоряжении унаследованные методы **postMessage** и **terminate** (вполне "говорящие" названия)
а также свойства **onmessage** и **onerror**

Так что все предельно просто:

__________________________________________

## ![ico-25 icon] onmessage

• в коде **worker**-а нужно установить обработчика события **_message_**, который будет срабатывать при получении сообщений от главного скрипта
как и все обработчики событий, он получает объект события
у этого события будет свойство **data**, которое и будет содержать присланное основным скриптом сообщение

◘◘worker.js◘◘
~~~js
onmessage = async function (event) {
  console.log(event.data)
}
~~~

## ![ico-25 icon] postMessage

• можно отправить сообщение из **worker**-а скрипту в основном потоке (который запустил **worker**-а)

◘◘worker.js◘◘
~~~js
postMessage('message from worker to script')
~~~

• можно отправить сообщение из основного потока **worker**-у

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

Обратите внимание на очень важный факт:
![ico-20 warn] Мы посылаем **worker**-у массив, а не строку
^^т.е. при обмене данными с **worker**-ом с помощью **postMessage** нам не нужно использовать метод **JSON.stringify**^^
^^поскольку данные циркулируют внутри браузера, а не пересылаются по _http_^^

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

Метод importScripts позволяет импортировать скрипты в тело worker-а

В следующем примере оставим основной скрипт без изменений,
изменим только код worker-а:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
self.importScripts('https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js')

onmessage = function (event) {
  postMessage(Sha256.hash(event.data))
}
~~~

worker импортирует скрипт Sha256, который и использует для генерации дайджеста полученного сообщения
сгенерированный дайджест отправляется назад основному скрипту

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
