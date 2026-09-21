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

  // Whether anything was already in charge. On a first visit nothing is, and
  // the worker taking over is not news — it is the normal course of events.
  const hadController = !!navigator.serviceWorker.controller

  // What a page shows is decided by the version map, and the map lives inside
  // the worker that has the page. So a deploy reaches nobody until the new
  // worker is in charge, and by then the page in front of the reader has
  // already been assembled by the old one out of the old cache: bundles,
  // lessons and all. That is why a change would appear only on the second
  // reload, and why "it works locally, the site still shows the old one" was
  // the recurring complaint.
  //
  // Reload once, when the new worker actually takes over. Once: a flag, and
  // only where something was in charge to begin with.
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return
    reloading = true
    console.log('SW: new version took over — reloading once')
    location.reload()
  })

  try {
    const registration = await navigator.serviceWorker.register('service-worker.js', { scope: './' })
    const status = Object.keys(messages).find(key => registration[key])
    status && console.log('SW STATUS:', messages[status])

    // Ask now rather than waiting for the next navigation.
    registration.update().catch(() => {})
  } catch (error) {
    console.error(`ServiceWorker registration failed with ${error}`)
  }
}

registerServiceWorker()
