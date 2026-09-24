const section = document.body

let userName = 'Stephan'
let number1 = 5
let number2 = 7

const userNameInput = section.appendChild(document.createElement('input'))
Object.assign(userNameInput, {
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 320px;
  `,
  value: 'Stephan',
  onchange: function (event) {
    userName = event.target.value
    updateString()
  }
})

const firstNumberInput = section.appendChild(document.createElement('input'))
Object.assign(firstNumberInput, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 120px;
  `,
  value: number1,
  onchange: function (event) {
    number1 = event.target.value
    updateString()
  }
})

const secondNumberInput = section.appendChild(document.createElement('input'))
Object.assign(secondNumberInput, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 120px;
  `,
  value: number2,
  onchange: function (event) {
    number2 = event.target.value
    updateString()
  }
})

const lineOfText = section.appendChild(document.createElement('h3'))
lineOfText.style = `
  font-family: monospace, Arial;
`
updateString()

function updateString () {
  lineOfText.innerHTML = `Hi, my name is <span style="color: #0df">${userName}</span>.<br />I can compute the value of expression: <span style="color: #0df">${number1} + ${number2} = ${parseInt(number1) + parseInt(number2)}</span>.`
}
