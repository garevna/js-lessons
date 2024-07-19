## ![ico-25 icon] Обещания


Вызов асинхронной функции возвращает промис (обещание)

Давайте вспомним, чем хороши обещания в JS?
В первую очередь тем, что если обещание выполнено, то вовсе не обязательно сразу забирать обещанное
Можно положить обещание на полочку:

~~~js
const promise = sayHello ()
~~~

@@@@

![](illustrations/tin.jpg)
и "открыть" обещание ( банку _promise_ ) тогда, **когда нам будет удобно**! Тем более, что "открывашка" - метод ~then()~ - всегда при нем. Промис - надежная консервная банка, в которой содержимое не испортится и не исчезнет

@@@@

@@@@ 3
![](illustrations/modesty.png)
Еще что хорошего в обещании? - его скромность. Promise никогда не прервет работу основного потока. Никогда не влезет без очереди в Call Stack.
![](illustrations/promise-in-queue.png)

@@@@

![ico-25 cap] **Пример 1**

Например, в результате выполнения следующего кода:

~~~js
const sayHello = async () => 'Hello'

console.time('Основной поток')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Основной поток')
~~~

в консольке мы увидим:

~~~console
Start: 465
Finish: 465
Основной поток: 0.279296875ms
Hello
~~~

т.е. асинхронная функция ~sayHello()~ ведет себя очень скромно:
хотя все, что она делает - просто здоровается,
но при этом она не вламывается в рабочий поток и не орет с порога: "_Hello_"
она скромно ждет, когда поток завершит свою работу,
после чего вежливо говорит "Hello"

а ведь все, что отличает ее от обычной функции - это слово **~async~**
уберите это слово, и "Hello" появится между "Start..." и "Finish..."

Так в чем же дело?

В том, что вызов функции ~sayHello()~ вернул обещание поздороваться,
но тогда, когда основному потоку это будет удобно ![ico-20 smile]

__________________________________

## ![ico-25 icon] Больше, чем просто обещание

Иногда бывает нужно упорядочить выполнение нескольких асинхронных операций

Мы уже можем решить такую задачу с помощью промиса и цепочки вызовов метода **~then~**:

◘◘![ico-20 cap] Пример 2◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

В этом примере через 1 секунду первый промис разрезолвится сообщением "Hello"
когда он разрезолвится, будет создан новый промис, который также разрезолвится через 1 секунду
второй промис добавит к сообщению, возвращенному первым промисом, строку ", baby"
В итоге цепочка промисов разрезолвится через 2 секунды, и в консоли будет ~Hello, baby~

Давайте немного изменим код, чтобы отслеживать время

Для этого объявим вспомогательную функцию ~setTimer~:

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Теперь цепочка промисов упростится, при этом мы будем видеть индикацию времени выполнения в миллисекундах:

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

Теперь мы увидим в консоли нечто вроде:

~~~console
568
Promise {<pending>}
569
570
Hello, baby
~~~

Однако асинхронная функция является альтернативным решением

Объявим вспомогательную функцию **resolve**:

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

немного исправим код функции **setTimer**, заменив ~console.log~ вызовом функции ~resolve~:

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

и теперь объявим асинхронную функцию **sayHello**:

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~
и вызовем ее, передав через метод ~then~ колбэк **~resolve~**:
~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

Что мы видим из этого примера:

• вместо вызова метода **~then~** промиса использовано ключевое слово **~await~** асинхронной функции
• код, который следует после строки с **~await~**, будет выполнен так, как будто этот код выполняется в колбэке метода **~then~** предыдущего промиса
• вызов асинхронной функции возвращает промис, поэтому получить результат работы асинхронной функции можно только с помощью метода **~then~**
• для того, чтобы вызов асинхронной функции резолвился результатом, в теле асинхронной функции должен быть оператор **~return~**

_________________________

### ![ico-20 icon] Диспетчер очередей

Асинхрронная функция является отличным организатором очередей
Она строго следит за тем, чтобы никто не влез без очереди в Call Stack ![ico-20 smile]

Пусть у нас есть функция **promise**, которая возвращает промис,
при этом биндит колбэку **resolve** первый аргумент, переданный функции **promise**
Второй аргумент функции **promise** используется для установки таймера:

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

и функция **resolve**:

~~~js
const resolve = response => console.log(response)
~~~

Сделаем три последовательных вызова функции **promise**:

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

Как мы видим, колбэки возвращаются тогда, когда истекло время таймера,
а не в порядке их вызова

А теперь выстроим их в очередь с помощью асинхронной функции **sigma**

◘◘![ico-20 cap] Пример 3◘◘

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

Теперь они строго соблюдают очередь ![ico-20 smile]

__________________________________

### ![ico-20 icon] Организатор асинхронных процессов

◘◘![ico-20 cap] Пример 4◘◘

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

^^Для того, чтобы посмотреть, какие логины есть в базе данных, выполните в консоли:^^

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

_________________________________

Немного перепишем предыдущий пример

Объявим функцию **getInput**, которая будет возвращать **_промис_**
Функция **getInput** получает в качестве аргумента объект **users**, и создает элемент ~input~ для ввода логина юзера

Анонимная функция, которая передается конструктору **Promise**, устанавливает обработчика события ~onchange~ элемента ~input~, который вызывает либо **~resolve~**, либо **~reject~**
в зависимости от того, что было введено в поле ~input~ ( есть ли соответствующий юзер в базе данных )

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

Теперь создадим асинхронную функцию **getLogin**, которая будет делать запрос серверу, получать данные и вызывать функцию **getInput** с передачей ей полученных данных

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

Создадим еще две вспомогательные функции:

◘◘![ico-20 file] resolve & reject◘◘

~~~js
const resolve = response => console.log(response)
const reject = error => console.warn(error)
~~~

Осталось только вызвать функцию **getLogin**:

◘◘![ico-20 file] Вызов функции getLogin◘◘

~~~js
getLogin().then(resolve, reject)
~~~

и не забудьте нажать Enter после ввода логина

_____________________

Итак, полный код примера:


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
[![ico-30 hw] Тесты](quiz/async )
