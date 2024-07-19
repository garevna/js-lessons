const section = document.body

const funcSymbol = '<span style="color: #f75"><em>f</em></span>'

const addElem = tagName => section.appendChild(document.createElement(tagName))

Object.getOwnPropertyNames(Array.prototype)
  .forEach(name => {
    const elem = Object.assign(addElem('div'), {
      style: 'color: #fff; font-family: monospace; font-size: 14px;'
    })
    if (typeof Array.prototype[name] === 'function') {
      elem.innerHTML = `
        ► <span style="color: #068; font-weight: bold;">
          ${name}
        </span>: ${funcSymbol} <em>${name}()</em>
      `
    }
  })
