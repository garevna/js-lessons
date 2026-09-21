## ![ico-25 icon] Конструктор AsyncFunction⟪The_constructor_AsyncFunction⟫

[◄◄◄ Async function ◄◄◄](page/async-await)

Асинхронна функція є екземпляром класу **AsyncFunction**

![ico-20 warn] AsyncFunction **не** є глобальним об’єктом

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

^^Спроба звернутися до об’єкта **AsyncFunction** спричинить виняток:^^

~~~js
test instanceof AsyncFunction
~~~

••![ico-20 error] Uncaught ReferenceError: AsyncFunction is not defined••

^^тому отримати посилання на неї можна, наприклад, так:^^

~~~js
const AsyncFunctionConstructor = test.__proto__.constructor
~~~

^^або:^^

~~~js
const AsyncFunction = (async function () {}).__proto__.constructor
~~~

^^Тепер винятку не буде:^^

~~~js
test instanceof AsyncFunction  // true
~~~

^^Більше того, ми можемо тепер використовувати посилання на конструктор AsyncFunction для створення екземпляра асинхронної функції:^^

~~~js
const asyncFunc = new AsyncFunction

console.log(asyncFunc)
~~~

~~~console
async ƒ anonymous(
) {

}
~~~

^^Але й це ще не все ![ico-20 smile]^^

__________________________________

## ![ico-25 icon] prototype⟪prototype⟫

^^Давайте додамо до прототипу конструктора асинхронних функцій метод **waitFor**:^^

◘◘![ico-20 cap] Приклад 1◘◘

~~~js
(async function () {})
  .constructor.prototype
  .waitFor = (message, time) => new Promise(resolve => setTimeout(() => resolve(message), time * 1000))
~~~

^^а тепер створимо асинхронну функцію **sample**:^^

~~~js
const sample = async (message, time) => console.log(await sample.waitFor(message, time))
~~~

^^Залишилося лише викликати функцію **sample**:^^

~~~js
console.log('Start')

sample('Hello', 3)

console.log('End')
~~~

__________________________________

## ![ico-25 icon] Каррування⟪Currying⟫

Змінити контекст виклику стрілкової функції за допомогою методів ~call~, ~apply~, ~bind~ неможливо
Однак каррування працює так само, як і у звичайних функцій

◘◘![ico-20 cap] Приклад 2◘◘

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
