# ![ico-30 study] Exceptions

Исключения приводят к прерыванию выполнения текущей функции.
Однако мы можем "перехватывать" исключения и не допускать прерывания выполнения кода.

Когда мы "перехватываем" исключение, то мы получаем некий объект, который содержит описание того, что привело к генерации исключения.

Прежде, чем перейти к перехвату исключений, разберемся с обектом ошибки (моделью исключения) и, соответственно, конструкторами, которые создают экземпляры ошибки.

☼☼☼ Бачиш об'єкт? - шукай конструктор ☼☼☼

## ![ico-30 icon] Конструкторы исключений

### ![ico-20 icon] Error

Конструктор **Error** создаёт кастомный объект **~Error~**.

![](illustrations/Error-constructor.png)

![ico-20 warn] ^^Конструктор **Error** может быть вызван без ключевого слова **~new~**.^^

Конструктор принимает необязательный параметр - текст сообщения об ошибке
^^(остальные опциональные параметры не были стандартизированы, и не поддерживаются браузерами).^^

![ico-25 cap] ** 1**

~~~js
var err = new Error('Arguments are not valid')
console.dir(err)
~~~

![](illustrations/Error-example-01.png)

Однако мы можем добавлять свойства экземпляру конструктора **Error**.

![ico-25 cap] ** 2**

~~~js
var error = Object.assign(new Error('Hello'), {
  fileName: 'figure',
  lineNumber: 11,
  stack: 'Welcome'
})

console.dir(error)
console.error(error)
~~~

![](illustrations/Error-example-02.png)

_________________

Мы уже знаем основные типы исключений, такие как ~SyntaxError~, ~ReferenceError~ and ~TypeError~.
Для каждого типа исключения есть свой конструктор.
Однако каждый конструктор конкретного типа исключения наследует от конструктора ~Error~.

### ![ico-20 icon] SyntaxError

![](illustrations/SyntaxError.png)

![ico-25 cap] ** 3**

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

console.dir(syntaxError)
console.error(syntaxError)
~~~

![](illustrations/SyntaxError-example-01.png)

_________________________

### ![ico-20 icon] ReferenceError

![](illustrations/ReferenceError.png)

![ico-25 cap] ** 4**

~~~js
const referenceError = Object.assign(new ReferenceError(), {
  message: 'We do not know such a person.',
  name: 'Identification Error.',
  stack: 'Search for person failed.'
})
console.dir(referenceError)
console.error(referenceError)
~~~

![](illustrations/ReferenceError-example-01.png)
________________________

### ![ico-20 icon] TypeError

![](illustrations/TypeError.png)

![ico-25 cap] ** 5**

~~~js
const typeError = Object.assign(new TypeError(), {
  message: 'Invalid pincode',
  name: 'Custom Error',
  stack: 'Look here...'
})

console.dir(typeError)
console.error(typeError)
~~~

![](illustrations/TypeError-example-01.png)

____________________________

## ![ico-30 icon] Оператор throw

Вы можете сами сгенерировать исключение с помощью оператора throw.

Оператор **~throw~** генерирует пользовательское исключение (ошибку).

Выполнение текущей функции будет прервано, и управление будет передано в первый блок **_catch_** в стеке вызовов.

Если блок **_catch_** отсутствует, выполнение программы завершится.

![ico-25 cap] ** 6**

~~~js
const syntaxError = Object.assign(new SyntaxError(), {
  message: 'You should learn JS.',
  name: 'Ignorant newbie Error.',
  stack: 'Code execution failed.'
})

throw syntaxError
~~~

![](illustrations/SyntaxError-example-02.png)

Как видно из примера, результат в консоли будет тот же самый, что и в случае, когда мы выводим объект ошибки в консоль с помощью ~console.log~.

Теперь, когда мы поняли, что из себя представляет экземпляр ошибки, как создавать пользовательские экземпляры ошибок, и как можно сгенерировать исключение, можно переходить к перехвату ошибок.

________________________

## ![ico-25 icon] try ... catch

Оператор   ~try ... catch~   позволяет перехватить исключения, возникающие в процессе выполнения кода.

~~~js
try {
  ...
} catch (err) {
  ...
}
~~~

Если при выполнении кода в блоке  **~try { ... }~**  возникнет ошибка, управление перейдет в блок  **~catch~** с передачей в качестве аргумента объекта ошибки.

![ico-25 cap] ** 7**

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

Благодаря тому, что исключение "перехватывается" в блоке **_try_**, управление переходит в блок **_catch_**, где переменной  ** x ** присваивается значение **~undefined~**, и работа программы продолжается.

__________________________________

![ico-25 cap] ** 8**

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

![](illustrations/Error-example-reference-error-01.png)

![ico-25 cap] ** 9**

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

![](illustrations/Error-example-type-error-01.png)

_________________________


^^^[ES 2019]

С 2019 года в блок **_catch_** не обязательно передавать аргумент:

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

Этот блок кода отработает назависимо от того, чем завершился `try...catch`

![ico-25 cap] **10**

~~~js
try {
  throw({
    name: 'Hi',
    message: 'It\'s a joke',
    stack: `
      Hello,
      sorry for the interruption,
      I really wanted to say hello 😉
    `
  })
} catch (err) {
    console.error(err.stack)
} finally {
   console.info('try...catch completed')
}
~~~

![](illustrations/try-catch-finally-01.png)

____________________________
![ico-25 cap] **11**

В результате выполнения кода:

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

в консоль будет выброшено исключение:

••![ico-20 error] Error: Arguments not valid••

____________________________

![ico-25 cap] **12**

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

console.dir(err)
~~~

![](illustrations/Error-example-12.png)

_________________

![ico-25 cap] **13**

~~~js
try {
  throw({ name: 'Hi', message: 'It\'s a joke' } )
} catch (err) {
  console.log(err.name, err.message)
}
~~~

_________________

![ico-25 cap] **14**

~~~js
try {
  throw({
    name: 'Hi',
    message: 'It\'s a joke',
    stack: `
      Привет,
      извините за вмешательство,
      очень хотелось поздороваться 😉
    `
  })
} catch (err) { console.error(err.stack) }

~~~

_________________________

## AggregateError

![ico-25 cap] **15**

~~~js
const array = [5, 'hero', false, 9, { type: 0 }, [], 11, 34.5, 8.5, 77]

function parseArray (array, errors = []) {
  if (!Array.isArray(array)) {
    errors.push(new TypeError('Argument should be an array'))
    return errors
  }
  const name = 'Parse Array Error'
  array.forEach((item, index) => !Number.isInteger(item) &&
    errors
      .push(Object.assign(new SyntaxError(), { name, stack: `Array element ${index} is not an integer.` })))
  return errors
}

const aggregatedError = new AggregateError(parseArray(array))

Object.assign(aggregatedError, {
  stack: 'Parse Array Errors:\n' + aggregatedError.errors.map(err => '    ' + err.stack).join('\n')
})

throw aggregatedError
~~~

![](illustrations/AggregateError-example-01.png)

__________________________________

[![ico-30 hw] **Упражнения**](test/exclusions)
