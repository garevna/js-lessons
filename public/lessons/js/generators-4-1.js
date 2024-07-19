const section = document.body

function* colorsGenerator () {
    const clr = () => Math.round ( Math.random() * 255 )
    while ( true ) {
        yield `rgb(${clr()}, ${clr()}, ${clr()})`
    }
}

let colorIterator = colorsGenerator ()

function createColoredElement ( w, h ) {
    let point = document.createElement ( 'div' )
    point.style = `
        position: absolute;
        width: ${w}px;
        height: ${h}px;
        background-color: ${ colorIterator.next().value};
    `
    return point
}

for ( var x = 0; x < 75; x++ ) {
    document.body.appendChild (
        createColoredElement ( 250-x*5, 250-x*5 )
    )
}