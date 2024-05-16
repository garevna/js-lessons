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

promise( "Start", 5 ).then ( resolve )
promise( "Continue", 3 ).then ( resolve )
promise( "End", 2 ).then ( resolve )
resolve ( "Finish" )