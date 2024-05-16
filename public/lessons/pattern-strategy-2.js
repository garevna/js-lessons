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

let salary = [
    { name: "Stephan", jan: 5000, fab: 5200, mar: 5800, apr: 4950, may: 4700, jun: 5100, jul: 5300, aug: 5000, sep: 4900, nov: 4800, dec: 5500 },
    { name: "Georg", jan: 2000, fab: 2200, mar: 2500, apr: 2550, may: 2400, jun: 2800, jul: 2100, aug: 2000, sep: 2200, nov: 2450, dec: 2700 },
    { name: "Mary", jan: 3100, fab: 3200, mar: 3000, apr: 3400, may: 3000, jun: 3300, jul: 3400, aug: 3700, sep: 3800, nov: 3700, dec: 3900 },
    { name: "Piter", jan: 2000, fab: 2250, mar: 1800, apr: 1950, may: 2100, jun: 2100, jul: 2700, aug: 2500, sep: 2900, nov: 2800, dec: 4000 },
    { name: "Helen", jan: 2000, fab: 2100, mar: 1700, apr: 1900, may: 2000, jun: 2000, jul: 2500, aug: 2000, sep: 2400, nov: 2700, dec: 3500 },
    { name: "Michael", jan: 3000, fab: 3200, mar: 2800, apr: 2950, may: 2700, jun: 3100, jul: 3300, aug: 4000, sep: 3900, nov: 3800, dec: 4500 },
    { name: "Andry", jan: 2800, fab: 2700, mar: 2800, apr: 2750, may: 2700, jun: 2500, jul: 2800, aug: 2700, sep: 2700, nov: 2800, dec: 3000 }
]

sortStrategy.sort( "SumOfAllNumericFields", salary )

salary.forEach (
    ( user, index ) => {
        section.innerText += `► ${index}: {`
        Object.keys( user ).forEach (
          prop => prop === "valueOf" ? null : section.innerText += ` ${prop}: ${user[prop]},`
        )
        section.innerText = section.innerText.slice(0,-1) + ` }\n`
    }
)
