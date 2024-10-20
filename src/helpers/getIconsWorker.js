export function getIconsWorker () {
  if (!window[Symbol.for('icons.worker')]) {
    window[Symbol.for('icons.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}icons.worker.js`), {
      onerror: error => console.error('! Icons worker Error\n', error)
    })
  }
  return window[Symbol.for('icons.worker')]
}
