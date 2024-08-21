# ![ico-35 study] Promise

__________________________________________________________________________________________

[►►►callback►►►](page/Event-Loop#Callback)

__________________________________________________________________________________________

## ![ico-30 icon] Конструктор

Конструктор **~Promise~** является **функцией высшего порядка**.
Это означает, что в качестве **обязательного аргумента** конструктор **~Promise~** ожидает **функцию**.

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

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] Функция-аргумент

Функция-аргумент конструктора **~Promise~** также является **функцией высшего порядка**, т.е. ее формальные параметры - это **функции**.
^^Более того, ее формальные параметры - это функции обратного вызова.^^

Функция-аргумент будет вызвана в момент создания экземпляра **~Promise~**.
Попробуем передать конструктору **~Promise~** функцию без формальных параметров:

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

Как мы видим, конструктор **~Promise~** вызвал переданную ему анонимную функцию.

~~~console
Start
Promise starts
End
~~~

Итак, мы передали конструктору **~Promise~** некую функцию, а он ее вызвал.
Пока никакой асинхронщины.

_____________________________________

### ![ico-25 icon] Экземпляр

Давайте посмотрим, что же создает конструктор **~Promise~**:

~~~js
const promise = new Promise(() => console.log('Promise starts'))
console.log(promise)
~~~

~~~console
Promise starts

▼ Promise {<pending>}
  ▼ [[Prototype]]: Promise
    ► catch: ƒ catch()
    ► constructor: ƒ Promise()
    ► finally: ƒ finally()
    ► then: ƒ then()
      Symbol(Symbol.toStringTag): "Promise"
    ► [[Prototype]]: Object
    [[PromiseState]]: "pending"
    [[PromiseResult]]: undefined
~~~

Итак, так мы получили экземпляр, который имеет свойство ~[[PromiseState]]~ (состояние промиса) со значением "pending" и свойство ~[[PromiseResult]]~ (результат) со значением ~undefined~.
^^Эти свойства можно увидеть в консоли дебаггера, однако скрипт не имеет к ним доступа.^^

Кроме того, мы видим три "унаследованных" метода: **~then~**, **~catch~** и **~finally~**, которые мы разберем далее.

__________________________________________

### ![ico-25 icon] Статические методы

Давайте еще посмотрим, какие статические методы есть у коструктора **~Promise~**.

~~~js
console.dir(Promise)
~~~

~~~console
▼ ƒ Promise()
  ►  all: ƒ all()
  ►  allSettled: ƒ allSettled()
  ► any: ƒ any()
  length: 1
  name: "Promise"
  ► prototype: Promise {Symbol(Symbol.toStringTag): 'Promise', then: ƒ, catch: ƒ, finally: ƒ}
  ► race: ƒ race()
  ► reject: ƒ reject()
  ► resolve: ƒ resolve()
  ► withResolvers: ƒ withResolvers()
  ► Symbol(Symbol.species): ƒ Promise()
  ► Symbol(Symbol.species): ƒ Promise()
    arguments: (...)
    caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

Посмотрим, что они умеют.

~~~js
const promise = Promise.resolve('Hello')
console.log(promise)
~~~

~~~console
▼ Promise {<fulfilled>: 'Hello'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: "Hello"
~~~

Ок, мы получили экземпляр, состояние которого уже не "~pending~", а "**~fulfilled~**".
И результат уже не ~undefined~, а "**Hello**".

~~~js
const promise = Promise.reject('Access denied.')
console.log(promise)
~~~

~~~console
▼ Promise {<rejected>: 'Access denied.'}
  ► [[Prototype]]: Promise
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "Access denied."
~~~

Теперь мы получили экземпляр, состояние которого уже не "~pending~", не "~fulfilled~", а "**~rejected~**".
И результат "**Access denied.**".

Т.е. мы полчили некий объект, у которого могут быть различные состояния (~[[PromiseState]]~), и который может иметь содержимое (~[[PromiseResult]]~).
Это весьма похоже на закрытую коробку, в которой может быть содержимое (~[[PromiseResult]]~).

Итак, экземпляр конструктора **~Promise~** будет находиться в одном из трех возможных состояний:

| **pending** | **fulfilled** | **rejected** |
| ^^Содержимого еще нет (коробка пуста)^^ | ^^В коробке - результат^^  | ^^В коробке - сообщение об ошибке^^ |

_________________________________________

![ico-35 coffee]

Предположим, вы пришли в кафе, где нет официантов, и заказали ![ico-35 egg].

При этом на столе перед вами появилась коробка, в которой в какой-то момент появится ответ на ваш заказ.
Ответ появится не сразу, поскольку нужно время, чтобы передать заказ на кухню.
Ответ может быть положительным, тогда в коробке появится ![ico-35 egg],
или же отрицательным, если в данный момент повар не может приготовить ![ico-35 egg] ввиду отсутствия необходимых ингредиентов.

Прикол в том, что вы не можете заглянуть в коробку и узнать, появилось там что-то, или нет.

Пока коробка пуста, ее состояние (~[[PromiseState]]~) будет **~pending~**.
Если в коробке появится ![ico-35 egg], то состяние (~[[PromiseState]]~) станет **~fulfilled~**.
Если в коробке отказ, то состяние (~[[PromiseState]]~) станет **~rejected~**.

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

Теперь надо разобраться с тем, как "вытащить" из этого экземпляра значения свойств ~[[PromiseState]]~ и ~[[PromiseResult]]~.
В консоли-то мы их видим, но для нашего кода эти свойства недоступны.

А кушать-то хочется.

Давайте испытаем прототипные методы, которые доступны экземпляру конструктора **~Promise~**.

_______________________________________________________

### ![ico-25 icon] Прототипные методы

Каждый экземпляр, созданный конструктором **~Promise~**, "наследует" от "папочки" методы **~then~**, **~catch~** и **~finally~**.

Методы **~then~** и **~catch~** - это две "дырки" в коробке, через которые мы можем извлечь то, что в ней находится.
Для этого нужно "всунуть руки" в эти дырки.

Под "руками" подразумеваются **функции**.

![ico-25 warn] Итак, методы **~then~**, **~catch~** и **~finally~** являются **функциями высшего порядка**, поскольку их аргументами должны быть **функции**.

Однако если вы передадите методу любое другое значение, не являющееся функцией, или вообще не передадите ничего, то исключения не будет, хотя метод не сработает.
Т.е. выражение:

~~~js
Promise.resolve('Access granted.').then()
~~~

или:

~~~js
Promise.resolve('Access granted.').then(10)
~~~

будет равносильно выражению:

~~~js
Promise.resolve('Access granted.')
~~~

Это логично, ведь задача метода - передать колбек в **Event Loop**, а если передавать нечего, то метод **ничего делать не будет**.

![ico-25 warn] Методы **~then~**, **~catch~** и **~finally~** возвращают экземпляр **~Promise~**.

Т.е. как только вы создали экземпляр **~Promise~**, вы уже не сможете "вырваться" из "заколдованного круга", т.е. что бы вы ни делали, результатом всегда будет новый экземпляр **~Promise~**.

#### ![ico-20 icon] catch

Функция, которую мы передадим методу **~catch~**, заберет сообщение об ошибке, если запрос будет отклонен и состояние нашей "коробки" станет **~rejected~**.

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

Давайте отнесемся серьезно к обработке исключений.
Очень плохо, если в процессе работы вашего приложения консоль будет красной от сообщений об ошибке.

☼☼☼ Не заставляйте консоль краснеть за вас ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

Через дырку **~then~** можно всунуть сразу две руки: одну - за результатом, вторую - за сообщением об ошибке:

~~~js
console.log('Start')
Promise.resolve('Access granted.').then(console.log, console.log)
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
~~~

#### ![ico-20 icon] finally

Думаю, с этим методом все достаточно просто.

~~~js
console.log('Start')
Promise.resolve('Access granted.')
  .then(console.log, console.log)
  .finally(() => console.log('Finally'))
Promise.reject('Access denied.').then(console.log, console.log)
console.log('Finish')
~~~

~~~console
Start
Finish
Access granted.
Access denied.
Finally
~~~
______________________________________________

## ![ico-30 icon] Магическая коробка

Итак, с помощью конструктора **~Promise~** можно создать магическую коробку с двумя дырками.
Как мы уже поняли, заглянуть в эту коробку "здесь и сейчас" просто нереально.
Доступ к ее содержимому возможен только через [►►►**Event Loop**►►►](page/Event-Loop).
Т.е. вам придется отправить за результатом колбеки, и другого способа извлечь содержимое из коробки не существует.

Давайте разберемся, почему именно так.

На самом деле экземпляр **~Promise~** работает как "ловушка" для результата асинхронного процесса.
Поскольку мы не знаем, когда завершится асинхронный процесс, то мы не знаем, когда состояние коробки изменится и в ней появится содержимое.

Если бы коробку можно было сразу же открыть, то, скорее всего, мы увидели бы пустую коробку.
Представьте теперь, что вы зависаете возле коробки и ждете, когда в ней появится содержимое.
Т.е. блокируете стек вызовов.
Но содержимое не может появиться в коробке, пока стек вызовов занят.
Даже если уже пришел ответ сервера, или истекло время таймера...
Т.е. вы зависнете с пустой коробкой в руках. При этом заблокируете страницу.
Вывод: код, создавший экземпляр **~Promise~**, должен завершить работу и освободить стек вызовов.

Когда мы передаем экземпляру **~Promise~** свои колбеки через "дырки" **~then~**, **~catch~** и **~finally~**, мы освобождаем стек вызовов и даем возможность коробке получить нужный результат. Получив результат, коробка передаст его одному из наших колбеков.

Теперь вернемся к конструктору.
Мы знаем, что при вызове конструктора **~Promise~** мы должны передать ему некую функцию (точнее, ссылку на функцию).

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

Эта функция будет сразу же вызвана.
Но у этой функции есть два формальный параметра.

Тут у вас должен возникнуть вполне логичный вопрос:
если мы передаем конструктору **~Promise~** ссылку на функцию, но не передаем аргументы для вызова этой функции, то как конструктор может ее вызвать?
Ведь при вызове он должен передать ей аргументы?

◘◘![ico-25 coffee] ** 2**◘◘
~~~js
const promise = (function (startTime) {
  const interval = Math.round(Math.random() * 5000)

  function recurse (callback) {
    Date.now() - startTime < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(Date.now() - startTime)
  }

  return new Promise(resolve => recurse(resolve))
})(Date.now())

promise.then(console.log)
~~~

В этом примере мы видим, что колбек **~console.log~** мы передаем уже после того, как экземпляр **~Promise~** был создан.
Да и не могли бы раньше, поскольку мы используем его метод **~then~** для передачи колбека.

Именно в этом и заключается магия нашей коробки с двумя дырками.
Коробка сама отправит собственные колбеки за результатом в [►►►**Event Loop**►►►](page/Event-Loop).

Давайте помотрим, что произойдет, если мы создадим экземпляр ~Promise~ значительно раньше, чем повесим колбэки с помощью методов **_~then~_** и **_~catch~_**

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

Выждав несколько секунд, выполним код:

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

В консоли мы увидим что-то вроде:

~~~console
Start
End
Time: 24/ 36
~~~

Т.е. в момент создания промиса **~test~** было 24 секунды, а когда мы добавили колбэки, было уже 36 секунд.
Но прикол в том, что, хотя мы "всунули руки" в дырку **~then~** на несколько секунд позже, магическая коробка сохранила для нас результат, который был получен ранее.

Представьте, что вы запустили несколько асинхронных процессов, получили несколько "магических коробок", и поставили их на полку.
Вы сможете извлечь содержимое коробок в любой удобный вам момент и в любой удобной для вас последовательности.

Для иллюстрации этого воспользуемся анонимной функцией из предыдущего примера, но теперь дадим ей имя **~createPromise~** и немного модифицируем ее:

~~~js
function createPromise (startTime, title) {
  const interval = Math.round(Math.random() * 5000)
  function recurse (callback) {
    const time = Date.now() - startTime
    time < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(`${title}: ${Date.now() - startTime}`)
  }
  return new Promise(resolve => recurse(resolve))
}
~~~

Теперь создадим с ее помощью три экземпляра **~Promise~**:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

Как мы видим, резолвятся эти три экземпляра в произвольном порядке, в зависимости от значения случайной величины **~interval~**, которая определяется в момент создания экземпляра.

{{{promise-03.js}}}

Предположим, нам нужно строго соблюдать последовательность вывода: first → second → third.
Воспользуемся для этого "магическими" свойствами нашей "коробки с двумя дырками":

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] "Пакеты" промисов

Продолжая изучать статические методы конструктора **~Promise~**, мы обнаруживаем, что кроме **~Promise.resolve~** и **~Promise.reject~**, есть еще ряд полезных методов, с помощью которых мы можем обслуживать сразу целые коллекции промисов.
Главное - чтобы эти коллекции были **итерабельными**.

Когда мы запускаем параллельно несколько асинхронных операций, мы попадаем в стихию возвращающихся к нам колбеков.

@@@@
Представьте себе теннисный корт, и пушка выстреливает шарики со скоростью пять шариков в секунду, а вам нужно их отбивать.<br>А если две пушки? Три пушки?...
![](illustrations/promise-all.jpg)
@@@@

Безусловно, промисы облегчают задачу.
Эти "магические коробки" работают как "ловушки" для шариков.
Мы можем "извлекать шарики" из этих "коробок" с помощью метода **~then~**.

Все осложняется, если результаты этих асинхронных операций вам нужны в заданном порядке.

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

Тут явно напрашивается некое решение такого рода:

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))

const results = []
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(value => { results[index] = { time: Date.now() - start, value } }))
~~~

{{{promise-arrays-02.js}}}

Это особенно удобно, если результаты нескольких асинхронных операций нам нужны одновременно.
Мы можем запустить несколько асинхронных операций, и обрабатывать полученные данные "пакетом", когда они все завершатся.

Однако в этом варианте мы не знаем, когда массив **~results~** будет готов.
Т.е. нужен еще один промис, который вернет нам **~results~** после того, как все промисы в массиве разрезолвятся.

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

const results = new Array(promises.length).fill(null)
const start = Date.now()
promises
  .forEach((promise, index) => promise.then(response => { results[index] = response }))

function recurse (resolve) {
  results.filter(item => !item).length
    ? setTimeout(recurse.bind(null, resolve), 400)
    : resolve(results)
}

const promise = new Promise(resolve => recurse(resolve))

promise.then(console.log)
~~~

Итак, далее мы будем рассматривать статические методы конструктора **~Promise~**, которые принимают в качестве аргумента ссылку на **массив промисов** и возвращают один промис.

@@@@
Т.е "упакуем" несколько "магических коробок" в одну "магическую коробку".
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

Этот метод принимает итерабельную коллекцию промисов, и возвращает один промис, который резолвится массивом результатов тогда, когда все промисы разрезолвятся.
Замечательно то, что порадок следования ответов в массиве результатов строго соотвествует порядку следования промисов в исходном массиве промисов.

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const create = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time))
const show = message => document.body.appendChild(document.createElement('p')).innerText = message

const promises = [
  create('Hello', 1000),
  create('Bye', 3000),
  create('How are you?', 2000)
]

Promise.all(promises)
  .then(responses => responses.forEach(show))
~~~

![ico-20 warn] Если существует вероятность "провала" хотя бы одного из промисов, то весь наш "пакет" слетит:

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

Давайте вернемся к нашему примеру 5 и посмотрим, насколько проще станет код с использованием метода **~Promise.all~**:

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)
let results = null

const start = Date.now()

const promises = data
  .map(value => new Promise(resolve => setTimeout(() => resolve({ time: Date.now() - start, value }), random(5000))))

Promise.all(promises)
  .then(responses => { results = responses })
  .then(() => console.log(results))
~~~

______________________________________________

### ![ico-20 icon] Promise.allSettled

Возвращает промис, который резолвится массивом объектов.
Каждому промису в исходном массиве соответствует объект в результирующем массиве.
Объект имеет три возможных свойства: **~status~**, **~value~** и **~reason~**.

Свойство **~status~** может принимать одно из двух значений: **~fulfilled~** или **~rejected~**.
Когда свойство **~status~** имеет значение **~fulfilled~**, то свойство **~value~** содержит результат промиса.
Когда свойство **~status~** имеет значение **~rejected~**, то свойство **~reason~** содержит сообщение о причине ошибки.

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

Этот статический метод конструктора **~Promise~** находит первый благополучно разрешившийся промис в "пакете" промисов и возвращает его.

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

Этот метод хорош тогда, когда мы посылаем несколько запросов, но удовлетворимся одним из результатов.
Например, если мы хотим вывести картинку на страницу, но не помним точно, в какой папке она находится.

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const getURLs = fileName => ['icons', 'images', 'files', 'sounds']
  .map(folder => `https://garevna.github.io/js-lessons/${folder}/${fileName}`)

function testURL (src) {
  return new Promise ((resolve, reject) => {
    const img = Object.assign(new Image(48), {
      onload (event) {
        resolve(img)
      },
      onerror (event) {
        reject(`Image ${src} does not exist.`)
      },
      src
    })
  })
}

const promises = getURLs('coffee.png').map(url => testURL(url))
~~~

Если мы воспользуемся предыдущим методом:

~~~js
Promise.allSettled(promises).then(console.log)
~~~

то увидим в консоли:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

Однако, если мы уверены, что хотя бы один из промисов разрешится, то можно применить метод **~Promise.any~**:

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

и тогда мы увидим на странице нужную картинку.
______________________________________________

### ![ico-20 icon] Promise.race

"Скачки" - какой из промисов разрешится первым.
Не важно, каким будет результат.
Главное - он пришел к финишу первым.

Т.е. если первым "провалится" один из промисов, то мы увидим сообщение об ошибке.

Воспользуемся **Github Users API**:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))

const getURLs = () => ['brynary', 'stocad', 'holin', 'mojombo', 'Bill']
  .map(id => `https://api.github.com/users/${id}`)

const show = response => {
  const text = addElem('h4')
  if (response.avatar_url) {
    Object.assign(addElem('img'), {
      src: response.avatar_url,
      width: 150
    })
    text.innerText = `${response.id}: ${response.login}`
  } else {
    text.innerText = response.message.replaceAll('. ', '.\n')
    text.style.color = '#a00'
  }
}

function getPromise (url) {
  return new Promise ((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(resolve)
  })
}

const promises = getURLs().map(url => getPromise(url))

Promise.race(promises).then(show)
~~~

{{{promise-race.js}}}
__________________________________________________________________________________________

## ![ico-25 icon] Примеры

Используем **Battery API**  для получения инфо о зарядке аккумулятора.
![ico-25 warn] Этот пример не будет работать в консоли страницы ~about:blank~.
^^Метод  **_getBattery()_**  объекта  **navigator** возвращает промис.^^


◘◘![ico-25 cap] **10**◘◘

~~~js
navigator.getBattery()
  .then(result => {
    for (const prop in result) {
      console.log(`${prop}: ${result[prop]}`)
    }
})
~~~

__________________________________________________________________________________________

◘◘![ico-25 cap] **11**◘◘

~~~js
const boy = [
  'Hi, what\'s your name?',
  'And I\'m Robert. Where do you live?',
  'In Lviv. Do you work or study?',
  'Me too. Okay, see you later, good luck!'
]

const girl = [
  'Hi, I\'m Helen, and you?',
  'In Kharkov. And where are you?',
  'I study and work. And you?',
  'Thanks, mutually!'
]

function output () {
  console.log(this.shift())
  return this[0]
}

boySpeak = output.bind(boy)
girlSpeak = output.bind(girl)

new Promise(resolve => resolve())
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)
  .then(boySpeak)

new Promise(resolve => resolve())
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
  .then(girlSpeak)
~~~

______________________________________________________________

Давайте немного расширим прототип конструктора **~Error~**:

~~~~js
Object.defineProperty(Error.prototype, 'name', {
  get () { return this.errorNames[this.code] }
})

Object.defineProperty(Error.prototype, 'message', {
  get () { return this.messages[this.code] }
})

Object.assign(Error.prototype, {
  errorNames: [
    'CustomError',
    'RandomError',
    'FatalError',
    'GameOver',
    'Shit',
    'FuckingError',
    'StrangeError',
    'XSS',
    'DoS',
    'DDoS'
  ],
  messages: [
    'Not authorized.',
    'Something happens...',
    'Access denied.',
    'Try another way.',
    'You are the kremlin troll.',
    'Operation failed.',
    'Unknown operation.',
    'Malicious code injection.',
    'Denial-of-service attack.',
    'Distributed denial-of-service attack.'
  ]
})
~~~~

Кроме того, раширим функциональность консоли:

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

Теперь сделаем следующее:

◘◘![ico-25 cap] **12**◘◘

~~~js
const func = callback => callback(Object.assign(new Error(), { code: Math.round(Math.random() * 9) }))

const getError = (resolve, reject) => setTimeout(func.bind(null, reject), Math.random() * 10000)

for (let num = 0; num < 10; num++) {
  new Promise(getError)
    .then(null, console.warning)
}
~~~

{{{promise-12.js}}}

________________________________

| [![ico-25 plunker] **13**](https://plnkr.co/edit/99ajm1Z3jcpKQQoE ) | [![ico-25 plunker] **14**](https://plnkr.co/edit/DIStxeDAPpXmhSTw ) | [![ico-70 replit] **15**](https://repl.it/@garevna/promise-sample-1 ) |

__________________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/promise)
