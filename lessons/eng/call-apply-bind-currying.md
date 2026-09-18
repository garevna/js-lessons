# ![ico-30 study] Carrying

☼☼☼ FP Goodies ☼☼☼

____________________________________________


## ![ico-25 icon] Currying

Currying has the same fundamental mathematical essence in both pure functional languages (such as Haskell) and JavaScript: it is the transformation of a function that takes several arguments into a sequence of functions, each of which takes exactly one argument. In Haskell, currying is built into the very nature of the language. Functions with multiple arguments do not technically exist at all. In JavaScript, functions take a list of arguments by default. To make a function currying-capable, it must be specifically designed using closures.

![ico-25 cap] ** 1**

~~~js
function reminder (arg) {
  return arguments.length < 5
    ? reminder.bind(null, ...arguments)
    : Array.from(arguments)
}
~~~
For currying, we use the same **~bind~** decorator that we used to create function instances with a static call context.
The problem with **~bind(context, ...args)~**: This method was created in JavaScript primarily for context binding (an OOP task), whilst partial argument application (currying) was added as a ‘side feature’.
Using ~bind~ with an object instead of ~null~ does indeed undermine the pure concept, as it turns the function into an 'object method', introducing a hidden side effect in the form of mutable state (~this~).
Therefore, as before, the first argument passes a reference to the object that will serve as the static context for calling a new instance of the function.
**~bind(null, ...)~** is a brilliant way to artificially ‘tame’ OOP, explicitly abandoning context and returning the function to the path of purity.
We can now pass additional arguments, which will become static arguments for the new instance of the function.

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

As you can see, we called the functions **_alpha_**, **_betta_** and **_delta_** without any arguments, but each function printed the contents of its **arguments** object to the console
and this content corresponds to what was passed to the **bind** decorator as the second argument when the function instance was created.

In other words, when the instance **_alpha_** was created, the string 'alpha' was passed as the second argument to the **bind** method.
This line has become the first static argument of the **_alpha_** function.

If we now call the **_alpha_** function with additional arguments:

~~~js
alpha('sigma', 'omega')
~~~

we will see the following in the console:

~~~console
alpha,sigma,omega
~~~

When creating an instance of **_betta_**, we applied the **bind** decorator to the **_alpha_** instance, which already has one static argument
and we added another static argument to the **_betta_** instance – the string 'betta'.
Now, if you call an instance of **_betta_** with any additional arguments:

~~~js
betta('figure', 'smile')
~~~

we will see the following in the console:

~~~console
alpha,betta,figure,smile
~~~

i.e. the **_betta_** instance already has two static arguments

and so on...

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

When the **_currying_** function was called, only one argument was passed to it – the string 'Google'
so it returned a new instance of the function with the static argument 'Google'
a reference to which we stored in the variable **_curried_**

**Result in the console:**

~~~console
ƒ ( second ) {
    return arguments.length === 1 ?
        [ first, second ] : null
}
~~~

If we call the new instance **_curried_** without any arguments, it will return ~null~:

~~~js
curried()  // null
~~~

However, if, when calling the **_curried_** instance, we pass it the missing second argument – for example, the string “Mozilla” – then both arguments will be printed to the console:

~~~js
curried('Mozilla')   // ► (2) ["Google", "Mozilla"]
~~~

____________________

Let’s use the **_Currying_** technique to create functions with a specified context and a fixed value for the first argument

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

**Result in the console:**

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

**Result in the console:**

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

**Result in the console:**

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

**Result in the console:**

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

## ![ico-25 smile] A brain-teaser

![ico-20 question] What will happen when the following code is run:

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
