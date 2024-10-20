# ![ico-30 study] async | await

**ECMAScript 2017**

________________________________________________________________________________________________

[►►►**Конструктор AsyncFunction**►►►](page/async-constructor)

________________________________________________________________________________________________

Два коротких слова, фантастически изменившие нашу реальность.
Два слова, которые запускают мощный механизм управления стихией событий.
Слова, полностью освободившие нас из рабства событий, позволившие нам "оседлать" дикого скакуна асинхронщины.
Короче, магия продолжается... промисы были только началом.

## ![ico-25 icon] async function

Для объявления асинхронной функции используется ключевое слово **~async~** перед ключевым словом **_function_**:

~~~js
async function sigma () {
  ...
}
~~~

Для стрелочных функций:

~~~js
const sayHello = async () => 'Hello'
~~~

Что это меняет в нашей жизни?

![ico-25 warn] **Вызов асинхронной функции возвращает промис**.

Поэтому асинхронная функция является более лаконичным способом создавать промисы, чем конструктор **~Promise~**.

Теперь вместо того, чтобы создавать промис традиционным образом (с помощью конструктора):

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

мы можем сделать свой код значительно короче и читабельнее:

~~~js
const createPromise = async message => message
~~~

Функция **~createPromise~** и в первом, и во втором варианте создает промис, однако во втором варианте мы обходимся без явного вызова конструктора **~Promise~**.

Чем резолвится промис, возвращаемый асинхронной функцией?

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

![ico-20 warn] Тем, что возвращает асинхронная функция с помощью оператора **~return~**.
^^Если в асинхронной функции нет оператора ~return~, то возвращаемый ею промис будет резолвиться значением ~undefined~.^^

______________________________________________

В следующих примерах мы будем асинхронно по точкам строить графики функций.
Поскольку мы будем выводить графики функций на страницу, нужно определиться, в каком именно контейнере будут эти графики.

~~~js
const section = document.body
section.style = 'padding: 120px;'
~~~

Также создадим вспомогательную функцию **~createPoint~**:

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

и еще две вспомогательные функции **~sin~** и **~cos~**:

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

Обратите внимание, что до сих пор мы не использовали асинхронную функцию.

А вот теперь она появится:

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

Здесь мы видим анонимную асинхронную функцию **~async () => sin()~**.
Мы уже знаем, что она возвращает **~promise~**.

^^^[![ico-30 eyes]]

^^Конечно, для демонстрации цепочных вычислений мы могли записать и так:^^

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

^^однако использование рекурсивной функции делает код намного более коротким, хотя и не таким наглядным.^^

^^^

В этом примере мы воспользовались тем,
что не только асинхронная функция, но и метод **~then~** возвращает **~promise~**.

Благодаря этому каждая точка каждого графика строится колбеком промиса (микротаском), т.е. страница не теряет интерактивность на время построения графиков.

_________________________________________

А теперь покажем более наглядно, как микротаски пропускают друг друга по очереди в стек вызовов, от чего складывается впечатление, что графики функций отрисовываются одновременно, хотя на самом деле сначала отрисовывается одна точка графика функции синус, за ней - одна точка графика косинуса, потом опять одна точка синуса, и т.д.

Для того, чтобы сделать процесс более наглядным, воспользуемся методом глобального объекта **~requestAnimationFrame~**.

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

Для пущей убедительности добавим еще анимированную фигуру:

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

и убедимся, что в нашем примере отрисовка графиков функций не блокирует анимацию фигуры:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

Ваши алодисменты, господа! Асинхронная функция их точно заслужила.
И это только начало.

________________________________________________________________________________________________

## ![ico-25 icon] await

![ico-20 warn] Ключевое слово  **~await~**  можно использовать только внутри **асинхронных функций**.

^^В противном случае будет сгенерировано исключение:^^

~~~error
    Uncaught SyntaxError: await is only valid in async function
~~~

Давайте разберемся, что делает движок, когда встречает ключевое слово **~await~**.
Во-первых, за ключевым словом **~await~** всегда следует какое-то выражение.
Мы знаем, что когда движок встречает в нашем коде выражение, он вычисляет значение этого выражения, и заменяет это выражение на вычисленное значение.
Итак, разберемся, что может следовать за ключевым словом **~await~**, и как будет вести себя движок в каждом случае.

Мы рассмотрим варианты, когда за ключевым словом **~await~** следует:
1.  промис - наша "магическая коробка с двумя дырками";
2. объект, имеющий метод **~then~**;
3. любое выражение, значением которого будет ссылка на массив или объект, строка, или число, или логическое значение, а так же ~null~ и ~undefined~.

Почему мы отдельно рассматриваем эти варианты?
Потому что поведение движка будет различным в каждом из этих случаев.

_____________________________________

### ![ico-20 icon] await &lt;promise>

Первым делом посмотрим, что произойдет, если после ключевого слова **~await~** находится ссылка на нашу "магическую коробку с двумя дырками".

Создадим две вспомогательные функции:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const random = num => Math.round(Math.random() * num)

const func = (message, resolve) => setTimeout(() => resolve(message), random(5000))

const createPromise = message => new Promise(func.bind(null, message))
~~~

Итак, мы можем создать "магическую коробку с двумя дырками" методом **~createPromise~**.
Затем мы можем использовать метод **~then()~** этой "коробки" (промиса) для передачи колбека (функции обратного вызова), который "заберет" результат, которым резолвится промис.

~~~js
createPromise('Resolved!').then(console.log)
~~~
~~~console
Resolved!
~~~

А теперь посмотрим, как можно использовать ключевое слово **~await~**, и чем отличается его работа от работы метода **~then()~** промиса.

~~~js
const asyncFunc = async () => console.log(await createPromise('Resolved!'))

asyncFunc()
~~~

~~~console
Resolved!
~~~

Или так:

~~~js
(async () => console.log(await createPromise('Resolved!')))()
~~~

~~~console
Resolved!
~~~

Пока никаких отличий не наблюдается.
Т.е. ключевое слово **~await~** вызывает метод **~then()~** промиса, который стоит после **~await~**.
Но возникает вопрос: метод **~then()~** промиса должен получить в качестве аргумента ссылку на колбек-функции.
Однако выражение:
~~~js
await createPromise('Resolved!')
~~~
никакой колбек-функции не содержит. Даже намека.
Давайте разберемся, что же там происходит.

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

При вызове конструктора **~Promise~** ему была передана функция с двумя формальными параметрами.
Она была вызвана, и получила при вызове в качестве аргументов два колбека.
Как мы видим, это некие дефолтные колбеки.
Они "забирают" результат и помещают его в нашу "магическую коробку с двумя дырками".

Поэтому логично предположить, что эти колбеки имеют такой код:

~~~js
result => result
~~~

Посмотрим, что делает **~await~**:
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

Сравним это поведение с явным вызовом метода **~then~** промиса с передачей ему двух колбеков:

~~~js
Promise.reject('Failure.')
  .then(console.log, console.warn)
~~~

~~~warn
    Failure.
~~~

Как видите, **~await~** вызывает метод **~then~**, но передает ему только один колбек (**~resolve~**).
В случае реджекта управление будет "перехвачено" движком, который выбросит в консоль исключение.

Поэтому для "перехвата" исключений стоит использовать метод **~catch~**:

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

Пусть у нас есть такая функция:

~~~js
const func = (resolve, reject) => Math.random() > 0.5 ? resolve('Success.') : reject('Failure.')
~~~

Если мы воспользуемся методом **~then~** промиса для передачи второго колбека **~reject~**:

◘◘**^^Promise^^**◘◘

~~~js
new Promise(func)
  .then(console.log, console.warn)
~~~

то исключение будет "перехвачено", и в консоли будет предупреждение.

Если же мы воспользуемся ключевым словом **~await~**:

◘◘**^^async function^^**◘◘

~~~js
async function test () {
  console.log(await new Promise(func))
}
~~~

Тогда в случае "отказа" промиса будет сгенерировано исключение:

~~~error
    Uncaught (in promise) Failure.
~~~

Таким образом, если за ключевым словом **~await~** следует промис, то движок вызовет метод **~then~** этого промиса, но ![ico-20 warn] без передачи второго колбека (**~reject~**).

~~~js
new Promise(func).then(console.log)
~~~

________________________________________

А если после ключевого слова **~await~** будет не промис, а любой другой объект?
Или даже не объект, а какая-то строка, или число, или логическое значение?

_____________________________________

### ![ico-20 icon] Объект с методом then

Давайте создадим объект, у которого есть метод **~then()~**:

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

Очевидно, что объект **~user~** **не** является промисом, и никакой асинхронщины пока не наблюдается.

Однако посмотрим, что произойдет при выполнении кода:

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

Как видим, движок, обнаружив ключевое слово **~await~**, не сильно напрягался с тем, что за выражение следует за ним, и его ничуть не смутило то, что это не промис.
Движок обнаружил, что это объект, у которого есть метод **~then()~**.

И что мы видим? Метод **~then()~** объекта **~user~** был вызван!

Но тут есть одна загадка:
Метод **~then()~** объекта **~user~** является функцией высшего порядка,
т.е. он ожидает при вызове получить один обязательный аргумент - **функцию**.
Но мы не передавали никакого аргумента методу **~then()~** объекта **~user~**.
Более того, мы его вообще не вызывали!

Получается, что движок не только сам вызвал метод **~then()~** объекта **~user~**,
но еще и передал ему некую функцию в качестве аргумента.

Вопрос: какой колбек передал движок методу **~then()~** объекта **~user~**?

Судя по поведению метода **~then()~**, он получил вот такой колбек:

~~~js
response => response
~~~

т.е. колбек, действующий по принципу: "Что получил - то и отдаю".

Как видите, встретив одно маленькое слово **~await~**, движок развивает довольно бурную деятельность.

Последний "штрих": в предыдущем примере метод **~then~** объекта **~user~** был функцией высшего порядка, т.е принимал в качестве аргумента функцию.
Давайте посмотрим, что произойдет, если метод **~then~** будет обычной функцией:

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

Как видите, строка

~~~js
console.log('Hi from Event Loop')
~~~

так и не была выполнена.
Это означает, что асинхронная функция так и не дождалась возвращения колбека (потому, что его не было), и не смогла возобновить свое выполнение после **~await~**.
Т.е асинхронная функция могла вернуться из цикла событий только после возвращения оттуда колбека, отправленного туда методом **~then~**.
Но метод **~then~** не отправил ничего в цикл событий.
Будьте внимательны!

_____________________________________

### ![ico-20 icon] Вспомним обещания

Мы с вами уже говорили, что экземпляр конструктора **~Promise~** - это магическая коробка с двумя дырками.
Методы **~then()~** и **~catch()~** - это и есть "дырки" в коробке.
Через эти "дырки" мы всовываем свои колбеки, и коробка "обещает" нам, что как только в ней появится содержимое, то один из наших колбеков его получит.

@@@@ 2
Когда в коробке появится содержимое - неизвестно.<br>Каким будет это содержимое - "белым шаром" (**response**) или "черным шаром" (**error**) - тоже неизвестно.
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

Надо отметить, что коробка промиса знает, что ей нужно "поймать" белый или черный шар, когда он прилетит.

И магическая коробка отправляет свои собственные колбеки за белым и черным шаром в **Event Loop**.

Колбеки уже "сидят" в таблице эвентов "в засаде".
Они "ловят шары" за нас.
Когда поймают, то положат в магическую коробку экземпляра **~Promise~**.
Они привязаны, соответственно, к таким событиям:

1. "Прилетел белый шар" (response)

2. "Прилетел черный шар" (error)

Назад из **Event Loop** вернется только один из них.
В коробке экземпляра **~Promise~** появится содержимое.

{{{async-await-05.js}}}

Теперь магическая коробка с двумя дырками ждет, когда вы всунете в эти дырки свои "руки" (колбеки **~resolve~** и **~reject~**), которым можно будет отдать прилетевший шар.

Возможно, что вы уже "всунули руки" раньше, тогда вы получите шар, как только он появится в коробке экземпляра **~Promise~**.
В противном случае шар будет лежать в коробке, пока вы не воспользуетесь методами **~then()~** и **~catch()~**, т.е. пока вы не "всунете руки", чтобы забрать шар.

![ico-30 point_up] Отсюда вытекает, что магическая коробка синхронизирует два автономных асинхронных процесса.
В этом и заключается магическая сила коробки с двумя дырками.

Т.е. магическая коробка промиса посылает "сбегать за шариком" свои собственные колбеки, а потом ждет, когда вы всунете руки (колбеки) в дырки **~then()~** и **~catch()~**, чтобы отдать находящийся на хранении шарик.

^^Причем в одну дырку **~then()~** вы можете всунуть обе руки (**~resolve~** и **~reject~**), хотя использование второй дырки **~catch()~** в некоторых случаях избавляет вас от сообщений об ошибке в консоли. Старайтесь не заставлять консоль краснеть за вас ![ico-20 smile].^^

_________________________________________

### ![ico-20 icon] await &lt;expression>

Итак, движок сталкивается с выражением ~**await** &lt;expression>~.
Ему нужно вычислить значение этого выражения.
![ico-25 warn] Пока он его не вычислит и не заменит выражение ~await &lt;expression>~ на полученное (вычисленное) значение, он не сдвинется к следующей строчке кода асинхронной функции.

Если значением ~<expression>~ будет ссылка на экземпляр **~Promise~**, то движок вызовет метод **~then()~** этого экземпляра, передаст ему колбек:

~~~js
response => response
~~~
и приостановит выполнение кода асинхронной функции до тех пор, пока колбек не вернется из **Event Loop** с "шариком" результата (~response~) и не положит его в коробку промиса.

После того, как результат появится в коробке, движок вытащит его из коробки и вставит на место выражения ~await &lt;expression>~.

Мы уже задались вопросом, что будет делать движок, если ~&lt;expression>~ не будет промисом.
И мы уже разобрались, что будет делать движок, если ~&lt;expression>~ будет объектом, у которого есть метод **~then()~**.

Теперь посмотрим, что будет делать движок, если ~&lt;expression>~ будет строкой, или числом, или другим значением.

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

В этом примере нужно внимательно следить за последовательностью вывода сообщений в консоль:

~~~console
Start
Async function starts
Finish
Hello!
Async function finished
undefined
~~~

Все, что выведено в консоль после сообщения **_Finish_** - это функции обратного вызова, которые "прошли" через **Event Loop**.
Если они выведены до ~undefined~ - это **микротаски**.

Итак, движок благополучно выводил в консоль ^^**_Start_**^^, затем наткнулся на функциональное выражение ([IIFE](page/Closure#IIFE)) и начал "вычислять" значение выражения в круглых скобках. А в круглых скобках - объявление анонимной асинхронной функции. Движок передает управление конструктору, который создает эту функцию и возвращает ссылку на нее. Движок, получив ссылку на функцию, вызывает ее, поскольку далее следуют курглые скобки (вызов функции).
Анонимная асинхронная функция начинает выполняться, и в консоль выводится сообщение ^^**_Async function starts_**^^.
Однако уже в следующей строчке кода функции движок "наткнулся" на выражение:
~~~js
console.log(await 'Hello!')
~~~
Здесь движок понимает, что нужно послать колбек ~() => 'Hello!'~ в **Event Loop**, и функция должна дождаться его возвращения, чтобы завершить выполнение этой строчки кода. Далее код функции выполняться не может, пока не вернется колбек. А вернуться он может только тогда, когда стек вызовов будет свободен.
Итак, движку нужно на время "избавиться" от этой функции, но так, чтобы после возвращения колбека ~() => 'Hello!'~ можно было возобновить ее выполнение.
Как это можно сделать?

Например, заменив оставшийся невыполненым код функции:

~~~js
console.log(await 'Hello!')
console.log('Async function finished')
~~~

на вот такой код:

~~~js
Promise.resolve('Hello!')
  .then(message => {
    console.log(message)
    console.log('Async function finished')
  })
~~~

И далее движок продолжает выполнять код скрипта со строчки:

~~~js
console.log('Finish')
~~~

после чего стек вызовов освобождается, и из **Event Loop** возвращается колбек:

~~~js
message => {
  console.log(message)
  console.log('Async function finished')
}
~~~

который получил message со значением 'Hello!'.

Таким образом, появление ключевого слова **~await~** приводит к тому, что невыполненный остаток кода асинхронной функции становится колбеком.

_____________________________________________

## ![ico-20 icon] Примеры

### ![ico-25 cap] 7

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

В этом примере мы специально дали имя **~test~** функции, чтобы отслеживать ее появление в стеке вызовов.

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8

В этом примере код основного потока отработает при значении ** 5** переменной ~num~.
Однако вызов асинхронной функции ~sample()~ приведет к тому, что после завершения работы кода основного потока значение переменной ~num~ будет уже 10.

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

Заметим, что:

1. Промис, возвращенный функцией ~async () => await 'async-await'~, разрезолвился последним, хотя это первая строчка кода.
2. Первым разрезолвился ~Promise.resolve('promise')~ (вторая строчка кода).
3. Вторым разрезолвился промис, возвращенный функцией ~async () => 'async'~ (третья строчка кода).

Сделав "рокировку" второй и третьей строчек кода:

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

мы увидим, что порядок вывода в консоль изменился соответствующим образом:

~~~console
async
promise
async-await
~~~

то есть их колбеки попадают в очередь микротасков в той же последовательности, в какой они появились в коде.

А вот с функцией ~async () => await 'async-await'~ все иначе.

Покажем, что код:

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

работает идентично коду:

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

Для этого запустим их сначала в такой последовательности:

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

а затем поменяем порядок их следования:

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

Как мы видим, они резолвятся строго в порядке их следования в коде.
Т.е. появление ключевого слова **~await~** удлиняет цепочку проходящих через **Event Loop** колбеков на 1, что и приводит к тому, что в примере 12 последним "приходит к финишу" ~;(async () => await 'async-await')().then(console.log)~.

Как мы уже говорили ранее, сама асинхронная функция прерывается в точке, где встречается **~await~**, и остаток кода этой функции, который не был выполнен до этого, сам становится колбеком и "уходит" в **Event Loop**, чтобы освободить стек вызовов и дать возможность колбеку вернуться с результатом. Поэтому цепочка удлиняется на 1 микротаск.

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

Объявим вспомогательную функцию:

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

Зафиксируем значение текущего времени в милисекундах в переменной **~start~** и объявим вспомогательные функции **~getRandom~** и **~test~**:

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

Теперь объявим функции **~func~** и **~createPromise~**:

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

Теперь выполним код:

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

Как вы можете убедиться, сообщения выводятся в случайном порядке, в зависимости от того, какое значение вернула функция **~getRandom~** для каждого промиса.

Задача - синхронизировать попадание коллбэков в стек вызовов так, чтобы первым в консоль было выведено "**_First_**", затем "**_Second_**", а затем "**_Third_**".

◘◘**цепочка промисов**◘◘

~~~js
createPromise('First', getRandom())
  .then(console.log)
  .then(() => createPromise('Second', getRandom()).then(console.log))
  .then(() => createPromise('Third', getRandom()).then(console.log))
~~~

◘◘**асинхронная функция**◘◘

~~~js
const showResults = async () => {
  const promises = ['First', 'Second', 'Third']
    .map(name => createPromise(name, getRandom()))

  for (const promise of promises) console.log(await promise)
}

showResults()
~~~

Итак, асинхронная функция может служить "оберткой" для нескольких асинхронных операций, выполнение которых можно упорядочить во времени, т.е. сделать так, чтобы их коллбэки отрабатывали в заданной последовательности.

________________________________

### ![ico-25 cap] 17

Рассмотрим чисто умозрительный вариант
(на практике такое делать не надо):

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

На что здесь следует обратить внимание:

методу **reduce** передается асинхронная функция, которая возвращает промис.
Поэтому после каждой итерации переменная **result** будет промисом,
и ее надо резолвить с помощью **await**.

В результате работы скрипта в переменной **users** будет промис.
Извлечем результат из промиса:

~~~js
users.then(console.log)
~~~

![ico-20 yes] Внимание, чтобы сократь число обращений к серверу, лучше сделать так:

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

Расширим прототип конструктора **~Object~** методом **~addElem~**:

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

Как мы видим, добавленный элемент будет иметь два метода: **~addChar~** и **~replace~**, позволяющие модифицировать текстовое содержимое элемента.

Теперь расширим прототип конструкторов **~String~** и **~Number~** методом **~then~**:

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

Терерь можно создать "простенькие" функции **~typeWritter~** и **~showNumber~**:

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
