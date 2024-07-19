const section = document.body

const people = [
  { name: 'Alexandra Pugh', country: 'Ukraine' },
  { name: 'Andrea McKay', country: 'USA' },
  { name: 'Anthony Webster', country: 'United Kingdom' },
  { name: 'Noemi Lynch', country: 'Ukraine' },
  { name: 'Enrique Michael', country: 'France' },
  { name: 'Collin Roy', country: 'USA' },
  { name: 'Stella Dillon', country: 'United Kingdom' },
  { name: 'Lyra Bryant', country: 'France' },
  { name: 'Shane Dodson', country: 'Ukraine' },
  { name: 'Dream Douglas', country: 'USA' },
  { name: 'Bobby Richards', country: 'USA' },
  { name: 'Carmelo Atkinson', country: 'United Kingdom' }
]
const demo = section
  .appendChild(document.createElement('div'))
demo.style = `
  font-family: monospace, Roboto, Arial;
  font-size: 14px;
  padding: 36px;
  background: #000;
  color: #fff;
`

const getDiv = (key, value) => `
  <div style="margin-left: 16px">
    <span style="color: #09b; font-weight: bold">${key === ' ' ? '&nbsp;' : key}</span>:
    <span style="color: #fa0">${value}</span>
  </div>
`

const result = people
  .reduce((result, human) => Object.assign(result, {
      [human.country]: (result[human.country] || 0) + 1
    }), {})
const str = Object.keys(result)
  .map(key => getDiv(key, result[key]))
  .join('')

demo.innerHTML = '{<br>' + str + '}'
