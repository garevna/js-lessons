let section = document.body

const pictures = [
    "images/hong-kong-1990268__340.jpg",
    "images/dancing-cat.gif",
    "images/PAY-MATING-BUGS.avif",
    "images/prague-3010407__340.jpg"
]

const divs = pictures.map (
    picture => {
        let div = section.appendChild (
            document.createElement ( "div" )
        )
        div.style = `
            width: 200px;
            height: 100px;
            border: solid 1px gray;
            float: left;
        `
        div.onclick = function ( event ) {
            if ( event.eventPhase === 3 ) this.firstChild.remove()
            else {
                let img = event.target.appendChild (
                    document.createElement ( "img" )
                )
                img.src = picture
                img.width = 200
            }
        }
        return div
})
