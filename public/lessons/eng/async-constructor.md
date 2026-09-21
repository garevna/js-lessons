## ![ico-25 icon] The constructor AsyncFunction⟪The_constructor_AsyncFunction⟫

[◄◄◄ Async function ◄◄◄](page/async-await)

An asynchronous function is an instance of the **AsyncFunction** class

![ico-20 warn] AsyncFunction **is not** a global object

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
  ▼ [[Prototype]]: AsyncFunction
        arguments: (...)
        caller: (...)
      ► constructor: ƒ AsyncFunction()
        Symbol(Symbol.toStringTag): "AsyncFunction"
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
~~~~

^^Attempting to access the **AsyncFunction** object will throw an exception:^^

~~~js
test instanceof AsyncFunction
~~~

••![ico-20 error] Uncaught ReferenceError: AsyncFunction is not defined••

^^Therefore, you can obtain a reference to it, for example, as follows:^^

~~~js
const AsyncFunctionConstructor = test.__proto__.constructor
~~~

^^or:^^

~~~js
const AsyncFunction = (async function () {}).__proto__.constructor
~~~

^^Now there will be no exception:^^

~~~js
test instanceof AsyncFunction  // true
~~~

^^Furthermore, we can now use a reference to the AsyncFunction constructor to create an instance of an asynchronous function:^^

~~~js
const asyncFunc = new AsyncFunction

console.log(asyncFunc)
~~~

~~~console
async ƒ anonymous(
) {

}
~~~

^^But that’s not all! [ico-20 smile]^^

__________________________________

## ![ico-25 icon] prototype⟪prototype⟫

^^Let’s add a **waitFor** method to the prototype of the asynchronous function constructor:^^

◘◘![ico-20 cap] Example 1◘◘

~~~js
(async function () {})
  .constructor.prototype
  .waitFor = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time * 1000))
~~~

^^And now let’s create an asynchronous function called **sample**:^^

~~~js
const sample = async (message, time) => console.log(await sample.waitFor(message, time))
~~~

^^All that remains is to call the **sample** function:^^

~~~js
console.log('Start')

sample('Hello', 3)

console.log('End')
~~~

__________________________________

## ![ico-25 icon] Currying⟪Currying⟫

It is not possible to change the context of an arrow function call using the ~call~, ~apply~, ~bind~ methods
However, currying works in exactly the same way as with ordinary functions

◘◘![ico-20 cap] Example 2◘◘

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
