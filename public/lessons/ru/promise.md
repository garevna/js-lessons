# ![ico-30 study] Promise

__________________________________________________________________________________________

## ![ico-25 icon] callback

^^^[Где живут колбэки ?]

Понятие асинхронности связано с понятием функции обратного вызова (_callback_)

**Колбэки** - обычные функции с необычным вызовом

Т.е. наш скрипт их, как правило, не вызывает

И, тем не менее, они исполняются

Исполняются они асинхронно относительно основного скрипта

Как бы "живут в другом измерении", и в непредсказуемые моменты времени появляются в нашем "измерении"

Функция обратного вызова всегда "привязана" к какому-то событию в браузере

^^• событие может исходить от пользователя (мышь, клавиатура, pointer на сенсорных девайсах...)^^
^^• может быть связано с сервером, поскольку наше приложение запрашивает и отправляет данные^^
^^• кроме того, есть еще таймеры - отдельная песня^^

Все эти события связывает следующее:

• они могут произойти в любое время
• первым об этом узнает браузер - основной "хост" событий
• браузер должен знать, что нужно делать, когда событие произойдет
• для этого и нужны колбэки

Функции являются колбэками, если они не вызываются из основного потока, а "возвращаются" из **~Event Loop~**

^^^

__________________________________________________________________________________________

## ![ico-25 icon] Promise

Зачем нужны промисы ?

Промисы - это способ организации асинхронного кода

Можно сказать больше: это способ создания асинхронного кода

Промисы - это "коробки" для функций

Их особенность в том, что функция внутри промиса исполняется синхронно, 
но вот результат ее работы возращается всегда асинхронно

__________________________________________________________________________________________

### ![ico-20 icon] Конструктор Promise

Создание экземпляра **~Promise~** - это банальный вызов конструктора

~~~js
const promise = new Promise(...)
~~~

![ico-20 warn] Конструктору передается функция - это обязательно

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

Если вызвать конструктор **~Promise~** без аргумента:

~~~js
const promise = new Promise ()
~~~

![ico-20 err] будет сгенерировано исключение

~~~console
Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-20 icon] Функция-исполнитель

Функция-исполнитель будет вызвана в основном потоке, синхронно, сразу при создании промиса

![ico-20 warn] это не колбэк

это обычная функция

и если ей не передать колбэк-функции, и она нечего не будет вызывать (ввиду отсутствия колбэков), то ничего асинхронного не произойдет

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

Что мы увидим в консоли:

~~~console
Start
Promise starts
End
~~~

То есть асинхронность будет тогда, когда появятся колбэки

__________________________________________________________________________________________

### ![ico-20 icon] Колбэки

Поэтому у функции-исполнителя предусмотрены два формальных параметра - колбэки

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

здесь **~resolve~** и **~reject~** - колбэк-функции

Однако это только формальные параметры...

Но функция внутри промиса уже вызвана...

Почему же не генерируется исключение ?

Рассмотрим простой пример без "обертки" ( промиса )

~~~js
console.log('Start')

const resolve = data => console.log(data)
const reject = err => console.warn(err)

const executor = (resolve, reject) => new Date().getSeconds() > 30 ? resolve('success') : reject(new Error('ups...'))

executor(resolve, reject)

console.log('Finish')
~~~

В консоли:

~~~console
Start
success :)
Finish
~~~

Если бы мы не объявили функции **~resolve~** и **~reject~** до вызова функции **~executor~**, было бы сгенерировано исключение ![ico-20 err] **ReferenceError**

Почему же после "заворачивания" в промис функция, которая запускается сразу и вызывает необъявленный колбэк **~resolve~** или **~reject~**, срабатывает без иключения **ReferenceError** ?

Потому, что вызов колбэков произойдет асинхронно, и никак не раньше того момента, когда мы передадим функции **~executor~** конкретные функции вместо формальных параметов **~resolve~** и **~reject~**

Вопрос - как их передать ?

__________________________________________________________________________________________

### ![ico-20 icon] then | catch

Вот здесь наша "обертка" ( промис ) и пригодится

Потому что у экземпляра ~Promise~ есть методы **_~then~_** и **_~catch~_**

^^Прикольно то, что эти методы возвращают... промис ![ico-20 smile]^^

Эти методы принимают колбэк-функции (и ничего другого)

Этим методам мы и передадим реальные колбэк-функции, которые будут использованы вместо формальных параметров **~resolve~** и **~reject~**

~~~js
const sec = new Date().getSeconds()

new Promise((resolve, reject) => sec > 30 ? resolve(sec) : reject(new Error(`Time is out: ${sec}`)))
  .then(data => console.log(data))
  .catch(err => console.warn(err))
~~~

__________________________________________________________________________________________

### ![ico-20 icon] Ожидание

Давайте помотрим, что произойдет, если мы создадим экземпляр ~Promise~ значительно раньше, чем повесим колбэки с помощью методов **_~then~_** и **_~catch~_**

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

Выждав несколько секунд, выполним код:

~~~js
console.log('Start')
test.then(data => console.log(data, new Date().getSeconds()))

console.log('End')
~~~

В консоли мы увидим что-то вроде:

~~~console
Start
End
Time: 24/ 36
~~~

Т.е. в момент создания промиса **~test~** было 24 секунды, а когда мы добавили колбэки, было уже 36 секунд

Если мы повторим:

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

то мы увидим новое значение после слеша, и так можно "резвиться" до бесконечности ![ico-20 smile]

__________________________________________________________________________________________

Давайте умышленно используем обычные функции, у которых есть объект ~arguments~ и, соответственно, ~arguments.callee~

Пусть все наши функции выводят в консоль свое имя

Так мы сможем увидеть, как они вызываются и отрабатывают

◘◘![ico-25 cap] Пример 1◘◘

~~~js
console.log('Start')

new Promise(function executor (resolve, reject) {
  console.log(arguments.callee.name)
  Math.random() >= 0.5
    ? resolve(arguments.callee.name)
    : reject(new Error(arguments.callee.name))
})
  .then(function resolve(data) {
    console.log(`${arguments.callee.name}: ${data}`)
  })
  .catch(function reject ( err ) {
    console.log(`${arguments.callee.name}: ${err}`)
  })

console.log('End')
~~~

**Результат в случае резолва:**

~~~console
Start
executor
End
resolve: executor
~~~

**Результат в случае реджекта:**

~~~console
Start
executor
End
reject: Error: executor
~~~

Как мы видим, **~executor~** была вызвана сразу при создании промиса

Затем синхронный поток отработал, и вернулся колбэк

В первом случае - **~resolve~**

Во втором - **~reject~**

Каждый из них вывел свое имя и переданные ему данные

Колбэку **~resolve~** было передано имя функции-исполнителя

Колбэку **~reject~** был передан объект ошибки с именем функции-исполнителя

При этом ничего асинхронного в коде функции-исполнителя не было

Однако колбэки отработали асинхронно

__________________________________________________________________________________________

### ![ico-20 icon] Альтернатива catch

В принципе, не обязательно использовать метод **~catch~** для перехвата ошибки

Можно передать второй аргумент (callback) методу **~then~**

~~~js
console.log('Start')

new Promise((resolve, reject) => Math.random() > 0.4 ? resolve({ name: 'Google', type: 'service' }) : reject(new Error('The promise was rejected')))
  .then(data => console.log(data), err => console.warn(err, data))

console.log('End')
~~~

____________________________

Добавим реальной асинхронности:

◘◘![ico-25 cap] Пример 2◘◘

~~~js
const response = { name: 'Google', type: 'service' }
const err = 'The promise was rejected'

function randomResult () {
  return new Promise((resolve, reject) => setTimeout(() => Math.random() > 0.4 ? resolve(response) : reject(new Error(err)), Math.random() * 5000))
}

randomResult()
  .then(data => console.log(data), err => console.warn(err))
~~~

В этом примере мы не только не знаем, что вызовет функция-испольнитель, мы не знаем, когда это произойдет  

_____________________________________

Используем **Battery API**  для получения инфо о зарядке аккумулятора

( метод  **_getBattery()_**  объекта  **navigator** возвращает промис ):

◘◘![ico-25 cap] Пример 3◘◘

~~~js
navigator.getBattery()
  .then(result => {
    for (const prop in result) {
      console.log(`${prop}: ${result[prop]}`)
    }
})
~~~

__________________________________________________________________________________________

## ![ico-25 icon] Promise.all

Супер-удобная штука

Этот метод принимает массив промисов, и возвращает массив ответов тогда, когда все промисы разрезолвятся

~~~js
const promises = [
  new Promise(resolve => setTimeout(() => resolve('Hello'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('Bye'), 3000)),
  new Promise(resolve => setTimeout(() => resolve('How are you?'), 2000))
]

Promise.all(promises)
  .then(response => document.body.innerHTML += `<p>${response}</p>`)
~~~

Плохо то, что если какой-то промис в массиве разреджектится, то слетят все остальные...

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = [
  new Promise(executor),
  new Promise(executor),
  new Promise(executor)
]

Promise.all(promises)
  .then(response => document.body.innerHTML += `<p>${response}</p>`, err => console.warn(err))
~~~


________________________________

| [:::** 4**:::](https://plnkr.co/edit/WpZrRvD1ScHbCN3eUfC8?p=preview) | [:::** 5**:::](https://plnkr.co/edit/BpFFu73mwsXDmZSdVOTn?p=preview) | [:::** 6**:::](https://repl.it/@garevna/promise-sample-1) |

____________________________

Для понимания полезности промисов в нашей асинхронной жизни рассмотрим простенький пример

◘◘![ico-25 cap] Пример 7◘◘

~~~js
console.log('hello')

new Promise(resolve => resolve('Promise successfully resolved'))
  .then(response => console.log(response))

console.log('wait for promise')
~~~

Обратите внимание, что функция, переданная конструктору ~Promise~, отнюдь не асинхронная

Однако, завернув ее в промис, мы убрали ее из основного потока

Она будет выполнена тогда, когда **~Call Stack~** освободится, т.е. все текущие операции в основном потоке завершатся

Это позволяет избежать блокирующих операций

Если какой-то фрагмент кода содежит слишком "тяжеловесные" вычисления или операции, 
которые могут длиться достаточно долго, чтобы заблокировать основной поток - 
заверните такой код в промис, и он "уйдет" в **~Event Loop~**

Почти аналогичного результата можно достичь с помощью таймера с нулевой задержкой:

~~~js
console.log('start')

setTimeout(() => console.log('Time is over'), 0)

console.log('Application finished')
~~~

Однако результат с таймером все-таки отличается от результата с промисом

В первом случае ( с промисом ) приложение не завершает работу, пока промис не вернет результат

В случае с таймером приложение завершит работу к тому моменту, когда колбэк таймера сработает

~~~js
console.log('Start')

setTimeout(() => console.log('Timeout is over'), 0)

const promise = new Promise(resolve => resolve('Promise successfully resolved'))

promise.then(response => console.log(response))

console.log('Finish')
~~~

Запустите этот код в консоли и обратие внимание, что таймер сработает после промиса, хотя промис в коде следует за таймером

~~~console
Start
Finish
Promise successfully rejected
undefined   // выполнение кода основного потока завершено
Timeout is over
~~~

_________________________________________________________________

Обратите внимание, в какой последовательности будут срабатывать колбэки промисов

◘◘![ico-25 cap] Пример 8◘◘

~~~js
console.log('Диалог в чате')

new Promise(resolve => resolve('Привет, тебя как зовут?'))
  .then(response => console.log(response))
  .then(() => console.log('А меня Миша. Ты где живешь?'))
  .then(() => console.log('Во Львове. Ты работаешь или учишся?'))
  .then(() => console.log('Я тоже. Ладно, до связи, удачи!'))

new Promise(resolve => resolve('Привет, Маша, а тебя?'))
    .then(response => console.log(response))
    .then(() => console.log('В Харькове. А ты где?'))
    .then(() => console.log('Учусь, и работаю. А ты?'))
    .then(() => console.log('Спасибо, и тебе'))

console.log('___________________')
~~~

Из этого примера очевидно, что промисы позволяют организовать асинхронное выполнение кода

~~~js
console.log('Диалог в чате')

const first = [
  'Привет, тебя как зовут?',
  'А меня Миша. Ты где живешь?',
  'Во Львове. Ты работаешь или учишся?',
  'Я тоже. Ладно, до связи, удачи!'
]

const second = [
  'Привет, я Маша, а тебя?',
  'В Харькове. А ты где?',
  'Учусь, и работаю. А ты?',
  'Спасибо, и тебе'
]

function output (message, next) {
  console.log(message)
  return next
}

new Promise(resolve => resolve(first[0]))
  .then(response => output(response, first[1]))
  .then(response => output(response, first[2]))
  .then(response => output(response, first[3]))
  .then(response => console.log(response))

new Promise(resolve => resolve(second[0]))
  .then(response => output(response, second[1]))
  .then(response => output(response, second[2]))
  .then(response => output(response, second[3]))
  .then(response => console.log(response))

console.log('___________________')
~~~

_______________________________________________________________________

Синхронизируем во времени выполнение трех функций (последовательно, одна после другой)

◘◘![ico-25 cap] Пример 9◘◘

~~~js
const promise = message => new Promise(resolve => setTimeout(() => resolve(message), Math.random() * 3000))
  .then(resp => console.log(resp))

const first = () => promise('First')
const second = () => promise('Second')
const third = () => promise('Third')

first()
  .then(() => second().then(() => third()))
~~~

______________________________________________________________

◘◘![ico-25 cap] Пример 10◘◘

~~~js
Object.defineProperty(Error.prototype, 'code', {
  get () { return Math.round(Math.random() * 10) }
})

Object.assign(Error.prototype, )

Error.prototype.errorNames = [
  'RandomError',
  'FatalError',
  'Exorcism',
  'FuckingError',
  'Evil',
  'XSS',
  'GameError',
  'UserError',
  'BadError',
  'GoodError'
]


Object.defineProperty(Error.prototype, 'name', {
  get () { return this.errorNames[this.code] }
})

const getRandomResult = () => new Promise((resolve, reject) => Math.random() > 0.5 ? resolve('I win') : reject(new Error('There is no luck in my life...')))

async function testRandom () {
  const result = await getRandomResult()
    .catch(err => { throw new Error(err.message) })

  return result
}

for (let num = 0; num < 10; num++) {
  testRandom()
  .then(result => console.log(result), error => console.warn(error.name, error.code, error.message))
}
~~~

__________________________________________________________________________________________

[%%%Тесты%%%](https://garevna.github.io/js-quiz/#promise)
