const section = document.body

let red = 150
let green = 200
let blue = 250
let color = `rgb(${red},${green},${blue})`

const redInput = section.appendChild(document.createElement('input'))
Object.assign(redInput, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 120px;
  `,
  value: red,
  max: 255,
  min: 0,
  onchange: function (event) {
    red = event.target.value
    updateColor()
  }
})

const greenInput = section.appendChild(document.createElement('input'))
Object.assign(greenInput, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 120px;
  `,
  value: green,
  max: 255,
  min: 0,
  onchange: function (event) {
    green = event.target.value
    updateColor()
  }
})

const blueInput = section.appendChild(document.createElement('input'))
Object.assign(blueInput, {
  type: 'number',
  style: `
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 120px;
  `,
  value: blue,
  max: 255,
  min: 0,
  onchange: function (event) {
    blue = event.target.value
    updateColor()
  }
})

const div = section.appendChild(document.createElement('div'))
div.style = `
  width: 100px;
  height: 100px;
  margin-top: 48px;
  margin-inline: auto;
  background: ${color};
`

const lineOfText = section.appendChild(document.createElement('h3'))
lineOfText.style = `
  font-family: monospace, Arial;
`
updateColor()

function updateColor () {
  color = `rgb(${red},${green},${blue})`
  lineOfText.textContent = color
  div.style.background = color
}
