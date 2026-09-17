# ![ico-30 study] {{common.c20}}

**ES 2015**

_______________________________________________________

## ![ico-25 icon] yield*

{{p1}}

{{p2}}

{{p3}}

_______________________________________________________

{{p4}}

{{p5}}

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

{{p6}}

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

{{p7}}

{{p8}}

{{p9}}

~~~js
const iterator = generator2(3)
~~~

{{p10}}

~~~js
document.body.onclick = event => console.log(iterator.next().value)
~~~

________________________________

{{p11}}

{{p12}}

{{p13}}

~~~js
const generator = function * () {
  for (const x of [5, 4, 3, 2, 1]) yield x
}
~~~

{{p14}}

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

{{p15}}

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
