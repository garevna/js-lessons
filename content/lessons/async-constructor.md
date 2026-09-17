## ![ico-25 icon] {{p1}}

[◄◄◄ Async function ◄◄◄](page/async-await)

{{p2}}

{{p3}}

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

{{p4}}

~~~js
test instanceof AsyncFunction
~~~

••![ico-20 error] Uncaught ReferenceError: AsyncFunction is not defined••

{{p5}}

~~~js
const AsyncFunctionConstructor = test.__proto__.constructor
~~~

^^{{common.c6}}^^

~~~js
const AsyncFunction = (async function () {}).__proto__.constructor
~~~

{{p6}}

~~~js
test instanceof AsyncFunction  // true
~~~

{{p7}}

~~~js
const asyncFunc = new AsyncFunction

console.log(asyncFunc)
~~~

**Result**

~~~console
async ƒ anonymous(
) {

}
~~~

{{p8}}

__________________________________

## ![ico-25 icon] prototype

{{p9}}

◘◘![ico-20 cap] {{common.c0}} 1◘◘

~~~js
(async function () {})
  .constructor.prototype
  .waitFor = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time * 1000))
~~~

{{p10}}

~~~js
const sample = async (message, time) => console.log(await sample.waitFor(message, time))
~~~

{{p11}}

~~~js
console.log('Start')

sample('Hello', 3)

console.log('End')
~~~

__________________________________

## ![ico-25 icon] {{p12}}

{{p13}}
{{p14}}

◘◘![ico-20 cap] {{common.c0}} 2◘◘

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
※※※tests quiz/async※※※
