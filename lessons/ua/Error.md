# ![ico-30 study] Exceptions⟪Exceptions⟫

Винятки призводять до переривання виконання поточної функції.
Однак ми можемо «перехоплювати» винятки та не допускати переривання виконання коду.

Коли ми «перехоплюємо» виняток, то отримуємо певний об’єкт, який містить опис того, що призвело до виникнення винятку.

Перш ніж перейти до перехоплення винятків, розберемося з об’єктом помилки (моделлю винятку) і, відповідно, з конструкторами, які створюють екземпляри помилки.

___

## ![ico-30 icon] Конструктори винятків⟪Exception_constructors⟫

☼☼☼ Бачиш об’єкт? — шукай конструктор ☼☼☼

### ![ico-20 icon] Error⟪Error⟫

Конструктор **Error** створює кастомний об’єкт **~Error~**.

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

![ico-20 warn] Конструктор **Error** можна викликати без ключового слова **~new~**.

Конструктор приймає необов’язковий параметр — текст повідомлення про помилку
^^(решта опціональних параметрів не були стандартизовані та не підтримуються браузерами).^^

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

Однак ми можемо додавати властивості до екземпляра конструктора **Error**.

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

Ми вже знаємо основні типи винятків, такі як ~SyntaxError~, ~ReferenceError~ та ~TypeError~.
Для кожного типу винятку є свій конструктор.
Однак кожен конструктор конкретного типу винятку успадковується від конструктора ~Error~.

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

Ви можете самостійно згенерувати виняток за допомогою оператора throw.

Оператор **~throw~** генерує визначений користувачем виняток (помилку).

Виконання поточної функції буде перервано, а управління передано до першого блоку **_~catch~_** у стеку викликів.

Якщо блок **_~catch~_** відсутній, виконання програми завершиться.

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

Як видно з прикладу, результат в консолі буде той самий, що й у випадку, коли ми виводимо об'єкт помилки в консоль за допомогою ~console.log~.

Тепер, коли ми зрозуміли, що таке екземпляр помилки, як створювати користувацькі екземпляри помилок і як можна згенерувати виняток, можна переходити до обробки помилок.

___

## ![ico-25 icon] try ... catch⟪try_..._catch⟫

Оператор ~try ... catch~ дозволяє перехопити винятки, які виникають під час виконання коду.

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

Якщо під час виконання коду в блоке **~try { ... }~** виникне помилка, управління перейде в блок **~catch~** з передачею в якості аргумента об'єкта помилки.

◘◘![ico-25 cap] **7**◘◘

~~~js
var obj = null

try {
  var x = obj.name
} catch (err) {
  var x = null
}
~~~

У цьому прикладі під час виконання коду

~~~js
var x = obj.name
~~~

має бути згенеровано виняток, який призведе до переривання роботи програми.

Завдяки тому, що виняток 'перехоплюється' в блоке **_~try~_**, управління переходить в блок **_~catch~_**, де змінній  **~x~** присвоюється значення **~undefined~**, і робота програми продовжується.

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

З 2019 року в блок **_~catch~_** не обов'язково передавати аргумент:

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

Цей блок коду виконається незалежно від того, як завершився блок ~try...catch~.

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

![ico-20 warn] Зверни увагу: тут кинуто звичайний об’єкт, а не екземпляр **~Error~**. Оператор **~throw~** приймає будь-яке значення — рядок, число, об’єкт, — а властивості ~name~, ~message~ і ~stack~ є в нього лише тому, що ми їх самі написали.

___

У результаті виконання коду:

◘◘![ico-25 cap] **11**◘◘

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

у консоль буде викинуто виняток:

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

Конструктор **AggregateError** створює одну помилку, яка тримає в собі кілька інших. Він потрібен там, де невдача не одна: перевірка форми знайшла три негодящі поля, завантаження пробувало чотири дзеркала і жодне не відповіло. Кидати першу-ліпшу й мовчати про решту — означає розповісти чверть правди.

~~~js
new AggregateError(errors, message)
~~~

![ico-20 green-ok] приймає ітеровану колекцію помилок і — необов’язково — спільне повідомлення;
![ico-20 green-ok] у екземпляра з’являється властивість **~errors~** — масив тих самих помилок, — а ~name~, ~message~ і ~stack~ у нього звичайні, як у будь-якої іншої помилки.

З’явився 2020 року: є в усіх нинішніх браузерах і в Node.js починаючи з п’ятнадцятої версії.

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

Перехоплюють його як будь-яку іншу помилку, а розбирають обходом **~errors~**:

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

Сам, без нашої участі, він прилітає з **~Promise.any()~**: цей метод чекає на перший успішний проміс, і якщо не вдався жоден, відхиляє результат одним **AggregateError** з усіма відмовами всередині.

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

![ico-20 warn] Властивість ~stack~ не стандартизована, і консоль друкує не її: у заголовку вона показує ~name~ і ~message~. Тому помилка, створена без повідомлення, виглядає в консолі просто як **~AggregateError~** — хоч скільки тексту було б записано в ~stack~.

___

## ![ico-25 hw] Тести⟪Tests⟫

♣♣♣♣
? Що побачить консоль?

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
= Так. Перебір **~null~** кидає ~TypeError~, його ловить **~catch~** — і кидає далі вже свою, заготовлену помилку; ловити її нікому. ![ico-20 warn] Заготовки зручні, але в такої помилки стек указує на рядок, де її **створили**, а не де кинули, і той самий об’єкт мандрує всім кодом.

- **~Uncaught TypeError: arr is not iterable~**
= Ця помилка виникла першою, але її перехопив **~catch~**; назовні вийшла інша.

- **~Uncaught Error: Argument must be a number~**
= Така заготовка в коді є, але її ніхто не кидав.

- Нічого: виняток перехоплено
= Перехоплено перше, а **~catch~** кинув нове — і цього вже ніхто не ловить.

? Що опиниться на сторінці?

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
= Так. Помилка — звичайний об’єкт: їй дали ім’я (ключ, під яким вона лежить) і дописали метод. Метод викликано як **~error.callback()~**, тому **~this~** усередині — сама помилка, а **~toString()~** у помилки складає ім’я та повідомлення.

- **~There is no such a property~**
= Це лише повідомлення, а **~toString()~** ставить перед ним ім’я.

- **~Error: There is no such a property~**
= Так було б, якби цикл не переписав ім’я: він поставив замість **~Error~** ключ **~notProperty~**.

- Нічого: помилка не може мати власних методів
= Може: екземпляр помилки — такий самий об’єкт, як будь-який інший, і властивості йому дописуються так само.

? Що побачить консоль?

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

+ Нічого
= Так. Рядок у **~catch~** обчислюється й викидається: його ніхто не друкує й нікуди не записує. Виняток був, але від нього не лишилося сліду — це найгірший вид обробки: код удав, що нічого не сталося.

- **~Custom Error: There are no arguments~**
= Такий рядок справді збирається — і одразу зникає: його не передали ні в **~console.log~**, ні кудись іще.

- **~Uncaught Error: There are no arguments~**
= Ні: помилку перехоплено, назовні вона не вийшла.

- **~Error: There are no arguments~**
= Виняток із таким текстом було згенеровано, але в консоль він не потрапив: його перехопили й промовчали.

? Що надрукує цей код?

~~~js
try {
  throw 'oops'
} catch (err) {
  console.log(typeof err, err.message)
}
~~~

+ **~string undefined~**
= Так. Оператор **~throw~** приймає будь-яке значення; кинуто рядок, а властивості **~message~** у рядка немає.

- **~object oops~**
= Ні: кинутий рядок не перетворюється на об’єкт помилки.

- **~string oops~**
= Ні: **~err.message~** — властивість об’єкта помилки, а тут у **~err~** лежить сам рядок.

- **~TypeError~**: кидати можна лише помилки
= Ні, кидати можна будь-що — інша річ, що ловити таке незручно.

? Що буде в заголовку червоного рядка?

~~~js
const err = new Error('Arguments not valid')

err.name = 'ValidationError'

console.error(err)
~~~

+ **~ValidationError: Arguments not valid~**
= Так. Заголовок складається з **~name~** і **~message~**, а ім’я переписали до того, як до помилки звернулися.

- **~Error: Arguments not valid~**
= Ні: ім’я — звичайна властивість, і його нове значення потрапить у заголовок.

- **~ValidationError~** без повідомлення
= Ні: повідомлення лишилося тим, що передали конструктору.

- **~Error: ValidationError~**
= Ні, місцями вони не міняються: спершу ім’я, потім повідомлення.

? Що надрукує код?

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

+ **~sample~**, **~figure~** — і далі неперехоплена **~Error: Sample error~**
= Так. Два перші властивості друкуються, на третій виклик кидає помилку, і, оскільки ловити її нікому, цикл не продовжиться: переривається не ітерація, а все, що було в стеку.

- **~sample~**, **~figure~**, **~undefined~**
= Ні: функція не повернула нічого — вона кинула помилку, а це не те саме.

- **~sample~**, **~figure~** — і більше нічого, помилка зникне
= Ні: неперехоплена помилка не зникає, вона виходить у консоль.

- Нічого: помилка станеться до першого друку
= Ні: до методу цикл доходить третім, і два рядки вже надруковано.

? А тут?

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
= Так. Виняток згенеровано й тут, але його перехопили — і цикл спокійно дійшов до кінця. Подвійний пробіл не помилка: двокрапку з пробілом дописано в саме ім’я, а **~console.log~** ставить свій пробіл між аргументами.

- **~sample~**, **~figure~** — і неперехоплена помилка
= Ні: виклик загорнутий у **~try~**, і помилка далі **~catch~** не пішла.

- **~sample~**, **~figure~**, **~Error: Ha-ha!~**
= Ні: ім’я в помилки переписано, і друкується саме воно.

- **~sample~**, **~figure~**, **~undefined~**
= Ні: у **~catch~** друкують ім’я та повідомлення, а не те, що повернув метод.

? У якому порядку вийдуть рядки?

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

+ спершу **~cleanup~**, потім **~value~**
= Так. Значення вже обчислене й чекає, але **~finally~** виконується перш ніж функція його віддасть.

- спершу **~value~**, потім **~cleanup~**
= Ні: **~return~** не випускає управління з функції повз **~finally~**.

- лише **~value~**
= Ні: **~finally~** виконується завжди, зокрема й після **~return~**.

- лише **~cleanup~**
= Ні: повернене значення нікуди не зникло, його друкує зовнішній **~console.log~**.

? Що опиниться в консолі?

~~~js
try {
  setTimeout(() => {
    throw new Error('later')
  })
} catch (err) {
  console.log('caught:', err.message)
}
~~~

+ Неперехоплена помилка **~Uncaught Error: later~**
= Так. **~try...catch~** ловить лише те, що кинуто, поки він виконується. Колбек таймера — окреме завдання, і на той час, коли він потрапить у стек, блок **~try~** давно скінчився.

- **~caught: later~**
= Ні: на момент, коли спрацює таймер, стека з цим **~catch~** уже немає.

- **~caught: undefined~**
= Ні, блок **~catch~** тут узагалі не виконається.

- Нічого: помилка всередині таймера зникне мовчки
= Ні, вона спливе як неперехоплена — упіймати її цим **~catch~** не можна, але й мовчки вона не зникне.

? Що надрукує цей код?

~~~js
const fail = (text) => Promise.reject(new Error(text))

Promise.any([fail('A'), fail('B')])
  .catch((err) => console.log(err.name, '|', err.message, '|', err.errors.length))
~~~

+ **~AggregateError | All promises were rejected | 2~**
= Так. **~Promise.any~** чекає на перший успішний проміс, і якщо не вдався жоден, відхиляє результат однією **~AggregateError~** — зі своїм повідомленням і обома відмовами в **~errors~**.

- **~Error | A | 2~**
= Ні: у **~catch~** приходить не перша з помилок, а одна спільна, яка тримає їх усі.

- **~AggregateError | A | 2~**
= Ні: повідомлення в неї власне — **~All promises were rejected~**, а повідомлення відмов лежать усередині, в **~errors~**.

- Нічого: **~Promise.any~** не відхиляє результат
= Відхиляє — рівно в одному випадку: коли не вдався жоден із промісів.

? Що покаже консоль?

~~~js
const trouble = new AggregateError([new TypeError('bad')])

trouble.stack = 'Parse errors: element 1 is not an integer'

throw trouble
~~~

+ **~Uncaught AggregateError~** — і більше нічого
= Так. У заголовку консоль показує **~name~** і **~message~**; повідомлення в цієї помилки немає, бо конструктору його не передали, а **~stack~** — не стандарт, і записане в нього консоль не друкує.

- текст зі **~stack~**: **~Parse errors: element 1 is not an integer~**
= Так було в старих версіях Chrome, і на цьому побудована не одна картинка в інтернеті — зокрема й та, що донедавна стояла в цьому уроці. Сьогодні консоль друкує не **~stack~**.

- **~Uncaught AggregateError: bad~**
= Ні: **~bad~** — повідомлення вкладеної помилки, а в самої **~AggregateError~** повідомлення немає.

- **~Uncaught TypeError: bad~**
= Ні: кинуто **~AggregateError~**, а вкладені помилки лежать у **~errors~** і самі по собі не спливають.
♣♣♣♣

___

## ![ico-25 hw] Квест⟪Quest⟫

♠♠♠♠ Перевірка зупиняється на першому-ліпшому негодящому записі, і про другий ніхто не дізнається. Почини так, щоб вона пройшла список до кінця, зібрала всі негодящі записи й кинула одну **~AggregateError~** зі спільним повідомленням **~The list is not all integers~**, а кожен негодящий запис лишився всередині окремим **~TypeError~** зі своїм повідомленням.
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
? 3 | кинуто одну помилку, і це AggregateError
OUTPUT[0] === 'AggregateError'

? 4 | у ній зібрані обидва негодящі записи, а не тільки перший
OUTPUT[2] === '2'

? 3 | у неї власне спільне повідомлення
OUTPUT[1] === 'The list is not all integers'

? 2 | усередині лишилися справжні TypeError, а не рядки
OUTPUT[3] === 'TypeError TypeError'
♠♠♠♠

♠♠♠♠ Блок **~finally~** тут прибирає за собою — і заразом ковтає все підряд: звичайний виклик повертає не прочитане, а помилка не доходить до того, хто на неї чекає. Почини так, щоб прибирання лишилося, значення поверталося, а помилка виходила назовні.
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
? 4 | звичайний виклик повертає прочитане
OUTPUT[0] === 'value'

? 5 | помилка більше не проковтнута: її ловить той, хто викликав
OUTPUT[1] === 'caught: nothing to read'

? 3 | прибирання все одно зроблено
OUTPUT[2] === 'open: false'
♠♠♠♠

♠♠♠♠ Метод **~changeParams~** вірить аргументу на слово, і будь-який виклик не за формою валить код: **~null~**, виклик без аргумента, об’єкт без **~center~**, порожній масив. Почини так, щоб жоден із п’яти викликів не кинув винятку: правильний аргумент застосовується цілком, а будь-який інший не змінює нічого — параметри лишаються такими, якими були.
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
? 4 | жоден виклик не повалив код: п’ять рядків, і жодного TypeError
OUTPUT.length === 5 && !OUTPUT.some((line) => line.includes('TypeError'))

? 4 | правильний аргумент застосовано цілком
OUTPUT[0] === '{"center":[3,4],"radius":7}'

? 4 | негодящі аргументи нічого не зіпсували: параметри лишилися колишніми
OUTPUT.slice(1).every((line) => line === OUTPUT[0])
♠♠♠♠
