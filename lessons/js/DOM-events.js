let section = document.body

let elem = null

function bodyClickHandler ( event ) {
    if ( elem ) section.appendChild ( elem )
    else {
        elem = section.appendChild (
            document.createElement ( "div" )
        )
        elem.style = `
            padding: 20px;
            border: 2px solid #09b;
        `
        elem.onclick = function ( event ) {
            event.stopPropagation()
            elem = event.target.parentNode.removeChild ( event.target )
            section.onclick = bodyClickHandler
        }
        elem.onmouseover = function ( event ) {
            event.target.style.borderColor = "#f50"
            event.target.innerText = "Welcome!"
        }
        elem.onmouseout = function ( event ) {
            event.target.style.borderColor = "#09b"
            event.target.innerText = "Bye!"
        }
    }
    section.onclick = null
}

section.onclick = bodyClickHandler