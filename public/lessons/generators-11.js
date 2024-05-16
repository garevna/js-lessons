const section = document.body
section.style.padding = 0;
section.style.overflow = "hidden";

const canvas = section.appendChild (
    document.createElement ( "canvas" )
);

[ canvas.width, canvas.height ] = [ section.offsetWidth, section.offsetHeight ];

canvas [ Symbol.iterator ] = function* () {
    
    const ctx = this.getContext( '2d' );
    
    let counter = 0;
    
    do {
        let imageData = ctx.getImageData( 0, counter, this.width, 1 )
        let row = imageData.data
        for ( let x = 0; x < row.length; x += 4 ) {
            for ( let index = 0; index < 4; index++ ) 
                row[ x + index ] += counter
        }
        yield ctx.putImageData( imageData, 0, counter )
    
    } while ( counter++ < this.height )
}

for ( let x of canvas ) {}