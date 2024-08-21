export function createWarningOutput (fragment) {
  return Object.assign(document.createElement('pre'), {
    textContent: fragment.slice(10, fragment.length - 3).trim(),
    className: 'warning-message'
  })
}
