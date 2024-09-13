const section = document.body

// section.style.fontFamily = 'monospace'
section.style.letterSpacing = 2

const create = () => section.appendChild(document.createElement('pre'))

var source = 9
var str = source.toString()
var [propmpt, string, demo] = [0, 1, 2].map(() => create())

var number = source
var counter = 2

function warn (number) {
  return Number.isSafeInteger(number)
    ? 'Safe precision'
    : 'You may lost a precision'
}


while (counter < 25) {
  number = number * 10 + source
  str += source.toString()

  const num = number

  const [counterText, demoText, strText] = [
    counter.toString(),
    number.toString(),
    str
  ]

  setTimeout(() => {
    const color = counterText < 16 ? '#090' : '#d00'
    const span = `<span style="color: ${color}">`
    propmpt.innerHTML = 'Number of digits:'.padEnd(18, ' ') + span + counterText.padEnd(5, ' ') + warn(num) + '</span>'
    string.innerHTML = 'Source number:'.padEnd(18, ' ') + '<span style="font-size: 16px; color: #09b">' + strText + '</span>'
    demo.innerHTML = 'Real value:'.padEnd(18, ' ') + '<span style="font-size: 16px; color: #fa0">' + demoText + '</span>'
  }, (counter++ - 2) * 1000)
}
