## ![ico-25 icon] The Promise constructor

To gain a deeper understanding of how the Promise constructor works,
we can write our own code that does practically the same thing

Since Promise callbacks are microtasks, we will use **MutationObserver**

To do this, let’s recall what it is

### ![ico-20 icon] MutationObserver

An instance of **~MutationObserver~** monitors changes to DOM elements

It is easy to create such an instance using the **~MutationObserver~** constructor:

~~~js
const observer = new MutationObserver(function (mutations) {
  ...
})
~~~

A callback function is passed as an argument to the **~MutationObserver~** constructor,
which will become a microtask when a mutation event occurs on the monitored DOM element

So, the created **observer** object has inherited the **~observe~** method,
which we can use to set up monitoring of mutations on any DOM element:

~~~js
observer.observe(element, options)
~~~

The object ~options~ contains information for the observer on exactly what to monitor when this element changes
You can monitor the addition or removal of descendants, changes to the element’s text content, and so on

We will monitor the addition or removal of child elements,
including text nodes
using the following configuration:

~~~js
const config = { childList: true }
~~~

Now we need to specify the elements whose changes we will monitor

_______________________________________________________________

### ![ico-20 icon] resolve | reject

The thing is that when creating a promise, the function passed to the **Promise** constructor must be executed immediately
However, within the body of the function, the callbacks **~resolve~** | **~reject~** are called,
which have not yet been defined at the time the **Promise** instance is created
and are formal parameters of this function

Therefore, when calling this function in the **CustomPromise** constructor
we will pass our own callbacks to this function,
which will receive the result or an error and store them in some variables...

However, variables are not monitored by the **observer** instance –
it can only monitor mutations of DOM elements

Therefore, we will place the response returned by the function into the container elements
**~this.response~** and **~this.error~**:

~~~js
func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
~~~

and then set up observation for mutations of these elements:

~~~js
this.observer.observe(this.response, config)
this.observer.observe(this.error, config)
~~~

Of course, these container elements need to be created and made invisible
To do this, we’ll create an inherited method of our **CustomPromise** constructor:

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

All that remains is to call this method in the constructor to create the required container elements:

~~~js
this.createContainer('response')
this.createContainer('error')
~~~

_____________________________________________________________________

### ![ico-20 icon] Custom constructor


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

### ![ico-20 icon] Example of use

Now let’s use the **CustomPromise** constructor to create a promise:

~~~js
const user = { name: 'Stephan', age: 25, hobby: 'football' }
const errorCode = Math.round(Math.random() * 599)
const time = Math.random() * 5000

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(errorCode), time))
~~~

and pass in the callbacks:

~~~js
promise
  .then(response => document.write(response), error => document.write('Error ' + error))
~~~

{{{promise.js}}}

________________________________________________

[%%%Tests%%%](https://garevna.github.io/js-quiz/#promise)
