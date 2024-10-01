# ![ico-30 study] Каррирование

☼☼☼ функциональщина ☼☼☼

____________________________________________


## ![ico-25 icon] Currying

Каррирование (currying) — это процесс преобразования функции, которая принимает несколько аргументов, в последовательность функций, каждая из которых принимает один аргумент.

![ico-25 cap] ** 1**

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~
Для каррирования используется тот же декоратор **bind**, который мы использовали для создания экземпляров функций со статическим контекстом вызова.
Поэтому первым аргументом по-прежнему передается ссылка на объект, который будет статическим контекстом вызова нового экземпляра функции.
Однако теперь мы можем передать дополнительные аргументы, которые станут статическими аргументами нового экземпляра функции.

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

Как видите, мы вызвали функции **_alpha_**, **_betta_** и **_delta_** без аргументов, но каждая функция вывела в консоль содержимое своего объекта **arguments**,
и это содержимое соотвествует тому, что было передано декоратору **bind** вторым аргументом при создании экземпляра функции.

Т.е. когда создавался экземпляр **_alpha_**, вторым аргументом методу **bind** была передана строка "alpha".
Эта строка стала статическим первым аргументом функции **_alpha_**.

Если мы теперь вызовем функцию **_alpha_** с дополнительными аргументами:

~~~js
alpha('sigma', 'omega')
~~~

то мы увидим в консоли:

~~~console
alpha,sigma,omega
~~~

При создании экземпляра **_betta_** мы применили декоратор **bind** к экземпляру **_alpha_**, у которого уже есть один статический аргумент,
и мы добавили экземпляру **_betta_** еще один статический аргумент - строку "betta"
Теперь если вызвать экземпляр **_betta_** с любыми дополнительными аргументами:

~~~js
betta('figure', 'smile')
~~~

то мы увидим в консоли:

~~~console
alpha,betta,figure,smile
~~~

т.е. у экземпляра **_betta_** уже два статических аргумента

ну, и так далее...

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

При вызове функции **_currying_** ей был передан всего 1 аргумент - строка "Google",
поэтому она вернула новый экземпляр функции со статическим аргументом "Google",
ссылку на который мы поместили в переменную **_curried_**

**Результат в консоли:**

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

Если вызвать новый экземпляр **_curried_** без аргументов, то она вернет ~null~:

~~~js
curried()  // null
~~~

Если же при вызове экземпляра **_curried_** мы передадим ей недостающий второй аргумент, например, строку "Mozilla", то в консоль будут выведены оба аргумента:

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

____________________

Воспользуемся приемом **_Currying_** для создания функций с заданным контекстом и фиксированным значением первого аргумента

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

**Результат в консоли:**

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

**Результат в консоли:**

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

**Результат в консоли:**

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

**Результат в консоли:**

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

[![ico-30 hw] Тесты](quiz/call-apply-bind)
