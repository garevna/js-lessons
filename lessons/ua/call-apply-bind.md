# ![ico-30 study] Зміна контексту⟪Changing_the_context⟫

____________________________________________

## ![ico-25 icon] Конструктор Function⟪The_Function_constructor⟫

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

~~~console
▼ ƒ anonymous(x,y,z )
    arguments: null
    caller: null
    length: 3
    name: "anonymous"
  ► prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()
~~~

________________________________

## ![ico-25 icon] Спадкування⟪Inheritance⟫

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
      ► [[Prototype]]: Object
  ► [[Prototype]]: ƒ ()
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
  ▼ [[Prototype]]: ƒ ()
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
      ► [[Prototype]]: Object
~~~

^^^

![ico-20 pin] Оскільки конструктор **Function** також є функцією, його властивість **~__proto__~** теж є посиланням на власну властивість **~prototype~**

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

## ![ico-25 icon] Контекст виклику⟪prototype⟫

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

## ![ico-25 icon] Зміна контексту⟪Changing_the_context⟫

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

### ![ico-20 icon] call()⟪call⟫

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

~~~console
figure ► Arguments(3) [ 9, false, "Hello", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
sample ► Arguments(3) [ 5, 1, "Bye", callee: ƒ, Symbol(Symbol.iterator): ƒ ]
~~~

________________________________________

### ![ico-20 icon] apply()⟪apply⟫

Метод **~apply()~** відрізняється від методу **~call()~** лише способом передачі аргументів — тепер їх потрібно передавати масивом:

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

~~~console

<p class="warning-message">Who was called before figure (0):</p>
<p class="warning-message">Who was called before sample (1):</p>
figure
<p class="warning-message">Who was called before google (2):</p>
figure
sample

~~~

_____________________________

^^Виклики функції **_func_** реєструються в масиві **args**^^
^^При кожному виклику функція **_func_** отримує в аргументах повний звіт про те, скільки разів вона була викликана до цього, і з яким контекстом^^
^^Поміняйте місцями виклики функцій або додайте повторний виклик будь-якої з функцій і подивіться на результат^^

______________________________________________________________________________

### ![ico-20 icon] bind()⟪bind⟫

По суті, метод **~bind~** є декоратором, оскільки він створює обгортку для вихідної функції

Функція-обгортка, в яку «загортається» вихідна функція, викликає її в потрібному контексті:

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

Щоб функція-обгортка повертала новий екземпляр, трохи змінимо код,
а також забезпечимо можливість прив’язки не тільки контексту виклику,
але й аргументів (цей прийом програмування називається **_Currying_**, або каррірування):

~~~js
function bindContext (func, context, props) {
  return function (args) {
    props ? func.call(context, props, args) : func.call(context, args)
  }
}

function sample (message) {
  console.log(`${this.name}: ${message}`)
}

var user = { name: 'Figaro' }

var userSayHello = bindContext(sample, user, 'Hello')

var userSay = bindContext(sample, user)

userSayHello()     // Figaro: Hello
userSay('Bye')  // Figaro: Bye
~~~

Ось і весь механізм роботи методу **~bind~**

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
  console.warn(`The function func is called ${this.test()} times within the context of the object ${this.name}`)
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

~~~console
<p class="warning-message">The function func is called 1 times within the context of the object figure</p>
<p class="warning-message">The function func is called 2 times within the context of the object sample</p>
<p class="warning-message">The function func is called 3 times within the context of the object google</p>
~~~

_____________________________

^^Тепер контекст виклику екземплярів **~figureFunc()~**, **~sampleFunc()~** та **~googleFunc()~** змінити неможливо,^^
^^і під час виклику цих функцій не потрібно явно вказувати, в якому контексті вони викликаються^^

____________________________________

Додамо ще один об’єкт **bloom** з методами **~figure()~**, **~sample()~** та **~google()~**:

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

~~~console
<p class="warning-message">The function func is called 4 times within the context of the object figure</p>
<p class="warning-message">The function func is called 5 times within the context of the object sample</p>
<p class="warning-message">The function func is called 6 times within the context of the object google</p>
~~~

_______________________________

Незважаючи на явне зазначення контексту під час виклику методів:

~~~js
bloom.figure()
bloom.sample()
bloom.google()
~~~

вони виконуються в тому контексті, який ми їм «прив’язали» до цього
«Прив’язати» можна не лише контекст виклику, а й аргументи

_________________________________________

## ![ico-25 smile] Тест на винос мозку⟪A_mind-bending_test⟫

![ico-20 question] Що станеться в результаті запуску коду:

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
