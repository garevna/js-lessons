const section = document.body

let promise = message => new Promise (
    resolve => {
        let input = section.appendChild (
            document.createElement ( "input" )
        )
        input.style.padding = "4px 8px"
        input.style.fontSize = "1rem"
        input.placeholder = message
        input.onchange = function ( event ) {
            resolve ( event.target.value )
            event.target.remove()
        }
    }
)

const func = async () => {
    section.innerHTML += `<p>${await promise ( "Your name" )}</p>`
    section.innerHTML += `<p>${await promise ( "Your hobby" )}</p>`
    section.innerHTML += `<p>${await promise ( "Your speciality" )}</p>`
}

func()

