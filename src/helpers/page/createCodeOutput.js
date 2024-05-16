const { createElem } = require('../').default

export function createCodeOutput (fragment) {
  createElem('code-output', this.main).setAttribute('script', fragment.slice(3, -3))
}
