# ![ico-30 study] async | await

**ECMAScript 2017**

________________________________________________________________________________________________

[►►►**Конструктор AsyncFunction**►►►](page/async-constructor)

________________________________________________________________________________________________

Два коротких слова, які фантастично змінили нашу реальність.
Два слова, які запускають потужний механізм контролю стихії подій.
Слова, які повністю звільнили нас від рабства подій, дозволили «осідлати» дикого коня асинхронності.
Словом, магія триває... 'Обіцянки' були лише початком.

## ![ico-25 icon] async function

Щоб оголосити асинхронну функцію, використовуйте ключове слово **~async~** перед ключовим словом **~function~**:

~~~js
async function sigma () {
  ...
}
~~~

Для стрілкових функцій:

~~~js
const sayHello = async () => 'Hello'
~~~

Що це змінює в нашому житті?

![ico-25 warn] **Виклик асинхронної функції повертає екземпляр ~Promise~.**.

Таким чином, асинхронна функція є більш лаконічним способом створення екземплярів ~Promise~, ніж конструктор **~Promise~**.

Тепер, замість створення проміса традиційним способом (за допомогою конструктора):

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

ми можемо зробити наш код набагато коротшим і читабельнішим:

~~~js
const createPromise = async message => message
~~~

Функція **~createPromise~** і в першому, і в другому варіанті створює _екземпляр ~Promise~_, однак у другому варіанті ми обходимося без явного виклику конструктора **~Promise~**.

Чим резолвиться екземпляр ~Promise~, що повертає асинхронна функція?

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

![ico-20 warn] Тим, що повертає асинхронна функція за допомогою оператора **~return~**.
^^Якщо в асинхронній функції немає оператора **~return~**, то проміс, який вона повертає, буде резолвитися значенням ~undefined~.^^

______________________________________________

У наступних прикладах ми будемо будувати графіки функцій асинхронно по точках.
Оскільки ми будемо відображати графіки функцій на сторінці, нам потрібно вирішити, в якому контейнері будуть знаходитися ці графіки.

~~~js
const section = document.body
section.style = 'padding: 120px;'
~~~

Також створюємо допоміжну функцію **~createPoint~**:

~~~js
function createPoint (x, y, color = '#f50') {
  const point = section
    .appendChild(document.createElement('span'))
  point.innerText = '•'
  point.style = `
    position: relative;
    left: ${x.toFixed(2)}px;
    top: ${y.toFixed(2)}px;
    color: ${color};
  `
}
~~~

і ще дві - **~sin~** і **~cos~**:

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

Зверніть увагу, що досі ми не використовували асинхронну функцію.

А от тепер вона з'явиться:

◘◘![ico-25 cap] ** 1**◘◘
~~~js
const recurse = (times => {
  let counter = 0
  let promise = (async () => sin(0))().then(cos(0))
  return function () {
    promise = promise
      .then(sin.bind(null, counter))
      .then(cos.bind(null, counter))
    counter++ < times && recurse()
  }
})(20)

recurse()
~~~

{{{async-await-01.js}}}

Тут ми бачимо анонімну асинхронну функцію **~async () => sin()~**.
Ми вже знаємо, що вона повертає **~promise~**.

^^^[![ico-30 eyes]]

^^Звісно, для демонстрації ланцюгових обчислень ми могли записати й так:^^

~~~js
const start = () => (async () => sin())().then(cos)

start()
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
~~~

^^однак використання рекурсивної функції робить код набагато коротшим, хоча й не таким наочним.^^

^^^

У цьому прикладі ми скористалися тим,
що не лише асинхронна функція, а й метод **~then~** повертає **~promise~**.

Завдяки цьому кожна точка кожного графіка будується колбеком промісу (мікротаском), тобто. сторінка не втрачає інтерактивність під час побудови графіків.

_________________________________________

А тепер покажемо наочніше, як мікротаски пропускають один одного по черзі в стек викликів, від чого складається враження, що графіки функцій малюються одночасно, хоча насправді спочатку малюється одна точка графіка функції синус, за нею - одна точка графіка косинуса, потім знову одна точка синуса, і т.д.

Для того, щоб зробити процес наочнішим, скористаємося методом глобального об'єкта **~requestAnimationFrame~**.

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const recurseSin = (times => {
  let counter = 0
  let promise = (async () => sin(0))()
  return function () {
    promise = promise.then(sin.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseSin)
  }
})(20)

const recurseCos = (times => {
  let counter = 0
  let promise = (async () => cos(0))()
  return function () {
    promise = promise.then(cos.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseCos)
  }
})(20)

recurseSin()
recurseCos()
~~~

{{{async-await-02.js}}}

________________________

Для більшої переконливості додамо ще анімовану фігуру:

~~~js
const start = Date.now()

function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 5000 && requestAnimationFrame(figure.move)
    }
  })
}
~~~

і переконаємося, що у нашому прикладі малювання графіків функцій не блокує анімацію фігури:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

Ваші алодисменти, панове! Асинхронна функція їх точно заслужила.
І це лише початок.

________________________________________________________________________________________________

## ![ico-25 icon] await

![ico-20 warn] Ключове слово **~await~** можна використовувати лише всередині **асинхронних функцій**.

^^В іншому випадку буде згенеровано виняток:^^

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

Давайте розберемося, що робить двигун, коли зустрічає ключове слово **~await~**.
По-перше, за ключовим словом **~await~** завжди слідує якийсь вираз.
Ми знаємо, що коли двигун натрапляє на вираз у нашому коді, він обчислює його значення і замінює цей вираз на обчислене значення.
Отже, розберемося, що може слідувати за ключовим словом **~await~**, і як поводитиметься двигун у кожному випадку.

Ми розглянемо варіанти, коли за ключовим словом **~await~** слідує:
1. проміс (наша "магічна коробка з двома дірками");
2. об'єкт, що має метод **~then~**;
3. будь-який вираз, значенням якого буде посилання на масив чи об'єкт, рядок, чи число, чи логічне значення, а також ~null~ і ~undefined~.

Чому ми окремо розглядаємо ці варіанти?
Тому що поведінка движка буде різною в кожному з цих випадків.

_____________________________________

### ![ico-20 icon] await &lt;promise>

Насамперед подивимося, що станеться, якщо після ключового слова **~await~** знаходиться посилання на нашу "магічну коробку з двома дірками".

Створимо дві допоміжні функції:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

Отже, ми можемо створити "магічну коробку з двома дірками" методом **~createPromise~**.
Потім ми можемо використовувати метод **~then()~** цієї "коробки" (промісу) для передачі колбека (функції зворотного виклику), який "забере" результат, яким резолвується проміс.

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

А тепер подивимося, як можна використовувати ключове слово **~await~**, і чим відрізняється його робота від роботи методу **~then()~** промісу.

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

Або так:

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

Поки що жодних відмінностей не спостерігається.
Тобто ключове слово **~await~** призводить до виклику методу **~then()~** екземпляра ~Promise~, який стоїть після **~await~**.
Але виникає питання: метод **~then()~** екземпляра ~Promise~ повинен отримати як аргументи посилання на колбек-функції.
Проте вираз:

~~~js
await createPromise('Resolved!')
~~~
жодної колбек-функції не містить. Навіть натяку.
Давайте розберемося, що там відбувається.

~~~js
new Promise((resolve, reject) => {
  console.log('resolve:\n', resolve)
  console.log('reject:\n', reject)
})
~~~

~~~console
resolve:
 ƒ () { [native code] }
reject:
 ƒ () { [native code] }
~~~

При виклику конструктора **~Promise~** йому було передано функцію з двома формальними параметрами.
Вона була викликана, і отримала при виклику як аргументи два колбеки.
Як бачимо, це деякі дефолтні колбеки.
Вони "забирають" результат і поміщають його в нашу "магічну коробку з двома дірками".

Тому логічно припустити, що ці колбеки мають такий код:

~~~js
result => result
~~~

Подивимося, що робить **~await~**:

◘◘resolve◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.resolve('Success.'))
test()
~~~

~~~console
Result:  Success.
~~~

◘◘reject◘◘
~~~js
const test = async () => console.log('Result: ', await Promise.reject('Failure.'))
test()
~~~

~~~error
    Uncaught (in promise) Failure.
~~~

Порівняємо цю поведінку з явним викликом методу **~then~** промісу з передачею йому двох колбеків:

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

Як бачите, **~await~** викликає метод **~then~**, але передає йому лише один колбек (**~resolve~**).
У разі реджекту управління буде "перехоплено" двигуном, який викине в консоль виняток.

Тому для "перехоплення" винятків варто використати метод **~catch~**:

~~~js
const test = async () => {
  const result = await Promise.reject('Failure.')
    .catch(console.warn)
  result && console.log('Result: ', result)
}
test()
~~~

~~~warn
    Failure.
~~~
_____________________________________________

Нехай у нас є така функція:

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

Якщо ми скористаємося методом **~then~** промісу для передачі другого колбека **~reject~**:

◘◘**^^Promise^^**◘◘

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

то виняток буде "перехоплено", і в консолі буде попередження.

Якщо ж ми скористаємося ключовим словом **~await~**:

◘◘**^^async function^^**◘◘

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

тоді у разі "відмови" промісу буде згенеровано виняток:

~~~error
    Uncaught (in promise) Failure.
~~~

Таким чином, якщо за ключовим словом **~await~** слідує _проміс_, то двигун викличе метод **~then~** цього _промісу_, але ![ico-20 warn] без передачі другого колбека  (**~reject~**).

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

А якщо після ключового слова **~await~** буде не _проміс_, а будь-який інший об'єкт?
Чи навіть не об'єкт, а якийсь рядок, чи число, чи логічне значення?

_____________________________________

### ![ico-20 icon] Об'єкт з методом then

Давайте створимо об'єкт, який має метод **~then()~**:

◘◘![ico-25 cap] ** 5**◘◘

~~~js
const user = {
  name: 'Polina',
  then (callback) {
    callback(this.name)
  }
}

user.then(console.log)
console.log('finish')
~~~
~~~console
Polina
finish
~~~

Очевидно, що об'єкт **~user~**  **не**  є _промісом_, і жодної асинхронщини поки що не спостерігається.

Однак подивимося, що станеться під час виконання коду:

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

Як бачимо, двигун, виявивши ключове слово **~await~**, не сильно напружувався з тим, що за вираз слідує за ним, і його анітрохи не збентежило те, що це не _проміс_.
Двигун виявив, що це об'єкт, який має метод **~then()~**.

І що ми бачимо? Метод **~then()~** об'єкта **~user~** був викликаний!

Але тут є одна загадка:

Метод **~then()~** об'єкта **~user~** є **функцією вищого порядку**,
тобто він очікує під час виклику отримати один обов'язковий аргумент - **функцію**.
Але ми не передавали жодного аргументу методу **~then()~** об'єкта **~user~**.
Більше того, ми його взагалі не викликали!

Виходить, що двигун не тільки сам викликав метод **~then()~** об'єкта **~user~**,
але ще й передав йому якусь функцію як аргумент.

Питання: який колбек передав двигун методу **~then()~** об'єкта **~user~**?

Судячи з поведінки методу **~then()~**, він отримав такий колбек:

~~~js
response => response
~~~

тобто колбек, який діє за принципом: "Що отримав - те й віддаю".

Як бачите, зустрівши одне мале слово **~await~**, двигун розвиває досить бурхливу діяльність.

Останній "штрих": у попередньому прикладі метод **~then~** об'єкта **~user~** був функцією вищого порядку, тобто приймав як аргумент функцію.
Давайте подивимося, що станеться, якщо метод **~then~** буде звичайною функцією:

~~~js
const user = {
  name: 'Polina',
  then () {
    console.log(this.name)
  }
}

;(async () => {
  await user
  console.log('Hi from Event Loop')
})()

console.log('finish')
~~~

~~~console
finish
Polina
~~~

Як бачите, рядок

~~~js
console.log('Hi from Event Loop')
~~~

так і не було виконано.
Це означає, що асинхронна функція так і не дочекалася повернення колбека (бо його не було), і не змогла відновити своє виконання після **~await~**.
Тобто асинхронна функція могла повернутися з циклу подій лише після повернення звідти колбека, відправленого туди методом **~then~**.
Але метод **~then~** не надіслав нічого до циклу подій.
Будьте уважні!

_____________________________________

### ![ico-20 icon] Згадаймо обіцянки

Ми з вами вже говорили, що екземпляр конструктора **~Promise~** - це магічна коробка з двома дірками.
Методи **~then()~** та **~catch()~** - це і є "дірки" в коробці.
Через ці "дірки" ми всовуємо свої колбеки, і коробка "обіцяє" нам, що як тільки в ній з'явиться вміст, один з наших колбеків його отримає.

@@@@ 2
Коли у коробці з'явиться вміст – невідомо.<br>Яким буде цей вміст - "білою кулею" (**response**) або "чорною кулею" (**error**) - теж невідомо.
![](illustrations/white-and-black.png)
@@@@

~~~~js
const getStatus = async () => Math.random() > .5 ? 'white' : 'black'

const func = ((startTime, callback) => {
  const time = Math.round(Math.random() * 30000)
  return async timeStamp => {
    const interval = timeStamp - startTime
    if (interval < time) requestAnimationFrame(func)
    else callback(await getStatus())
  }
})(0, console.log)

requestAnimationFrame(func)
~~~~

Треба відзначити, що коробка промісу знає, що їй потрібно "зловити" білу або чорну кулю, коли вона прилетить.

І магічна коробка відправляє свої власні колбеки за білою та чорною кулею у **Event Loop**.

Колбеки вже "сидять" у таблиці евентів "у засідці".
Вони "ловлять кулі" за нас.
Коли спіймають, то покладуть у магічну коробку екземпляра **~Promise~**.
Вони прив'язані відповідно до таких подій:

1. "Прилетіла біла куля" (response)
2. "Прилетіла чорна куля" (error)

Назад з **Event Loop** повернеться лише один із них.
У коробці екземпляра **~Promise~** з'явиться вміст.

{{{async-await-05.js}}}

Тепер магічна коробка з двома дірками чекає, коли ви всунете в ці дірки свої "руки" (колбеки **~resolve~** і **~reject~**), яким можна буде віддати кулю, що прилетіла.

Можливо, ви вже "всунули руки" раніше, тоді ви отримаєте кулю, як тільки вона з'явиться в коробці екземпляра **~Promise~**.
В іншому випадку куля лежатиме в коробці, поки ви не скористаєтеся методами **~then()~** і **~catch()~**, тобто поки ви не "всунете руки", щоб забрати кулю.

![ico-30 point_up] Звідси випливає, що магічна коробка синхронізує два автономні асинхронні процеси.
У цьому полягає магічна сила коробки з двома дірками.

Тобто магічна коробка _промісу_ посилає "збігати за кулькою" свої власні колбеки, а потім чекає, коли ви всунете руки (колбеки) в дірки **~then()~** і **~catch()~**, щоб віддати кулька, що знаходиться на зберіганні.

^^Причому в одну дірку **~then()~** ви можете всунути обидві руки (**~resolve~** і **~reject~**), хоча використання другої дірки **~catch()~** у деяких випадках позбавляє вас від повідомлень про помилку в консолі.^^

☼☼☼Не змушуйте консоль червоніти за вас☼☼☼

_________________________________________

### ![ico-20 icon] await &lt;expression>

Отже, двигун стикається з виразом ~**await** &lt;expression>~.
Йому треба вирахувати значення цього виразу.
![ico-25 warn] Поки він не обчислить і не замінить вираз ~await &lt;expression>~ на отримане (обчислене) значення, він не зрушить до наступного рядка коду асинхронної функції.

Якщо значенням ~<expression>~ буде посилання на екземпляр **~Promise~**, то двигун викличе метод **~then()~** цього екземпляра, передасть йому колбек:

~~~js
response => response
~~~

і призупинить виконання коду асинхронної функції до тих пір, поки колбек не повернеться з **Event Loop** з "кулькою" результату (~response~) і не покладе його в "коробку" промісу.

Після того, як результат з'явиться в коробці, двигун витягне його з коробки і вставить на місце вираження ~await &lt;expression>~.

Ми вже ставили собі питання, що буде робити движок, якщо ~&lt;expression>~ не буде промісом.
І ми вже розібралися, що робитиме двигун, якщо ~&lt;expression>~ буде об'єктом, у якого є метод **~then()~**.

Тепер подивимося, що робитиме двигун, якщо ~&lt;expression>~ буде рядком, чи числом, чи іншим значенням.

◘◘![ico-25 cap] ** 6**◘◘
~~~js
console.log('Start')
;(async function () {
  console.log('Async function starts')
  console.log(await 'Hello!')
  console.log('Async function finished')
})()
console.log('Finish')
~~~

У цьому прикладі слід уважно стежити за послідовністю виведення повідомлень у консоль:

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

Все, що виведено в консоль після повідомлення **_Finish_** - це функції зворотного виклику, які пройшли через **Event Loop**.
Якщо вони виведені до ~undefined~ - це **мікротаски**.

Отже, двигун благополучно виводив у консоль ^^**_Start_**^^, потім натрапив на функціональний вираз ([IIFE](page/Closure#IIFE)) і почав "обчислювати" значення виразу в круглих дужках. А в круглих дужках – оголошення анонімної асинхронної функції. Двигун передає управління конструктору, який створює цю функцію та повертає посилання на неї. Двигун, отримавши посилання на функцію, викликає її, оскільки далі йдуть дужки (виклик функції).
Анонімна асинхронна функція починає виконуватися, і в консоль виводиться повідомлення ^^**_Async function starts_**^^.
Однак вже в наступному рядку коду функції двигун "наткнувся" на вираз:

~~~js
console.log(await 'Hello!')
~~~

Тут двигун розуміє, що потрібно послати колбек ~() => 'Hello!'~ у **Event Loop**, і функція повинна дочекатися його повернення, щоб завершити виконання цього рядка коду. Далі код функції виконуватися не може, доки не повернеться колбек. А повернутися він може лише тоді, коли стек викликів буде вільним.
Отже, движку потрібно на якийсь час "позбутися" цієї функції, але так, щоб після повернення колбека ~() => 'Hello!'~ можна було відновити її виконання.

Як це можна зробити?

Наприклад, замінивши код функції, що залишився невиконаним:

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

на такий код:

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

І далі двигун продовжує виконувати код скрипта з рядка:

~~~js
console.log('Finish')
~~~

після чого стек викликів звільняється, і з **Event Loop** повертається колбек:

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

котрий отримав ~message~ зі значенням '_Hello_!'.

Таким чином, поява ключового слова **~await~** призводить до того, що невиконаний залишок коду асинхронної функції стає колбеком.

_____________________________________________

## ![ico-20 icon] Приклади

### ![ico-25 cap] 7

У цьому прикладі ми спеціально дали ім'я **~test~** функції, щоб відстежувати її появу у стеку викликів.

◘◘![ico-25 cap] ** 7**◘◘

~~~js
console.log('Start')

;(async function test (callback) {
  const inputs = []
  inputs.push(await 5)
  inputs.push(await 7)
  inputs.push(await 9)
  const result = inputs
    .reduce((res, num) => res += num)
  callback(await result)
})(console.log)

console.log('Finish')
~~~

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8

У цьому прикладі код основного потоку відпрацює за значенням ** 5** змінної ~num~.
Однак, виклик асинхронної функції ~sample()~ призведе до того, що після завершення роботи коду основного потоку значення змінної ~num~ буде вже **10**.

◘◘![ico-25 cap] ** 8**◘◘

~~~js
let num = 5

async function sample (arg) {
  num = await arg
}

sample(10)
  .then(() => console.log(`Finish value: ${num}`))

console.log('Start value: ', num)
~~~

••Start value:  5••
••Finish value: 10••

_________________________________

### ![ico-25 cap] 9

◘◘![ico-25 cap] ** 9**◘◘

~~~js
async function getUser (userNum) {
  return (await (await fetch(`https://api.github.com/users/${userNum}`)).json()).name
}

getUser(5)
  .then(console.log)
~~~

**Output**:

••Yuriy Semchyshyn••

_____________________________________

### ![ico-25 cap] 10

◘◘![ico-25 cap] **10**◘◘

~~~js
const browsers = ['Chrome', 'Mozilla', 'Safari', 'IE']

browsers.then = (function () {
  let current = 0

  return function (resolve) {
    const response = {
      value: this[current++],
      done: current > this.length
    }

    setTimeout(() => resolve.call(null, response), 1000)
  }
})()

async function showBrowsers () {
  do {
    var { done, value } = await browsers

    console.log(`{ value: ${value}, done: ${done} }`)
  } while (!done)
}

showBrowsers ()
~~~

{{{async-await-6.js}}}

____________________________________________________________

### ![ico-25 cap] 11

◘◘![ico-25 cap] **11**◘◘

~~~js
(function demo (maxValue) {
  const placeholder = document.body
    .appendChild(document.createElement('h3'))

  while (maxValue--) {
    const number = maxValue
    setTimeout(async () => Object.assign(placeholder, {
      innerText: await number
    }), number * 1000)
  }
})(10)
~~~

{{{async-await-11.js}}}

____________________________________________________________

### ![ico-25 cap] 12

◘◘![ico-25 cap] **12**◘◘

~~~js
;(async () => await 'async-await')().then(console.log)

Promise.resolve('promise').then(console.log)

;(async () => 'async')().then(console.log)
~~~

~~~console
promise
async
async-await
~~~

Зауважимо, що:

1. Проміс, який повертає функція ~async () => await 'async-await'~, розрізолвився останнім, хоча це перший рядок коду.
2. Першим розрізолвився ~Promise.resolve('promise')~ (другий рядок коду).
3. Другим розрізолвився проміс, повернутий функцією ~async () => 'async'~ (третій рядок коду).

Зробив "рокіровку" другої і третьої стрічок коду:

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

ми побачимо, що порядок виведення консоль змінився відповідним чином:

~~~console
async
promise
async-await
~~~

тобто їх колбеки потрапляють в чергу мікротасків в тій же послідовності, в якій вони з'явилися в коді.

А ось з функцією ~async () => await 'async-await'~ все інакше.

Покажемо, що код:

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

працює ідентично до коду:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

Для цього запустимо їх спочатку у такій послідовності:

~~~js
;(async () => await 'async-await-1')().then(console.log)

new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

~~~console
async-await-1
async-await-2
~~~

а потім змінимо порядок їх проходження:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)

;(async () => await 'async-await-1')().then(console.log)
~~~

~~~console
async-await-2
async-await-1
~~~

Як ми бачимо, вони резолвуються строго в порядку їхнього слідування в коді.
Тобто появлення ключового слова **~await~** подовжує на 1 ланцюг колбеків, що проходять через Event Loop, і це призводить до того, що в прикладі 12 останнім "вийде на фініш" ~;(async () => await 'async-await')().then(console.log)~.

Як ми вже говорили раніше, сама асинхронна функція переривається в точці, де зустрічається **~await~**, і залишок коду цієї функції, який не був виконаний до цього, сам стає колбеком і "відходить" у **Event Loop**, щоб звільнити стек викликів та дати можливість колбеку повернутися з результатом. Тому ланцюжок подовжується на 1 мікротаск.

______________________________________________

### ![ico-25 cap] 13

◘◘![ico-25 cap] **13**◘◘

~~~js
const promise = message => new Promise(resolve => {
  const time = Math.round(Math.random() * 3000)
  setTimeout(() => resolve(`${message}: ${time}`), time)
})

const test = async () => await promise(await promise(await promise('start')))

test().then(response => console.log(response))
~~~

{{{async-await-13.js}}}

______________________________________________

### ![ico-25 cap] 14

Оголосимо допоміжну функцію:

~~~js
const createElem = tag => document.body.appendChild(document.createElement(tag))
~~~

◘◘![ico-25 cap] **14**◘◘

~~~js
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  style: `
    padding: 8px 16px;
    border-radius: 4px;
  `,
  onchange: event => resolve(event.target.value)
}))

const func = async () => Object.assign({}, {
  name: await promise('Your name'),
  hobby: await promise('Your hobby'),
  speciality: await promise('Your speciality')
})

func().then(response => console.log(response))
~~~

{{{async-await-9.js}}}

______________________________________________

### ![ico-25 cap] 15

◘◘![ico-25 cap] **15**◘◘

~~~JS
const promise = message => new Promise(resolve => Object.assign(createElem('input'), {
  placeholder: message,
  onchange: event => resolve(event.target.value)
}))

const func = async () => {
  const user = {}
  const messages = ['name', 'hobby', 'speciality']

  const responses = await Promise.all(messages.map(message => promise(message)))

  responses.forEach((val, index) => Object.assign(user, { [messages[index]]: val }))
  return user
}

func().then(console.log)
~~~

{{{async-await-10.js}}}

______________________________________________

### ![ico-25 cap] 16

Зафіксуємо значення поточного часу в змінній **~start~** і оголосимо допоміжні функції **~getRandom~** і **~test~**:

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

Тепер оголосимо функції **~func~** і **~createPromise~**:

~~~js
function func (name, time, callback) {
  test(time)
    ? callback(`${name}: ${time}`)
    : requestAnimationFrame(func.bind(null, name, time, callback))
}

function createPromise (name, time) {
  return new Promise(func.bind(null, name, time))
}
~~~

Тепер запустимо код:

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

Як бачите, повідомлення відображаються у випадковому порядку, залежно від того, яке значення повертала функція **~getRandom~** для кожного промісу.
Задача - синхронізувати потрапляння колбеків у стек викликів так, щоб спочатку в консолі вивелося "**_First_**", потім "**_Second_**", а потім "**_Third_**".

◘◘**Ланцюжок промісів**◘◘

~~~js
createPromise('First', getRandom())
  .then(console.log)
  .then(() => createPromise('Second', getRandom()).then(console.log))
  .then(() => createPromise('Third', getRandom()).then(console.log))
~~~

◘◘**Асинхронна функція**◘◘

~~~js
const showResults = async () => {
  const promises = ['First', 'Second', 'Third']
    .map(name => createPromise(name, getRandom()))

  for (const promise of promises) console.log(await promise)
}

showResults()
~~~

Отже, асинхронна функція може слугувати «обгорткою» для кількох асинхронних операцій, виконання яких потрібно впорядкувати в часі, тобто зробити так, щоб їхні колбеки відпрацьовували в заданій послідовності.

________________________________

### ![ico-25 cap] 17

Розглянемо суто умоглядний варіант
(на практиці таке робити не треба):

◘◘![ico-25 cap] **17**◘◘

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const users = ['Stephan', 'Andry']
  .reduce(async (result, item) => {
    const data = await (await fetch(`${origin}/users?name=${item}`)).json()
    result = await result
    result.push(data[0])
    return result
  }, [])
~~~

На що тут слід звернути увагу:

методу **~reduce~** передається асинхронна функція, яка повертає екземпляр ~Promise~.
Тому після кожної ітерації змінна **~result~** буде посиланням на екземпляр ~Promise~,
який треба резолвити за допомогою **~await~**.

У результаті роботи скрипта у змінній **~users~** буде екземпляр ~Promise~.
Витягнемо результат:

~~~js
users.then(console.log)
~~~

![ico-20 yes] Увага, щоб скоротити кількість звернень до сервера, краще зробити так:

~~~js
fetch(`${origin}/users?name=Stephan&name=Andry`)
  .then(response => response.json())
  .then(console.log)
~~~

или так:

~~~js
const origin = 'https://garevna-json-server.glitch.me'

const getEndpoint = userList => userList
  .reduce((result, item, index) => result += `${index > 0 ? '&' : ''}name=${item}`, '')

const getUsers = async userList => await (await fetch(`${origin}/users?${getEndpoint(userList)}`)).json()

getUsers(['Stephan', 'Andry'])
  .then(console.log)
~~~

___________________________________________

### ![ico-25 cap] 18

~~~js
const origin = 'https://api.github.com'

const addElem = tagName => document.body
  .appendChild(document.createElement(tagName))
~~~

◘◘![ico-25 cap] **18**◘◘

~~~js
async function getUsersData (userName) {
  const userData = await (await fetch(`${origin}/users/${userName}`)).json()

  addElem('img').src = userData.avatar_url

  const userRepos = await (await fetch(userData.repos_url)).json()

  for (const item of userRepos) addElem('div').innerText = item.events_url

  return 'Ready'
}

getUsersData('garevna').then(console.log)
~~~

_________________________________________

### ![ico-25 cap] 19

Розширимо прототип конструктора **~Object~** методом **~addElem~**:

◘◘Object◘◘
~~~js
Object.prototype.addElem = function (tagName) {
  const elem = document.body
    .appendChild(document.createElement(tagName))
  Object.assign(elem, {
    addChar (char) {
      elem.textContent += char
    },
    replace (text) {
      elem.textContent = text
    }
  })
  return elem
}
~~~

Як ми можемо бачити, доданий елемент матиме два методи: **~addChar~** та **~replace~**, які дозволяють змінювати текстовий вміст елемента.

Тепер розширимо прототип конструкторів **~String~** та **~Number~** методом **~then~**:

◘◘String◘◘
~~~js
String.prototype.then = function () {
  const placeholder = this.addElem('div')
  this
    .split('')
    .forEach((char, index) => setTimeout(() => placeholder.addChar(char), 1000 * index))
}
~~~

◘◘Number◘◘

~~~js
Number.prototype.then = function () {
  const placeholder = this.addElem('div')
  for (let ind = 0; ind <= this; ind++) {
    setTimeout(() => placeholder.replace(ind), 1000 * ind)
  }
}
~~~

Тепер ви можете створити "простенькі" функції **~typeWritter~** і **~showNumber~**:

◘◘![ico-25 cap] **19**◘◘

~~~js
const typeWritter = async string => await Object(string)
const showNumber = async number => await Object(number)

typeWritter('Welcome')
showNumber(11)
~~~

_________________________________________

[:::**20**:::](https://plnkr.co/edit/3JMiqa1CFLK55hgx/)

_______________________
[![ico-30 hw] Quiz](quiz/async)
