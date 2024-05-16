const section = document.body

section.onclick = ( 
    () => {
        let counter = 0
        return event => message ( `body clicked ${++counter} times` )
    }
)()

function message ( text ) {
    section.innerHTML += `<small style="user-select: none">${text}</small><br>`
}

message ( 'start' )

setTimeout ( () => message ( 'timeout 0' ) , 3000 )

fetch ( "https://api.github.com/users" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `1: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 1' ), 2000 )

fetch ( "https://api.github.com/users?since=250" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `2: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 2' ), 100 )

fetch ( "https://api.github.com/users?since=300" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `3: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 3' ), 0 )

section.dispatchEvent ( new Event ( "click" ) )