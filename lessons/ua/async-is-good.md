## ![ico-25 icon] Обіцянки

Виклик асинхронної функції повертає екземпляр **~Promise~**.

Давайте згадаємо деякі цінні властивості екземплярів **~Promise~**.

Насамперед зручно, що якщо екземпляр **~Promise~** переходить у стан **~fulfilled~**, то зовсім не обов'язково відразу забирати результат.
Можна покласти нашу «магічну коробку» на поличку:

~~~js
const promise = sayHello()
~~~

@@@@
![](illustrations/promise-tin.svg)
і «відкрити» її (як консервну банку) тоді, коли нам буде зручно!<br><br>Тим більше, що «відкривачка» - метод **~then()~** - завжди при ній.<br><br>Екземпляр **~Promise~** - надійна консервна банка, у якій вміст не зіпсується і не зникне.<br>Головне - не втратити посилання на цю банку.
@@@@

Що ще робить екземпляри **~Promise~** такими зручними для нас?

@@@@
Екземпляр **~Promise~** є **мікротаском**, а для мікротасків існує своя черга, пріоритет якої вищий за пріоритет черги тасків.<br><br>Т. е. поки товсті та неповороткі таски тупо сидітимуть у своїй черзі та чекатимуть, коли «кабінет» (**Call Stack**) звільниться, мікротаски один за одним проскакуватимуть повз них у «кабінет». І поки останній мікротаск із привілейованої черги не пройде через **Call Stack**, таски чекатимуть.
![](illustrations/queue-microtask.svg)
@@@@

Наприклад, внаслідок виконання такого коду:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const sayHello = async () => 'Hello'

console.time('Main thread')

console.log(`Start: ${new Date().getUTCMilliseconds()}`)

sayHello().then( response => console.log(response))

console.log(`Finish: ${new Date().getUTCMilliseconds()}`)

console.timeEnd('Main thread')
~~~

у консолі ми побачимо:

~~~console
Start: 465
Finish: 465
Main thread: 0.279296875ms
Hello
~~~

@@@@
<br>тобто асинхронна функція **~sayHello()~** поводиться дуже скромно:<br>хоча все, що вона робить - просто вітається,<br>але при цьому вона не вламується в робочий потік і не кричить з порога: «Hello»,<br>вона скромно чекає, коли потік завершить свою роботу,<br>після чого ввічливо каже «Hello».<br><br>
![](illustrations/promise-modesty.svg)
@@@@

Але ж усе, що відрізняє її від звичайної функції - це слово **~async~**.
Приберіть це слово, і «Hello» з'явиться між «Start...» і «Finish...»

Чому?

Та тому, що виклик функції **~sayHello()~** повернув обіцянку привітатися, але тоді, коли основному потоку це буде зручно ![ico-20 smile]

__________________________________

## ![ico-25 icon] Більше, ніж просто обіцянка

Іноді буває потрібно впорядкувати виконання кількох асинхронних операцій.

Ми вже можемо вирішити таке завдання за допомогою екземпляра ~Promise~ і ланцюжка викликів методу **~then~**:

◘◘![ico-20 cap] ** 2**◘◘

~~~js
new Promise(resolve => setTimeout(() => resolve('Hello'), 1000))
  .then(response => new Promise(resolve => setTimeout(() => resolve(`${response}, baby`), 1000)))
  .then(response => console.log(response))
~~~

У цьому прикладі через 1 секунду перший екземпляр **~Promise~** резолвиться повідомленням «Hello».
Коли він резолвиться, буде створено новий екземпляр **~Promise~**, який також резолвиться через 1 секунду.
Другий екземпляр **~Promise~** додасть до повідомлення, повернутого першим екземпляром **~Promise~**, рядок «, baby».
У підсумку ланцюжок екземплярів **~Promise~** розрезолвиться через 2 секунди, і в консолі буде ~Hello, baby~.

Давайте трохи змінимо код, щоб відстежувати час.

Для цього оголосимо допоміжну функцію **~setTimer~**:

~~~js
function setTimer (message, callback) {
  console.log(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

Тепер ланцюжок викликів методу **~then~** екземплярів ~Promise~ спроститься, при цьому ми будемо бачити індикацію часу виконання в мілісекундах:

~~~js
new Promise(callback => setTimer('Hello', callback))
  .then(response => new Promise(callback => setTimer(`${response}, baby`, callback)))
  .then(response => setTimer(response, console.log))
~~~

Тепер ми побачимо в консолі щось на кшталт:

~~~console
568
► Promise {&lt;pending>}
569
570
Hello, baby
~~~

Асинхронна функція є альтернативним рішенням.

Оголосимо допоміжну функцію **resolve**:

~~~js
const resolve = response => document.body.innerHTML += `<p>${response}</p>`
~~~

Тепер трохи підправимо код функції **~setTimer~**, замінивши ~console.log~ викликом функції **~resolve~**:

~~~js
function setTimer (message, callback) {
  resolve(new Date().getUTCMilliseconds())
  setTimeout(() => callback(message), 1000)
}
~~~

і оголосимо асинхронну функцію **~sayHello~**:

~~~js
const sayHello = async () => {
  const res = await new Promise(callback => setTimer('Hello', callback))
  return await new Promise(callback => setTimer(`${res}, baby`, callback))
}
~~~

і викличемо її, передавши через метод ~then~ колбек **~resolve~**:

~~~js
sayHello().then(resolve)
~~~

{{{async-is-good-1.js}}}

Що ми бачимо з цього прикладу:

• замість виклику методу **~then~** екземпляра **~Promise~** використано ключове слово **~await~** асинхронної функції;
• код, який слідує після рядка з **~await~**, буде виконано так, начебто цей код виконується в колбеку методу **~then~** попереднього екземпляра **~Promise~**;
• виклик асинхронної функції повертає екземпляр **~Promise~**, тому отримати результат роботи асинхронної функції можна тільки за допомогою методу **~then~**;
• для того, щоб виклик асинхронної функції резолвився результатом, у тілі асинхронної функції має бути оператор **~return~**.

_________________________

### ![ico-20 icon] Диспетчер черг

Асинхронна функція є чудовим організатором черг.
Вона суворо стежить за порядком у черзі мікротасків ![ico-20 smile].

Нехай у нас є функція **~promise~**, яка повертає екземпляр ~Promise~,
при цьому біндить колбеку **~resolve~** перший аргумент, переданий функції **~promise~**.
Другий аргумент функції **~promise~** використовується для встановлення таймера:

~~~js
function promise () {
  return new Promise(resolve => setTimeout(resolve.bind(null, arguments[0]), arguments[1] * 1000))
}
~~~

і функція **~resolve~**:

~~~js
const resolve = response => console.log(response)
~~~

Зробимо три послідовні виклики функції **~promise~**:

~~~js
promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2).then(resolve)
resolve('Finish')
~~~

{{{async-is-good-3-1.js}}}

Як ми бачимо, колбеки повертаються тоді, коли минув час таймера, а не в порядку їхнього виклику.

А тепер вишикуємо їх у чергу за допомогою асинхронної функції **~sigma~**:

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

Тепер вони суворо дотримуються черги ![ico-20 smile]

__________________________________

### ![ico-20 icon] Організатор асинхронних процесів

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

^^Для того, щоб подивитися, які логіни є в базі даних, виконайте в консолі:^^

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(console.log)
~~~

_________________________________

Трохи перепишемо попередній приклад.

Оголосимо функцію **~getInput~**, яка повертатиме екземпляр **~Promise~**.
Функція **~getInput~** отримує як аргумент об'єкт **~users~**, і створює елемент ~input~ для введення логіна користувача.

Анонімна функція, яка передається конструктору **~Promise~**, встановлює обробника події **~onchange~** елемента ~input~,
який викликає або **~resolve~**, або **~reject~** залежно від того, що було введено в поле ~input~
(чи є відповідний користувач у базі даних).

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

Тепер створимо асинхронну функцію **~getLogin~**, яка робитиме запит серверу, отримуватиме дані та викликатиме функцію **~getInput~** з передачею їй отриманих даних:

◘◘![ico-20 file] getLogin◘◘

~~~js
async function getLogin () {
  const users = await (await fetch('https://garevna-rest-api.glitch.me/users/all')).json()

  return await getInput(users)
}
~~~

Залишилося тільки викликати функцію **getLogin**:

◘◘![ico-20 file] Виклик функції getLogin◘◘

~~~js
getLogin().then(console.log, console.error)
~~~

і не забудьте натиснути **Enter** після введення логіна.


^^^[повний код прикладу]
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
[![ico-30 hw] Quiz](quiz/async )
