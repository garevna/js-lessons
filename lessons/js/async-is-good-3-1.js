let section = document.body

const resolve = response => section.innerHTML += `<p>${response}</p>`

const promise = (message, time) => new Promise(resolve => setTimeout(resolve.bind(null, message), time * 1000))

promise('Start', 5).then(resolve)
promise('Continue', 3).then(resolve)
promise('End', 2 ).then(resolve)
resolve ('Finish')
