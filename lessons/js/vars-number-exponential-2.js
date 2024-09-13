const section = document.body

const create = () => section.appendChild(document.createElement('h3'))

var source = 9
var str = source.toString()
var counter = 0
var [string, demo] = [0, 1].map(() => create())
string.style.color = '#09b'
demo.style.color = '#fa0'

var number = source
while (counter < 21) {
  number = number * 10 + source
  str += source.toString()
  const demoText = number.toString()
  const strText = str
  setTimeout(() => {
    string.innerText = strText
    demo.innerText = demoText
  }, counter++ * 1000)
}
