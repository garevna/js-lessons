# ![ico-30 study] Каррирование⟪Carrying⟫

☼☼☼ Функциональщина ☼☼☼

___

## ![ico-25 icon] Currying⟪Currying⟫

••Каррирование (Currying) имеет одинаковую фундаментальную математическую суть как в чистых функциональных языках (например, Haskell), так и в JavaScript: это преобразование функции, принимающей несколько аргументов, в последовательность функций, каждая из которых принимает ровно один аргумент. В Haskell каррирование встроено в саму природу языка. Функций с несколькими аргументами технически вообще не существует. В JavaScript функции по умолчанию принимают список аргументов. Чтобы сделать функцию каррируемой, её нужно специально спроектировать с помощью замыканий (closures).••

◘◘![ico-25 cap] **1**◘◘

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~

Для каррирования используется тот же декоратор **~bind~**, который мы применяли для создания экземпляров функций со статическим контекстом вызова.
Проблема **~bind(context, ...args)~**: этот метод был создан в JS в первую очередь для привязки контекста (ООП-задача), а частичное применение аргументов (каррирование) добавили туда как «попутную фичу».
Использование ~bind~ с объектом вместо ~null~ действительно нарушает чистую концепцию, поскольку превращает функцию в 'метод объекта', добавляя скрытый побочный эффект в виде мутируемого состояния (~this~).
Поэтому первым аргументом, как и раньше, передаётся ссылка на объект, который будет статическим контекстом вызова нового экземпляра функции.
**~bind(null, ...)~** — это отличный способ искусственно «укротить» ООП, явно отказавшись от контекста и вернув функцию в русло чистоты.
Теперь мы можем передать дополнительные аргументы, которые станут статическими аргументами нового экземпляра функции.

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

Как видите, мы вызвали функции **~alpha~**, **~etta~** и **~delta~** без аргументов, но каждая функция вывела в консоль содержимое своего объекта **arguments**,
и это содержимое соотвествует тому, что было передано декоратору **_~bind~_** вторым аргументом при создании экземпляра функции.

Т.е. когда создавался экземпляр **~alpha~**, вторым аргументом методу **_~bind~_** была передана строка 'alpha'.
Эта строка стала статическим первым аргументом функции **~alpha~**.

Если мы теперь вызовем функцию **~alpha~** с дополнительными аргументами:

~~~js
alpha('sigma', 'omega')
~~~

то мы увидим в консоли:

~~~console
alpha,sigma,omega
~~~

При создании экземпляра **~betta~** мы применили декоратор **bind** к экземпляру **~alpha~**, у которого уже есть один статический аргумент,
и мы добавили экземпляру **~betta~** еще один статический аргумент - строку 'betta'
Теперь если вызвать экземпляр **~betta~** с любыми дополнительными аргументами:

~~~js
betta('figure', 'smile')
~~~

то мы увидим в консоли:

~~~console
alpha,betta,figure,smile
~~~

т.е. у экземпляра **~betta~** уже два статических аргумента

ну, и так далее...

___

◘◘![ico-25 cap] **2**◘◘

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

При вызове функции **~currying~** ей был передан всего 1 аргумент - строка 'Google',
поэтому она вернула новый экземпляр функции со статическим аргументом 'Google',
ссылку на который мы поместили в переменную **~curried~**

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

Если вызвать новый экземпляр **~curried~** без аргументов, то она вернет ~null~:

~~~js
curried()  // null
~~~

Если же при вызове экземпляра **~curried~** мы передадим ей недостающий второй аргумент, например, строку 'Mozilla', то в консоль будут выведены оба аргумента:

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

___

Воспользуемся приемом **_^^Currying^^_** для создания функций с заданным контекстом и фиксированным значением первого аргумента

◘◘![ico-25 cap] **3**◘◘

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
~~~

~~~demo
> circleFunc(100, 120, 80)
< Функция func вызвана в контексте объекта figure c аргументами circle,100,120,80
> rectFunc(50, 50, 150, 150)
< Функция func вызвана в контексте объекта figure c аргументами rect,50,50,150,150
> lineFunc(20, 30, 200, 200)
< Функция func вызвана в контексте объекта figure c аргументами line,20,30,200,200
~~~

___

◘◘![ico-25 cap] **4**◘◘

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
~~~

~~~demo
> test[0]('IE')
< ► (2) ["Google", "IE"]
> test[1]('IE')
< ► (3) ["Google", "Mozilla", "IE"]
> test[2]('IE')
< ► (4) ["Google", "Mozilla", "Safari", "IE"]
~~~

___

◘◘![ico-25 cap] **5**◘◘

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

___

◘◘![ico-25 cap] **6**◘◘

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

___

◘◘![ico-25 cap] **7**◘◘

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
~~~

~~~demo
> func()()()()()()()()()()()
< ► []
< ► [1]
< ► (2) [1, 2]
< ► (3) [1, 2, 4]
< ► (4) [1, 2, 4, 8]
< ► (5) [1, 2, 4, 8, 16]
< ► (6) [1, 2, 4, 8, 16, 32]
< ► (7) [1, 2, 4, 8, 16, 32, 64]
< ► (8) [1, 2, 4, 8, 16, 32, 64, 128]
< ► (9) [1, 2, 4, 8, 16, 32, 64, 128, 256]
~~~

___

◘◘![ico-25 cap] **8**◘◘

~~~js
function test () {
  return Object.assign(this.bind(this, arguments[0] * 2), {
    result: arguments[0] * 2
  })
}

test = test.bind(test, 1)

console.log(test ()()()()()().result)  // 64
~~~

___

## ![ico-25 smile] Тест на вынос мозга⟪A_brain-teaser⟫

![ico-20 question] Что произойдет в результате запуска кода:

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

____

※※※tests quiz/call-apply-bind※※※
