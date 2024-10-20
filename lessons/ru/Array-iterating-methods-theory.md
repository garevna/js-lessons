# Принцип работы итерирующих методов

[◄◄◄ Итерирующие методы массивов ◄◄◄](page/Array-iterating-methods.md)

Выведя в консоль свойство **_~prototype~_** конструктора массивов, можно убедиться, что эти структуры данных наследуют много методов, и некоторые из них мы уже знаем.

~~~js
console.log(Array.prototype)
~~~

{{{Array-iteration-methods-theory.js}}}

Часть методов, с которыми мы уже знакомы, выполняют какую-то операцию с массивом.
^^(добавляют элемент в массив, удаляют или заменяют элементы в массиве, объединяют несколько массивов в один и т.д.).^^

Итерирующие методы перебирают элементы массива один за другим строго в порядке возрастания их индексов.
^^(за исключением ~reduceRight~, который осуществляет перебор справа налево).^^

_Группа итерирующих методов массивов - пример реализации функциональной парадигмы в ООП._

Главное, что нужно помнить про итерирующие методы массивов - это **функции высшего порядка**.
Это будет напоминать вам, что ![ico-20 warn] **первым и обязательным аргументом итерирующего метода является функция**.

• метод будет перебирать элементы массива один за другим, пока не дойдет до конца массива.
• на каждой итерации метод будет вызывать переданную ему функцию-аргумент.
• при вызове функции-аргумента метод будет передавать ей значение текущего элемента массива.

_____________________________________________

## ![ico-25 icon] Декоратор цикла

Преимущества методов перед операторами цикла очевидны.
Например, с помощью методов мы организовываем цепочные вычисления, а операторы цикла "разбивают" красивую цепочку, нарушая гармонию нашего кода.

Циклы требуют от нас достаточно много рутинной работы: нам нужно инициализировать переменную цикла, определить, как она будет изменяться на каждой итерации, контролировать ее значение, чтобы во-время завершить цикл. Короче говоря, создать механизм цикла своими руками. Мы даже не будем обсуждать возможные ошибки, возникающие при этом.

Циклы ~for...of~ и ~for...in~ значительно облегчили работу по итерированию массивов и объектов. Однако это все еще операторы цикла, а не методы.

Когда мы "заворачиваем" цикл в функцию (метод), мы обеспечиваем возможность использования цепочных вычислений.

Итак, итерирующие методы можно интерпретировать как функциональные "обертки" для цикла ~for...of~.


◘◘![ico-20 cap] ** 1**◘◘

~~~js
Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

;[7, 4, 1].iterate(console.log)
~~~

В этом примере мы создали кастомный унаследованный метод массивов **~iterate~**
с формальным параметром ~func~ (^^function^^),
который перебирает в цикле ~for...of~ исходный массив
и на каждой итерации вызывает ~func~,
передавая ей очередной элемент исходного массива.

В этом примере метод **~iterate~** ничего не возвращает,
и он не мутирует исходный массив, т.е. не производит внешних эффектов.

Того же эффекта можно добиться с помощью рекурсии:

~~~js
Array.prototype.iterate = function (func, index) {
  if (typeof func !== 'function') throw new TypeError('First argument is not a function.')
  let number = typeof index === 'number' ? index : 0
  func(this[number])
  number++ < this.length - 1 && this.iterate.call(this, func, number)
}

;[7, 4, 1].iterate(console.log)
~~~

_____________________________________________

Если мы хотим, чтобы метод возвращал новый массив, достаточно сделать следующее:

◘◘![ico-20 cap] ** 2**◘◘

~~~js   
Array.prototype.iterate = function (func) {
  const res = []
  for (const item of this) res.push(typeof func === 'function' ? func(item) : item)
  return res
}

;[49, 4, 25].iterate(Math.sqrt)
~~~

Результат:

~~~console
► (3) [7, 2, 5]
~~~

В результате кастомный метод **~iterate~** будет "собирать" в массив ~res~
результаты вызова функции ~func~ на каждой итерации,
и возвращать массив ~res~.

~~~js
const squaring = num => Math.pow(num, 2)
;[7, 2, 5].iterate(squaring)
~~~

Результат:

~~~console
► (3) [49, 4, 25]
~~~

_____________________________________________

Мы можем напилить кастомный метод, фильтрующий исходный массив в соответствии с заданным условием.
Теперь функция ~func~ должна возвращать логическое значение.
Если для очередного элемента массива функция ~func~ вернет ~true~, то этот элемент попадет в результирующий массив ~res~.
В противном случае - нет.

◘◘![ico-20 cap] ** 3**◘◘

~~~js
Array.prototype.filtering = function (func) {
  const res = []
  for (const item of this) func(item) && res.push(item)
  return res
}

const func = num => num < 10
;[108, 24, 5, 17, 1, 7].filtering(func)
~~~

Результат:

~~~console
► (3) [5, 1, 7]
~~~

~~~js   
[7, 4, 1, 20, 8].filtering(item => item > 5)
~~~

Результат:

~~~console
► (3) [7, 20, 8]
~~~

_____________________________________________

## ![ico-25 icon] Передача ссылок

В этом месте функциональная чистота итерирующих методов, к сожалению, заканчивается.
**Ссылка - это "отмычка"**, и по ссылке функция может мутировать объект.
При этом, как правило, возникают побочные эффекты (side effects).

Есть два способа передачи ссылок в итерирующих методах массивов.
Первый - передача ссылки на контекста вызова функции-аргумента вторым аргументом метода.
Второй - передача ссылки на исходный массив самой функции-аргументу при вызове.

### ![ico-20 icon] Второй аргумент метода

Каждый метод может принимать два аргумента: функцию и ссылку на контекст вызова.

Кроме обязательного аргумента-функции, мы можем передать методу второй (опциональный) аргумент - ссылку на контекст вызова этой функции.
По сути, второй аргумент избавляет нас от необходимости явно биндить контект вызова функции, которая передается методу как аргумент.

◘◘ ![ico-25 cap] ** 4** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [7, 5, 0, 11]

Array.prototype.iterate = function (callback, context) {
  const res = []
  for (const item of this) {
    res.push(callback.call(context, item, this.indexOf(item), this))
  }
  return res
}

const sample = numbers.iterate(function (item, index, arr) {
  return this[index] + arr[index]
}, alter)

console.log(sample)
~~~

Результат:

~~~console
► (4) [15, 9, 9, 18]
~~~

◘◘ ![ico-25 cap] ** 5** ◘◘
~~~js
const numbers = [8, 4, 9, 7]
const alter = [-4, 1, -2, 0]

Array.prototype.iterate = function (callback, context) {
  const res = []
  const func = callback.bind(context)
  for (const item of this) res.push(func(item))
  return res
}

const sample = numbers.iterate(function (item) {
  return item + this.shift()
}, alter)

console.log(sample)
~~~

Результат:

~~~console
► (4) [4, 5, 7, 7]
~~~

Однако появляется побочный эффект - массив **alter** теперь пустой:

~~~js
console.log(alter) // []
~~~

Еще одно неудобство заключается в том, что при этом мы не можем передавать методу стрелочные функции, поскольку у них контекст вызова изменить невозможно.
Однако стрелочные функции делают код более лаконичным.

_____________________________________

### ![ico-20 icon] Передача ссылки на исходный массив функции-аргументу

Функция-аргумент может иметь три формальных параметра.
Первый - это текущий элемент массива.
Второй - это индекс текущего элемента массива.
Третий - это ссылка на исходный массив.

Передача этой "отмычки" функции-аргументу грубо разрушает функциональную чистоту метода и создает огромные возможности для побочных эффектов.

Следующий пример показывает, как это работает.


◘◘![ico-20 cap] ** 6**◘◘

~~~js
const numbers = [8, 4, 9, 7]

Array.prototype.iterate = function (func) {
  const res = []
  let index = 0
  for (const item of this) {
    res.push(func(item, index++, this))
  }
  return res
}

const sample = numbers.iterate((item, index, arr) => item * index - arr[0])

console.log(sample)
~~~

Результат:

~~~console
► (4) [-8, -4, 10, 13]
~~~

^^Функция **sample** получает в переменной **_arr_** ссылку на исходный массив **numbers**.^^

___________________________________________________

## ![ico-25 icon] Side effects

![ico-20 warn] Чистые функции, какими, по идее, должны были быть итерирующие методы, не порождают внешних эффектов, т.е. не мутируют никакие внешние переменные.
Итерирующие методы массивов - это функции высшего порядка, которые перебирают исходный массив, передавая функции-аргументу по очереди один элемент массива за другим.
Таким образом, функция-аргумент не имеет ссылки на сам исходный массив, и не может его мутировать.
_______________________
![ico-20 warn] Исключение - если элементы исходного массива имеют **ссылочный тип данных**, т.е. функция-аргумент получает ссылку на элемент массива.
______________________
Возвращается всегда новый массив (или не массив, как мы увидим позже, или вообще ничего).
Исходный массив, как правило, не изменяется.
Т.е. изначально это должны были быть чистые функции, не порождающие внешних эффектов, что их отличает от обычных методов массивов, таких как ~push()~, ~concat()~ и т.д.

Но мы уже показали ранее, что эта функциональная чистота нарушается передачей ссылок (методу - на контекста вызова функции-аргумента и на исходный массив - функции-аргументу).

Аналогично, если мы имеем дело с **глубокими структурами данных**, то происходит передача не значений, а ссылок, что создает возможность возникновения побочных эффектов.


◘◘![ico-20 cap] ** 7**◘◘

~~~js
const users = [
  { name: 'Helen', age: 25 },
  { name: 'Robert', age: 18 },
  { name: 'Mary', age: 20 },
  { name: 'Piter', age: 30 }
]

Array.prototype.iterate = function (func) {
  for (const item of this) func(item)
}

users
  .iterate(user => user.age++)
~~~

В этом примере мы итерируем массив объектов, т.е. имеем дело с глубокой структурой данных.
На каждой итерации функция-аргумент (~user => user.age++~) метода **~iterate~** получает ссылку на объект.
Это дает ей возможность мутировать исходный массив, поскольку

☼☼☼ ссылка - это отмычка ☼☼☼

В результате выполнения кода массив **users** будет таким:

~~~console
▼ (4) [{…}, {…}, {…}, {…}]
  ► 0: {name: 'Helen', age: 26}
  ► 1: {name: 'Robert', age: 19}
  ► 2: {name: 'Mary', age: 21}
  ► 3: {name: 'Piter', age: 31}
    length: 4
  ► [[Prototype]]: Array(0)
~~~

Мы видим, что возраст всех юзеров изменился, хотя мы не передавали ссылку на исходный массив **users**.
Но массив **users** является глубокой структурой данных, и его элементы имеют ссылочный тип,
поэтому функция-аргумент (~user => user.age++~) метода **~iterate~** получила "отмычку" и смогла мутировать объекты по сслыке.

Итак, side effects возникают вследствие передачи ссылок вместо значений.

_____________________________________________

Следующий пример показывает, что можно мутировать и саму функцию-аргумент:

◘◘![ico-20 cap] ** 8**◘◘

~~~js
var browsers = ['Chrome', 'FireFox', 'Opera', 'Safari', 'Edge']

const storeItem = function (item, index, arr) {
  this.history = Array.isArray(this.history) ? this.history : []
  this.history.push(item)
}

Array.prototype.iterate = function (func) {
  for (var item of this) func.call(func.prototype, item)
}

browsers.iterate(storeItem, storeItem)

console.dir(storeItem)
~~~

Результат в консоли:

~~~console
▼ ƒ storeItem(item, index, arr)
  ▼ history: Array(5)
      0: "Chrome"
      1: "FireFox"
      2: "Opera"
      3: "Safari"
      4: "Edge"
      length: 5
    ► __proto__: Array(0)
    arguments: null
    caller: null
    length: 3
    name: "storeItem"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

_____________________________________________

## ![ico-25 icon] Идемпотентность

Если метод при одном и том же значении аргументов возвращает один и тот же результат, то он **_идемпотентен_**.

^^т.е. при повторном вызове метода с одним и тем же массивом и функцией результат всегда будет одним и тем же.^^

В объектно-ориентированных языках идемпотентность методов практически недостижима, если аргументы функции являются ссылочным типом данных.
Поскольку массивы являются ссылочным типом, итерирующие методы работают со ссылкой, а не с коллекцией данных.
Ссылка остается той же самой, но от одного вызова метода до другого содержимое массива могло измениться, что отразится на результате.

Давайте попробуем создать идемпотентный метод:

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return res
}

numbers.idempotence(Math.sqrt)
~~~

Результат:

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

При первом вызове метода **~idempotence~** с данным массивом метод мутирует массив, добавляя ему свойство ~initialState~ и сохраняя в этом свойстве ссылку на исходное состояние массива.

При повторном вызове метод игнорирует все измения, которые могли произойти с массивом за время между первым и вторым вызовом метода, и работает с клоном ~initialState~.

~~~js
numbers[6] = 125

numbers.idempotence(Math.sqrt)
~~~

Результат:

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

Заметим, что при этом каждый раз метод будет возвращать новую ссылку, поскольку при каждом вызове метод создает новый массив, однако содержимое этого массива будет одним и тем же.

Для чистоты эксперимента можно возвращать JSON-строку свойства ~initialState~.

~~~js
Array.prototype.idempotence = function (func) {
  const res = []
  if (!this.initialState) this.initialState = JSON.parse(JSON.stringify(this))
  for (const item of this.initialState) res.push(func(item))
  return JSON.stringify(res)
}
~~~

Однако в данном примере мы использовали идемпотентный метод **~Math.sqrt~**.

Если же мы передадим методу **~idempotence~** функцию, которая не является идемпотентной, то метод не будет идемпотентным, поскольку при вызове с одним и тем же набором аргументов он будет возвращать различный результат:

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

В этом примере видно, что если функция, которую мы передаем методу **~idempotence~**, не является _идемпотентной_, то и результат работы метода будет варьировать, т.е. идемпотентность метода напрямую зависит от идемпотентности функции-аргумента.

Попробуем исправить эту ситуацию:

◘◘![ico-20 cap] **10**◘◘
~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]

Array.prototype.idempotence = function (func) {
  if (!this.initialState) {
    this.result = []
    this.initialState = JSON.parse(JSON.stringify(this))
    for (const item of this.initialState) this.result.push(func(item))
  }

  return JSON.stringify(this.result)
}

numbers.idempotence(Math.sqrt)
~~~

Результат:

~~~console
'[5,4,3,7,9,8,2]'
~~~

~~~js
numbers.idempotence(item => item + Math.floor(Math.random() * 100))
~~~

Результат:

~~~console
'[5,4,3,7,9,8,2]'
~~~

__________________________________
Попробуйте самостоятельно разобраться в следующем примере.

^^^[![](icons/coffee.png) 11]
~~~js
Array.prototype.idempotence = function (func) {
  const funcArg = func.toString()
  try {
    var sourceData = JSON.stringify(this)
  } catch (err) {
    console.warn(err)
    return null
  }

  const self = this.__proto__

  if (!self.funcs) self.funcs = []
  if (!self.data) self.data = []
  if (!self.results) self.results = []

  if (!self.funcs.includes(funcArg)) self.funcs.push(funcArg)
  if (!self.data.includes(sourceData)) self.data.push(sourceData)

  const index = self.funcs.indexOf(funcArg)
  const num = self.data.indexOf(sourceData)

  if (!self.results[num]) self.results[num] = []

  if (!self.results[num][index]) {
    const result = []
    for (const item of this) {
      result.push(func(item))
    }
    self.results[num][index] = result
  }

  return self.results[num][index]
}
~~~
^^^

~~~js
const numbers = [25, 16, 9, 49, 81, 64, 4]
numbers.idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
[25, 16, 9, 49, 81, 64, 4].idempotence(Math.sqrt)
~~~

~~~console
► (7) [5, 4, 3, 7, 9, 8, 2]
~~~

~~~js
numbers.idempotence(item => item + Math.floor(item + Math.random() * 100))
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

~~~js
const randomize = item => item + Math.floor(item + Math.random() * 100)
[25, 16, 9, 49, 81, 64, 4].idempotence(randomize)
~~~

~~~console
► (7) [87, 98, 42, 128, 184, 152, 79]
~~~

_____________________________________________

## ![ico-25 icon] Примеры

Передача контекста вызова

◘◘![ico-20 cap] **11**◘◘
~~~js
const jobs = [
  'developer',
  'worker',
  'salesman',
  'manager'
]

const users = [
  { name: 'Piter', job: 1 },
  { name: 'Helen', job: 2 },
  { name: 'Robert', job: 0 },
  { name: 'Michael', job: 1 },
  { name: 'Andrew', job: 0 },
  { name: 'Mary', job: 2 },
  { name: 'Gregory', job: 3 },
]

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  for (const item of this) result.push(func.call(context, item))
  return result
}

function showUser (user) {
  return `<p>${user.name}: ${this[user.job]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = users.iterate(showUser, jobs).join('')
~~~

_____________________________

Передача функции-аргументу второго (опционального) параметра (индекса текущего элемента массива).

◘◘![ico-20 cap] **12**◘◘

~~~js
const salary = [4000, 3200, 4500, 2800, 3500, 2400, 3700]

const workers = ['Piter', 'Helen', 'Robert', 'Michael', 'Andrew', 'Mary', 'Gregory']

Array.prototype.iterate = function (func, context) {
  if (typeof func !== 'function') throw new TypeError('First argument should be the function.')

  const result = []
  index = 0
  for (const item of this) result.push(func.call(context, item, index++))
  return result
}

function showSalary (worker, index) {
  return `<p>${worker}: ${this[index]}</p>`
}

document.body
  .appendChild(document.createElement('div'))
  .innerHTML = workers.iterate(showSalary, salary).join('')
~~~

__________________________________________

◘◘![ico-20 cap] **13**◘◘

~~~js
const arr = [
  'google',
  'service',
  'user',
  () => Math.round(Math.random() * 1000),
  false
]

function test (elem, index, ref) {
  typeof elem === 'function' && ref.splice(index, 1, elem())
  return ref[index]
}

Array.prototype.iterate = function (func) {
  var res = []
  for (var item of this) res.push(func(item, this.indexOf(item), this))
  return res
}

arr.iterate(test)
~~~
__________________________________________


Используем второй и третий опицональные параметры функции-аргумента:

◘◘![ico-20 cap] **14**◘◘

~~~js
const companList = ['Google', 'Mozilla', 'Microsoft']
const browsers = ['Chrome', 'Firefox', 'Edge']

function test (prop, index) {
  this[index] = { [prop] : this[index] }
}

Array.prototype.iterate = function (func, context) {
  var index = index && typeof index === 'number' ? index : 0
  for (var item of this) func.call(context, item, index++)
}

companList.iterate(test, browsers)

console.log(browsers)
~~~

Результат в консоли:

~~~console
▼ (3) [{…}, {…}, {…}]
  ► 0: {Google: "Chrome"}
  ► 1: {Mozilla: "Firefox"}
  ► 2: {Microsoft: "Edge"}
    length: 3
  ► __proto__: Array(0)
~~~

________________________________________________________________


[◄◄◄Итерирующие методы массивов◄◄◄](page/Array-iterating-methods.md)

________________________________________________________________

[![ico-30 hw] Quiz](quiz/arrayIterationMethods)
