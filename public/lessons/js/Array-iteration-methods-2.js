const section = document.body

const funcs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

funcs.forEach((item, index) => Object.assign(window, {
  [item]: arg => typeof arg === 'function' ? arg(index) : index
}))

const addElem = (tag, parent = section) => parent
  .appendChild(document.createElement(tag))

const span = '<span style="color: #fff; font-weight: normal; font-size: 14px">'

const showResult = () => Object.assign(result, {
  innerHTML: `${span}${select.value}(${input.value}) = </span>` + eval(`${select.value}(${input.value})`)
})

const select = Object.assign(addElem('select'), {
  value: funcs[0],
  style: `
    padding: 8px 16px;
    border: solid 1px #09b;
    border-radius: 4px;
    color: #09b;
    font-size: 16px;
    font-weight: bold;
    outline: none;
  `,
  onchange: showResult
})

funcs.forEach(name => {
  const option = Object.assign(addElem('option', select), {
    value: name,
    innerText: name,
    style: `font-size: 16px; color: #777;`
  })
})

const input = Object.assign(addElem('input'), {
  value: 'Math.sin',
  style: `
    padding: 8px 16px;
    margin-left: 16px;
    border: solid 1px #09b;
    border-radius: 4px;
    color: #09b;
    font-size: 16px;
    font-weight: bold;
    outline: none;
  `,
  onchange: showResult
})

const result = Object.assign(addElem('h3'), {
  style: `
    font-family: Montserrat, monospace, Roboto, Arial;
    color: #f50;
  `
})

showResult()
