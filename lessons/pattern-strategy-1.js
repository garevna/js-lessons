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

let users = [
    { name: "Stephan", age: 30, works: 7, children: 2 },
    { name: "Georg", age: 25, works: 2, children: 1 },
    { name: "Mary", age: 34, works: 10, children: 1 },
    { name: "Piter", age: 50, works: 25, children: 3 },
    { name: "Helen", age: 40, works: 20, children: 3 },
    { name: "Michael", age: 38, works: 16, children: 2 },
    { name: "Andry", age: 45, works: 20, children: 2 }
]

sortStrategy.sort( "Key", users, "name" )

console.log ( users )

users.forEach (
    ( user, index ) => {
        section.innerText += `► ${index}: {`
        Object.keys( user ).forEach (
          prop => prop === "valueOf" ? null : section.innerText += ` ${prop}: ${user[prop]},`
        )
        section.innerText = section.innerText.slice(0,-1) + ` }\n`
    }
)
