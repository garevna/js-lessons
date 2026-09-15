# ![ico-30 study] {{common.c30}}

**ES 2015**

_______________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

~~~js
...
let param = yield ...
...
~~~

{{s2.p9}}
{{s2.p10}}

{{s2.p11}}

{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

{{common.c196}}

~~~js
const iterator = (function * gen (arg) {
  const x = yield arg
  const y = yield arg + x
  const z = yield arg + x + y
  return arg + x + y + z
})(1)

console.log(iterator.next())
console.log(iterator.next(2))
console.log(iterator.next(3))
console.log(iterator.next(4))
~~~

~~~console
► { value: 1, done: false }
► { value: 3, done: false }
► { value: 6, done: false }
► { value: 10, done: true }
~~~

{{s2.p16}}

_______________________________________________________

◘◘![ico-20 cap] ** 23**◘◘

~~~js
function * testArgGenerator (x) {
  console.log('x: ', x)
  const y = yield x + 1
  console.log('I remember: x = ', x, '\nI receive: y = ', y)
  const z = yield y * 2
  console.log('I remember: x: ', x, 'y: ', y, '\nI receive: z: ', z)
  return x + y + z
}

const testArg = testArgGenerator(10)

for (const x of [0, 15, 6]) console.warn('Emitted value: ', testArg.next(x).value)
~~~

{{{generators-23.js}}}

{{s2.p17}}

{{s2.p18}}
{{s2.p19}}

{{s2.p20}}
{{s2.p21}}

{{s2.p22}}
{{s2.p23}}

{{s2.p24}}
{{s2.p25}}

{{s2.p26}}

{{s2.p27}}
{{s2.p28}}

{{s2.p29}}
{{s2.p30}}
{{s2.p31}}

{{s2.p32}}

{{s2.p33}}

________________________________

◘◘![ico-20 cap] ** 24**◘◘

~~~js
function * testArgGenerator (x) {
  const roundSum = sum => Math.round(sum * 100) / 100

  console.log('x: ', x)
  const y = yield roundSum(x * 1.1)
  console.log(`Previous state: ${x}\nCurrent state: ${y}`)
  const z = yield roundSum(y * 1.1)
  console.log(`Previous state: ${y}\nCurrent state: ${z}`)
  return roundSum(z * 1.1)
}

const testArg = testArgGenerator(100)


const total = testArg.next(testArg.next(testArg.next().value).value).value

console.log('Result: ', total)
~~~

{{{generators-24.js}}}

_______________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{common.c200}}

◘◘![ico-20 cap] ** 25**◘◘

~~~js
function* generator (arg) {
  let result = arg
  while (true) {
    result *= yield result
  }
}

const iterator = generator(2)

for (const x of [2, 3, 4, 5, 6, 7])
    console.log(iterator.next(x))
~~~

{{common.c183}}

~~~js
function* generator () {
  let result = 2
  while (true) result *= yield result
}

const iterator = generator()

for (const x of [, 3, 4, 5, 6, 7]) console.log(iterator.next(x).value)
~~~

_______________________________________________________

◘◘![ico-20 cap] ** 26**◘◘

~~~js
iterator = (function* gen (arg) {
  let ind = 0, ret = arg, d = new Date().getTime(), key

  while (true) {
    key = d === new Date().getTime()
      ? `${d}[${ind++}]`
      : new Date().getTime()
    d = new Date().getTime()
    ret = yield { [key]: ret }
  }
})('Hello')

;['', 'Welcome', 'Who are you?', 'Bye-bye...']
  .forEach(item => console.log(iterator.next(item)))
~~~



~~~console
▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855950[0]: "Hello"}
  ► __proto__: Object

▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951: "Welcome"}
  ► __proto__: Object

▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951[1]: "Who are you?"}
  ► __proto__: Object

▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951[2]: "Bye-bye..."}
  ► __proto__: Object
~~~

{{{generators-26.js}}}

_________________________________________________________

[![ico-30 hw] Quiz](quiz/gen)
