const section = document.body

function* colorsGenerator () {
    const clr = () => Math.round ( Math.random() * 255 )
    while ( true ) {
        yield `rgb(${clr()}, ${clr()}, ${clr()})`
    }
}

let colorIterator = colorsGenerator ()

for ( var x=0; x < 300; x++ ) {
    let point = section.appendChild (
        document.createElement ( 'div' )
    )
    point.style = `
        float: left;
        width: 10px;
        height: 10px;
        background-color: ${ colorIterator.next().value};
    `
}
