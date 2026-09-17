const messages = {
  installing: 'Service worker installing',
  waiting: 'Service worker installed',
  active: 'Service worker active'
}

// The service worker caches lessons, which is what makes the course work
// offline — and what makes an edit invisible while you are writing one. On
// localhost it stays out of the way, so a rebuilt page appears on reload
// instead of coming back from the cache.
//
// It can still be tested locally. In the console:
//
//   localStorage.setItem('service-worker', 'on')   // then reload
//   localStorage.removeItem('service-worker')      // back to out of the way
//
// Nothing here changes anywhere but localhost.
const isLocal = ['localhost', '127.0.0.1', '::1', ''].includes(location.hostname)

const wanted = () => {
  if (!isLocal) return true
  try {
    return localStorage.getItem('service-worker') === 'on'
  } catch {
    return false
  }
}

const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return

  if (!wanted()) {
    // An earlier visit may have left one registered and caching.
    const existing = await navigator.serviceWorker.getRegistrations()
    for (const registration of existing) await registration.unregister()

    console.log('SW: off on localhost — localStorage.setItem(\'service-worker\', \'on\') to test it')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register('service-worker.js', { scope: './' })
    const status = Object.keys(messages).find(key => registration[key])
    status && console.log('SW STATUS:', messages[status])
  } catch (error) {
    console.error(`ServiceWorker registration failed with ${error}`)
  }
}

registerServiceWorker()
