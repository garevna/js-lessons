## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

~~~js
async function test () {}
console.dir(test)
~~~

~~~~console
▼ async ƒ test()
    arguments: (...)
    caller: (...)
    length: 0
    name: "test"
  ▼ __proto__: AsyncFunction
        arguments: (...)
        caller: (...)
      ► constructor: ƒ AsyncFunction()
        Symbol(Symbol.toStringTag): "AsyncFunction"
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
~~~~

{{s1.p4}}

~~~js
test instanceof AsyncFunction
~~~

{{s1.p5}}

{{s1.p6}}

~~~js
const AsyncFunctionConstructor = test.__proto__.constructor
~~~

{{s1.p7}}

~~~js
const AsyncFunction = (async function () {}).__proto__.constructor
~~~

{{s1.p8}}

~~~js
test instanceof AsyncFunction  // true
~~~

{{s1.p9}}

~~~js
const asyncFunc = new AsyncFunction

console.log(asyncFunc)
~~~

{{s1.p10}}

~~~console
async ƒ anonymous(
) {

}
~~~

{{s1.p11}}

__________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
(async function () {})
  .constructor.prototype
  .waitFor = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time * 1000))
~~~

{{s2.p3}}

~~~js
const sample = async (message, time) => console.log(await sample.waitFor(message, time))
~~~

{{s2.p4}}

~~~js
console.log('Start')

sample('Hello', 3)

console.log('End')
~~~

__________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

~~~js
const func = arg => console.log(arg)

const user = func.bind(null, 'Stephan')
const browser = func.bind(null, 'Chrome')
const service = func.bind(null, 'Firebase')

user()      // Stephan
browser()   // Chrome
service()   // Firebase
~~~

_______________________
{{s3.p4}}
