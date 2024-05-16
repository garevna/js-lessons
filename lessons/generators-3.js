const section = document.body

const browsers = (function* () {
    yield "Chrome"
    yield "Mozilla"
    yield "Safari"
    yield "IE"
})()

for ( let x of [ 1, 2, 3, 4 ] )
    setTimeout (
      () => section.innerText += browsers.next().value  + "\n",
      1000 * x
    )
