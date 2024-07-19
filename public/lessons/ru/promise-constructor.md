## ![ico-25 icon] Конструктор Promise

Для более глубокого понимания того, как работает конструктор Promise,
мы можем напилить собственный код, который будет делать практически то же самое

Поскольку колбэки промиса являются микротасками, мы будем использовать **MutationObserver**

Для этого вспомним, что это такое

### ![ico-20 icon] MutationObserver

Экземпляр **~MutationObserver~** отслеживает изменения элементов DOM

Создать такой экземпляр легко с помощью конструктора **~MutationObserver~**:

~~~js
const observer = new MutationObserver(function (mutations) {
  ...
})
~~~

В качестве аргумента конструктору **~MutationObserver~** передается колбэк-функция, 
которая станет микротаском при наступлении события мутации отслеживаемого элемента DOM

Итак, созданный объект **observer** унаследовал метод **~observe~**,
с помощью которого мы можем установить наблюдение за мутациями любого элемента DOM:

~~~js
observer.observe(element, options)
~~~

Объект ~options~ содержит инфо для обозревателя, что именно отслеживать при мутациях данного элемента
Можно ослеживать добавление / удаление потомков, мутации текстового содержимого элемента и т.д.

Мы будем отслеживать добавление или удаление дочерних элементов, 
включая текстовые узлы (text nodes) 
с помощью такой конфигурации: 

~~~js
const config = { childList: true }
~~~

Теперь осталось определить элементы, мутации которых мы будем отслеживать

_______________________________________________________________

### ![ico-20 icon] resolve | reject

Дело в том, что при создании промиса функция, которая передается конструктору **Promise**, должна быть исполнена сразу
Но в теле функции происходит вызов колбэков **~resolve~** | **~reject~**,
которые еще не определены на момент создания экземпляра **Promise**
и являются формальными параметрами этой функции

Поэтому при вызове этой функции в конструкторе **CustomPromise**
мы передадим этой функции собственные колбэки,
которые будут получать результат или ошибку и сохранять в каких-то переменных...

Однако переменные не отслеживаются экзумпляром **observer** - 
он может отслеживать только мутации элементов DOM

Поэтому поместим ответ, который вернет функция, в элементы-контейнеры
**~this.response~** и **~this.error~**:

~~~js
func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
~~~

а затем установим наблюдение за мутациями этих элементов:

~~~js
this.observer.observe(this.response, config)
this.observer.observe(this.error, config)
~~~

Конечно, эти элементы-контейнеры нужно создать, и сделать невидимыми
Для этого мы создадим унаследованный метод нашего конструктора **CustomPromise**:

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

Нам остается только вызвать это метод в конструкторе, чтобы создать нужные элементы-контейнеры:

~~~js
this.createContainer('response')
this.createContainer('error')
~~~

_____________________________________________________________________

### ![ico-20 icon] Кастомный конструктор


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

### ![ico-20 icon] Пример использования

Теперь используем конструктор **CustomPromise** для создания промиса:

~~~js
const user = { name: 'Stephan', age: 25, hobby: 'football' }
const errorCode = Math.round(Math.random() * 599)
const time = Math.random() * 5000

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(errorCode), time))
~~~

и передадим колбэки:

~~~js
promise
  .then(response => document.write(response), error => document.write('Error ' + error))
~~~

{{{promise.js}}}

________________________________________________

[%%%Тесты%%%](https://garevna.github.io/js-quiz/#promise)
