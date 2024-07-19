const section = document.body

function* colorsGenerator () {
    const clr = () => Math.round ( Math.random() * 255 )
    while ( true ) {
        let counter = 10
        yield new Promise (
            resolve => requestAnimationFrame(
                function sigma () {
                    if ( counter-- > 0 ) requestAnimationFrame ( sigma )
                    else {
                       counter = 10
                       resolve ( `rgb(${clr()}, ${clr()}, ${clr()})` )
                    }
                }
            )   
        )
    }
}

let colorIterator = colorsGenerator ()

async function showColors ( num ) {
    let res = colorIterator.next()
    let point = section.appendChild (
        document.createElement ( 'div' )
    )
    point.style = `
        float: left;
        width: 10px;
        height: 10px;
        background-color: ${await res.value};
    `;
    if ( --num > 0 ) showColors ( num )
}

showColors ( 100 )
