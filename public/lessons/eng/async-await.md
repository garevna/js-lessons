# ![ico-30 study] async | await

**ECMAScript 2017**

________________________________________________________________________________________________

[►►►**Constructor AsyncFunction**►►►](page/async-constructor)

________________________________________________________________________________________________

Two short words that have fantastically changed our reality.
Two words that trigger a powerful mechanism for controlling the element of events.
Words that completely liberated us from the slavery of events, allowed us to "saddle" the wild horse of asynchronousness.
In short, the magic continues... Promises were only the beginning.

## ![ico-25 icon] async function

To declare an asynchronous function, use **~async~** keyword before the **_function_** keyword:

~~~js
async function sigma () {
  ...
}
~~~

For arrow functions:

~~~js
const sayHello = async () => 'Hello'
~~~

What does this change in our lives?

![ico-25 warn] **Calling an asynchronous function returns a promise**.

Therefore, the asynchronous function is a more concise way to create promises than the **~Promise~** constructor.

Now, instead of creating a promise in the traditional way (using the constructor):

~~~js
const createPromise = message => new Promise(resolve => resolve(message))
~~~

we can make our code much shorter and more readable:

~~~js
const createPromise = async message => message
~~~

**~createPromise~** function in both cases creates a promise, but in the second case, we don't explicitly call the **~Promise~** constructor.

What will the promise returned by an asynchronous function be resolved by?

~~~js
createPromise('Promise is microtask')
  .then(response => console.log(response))
~~~

![ico-20 warn] It will be resolved by what the asynchronous function returns using the **~return~** statement.
^^If there is no ~return~ statement in the asynchronous function, then the promise returned by it will be resolved with the value ~undefined~.^^

______________________________________________

In the following examples, we will plot functions asynchronously by points.
Since we will be displaying function graphs on the page, we need to decide in which container these graphs will be.

~~~js
const section = document.body
section.style = 'padding: 120px;'
~~~

Also let's create a helper function **~createPoint~**:

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

and two more helper functions **~sin~** and **~cos~**:

~~~js
const step = Math.PI / 10

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)
~~~

Note that we haven't used the async function so far.

And now it will appear:

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

Here we see the anonymous function **~async () => sin()~**.
We already know that it returns **~promise~**.

^^^[![ico-30 eyes]]

^^Of course, we could have written it this way as well to demonstrate chained computation:^^

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

^^but using a recursive function makes the code much shorter, although not as visual.^^

^^^

In this example, we took advantage of the fact that not only the asynchronous function, but also the **~then~** method returns **~promise~**.
This ensures that each point of each graph is built by a callback function (microtask), meaning that the page does not lose interactivity for the duration of the graphs.

And now let's show more clearly how microtasks one by one are coming into the call stack, which gives the impression that the graphs of functions are drawn simultaneously, although in fact one point of the graph of the function ~sin~ is drawn first, followed by one point of the graph of ~cos~, then one point of the graph of ~sin~ again, and so on.

_________________________________________

To make the process more visual, let's use the method of the global object **~requestAnimationFrame~**.

◘◘![ico-25 cap] ** 2**◘◘

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

and then make sure that drawing function graphs does not block the animation of the figure in our example:

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

◘◘![ico-25 cap] ** 3**◘◘

◘◘![ico-25 cap] ** 3**◘◘

~~~js
recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
~~~

{{{async-await-03.js}}}

And this is just the beginning.
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

### ![ico-20 icon] await

^^Otherwise an exception will be thrown:^^

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

Let's understand what the engine does when it encounters the **~await~** keyword.

Firstly, the **~await~** keyword is always followed by some expression.

~~~js
const test = async () => console.log(await user)
test()
console.log('finish')
~~~
~~~console
finish
Polina
~~~

We know that when the engine meets an expression in our code, it calculates the value of that expression, and replaces that expression with the calculated value.
So, let's see what can follow the keyword **~await~**, and how the engine will behave in each case.

We'll look at cases where the **~await~** keyword is followed by:

1. an instance of ~Promise~ (our ‘magic box with two holes’);
2. an object that has a **~then~** method;
3. any expression whose value will be a reference to an array or object, a string, or a number, or a boolean value, as well as ~null~ and ~undefined~.
Why do we consider these options separately?
Because the engine behaviour will be different in each of these cases.

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

### ![ico-20 icon] await &lt;promise>

Let's create two auxiliary functions:
◘◘![ico-25 cap] ** 4**◘◘
We can then use the **~then()~** method of this ‘box’ (instance of ~Promise~) to pass a callback function that will ‘take’ the result that the promise is resolved to.

@@@@ 2
Now let's see how the **~await~** keyword can be used, and how its operation differs from that of the **~then()~** method of ~Promise~ instance.
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

Or so:

So far, no differences have been observed.

That is, the keyword **~await~** calls the method **~then()~** of the ~Promise~ instance which comes after **~await~**.
But a question arises: the method **~then()~** of a ~Promise~ instance should get a references to callback functions as an arguments.
However, the expression:
does not contain any callback function. Not even a hint.

Let's figure out what is going on there.

When the constructor **~Promise~** was called, it was passed a function with two formal parameters.

This function was called, and received two references to callback functions as arguments when called.
As we can see, these are some kind of default callback functions.

{{{async-await-05.js}}}

They ‘take’ the result and put it into our ‘magic box with two holes’.

Therefore, it is logical to assume that these colbeks have this code:
Let's see what **~await~** does:

◘◘resolve◘◘
As you can see, **~await~** calls **~then~** method, but passes it only one callback (**~resolve~**).

In the case of a rejection, control will be ‘hijacked’ by the engine, which will throw an exception to the console.

That's why you should use the **~catch~** method to ‘catch’ exceptions:

_________________________________________

### ![ico-20 icon] await &lt;expression>

Let’s say we have a function **~func~** like this:
If we'll use the method **~then~** of the ~Promise~ instance to pass the second callback function (**~reject~**):
◘◘**^^Promise^^**◘◘

If we'll use the keyword **~await~**:

~~~js
response => response
~~~
◘◘**^^async function^^**◘◘

Thus, if a **~await~** keyword is followed by a promice, the engine will call the **~then~** method of that promice, but ![ico-20 warn] without passing the second callback function (**~reject~**).

What if after the keyword **~await~** there is not a ~Promise~ instance but any other object?
Or even not an object, but some string, or a number, or a logical value?

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

## ![ico-20 icon] Examples

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

Let's create an object which has the method **~then()~**:

![](illustrations/async-await-7.gif)

__________________________________________________________________________

### ![ico-25 cap] 8

◘◘![ico-25 cap] ** 5**◘◘
However, let's see what happens when this code is executed:

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

As you can see, when the engine detected the keyword **~await~**, it didn't bother much about what expression followed it, and it wasn't bothered at all by the fact that it wasn't a ~Promise~ instance.

The engine detected that it is an object that has a **~then()~** method.
And what do we see? The **~then()~** method of the **~user~** object was called!
But there is one mystery here:

The **~then()~** method of the **~user~** object is a higher-order function,

~~~js
;(async () => await 'async-await')().then(console.log)

;(async () => 'async')().then(console.log)

Promise.resolve('promise').then(console.log)
~~~

i.e. it expects to receive one mandatory argument when called - **function**.

~~~console
async
promise
async-await
~~~

But we did not pass any argument to the **~then()~** method of the **~user~** object.

Moreover, we didn't call it at all!

It turns out that the engine not only called the **~then()~** method of the **~user~** object, but also passed a certain function as an argument to it.

~~~js
;(async () => await 'async-await-1')().then(console.log)
~~~

Question: what callback did the engine pass to the **~then()~** method of the **~user~** object?

~~~js
new Promise(resolve => resolve('async-await-2'))
  .then(response => response)
  .then(console.log)
~~~

From the behaviour of the method **~then()~**, it seems that it has received this callback:

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

i.e. callback function, which operates according to the principle: ‘What I get is what I give back’.

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

As you can see, when the engine meets one small word **~await~**, it starts a flurry of activity.
One last ‘touch’: in the previous example, the method **~then~** of the **~user~** object was a higher-order function, i.e. it took a function as an argument.

Let's see what happens if the **~then~** method is an ordinary function:

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

As you can see, the string:

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

was never executed.

~~~js
const start = Date.now()

const getRandom = () => Math.round(Math.random() * 5000)

const test = ms => Date.now() - start >= ms
~~~

This means that the asynchronous function is waiting for the return of the callback function, but there is no callback function at all, and the asynchronous function could not resume its execution after **~await~**.

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

That is, the asynchronous function could return from the **Event Loop** only after the return of the callback function sent there by the method **~then~**.

◘◘![ico-25 cap] **16**◘◘

~~~js
;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(console.log))
~~~

{{{async-await-16.js}}}

But the method **~then~** didn't send anything to the event loop.

![ico-25 warn] Be careful!

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

or like this:

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
