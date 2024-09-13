const section = document.body

section
  .appendChild(document.createElement('style'))
  .textContent = `
    input {
      padding: 4px 8px;
      margin: 0 8px;
      border: solid 1px #ddd;
      border-radius: 4px;
    }
    .input-style-params {
    }
    .input-style-params::before {
      content: attr(label);
      color: #ddd;
    }
    .input-style-params::after {
      content: 'px';
      color: #ddd;
    }
  `
const target = section.appendChild(document.createElement('div'))
target.style = `
  height: 48px;
  border-style: solid;
  border-color: #090;
  border-width: 3px;
  margin: 8px;
  padding: 16px;
  border-radius: 4px;
  background: #0905;
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
demo.innerHTML = 'offsetHeight: <b style="color: #fa0">' + target.offsetHeight + '</b>px';

const [height, border, margin, padding] = ['height', 'border-width', 'margin', 'padding']
  .map(placeholder => {
    const wrapper = section.appendChild(document.createElement('div'))
    wrapper.setAttribute('label', placeholder)
    Object.assign(wrapper, {
      className: 'input-style-params'
    })
    const elem = wrapper.appendChild(document.createElement('input'))
    Object.assign(elem, {
      type: 'number',
      placeholder,
      value: parseInt(target.style[placeholder]),
      onchange: function (event) {
        target.style[event.target.placeholder] = event.target.value + 'px'
        demo.innerHTML = 'offsetHeight: <b style="color: #fa0">' + target.offsetHeight + '</b>px';
      }
    })
  })
