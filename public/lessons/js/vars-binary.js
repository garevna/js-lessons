const section = document.body

const css = section.appendChild(document.createElement('style'))
css.textContent = `
  .power {
    color: #090;
    display: inline-block;
    margin-left: -8px;
  }
  h3 {
    color: #09b;
  }
  input {
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 64px;
    font-size: 16px;
  }
`

section.style = `
  background: #000;
  color: #bbb;
  font-family: monospace;
  font-weight: bold;
  font-size: 16px;
`

const input = section.appendChild(document.createElement('input'))
Object.assign(input, {
  type: 'number',
  value: 0,
  onchange (event) {
    event.target.remove()
    getBinary(event.target.value)
  }
})

function getBinaryPower (number) {
  var power = 10
  const target = number - (number % 2)

  while (Math.pow(2, power) < target) power++
  while (Math.pow(2, power) > target) power--

  return power
}

const [binaries, decimals, powers] = [[], [], []]

function recurse (number, result = 0) {
  const maxPower = getBinaryPower(number)
  result += Math.pow(10, maxPower)

  powers.push(maxPower)

  decimals.push(Math.pow(2, maxPower))
  binaries.push(Math.pow(10, maxPower))

  let rest = number - Math.pow(2, maxPower)

  rest > 0 && recurse(rest, result)
  return result
}

function getPowerString (number, power) {
  return `
    <span>${number}</span>
    <sup class="power">${power}</sup>
  `
}

function show (number) {
  let result = 0
  const [decimalString, powerString, binaryString] = [0, 1, 2]
    .map(() => section.appendChild(document.createElement('p')))
  decimalString.textContent = number + ' = '
  const resultString = section.appendChild(document.createElement('h3'))
  decimals.forEach((decimal, index) => setTimeout(() => {
    const addon = index < binaries.length - 1 ? ' + ' : ''

    decimalString.textContent += decimal + addon
    powerString.innerHTML += getPowerString(2, powers[index]) + addon
    binaryString.textContent += binaries[index] + addon
    result += binaries[index]
    resultString.innerText = result
  }, 2000 * index))
}

function getBinary (number) {
  const last = number % 2
  const tmp = number - last
  recurse(tmp, last)

  binaries.push(last)
  decimals.push(last)
  powers.push(0)

  show(number)
}
