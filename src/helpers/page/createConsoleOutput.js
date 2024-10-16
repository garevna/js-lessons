function spanKey (val) {
  return `<span class="console-keys">${val}</span>`
}
function spanValue (val) {
  return `<span class="console-values">${val}</span>`
}
function spanPrototype (val) {
  return `<span class="console-prototype">${val}</span>`
}
function spanProtoVal (val) {
  return `<span class="console-prototype-value">${val}</span>`
}

export function createConsoleOutput (fragment) {
  const lines = fragment.split('\n')
    .map(line => {
      const parts = line.split(':')
      if (parts.length === 2) {
        line = parts[0].indexOf('[[Prototype]]') !== -1
          ? line
            .replace(parts[0], spanPrototype(parts[0]))
            .replace(parts[1], spanProtoVal(parts[1]))
          : line
            .replace(parts[0], spanKey(parts[0]))
            .replace(parts[1], spanValue(parts[1]))
        }
        return line
      })
  fragment = lines.join('\n')
    .replaceAll('►', `<span class="console-collapsed" />`)
    .replaceAll('▼', `<span class="console-expanded" />`)
    .replaceAll('ƒ', `<span class="console-func-symbol" />`)
    .replaceAll('(...)', `<span class="console-calculated" />`)

  return Object.assign(document.createElement('pre'), {
    innerHTML: fragment.slice(10, fragment.length - 3).trim(),
    className: 'black'
  })
}
