## ![ico-25 icon] Конструктор Promise

Щоб глибше зрозуміти, як працює конструктор Promise,
ми можемо написати власний код, який робитиме практично те саме

Оскільки колбеки Promise є мікрозавданнями, ми використовуватимемо **MutationObserver**

Для цього згадаємо, що це таке

### ![ico-20 icon] MutationObserver

Екземпляр **~MutationObserver~** відстежує зміни елементів DOM

Створити такий екземпляр легко за допомогою конструктора **~MutationObserver~**:

~~~js
const observer = new MutationObserver(function (mutations) {
  ...
})
~~~

Як аргумент конструктору **~MutationObserver~** передається функція-колбек,
яка стане мікрозадачею при настанні події мутації відстежуваного елемента DOM

Отже, створений об’єкт **observer** успадкував метод **~observe~**,
за допомогою якого ми можемо встановити спостереження за мутаціями будь-якого елемента DOM:

~~~js
observer.observe(element, options)
~~~

Об’єкт ~options~ містить інформацію для спостерігача про те, що саме слід відстежувати під час змін даного елемента
Можна відстежувати додавання/видалення нащадків, зміни текстового вмісту елемента тощо

Ми будемо відстежувати додавання або видалення дочірніх елементів,
включаючи текстові вузли (text nodes)
за допомогою такої конфігурації:

~~~js
const config = { childList: true }
~~~

Тепер залишилося визначити елементи, зміни яких ми будемо відстежувати

_______________________________________________________________

### ![ico-20 icon] resolve | reject

Справа в тому, що під час створення промісу функція, яка передається конструктору **Promise**, має бути виконана одразу
Але в тілі функції відбувається виклик колбеків **~resolve~** | **~reject~**,
які ще не визначені на момент створення екземпляра **Promise**
і є формальними параметрами цієї функції

Тому під час виклику цієї функції в конструкторі **CustomPromise**
ми передамо цій функції власні колбеки,
які отримуватимуть результат або помилку та зберігатимуть їх у певних змінних...

Однак змінні не відстежуються екземпляром **observer** —
він може відстежувати лише зміни елементів DOM

Тому помістимо відповідь, яку поверне функція, в елементи-контейнери
**~this.response~** та **~this.error~**:

~~~js
func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
~~~

а потім встановимо спостереження за змінами цих елементів:

~~~js
this.observer.observe(this.response, config)
this.observer.observe(this.error, config)
~~~

Звісно, ці елементи-контейнери потрібно створити та зробити невидимими
Для цього ми створимо успадкований метод нашого конструктора **CustomPromise**:

~~~js
CustomPromise.prototype.createContainer = function (containerName) {
  this[containerName] = document.body
    .appendChild(document.createElement('pre'))
  Object.assign(this[containerName], {
    id: containerName,
    style: 'visibility: hidden',
    textContent: ''
  })
}
~~~

Нам залишається лише викликати цей метод у конструкторі, щоб створити потрібні елементи-контейнери:

~~~js
this.createContainer('response')
this.createContainer('error')
~~~

_____________________________________________________________________

### ![ico-20 icon] Кастомний конструктор


◘◘CustomPromise◘◘ 

~~~js
function CustomPromise (func) {
  const config = { childList: true }

  this.resolve = null
  this.reject = null

  this.createContainer('response')
  this.createContainer('error')
  this.createContainer('callbacks')

  this.observer = this.getObserver()

  this.observer.observe(this.response, config)
  this.observer.observe(this.error, config)
  this.observer.observe(this.callbacks, config)

  this.then = function (resolve, reject) {
    this.resolve = resolve
    this.reject = reject
    this.callbacks.text = 'set'
  }

  func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
}

CustomPromise.prototype.createContainer = function (containerName) {
  this[containerName]  = document.body.appendChild(document.createElement('pre'))
  this[containerName].id = containerName
  this[containerName].style.visibility = 'hidden'
  this[containerName].textContent = ''
}

CustomPromise.prototype.getObserver = function () {
  const self = this
  return new MutationObserver(function (mutations) {
    error && error.textContent && self.reject
      ? self.reject(error.textContent)
      : response && response.textContent && self.resolve
        ? self.resolve(response.textContent)
        : null
  })
}
~~~

_____________________________________________________________

### ![ico-20 icon] Приклад використання

Тепер використовуємо конструктор **CustomPromise** для створення промісу:

~~~js
const user = { name: 'Stephan', age: 25, hobby: 'football' }
const errorCode = Math.round(Math.random() * 599)
const time = Math.random() * 5000

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(errorCode), time))
~~~

і передамо колбеки:

~~~js
promise
  .then(response => document.write(response), error => document.write('Error ' + error))
~~~

{{{promise.js}}}

________________________________________________

[%%%Тести%%%](https://garevna.github.io/js-quiz/#promise)
