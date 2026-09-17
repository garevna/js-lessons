# ![ico-30 study] {{common.c20}}

**ES 2015**

_______________________________________________________

## ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}
{{p4}}
{{p5}}
{{p6}}

{{p7}}
{{p8}}
{{p9}}

~~~js
...
let param = yield ...
...
~~~

{{p10}}
{{p11}}

{{p12}}

{{p13}}
{{p14}}
{{p15}}

{{p16}}

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

{{p17}}

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

{{p18}}

{{p19}}
{{p20}}

{{p21}}
{{p22}}

{{p23}}
{{p24}}

{{p25}}
{{p26}}

{{p27}}

{{p28}}
{{p29}}

{{p30}}
{{p31}}
{{p32}}

{{p33}}

{{p34}}

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

## ![ico-25 icon] {{p35}}

{{p36}}

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

{{p37}}

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
