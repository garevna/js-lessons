# ![ico-30 study] {{carrying}}

☼☼☼ {{fp}} ☼☼☼

___

## ![ico-25 icon] Currying

••{{description_1}}••

◘◘![ico-25 cap] **1**◘◘

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~

{{description_2}}
{{description_3}}
{{description_4}}

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

{{example_1_1}}
{{example_1_2}}

{{example_1_3}}
{{example_1_4}}

{{example_1_5}}

~~~js
alpha('sigma', 'omega')
~~~

{{example_1_6}}

~~~console
alpha,sigma,omega
~~~

{{example_1_7}}
{{example_1_8}}
{{example_1_9}}

~~~js
betta('figure', 'smile')
~~~

{{example_1_10}}

~~~console
alpha,betta,figure,smile
~~~

{{example_1_11}}

{{example_1_12}}

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

{{example_2_1}}
{{example_2_2}}
{{example_2_3}}

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

{{example_2_4}}

~~~js
curried()  // null
~~~

{{example_2_5}}

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

___

{{example_3_1}}

◘◘![ico-25 cap] **3**◘◘

~~~js
var test = function (args) {
  return Array.from(args).toString()
}

function func () {
  console.log (`{{example_3_console}} ${this.name} {{example_3_arguments}} ${this.test( arguments )}`)
}

var figure = { name: 'figure', test: test }

var circleFunc = func.bind(figure, 'circle')
var rectFunc = func.bind(figure, 'rect')
var lineFunc = func.bind(figure, 'line')
~~~

~~~demo
> circleFunc(100, 120, 80)
< {{example_3_console}} figure {{example_3_arguments}} circle,100,120,80
> rectFunc(50, 50, 150, 150)
< {{example_3_console}} figure {{example_3_arguments}} rect,50,50,150,150
> lineFunc(20, 30, 200, 200)
< {{example_3_console}} figure {{example_3_arguments}} line,20,30,200,200
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

## ![ico-25 smile] {{test}}

{{question}}

~~~js
var sample = function () {
  this.getSelf()
}

sample.getSelf = sample.bind(sample)

sample = sample.getSelf

sample()
~~~

____

※※※tests ⟦f1⟧※※※
