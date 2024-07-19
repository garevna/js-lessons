const section = document.body

section.style = 'font-family: monospace;'

const actions = [
  '[3, 2, 2].reduce(Math.pow)',
  'Math.pow(Math.pow(3, 2), 2)',
  '[2, 3, 3].reduce(Math.pow)',
  'Math.pow(Math.pow(2, 3), 3)',
  '[2, 2, 2].reduce(Math.pow, 2)',
  'Math.pow(Math.pow(Math.pow(2, 2), 2), 2)'
]

const promise = async (html, index) => setTimeout(() => {
  section.innerHTML +=  html
}, 700 * index)

async function showResults () {
  let index = 0
  for (const action of actions) {
    await promise(`<p style="margin: 4px">${action}</p>`, index++)
    await promise(`<p style="color: #85c; font-weight:bold; margin: 4px">${eval(action)}</p>`, index++)
  }
  await promise('<p style="margin: 4px">[].reduce(Math.pow)</p>', index++)
  await promise(`<p style="background: #922; color: #fff; padding: 4px 8px; font-weight:bold;">TypeError: Reduce of empty array with no initial value</p>`, index++)
}

showResults()
