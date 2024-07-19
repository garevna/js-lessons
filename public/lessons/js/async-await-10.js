const section = document.body

let promise = message => new Promise (
    resolve => {
        let input = document.body.appendChild (
            document.createElement ( "input" )
        )
        input.style = `
            padding: 4px 8px;
            font-size: 1rem;
            color: #09b;
        `
        input.placeholder = message
        input.onchange = function ( event ) {
            resolve ( event.target.value )
            event.target.remove()
        }
    }
)

const func = async () => {
    let user = {}
    const messages = [ "name", "hobby", "speciality" ]

    let responses = await Promise.all (
        messages.map ( message => promise ( message ) )
    )

    responses.forEach (
        ( val, index ) => Object.assign (
            user,
            { [ messages [ index ] ] : val }
        )
    )
    return user
}

func().then (
    response => section.innerHTML += JSON.stringify ( response )
        .split ( "{" ).join ( "{<br>&nbsp;&nbsp;&nbsp;&nbsp;" )
            .split ( "," ).join ( ",<br>&nbsp;&nbsp;&nbsp;&nbsp;" )
                .split ( "}" ).join ( "<br>}" )
)