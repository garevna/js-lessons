# ![ico-30 study] Каррірування⟪Carrying⟫

☼☼☼ функціоналізм ☼☼☼

____________________________________________

## ![ico-25 icon] Currying⟪Currying⟫

Каррування (Currying) має однакову фундаментальну математичну суть як у чистокровних функціональних мовах (наприклад, Haskell), так і в JavaScript: це перетворення функції, яка приймає кілька аргументів, на послідовність функцій, кожна з яких приймає рівно один аргумент. У Haskell каррування вбудоване в саму природу мови. Функцій із кількома аргументами технічно взагалі не існує. У JavaScript функції за замовчуванням приймають список аргументів. Щоб зробити функцію каррованою, її потрібно спеціально спроектувати через замикання (closures).

![ico-25 cap] ** 1**

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~
Для каррірування використовується той самий декоратор **~bind~**, який ми застосовували для створення екземплярів функцій зі статичним контекстом виклику.
Проблема **~bind(context, ...args)~**: Цей метод був створений в JS насамперед для прив'язки контексту (ООП-задача), а часткове застосування аргументів (каррування) додали туди як 'попутну фічу'.
Використання ~bind~ з об'єктом замість ~null~ дійсно руйнує чисту концепцію, оскільки перетворює функцію на 'метод об'єкта', додаючи прихований побічний ефект у вигляді мутабельного стану (~this~).
Тому першим аргументом, як і раніше, передається посилання на об’єкт, який буде статичним контекстом виклику нового екземпляра функції.
**~bind(null, ...)~** - це чудовий спосіб штучно 'приборкати' ООП, явно відмовившись від контексту та повернувши функцію в русло чистоти.
Тепер ми можемо передати додаткові аргументи, які стануть статичними аргументами нового екземпляра функції.

~~~js
function sample () {
  console.log(Array.from(arguments).toString())
}

var alpha = sample.bind(null, 'alpha')
var betta = alpha.bind(null, 'betta')
var delta = betta.bind(null, 'delta')

alpha(), betta(), delta()
~~~

~~~console
alpha
alpha,betta
alpha,betta,delta
~~~

Як бачите, ми викликали функції **_alpha_**, **_betta_** та **_delta_** без аргументів, але кожна функція вивела в консоль вміст свого об’єкта **arguments**,
і цей вміст відповідає тому, що було передано декоратору **bind** другим аргументом під час створення екземпляра функції.

Тобто коли створювався екземпляр **_alpha_**, другим аргументом методу **bind** було передано рядок «alpha».
Цей рядок став статичним першим аргументом функції **_alpha_**.

Якщо ми тепер викличемо функцію **_alpha_** з додатковими аргументами:

~~~js
alpha('sigma', 'omega')
~~~

то ми побачимо в консолі:

~~~console
alpha,sigma,omega
~~~

Під час створення екземпляра **_betta_** ми застосували декоратор **bind** до екземпляра **_alpha_**, у якого вже є один статичний аргумент,
і ми додали екземпляру **_betta_** ще один статичний аргумент — рядок 'betta'.
Тепер, якщо викликати екземпляр **_betta_** з будь-якими додатковими аргументами:

~~~js
betta('figure', 'smile')
~~~

то ми побачимо в консолі:

~~~console
alpha,betta,figure,smile
~~~

тобто екземпляр **_betta_** вже має два статичні аргументи

ну, і так далі...

_______________________________________________________

◘◘![ico-25 cap] **11**◘◘

~~~js
function currying (first, second) {
  return arguments.length === 0
    ? null
    : arguments.length === 1
      ? function (second) {
          return arguments.length === 1
            ? [first, second]
            : null
        }
      : [first, second]
}

var curried = currying('Google')

console.log(curried)
~~~

Під час виклику функції **_currying_** їй було передано лише 1 аргумент — рядок 'Google',
тому вона повернула новий екземпляр функції зі статичним аргументом 'Google',
посилання на який ми помістили у змінну **_curried_**

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

Якщо викликати новий екземпляр **_curried_** без аргументів, то він поверне ~null~:

~~~js
curried()  // null
~~~

Якщо ж під час виклику екземпляра **_curried_** ми передамо їй відсутній другий аргумент, наприклад, рядок “Mozilla”, то в консоль будуть виведені обидва аргументи:

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

____________________

Скористаємося прийомом **_Currying_** для створення функцій із заданим контекстом і фіксованим значенням першого аргументу

◘◘![ico-25 cap] **12**◘◘

~~~js
var test = function (args) {
  return Array.from(args).toString()
}

function func () {
  console.log (`Функция func вызвана в контексте объекта ${this.name} c аргументами ${this.test( arguments )}`)
}

var figure = { name: 'figure', test: test }

var circleFunc = func.bind(figure, 'circle')
var rectFunc = func.bind(figure, 'rect')
var lineFunc = func.bind(figure, 'line')

circleFunc(100, 120, 80)
rectFunc(50, 50, 150, 150)
lineFunc(20, 30, 200, 200)
~~~

~~~console
Функция func вызвана в контексте объекта figure
     c аргументами circle,100,120,80
Функция func вызвана в контексте объекта figure
     c аргументами rect,50,50,150,150
Функция func вызвана в контексте объекта figure
     c аргументами line,20,30,200,200
~~~

_____________________________

◘◘![ico-25 cap] **13**◘◘

~~~js
function sample (first, second, third) {
  function test (arg) {
    return Array.from(arguments)
  }
  return [
    test.bind(null, first),
    test.bind(null, first, second),
    test.bind(null, first, second, third)
  ]
}

var test = sample('Google', 'Mozilla', 'Safari')

console.log(test[0]('IE'))
console.log(test[1]('IE'))
console.log(test[2]('IE'))
~~~

~~~console
► (2) ["Google", "IE"]
► (3) ["Google", "Mozilla", "IE"]
► (4) ["Google", "Mozilla", "Safari", "IE"]
~~~

_____________________________________

◘◘![ico-25 cap] **14**◘◘

~~~js
function sample (first, second, third) {
  function test (arg) {
    return Array.from(arguments)
  }
  var one = test.bind(null, first)
  var two = one.bind(null, second)
  var three = two.bind(null, third)
  return [one, two, three]
}

var test = sample('Google', 'Mozilla', 'Safari')

for (var num of [0, 1, 2]) console.log(test[num]('IE'))
~~~

~~~console
► (2) ["Google", "IE"]
► (3) ["Google", "Mozilla", "IE"]
► (4) ["Google", "Mozilla", "Safari", "IE"]
~~~

_____________________________________

◘◘![ico-25 cap] **15**◘◘

~~~js
function func () {
  if (!arguments.length) return func.bind(null, 1)
  console.log(arguments[0])
  return func.bind(null, arguments[0] * 2)
}

// func()()()()()()()()()()()
(eval(`func${'()'.repeat(11)}`))
~~~

~~~console
1
2
4
8
16
32
64
128
256
512
~~~

_____________________________________

◘◘![ico-25 cap] **16**◘◘

~~~js
function func () {
  if (!arguments.length) {
    func.log = []
    return func.bind(func, 1)
  }
  console.log(this.log)
  this.log.push(arguments[0])
  return this.bind(this, arguments[0] * 2)
}

func()()()()()()()()()()()
~~~

~~~console
► []
► [1]
► (2) [1, 2]
► (3) [1, 2, 4]
► (4) [1, 2, 4, 8]
► (5) [1, 2, 4, 8, 16]
► (6) [1, 2, 4, 8, 16, 32]
► (7) [1, 2, 4, 8, 16, 32, 64]
► (8) [1, 2, 4, 8, 16, 32, 64, 128]
► (9) [1, 2, 4, 8, 16, 32, 64, 128, 256]
~~~

_____________________________________

◘◘![ico-25 cap] **17**◘◘

~~~js
function test () {
  return Object.assign(this.bind(this, arguments[0] * 2), {
    result: arguments[0] * 2
  })
}

test = test.bind(test, 1)

console.log(test ()()()()()().result)  // 64
~~~
_________________________________________

## ![ico-25 smile] Тест на винесення мозку⟪A_brain-teaser⟫

![ico-20 question] Що відбудеться в результаті запуску коду:

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
