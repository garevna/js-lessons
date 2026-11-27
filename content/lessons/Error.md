# ![ico-30 study] Exceptions

{{p1}}
{{p2}}

{{p3}}

{{p4}}

___

## ![ico-30 icon] {{p6}}

☼☼☼ {{p5}} ☼☼☼

### ![ico-20 icon] Error

{{p7}}

~~~js
console.dir(Error)
~~~

~~~console
▼ ƒ Error()
    stackTraceLimit: 10
  ► captureStackTrace: ƒ captureStackTrace()
  ► isError: ƒ isError()
    length: 1
    name: "Error"
  ► prototype: {name: 'Error', message: '', toString: ƒ}
  ► arguments: (...)
  ► caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

{{p8}}

{{p9}}
{{p10}}

◘◘![ico-25 cap] **1**◘◘

~~~js
var err = new Error('Arguments are not valid')
console.dir(err)
~~~

~~~console
▼ Error: Arguments are not valid
    at <anonymous>:1:11
    message: "Arguments are not valid"
    stack: "Error: Arguments are not valid\n    at <anonymous>:1:11"
  ▼ [[Prototype]]: Object
      ► constructor: ƒ Error()
        message: ""
        name: "Error"
      ► toString: ƒ toString()
      ► [[Prototype]]: Object
~~~

{{p11}}

◘◘![ico-25 cap] **2**◘◘

~~~js
var error = Object.assign(new Error('Hello'), {
  fileName: 'figure',
  lineNumber: 11,
  stack: 'Welcome'
})

console.dir(error)
~~~

~~~console
▼ Error: Hello
    fileName: "figure"
    lineNumber: 11
    message: "Hello"
    stack: "Welcome"
  ► [[Prototype]]: Object
~~~

~~~js
console.error(error)
~~~

~~~console
! Error: Hello
~~~

___

{{p12}}
{{p13}}
{{p14}}

### ![ico-20 icon] SyntaxError

~~~console
▼ ƒ SyntaxError()
    length: 1
    name: "SyntaxError"
  ► prototype: Error {name: 'SyntaxError', message: ''}
  ► arguments: (...)
  ► caller: (...)
  ▼ [[Prototype]]: ƒ Error()
      stackTraceLimit: 10
    ► captureStackTrace: ƒ captureStackTrace()
    ► isError: ƒ isError()
      length: 1
      name: "Error"
    ► prototype: {name: 'Error', message: '', toString: ƒ}
    ► arguments: (...)
    ► caller: (...)
    ► [[Prototype]]: ƒ ()
~~~

◘◘![ico-25 cap] **3**◘◘

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

console.dir(syntaxError)
~~~

~~~console
▼ Ignorant newbie Error.: You should learn JS.
    message: "You should learn JS."
    name: "Ignorant newbie Error."
    stack: "Code execution failed."
  ► [[Prototype]]: Error
~~~

~~~js
console.error(syntaxError)
~~~

~~~console
! Ignorant newbie Error.: You should learn JS.
~~~

___

### ![ico-20 icon] ReferenceError

~~~console
▼ ƒ ReferenceError()
    length: 1
    name: "ReferenceError"
  ▼ prototype: Error
      ► constructor: ƒ ReferenceError()
        message: ""
        name: "ReferenceError"
      ► [[Prototype]]: Object
      ► arguments: (...)
      ► caller: (...)
      ► [[Prototype]]: ƒ Error()
~~~

◘◘![ico-25 cap] **4**◘◘

~~~js
const referenceError = Object.assign(new ReferenceError(), {
  message: 'We do not know such a person.',
  name: 'Identification Error.',
  stack: 'Search for person failed.'
})
console.dir(referenceError)
~~~

~~~console
▼ Identification Error.: We do not know such a person.
    message: "We do not know such a person."
    name: "Identification Error."
    stack: "Search for person failed."
  ► [[Prototype]]: Error
~~~

~~~js
console.error(referenceError)
~~~

~~~console
! Identification Error.: We do not know such a person.
~~~

___

### ![ico-20 icon] TypeError

~~~console
▼ ƒ TypeError()
    length: 1
    name: "TypeError"
  ► prototype: Error {name: 'TypeError', message: ''}
  ► arguments: (...)
  ► caller: (...)
  ▼ [[Prototype]]: ƒ Error()
        stackTraceLimit: 10
      ► captureStackTrace: ƒ captureStackTrace()
      ► isError: ƒ isError()
        length: 1
        name: "Error"
      ► prototype: {name: 'Error', message: '', toString: ƒ}
      ► arguments: (...)
      ► caller: (...)
      ► [[Prototype]]: ƒ ()
~~~

◘◘![ico-25 cap] **5**◘◘

~~~js
const typeError = Object.assign(new TypeError(), {
  message: 'Invalid pincode',
  name: 'Custom Error',
  stack: 'Look here...'
})

console.dir(typeError)
~~~

~~~console
▼ Custom Error: Invalid pincode
    message: "Invalid pincode"
    name: "Custom Error"
    stack: "Look here..."
  ▼ [[Prototype]]: Error
    ► constructor: ƒ TypeError()
      message: ""
      name: "TypeError"
    ► [[Prototype]]: Object
~~~

~~~js
console.error(typeError)
~~~

~~~console
! Custom Error: Invalid pincode
~~~

___

## ![ico-30 icon] {{p15}}

{{p16}}

{{p17}}

{{p18}}

{{p19}}

◘◘![ico-25 cap] **6**◘◘

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

throw syntaxError
~~~

~~~console
! Uncaught Ignorant newbie Error.: You should learn JS. (at VM5957:7:1)
~~~

{{p20}}

{{p21}}

___

## ![ico-25 icon] try ... catch

{{p22}}

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

{{p23}}

◘◘![ico-25 cap] **7**◘◘

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

{{p24}}

~~~js
var x = obj.name
~~~

{{p25}}

{{p26}}

___

◘◘![ico-25 cap] **8**◘◘

~~~js
function outerFunc () {
  return innerFunc()
}

function innerFunc () {
  try {
    return sample()
  } catch (err) {
    console.group(err.name)
    console.warn(err.message)
    console.groupEnd(err.name)
    return err.name === 'ReferenceError' ? 1 : 2
  }
}

console.log('Result:', outerFunc())
~~~

~~~console
▼ ReferenceError

  ? sample is not defined
Result: 1
~~~

◘◘![ico-25 cap] **9**◘◘

~~~js
sample = 5

function outerFunc () {
  return innerFunc()
}

function innerFunc () {
  try {
    return sample()
  } catch (err) {
    console.group(err.name)
    console.warn(err.message)
    console.groupEnd(err.name)
    return err.name === 'ReferenceError' ? 1 : 2
  }
}

console.log('Result:', outerFunc())
~~~

~~~console
▼ TypeError

    ? sample is not a function
Result: 2
~~~

___

^^^[ES 2019]

{{p27}}

~~~js
var obj = null

try {
  var x = obj.name
} catch {
  x = null
}
~~~

^^^

### ![ico-20 icon] finally

{{p28}}

◘◘![ico-25 cap] **10**◘◘

~~~js
try {
  throw({
    name: 'Hi',
    message: 'It\'s a joke',
    stack: `Hello, sorry for the interruption, I really wanted to say hello 😉`
  })
} catch (err) {
    console.error(err.stack)
} finally {
   console.info('try...catch completed')
}
~~~

~~~console
! Hello, sorry for the interruption, I really wanted to say hello 😉
try...catch completed
~~~

{{throwAnything}}

___

{{p29}}

◘◘![ico-25 cap] **11**◘◘

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

{{p30}}

~~~console
! Error: Arguments not valid
~~~

___

◘◘![ico-25 cap] **12**◘◘

~~~js
var num = {}

try {
  if (typeof num !== 'number') {
    var err = new Error('Arguments not valid')
    err.name = 'ValidationError'
    throw err
  }
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

~~~console
! ValidationError: Arguments not valid
~~~

~~~js
console.dir(err)
~~~

~~~console
▼ ValidationError: Arguments not valid
    at <anonymous>:5:15
    name: "ValidationError"
    message: "Arguments not valid"
    stack: "ValidationError: Arguments not valid\n    at <anonymous>:5:15"
  ► [[Prototype]]: Object
~~~

___

## ![ico-30 icon] AggregateError

{{aggWhat}}

~~~js
new AggregateError(errors, message)
~~~

{{aggArgs}}
{{aggErrors}}

{{aggWhere}}

◘◘![ico-25 cap] **13**◘◘

~~~js
const numbers = [5, 'hero', 9, 34.5, 11]

const errors = numbers
  .filter((item) => !Number.isInteger(item))
  .map((item) => new TypeError(`${JSON.stringify(item)} is not an integer`))

const trouble = new AggregateError(errors, 'The list is not all integers')

console.log(trouble.name)
console.log(trouble.message)
console.log(trouble.errors.length)
console.log(trouble.errors.map((err) => err.message))
~~~

~~~console
AggregateError
The list is not all integers
2
► (2) ['"hero" is not an integer', '34.5 is not an integer']
~~~

___

{{aggCatch}}

◘◘![ico-25 cap] **14**◘◘

~~~js
const numbers = [5, 'hero', 9, 34.5, 11]

const check = (list) => {
  const errors = list
    .filter((item) => !Number.isInteger(item))
    .map((item) => new TypeError(`${JSON.stringify(item)} is not an integer`))

  if (errors.length) throw new AggregateError(errors, 'The list is not all integers')

  return list
}

try {
  check(numbers)
} catch (err) {
  console.error(err.message)
  for (const one of err.errors) console.error(`${one.name}: ${one.message}`)
}
~~~

~~~console
! The list is not all integers
! TypeError: "hero" is not an integer
! TypeError: 34.5 is not an integer
~~~

___

{{aggAny}}

◘◘![ico-25 cap] **15**◘◘

~~~js
const load = (name, ms, answers) => new Promise((resolve, reject) => {
  setTimeout(() => answers ? resolve(name) : reject(new Error(`${name} is down`)), ms)
})

Promise.any([load('mirror A', 10, false), load('mirror B', 20, false)])
  .then((name) => console.log('answered:', name))
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`)
    for (const one of err.errors) console.error(one.message)
  })
~~~

~~~console
! AggregateError: All promises were rejected
! mirror A is down
! mirror B is down
~~~

{{stackNote}}

___

## ![ico-25 hw] {{common.tests}}

♣♣♣♣
? {{test01Question}}

~~~js
try {
  setTimeout(() => {
    throw new Error('later')
  })
} catch (err) {
  console.log('caught:', err.message)
}
~~~

+ {{test01Variant1}}
= {{test01Variant1Answer}}

- {{test01Variant2}}
= {{test01Variant2Answer}}

- {{test01Variant3}}
= {{test01Variant3Answer}}

- {{test01Variant4}}
= {{test01Variant4Answer}}

? {{test02Question}}

~~~js
try {
  throw 'oops'
} catch (err) {
  console.log(typeof err, err.message)
}
~~~

+ {{test02Variant1}}
= {{test02Variant1Answer}}

- {{test02Variant2}}
= {{test02Variant2Answer}}

- {{test02Variant3}}
= {{test02Variant3Answer}}

- {{test02Variant4}}
= {{test02Variant4Answer}}

? {{test03Question}}

~~~js
const read = () => {
  try {
    return 'value'
  } finally {
    console.log('cleanup')
  }
}

console.log(read())
~~~

+ {{test03Variant1}}
= {{test03Variant1Answer}}

- {{test03Variant2}}
= {{test03Variant2Answer}}

- {{test03Variant3}}
= {{test03Variant3Answer}}

- {{test03Variant4}}
= {{test03Variant4Answer}}

? {{test04Question}}

~~~js
const err = new Error('Arguments not valid')

err.name = 'ValidationError'

console.error(err)
~~~

+ {{test04Variant1}}
= {{test04Variant1Answer}}

- {{test04Variant2}}
= {{test04Variant2Answer}}

- {{test04Variant3}}
= {{test04Variant3Answer}}

- {{test04Variant4}}
= {{test04Variant4Answer}}

? {{test05Question}}

~~~js
const fail = (text) => Promise.reject(new Error(text))

Promise.any([fail('A'), fail('B')])
  .catch((err) => console.log(err.name, '|', err.message, '|', err.errors.length))
~~~

+ {{test05Variant1}}
= {{test05Variant1Answer}}

- {{test05Variant2}}
= {{test05Variant2Answer}}

- {{test05Variant3}}
= {{test05Variant3Answer}}

- {{test05Variant4}}
= {{test05Variant4Answer}}

? {{test06Question}}

~~~js
const trouble = new AggregateError([new TypeError('bad')])

trouble.stack = 'Parse errors: element 1 is not an integer'

throw trouble
~~~

+ {{test06Variant1}}
= {{test06Variant1Answer}}

- {{test06Variant2}}
= {{test06Variant2Answer}}

- {{test06Variant3}}
= {{test06Variant3Answer}}

- {{test06Variant4}}
= {{test06Variant4Answer}}
♣♣♣♣

___

## ![ico-25 hw] {{common.quest}}

♠♠♠♠ {{quest01Task}}
const numbers = [5, 'hero', 9, 34.5, 11]

const check = (list) => {
  list.forEach((item) => {
    if (!Number.isInteger(item)) throw new TypeError(`${JSON.stringify(item)} is not an integer`)
  })

  return list
}

try {
  check(numbers)
} catch (err) {
  console.log(err.name)
  console.log(err.message)
  console.log(err.errors ? err.errors.length : 0)
  console.log(err.errors ? err.errors.map((one) => one.name).join(' ') : err.name)
}
???
? 3 | {{quest01Check1}}
OUTPUT[0] === 'AggregateError'

? 4 | {{quest01Check2}}
OUTPUT[2] === '2'

? 3 | {{quest01Check3}}
OUTPUT[1] === 'The list is not all integers'

? 2 | {{quest01Check4}}
OUTPUT[3] === 'TypeError TypeError'
♠♠♠♠

♠♠♠♠ {{quest02Task}}
let open = true

const read = (ok) => {
  try {
    if (!ok) throw new Error('nothing to read')

    return 'value'
  } finally {
    open = false

    return 'closed'
  }
}

try { console.log(read(true)) } catch (err) { console.log('caught:', err.message) }
try { console.log(read(false)) } catch (err) { console.log('caught:', err.message) }

console.log('open:', open)
???
? 4 | {{quest02Check1}}
OUTPUT[0] === 'value'

? 5 | {{quest02Check2}}
OUTPUT[1] === 'caught: nothing to read'

? 3 | {{quest02Check3}}
OUTPUT[2] === 'open: false'
♠♠♠♠
