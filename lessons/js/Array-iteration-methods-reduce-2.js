const section = document.body

section.style['letterSpacing'] = '2px'

const input = section
  .appendChild(document.createElement('input'))
input.placeholder = 'Enter some text here...'
input.style = `
  padding: 8px 16px;
  width: 90%;
  border-radius: 4px;
  border: solid 1px #ddd;
`
const demo = section
  .appendChild(document.createElement('div'))
demo.style = `
  font-family: monospace, Roboto, Arial;
  font-size: 14px;
  padding: 36px;
  color: #fff;
`

const getDiv = (key, value) => `
  <div style="margin-left: 16px">
    <span style="color: #09b; font-weight: bold">${key === ' ' ? '&nbsp;' : key}</span>:
    <span style="color: #fa0">${value}</span>
  </div>
`

input.oninput = function (event) {
  const result = event.target.value.split('')
    .reduce((result, char) => Object.assign(result, {
      [char]: (result[char] || 0) + 1
    }), {})
  const str = Object.keys(result)
    .map(key => getDiv(key, result[key]))
    .join('')
  demo.innerHTML = '{<br>' + str + '}'
}
