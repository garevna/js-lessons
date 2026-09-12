# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

_______________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

_______________________________________________________

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

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

{{s2.p7}}

{{s2.p8}}

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

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

~~~js
const iterator = generator2(3)
~~~

{{s2.p12}}

~~~js
document.body.onclick = event => console.log(iterator.next().value)
~~~

________________________________

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

~~~js
const generator = function * () {
  for (const x of [5, 4, 3, 2, 1]) yield x
}
~~~

{{s2.p16}}

~~~js
const generator = function * () {
  yield * [5, 4, 3, 2, 1].reverse()
}

console.log(...generator())
~~~

________________________________

{{s2.p17}}

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

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

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

{{s3.p3}}
