# ![ico-30 study] Web-workers⟪Web-workers⟫

Фонові (паралельні) потоки в JS емулюються за допомогою worker-ів

Як створити worker-а?

Як завжди — за допомогою конструктора! [ico-20 wink]

~~~js
const worker = new Worker('worker.js')
~~~

Зверніть увагу, що конструктору **Worker** ми передаємо посилання на файл скрипта
Скрипт, що міститься у згаданому файлі, і буде запущений паралельно з основним потоком

Оскільки код **worker** працює паралельно з основним потоком, він не має доступу до DOM
Сторінка йому недоступна...
Однак він може виводити повідомлення в консоль

І ще він може взаємодіяти з основним потоком, з якого був запущений

Щоб зрозуміти, як він це робить, давайте заглянемо в прототип його конструктора

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
      ► [[Prototype]]: EventTarget
  ► [[Prototype]]: ƒ EventTarget()
[[Scopes]]: Scopes[0]
~~~

Отже, у нашому (точніше, **worker**-а) розпорядженні є успадковані методи **postMessage** та **terminate** (цілком «промовисті» назви)
а також властивості **onmessage** та **onerror**

Тож усе надзвичайно просто:

__________________________________________

## ![ico-25 icon] onmessage⟪onmessage⟫

• у коді **worker**-а потрібно встановити обробник події **_message_**, який спрацьовуватиме при отриманні повідомлень від головного скрипта
як і всі обробники подій, він отримує об’єкт події
ця подія матиме властивість **data**, яка й міститиме повідомлення, надіслане основним скриптом

◘◘worker.js◘◘
~~~js
onmessage = async function (event) {
  console.log(event.data)
}
~~~

## ![ico-25 icon] postMessage⟪postMessage⟫

• можна надіслати повідомлення з **worker**-а скрипту в основному потоці (який запустив **worker**-а)

◘◘worker.js◘◘
~~~js
postMessage('message from worker to script')
~~~

• можна надіслати повідомлення з основного потоку до **worker**

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

Зверніть увагу на дуже важливий факт:
![ico-20 warn] Ми надсилаємо **worker**-у масив, а не рядок
^^Тобто під час обміну даними з **worker** за допомогою **postMessage** нам не потрібно використовувати метод **JSON.stringify**^^
^^Оскільки дані циркулюють усередині браузера, а не надсилаються через _http_^^

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

## ![ico-25 icon] importScripts⟪importScripts⟫

Метод importScripts дозволяє імпортувати скрипти в тіло worker-а

У наступному прикладі залишимо основний скрипт без змін,
змінимо лише код worker-а:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
self.importScripts('https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js')

onmessage = function (event) {
  postMessage(Sha256.hash(event.data))
}
~~~

worker імпортує скрипт Sha256, який і використовує для генерації дайджесту отриманого повідомлення
згенерований дайджест надсилається назад до основного скрипту

{{{web-worker-sample-3.js}}}
___________________________________________________

## ![ico-25 icon] MessageChannel⟪MessageChannel⟫

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
