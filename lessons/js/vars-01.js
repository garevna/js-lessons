const section = document.body

let decNumber = 9, binNumber = '101'

section.style.fontFamily = 'monospace'

function decChangeHandler (event) {
  showBinary(event.target.value)
}

function binChangeHandler (event) {
  showDecimal(event.target.value)
}

function binInputHandler (event) {
  event.target.value = event.target.value
    .split('')
    .filter(char => char === '0' || char === '1')
    .join('')
}

function showBinary (val) {
  binDemo.innerHTML = '<h3>Binary: <b style="color: #09b">' + parseInt(val).toString(2) + '</b></h3>'
}

function showDecimal (val) {
  decDemo.innerHTML = '<h3>Decimal: <b style="color: #fa0">' + parseInt(val, 2) + '</b></h3>'
}

const [th, tr] = [0, 1].map(() => section.appendChild(document.createElement('tr')))

const [decimal, binary] = [decChangeHandler, binChangeHandler].map((callback, index) => {
  const id = index ? 'binary-input' : 'decimal-input'
  const td = th.appendChild(document.createElement('td'))
  Object.assign(td.appendChild(document.createElement('label')), {
    for: id,
    innerText: index ? 'binary:' : 'decimal:'
  })
  const input = td.appendChild(document.createElement('input'))
  return Object.assign(input, {
    style: `
      padding: 8px 12px;
      margin: 16px;
      border: solid 1px #ddd;
      border-radius: 4px;
      width: 64px;
    `,
    id,
    value: index ? binNumber : decNumber,
    onchange: callback
  })
})

binary.pattern = /^[01]$/u
binary.oninput = binInputHandler

const [binDemo, decDemo] = [0, 1].map(() => tr.appendChild(document.createElement('td')))

showBinary(decNumber)
showDecimal(binNumber)
