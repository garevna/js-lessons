const section = document.body

const elements = [
    { tagName: "h1", attrs: { id: "first", innerText: "first" } },
    { tagName: "h2", attrs: { id: "second", innerText: "second" } },
    { tagName: "h3", attrs: { id: "third", innerText: "third" } },
    { tagName: "p", attrs: { id: "forth", innerText: "forth" } }
]

elements[Symbol.iterator] = function* () {
    let itemNum = 0
    while ( itemNum < this.length ) {
        yield ( () => {
            var elem = section.appendChild (
                document.createElement (
                    this [ itemNum ].tagName
                )
            )
            if ( this [ itemNum ].attrs )
                for ( var x in this [ itemNum ].attrs ) {
                    elem [ x ] = this [ itemNum ].attrs [ x ]
                }
            itemNum++
            return elem
        })()
    }
}

console.log ( ...elements )