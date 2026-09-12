# ![ico-30 study] {{s1.h1}}

☼☼☼ {{s1.slogan1}} ☼☼☼

____________________________________________


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

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

{{s2.p6}}
{{s2.p7}}

{{s2.p8}}
{{s2.p9}}

{{s2.p10}}

~~~js
alpha('sigma', 'omega')
~~~

{{s2.p11}}

~~~console
alpha,sigma,omega
~~~

{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

~~~js
betta('figure', 'smile')
~~~

{{s2.p15}}

~~~console
alpha,betta,figure,smile
~~~

{{s2.p16}}

{{s2.p17}}

_______________________________________________________


{{s2.p18}}

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

{{s2.p19}}
{{s2.p20}}
{{s2.p21}}

{{s2.p22}}

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

{{s2.p23}}

~~~js
curried()  // null
~~~

{{s2.p24}}

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

____________________

{{s2.p25}}

{{s2.p26}}

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

{{s2.p27}}

~~~console
Функция func вызвана в контексте объекта figure
     c аргументами circle,100,120,80
Функция func вызвана в контексте объекта figure
     c аргументами rect,50,50,150,150
Функция func вызвана в контексте объекта figure
     c аргументами line,20,30,200,200
~~~

_____________________________

{{s2.p28}}

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

{{s2.p29}}

~~~console
► (2) ["Google", "IE"]
► (3) ["Google", "Mozilla", "IE"]
► (4) ["Google", "Mozilla", "Safari", "IE"]
~~~

_____________________________________

{{s2.p30}}

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

{{s2.p31}}

~~~console
► (2) ["Google", "IE"]
► (3) ["Google", "Mozilla", "IE"]
► (4) ["Google", "Mozilla", "Safari", "IE"]
~~~


_____________________________________

{{s2.p32}}

~~~js
function func () {
  if (!arguments.length) return func.bind(null, 1)
  console.log(arguments[0])
  return func.bind(null, arguments[0] * 2)
}

// func()()()()()()()()()()()
(eval(`func${'()'.repeat(11)}`))
~~~

{{s2.p33}}

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

{{s2.p34}}

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

{{s2.p35}}


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

## ![ico-25 smile] {{s3.h1}}

{{s3.p1}}

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

_________________________

{{s3.p2}}
