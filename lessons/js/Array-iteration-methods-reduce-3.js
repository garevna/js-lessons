const section = document.body

section.style = 'font-family: monospace; font-size: 14px; word-spacing: -4px;'

const numbers = [5, 4, 3, 1, 10, 5, 9, 2, 1, 4]

const result = numbers.reduce((res, number, index, arr) => res += parseInt(number / Math.pow(10, index)), 0)

const span = (value, color) => `<span style="color: ${color}">${value}</span>`

const [num, normal, constant, variable, method, results] = ['#dd9', '#bbb', '#fa5', '#0bd', '#b5f', '#0a0']

const string = span('const&nbsp;', normal) + span('numbers', variable) + span('&nbsp;=&nbsp;[', normal) + numbers
  .map(number => span(number, constant))
  .join(', ') + span(']', normal)

section
  .innerHTML = numbers
    .reduce((res, number, index, arr) => {
    return res += `
      <div>
        ${span('number', variable)}
        ${span('[', normal)}
        ${span(index, num)}
        ${span(']:&nbsp;', normal)}
        ${span('parseInt', method)}
        ${span('(', normal)}
        ${span(number, constant)}
        ${span('&nbsp;/&nbsp;', normal)}
        ${span('Math.pow', method)}
        ${span('(', normal)}
        ${span('10', normal)}
        ${span(',&nbsp;', normal)}
        ${span(index, num)}
        ${span(')&nbsp;=&nbsp;', normal)}
        ${span(parseInt(number / Math.pow(10, index)), results)}
      </div>
    `
  }, string + '<br><br>')

  section.innerHTML += `<hr>Result: <b>${span(result, results)}</b>`
