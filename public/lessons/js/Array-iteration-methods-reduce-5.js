const section = document.body

section.style = 'letter-spacing: 1.2px; font-family: monospace, Roboto, Arial;'
const array = ['first', 'second', 'third', 'fourth']

document.body
  .innerHTML = JSON.stringify(array.reduce((res, item, index, arr) => {
  const order = Math.round(Math.random() * (arr.length - 1))
  res.push(arr.splice(order, 1)[0])
  console.log(index, res, res === arr)
  return res
}, array))
