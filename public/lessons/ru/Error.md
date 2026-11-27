# ![ico-30 study] Exceptions⟪Exceptions⟫

Исключения приводят к прерыванию выполнения текущей функции.
Однако мы можем 'перехватывать' исключения и не допускать прерывания выполнения кода.

Когда мы 'перехватываем' исключение, то мы получаем некий объект, который содержит описание того, что привело к генерации исключения.

Прежде, чем перейти к перехвату исключений, разберемся с обектом ошибки (моделью исключения) и, соответственно, конструкторами, которые создают экземпляры ошибки.

___

## ![ico-30 icon] Конструкторы исключений⟪Exception_constructors⟫

☼☼☼ Видишь объект? - ищи конструктор ☼☼☼

### ![ico-20 icon] Error⟪Error⟫

Конструктор **Error** создаёт кастомный объект **~Error~**.

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

![ico-20 warn] Конструктор **Error** может быть вызван без ключевого слова **~new~**.

Конструктор принимает необязательный параметр - текст сообщения об ошибке
^^(остальные опциональные параметры не были стандартизированы, и не поддерживаются браузерами).^^

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

Однако мы можем добавлять свойства экземпляру конструктора **Error**.

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

Мы уже знаем основные типы исключений, такие как ~SyntaxError~, ~ReferenceError~ and ~TypeError~.
Для каждого типа исключения есть свой конструктор.
Однако каждый конструктор конкретного типа исключения наследует от конструктора ~Error~.

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

## ![ico-30 icon] Оператор throw⟪The_throw_statement⟫

Вы можете сами сгенерировать исключение с помощью оператора throw.

Оператор **~throw~** генерирует пользовательское исключение (ошибку).

Выполнение текущей функции будет прервано, и управление будет передано в первый блок **_~catch~_** в стеке вызовов.

Если блок **_~catch~_** отсутствует, выполнение программы завершится.

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

Как видно из примера, результат в консоли будет тот же самый, что и в случае, когда мы выводим объект ошибки в консоль с помощью ~console.log~.

Теперь, когда мы поняли, что из себя представляет экземпляр ошибки, как создавать пользовательские экземпляры ошибок, и как можно сгенерировать исключение, можно переходить к перехвату ошибок.

___

## ![ico-25 icon] try ... catch⟪try_..._catch⟫

Оператор ~try ... catch~ позволяет перехватить исключения, возникающие в процессе выполнения кода.

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

Если при выполнении кода в блоке **~try { ... }~** возникнет ошибка, управление перейдет в блок **~catch~** с передачей в качестве аргумента объекта ошибки.

◘◘![ico-25 cap] **7**◘◘

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

В этом примере при выполнении кода

~~~js
var x = obj.name
~~~

должно быть сгенерировано исключение, которое приведет к прерыванию работы программы.

Благодаря тому, что исключение 'перехватывается' в блоке **_~try~_**, управление переходит в блок **_~catch~_**, где переменной  **~x~** присваивается значение **~undefined~**, и работа программы продолжается.

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

С 2019 года в блок **_~catch~_** не обязательно передавать аргумент:

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

Этот блок кода отработает назависимо от того, чем завершился ~try...catch~.

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

![ico-20 warn] Обрати внимание: здесь брошен обычный объект, а не экземпляр **~Error~**. Оператор **~throw~** принимает любое значение — строку, число, объект, — а свойства ~name~, ~message~ и ~stack~ есть у него только потому, что мы их сами написали.

___

В результате выполнения кода:

◘◘![ico-25 cap] **11**◘◘

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

в консоль будет выброшено исключение:

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

Конструктор **AggregateError** создаёт одну ошибку, которая держит в себе несколько других. Он нужен там, где неудача не одна: проверка формы нашла три негодных поля, загрузка пробовала четыре зеркала и ни одно не ответило. Бросать первую попавшуюся и молчать об остальных — значит рассказать четверть правды.

~~~js
new AggregateError(errors, message)
~~~

![ico-20 green-ok] принимает итерируемую коллекцию ошибок и — необязательно — общее сообщение;
![ico-20 green-ok] у экземпляра появляется свойство **~errors~** — массив тех самых ошибок, — а ~name~, ~message~ и ~stack~ у него обычные, как у любой другой ошибки.

Появился в 2020 году: есть во всех нынешних браузерах и в Node.js начиная с пятнадцатой версии.

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

Перехватывают его как любую другую ошибку, а разбирают обходом **~errors~**:

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

Сам, без нашего участия, он прилетает из **~Promise.any()~**: этот метод ждёт первый успешный промис, и, если не удался ни один, отвергает результат одним **AggregateError** со всеми отказами внутри.

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

![ico-20 warn] Свойство ~stack~ не стандартизировано, и консоль печатает не его: в заголовке она показывает ~name~ и ~message~. Поэтому ошибка, созданная без сообщения, выглядит в консоли просто как **~AggregateError~** — сколько бы текста ни было записано в ~stack~.

___

## ![ico-25 hw] Тесты⟪Tests⟫

♣♣♣♣
? Что увидит консоль?

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
= Да. Перебор **~null~** бросает ~TypeError~, его ловит **~catch~** — и бросает дальше уже свою, заготовленную ошибку; ловить её некому. ![ico-20 warn] Заготовки удобны, но у такой ошибки стек указывает на строку, где её **создали**, а не где бросили, и один и тот же объект гуляет по всему коду.

- **~Uncaught TypeError: arr is not iterable~**
= Эта ошибка возникла первой, но её перехватил **~catch~**; наружу вышла другая.

- **~Uncaught Error: Argument must be a number~**
= Такая заготовка в коде есть, но её никто не бросал.

- Ничего: исключение перехвачено
= Перехвачено первое, а **~catch~** бросил новое — и этого уже никто не ловит.

? Что окажется на странице?

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
= Да. Ошибка — обычный объект: ей дали имя (ключ, под которым она лежит) и дописали метод. Метод вызван как **~error.callback()~**, поэтому **~this~** внутри — сама ошибка, а **~toString()~** у ошибки складывает имя и сообщение.

- **~There is no such a property~**
= Это только сообщение, а **~toString()~** ставит перед ним имя.

- **~Error: There is no such a property~**
= Так было бы, не перепиши цикл имя: он поставил вместо **~Error~** ключ **~notProperty~**.

- Ничего: у ошибки не может быть своих методов
= Может: экземпляр ошибки — такой же объект, как любой другой, и свойства ему дописываются так же.

? Что увидит консоль?

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

+ Ничего
= Да. Строка в **~catch~** вычисляется и выбрасывается: её никто не печатает и никуда не записывает. Исключение было, но от него не осталось следа — это худший вид обработки: код сделал вид, что ничего не случилось.

- **~Custom Error: There are no arguments~**
= Такая строка действительно собирается — и тут же пропадает: её не передали ни в **~console.log~**, ни куда-либо ещё.

- **~Uncaught Error: There are no arguments~**
= Нет: ошибка перехвачена, наружу она не вышла.

- **~Error: There are no arguments~**
= Исключение с таким текстом было сгенерировано, но в консоль оно не попало: его перехватили и промолчали.

? Что напечатает этот код?

~~~js
try {
  throw 'oops'
} catch (err) {
  console.log(typeof err, err.message)
}
~~~

+ **~string undefined~**
= Да. Оператор **~throw~** принимает любое значение; брошена строка, а свойства **~message~** у строки нет.

- **~object oops~**
= Нет: брошенная строка не превращается в объект ошибки.

- **~string oops~**
= Нет: **~err.message~** — свойство объекта ошибки, а здесь в **~err~** лежит сама строка.

- **~TypeError~**: бросать можно только ошибки
= Нет, бросать можно что угодно — другое дело, что ловить такое неудобно.

? Что будет в заголовке красной строки?

~~~js
const err = new Error('Arguments not valid')

err.name = 'ValidationError'

console.error(err)
~~~

+ **~ValidationError: Arguments not valid~**
= Да. Заголовок складывается из **~name~** и **~message~**, а имя переписали до того, как к ошибке обратились.

- **~Error: Arguments not valid~**
= Нет: имя — обычное свойство, и его новое значение попадёт в заголовок.

- **~ValidationError~** без сообщения
= Нет: сообщение осталось тем, что передали конструктору.

- **~Error: ValidationError~**
= Нет, местами они не меняются: сначала имя, потом сообщение.

? Что напечатает код?

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

+ **~sample~**, **~figure~** — и дальше необработанная **~Error: Sample error~**
= Да. Два первых свойства печатаются, на третьем вызов бросает ошибку, и, поскольку ловить её некому, цикл не продолжится: прерывается не итерация, а всё, что было в стеке.

- **~sample~**, **~figure~**, **~undefined~**
= Нет: функция не вернула ничего — она бросила ошибку, а это не то же самое.

- **~sample~**, **~figure~** — и больше ничего, ошибка пропадёт
= Нет: непойманная ошибка не пропадает, она выходит в консоль.

- Ничего: ошибка случится до первой печати
= Нет: до метода цикл доходит третьим, и две строки уже напечатаны.

? А здесь?

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
= Да. Исключение сгенерировано и здесь, но его перехватили — и цикл спокойно дошёл до конца. Двойной пробел не опечатка: двоеточие с пробелом дописаны в само имя, а **~console.log~** ставит свой пробел между аргументами.

- **~sample~**, **~figure~** — и необработанная ошибка
= Нет: вызов обёрнут в **~try~**, и ошибка дальше **~catch~** не ушла.

- **~sample~**, **~figure~**, **~Error: Ha-ha!~**
= Нет: имя у ошибки переписано, и печатается именно оно.

- **~sample~**, **~figure~**, **~undefined~**
= Нет: в **~catch~** печатают имя и сообщение, а не то, что вернул метод.

? В каком порядке выйдут строки?

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

+ сначала **~cleanup~**, потом **~value~**
= Да. Значение уже вычислено и ждёт, но **~finally~** выполняется прежде, чем функция его отдаст.

- сначала **~value~**, потом **~cleanup~**
= Нет: **~return~** не выпускает управление из функции мимо **~finally~**.

- только **~value~**
= Нет: **~finally~** выполняется всегда, в том числе после **~return~**.

- только **~cleanup~**
= Нет: возвращённое значение никуда не делось, его печатает внешний **~console.log~**.

? Что окажется в консоли?

~~~js
try {
  setTimeout(() => {
    throw new Error('later')
  })
} catch (err) {
  console.log('caught:', err.message)
}
~~~

+ Необработанная ошибка **~Uncaught Error: later~**
= Да. **~try...catch~** ловит только то, что брошено, пока он выполняется. Колбек таймера — отдельная задача, и к тому времени, когда он попадёт в стек, блок **~try~** давно закончился.

- **~caught: later~**
= Нет: к моменту, когда сработает таймер, стека с этим **~catch~** уже нет.

- **~caught: undefined~**
= Нет, блок **~catch~** здесь вообще не выполнится.

- Ничего: ошибка внутри таймера пропадёт молча
= Нет, она всплывёт как необработанная — поймать её этим **~catch~** нельзя, но и молча она не пропадёт.

? Что напечатает этот код?

~~~js
const fail = (text) => Promise.reject(new Error(text))

Promise.any([fail('A'), fail('B')])
  .catch((err) => console.log(err.name, '|', err.message, '|', err.errors.length))
~~~

+ **~AggregateError | All promises were rejected | 2~**
= Да. **~Promise.any~** ждёт первый успешный промис, и, если не удался ни один, отвергает результат одной **~AggregateError~** — со своим сообщением и обоими отказами в **~errors~**.

- **~Error | A | 2~**
= Нет: в **~catch~** приходит не первая из ошибок, а одна общая, которая держит их все.

- **~AggregateError | A | 2~**
= Нет: сообщение у неё своё — **~All promises were rejected~**, а сообщения отказов лежат внутри, в **~errors~**.

- Ничего: **~Promise.any~** не отвергает результат
= Отвергает — ровно в одном случае: когда не удался ни один из промисов.

? Что покажет консоль?

~~~js
const trouble = new AggregateError([new TypeError('bad')])

trouble.stack = 'Parse errors: element 1 is not an integer'

throw trouble
~~~

+ **~Uncaught AggregateError~** — и больше ничего
= Да. В заголовке консоль показывает **~name~** и **~message~**; сообщения у этой ошибки нет, потому что конструктору его не передали, а **~stack~** — не стандарт, и записанное в него консоль не печатает.

- текст из **~stack~**: **~Parse errors: element 1 is not an integer~**
= Так было в старых версиях Chrome, и на этом построена не одна картинка в интернете — в том числе та, что до недавнего времени стояла в этом уроке. Сегодня консоль печатает не **~stack~**.

- **~Uncaught AggregateError: bad~**
= Нет: **~bad~** — сообщение вложенной ошибки, а у самой **~AggregateError~** сообщения нет.

- **~Uncaught TypeError: bad~**
= Нет: брошена **~AggregateError~**, а вложенные ошибки лежат в **~errors~** и сами по себе не всплывают.
♣♣♣♣

___

## ![ico-25 hw] Квест⟪Quest⟫

♠♠♠♠ Проверка останавливается на первой же негодной записи, и о второй никто не узнает. Почини так, чтобы она прошла список до конца, собрала все негодные записи и бросила одну **~AggregateError~** с общим сообщением **~The list is not all integers~**, а каждая негодная запись осталась внутри отдельным **~TypeError~** со своим сообщением.
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
? 3 | брошена одна ошибка, и это AggregateError
OUTPUT[0] === 'AggregateError'

? 4 | в ней собраны обе негодные записи, а не только первая
OUTPUT[2] === '2'

? 3 | у неё своё общее сообщение
OUTPUT[1] === 'The list is not all integers'

? 2 | внутри остались настоящие TypeError, а не строки
OUTPUT[3] === 'TypeError TypeError'
♠♠♠♠

♠♠♠♠ Блок **~finally~** здесь прибирает за собой — и заодно глотает всё подряд: обычный вызов возвращает не прочитанное, а ошибка не доходит до того, кто её ждёт. Почини так, чтобы уборка осталась, значение возвращалось, а ошибка выходила наружу.
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
? 4 | обычный вызов возвращает прочитанное
OUTPUT[0] === 'value'

? 5 | ошибка больше не проглочена: её ловит тот, кто вызывал
OUTPUT[1] === 'caught: nothing to read'

? 3 | уборка всё равно сделана
OUTPUT[2] === 'open: false'
♠♠♠♠

♠♠♠♠ Метод **~changeParams~** верит аргументу на слово, и любой вызов не по форме роняет код: **~null~**, вызов без аргумента, объект без **~center~**, пустой массив. Почини так, чтобы ни один из пяти вызовов не бросил исключение: правильный аргумент применяется целиком, а любой другой не меняет ничего — параметры остаются такими, какими были.
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
? 4 | ни один вызов не уронил код: пять строк, и ни одного TypeError
OUTPUT.length === 5 && !OUTPUT.some((line) => line.includes('TypeError'))

? 4 | правильный аргумент применён целиком
OUTPUT[0] === '{"center":[3,4],"radius":7}'

? 4 | негодные аргументы ничего не испортили: параметры остались прежними
OUTPUT.slice(1).every((line) => line === OUTPUT[0])
♠♠♠♠
