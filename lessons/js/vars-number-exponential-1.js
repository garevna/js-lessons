const section = document.body

section.style.fontFamily = 'monospace'

let number = 9999999999

const input = section.appendChild(document.createElement('input'))

const demo = section.appendChild(document.createElement('h3'))

Object.assign(input, {
  type: 'number',
  value: number,
  style: `
    padding: 4px 8px;
    margin: 16px 8px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 240px;
  `,
  onchange (event) {
    demo.innerHTML = 'number: <b style="color: #fa0">' + Number(event.target.value).toExponential()
  }
})

demo.innerHTML = 'Exponential: <b style="color: #fa0">' + number.toExponential()
