const section = document.body

function message ( text ) {
    section.innerHTML += `<small style="user-select: none">${text}</small><br>`
}


setTimeout (
    function () {
        for ( var x=0; x<10000000000; x++ ) {
            continue
        }
        message ( "<b>Counting finished</b>" )
    },
    0
)

message ( "Start" )
section.onclick = ( 
    () => {
        let counter = 0
        return event => message ( `<em>body clicked ${++counter} times</em>` )
    }
)()