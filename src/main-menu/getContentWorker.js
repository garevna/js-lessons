export function getContentWorker () {
  if (!window[Symbol.for('content.worker')]) {
    window[Symbol.for('content.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}content.worker.js`), {
      onerror: error => console.error('! Content worker Error\n', error)
    })
  }
  return window[Symbol.for('content.worker')]
}
