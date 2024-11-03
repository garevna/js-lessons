const messages = {
  installing: 'Service worker installing',
  waiting: 'Service worker installed',
  active: 'Service worker active'
}

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('service-worker.js', { scope: './' })
      const status = Object.keys(messages).find(key => registration[key])
      status && console.log('SW STATUS:', messages[status])
      window[Symbol.for('service-worker')] = registration[status]
      window[Symbol.for('service-worker')].onmessage = event => console.log(event.data)
    } catch (error) {
      console.error(`ServiceWorker registration failed with ${error}`)
    }
  }
}

registerServiceWorker()
