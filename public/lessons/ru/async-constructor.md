## ![ico-25 icon] Конструктор AsyncFunction

[◄◄◄ Async function ◄◄◄](page/async-await)

Асинхронная функция является экземпляром класса **AsyncFunction**

![ico-20 warn] AsyncFunction **не** является глобальным объектом

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

^^Попытка отратиться к объекту **AsyncFunction** вызовет исключение:^^

~~~js
test instanceof AsyncFunction
~~~

••![ico-20 error] Uncaught ReferenceError: AsyncFunction is not defined••

^^поэтому получить ссылку на нее можно, например, так:^^

~~~js
const AsyncFunctionConstructor = test.__proto__.constructor
~~~

^^или:^^

~~~js
const AsyncFunction = (async function () {}).__proto__.constructor
~~~

^^Теперь исключения не будет:^^

~~~js
test instanceof AsyncFunction  // true
~~~

^^Более того, мы можем теперь использовать ссылку на конструктор AsyncFunction для создания экземпляра асинхронной функции:^^

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

^^Но и это еще не все ![ico-20 smile]^^

__________________________________

## ![ico-25 icon] prototype

^^Давайте добавим в прототип конструктора асинхронных функций метод **waitFor**:^^

◘◘![ico-20 cap] Пример 1◘◘

~~~js
(async function () {})
  .constructor.prototype
  .waitFor = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time * 1000))
~~~

^^а теперь создадим асинхронную функцию **sample**:^^

~~~js
const sample = async (message, time) => console.log(await sample.waitFor(message, time))
~~~

^^Осталось только вызвать функцию **sample**:^^

~~~js
console.log('Start')

sample('Hello', 3)

console.log('End')
~~~

__________________________________

## ![ico-25 icon] Каррирование

Изменить контекст вызова стрелочной функции с помощью методов ~call~, ~apply~, ~bind~ невозможно
Однако каррирование работает так же, как и у обычных функций

◘◘![ico-20 cap] Пример 2◘◘

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
[![ico-30 hw] Тесты](quiz/async )
