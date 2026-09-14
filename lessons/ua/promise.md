# ![ico-35 study] Promise

__________________________________________________________________________________________

[►►►callback►►►](page/Event-Loop#Callback)

__________________________________________________________________________________________

## ![ico-30 icon] Функція-аргумент

Функція-аргумент конструктора **~Promise~** також є **функцією вищого порядку**, тобто її формальні параметри є **функціями**.
^^Ба більше, її формальні параметри - це **функції зворотного виклику**.^^

~~~js
const promise = new Promise(function (...) {
  ...
})
~~~

Функція-аргумент буде викликана під час створення екземпляра **~Promise~**.

~~~js
const promise = new Promise ()
~~~

Спробуємо передати конструктору **~Promise~** без формальних параметрів:

~~~error
    Uncaught TypeError: Promise resolver undefined is not a function
~~~

__________________________________________________________________________________________

### ![ico-25 icon] Екземпляр

Давайте подивимося, що створює конструктор **~Promise~**:
Отже, ми отримали екземпляр, який має властивість ~[[PromiseState]]~ (стан промісу) зі значенням "pending" і властивість ~[[PromiseResult]]~ (результат) зі значенням ~undefined~.

^^Ці властивості можна побачити в консолі дебаггера, проте скрипт не має доступу до них.^^
Крім того, ми бачимо три "успадковані" методи: **~then~**, **~catch~** та **~finally~**, які ми розберемо далі.

~~~js
console.log('Start')

new Promise(() => console.log('Promise starts'))

console.log('End')
~~~

Як бачимо, конструктор **~Promise~** викликав передану йому анонімну функцію.

~~~console
Start
Promise starts
End
~~~

Отже, ми передали конструктору **~Promise~** певну функцію, а він її викликав.
Поки що ніякої асинхронності.

_____________________________________

### ![ico-25 icon] Статичні методи

Давайте подивимося, які статичні методи є у коструктора **~Promise~**.

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

Побачимо, що вони вміють.
Ок ми отримали екземпляр, стан якого вже не "~pending~", а "**~fulfilled~**".

І результат вже не ~undefined~, а "**Hello**".

__________________________________________

### ![ico-25 icon] Прототипні методи

Кожен екземпляр, створений конструктором **~Promise~**, "успадковує" від "батька" методи **~then~**, **~catch~** та **~finally~**.

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

Методи **~then~** та **~catch~** - це дві "дірки" в коробці, через які ми можемо витягти те, що в ній знаходиться.

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

Для цього потрібно "всунути руки" у ці дірки.
Під "руками" маються на увазі **функції**.

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

![ico-25 warn] Отже, методи **~then~**, **~catch~** та **~finally~** є **функціями вищого порядку**, оскільки їх аргументами мають бути **функції**.
Однак якщо ви передасте методу будь-яке інше значення, що не є функцією, або взагалі не передасте нічого, то виключення не буде, хоча метод не спрацює.

Тобто вираз:
або:

буде рівносильним виразу:

| **pending** | **fulfilled** | **rejected** |
Це логічно, адже завдання методу - передати колбек у **Event Loop**, а якщо нічого передавати, то метод нічого робити не буде.

_________________________________________

![ico-35 coffee]

![ico-25 warn] Методи **~then~**, **~catch~** та **~finally~** повертають екземпляр **~Promise~**.

Тобто як тільки ви створили екземпляр **~Promise~**, ви вже не зможете "вирватися" із "зачарованого кола", тобто. що б ви не робили, результатом завжди буде новий екземпляр **~Promise~**.
Відповідь з’явиться не відразу, оскільки потрібен час, щоб передати замовлення на кухню.
Відповідь може бути позитивною, тоді в коробці з’явиться ![ico-35 egg],
або ж негативною, якщо в даний момент кухар не може приготувати ![ico-35 egg] через відсутність необхідних інгредієнтів.

Фішка в тому, що ви не можете заглянути в коробку й дізнатися, з’явилося там щось чи ні.

Поки коробка порожня, її стан (~[[PromiseState]]~) буде **~pending~**.
Якщо в коробці з’явиться ![ico-35 egg], то стан (~[[PromiseState]]~) стане **~fulfilled~**.
Якщо в коробці відмова, то стан (~[[PromiseState]]~) стане **~rejected~**.

| **~PromiseState~** | **~PromiseResult~** |
| **~pending~**      | ![ico-25 wait]      |
| **~fulfilled~**    | ![ico-40 egg]       |
| **~rejected~**     | ![ico-25 error]     |

Тепер треба розібратися з тим, як «витягнути» з цього екземпляра значення властивостей ~[[PromiseState]]~ і ~[[PromiseResult]]~.
У консолі ми їх бачимо, але для нашого коду ці властивості недоступні.

А їсти ж хочеться.

Давайте випробуємо прототипні методи, які доступні екземпляру конструктора **~Promise~**.

_______________________________________________________

### ![ico-25 icon] catch

Давайте поставимося серйозно до обробки винятків.

Дуже погано, якщо під час роботи вашої програми консоль буде червоною від повідомлень про помилку.
Для цього потрібно «засунути руки» у ці отвори.

Під «руками» маються на увазі **функції**.

![ico-25 warn] Отже, методи **~then~**, **~catch~** і **~finally~** є **функціями вищого порядку**, оскільки їхніми аргументами мають бути **функції**.

Однак якщо ви передасте методу будь-яке інше значення, яке не є функцією, або взагалі нічого не передасте, то винятку не буде, хоча метод не спрацює.
Тобто вираз:

~~~js
Promise.resolve('Access granted.').then()
~~~

або:

~~~js
Promise.resolve('Access granted.').then(10)
~~~

буде рівнозначним виразу:

~~~js
Promise.resolve('Access granted.')
~~~

Це логічно, адже завдання методу — передати колбек у **Event Loop**, а якщо передавати нічого, то метод **нічого не робитиме**.

![ico-25 warn] Методи **~then~**, **~catch~** та **~finally~** повертають екземпляр **~Promise~**.

Тобто щойно ви створили екземпляр **~Promise~**, ви вже не зможете «вирватися» з «зачарованого кола», тобто що б ви не робили, результатом завжди буде новий екземпляр **~Promise~**.

#### ![ico-20 icon] catch

Функція, яку ми передамо методу **~catch~**, отримає повідомлення про помилку, якщо запит буде відхилено, і стан нашої «коробки» стане **~rejected~**.

~~~js
const promise = Promise.reject('Access denied.')
~~~

~~~error
    Uncaught (in promise) Access denied.
~~~

Давайте серйозно поставимося до обробки винятків.
Дуже погано, якщо під час роботи вашого додатка консоль буде червоною від повідомлень про помилки.

☼☼☼ Не змушуйте консоль червоніти за вас ☼☼☼

~~~js
const promise = Promise.reject('Access denied.').catch(console.log)
~~~

~~~console
    ► Uncaught (in promise) Access denied.
~~~

#### ![ico-20 icon] then

Крізь отвір **~then~** можна просунути одразу дві руки: одну — за результатом, другу — за повідомленням про помилку:

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

Гадаю, з цим методом усе досить просто.

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

## ![ico-30 icon] then

Отже, за допомогою конструктора **~Promise~** можна створити чарівну коробку з двома отворами.
Як ми вже зрозуміли, зазирнути в цю коробку «тут і зараз» просто неможливо.
Доступ до її вмісту можливий лише через [►►►**Event Loop**►►►](page/Event-Loop).
Тобто вам доведеться відправити колбек за результатом, і іншого способу витягти вміст із коробки не існує.

Давайте розберемося, чому саме так.

Насправді екземпляр **~Promise~** працює як «пастка» для результату асинхронного процесу.
Оскільки ми не знаємо, коли завершиться асинхронний процес, то ми не знаємо, коли стан коробки зміниться і в ній з’явиться вміст.

Якби коробку можна було відразу ж відкрити, то, найімовірніше, ми побачили б порожню коробку.
Уявіть тепер, що ви зависаєте біля коробки й чекаєте, коли в ній з’явиться вміст.
Тобто блокуєте стек викликів.
Але вміст не може з’явитися в коробці, доки стек викликів зайнятий.
Навіть якщо вже надійшла відповідь сервера або сплив час таймера...
Тобто ви зависнете з порожньою коробкою в руках. При цьому заблокуєте сторінку.
Висновок: код, який створив екземпляр **~Promise~**, повинен завершити роботу та звільнити стек викликів.

Коли ми передаємо екземпляру **~Promise~** свої колбеки через «дірки» **~then~**, **~catch~** і **~finally~**, ми звільняємо стек викликів і даємо коробці можливість отримати потрібний результат. Отримавши результат, коробка передасть його одному з наших колбеків.

Тепер повернемося до конструктора.
Ми знаємо, що під час виклику конструктора **~Promise~** ми повинні передати йому певну функцію (точніше, посилання на функцію).

~~~js
const promise = new Promise(function (resolve, reject) {
  ...
})
~~~

Ця функція буде відразу ж викликана.
Але ця функція має два формальні параметри.

Тут у вас має виникнути цілком логічне запитання:
якщо ми передаємо конструктору **~Promise~** посилання на функцію, але не передаємо аргументи для виклику цієї функції, то як конструктор може її викликати?
Адже під час виклику він має передати їй аргументи?

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

У цьому прикладі ми бачимо, що колбек **~console.log~** ми передаємо вже після того, як екземпляр **~Promise~** було створено.
Та й не могли б раніше, оскільки ми використовуємо його метод **~then~** для передачі колбека.

Саме в цьому й полягає магія нашої коробки з двома отворами.
Коробка сама надішле власні колбеки за результатом у [►►►**Event Loop**►►►](page/Event-Loop).

Давайте подивимося, що станеться, якщо ми створимо екземпляр ~Promise~ значно раніше, ніж підвісимо колбеки за допомогою методів **_~then~_** та **_~catch~_**

~~~js
var test = new Promise(resolve => resolve(`Time: ${new Date().getSeconds()}/`))
~~~

Зачекавши кілька секунд, виконаємо код:

~~~js
test.then(data => console.log(data, new Date().getSeconds()))
~~~

У консолі ми побачимо щось на кшталт:

~~~console
Start
End
Time: 24/ 36
~~~

Тобто в момент створення промісу **~test~** минуло 24 секунди, а коли ми додали колбеки, минуло вже 36 секунд.
Але цікаво те, що, хоча ми «засунули руки» в отвір **~then~** на кілька секунд пізніше, «чарівна коробка» зберегла для нас результат, який було отримано раніше.

Уявіть, що ви запустили кілька асинхронних процесів, отримали кілька «чарівних коробок» і поставили їх на полицю.
Ви зможете витягти вміст коробок у будь-який зручний для вас момент і в будь-якій зручній для вас послідовності.

Для ілюстрації цього скористаємося анонімною функцією з попереднього прикладу, але тепер дамо їй ім’я **~createPromise~** і трохи модифікуємо її:

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

Тепер створимо за її допомогою три екземпляри **~Promise~**:

◘◘![ico-25 cap] ** 3**◘◘
~~~js
const first = createPromise(Date.now(), 'first')
const second = createPromise(Date.now(), 'second')
const third = createPromise(Date.now(), 'third')

first.then(console.log)
second.then(console.log)
third.then(console.log)
~~~

Як бачимо, ці три екземпляри вирішуються в довільному порядку, залежно від значення випадкової величини **~interval~**, яка визначається в момент створення екземпляра.

{{{promise-03.js}}}

Припустимо, нам потрібно суворо дотримуватися послідовності виведення: first → second → third.
Скористаємося для цього «магічними» властивостями нашої «коробки з двома отворами»:

◘◘![ico-25 cap] ** 4**◘◘
~~~js
const first = createPromise(Date.now(), 'first').then(console.log)
const second = createPromise(Date.now(), 'second')
const third = () => createPromise(Date.now(), 'third').then(console.log)

first.then(() => second.then(console.log).then(third))
~~~

{{{promise-04.js}}}

__________________________________________________________________________________________

## ![ico-25 icon] finally

Продовжуючи вивчати статичні методи конструктора **~Promise~**, ми виявляємо, що крім **~Promise.resolve~** і **~Promise.reject~**, є ще низка корисних методів, за допомогою яких ми можемо обслуговувати відразу цілі колекції промісів.
Головне — щоб ці колекції були **ітерабельними**.

Коли ми запускаємо паралельно кілька асинхронних операцій, ми потрапляємо у вир зворотних викликів, що надходять до нас.

@@@@
Уявіть собі тенісний корт, де гармата вистрілює м’ячі зі швидкістю п’ять м’ячів на секунду, а вам потрібно їх відбивати.<br>А якщо дві гармати? Три гармати?...
![](illustrations/promise-all.jpg)
@@@@

Безумовно, проміси полегшують завдання.
Ці «чарівні коробки» працюють як «пастки» для кульок.
Ми можемо «витягувати кульки» з цих «коробок» за допомогою методу **~then~**.

Все ускладнюється, якщо результати цих асинхронних операцій вам потрібні в заданому порядку.

~~~js
const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data
  .map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(console.log))
~~~

{{{promise-arrays-01.js}}}

Тут очевидно напрошується певне рішення такого роду:

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

Це особливо зручно, якщо нам потрібні результати кількох асинхронних операцій одночасно.
Ми можемо запустити кілька асинхронних операцій і обробляти отримані дані «пакетом», коли вони всі завершаться.

Однак у цьому варіанті ми не знаємо, коли масив **~results~** буде готовий.
Тобто потрібен ще один проміс, який поверне нам **~results~** після того, як усі проміси в масиві вирішаться.

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

Отже, далі ми розглядатимемо статичні методи конструктора **~Promise~**, які приймають як аргумент посилання на **масив промісів** і повертають один проміс.

@@@@
Тобто «упакуємо» кілька «магічних коробок» в одну «магічну коробку».
![](illustrations/promises-collection.png)
@@@@

__________________________________________

### ![ico-20 icon] Promise.all

Цей метод приймає ітерабельну колекцію промісів і повертає один проміс, який вирішується масивом результатів тоді, коли всі проміси вирішаться.
Чудово те, що порядок послідовності відповідей у масиві результатів суворо відповідає порядку послідовності промісів у вихідному масиві промісів.

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

![ico-20 warn] Якщо існує ймовірність «провалу» хоча б одного з промісів, то весь наш «пакет» провалиться:

~~~js
const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(console.log, console.warn)
~~~

{{{promise-all-01.js}}}

Повернімося до нашого прикладу 5 і подивимося, наскільки простішим стане код із використанням методу **~Promise.all~**:

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

Повертає проміс, який вирішується масивом об’єктів.
Кожному промісу в вихідному масиві відповідає об’єкт у результуючому масиві.
Об’єкт має три можливі властивості: **~status~**, **~value~** та **~reason~**.

Властивість **~status~** може приймати одне з двох значень: **~fulfilled~** або **~rejected~**.
Коли властивість **~status~** має значення **~fulfilled~**, то властивість **~value~** містить результат промісу.
Коли властивість **~status~** має значення **~rejected~**, то властивість **~reason~** містить повідомлення про причину помилки.

~~~js
const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises)
  .then(results => results.forEach(console.log))
~~~

{{{promise-all-settled-01.js}}}

______________________________________________

### ![ico-20 icon] Promise.any

Цей статичний метод конструктора **~Promise~** знаходить перший проміс, що успішно вирішився, у «пакеті» промісів і повертає його.

~~~js
const freePort = 4000

const promises = [3000, 3256, 4000, 3040, 5000]
  .map(port => new Promise((resolve, reject) => port === freePort ? resolve(port) : reject(port)))

Promise.any(promises).then(console.log)
~~~

Цей метод є доцільним тоді, коли ми надсилаємо кілька запитів, але задовольнимося одним із результатів.
Наприклад, якщо ми хочемо вивести зображення на сторінку, але не пам’ятаємо точно, у якій папці воно знаходиться.

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

Якщо ми скористаємося попереднім методом:

~~~js
Promise.allSettled(promises).then(console.log)
~~~

то побачимо в консолі:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {status: 'fulfilled', value: img}
  ► 1: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/images/coffee.png does not exist.'}
  ► 2: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/files/coffee.png does not exist.'}
  ► 3: {status: 'rejected', reason: 'Image https://garevna.github.io/js-lessons/sounds/coffee.png does not exist.'}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

Однак, якщо ми впевнені, що хоча б один із промісів виконається, то можна застосувати метод **~Promise.any~**:

~~~js
Promise.any(promises)
  .then(img => document.body.appendChild(img))
~~~

і тоді ми побачимо на сторінці потрібне зображення.
______________________________________________

### ![ico-20 icon] Promise.race

«Скачки» — який із промісів виконається першим.
Неважливо, яким буде результат.
Головне — він прийшов до фінішу першим.

Тобто якщо першим «провалиться» один із промісів, то ми побачимо повідомлення про помилку.

Скористаємося **Github Users API**:

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

## ![ico-25 icon] Магічна коробка

Отже, за допомогою конструктора **~Promise~** можна створити магічну коробку з двома дірками.
Як ми вже зрозуміли, заглянути в цю коробку "тут і зараз" просто неможливо.
Доступ до її вмісту можливий лише через [►►►**Event Loop**►►►](page/Event-Loop).


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

Тобто вам доведеться відправити за результатом колбеки, і іншого способу витягти вміст із коробки не існує.

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

Давайте розберемося, чому саме так.

~~~~js
Object.assign(console, {
  warning (error) {
    console.warn(`(${error.code}) ${error.name}: ${error.message}`)
  }
})
~~~~

Насправді екземпляр **~Promise~** працює як "уловлювач" для результату асинхронного процесу.

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
