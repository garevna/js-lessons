const section = document.body

function CustomPromise (func) {
  const config = { childList: true }

  this.resolve = null
  this.reject = null

  this.createContainer('response')
  this.createContainer('error')

  this.observer = this.getObserver()

  this.observer.observe(this.response, config)
  this.observer.observe(this.error, config)

  this.then = function (resolve, reject) {
    this.resolve = resolve
    this.reject = reject
  }

  func(response => this.response.textContent = JSON.stringify(response), error => this.error.textContent = JSON.stringify(error))
}

CustomPromise.prototype.createContainer = function (containerName) {
  this[containerName] = section.appendChild(document.createElement('pre'))
  this[containerName].id = containerName
  this[containerName].style.visibility = 'hidden'
  this[containerName].textContent = ''
}

CustomPromise.prototype.getObserver = function () {
  const self = this
  return new MutationObserver(function (mutations) {
    self.error && self.error.textContent && self.reject
      ? self.reject(self.error.textContent)
      : self.response && self.response.textContent && self.resolve
        ? self.resolve(self.response.textContent)
        : null
    })
}

const user = {
  name: 'Stephan',
  age: 25,
  hobby: 'football'
}

const getRandom = num => Math.round(Math.random() * num)

const promise = new CustomPromise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(user) : reject(getRandom(599)), getRandom(5000)))

promise.then(response => section.innerText = response, error => section.innerText = "Error " + error)
