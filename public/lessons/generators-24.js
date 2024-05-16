const section = document.body

function* testArgGenerator (x) {
  const roundSum = sum => Math.round(sum * 100) / 100

  section.innerHTML += `<p>Start with: ${x}</p>`
  const y = yield roundSum(x * 1.1)
  section.innerHTML += `<p>Previous state: ${x}</p><p>Current state: y = ${y}</p>`
  const z = yield roundSum(y * 1.1)
  section.innerHTML += `<p>Previous state: ${y}</p><p>Current state: y = ${z}</p>`
  return roundSum(z * 1.1)
}

var testArg = testArgGenerator(100)


const total = testArg
  .next(testArg.next(testArg.next().value).value)
  .value

section.innerHTML += `<p style="color: #f50;">Result value: ${total}</p>`
