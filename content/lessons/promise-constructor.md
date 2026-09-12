## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
const observer = new MutationObserver(function (mutations) {
  ...
})
~~~

{{s2.p3}}
{{s2.p4}}

{{s2.p5}}
{{s2.p6}}

~~~js
observer.observe(element, options)
~~~

{{s2.p7}}
{{s2.p8}}

{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

~~~js
const config = { childList: true }
~~~

{{s2.p12}}

_______________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}
{{s3.p4}}

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

{{s3.p8}}
{{s3.p9}}

{{s3.p10}}
{{s3.p11}}

~~~js
func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
~~~

{{s3.p12}}

~~~js
this.observer.observe(this.response, config)
this.observer.observe(this.error, config)
~~~

{{s3.p13}}
{{s3.p14}}

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

{{s3.p15}}

~~~js
this.createContainer('response')
this.createContainer('error')
~~~

_____________________________________________________________________

### ![ico-20 icon] {{s4.h1}}


{{s4.p1}}

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

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
const user = { name: 'Stephan', age: 25, hobby: 'football' }
const errorCode = Math.round(Math.random() * 599)
const time = Math.random() * 5000

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(errorCode), time))
~~~

{{s5.p2}}

~~~js
promise
  .then(response => document.write(response), error => document.write('Error ' + error))
~~~

{{{promise.js}}}

________________________________________________

{{s5.p3}}
