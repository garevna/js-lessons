const section = document.body

section.style = `font-size: 13px; font-family: monospace;`

class SortStrategy  {
    constructor () {
        this.strategy = null
    }

    testStrategy ( algorithm, key ) {
        this.strategy = this[ `setBy${algorithm}` ]

        if ( !( this.strategy instanceof Function ) ) {
            console.warn (`Valid strategy names: 
               "SumOfAllNumericFields"
               "ArrayFieldLength"
               "Key" ( here should be third argument - key name )
            `)
            let error = new Error ( "First argument should be the name of strategy" )
            error.name = "Invalid strategy"
            throw error
        }

        if ( this.strategy === this.setByKey && !key ) {
            let error = new Error ( "Third argument should be the name key field" )
            error.name = "Invalid key"
            throw error
        }
    }

    testData ( data ) {
        if ( !( data instanceof Array ) ) {
            let error = new Error ( "Second argument should be array of objects" )
            error.name = "Invalid source data"
            throw error
            return false
        }
    }

    sort ( algorithm, data, key ) {

        this.testData ( data )
        this.testStrategy ( algorithm, key )
        this.strategy ( data, key )
        
        data.forEach (
            ( item, index, arr ) => {
                let current = index, prev = index
                while ( --prev >= 0 ) {
                    if ( arr [ current ] < arr [ prev ] ) {
                        [ arr [ prev ], arr [ current ] ] = 
                            [ arr [ current ], arr [ prev ] ];
                        current = prev
                    }
                }
            }
        )
    }

    setBySumOfAllNumericFields ( arrayOfObjects ) {
        return arrayOfObjects.map (
            item => item.valueOf = function () {
                let res = 0
                Object.keys ( this ).forEach (
                    prop => res += typeof this [ prop ] === "number" ? 
                        this [ prop ] : 0
                )
                return res
            } 
        )
    }

    setByArrayFieldLength ( arrayOfObjects ) {
        return arrayOfObjects.map (
            item => item.valueOf = function () {
                let propName = Object.keys ( this ).find (
                    prop => Array.isArray ( this [ prop ] )
                )
                return this[ propName ].length
            }
        )
    }

    setByKey ( arrayOfObjects, keyField ) {
        return arrayOfObjects.map (
            ( item, index, array ) => 
                array[ index ].valueOf = function () {
                    return this[ keyField ]
                }
        )
    }
}

let sortStrategy = new SortStrategy

let workers = [
    { name: "Stephan", payments: [ 5000, 5200, 5800, 4950, 4700, 5100, 5300, 5000, 4900, 4800, 5500 ] },
    { name: "Georg", payments: [ 2000, 2200, 2500, 2550, 2400, 2800, 2100, 2000, 2200 ] },
    { name: "Mary", payments: [ 900, 700, 1000, 1200, 200, 400, 250 ] },
    { name: "Piter", payments: [ 1000, 2050, 1800, 700, 300, 500 ] },
    { name: "Helen", payments: [ 200, 210, 170, 190, 200 ] },
    { name: "Michael", payments: [ 3000, 3200, 2800, 2950 ] },
    { name: "Andry", payments: [ 1000, 1000, 900, 950 ] }
]

sortStrategy.sort( "ArrayFieldLength", workers )

workers.forEach (
    ( user, index ) => {
        section.innerText += `► ${index}: {`
        Object.keys( user ).forEach (
          prop => {
            let propExpr = Array.isArray(user[prop]) ? `[${user[prop]}]` : user[prop]
            prop === "valueOf" ? null : section.innerText += ` ${prop}: ${propExpr} },`
          }
        )
        section.innerText = section.innerText.slice(0,-1) + ` }\n`
    }
)
