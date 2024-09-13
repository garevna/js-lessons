const section = document.body

section.style.fontFamily = 'monospace'

let operands = [0.1, 0.2]

const demo = section.appendChild(document.createElement('h1'))
const result = section.appendChild(document.createElement('h1'))
result.style = `
  width: max-content;
  margin: 64px auto;
  color: #09b;
  font-size: 28px;
`
let counter = 0

while (operands[0] < 1) {
  operands[1] = 0.1
  while (operands[1] < 1) {
    const demoText = `${operands[0]} + ${operands[1]}`
    const resultText = operands[0] + operands[1]
    setTimeout(() => {
      Object.assign(demo, { innerText: demoText })
      Object.assign(result, { innerText: resultText })
    }, 2000 * counter++)
    operands[1] = (operands[1] * 10 + 1) / 10
  }
  operands[0] = (operands[0] * 10 + 1) / 10
}
