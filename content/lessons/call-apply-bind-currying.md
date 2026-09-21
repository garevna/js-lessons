# ![ico-30 study] {{p1}}

☼☼☼ {{p2}} ☼☼☼

____________________________________________

## ![ico-25 icon] Currying

{{p3}}

![ico-25 cap] ** 1**

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~
{{p4}}
{{p5}}
{{p6}}

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

{{p7}}
{{p8}}

{{p9}}
{{p10}}

{{p11}}

~~~js
alpha('sigma', 'omega')
~~~

{{p12}}

~~~console
alpha,sigma,omega
~~~

{{p13}}
{{p14}}
{{p15}}

~~~js
betta('figure', 'smile')
~~~

{{p16}}

~~~console
alpha,betta,figure,smile
~~~

{{p17}}

{{p18}}

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

{{p19}}
{{p20}}
{{p21}}

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

{{p22}}

~~~js
curried()  // null
~~~

{{p23}}

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

____________________

{{p24}}

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

## ![ico-25 smile] {{p25}}

{{p26}}

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

※※※tests ⟦f1⟧※※※
