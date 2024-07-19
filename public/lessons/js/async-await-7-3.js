const section = document.body

const async_without_await = async () => 'async without await'
const async_await = async () => await 'async and await'
const promise = Promise.resolve('promise resolved')
const show = resp => section.innerHTML += `<p>${resp}</p>`

show('Start')

async_without_await().then(show)
promise.then(show)
async_await().then(show)

show('Finish')
