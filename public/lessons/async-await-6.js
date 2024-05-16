const section = document.body

const show = resp => section.innerText += JSON.stringify ( resp ) + "\n"

const browsers = [ "Chrome", "Mozilla", "Safari", "IE" ]
browsers.then = ( function () {
    let current = 0
    return function ( resolve ) {
        let response = {
            value: this [ current++ ],
            done: current > this.length
        }

        setTimeout (
            () => resolve.call ( null, response ),
            1000
        )
    }
})()

async function showBrowsers () {
    do {
        var { done, value } = await browsers
        show ( `{ value: ${value}, done: ${done} }` )
    } while ( !done )
}

showBrowsers ()