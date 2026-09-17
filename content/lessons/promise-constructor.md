## ![ico-25 icon] {{p1}}

{{p2}}
{{p3}}

{{p4}}

{{p5}}

### ![ico-20 icon] MutationObserver

{{p6}}

{{p7}}

~~~js
const observer = new MutationObserver(function (mutations) {
  ...
})
~~~

{{p8}}
{{p9}}

{{p10}}
{{p11}}

~~~js
observer.observe(element, options)
~~~

{{p12}}
{{p13}}

{{p14}}
{{p15}}
{{p16}}

~~~js
const config = { childList: true }
~~~

{{p17}}

_______________________________________________________________

### ![ico-20 icon] resolve | reject

{{p18}}
{{p19}}
{{p20}}
{{p21}}

{{p22}}
{{p23}}
{{p24}}

{{p25}}
{{p26}}

{{p27}}
{{p28}}

~~~js
func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
~~~

{{p29}}

~~~js
this.observer.observe(this.response, config)
this.observer.observe(this.error, config)
~~~

{{p30}}
{{p31}}

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

{{p32}}

~~~js
this.createContainer('response')
this.createContainer('error')
~~~

_____________________________________________________________________

### ![ico-20 icon] {{p33}}


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

### ![ico-20 icon] {{p34}}

{{p35}}

~~~js
const user = { name: 'Stephan', age: 25, hobby: 'football' }
const errorCode = Math.round(Math.random() * 599)
const time = Math.random() * 5000

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(errorCode), time))
~~~

{{p36}}

~~~js
promise
  .then(response => document.write(response), error => document.write('Error ' + error))
~~~

{{{promise.js}}}

________________________________________________

{{p37}}
