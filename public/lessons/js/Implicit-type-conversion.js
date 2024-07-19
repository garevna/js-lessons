const section = document.body
section.style.letterSpacing = '2px'

function testExpr (func, expr) {
  const test = eval(func)
  return `<p>${expr}<span style="color:#09b">&nbsp;&nbsp;&nbsp;&nbsp;// ${test()}</span> <span style="color:#888; font-size: 0.8rem;">( "${typeof test()}" )</span></p>`
}

const expressions = ['0 + {}', '{} + 0', '0 + []', '[] + 0', '[] + {}', '{} + []', '!![] + ![]']

expressions.forEach((expression, index) => setTimeout(function () {
  const func = "() => { let x = ' + expression + '; return x }"
  section.innerHTML += testExpr(func, expression)
}, 2000 * index))