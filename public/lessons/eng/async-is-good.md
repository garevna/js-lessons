## ![ico-25 icon] Обещания

Вызов асинхронной функции возвращает экземпляр **~Promise~**.

Давайте вспомним некоторые ценные свойства экземпляров **~Promise~**.

В первую очередь удобно, что если экземпляр **~Promise~** переходит в состояние **~fulfilled~**, то вовсе не обязательно сразу забирать результат.
Можно положить нашу "магическую коробку" на полочку:

~~~js
const promise = sayHello()
~~~

@@@@
![](illustrations/promise-tin.svg)
и "открыть" ее (как консервную банку) тогда, **когда нам будет удобно**!<br><br>Тем более, что "открывашка" - метод ~then()~ - всегда при ней.<br><br>Экземпляр **~Promise~** - надежная консервная банка, в которой содержимое не испортится и не исчезнет.<br>Главное - не потерять ссылку на эту банку.
@@@@

Что еще делает экземпляры **~Promise~** такими удобными для нас?

@@@@
Экземпляр **~Promise~** является **микротаском**, а для микротасков существует своя очередь, приоритет которой выше, чем приоритет очереди тасков.<br><br>Т.е. пока толстые и неповоротливые таски будут тупо сидеть в своей очереди и ждать, когда "кабинет" (**Call Stack**) освободится, микротаски один за одним будут проскакивать мимо них в "кабинет". И только когда последний микротаск из привелегированной очереди не пройдет через **Call Stack**, таски будут ждать.
![](illustrations/queue-microtask.svg)
@@@@

Например, в результате выполнения следующего кода:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Finish: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

в консоли мы увидим:

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

@@@@
<br>т.е. асинхронная функция ~sayHello()~ ведет себя очень скромно:<br>хотя все, что она делает - просто здоровается,<br>но при этом она не вламывается в рабочий поток и не орет с порога: "_Hello_",<br>она скромно ждет, когда поток завершит свою работу,<br>после чего вежливо говорит "Hello".<br><br>
![](illustrations/promise-modesty.svg)
@@@@

А ведь все, что отличает ее от обычной функции - это слово **~async~**.
Уберите это слово, и "Hello" появится между "Start..." и "Finish..."

Почему?

Да потому, что вызов функции ~sayHello()~ вернул обещание поздороваться, но тогда, когда основному потоку это будет удобно ![ico-20 smile]

__________________________________

## ![ico-25 icon] Больше, чем просто обещание

Иногда бывает нужно упорядочить выполнение нескольких асинхронных операций.

Мы уже можем решить такую задачу с помощью экземпляра ~Promise~ и цепочки вызовов метода **~then~**:

◘◘![ico-20 cap] ** 2**◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

В этом примере через 1 секунду первый экземпляр ~Promise~ разрезолвится сообщением "Hello".
Когда он разрезолвится, будет создан новый экземпляр ~Promise~, который также разрезолвится через 1 секунду.
Второй экземпляр ~Promise~ добавит к сообщению, возвращенному первым экземпляром ~Promise~, строку ", baby".
В итоге цепочка экземпляров ~Promise~ разрезолвится через 2 секунды, и в консоли будет ~Hello, baby~.

Давайте немного изменим код, чтобы отслеживать время.

Для этого объявим вспомогательную функцию ~setTimer~:

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Теперь цепочка вызовов метода **~then~** экземпляров ~Promise~ упростится, при этом мы будем видеть индикацию времени выполнения в миллисекундах:

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

Теперь мы увидим в консоли нечто вроде:

~~~console
568
► Promise {&lt;pending>}
569
570
Hello, baby
~~~

Асинхронная функция является альтернативным решением.

Объявим вспомогательную функцию **resolve**:

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

Теперь немного подправим код функции **setTimer**, заменив ~console.log~ вызовом функции ~resolve~:

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

• вместо вызова метода **~then~** экземпляра **~Promise~** использовано ключевое слово **~await~** асинхронной функции;
• код, который следует после строки с **~await~**, будет выполнен так, как будто этот код выполняется в колбэке метода **~then~** предыдущего экземпляра **~Promise~**;
• вызов асинхронной функции возвращает экземпляр **~Promise~**, поэтому получить результат работы асинхронной функции можно только с помощью метода **~then~**;
• для того, чтобы вызов асинхронной функции резолвился результатом, в теле асинхронной функции должен быть оператор **~return~**.

_________________________

### ![ico-20 icon] Диспетчер очередей

Асинхронная функция является отличным организатором очередей.
Она строго следит за порядком в очереди микротасков ![ico-20 smile].

Пусть у нас есть функция **~promise~**, которая возвращает экземпляр ~Promise~,
при этом биндит колбэку **~resolve~** первый аргумент, переданный функции **~promise~**.
Второй аргумент функции **~promise~** используется для установки таймера:

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

и функция **~resolve~**:

~~~js
const resolve = response => console.log(response)
~~~

Сделаем три последовательных вызова функции **~promise~**:

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

Как мы видим, колбэки возвращаются тогда, когда истекло время таймера, а не в порядке их вызова.

А теперь выстроим их в очередь с помощью асинхронной функции **~sigma~**:

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

Теперь они строго соблюдают очередь ![ico-20 smile]

__________________________________

### ![ico-20 icon] Организатор асинхронных процессов

◘◘![ico-20 cap] ** 4**◘◘

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
  .then(console.log)
~~~

_________________________________

Немного перепишем предыдущий пример.

Объявим функцию **~getInput~**, которая будет возвращать экземпляр **Promise**.
Функция **~getInput~** получает в качестве аргумента объект **~users~**, и создает элемент ~input~ для ввода логина юзера.

Анонимная функция, которая передается конструктору **Promise**, устанавливает обработчика события ~onchange~ элемента ~input~,
который вызывает либо **~resolve~**, либо **~reject~** в зависимости от того, что было введено в поле ~input~
(есть ли соответствующий юзер в базе данных).

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

Теперь создадим асинхронную функцию **~getLogin~**, которая будет делать запрос серверу, получать данные и вызывать функцию **~getInput~** с передачей ей полученных данных:

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

Осталось только вызвать функцию **getLogin**:

◘◘![ico-20 file] Вызов функции getLogin◘◘

~~~js
getLogin().then(console.log, console.error)
~~~

и не забудьте нажать **Enter** после ввода логина.


^^^[полный код примера]
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


getLogin().then(console.log, console.error)
~~~
^^^

{{{async-is-good-5.js}}}

_______________________
[![ico-30 hw] Тесты](quiz/async )
