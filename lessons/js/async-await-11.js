const section = document.body

;(function demo (maxValue) {
  const placeholder = section
    .appendChild(document.createElement('h3'))

  while (maxValue--) {
    const number = maxValue
    setTimeout(async () => Object.assign(placeholder, {
      innerText: await number
    }), number * 1000)
  }
})(10)
