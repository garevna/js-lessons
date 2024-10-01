export function storageState (key, value) {
  localStorage.setItem(key, value)
  window.dispatchEvent(Object.assign(new Event('storage'), { key, value }))
}
