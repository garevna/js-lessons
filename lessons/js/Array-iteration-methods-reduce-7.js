const section = document.body

section.style = 'font-family: monospace;'

const actions = [
  '[625, 5, 10].reduce(Math.sqrt)',
  '[7, Infinity, 0].reduce(Math.sqrt, 625 * 625)',
  '[81, 1, 5].reduce(Math.sqrt)',
  '[0, 0, 0].reduce(Math.sqrt, 81 * 81)'
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
  await promise('<p style="margin: 4px">[].reduce(Math.sqrt)</p>', index++)
  await promise(`<p style="background: #922; color: #fff; padding: 4px 8px; font-weight:bold;">TypeError: Reduce of empty array with no initial value</p>`, index++)
}

showResults()
