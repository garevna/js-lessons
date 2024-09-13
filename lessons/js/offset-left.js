const section = document.body

section
  .appendChild(document.createElement('style'))
  .textContent = `
    input {
      padding: 4px 8px;
      margin: 0 8px;
      border: solid 1px #ddd;
      border-radius: 4px;
      width: 48px;
    }
    .input-style-params {
      font-family: monospace;
    }
    .input-style-params::before {
      content: attr(label);
      color: #ddd;
    }
    .input-style-params::after {
      content: 'px';
      color: #ddd;
    }
    .position-values {
      margin: 16px;
    }
    .position-values:before {
      content: 'position:',
      color: #ddd;
    }
  `

// const container = section.appendChild(document.createElement('div'))
const target = section.appendChild(document.createElement('div'))
target.style = `
  position: static;
  /* height: 48px; */
  width: 160px;
  border: solid 2px #090;
  margin: 8px;
  padding: 16px;
  border-radius: 4px;
  background: #0905;
  top: 180px;
  left: 240px;
  bottom: 16px;
  right: 16px;
`

const demo = target.appendChild(document.createElement('div'))
demo.style = `
  position: sticky;
  top: 4px;
  right: 4px;
  border-radius: 4px;
  padding: 4px 8px;
  background: #000;
`

const setDemo = () => Object.assign(demo, {
  innerHTML: 'offsetLeft: <b style="color: #fa0">' + target.offsetLeft + '</b>px'
})

setDemo()

const position = section.appendChild(document.createElement('div'))
position.className = 'position-values'
position.appendChild(document.createElement('span')).innerText = 'position:'

const positions = ['absolute', 'relative', 'static', 'sticky']
  .map(value => {
    const elem = position.appendChild(document.createElement('input'))
    Object.assign(elem, {
      name: 'position',
      type: 'radio',
      checked: target.style.position === value,
      value: target.style.position,
      id: value,
      value,
      onchange (event) {
        target.style.position = event.target.value
        const display = event.target.value === 'absolute' || event.target.value === 'relative' ? 'block' : 'none'
        Object.assign(left.style, { display })
        setDemo()
      }
    })
    const label = position.appendChild(document.createElement('label'))
    label.setAttribute('for', value)
    label.innerText = value
    label.style.fontFamily = 'monospace'
  })

const [left, margin] = ['left', 'margin']
  .map(placeholder => {
    const wrapper = section.appendChild(document.createElement('div'))
    wrapper.setAttribute('label', placeholder.padEnd(16, '.'))
    Object.assign(wrapper, {
      className: 'input-style-params'
    })
    const elem = wrapper.appendChild(document.createElement('input'))
    Object.assign(elem, {
      type: 'number',
      placeholder,
      value: parseInt(target.style[placeholder]),
      onchange (event) {
        target.style[event.target.placeholder] = event.target.value + 'px'
        setDemo()
      }
    })
    return wrapper
  })

  const display = target.style.display === 'absolute' || target.style.display === 'relative' ? 'block' : 'none'

  Object.assign(left.style, { display })
