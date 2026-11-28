# ![ico-30 study] Exceptions⟪Exceptions⟫

Exceptions cause the current function to be interrupted.
However, we can ‘catch’ exceptions and prevent the code from being interrupted.

When we ‘catch’ an exception, we receive an object that contains a description of what caused the exception to be raised.

Before moving on to exception handling, let’s look at the error object (the exception model) and, accordingly, the constructors that create instances of the error.

___

## ![ico-30 icon] Exception constructors⟪Exception_constructors⟫

☼☼☼ See the object? – look for the constructor ☼☼☼

### ![ico-20 icon] Error⟪Error⟫

The **Error** constructor creates a custom object **~Error~**.

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

![ico-20 warn] The **Error** constructor can be called without the keyword **~new~**.

The constructor takes an optional parameter – the text of the error message
^^(the remaining optional parameters have not been standardised and are not supported by browsers).^^

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

However, we can add properties to an instance of the **Error** constructor.

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

We are already familiar with the main exception types, such as ~SyntaxError~, ~ReferenceError~ and ~TypeError~.
Each exception type has its own constructor.
However, every constructor for a specific exception type inherits from the ~Error~ constructor.

### ![ico-20 icon] SyntaxError⟪SyntaxError⟫

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

### ![ico-20 icon] ReferenceError⟪ReferenceError⟫

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

### ![ico-20 icon] TypeError⟪TypeError⟫

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

## ![ico-30 icon] The throw statement⟪The_throw_statement⟫

You can generate an exception yourself using the throw statement.

The **~throw~** statement generates a user-defined exception (error).

Execution of the current function will be interrupted, and control will be passed to the first **_~catch~_** block in the call stack.

If there is no **_~catch~_** block, the programme will terminate.

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

As can be seen from the example, the output in the console will be exactly the same as when we output the error object to the console using ~console.log~.

Now that we understand what an error instance is, how to create custom error instances, and how to generate an exception, we can move on to error handling.

___

## ![ico-25 icon] try ... catch⟪try_..._catch⟫

The ~try ... catch~ statement allows you to catch exceptions that occur whilst the code is being executed.

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

If an error occurs whilst executing the code in the **~try { ... }~** block, control will transfer to the **~catch~** block, passing the error object as an argument.

◘◘![ico-25 cap] **7**◘◘

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

In this example, whilst executing the code

~~~js
var x = obj.name
~~~

an exception should be generated, which will cause the programme to terminate.

Because the exception is ‘caught’ in the **_~try~_** block, control passes to the **_~catch~_** block, where the variable **~x~** is assigned the value **~undefined~**, and the programme continues to run.

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

Since 2019, it is not necessary to pass an argument to the **_~catch~_** block:

~~~js
var obj = null

try {
  var x = obj.name
} catch {
  x = null
}
~~~

^^^

### ![ico-20 icon] finally⟪finally⟫

This block of code will execute regardless of how the ~try...catch~ block ends.

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

![ico-20 warn] Note that what is thrown here is a plain object, not an instance of **~Error~**. The **~throw~** statement takes any value — a string, a number, an object — and this one has ~name~, ~message~ and ~stack~ only because we wrote them ourselves.

___

As a result of executing the code:

◘◘![ico-25 cap] **11**◘◘

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

an exception will be thrown to the console:

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

## ![ico-30 icon] AggregateError⟪AggregateError⟫

The **AggregateError** constructor creates one error that holds several others inside it. It is for the places where the failure is not a single one: a form check found three bad fields, a download tried four mirrors and none of them answered. Throwing whichever came first and saying nothing about the rest tells a quarter of the truth.

~~~js
new AggregateError(errors, message)
~~~

![ico-20 green-ok] takes an iterable of errors and, optionally, a message for all of them;
![ico-20 green-ok] the instance gets an **~errors~** property — an array of those very errors — while its ~name~, ~message~ and ~stack~ are the ordinary ones every error has.

It arrived in 2020: every current browser has it, and Node.js from version fifteen on.

◘◘![ico-25 cap] **13**◘◘

~~~js
const numbers = [5, 'hero', 9, 34.5, 11]

const errors = numbers
  .filter((item) => !Number.isInteger(item))
  .map((item) => new TypeError(`${JSON.stringify(item)} is not an integer`))

const trouble = new AggregateError(errors, 'The list is not all integers')
~~~

~~~demo
> trouble.name
< 'AggregateError'
> trouble.message
< 'The list is not all integers'
> trouble.errors.length
< 2
> trouble.errors.map((err) => err.message)
< ► (2) ['"hero" is not an integer', '34.5 is not an integer']
~~~

___

It is caught like any other error, and taken apart by walking **~errors~**:

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

On its own, without our writing it, it arrives from **~Promise.any()~**: that method waits for the first promise to succeed, and if not one of them does, it rejects with a single **AggregateError** holding every refusal.

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

^^![ico-20 warn] The ~stack~ property is not standardised, and it is not what the console prints: in the heading it shows ~name~ and ~message~. So an error made without a message shows up in the console as plain **~AggregateError~**, however much text has been written into ~stack~.^^

___

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? What will the console see?

~~~js
const errors = {
  notArray: new Error('Argument must be an array'),
  notNumber: new Error('Argument must be a number')
}

try {
  const arr = null
  for (const x of arr) console.log(x)
} catch (error) {
  throw errors.notArray
}
~~~

+ **~Uncaught Error: Argument must be an array~**
= Yes. Iterating **~null~** throws a ~TypeError~, the **~catch~** takes it — and throws its own ready-made error instead, which nobody is left to catch. ![ico-20 warn] Ready-made errors are convenient, but such an error’s stack points at the line where it was **created**, not where it was thrown, and the same object travels through the whole codebase.

- **~Uncaught TypeError: arr is not iterable~**
= That error came first, but the **~catch~** took it; a different one got out.

- **~Uncaught Error: Argument must be a number~**
= That ready-made error is there in the code, but nobody threw it.

- Nothing: the exception was caught
= The first one was caught, and then the **~catch~** threw a new one — and that one nobody catches.

? What will end up on the page?

~~~js
const errors = {
  noArguments: new Error('There must be some arguments'),
  notProperty: new Error('There is no such a property')
}

for (const key in errors) {
  errors[key].name = key
  errors[key].callback = function () {
    document.body.append(this.toString())
  }
}

const testProp = (obj, prop) => {
  if (!Object.hasOwn(obj, prop)) throw errors.notProperty
}

try {
  testProp({}, 'name')
} catch (error) {
  error.callback()
}
~~~

+ **~notProperty: There is no such a property~**
= Yes. An error is an ordinary object: it was given a name — the key it is stored under — and a method was added to it. The method is called as **~error.callback()~**, so **~this~** inside it is the error itself, and an error’s **~toString()~** joins name and message.

- **~There is no such a property~**
= That is the message alone, and **~toString()~** puts the name in front of it.

- **~Error: There is no such a property~**
= That is what it would say had the loop not rewritten the name: it put the key **~notProperty~** in place of **~Error~**.

- Nothing: an error cannot have methods of its own
= It can: an error instance is an object like any other, and properties are added to it the same way.

? What will the console see?

~~~js
const errors = {
  noArguments: new Error('There are no arguments')
}

const testArgs = (arg) => {
  if (!arg) throw errors.noArguments
}

try {
  testArgs()
} catch (error) {
  `Custom ${error.toString()}`
}
~~~

+ Nothing
= Yes. The string in the **~catch~** is worked out and dropped: nobody prints it or writes it anywhere. There was an exception, and not a trace of it is left — the worst kind of handling: the code pretended nothing happened.

- **~Custom Error: There are no arguments~**
= That string really is put together — and vanishes at once: it was not handed to **~console.log~** or to anything else.

- **~Uncaught Error: There are no arguments~**
= No: the error was caught and never got out.

- **~Error: There are no arguments~**
= An exception with that text was raised, but it never reached the console: it was caught and passed over in silence.

? What will this code print?

~~~js
try {
  throw 'oops'
} catch (err) {
  console.log(typeof err, err.message)
}
~~~

+ **~string undefined~**
= Yes. The **~throw~** statement takes any value; a string was thrown, and a string has no **~message~** property.

- **~object oops~**
= No: a thrown string does not turn into an error object.

- **~string oops~**
= No: **~err.message~** is a property of an error object, and here **~err~** holds the string itself.

- **~TypeError~**: only errors may be thrown
= No, anything at all may be thrown — though catching such a thing is awkward.

? What will the heading of the red line say?

~~~js
const err = new Error('Arguments not valid')

err.name = 'ValidationError'

console.error(err)
~~~

+ **~ValidationError: Arguments not valid~**
= Yes. The heading is made of **~name~** and **~message~**, and the name was rewritten before anything looked at the error.

- **~Error: Arguments not valid~**
= No: the name is an ordinary property, and its new value is what the heading shows.

- **~ValidationError~** with no message
= No: the message is still the one given to the constructor.

- **~Error: ValidationError~**
= No, they do not swap places: the name comes first, the message second.

? What will the code print?

~~~js
const obj = {
  name: 'sample',
  type: 'figure',
  test () {
    throw new Error('Sample error')
  }
}

for (const prop in obj) {
  console.log(typeof obj[prop] === 'function' ? obj[prop]() : obj[prop])
}
~~~

+ **~sample~**, **~figure~** — and then an uncaught **~Error: Sample error~**
= Yes. The first two properties are printed, on the third the call throws, and as nobody is there to catch it the loop does not go on: it is not one iteration that stops but everything on the stack.

- **~sample~**, **~figure~**, **~undefined~**
= No: the function did not return nothing — it threw, which is not the same thing.

- **~sample~**, **~figure~** — and nothing more, the error disappears
= No: an uncaught error does not disappear, it reaches the console.

- Nothing: the error happens before the first line is printed
= No: the loop reaches the method third, and two lines are already printed.

? And here?

~~~js
const obj = {
  name: 'sample',
  type: 'figure',
  test () {
    const err = new Error('Ha-ha!')
    err.name = 'It is a joke: '
    throw err
  }
}

for (const prop in obj) {
  if (typeof obj[prop] !== 'function') {
    console.log(obj[prop])
    continue
  }

  try {
    obj[prop]()
  } catch (err) {
    console.log(err.name, err.message)
  }
}
~~~

+ **~sample~**, **~figure~**, **~It is a joke:  Ha-ha!~**
= Yes. An exception is raised here too, but it was caught — and the loop ran calmly to its end. The double space is no typo: the colon and space are part of the name itself, and **~console.log~** puts its own space between arguments.

- **~sample~**, **~figure~** — and an uncaught error
= No: the call is wrapped in a **~try~**, and the error went no further than the **~catch~**.

- **~sample~**, **~figure~**, **~Error: Ha-ha!~**
= No: the error’s name was rewritten, and that is what is printed.

- **~sample~**, **~figure~**, **~undefined~**
= No: the **~catch~** prints the name and the message, not what the method returned.

? In what order will the lines come out?

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

+ **~cleanup~** first, then **~value~**
= Yes. The value is already worked out and waiting, but **~finally~** runs before the function hands it over.

- **~value~** first, then **~cleanup~**
= No: a **~return~** does not let control leave the function past **~finally~**.

- **~value~** only
= No: **~finally~** always runs, after a **~return~** as well.

- **~cleanup~** only
= No: the returned value is still there, and the outer **~console.log~** prints it.

? What will the console show?

~~~js
try {
  setTimeout(() => {
    throw new Error('later')
  })
} catch (err) {
  console.log('caught:', err.message)
}
~~~

+ An uncaught **~Error: later~**
= Yes. **~try...catch~** catches only what is thrown while it is running. The timer callback is a task of its own, and by the time it reaches the stack the **~try~** block is long finished.

- **~caught: later~**
= No: by the time the timer fires, the stack holding that **~catch~** is gone.

- **~caught: undefined~**
= No, the **~catch~** block will not run at all here.

- Nothing: an error inside a timer disappears quietly
= No, it surfaces as an uncaught error — that **~catch~** cannot take it, but it does not vanish quietly either.

? What will this code print?

~~~js
const fail = (text) => Promise.reject(new Error(text))

Promise.any([fail('A'), fail('B')])
  .catch((err) => console.log(err.name, '|', err.message, '|', err.errors.length))
~~~

+ **~AggregateError | All promises were rejected | 2~**
= Yes. **~Promise.any~** waits for the first promise to succeed, and if none does it rejects with a single **~AggregateError~** — with a message of its own and both refusals in **~errors~**.

- **~Error | A | 2~**
= No: what reaches **~catch~** is not the first of the errors but one common error holding them all.

- **~AggregateError | A | 2~**
= No: its message is its own — **~All promises were rejected~** — while the refusals’ messages lie inside, in **~errors~**.

- Nothing: **~Promise.any~** does not reject
= It does reject, in exactly one case: when not one of the promises succeeded.

? What will the console show?

~~~js
const trouble = new AggregateError([new TypeError('bad')])

trouble.stack = 'Parse errors: element 1 is not an integer'

throw trouble
~~~

+ **~Uncaught AggregateError~** — and nothing else
= Yes. In the heading the console shows **~name~** and **~message~**; this error has no message, because none was given to the constructor, and **~stack~** is not standard — what is written into it is not what the console prints.

- the text from **~stack~**: **~Parse errors: element 1 is not an integer~**
= That is how older versions of Chrome behaved, and more than one screenshot on the internet rests on it — including the one that stood in this lesson until recently. Today the console does not print **~stack~**.

- **~Uncaught AggregateError: bad~**
= No: **~bad~** is the message of the error inside, while the **~AggregateError~** itself has none.

- **~Uncaught TypeError: bad~**
= No: what was thrown is the **~AggregateError~**; the errors inside lie in **~errors~** and do not surface on their own.
♣♣♣♣

___

## ![ico-25 hw] Quest⟪Quest⟫

♠♠♠♠ The check stops at the first bad entry, and nobody ever hears about the second. Repair it so that it goes through the whole list, collects every bad entry and throws one **~AggregateError~** with a common message — its own, not one borrowed from an error inside (say, **~The list is not all integers~**) — each bad entry staying inside as a **~TypeError~** of its own with its own message.
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
? 3 | one error is thrown, and it is an AggregateError
OUTPUT[0] === 'AggregateError'

? 4 | it holds both bad entries, not just the first
OUTPUT[2] === '2'

? 3 | it has a common message of its own, not the message of one of the errors inside
Boolean(OUTPUT[1]) && !/is not an integer$/.test(OUTPUT[1])

? 2 | inside are real TypeErrors, not strings
OUTPUT[3] === 'TypeError TypeError'
♠♠♠♠

♠♠♠♠ The **~read~** function checks a value and returns it, and the **~finally~** block tidies up after every call — and swallows everything on the way: **~closed~** comes back instead of what was read, and the errors never reach the one waiting for them. Repair it so that a proper value comes back, the errors get out, and the tidying up is still done after every call.
let closed = 0

const read = (value) => {
  try {
    if (typeof value !== 'number') throw new Error('Not a number!')
    if (value < 1000) throw new Error('Not enough!')
    return value
  } finally {
    closed++
    return 'closed'
  }
}

try {
  console.log(read(1500))
} catch (err) {
  console.log('caught:', err.message)
}
try {
  console.log(read(500))
} catch (err) {
  console.log('caught:', err.message)
}
try {
  console.log(read())
} catch (err) {
  console.log('caught:', err.message)
}

console.log('closed:', closed)
???
? 3 | a proper value comes back
OUTPUT[0] === '1500'

? 4 | both errors reached the caller
OUTPUT[1] === 'caught: Not enough!' && OUTPUT[2] === 'caught: Not a number!'

? 2 | the tidying up is done after each of the three calls
OUTPUT[3] === 'closed: 3'

? 3 | the tidying up stays in finally, and finally only tidies up: no return or throw in it
const from = SOURCE.search(/finally\s*\{/)
const open = SOURCE.indexOf('{', from)
let depth = 0
let to = SOURCE.length
for (let at = open; at < SOURCE.length; at++) {
  if (SOURCE[at] === '{') depth++
  if (SOURCE[at] === '}' && --depth === 0) { to = at; break }
}
from !== -1 && !/\b(return|throw)\b/.test(SOURCE.slice(open, to))
♠♠♠♠

♠♠♠♠ The **~changeParams~** method takes its argument on trust, and any call out of shape brings the code down: **~null~**, a call with no argument, an object with no **~center~**, an empty array. Repair it so that not one of the five calls throws: a proper argument is applied in full, and any other one changes nothing — the parameters stay as they were.
const figure = {
  type: 'circle',
  params: {
    center: [0, 0],
    radius: 10
  },
  changeParams (newParams) {
    this.params.center[0] = newParams.center[0] || 0
    this.params.center[1] = newParams.center[1] || 0
    this.params.radius = newParams.radius || 10
  }
}

const show = (what) => {
  try {
    figure.changeParams(what)
    console.log(JSON.stringify(figure.params))
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
  }
}

show({ center: [3, 4], radius: 7 })
show(null)
show()
show({ name: 5, size: 8 })
show([])
???
? 4 | not one call brought the code down: five lines, and not one TypeError
OUTPUT.length === 5 && !OUTPUT.some((line) => line.includes('TypeError'))

? 4 | the proper argument is applied in full
OUTPUT[0] === '{"center":[3,4],"radius":7}'

? 4 | the bad arguments spoiled nothing: the parameters stayed as they were
OUTPUT.slice(1).every((line) => line === OUTPUT[0])
♠♠♠♠
