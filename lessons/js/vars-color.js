const section = document.body

section.style.fontFamily = 'monospace'

function showColor () {
  for (const channel of [red, green, blue]) channel.value = Math.min(255, Math.max(0, channel.value))
  opacity.value = Math.min(1, Math.max(0, opacity.value))
  demo.style.background = `rgb(${red.value}, ${green.value}, ${blue.value}, ${opacity.value})`
}

const [th, tr] = [0, 1].map(() => section.appendChild(document.createElement('tr')))

const [red, green, blue, opacity] = ['Red', 'Green', 'Blue', 'Opacity'].map((name, index) => {
  const id = ['red', 'green', 'blue', 'opacity'][index]
  const td = th.appendChild(document.createElement('td'))
  Object.assign(td.appendChild(document.createElement('label')), {
    for: id,
    innerText: name
  })
  const input = td.appendChild(document.createElement('input'))
  return Object.assign(input, {
    type: 'number',
    style: `
      padding: 8px 12px;
      margin: 16px;
      border: solid 1px #ddd;
      border-radius: 4px;
      width: 64px;
    `,
    id,
    value: id === 'opacity' ? 1.0 : 255,
    max: id === 'opacity' ? 1 : 255,
    step: id === 'opacity' ? .1 : 1,
    min: 0,
    onchange: showColor
  })
})

const demo = section.appendChild(document.createElement('div'))
demo.style = `
  margin: auto;
  width: 200px;
  height: 100px;
  background: #fff;
  border-radius: 4px;
`

showColor()
