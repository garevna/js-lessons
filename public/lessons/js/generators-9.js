const section = document.body

const points = {
    first:  { val: { x: 200, y: 200 }, nextPoint: "second" },
    forth:  { val: { x: 100, y: 50  }, nextPoint: "fifth" },
    sixth:  { val: { x: 300, y: 200 }, nextPoint: null },
    third:  { val: { x: 100, y: 150 }, nextPoint: "forth" },
    fifth:  { val: { x: 50,  y: 100 }, nextPoint: "sixth" },
    second: { val: { x: 150, y: 250 }, nextPoint: "third" }
}

points [ Symbol.iterator ] = function* () {

    let currentPoint = "first"

    const draw = ( x, y ) => {
        let point = section.appendChild (
            document.createElement ( "div" )
        ).style = `
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #09b;
            position: absolute;
            top: ${y}px;
            left: ${x}px;
        `
    }
    
    while ( currentPoint ) {
        draw (
            this [ currentPoint ].val.x,
            this [ currentPoint ].val.y
        )
        currentPoint = this [ currentPoint ].nextPoint
        yield currentPoint
    }
}

console.log ( ...points )