const section = document.body

const browsers = {
  [Symbol.iterator]() {
    let step = 0
    return {
      next() {
        step++;
        return step === 1
          ? { value: 'Google', done: false }
          : step === 2
            ? { value: 'Mozilla', done: false }
            : step === 3
              ? { value: 'Safari', done: false }
              : { value: '', done: true }
        }
   		}
  }
}

for (const name of browsers) {
  section.innerText += name + '\n'
}
