# ![ico-30 study] Конструктор Error()

Конструктор **Error ()** создаёт объект **~Error~**

Конструктор принимает один необязательный параметр - текст сообщения об ошибке
^^( остальные опциональные параметры не были стандартизированы, и не поддерживаются браузерами )^^

![ico-25 cap] ** 1 **

~~~js
var err = new Error('Arguments are not valid')
~~~


## ![ico-25 icon] try ... catch

Оператор   ~try ... catch~   позволяет перехватить ошибку в процессе исполнения кода

Если при выполнении кода в блоке  **_try { ... }_**  возникнет ошибка, управление перейдет в блок  **_catch_** с передачей в качестве аргумента объекта ошибки

![ico-25 cap] ** 2 **

~~~js
try {
   ... (code)
} catch (err) {
   ... (code)
}
~~~

![ico-25 cap] ** 3 **

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

должно быть сгенерировано исключение, которое приведет к прерыванию работы программы

Благодаря тому, что исключение "перехватывается" в блоке **_try_**, управление переходит в блок **_catch_**, где переменной  ** x ** присваивается значение **~undefined~**, и работа программы продолжается

^^^[ES10 ( 2019 )]

Теперь в блок **_catch_** не обязательно передавать аргумент:

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

![ico-25 cap] ** 4 **

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
} catch (err) {
    console.error(err.stack)
} finally {
   console.info('try...catch завершил работу')
}
~~~

____________________________

## ![ico-25 icon] throw

Оператор **_throw_** генерирует пользовательское исключение ( ошибку )

Выполнение текущей функции будет прервано, и управление будет передано в первый блок **_catch_** в стеке вызовов

Если блок **_catch_** отсутствует, выполнение программы завершится

![ico-25 cap] ** 5 **

В результате выполнения кода:

~~~js
try {
  throw new Error('Arguments not valid')
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}
~~~

в консоль будет выброшено исключение:

![ico-20 err] ~Error: Arguments not valid~

_________________

![ico-25 cap] ** 6 **

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

![ico-20 err] ~ValidationError: Arguments not valid~


~~~console
Error: Arguments not valid
        at <anonymous>:4:17
    name: "ValidationError"
    message: "Arguments not valid"
    stack: "ValidationError: Arguments not valid↵    at <anonymous>:4:17"
    ▼ __proto__:
        ► constructor: ƒ Error()
          message: ""
          name: "Error"
        ► toString: ƒ toString()
        ► __proto__: Object
~~~

_________________

![ico-25 cap] ** 7 **

~~~js
try {
  throw({ name: 'Hi', message: 'It\'s a joke' } )
} catch (err) {
  console.log(err.name, err.message)
}
~~~

_________________

![ico-25 cap] ** 8 **

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

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSeOjdukTUBYGDKDv6s_hg_YyI2oDGLXzD6za0vUKVMYcQzw2Q/viewform)
