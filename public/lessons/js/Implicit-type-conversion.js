const section = document.body
// section.style.letterSpacing = '1px'

function testExpr (func, expr) {
  const test = eval(func)
  const value = test()
  return `<p>${expr}<span style="color:#09b">&nbsp;&nbsp;&nbsp;&nbsp;// ${value}</span> <span style="color:#888; font-size: 0.8rem;">('${typeof value}')</span></p>`
}

const expressions = ['0 + {}', '{} + 0', '0 + []', '[] + 0', '[] + {}', '{} + []', '!![] + ![]']

expressions.forEach((expression, index) => setTimeout(function () {
  const func = `() => { let x = ${expression}; return x }`
  section.innerHTML += testExpr(func, expression)
}, 2000 * index))
