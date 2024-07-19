const section = document.body

let circle = document.createElement ( "div" )
circle.style = `
    border: solid 2px blue;
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius: 50%;
    transition: all 0.2s;
    opacity: 1;
`

circle.bubblesGenerator = ( async function* () {
    let bubble = () => new Promise (
        function ( resolve ) {
            setTimeout ( () => resolve ( "next" ), 100 )
        }
    )
    while ( true ) {
        let radius = this.offsetWidth > 200 ?
                     50 : this.offsetWidth + 5
        await bubble ()
        this.style.width = `${radius}px`
        this.style.height = `${radius}px`
        this.style.opacity = radius === 50 ?
            1 : Math.max ( this.style.opacity - 0.02, 0 )
        yield radius
    }
}).call ( circle )


section.appendChild ( circle )

async function show () {
    let step = 200
    while ( step --> 0 )
        await circle.bubblesGenerator.next()
}

show()
