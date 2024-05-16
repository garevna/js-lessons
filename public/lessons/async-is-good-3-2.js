let section = document.body

const resolve = response => section.innerHTML += `<p>${response}</p>`

function promise () {
    return new Promise (
        resolve => setTimeout (
            resolve.bind ( null, arguments[0] ),
            arguments[1] * 1000
        )
    )
}

async function sigma () {
    function promise () {
        return new Promise (
            resolve => setTimeout (
                resolve.bind ( null, arguments[0] ),
                arguments[1] * 1000
            )
        )
    }

  resolve ( await promise( "Start", 5 ) )
  resolve ( await promise( "Continue", 3 ) )
  resolve ( await promise( "End", 2 ) )
  return "Finish"
}

sigma().then ( response => resolve ( response ) )