const section = document.body

section.style.fontFamily = 'monospace'

function showChar () {
  demo.textContent = String.fromCharCode(input.value)
}

Object.assign(section.appendChild(document.createElement('label')), {
  for: 'input-char-code',
  innerText: name
})
const input = section.appendChild(document.createElement('input'))
Object.assign(input, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 64px;
  `,
  id: 'input-char-code',
  value: 122,
  min: 0,
  onchange: showChar
})

const demo = section.appendChild(document.createElement('h1'))
demo.style = `
  width: 48px;
  margin: auto;
  color: #09b;
  font-size: 64px;
`

showChar()
