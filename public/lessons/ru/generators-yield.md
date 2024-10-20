# ![ico-30 study] Генераторы и итераторы

**ES 2015**

_______________________________________________________

## ![ico-25 icon] yield*

**yield*** позволяет переключаться с одного протокола итерирования на другой.

Как мы знаем, протокол итерирования задается в функции-генераторе.

Поэтому для переключения нужно после **yield*** указать ссылку на генератор.

_______________________________________________________

При клике на странице вызывается метод **~next()~** объекта **iterator**.

Однако протокол итерирования, заложенный в объекте **iterator**, предусматривает переход по условию на другой протокол перебора значений, который задается функцией-генератором. **generator**

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const generator = function * (arg) {
    while (true) { yield arg++ }
}

const iterator = (function * (arg) {
  while (true) { arg < 5 ? yield arg++ : yield * generator(50) }
})(0)


document.body.onclick = function (event) {
  const { value, done } = iterator.next()
  console.log(value)
}
~~~

___________________________________________________

В этом примере есть две функции-генератора: **generator1** и **generator2**

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const generator1 = function * (arg) {
  while (true) {
    arg++ < 5 ? yield 'generator1: ' + arg : yield * generator2()
  }
}

function * generator2 () {
  while (true) {
    Math.random() > 0.3 ? yield 'generator2' : yield * generator1(0)
  }
}
~~~

В функции-генераторе **generator2** в зависимости от значения случайной величины происходит переход на протокол перебора значений, заложенный в функции-генераторе **generator1**

В свою очередь в функции-генераторе **generator1** в зависимости от значения аргумента **_arg_** происходит переход на протокол перебора значений, заложенный в функции-генераторе **generator2**

Стартуем мы с протокола перебора значений, заложенном в функции-генераторе **generator2**

~~~js
const iterator = generator2(3)
~~~

Теперь при клике на странице мы будем случайным образом переключаться с одного протокола итерирования на другой:

~~~js
document.body.onclick = event => console.log(iterator.next().value)
~~~

________________________________

Если после оператора **yield*** следует итерабельный объект, то произойдет автоматический переход на встроенный протокол итерирования этого объекта

Когда протокол будет исчерпан, управление вернется к текущему протоколу

т.е. вместо протокола с **yield**:

~~~js
const generator = function * () {
  for (const x of [5, 4, 3, 2, 1]) yield x
}
~~~

мы можем использовать протокол с **yield***:

~~~js
const generator = function * () {
  yield * [5, 4, 3, 2, 1].reverse()
}

console.log(...generator())
~~~

________________________________

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const generator = function* () {
  yield * [5, 4, 3, 2, 1]
  yield * 'API'
  yield * arguments
}

const iterator = generator(10, 20, 30)

document.body.onclick = function (event) {
  console.log(iterator.next().value)
}
~~~

_________________________________________________

## ![ico-25 icon] return()

Этот метод позволяет остановить процесс итерирования до того, как протокол перебора значений будет исчерпан

◘◘![ico-20 cap] ** 4**◘◘

~~~js
const generator1 = function * () {
  while (true) {
    const x = Math.round(Math.random() * 10)
    x > 5 ? yield 'generator1: ' + x : yield * generator2()
  }
}

function * generator2() {
  while ( true ) {
    Math.random() > 0.3 ? yield 'generator2' : yield * generator1()
  }
}
const iterator = generator2(3)


document.body.onclick = function (event) {
  const { value } = iterator.next()
  console.log(value)
  if (value === 'generator1: 8') iterator.return()
}
~~~

_________________________________________________________

[![ico-30 hw] Quiz](quiz/gen)
