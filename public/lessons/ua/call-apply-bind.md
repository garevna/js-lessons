# ![ico-30 study] Зміна контексту

____________________________________________

## ![ico-25 icon] Конструктор Function

Функції можна створювати шляхом явного виклику конструктора **Function** із ключовим словом **_~new~_**

![ico-20 warn] Однак слід пам’ятати, що функції, створені таким чином, будуть анонімними
( "_anonymous_" )

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var func = new Function('x', 'y', `
  console.log(x, y)
  console.log(this)
  return arguments
`)

func(5, 8, 11, false)
~~~

^^У результаті в консолі будуть виведені 5, 8^^
^^потім — глобальний об’єкт ~window~^^
^^потім — об’єкт ~arguments~ функції, що містить 5, 8, 11, ~false~^^

~~~js
console.dir(func)
~~~

**Результат у консолі:**

~~~console
▼ ƒ anonymous(x,y,z )
    arguments: null
    caller: null
    length: 3
    name: "anonymous"
  ► prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

________________________________

## ![ico-25 icon] Спадкування

Отже, будь-яка функція в JS є _екземпляром_ класу **Function**

Звідси випливає:
![ico-20 pin] будь-яка функція є об’єктом
![ico-20 pin] усі функції успадковують властивості та методи об’єкта **_prototype_** конструктора **Function**


~~~js
console.dir(Function)
~~~

^^^[Результат у консолі:]

~~~console
▼ ƒ Function()
    arguments: (...)
    caller: (...)
    length: 1
    name: "Function"
  ▼ prototype: ƒ ()
      ► apply: ƒ apply()
        arguments: (...)
      ► bind: ƒ bind()
      ► call: ƒ call()
        caller: (...)
      ► constructor: ƒ Function()
        length: 0
        name: ""
      ► toString: ƒ toString()
      ► Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
      ► get arguments: ƒ ()
      ► set arguments: ƒ ()
      ► get caller: ƒ ()
      ► set caller: ƒ ()
      ► __proto__: Object
  ► __proto__: ƒ ()
~~~

^^^

![ico-20 warn] Властивість **~&#95;&#95;proto&#95;&#95;~** будь-якої функції є посиланням на властивість **_prototype_** конструктора **Function**

~~~js
function func () {
  console.dir(this)
}

console.dir(func)
~~~

^^^[Результат у консолі:]

~~~console
▼ ƒ func()
    arguments: null
    caller: null
    length: 0
    name: "func"
  ► prototype: {constructor: ƒ}
  ▼ __proto__: ƒ ()
      ► apply: ƒ apply()
        arguments: (...)
      ► bind: ƒ bind()
      ► call: ƒ call()
        caller: (...)
      ► constructor: ƒ Function()
        length: 0
        name: ""
      ► toString: ƒ toString()
      ► Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
      ► get arguments: ƒ ()
      ► set arguments: ƒ ()
      ► get caller: ƒ ()
      ► set caller: ƒ ()
      ► __proto__: Object
~~~

^^^

![ico-20 pin] Оскільки конструктор **Function** також є функцією, його властивість **_~__proto__~_** теж є посиланням на власну властивість **_~prototype~_**

_________________________________

Функція в JS:

![ico-20 pin] завжди є методом (тобто властивістю якогось об’єкта)
![ico-20 pin] завжди викликається в контексті якогось об’єкта

^^Покажемо, що функції, оголошені в глобальній області видимості, за замовчуванням є властивостями глобального об’єкта ~window~^^

◘◘![ico-25 cap] ** 2**◘◘

~~~js
function sample () {
  console.info('I\'m sample')
}

function figure () {
  console.info('I\'m figure')
}

var funcs = ['sample', 'figure']

for (var func of funcs) {
  window[func]()
}
~~~

^^Усі функції, імена яких перелічені в масиві **_funcs_**, будуть викликані, і в консолі буде виведено^^

~~~console
I'm sample
I'm figure
~~~

____________________________________

## ![ico-25 icon] Контекст виклику

@@@@
![](slogans/funcs-call-girls.svg)

Як ми вже знаємо, кожна функція в момент виклику отримує посилання на контекст виклику **_~this~_**.<br><br>Якщо контекст не вказано явно під час виклику, то за замовчуванням мається на увазі глобальний об’єкт (~window~).
@@@@

Явне вказування контексту виклику відбувається при зверненні до методів якого-небудь об’єкта:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var obj = {
  name: 'google',
  say: function () {
    console.log(this.name)
  }
}
obj.say()   // google
~~~

^^Тут перед ім’ям методу **_say()_** явним чином вказан контекст виклику **obj**,^^
^^тому _**~this~**_ всередині методу **_say()_** є посиланням на **obj**^^

~~~js
window.name = 'window'

function say () {
  console.log(this.name)
}

var obj = {
  name: 'google',
  say: say
}

say()       // window
obj.say()   // google
~~~

_____________________________________________

Розберіться самостійно з контекстом виклику методу ~getName~ функції ~getName~:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function getName () {
  console.log(this.name)
}

getName.getName = getName

getName.getName()
~~~
_____________________________________________

## ![ico-25 icon] Зміна контексту

Заглянувши у властивість **_~prototype~_** конструктора **Function** або у властивість **_~&#95;&#95;proto&#95;&#95;~_** екземпляра функції,
можна виявити три методи, які успадковують усі функції від свого творця:

![ico-20 green-ok] **~apply()~**
![ico-20 green-ok] **~call()~**
![ico-20 green-ok] **~bind()~**

Ці методи забезпечують можливість гнучко маніпулювати контекстом виклику функції

Методи **~apply~** та **~call~** дозволяють одноразово викликати функцію у заданому контексті

Вони відрізняються лише способом передачі аргументів

Метод **~bind~** створює новий екземпляр функції з жорстко встановленим контекстом виклику, який неможливо змінити або «втратити» під час повторних викликів

Крім цього, **~bind~** дозволяє так само жорстко прив’язати аргументи до нового екземпляра: фактично, зазначені аргументи стануть постійними для нового екземпляра функції

### ![ico-20 icon] call()

Першим обов’язковим аргументом методу є посилання на об’єкт, у контексті якого буде викликана функція

◘◘![ico-25 cap] ** 5**◘◘

~~~js
window.name = 'window'

function func () {
  console.log(this.name)
}

var figure = {
  name: 'figure'
}

var sample = {
  name: 'sample'
}

func()               // window
func.call(figure)    // figure
func.call(sample)    // sample
~~~

Далі може йти перелік аргументів:

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.call(figure, 9, false, 'Hello')
func.call(sample, 5, 1, 'Bye')
~~~

**Результат у консолі:**

••figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••
••sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]••


________________________________________

### ![ico-20 icon] apply()

Метод **_apply()_** відрізняється від методу **_call()_** лише способом передачі аргументів — тепер їх потрібно передавати масивом:

◘◘![ico-25 cap] ** 6**◘◘

~~~js
function func () {
  console.log(this.name, arguments)
}

var figure = { name: 'figure' }
var sample = { name: 'sample' }

func.apply(figure, [9, false, 'Hello'])
func.apply(sample, [5, 1, 'Bye'])
~~~

**Результат у консолі:**

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

__________________________________________________


Передача масиву аргументів замість переліку їхніх значень забезпечує певну гнучкість,
оскільки масиви передаються за посиланням, і вміст масиву може динамічно оновлюватися від виклику до виклику

◘◘![ico-25 cap] ** 7**◘◘

~~~js
var args = [0]

var test = (function () {
  var counter = 0
  return function () {
    args.push(this.name)
    args[0] = ++counter
  }
})()

function func () {
  this.test()
  var args = Array.from(arguments)
  console.warn(`Who was called before ${this.name} (${args.splice(0, 1)}):`)
  for (var x of args) console.info(x)
}

var objects = [
  { name: 'figure', test },
  { name: 'sample', test },
  { name: 'google', test }
]

objects.forEach(obj => func.apply(obj, args))
~~~

**Результат у консолі:**

••![ico-20 warn] ► Who was called before figure (0):••
••![ico-20 warn] ► Who was called before sample (1):••
••figure••
••![ico-20 warn] ► Who was called before google (2):••
••figure••
••sample••

_____________________________

^^Виклики функції **_func_** реєструються в масиві **args**^^
^^При кожному виклику функція **_func_** отримує в аргументах повний звіт про те, скільки разів вона була викликана до цього, і з яким контекстом^^
^^Поменяйте местами вызовы функций, или добавьте повторный вызов любой из функций, и посмотрите результат^^

______________________________________________________________________________

### ![ico-20 icon] bind()

По сути, метод **~bind~** является декоратором, поскольку он создает обертку для исходной функции

Функция-wrapper, в которую "заворачивается" исходная функция, вызывает ее в нужном контексте:

◘◘![ico-25 cap] ** 8**◘◘

~~~js
function bindContext (func, context, args) {
  func.call(context, args)
}

function sample ( message ) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Фигаро' }

bindContext(sample, user, 'Hello')
~~~

Чтобы функция-wrapper возвращала новый экземпляр, немного изменим код,
а так же обеспечим возможность привязки не только контекста вызова,
но и аргументов ( этот прием программирования называется **_Currying_**, или каррирование ):

~~~js
function bindContext (func, context, props) {
  return function (args) {
    props ? func.call(context, props, args) : func.call(context, args)
  }
}

function sample (message) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Фигаро' }

var userSayHello = bindContext(sample, user, 'Hello')

var userSay = bindContext(sample, user)

userSayHello()     // Фигаро: Hello
userSay('Bye')  // Фигаро: Bye
~~~

Вот и весь механизм работы метода **~bind~**

____________________________

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var test = (function () {
  var counter = 0
  return function () {
    return ++counter
  }
})()

function func () {
  console.warn(`Функция func вызвана ${this.test()} раз в контексте объекта ${this.name}`)
}

var objects = [
  { name: 'figure', test: test },
  { name: 'sample', test: test },
  { name: 'google', test: test }
]

var funcs = objects.map(obj => func.bind(obj))

funcs[0]()
funcs[1]()
funcs[2]()
~~~

**Результат у консолі:**

••![ico-20 warn] ► Функция func вызвана 1 раз в контексте объекта figure••
••![ico-20 warn] ► Функция func вызвана 2 раз в контексте объекта sample••
••![ico-20 warn] ► Функция func вызвана 3 раз в контексте объекта google••

_____________________________

^^Теперь контекст вызова экземпляров **_figureFunc()_**, **_sampleFunc()_** и **_googleFunc()_** изменить невозможно,
и при вызове этих функций не нужно явно указывать, в каком контексте они вызываются^^

____________________________________

Добавим еще один объект **bloom** с методами **_figure()_**, **_sample()_** и **_google()_**:

◘◘![ico-25 cap] **10**◘◘

~~~js
var bloom = { name: 'bloom' }
bloom.figure = funcs[0]
bloom.sample = funcs[1]
bloom.google = funcs[2]

bloom.figure()
bloom.sample()
bloom.google()
~~~

**Результат у консолі:**

••![ico-20 warn] ► Функция func вызвана 4 раз в контексте объекта figure••
••![ico-20 warn] ► Функция func вызвана 5 раз в контексте объекта sample••
••![ico-20 warn] ► Функция func вызвана 6 раз в контексте объекта google••

_______________________________

Несмотря на явное указание контекста при вызове методов:

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

они отрабатывают в том контексте, который мы им "прибиндили" до этого
"Прибиндить" можно не только контекст вызова, но также и аргументы


_________________________________________

## ![ico-25 smile] Тест на вынос мозга

![ico-20 question] Что произойдет в результате запуска кода:

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

※※※tests quiz/call-apply-bind※※※
