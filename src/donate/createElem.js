export function createElem (tagName, container) {
  return (!container ? document.body : container).appendChild(document.createElement(tagName))
}
