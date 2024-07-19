const section = document.body

function message (text) {
  section.innerHTML += `<small>${text}</small><br>`
}

const start = Date.now()
const timer = (time = 0) => setTimeout(() => message(Date.now() - start), time)
let counter = 0
do {
  timer(500)
} while (counter++ < 500)

const config = { childList: true }

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      section.scrollTo(0, section.scrollHeight)
    }
  }
}

const observer = new MutationObserver(callback)
observer.observe(section, config)
