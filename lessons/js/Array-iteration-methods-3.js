const section = document.body

const funcs = ['plus', 'minus', 'divide', 'multiply']

funcs.forEach((item, index) => Object.assign(window, {
  operations: ['+', '-', '/', '*'],
  [item]: function () {
    return arguments.length === 2
      ? eval(`arguments[0] ${operations[index]} arguments[1]`)
      : window[item].bind(null, arguments[0])
  }
}))

const messages = [
  `plus(5, 4) = ${eval('plus(5, 4)')}`,
  `plus(10)(11) = ${eval('plus(10)(11)')}`,
  `plus(multiply(8, 2), 4) = ${eval('plus(multiply(8, 2), 4)')}`,
  `plus(multiply(divide(16, 4), 2), 4) = ${eval('plus(multiply(divide(16, 4), 2), 4)')}`,
  `plus(multiply(divide(16, 4), 2), minus(8)(3)) = ${eval('plus(multiply(divide(16, 4), 2), minus(8)(3))')}`
]

const createTypeWritter = function (string) {
  const container = section.appendChild(document.createElement('p'))
  container.style = `
    font-family: monospace, Roboto, Arial;
    font-size: 13px;
    color: #fff;
    letter-spacing: 1.2px;
    word-spacing: 4px;
  `
  return function (container, string) {
    string.split('')
      .forEach((char, index) => setTimeout(() => { container.textContent += char }, 200 * index))
  }.bind(null, container, string)
}

const writters = messages.map(message => createTypeWritter(message))
const getLength = num => messages.slice(0, num).join(' ').length

writters.forEach((func, num) => setTimeout(func, getLength(num) * 200))

// const addElem = (tag, parent = section) => parent
//   .appendChild(document.createElement(tag))
//
// const span = '<span style="color: #fff; font-weight: normal; font-size: 14px">'
//
// const showResult = () => Object.assign(result, {
//   innerHTML: `${select.value}(${inputs[0].value}, ${inputs[1].value}) = </span>` + eval(`${select.value}(${inputs[0].value}, ${inputs[1].value})`)
// })
//
// const select = Object.assign(addElem('select'), {
//   value: funcs[0],
//   style: `
//     padding: 8px 16px;
//     border: solid 1px #09b;
//     border-radius: 4px;
//     color: #09b;
//     font-size: 16px;
//     font-weight: bold;
//     outline: none;
//   `,
//   onchange: showResult
// })
//
// funcs.forEach(name => {
//   const option = Object.assign(addElem('option', select), {
//     value: name,
//     innerText: name,
//     style: `font-size: 16px; color: #777;`
//   })
// })
//
// const inputs = [0, 1].map(val => Object.assign(addElem('input'), {
//   value: val,
//   style: `
//     padding: 8px 16px;
//     margin-left: 16px;
//     border: solid 1px #09b;
//     border-radius: 4px;
//     color: #09b;
//     font-size: 16px;
//     font-weight: bold;
//     outline: none;
//   `,
//   onchange: showResult
// }))
//
// const result = Object.assign(addElem('h3'), {
//   style: `
//     font-family: Montserrat, monospace, Roboto, Arial;
//     color: #f50;
//   `
// })
//
// showResult()
