let section = document.body

section.style.fontSize = '0.8rem'

const showResponse = function (response) {
    let tab = "     "
    if ( Array.isArray ( response ) ) {
        console.log ( Array.isArray ( response ) )
        response.forEach (
            item => {
                section.innerHTML += `<pre>{<br>`
                for ( let prop in item ) {
                    section.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${prop}: ${item[prop]},<br>`
                }
                section.innerHTML += `}</pre><br>`
            }
        )
    } else {
        section.innerText += `{\n`
        for ( let user in response ) {
          section.innerHTML += user + '<br>'
          for ( let prop in response [user] )
            section.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${tab}${prop}: ${response [user][prop]}<br>`
        }
        section.innerText += `}\n`
    }
}

let request = Object.assign (
    new XMLHttpRequest,
    {
        onreadystatechange: function ( event ) {
            event.target.readyState === 4 ?
                event.target.status >= 200 && event.target.status < 300 ?
                    showResponse ( JSON.parse ( event.target.response ) ) :
                    section.innerHTML += `Request error: ${event.target.status}: ${event.target.statusText}`
                : null
        },
        make: function ( endpoint, method, data ) {
            let methods = [ "GET", "POST", "PUT", "DELETE", "PATCH" ]
            method = methods.indexOf ( method ) === -1 ? "GET" : method
            this.open ( method, `https://json-server-with-router.glitch.me/${endpoint}` )
            this.setRequestHeader( "Content-Type", "application/json" )
            method !== "GET" && data ? this.send ( JSON.stringify ( data ) ) : this.send()
        }
    }
)

request.make ( "users" )
